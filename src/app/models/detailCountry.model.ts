export interface detailCountry {
  flags: {
    svg: string;
  };
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  topLevelDomain: string[];
  currencies: {
    code: string;
  }[];
  languages: {
    name: string;
  }[];
  borders: string[];
  cioc: string;
}