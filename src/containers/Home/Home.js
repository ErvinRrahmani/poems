import Search from "../../components/Search/Search";
import Listing from "../../components/Listing/Listing";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Rings } from "react-loader-spinner";
import "./Home.scss";
import { toast } from "react-toastify";
export default function Home() {
  const [poems, setPoems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [titles, setTitles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [singlePoem, setSinglePoem] = useState(null);
  const [favouritePoems, setFavouritePoems] = useState([]);
  const [isOpen2, setIsOpen2] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [validationText, setValidationText] = useState("");

  const getAuthors = async () => {
    try {
      let response = await axios.get("author");
      setAuthors(response?.data?.authors);
    } catch (error) {
      console.log(error);
    }
  };

  const getPoemsTitle = async () => {
    try {
      let response = await axios.get("title");
      setTitles(response?.data?.titles);
    } catch (error) {
      console.log(error);
    }
  };

  const fetch20Poems = async (event) => {
    event.preventDefault();

    try {
      let response = await axios.get("random/20");
      setPoems(response?.data);
      setFilteredData(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const filterByAuthor = async (event) => {
    try {
      let response = await axios.get(`author/${event}`);
      setPoems(response?.data);
      setFilteredData(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const debounce = (func, timeout = 500) => {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const filterByTitle = async (event) => {
    try {
      let response = await axios.get(`title/${event}`);
      setPoems(response?.data);
      setFilteredData(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const searcher = (text) => {
    let searchText = text?.target.value.toLowerCase();

    let filteredUser = poems?.filter((poem) => {
      return (
        poem?.author.toLowerCase().includes(searchText) ||
        poem?.title.toLowerCase()?.includes(searchText)
      );
    });

    if (filteredUser.length === 0) {
      setValidationText("Artist or Poem not found!");
    } else {
      setValidationText("");
    }
    setFilteredData(filteredUser);
  };

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
      let tempArray = []
      
      tempArray.push(deletedPoems)

      tempArray?.forEach((item) => {
        if(favouritePoems?.length === 0) {
          toast.error('The favourite list empty, please add!')
          return
        }
        else if(favouritePoems?.includes(item) === true) {
          setFavouritePoems(
             favouritePoems.filter((item) =>  item === deletePoems))
          toast.error(
            `${deletedPoems?.title} by ${deletedPoems?.author} Has been removed from favorites!`
          );
        }
        else {
          toast.error("Poems are not the same")
        }
      }) 
    if (favouritePoems?.length === 1) {
      setIsOpen2(false);
    }
  };

  const onArtistChangeDebounce = debounce((event) => filterByAuthor(event));
  const onTitleChangeDebounce = debounce((event) => filterByTitle(event));
  const onFetch20RandomPoems = debounce((event) => fetch20Poems(event));
  const generalSearcher = debounce((event) => searcher(event));

  useEffect(() => {
    getAuthors();
    getPoemsTitle();
  }, [favouritePoems]);

  return (
    <div className="Home">
      <Search
        poems={poems}
        authors={authors}
        titles={titles}
        deletePoems={deletePoems}
        generalSearcher={generalSearcher}
        setIsLoading={setIsLoading}
        favouritePoems={favouritePoems}
        onFetch20RandomPoems={onFetch20RandomPoems}
        onArtistChangeDebounce={onArtistChangeDebounce}
        onTitleChangeDebounce={onTitleChangeDebounce}
        isOpen2={isOpen2}
        setIsOpen2={setIsOpen2}
        setFavouritePoems={setFavouritePoems}
      />
      {isLoading ? (
        <div className="loader-wrapper">
          <Rings ariaLabel="loading-indicator" />
        </div>
      ) : (
        <Listing
          addToFavorites={addToFavorites}
          isFavourite={false}
          deletePoems={deletePoems}
          poems={filteredData}
          isOpen={isOpen}
          validationText={validationText}
          setIsOpen={setIsOpen}
          singlePoem={singlePoem}
            favouritePoems={favouritePoems}  
          setFavouritePoems={setFavouritePoems}
          setSinglePoem={setSinglePoem}
        />
      )}
    </div>
  );
}
