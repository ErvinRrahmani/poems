import ReactDom from "react-dom";
import "./Modal.scss";
import "../Listing/Listing";
import Listing from "../Listing/Listing";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
  height: "600px",
  overflow: "auto",
  borderRadius: "20px",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(204, 204, 204, 0.8)",
  zIndex: 1000,
};

export default function Modal({
  open,
  isOpen,
  isFavourite,
  poemSingleData,
  setIsOpen,
  onClose,
  addToFavorites,
  favouritePoems,
  setFavouritePoems,
  deletePoems,
  buttonStatus,
}) {
  if (!open) return null;

  if (!isFavourite) {
    return ReactDom.createPortal(
      <>
        <div className="Modal">
          <div style={OVERLAY_STYLES} />
          <div style={MODAL_STYLES}>
            <div className="button-wrapper">
              <button className="button-close-modal" onClick={onClose}>
                X
              </button>
            </div>
            <div className="wrapper">
              <h4>{poemSingleData?.title}</h4>
              <h5>{poemSingleData?.author}</h5>
              <p>{poemSingleData?.lines}</p>
            </div>
            <div className="close-add-buttons-wrapper">
              {favouritePoems.includes(poemSingleData) ? (
                <button
                  className="button-wrapper-delete"
                  onClick={() => {
                    deletePoems(poemSingleData);
                  }}
                >
                  Delete Poem &nbsp;
                  <i class="far fa-trash-alt"></i>
                </button>
              ) : (
                <button
                  className="button-wrapper-add"
                  onClick={() => {
                    addToFavorites(poemSingleData);
                  }}
                >
                  Add To &nbsp;
                  <i className="fas fa-heart" />
                </button>)}
            </div>
          </div>
        </div>
      </>,
      document.getElementById("portal")
    );
  } else {
    return ReactDom.createPortal(
      <>
        <div className="Modal">
          <div style={OVERLAY_STYLES} />
          <div style={MODAL_STYLES}>
            <div className="button-wrapper">
              <button className="button-close-modal" onClick={onClose}>
                X
              </button>
            </div>
            <div className="wrapper">
              <Listing
                addToFavorites={addToFavorites}
                deletePoems={deletePoems}
                favouritePoems={favouritePoems}
                poems={favouritePoems}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setFavouritePoems={setFavouritePoems}
                isFavourite={true}
              />
            </div>
          </div>
        </div>
      </>,
      document.getElementById("portal")
    );
  }
}
