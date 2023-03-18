import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const countriesData = useRef(null);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      countriesData.current = response.data;
      console.log("effect", countriesData);
    });
  }, []);

  const [newSearch, setNewSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  function handleChange(event) {
    setNewSearch(event.target.value);
    const search = event.target.value;
    if (search === "") {
      setSearchResults([]);
    } else {
      setSearchResults(
        countriesData.current.filter(
          (country) =>
            country.name.common.toUpperCase().slice(0, search.length) ===
            search.toUpperCase()
        )
      );
    }
  }
  return (
    <>
      <div>
        find countries <input onChange={handleChange} value={newSearch} />
      </div>
      <Countries results={searchResults} />
    </>
  );
};

export default App;
