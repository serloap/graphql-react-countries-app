import { gql } from "@apollo/client";

export const COUNTRIES_QUERY = gql`
  query Countries($filterQuery: CountryFilterInput) {
    countries(filter: $filterQuery) {
      code
      name
      currency
      emoji
    }
  }
`;

export const COUNTRY_QUERY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      code
      name
      native
      phone
      continent {
        code
        name
      }
      capital
      currency
      languages {
        code
        name
        native
      }
      emoji
    }
  }
`;

export const CURRENCIES_QUERY = gql`
  query Currencies {
    countries {
      currency
    }
  }
`;

export const FILTERS_QUERY = gql`
  {
    countries {
      # TO GET CURRENCIES ONLY
      currency
    }
    continents {
      code
      name
    }
  }
`;

