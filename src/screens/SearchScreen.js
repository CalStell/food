import React, { useState } from "react";
//use effect allows to run some snippet of code just one time when our component is first rendered to the screen
//look at the documentation on this. There are two cases. To run the arrow function only when the component is first rendered, you must include the empty array like this:  useEffect(() => {}, [ ])
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";

const SearchScreen = () => {
  //remember props
  //navigation is the navigation prop
  const [term, setTerm] = useState("");
  //term is going to be the query that we search the yelp API with
  const [locationTerm, setLocationTerm] = useState(""); //// the terms for the location input
  const [searchApi, results, errorMessage] = useResults();
  //remember, useResults.js returns searchApi, resultsm and errorMessage. We are able to call them here because we have imported useResults (in line 6)
  const filterResultsByPrice = (price) => {
    //price will be equal to '$' or '$$' or '$$$'
    return results.filter((result) => {
      return result.price === price;
    });
  };

  return (
    //a flex: 1 in the view would tell us to only use the screen state that is visible
    //adding a flex: 1 to your most parent view can solve a lot of styling issues, in particular if you have content that is being cut off
    //using no View, like below, is used a lot when we want to return *a group* of elements
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => {
          if (term && locationTerm) {
            searchApi(term, locationTerm);
          }
        }}
        placeholderTerm="What are you in the mood for?"
      />
      <SearchBar
        term={locationTerm}
        onTermChange={setLocationTerm}
        onTermSubmit={() => {
          if (term && locationTerm) {
            searchApi(term, locationTerm);
          }
        }} //{() => searchApi(term, locationTerm)}
        placeholderTerm="Location"
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ScrollView>
        <ResultsList
          results={filterResultsByPrice("$")}
          title="Cost Effective"
        />
        <ResultsList results={filterResultsByPrice("$$")} title="Bit Pricier" />
        <ResultsList
          title="Big Spender"
          results={filterResultsByPrice("$$$")}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
