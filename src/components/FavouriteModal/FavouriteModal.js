import ReactDom from "react-dom";
import './FavouriteModal.scss'
import Listing from "../Listing/Listing";
// import Listing from "../Listing/Listing";

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000,
    height: '600px',
    overflow: 'auto',
    borderRadius: '20px',

}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(204, 204, 204, 0.8)',
    zIndex: 1000,
}

export default function FavouriteModal({open, onClose, favPoems, setFavouritePoems, isFavourite, setIsOpen}) {

    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div className="Modal">
                <div style={OVERLAY_STYLES}/>
                <div style={MODAL_STYLES}>
                    <div className="button-wrapper">
                        <button className="button-close-modal" onClick={onClose}>X
                        </button>
                    </div>
                    <div className="wrapper">
                        <Listing poems={favPoems} favouritePoems={favPoems} setIsOpen={setIsOpen}
                                 setFavouritePoems={setFavouritePoems} isFavourite={isFavourite}/>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}