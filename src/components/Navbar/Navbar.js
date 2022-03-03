import "./Navbar.scss";
import Dropdown from "../Dropdown/Dropdown";
import SearchInput from "../SearchInput/SearchInput";
import Button from "../Button/Button";
import NavbarBrand from "../NavbarBrand/NavbarBrand";
import FavouriteModal from "../FavouriteModal/FavouriteModal";

const BUTTON_WRAPPER_STYLES = {
  position: "relative",
  zIndex: 1,
};

export default function Navbar({
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
}) {
  return (
    <>
      <nav className="Navbar navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavbarBrand brandName="Poems" />
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
            <SearchInput searchFunction={generalSearcher} />
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
                <FavouriteModal
                  favPoems={favouritePoems}
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
