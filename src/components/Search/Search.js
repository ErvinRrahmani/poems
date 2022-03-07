import "./Search.scss";
import Dropdown from "../Dropdown/Dropdown";
import SearchInput from "../SearchInput/SearchInput";
import Button from "../Button/Button";
import Brand from "../Brand/Brand";
import Modal from "../Modal/Modal";

const BUTTON_WRAPPER_STYLES = {
  position: "relative",
  zIndex: 1,
};

export default function Search({
  authors,
  titles,
  generalSearcher,
  setIsLoading,
  favouritePoems,
  onFetch20RandomPoems,
  onArtistChangeDebounce,
  onTitleChangeDebounce,
  isOpen2,
  setIsOpen2,
  setFavouritePoems,
  poems,
  deletePoems,
}) {
  return (
    <>
      <nav className="Search navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Brand brandName="Poems" />
          <form className="element-wrapper">
            <Dropdown
              name="Sort By Author"
              poemsData={authors}
              setIsLoading={setIsLoading}
              onChangeState={onArtistChangeDebounce}
            />
            <Dropdown
              name="Sort By Title"
              poemsData={titles}
              setIsLoading={setIsLoading}
              onChangeState={onTitleChangeDebounce}
            />
            {poems?.length > 0 ? (
              <SearchInput searchFunction={generalSearcher} />
            ) : (
              ""
            )}
            <Button
              name="Fetch 20 poems"
              buttonClassName="btn btn-outline-primary"
              type="button"
              setIsLoading={setIsLoading}
              onClickFunction={onFetch20RandomPoems}
            />
            {favouritePoems?.length > 0 ? (
              <div style={BUTTON_WRAPPER_STYLES}>
                <Button
                  type="button"
                  buttonClassName="btn btn-outline-success"
                  name="Favourite Poems"
                  onClickFunction={(event) => {
                    event.preventDefault();
                    setIsOpen2(true);
                  }}
                >
                  Open Modal
                </Button>
                <Modal
                  deletePoems={deletePoems}
                  open={isOpen2}
                  isFavourite={true}
                  setIsOpen={setIsOpen2}
                  favouritePoems={favouritePoems}
                  setFavouritePoems={setFavouritePoems}
                  onClose={() => setIsOpen2(false)}
                />
              </div>
            ) : null}
          </form>
        </div>
      </nav>
    </>
  );
}
