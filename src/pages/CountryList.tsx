import { useState } from "react";
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";
import Countries from '../components/Countries';

const CountryList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{
    continents: string[] | undefined;
    currencies: string | undefined;
  }>({
    continents: undefined,
    currencies: undefined
  });

  return (
    <div>
      <section>
        <SearchBar setSearchTerm={setSearchTerm} />
        <Filters setFilters={setFilters} />
      </section>
      <Countries
        {... {
          searchTerm,
          filters,
        }}
      />
    </div>
  );
};

export default CountryList;
