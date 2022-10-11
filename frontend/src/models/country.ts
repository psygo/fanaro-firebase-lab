interface _Country {
  name: CountryName;
  state?: BrazilianState;
  city?: string;
}
export type Country = Readonly<_Country>;

export const getFlag = (cn: CountryName): CountryFlag => {
  const ind = Object.keys(CountryFlag).findIndex(
    (cf) => cf === countryKeyFromString(cn).toLowerCase()
  );
  return Object.values(CountryFlag)[ind];
};

export enum CountryName {
  angola = "Angola",
  argentina = "Argentina",
  brazil = "Brasil",
  canada = "Canadá",
  chile = "Chile",
  colombia = "Colômbia",
  costa_rica = "Costa Rica",
  cuba = "Cuba",
  france = "França",
  germany = "Germany",
  israel = "Israel",
  italy = "Itália",
  japan = "Japão",
  mexico = "México",
  peru = "Peru",
  portugal = "Portugal",
  romania = "Romênia",
  taiwan = "Taiwan",
  usa = "EUA",
  venezuela = "Venezuela",
}

export const countryNameFromString = (cString: string): CountryName =>
  Object.values(CountryName).find((c) => c === cString)!;

export const countryKeyFromString = (cString: string): string => {
  for (const [k, v] of Object.entries(CountryName)) if (v === cString) return k;
  return "";
};

export enum CountryFlag {
  angola = "🇦🇴",
  argentina = "🇦🇷",
  brazil = "🇧🇷",
  canada = "🇨🇦",
  chile = "🇨🇱",
  colombia = "🇨🇴",
  costa_rica = "🇨🇷",
  cuba = "🇨🇺",
  france = "🇫🇷",
  germany = "🇩🇪",
  israel = "🇮🇱",
  italy = "🇮🇹",
  japan = "🇯🇵",
  mexico = "🇲🇽",
  peru = "🇵🇪",
  portugal = "🇵🇹",
  romania = "🇷🇴",
  taiwan = "🇹🇼",
  usa = "🇺🇸",
  venezuela = "🇻🇪",
}

export enum BrazilianState {
  ac = "AC",
  al = "AL",
  ap = "AP",
  am = "AM",
  ba = "BA",
  ce = "CE",
  df = "DF",
  es = "ES",
  go = "GO",
  ma = "MA",
  mt = "MT",
  ms = "MS",
  mg = "MG",
  pa = "PA",
  pb = "PB",
  pr = "PR",
  pe = "PE",
  pi = "PI",
  rj = "RJ",
  rn = "RN",
  rs = "RS",
  ro = "RO",
  rr = "RR",
  sp = "SP",
  se = "SE",
  to = "TO",
}

export const brazilianStateFromString = (brString: string): BrazilianState =>
  Object.values(BrazilianState).find((brS) => brS === brString)!;
