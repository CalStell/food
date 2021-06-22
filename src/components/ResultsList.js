import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { withNavigation } from "react-navigation";
import ResultsShowScreen from "../screens/ResultsShowScreen";
import ResultsDetail from "./ResultsDetail";

const ResultsList = ({ title, results, navigation }) => {
  //we can use navigation because we use withNavigaton on the export
  if (!results.length) {
    return null;
  } //this says if there's nothing in that category don't render it

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{title}</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={(result) => result.id} //Each restaurant has a unique string id
        //item is the item (restaurant) that we're currently iterating over
        renderItem={({ item }) => {
          return (
            <Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ResultsShow", { id: item.id })
                }
              >
                <ResultsDetail result={item} />
              </TouchableOpacity>
            </Text>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 5,
  },
  container: {
    marginBottom: 10,
  },
});

export default withNavigation(ResultsList);
//so we are exporting ResultsList with added "withNavigation code" that gives it access to navigation
//this gives you access to the navigation prop that we used in the ResultsList funtion without having to pass it down through a parent component (which would have been SearchScreen)
