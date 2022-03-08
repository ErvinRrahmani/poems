import "./Button.scss";

export default function Button({
  name,
  type,
  onClickFunction,
  buttonClassName,
  setIsLoading,
}) {
  return (
    <button
      className={buttonClassName}
      type={type}
      onClick={(event) => {
        event.preventDefault();
        onClickFunction(event);
        setIsLoading(true);
      }}
    >
      {name}
    </button>
  );
}
