/* eslint-disable react/prop-types */
import { useState } from "react";
import search from "../assets/icons/search.svg";

const Search = ({ keyWord, setKeyWord }) => {
  const [query, setQuery] = useState(keyWord);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    setKeyWord(inputValue);

    console.log(inputValue);
  };

  return (
    <div className="inline-block w-auto ">
      {/* SearchBar */}
      <div className="relative flex items-center w-40 px-2 bg-white rounded-full md:w-80">
        {/* Input box where user types in search query */}
        <form
          className="flex"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <button className="mr-1">
            <img src={search} alt="Search Bar" />
          </button>
          <input
            className="w-full py-2 pl-2 text-sm rounded-full text-slate-800 placeholder:text-xs focus:outline-none"
            placeholder="Search by keywords from image descriptions"
            value={query}
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
};

export default Search;
