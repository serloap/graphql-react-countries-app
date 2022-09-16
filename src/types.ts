export type Currency = {
  currency: string;
};

export type Continent = {
  code: string;
  name: string;
};

export type Language = {
  code: string;
  name: string;
  native: string;
}

export type Country = Currency & {
  code: string;
  name: string;
  native: string;
  phone: string;
  continent: Continent;
  capital: string;
  currency: string;
  languages: Language[];
  emoji: string;
};
