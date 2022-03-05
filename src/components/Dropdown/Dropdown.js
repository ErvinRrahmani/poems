export default function Dropdown({
  name,
  onChangeState,
  poemsData,
  setIsLoading,
}) {
  return (
    <select
      className="form-select"
      defaultValue={name}
      onChange={(event) => {
        onChangeState(event.target.value);
        setIsLoading(true);
      }}
      aria-label="Default select example"
    >
      <option value={name} disabled>{name}</option>
      {poemsData?.map((poemsData, i) => {
        return <option value={poemsData} key={i}>{poemsData.slice(0, 30)}</option>;
      })}
    </select>
  );
}
