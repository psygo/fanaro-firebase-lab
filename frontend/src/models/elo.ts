import Serializable, { JsonDatum } from "../infra/serializable";
import { GameResultStatus } from "./game_record";

export type SerializedElo = number;
export type SerializedEloDelta = number;

export default class Elo implements Serializable {
  private static readonly kBelow1500: number = 50;
  private static readonly kBelow2000: number = 40;
  private static readonly kAboveOrEqual2000: number = 30;

  constructor(public readonly num: number) {}

  serialize = (): SerializedElo => this.num;

  static deserialize = (json: JsonDatum): Elo => new Elo(json as number);

  private get danOrKyu(): boolean {
    return this.num >= 2000;
  }

  private danFormatter = (long: boolean = false): string =>
    (Math.floor(this.num / 100) - 20 + 1).toString() + (long ? " dan" : "d");

  private kyuFormatter = (long: boolean = false): string =>
    Math.floor(20 - this.num / 100).toString() + (long ? " kyu" : "k");

  danKyuLevel = (long: boolean = false): string =>
    this.danOrKyu ? this.danFormatter(long) : this.kyuFormatter(long);

  private get k(): number {
    return this.num < 1500
      ? Elo.kBelow1500
      : this.num < 2000
      ? Elo.kBelow2000
      : Elo.kAboveOrEqual2000;
  }

  deltaFromGame = (opponentElo: Elo, gameResult: GameResultStatus): Elo => {
    if (gameResult === GameResultStatus.Voided) return this;

    const levelDiff = opponentElo.num - this.num;

    const gameResultAsNumber: number =
      gameResult === GameResultStatus.Win ? 1 : 0;

    const expectedValue = 1 / (1 + 10 ** (levelDiff / 400));

    return new Elo(Math.round((gameResultAsNumber - expectedValue) * this.k));
  };

  add = (delta: Elo): Elo => new Elo(this.num + delta.num);
}