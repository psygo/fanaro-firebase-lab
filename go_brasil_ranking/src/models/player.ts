import Serializable, { JsonInterface } from "../infra/serializable";
import Elo from "./elo";

export interface Country {
  name: string;
  flag: CountryFlag;
  state?: BrazilianState;
  city?: string;
}

export default interface SerializedPlayer {
  name: string;
  countries: Country[];
  elo: number;
}

export class Player implements Serializable {
  constructor(
    public readonly name: string,
    public readonly countries: readonly Country[],
    public readonly elo: Elo
  ) {}

  serialize = (): SerializedPlayer => ({
    name: this.name,
    countries: this.countries as Country[],
    elo: this.elo.serialize(),
  });

  static deserialize = (json: JsonInterface): Player =>
    new Player(
      json.name as string,
      json.countries as Country[],
      Elo.deserialize(json.elo as number)
    );
}

export enum CountryFlag {
  angola = "🇦🇴",
  argentina = "🇦🇷",
  brazil = "🇧🇷",
  colombia = "🇨🇴",
  france = "🇫🇷",
  israel = "🇮🇱",
  italy = "🇮🇹",
  mexico = "🇲🇽",
  portugal = "🇵🇹",
  romania = "🇷🇴",
  taiwan = "🇹🇼",
}

export enum BrazilianState {
  ac,
  al,
  ap,
  am,
  ba,
  ce,
  df,
  es,
  go,
  ma,
  mt,
  ms,
  mg,
  pa,
  pb,
  pr,
  pe,
  pi,
  rj,
  rn,
  rs,
  ro,
  rr,
  sp,
  se,
  to,
}
