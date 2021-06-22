import React, { useState, useEffect } from "react";
import yelp from "../api/yelp";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const searchApi = async (searchTerm, searchLocation) => {
    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: searchLocation,
        },
      });
      setResults(response.data.businesses);
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
    //response.data.businesses is inside the yelp documentation
  };

  useEffect(() => {
    searchApi("pasta", "oyster bay");
  }, []);
  //this runs searchApi("pasta") ONLY the first time a user opens the ap[]

  return [searchApi, results, errorMessage];
  //returning the variables you'll need inside of SearchScreen
};
