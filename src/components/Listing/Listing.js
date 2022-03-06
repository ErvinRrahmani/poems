import "./Listing.scss";
import Modal from "../Modal/Modal";
import { toast } from "react-toastify";

const BUTTON_WRAPPER_STYLES = {
  position: "relative",
  zIndex: 1,
};

export default function Listing({
  poems,
  favouritePoems,
  setFavouritePoems,
  isOpen,
  setIsOpen,
  singlePoem,
  setSinglePoem,
  isFavourite,
  validationText,
}) {
  const addToFavorites = (poems) => {
    let favPoemsArray = [];
    favPoemsArray.push(poems);

    favPoemsArray?.forEach((poemsInsideArray) => {
      if (favouritePoems.includes(poemsInsideArray) === false) {
        setFavouritePoems((favouritePoems) => [
          ...favouritePoems,
          poemsInsideArray,
        ]);
        toast.success(
          `${poems?.title} by ${poems?.author} Has been added to favourites!`
        );
      } else {
        toast.error(
          `${poems?.title} by ${poems?.author} already exits on favourite list!`
        );
      }
    });
  };

  const deletePoems = (deletedPoems) => {
    setFavouritePoems(favouritePoems.filter((item) => item !== deletedPoems));
    toast.error(
      `${deletedPoems?.title} by ${deletedPoems?.author} Has been removed from favorites!`
    );
    if (favouritePoems?.length === 1) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="Listing">
        {isFavourite ? <h4>Favourite Poems</h4> : null}
        <table className="table table-borderless">
          <thead>
            <tr>
              {!isFavourite ? (
                <>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col-2">Poems</th>
                  <th scope="col">Poem Details</th>
                  <th scope="col">Favourites</th>
                </>
              ) : (
                <>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col-2">Poems</th>
                  <th scope="col-2">Remove Favourite</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {poems?.map((poem, i) => {
              return (
                <tr key={poem.lines.toString().length}>
                  {!isFavourite ? <th scope="row">{i + 1}</th> : ""}
                  <td>{poem?.title}</td>
                  <td>{poem?.author}</td>
                  <td>{poem?.lines?.slice(0, 5)} -...</td>
                  {!isFavourite ? (
                    <>
                      <div style={BUTTON_WRAPPER_STYLES}>
                        <span
                          className="modal-open-button"
                          onClick={() => {
                            setIsOpen(true);
                            setSinglePoem(poem);
                          }}
                        >
                          <i className="fa fa-file-alt" />
                        </span>
                      </div>
                      <td>
                        <span
                          onClick={() => {
                            addToFavorites(poem);
                          }}
                          className="modal-open-button"
                        >
                          <i className="fas fa-heart" />
                        </span>
                      </td>
                    </>
                  ) : (
                    <td>
                      <span
                        onClick={() => deletePoems(poem)}
                        className="modal-open-button"
                      >
                        <i className="fas fa-trash-alt" />
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
            <div className="modal-wrapper">
              <Modal
                poemSingleData={singlePoem}
                open={isOpen}
                onClose={() => setIsOpen(false)}
              />
            </div>
            <h5>{validationText}</h5>
          </tbody>
        </table>
      </div>
    </>
  );
}
