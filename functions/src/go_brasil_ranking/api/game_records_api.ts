import * as admin from "firebase-admin";

import { ExpressApiRoute, howMany, parseBody } from "../../infra";

import { gameRecordsCol } from "../collections/game_records_col";
import { playersCol } from "../collections/players_col";

import {
  Color,
  doesThisColorWin,
  GameRecord,
} from "../../../../go_brasil_ranking/src/models/game_record";
import { FirebaseRef } from "../../../../go_brasil_ranking/src/models/firebase_models";
import Elo from "../../../../go_brasil_ranking/src/models/elo";
import { Player } from "../../../../go_brasil_ranking/src/models/player";
import { gameEventsCol } from "../collections/game_events_col";
import {
  isTournamentOrLeagueRef,
  OnlineOrLive,
  TournamentOrLeague,
} from "../../../../go_brasil_ranking/src/models/game_event";

export const queryForPlayersGameRecords = async (
  playerRef: FirebaseRef,
  limit: number
) => {
  const playerIsBlack = gameRecordsCol.col
    .where("blackRef", "==", playerRef)
    .orderBy("date", "desc")
    .limit(limit)
    .get();
  const playerIsWhite = gameRecordsCol.col
    .where("whiteRef", "==", playerRef)
    .orderBy("date", "desc")
    .limit(limit)
    .get();

  const [snapsAsBlack, snapsAsWhite] = await Promise.all([
    playerIsBlack,
    playerIsWhite,
  ]);

  const playerAsBlack = snapsAsBlack.docs.map((g) => {
    const game = g.data() as GameRecord;
    return { ...game, firebaseRef: g.id };
  });
  const playerAsWhite = snapsAsWhite.docs.map((g) => {
    const game = g.data() as GameRecord;
    return { ...game, firebaseRef: g.id };
  });

  const allPlayerGames = [...playerAsBlack, ...playerAsWhite];

  allPlayerGames.sort((g1, g2) => g1.date - g2.date);
  allPlayerGames.sort((g1, g2) => g1.dateCreated! - g2.dateCreated!);

  return allPlayerGames;
};

export const getGameRecords: ExpressApiRoute = async (req, res) => {
  try {
    const limit = howMany(req.query.limit as string);
    let gameRecords: GameRecord[] = [];

    const playerRef = req.query.jogadorRef as FirebaseRef;
    if (playerRef)
      gameRecords = await queryForPlayersGameRecords(playerRef, limit);
    else {
      let gameRecordsDocs = await gameRecordsCol.col
        .orderBy("date")
        .orderBy("dateCreated")
        .limit(limit)
        .get();

      gameRecordsDocs.forEach((gameRecordDoc) => {
        const gameRecordNoRef = gameRecordDoc.data() as GameRecord;
        gameRecords.push({ ...gameRecordNoRef, firebaseRef: gameRecordDoc.id });
      });
    }

    res.status(200).send({
      status: "success",
      message: `Partidas encontradas (total: ${gameRecords.length})`,
      data: { gameRecords: gameRecords },
    });
  } catch (e) {
    res.status(500).json((e as Error).message);
  }
};

export const getGameRecord: ExpressApiRoute = async (req, res) => {
  try {
    const id = req.params.gameRecordId;

    const gameRecordRef = gameRecordsCol.col.doc(id);

    const gameRecordDoc = await gameRecordRef.get();

    if (req.query.existe === "")
      res.status(200).send({
        status: "success",
        message: "Partida existe.",
        data: gameRecordDoc.exists,
      });
    else
      res.status(200).send({
        status: "success",
        message: "Partida encontrada.",
        data: { gameRecord: gameRecordDoc.data() },
      });
  } catch (e) {
    res.status(500).json((e as Error).message);
  }
};

export const postGameRecord = async (
  gameRecord: GameRecord,
  firebaseRef?: FirebaseRef
): Promise<GameRecord> => {
  const black = (await playersCol.getWithRef(gameRecord.blackRef))! as Player;
  const white = (await playersCol.getWithRef(gameRecord.whiteRef))! as Player;

  const blackElo = new Elo(black.elo);
  const whiteElo = new Elo(white.elo);

  const blackEloDelta = blackElo.deltaFromGame(
    whiteElo,
    doesThisColorWin(Color.Black, gameRecord.result)
  );
  const whiteEloDelta = whiteElo.deltaFromGame(
    blackElo,
    doesThisColorWin(Color.White, gameRecord.result)
  );

  // Update Players' Elos and Total Games
  await playersCol.updateWithRef(gameRecord.blackRef, {
    elo: blackElo.add(blackEloDelta).num,
    gamesTotal: black.gamesTotal! + 1,
  });
  await playersCol.updateWithRef(gameRecord.whiteRef, {
    elo: whiteElo.add(whiteEloDelta).num,
    gamesTotal: white.gamesTotal! + 1,
  });

  const now = admin.firestore.Timestamp.now().toMillis();

  let gameRecordOnDb: GameRecord = {
    ...gameRecord,
    blackPlayer: black,
    whitePlayer: white,
    eloData: {
      atTheTimeBlackElo: blackElo.serialize(),
      eloDeltaBlack: blackEloDelta.serialize(),
      atTheTimeWhiteElo: whiteElo.serialize(),
      eloDeltaWhite: whiteEloDelta.serialize(),
    },
    dateCreated: now,
  };

  // Update Games Event
  let gameEvent: TournamentOrLeague;
  if (
    gameRecord?.gameEventRef &&
    isTournamentOrLeagueRef(gameRecord.gameEventRef)
  ) {
    const eventRefString = gameRecord.gameEventRef;

    const eventRef = gameEventsCol.col.doc(eventRefString);
    gameEvent = (await eventRef.get()).data() as TournamentOrLeague;

    if (gameEvent) {
      await eventRef.update({ gamesTotal: gameEvent.gamesTotal! + 1 });

      gameRecordOnDb = { ...gameRecordOnDb, gameEvent: gameEvent };
    }
  } else if (!isTournamentOrLeagueRef(gameRecord.gameEventRef)) {
    gameRecordOnDb = {
      ...gameRecordOnDb,
      gameEvent: <OnlineOrLive>{ type: gameRecord.gameEventRef },
    };
  }

  // Adding the Game and the FirebaseRef
  if (!firebaseRef) {
    const gameRecordRef = await gameRecordsCol.col.add(gameRecordOnDb);
    gameRecordOnDb = { ...gameRecordOnDb, firebaseRef: gameRecordRef.id };
  } else {
    await gameRecordsCol.col.doc(firebaseRef).set(gameRecordOnDb);
    gameRecordOnDb = { ...gameRecordOnDb, firebaseRef: firebaseRef };
  }

  // Adding the Complete Game Record to Each Player
  await playersCol.updateWithRef(gameRecord.blackRef, {
    lastGame: gameRecordOnDb,
  });
  await playersCol.updateWithRef(gameRecord.whiteRef, {
    lastGame: gameRecordOnDb,
  });

  return gameRecordOnDb;
};

export const postGameRecordApi: ExpressApiRoute = async (req, res) => {
  try {
    const gameRecord = parseBody(req.body);

    const gameRecordOnDbWithRef = await postGameRecord(gameRecord);

    res.status(200).send({
      status: "success",
      message: "Partida adicionada com sucesso.",
      data: { gameRecord: gameRecordOnDbWithRef },
    });
  } catch (e) {
    res.status(500).json((e as Error).message);
  }
};
