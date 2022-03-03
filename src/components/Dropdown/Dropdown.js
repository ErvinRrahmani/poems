export default function Dropdown({
  name,
  onChangeState,
  poemsData,
  setIsLoading,
}) {
  return (
    <select
      className="form-select"
      onChange={(event) => {
        onChangeState(event.target.value);
        setIsLoading(true);
      }}
      aria-label="Default select example"
    >
      <option selected>{name}</option>
      {poemsData?.map((poemsData) => {
        return <option value={poemsData}>{poemsData.slice(0, 30)}</option>;
      })}
    </select>
  );
}
