import './Navbar.scss'
import Listing from "../Listing/Listing";
import Dropdown from "../Dropdown/Dropdown";
import SearchInput from "../SearchInput/SearchInput";
import Button from "../Button/Button";
import NavbarBrand from "../NavbarBrand/NavbarBrand";
import {useEffect, useState} from "react";
import axios from '../../utils/axios'
import Modal from "../Modal/Modal";
import FavouriteModal from "../FavouriteModal/FavouriteModal";
import Loader from "../Loader/Loader";
import {Rings} from "react-loader-spinner";

const BUTTON_WRAPPER_STYLES = {
    position: 'relative', zIndex: 1
}

export default function Navbar() {

    const [poems, setPoems] = useState([])
    const [isLoading, setIsLoading] = useState(null)
    const [authors, setAuthors] = useState([])
    const [titles, setTitles] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [singlePoem, setSinglePoem] = useState('')
    const [favouritePoems, setFavouritePoems] = useState([])
    const [isOpen2, setIsOpen2] = useState(false);
    const [filteredData, setFilteredData] = useState([])

    const getAuthors = async () => {

        try {
            let response = await axios.get('author')
            setAuthors(response?.data?.authors)
        } catch (error) {
            console.log(error)
        }
    }

    const getPoemsTitle = async () => {

        try {
            let response = await axios.get('title')
            setTitles(response?.data?.titles)
        } catch (error) {
            console.log(error)
        }
    }

    const fetch20Poems = async (event) => {
        event.preventDefault()

        try {
            let response = await axios.get('random/20')
            setPoems(response?.data)
            setFilteredData(response?.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const filterByAuthor = async (event) => {

        try {
            let response = await axios.get(`author/${event}`)
            setPoems(response?.data)
            setFilteredData(response?.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const debounce = (func, timeout = 500) => {
        let timer;

        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    }

    const filterByTitle = async (event) => {

        try {
            let response = await axios.get(`title/${event}`)
            setPoems(response?.data)
            setFilteredData(response?.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const searcher = (text) => {
        let searchText = text?.target.value.toLowerCase();
        let filteredUser = poems?.filter((poem) => {
            return (poem?.author.toLowerCase().includes(searchText)) || (poem?.title.toLowerCase()?.includes(searchText))
        })
        setFilteredData(filteredUser)
    }

    const onArtistChangeDebounce = debounce((event) => filterByAuthor(event));
    const onTitleChangeDebounce = debounce((event) => filterByTitle(event));
    const onFetch20RandomPoems = debounce((event) => fetch20Poems(event))
    const generalSearcher = debounce((event) => searcher(event))

    useEffect(() => {
        getAuthors();
        getPoemsTitle();
    }, [])

    return (<>
            <nav className="Navbar navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavbarBrand brandName="Poems"/>
                    <form className="element-wrapper">
                        <Dropdown name="Sort By Author" poemsData={authors}  setIsLoading={setIsLoading}  onChangeState={onArtistChangeDebounce}/>
                        <Dropdown name="Sort By Title" poemsData={titles}  setIsLoading={setIsLoading}  onChangeState={onTitleChangeDebounce}/>
                        <SearchInput searchFunction={generalSearcher}/>
                        <Button name="Fetch 20 poems" buttonClassName="btn btn-outline-primary" type="button"
                                setIsLoading={setIsLoading} onClickFunction={onFetch20RandomPoems}/>
                        {favouritePoems?.length > 0 ? <div style={BUTTON_WRAPPER_STYLES}>
                            <Button
                                type="button"
                                buttonClassName="btn btn-outline-success"
                                name="Favourite Poems"
                                onClickFunction={(event) => {
                                    event.preventDefault()
                                    setIsOpen2(true);
                                }}
                            >Open Modal
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
                        </div> : null}
                    </form>
                </div>
            </nav>
            <div className="list-wrapper">
                {isLoading ?
                    <div className="loader-wrapper">
                        <Rings ariaLabel="loading-indicator" className="list-ring"/>
                    </div>
                    :
                    <Listing isLoading={isLoading}
                             setIsLoading={setIsLoading}
                             poems={filteredData}
                             isOpen={isOpen}
                             setIsOpen={setIsOpen}
                             singlePoem={singlePoem}
                             favouritePoems={favouritePoems}
                             setFavouritePoems={setFavouritePoems}
                             setSinglePoem={setSinglePoem}
                    />
                }
            </div>


        </>


    )
}
