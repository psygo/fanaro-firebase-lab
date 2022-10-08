import { ExpressApiRoute, parseBody } from "../infra";

import { playersCol } from "../collections/players_col";

import { CountryName } from "../../../frontend/src/models/country";
import { FirebaseRef } from "../../../frontend/src/models/firebase_models";
import { Player } from "../../../frontend/src/models/player";

export const postPlayer = async (
  player: Player,
  firebaseRef?: FirebaseRef
): Promise<Player> => {
  const isBrazilian = player.countries.some(
    (c) => c.name === CountryName.brazil
  );

  let playerOnDb = {
    ...player,
    isBrazilian: isBrazilian,
    dateCreated: new Date().getTime(),
    gamesTotal: 0,
  };

  if (player.picture) playerOnDb = { ...playerOnDb, picture: player.picture };

  if (!firebaseRef) {
    const playerRef = await playersCol.col.add(playerOnDb);
    playerOnDb = { ...playerOnDb, firebaseRef: playerRef.id };
  } else {
    await playersCol.col.doc(firebaseRef).set(playerOnDb);
    playerOnDb = { ...playerOnDb, firebaseRef: firebaseRef };
  }

  return playerOnDb;
};

export const postPlayerApi: ExpressApiRoute = async (req, res) => {
  try {
    const player = parseBody(req.body);

    const playerOnDbWithRef = await postPlayer(player);

    res.status(200).send({
      status: "success",
      message: "Jogador adicionado com sucesso.",
      data: { player: playerOnDbWithRef },
    });
  } catch (e) {
    res.status(500).json((e as Error).message);
  }
};