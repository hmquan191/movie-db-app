import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
        <img src="./search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search through a collection of movies"
          value={searchTerm}
          // listening for the change
          onChange={(e) => setSearchTerm(e.target.value)} // e stands for event
        />
      </div>
    </div>
  );
};

export default Search;
