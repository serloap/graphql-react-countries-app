import { useQuery } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { Country } from "../types";
import { COUNTRIES_QUERY } from "../queries";

import "./Countries.scss";
import { COUNTRY_DETAILS } from "../routes";

const Countries: React.FC<{
  searchTerm: string;
  filters: {
    continents: string[] | undefined;
    currencies: string | undefined;
  };
}> = ({ searchTerm, filters }) => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery<{ countries: Country[] }>(COUNTRIES_QUERY, {
    variables: {
      filterQuery: {
        /**
         * IMPORTANT:
         * "in" or "eq" operators don't work for countries that have multiple currencies
         * i.e { eq: "USD" } or { in: ["USD"] } won't return United States in the results.
         * Regex works fine for those countries and allows to choose different currencies
         * from different countries, i.e { regex: "USD|COP" } returns Colombia, US, etc!
         **/
        currency: filters.currencies && { regex: filters.currencies },
        // Countries only have one continent so "in" operator works fine for this parameter.
        continent: filters.continents && { in: filters.continents }
      }
    }
  });

  const handleCountryClick = (code: string) => () => {
    navigate(`/${COUNTRY_DETAILS.replace(':code', code)}`);
  };

  const countries = data?.countries || [];

  const results = !searchTerm
    ? countries
    : countries.filter(
        ({ name, code }: Country) =>
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          code.toLowerCase().includes(searchTerm.toLowerCase())
      );

  if (loading || error) {
    return <div className="info__wrapper">{error?.message || "Loading..."}</div>;
  }

  return (
    <section className="row countries">
      {!results.length && (
        <div className="info__wrapper text-danger">
          No country found that matches "{searchTerm}"
        </div>
      )}
      {results.map(({ code, name, emoji }: Country) => (
        <div key={code} className="col-6 col-md-4 col-lg-3">
          <button
            type="button"
            className="btn btn-light countries__country"
            onClick={handleCountryClick(code)}
          >
            <span>{emoji}</span>
            {name}
          </button>
        </div>
      ))}
    </section>
  );
};

export default Countries;
