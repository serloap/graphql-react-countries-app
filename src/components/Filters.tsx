import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { FILTERS_QUERY } from "../queries";
import { getCurrencies, getMappedFilters } from "../utils";
import { Continent, Currency } from "../types";

import "./Filters.scss";

const Filters: React.FC<{
  setFilters: Function;
}> = ({ setFilters }) => {
  const { data, loading, error } = useQuery<{
    continents: Continent[];
    countries: Currency[];
  }>(FILTERS_QUERY);

  const [continents, setContinents] = useState<{ [key: string]: boolean }>({});
  const [currencies, setCurrencies] = useState<string[]>([""]);

  const allCurrencies = useMemo(
    () => getCurrencies(data?.countries),
    [data?.countries] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleContinentsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    code: string
  ) => {
    setContinents({
      ...continents,
      [code]: e.target.checked
    });
  };

  const handleCurrencyChange = (index: number) => (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const _currencies = [...currencies];
    _currencies[index] = e.target.value;

    setCurrencies(_currencies.filter((currency) => currency));
  };

  const handleCurrencyAdd = () => setCurrencies([...currencies, ""]);

  const handleCurrencyRemove = (index: number) => () =>
    setCurrencies(currencies.filter((__, _index) => _index !== index));

  const handleClear = () => {
    setContinents({});
    setCurrencies([""]);
  };

  useEffect(() => {
    setFilters(getMappedFilters(continents, currencies));
  }, [continents, currencies, setFilters]);

  if (loading) {
    /* To avoid showing two loading messages, one for filters and another for the list */
    return null;
  }

  if (error) {
    return <div className="info__wrapper">{error?.message}...</div>;
  }

  return (
    <div className="filters row">
      <div className="filters__continents col-6 col-sm-4">
        <h3>Continent</h3>
        {(data?.continents || []).map(({ code, name }: Continent) => (
          <div key={`continents-${code}`} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={`continents-${code}`}
              checked={continents[code] || false}
              onChange={(e) => handleContinentsChange(e, code)}
            />
            <label className="form-check-label" htmlFor={`continents-${code}`}>
              {name}
            </label>
          </div>
        ))}
      </div>
      <div className="filters__currencies col-6 col-sm-4">
        <h3>Currency</h3>
        {currencies.map((__, index) => (
          <div key={`currency-${index}`} className="input-group">
            <select
              className="form-select"
              aria-label="Select currency"
              value={currencies[index]}
              onChange={handleCurrencyChange(index)}
            >
              <option value="">Select a currency</option>
              {Array.from(allCurrencies).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleCurrencyRemove(index)}
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          className="filters__add-currency btn btn-outline-secondary w-100"
          onClick={handleCurrencyAdd}
        >
          Add currency
        </button>
      </div>
      <div className="filters__buttons col-6 col-sm-4">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Filters;
