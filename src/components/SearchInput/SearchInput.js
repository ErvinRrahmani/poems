export default function SearchInput({ searchFunction }) {
  return (
    <input
      className="form-control me-2"
      type="search"
      onChange={searchFunction}
      placeholder="Search"
      aria-label="Search"
    />
  );
}
