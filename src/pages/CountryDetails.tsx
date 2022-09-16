import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { COUNTRY_QUERY } from "../queries";
import { Country, Language } from "../types";

import "./CountryDetails.scss";

const CountryList = () => {
  const { code } = useParams<{ code: string }>();
  const { data, loading, error } = useQuery<{
    country: Country;
  }>(COUNTRY_QUERY, { variables: { code } });

  const { name, native, capital, currency, continent, languages, emoji } =
    data?.country || {};

  if (loading || error) {
    return (
      <section className="info__wrapper">
        {error?.message || "Loading..."}
      </section>
    );
  }

  if (!data?.country) {
    return (
      <div className="info__wrapper">No country found for the code {code}</div>
    );
  }

  return (
    <section className="country__wrapper">
      <div className="card country text-bg-dark">
        <div className="card-text country__flag">{emoji}</div>
        <div className="card-body text-center">
          <h3 className="card-title">{name}</h3>
          <h4 className="card-subtitle">({native})</h4>
        </div>
        <div className="card-body bg-secondary">
          <div className="row">
            <div className="col-8">
              <div className="country__details-title">Continent</div>
              <div className="country__details-content">
                {continent?.name} <span>({continent?.code})</span>
              </div>
            </div>
            <div className="col-4  text-end">
              <div className="country__details-title">Code</div>
              <div className="country__details-content">{code}</div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <div className="country__details-title">Capital</div>
              <div className="country__details-content">{capital}</div>
            </div>
          </div>
        </div>
        <div className="card-body bg-secondary">
          <div className="row">
            <div className="col-6">
              <div className="country__details-title">Currencies</div>
              <div className="country__details-content country__currencies">
                {(currency || "").split(",").map((currency) => (
                  <div key={currency}>{currency}</div>
                ))}
              </div>
            </div>
            <div className="col-6 text-end">
              <div className="country__details-title">Languages</div>
              <ul className="country__details-content country__list">
                {(languages || []).map(({ name, native }: Language) => (
                  <li key={name}>
                    {name} <span>({native})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryList;
