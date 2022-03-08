import "./Listing.scss";
import Modal from "../Modal/Modal";

const BUTTON_WRAPPER_STYLES = {
  position: "relative",
  zIndex: 1,
};

export default function Listing({
  poems,
  isOpen,
  setIsOpen,
  singlePoem,
  setSinglePoem,
  isFavourite,
  validationText,
  deletePoems,
  addToFavorites,
  favouritePoems
}) {
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
                      <td>
                        <span
                          className="table-clickable-pointer"
                          style={BUTTON_WRAPPER_STYLES}
                          onClick={() => {
                            setIsOpen(true);
                            setSinglePoem(poem);
                          }}
                        >
                          <i className="fa fa-file-alt" />
                        </span>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        <span
                          className="table-clickable-pointer"
                          onClick={() => deletePoems(poem)}
                        >
                          <i className="fas fa-trash-alt" />
                        </span>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="modal-wrapper">
          <Modal
            buttonStatus={true}
            deletePoems={deletePoems}
            poemSingleData={singlePoem}
            open={isOpen}
            addToFavorites={addToFavorites}
            onClose={() => setIsOpen(false)}
            favouritePoems={favouritePoems}
          />
        </div>
        <h5>{validationText}</h5>
      </div>
    </>
  );
}
