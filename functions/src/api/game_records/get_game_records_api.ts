import { FirebaseRef } from "../../../../frontend/src/models/firebase_models";
import {
  DateEloData,
  GameRecord,
} from "../../../../frontend/src/models/game_record";
import { gameRecordsCol } from "../../collections/game_records_col";
import { ExpressApiRoute, queryLimit } from "../../infra";

const queryForPlayersGameRecords = async (playerRef: FirebaseRef) => {
  const playerIsBlack = gameRecordsCol.col
    .where("blackRef", "==", playerRef)
    .orderBy("date", "desc")
    .get();
  const playerIsWhite = gameRecordsCol.col
    .where("whiteRef", "==", playerRef)
    .orderBy("date", "desc")
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

  allPlayerGames.sort((g1, g2) => g2.date - g1.date);
  allPlayerGames.sort((g1, g2) => g2.dateCreated! - g1.dateCreated!);

  return allPlayerGames;
};

const playerDateEloData = async (
  playerRef: FirebaseRef
): Promise<DateEloData[]> => {
  const allPlayerGames = await queryForPlayersGameRecords(playerRef);

  return allPlayerGames
    .map((g) => ({
      date: g.date,
      atTheTimeElo:
        playerRef === g.blackRef
          ? g.eloData!.atTheTimeBlackElo
          : g.eloData!.atTheTimeWhiteElo,
      eloDelta:
        playerRef === g.blackRef
          ? g.eloData!.eloDeltaBlack
          : g.eloData!.eloDeltaWhite,
    }))
    .reverse();
};

export const paginationSlicer = (startAfter: number, list: any[]): any[] =>
  list.slice(startAfter, startAfter + queryLimit);

export const getGameRecords: ExpressApiRoute = async (req, res) => {
  try {
    const startAfter = parseInt(req.query.de as string);
    const playerRef = req.query.jogadorRef as FirebaseRef;
    const dateElo = req.query["data-elo"];

    let gameRecords: GameRecord[] = [];

    if (playerRef) {
      if (dateElo) {
        res.status(200).send({
          status: "Sucesso",
          message: "Elos encontrados.",
          data: { dateEloData: await playerDateEloData(playerRef) },
        });
        return;
      } else
        gameRecords = paginationSlicer(
          startAfter,
          await queryForPlayersGameRecords(playerRef)
        );
    } else {
      let gameRecordsSnaps = await gameRecordsCol.col
        .orderBy("date", "desc")
        .get();

      const docs = paginationSlicer(startAfter, gameRecordsSnaps.docs);

      docs.forEach((gameRecordDoc) => {
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
