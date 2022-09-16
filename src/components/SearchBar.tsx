import { useEffect } from "react";
import { useForm } from "react-hook-form";

const searchInputLabel = "Search by name or code";

const SearchBar: React.FC<{ setSearchTerm: Function }> = ({
  setSearchTerm
}) => {
  const { register, reset, watch } = useForm({
    defaultValues: { "search-term": "" }
  });

  const _searchTerm = watch("search-term");

  useEffect(() => {
    setSearchTerm(_searchTerm);
  }, [_searchTerm, setSearchTerm]);

  const handleClear = () => {
    reset();
  };

  return (
    <div>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder={searchInputLabel}
          aria-label={searchInputLabel}
          {...register("search-term")}
        />
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

export default SearchBar;
