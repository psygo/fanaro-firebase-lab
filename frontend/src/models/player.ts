import { Country } from "./country";
import Elo, { SerializedElo } from "./elo";
import { Author, FirebaseDoc, FirebaseRef } from "./firebase_models";
import { GameRecord } from "./game_record";

export interface _Player extends FirebaseDoc {
  firebaseRef?: FirebaseRef;
  name: string;
  email?: string;
  nicks?: readonly Nick[];
  picture?: string;
  countries: readonly Country[];
  isBrazilian?: boolean;
  currentElo?: SerializedElo;
  rebaseElos: readonly RebaseElo[];
  eloHistory?: readonly DateEloData[];
  dateCreated?: number;
  author?: Author;
  gamesTotal?: number;
  lastGame?: GameRecord;
  additionalInfo?: string;
}
export type Player = Readonly<_Player>;

interface _RebaseElo {
  date: number;
  elo: SerializedElo;
}
export type RebaseElo = Readonly<_RebaseElo>;

interface _DateEloData {
  date: number;
  atTheTimeElo: SerializedElo;
  eloDelta?: SerializedElo;
}
export type DateEloData = Readonly<_DateEloData>;

export const firstElo = (player: Player): Elo =>
  new Elo(player.eloHistory![0].atTheTimeElo);

export const currentElo = (player: Player): Elo => {
  const eloHistoryLength = player.eloHistory!.length;
  const lastAtTheTimeElo = new Elo(
    player.eloHistory![eloHistoryLength - 1].atTheTimeElo
  );
  const lastEloDeltaNum = player.eloHistory![eloHistoryLength - 1].eloDelta;

  return lastEloDeltaNum
    ? lastAtTheTimeElo.add(new Elo(lastEloDeltaNum))
    : lastAtTheTimeElo;
};

export enum GoServers {
  ogs = "OGS",
  kgs = "KGS",
  fox = "Fox",
  tygem = "Tygem",
  wbaduk = "WBaduk",
  pandanet = "Pandanet",
}

interface _Nick extends FirebaseDoc {
  name: string;
  server: GoServers;
}
export type Nick = Readonly<_Nick>;
