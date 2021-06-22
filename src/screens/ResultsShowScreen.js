import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  Button,
  Linking,
} from "react-native";
import yelp from "../api/yelp";

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  //we start with null because we have not fetched any data when the application is first displayed. result will have a value of null
  const id = navigation.getParam("id");
  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };
  useEffect(() => {
    getResult(id);
  }, []);

  // const words = [];
  // result.location.address1.split(" ").forEach((word) => {
  //   words.push(word);
  // });

  // if (result === null) {
  //   console.log("hi");
  // }

  // const supportedURL = `https://www.google.com/maps/place/${words[0]}+${words[1]}+${words[2]}+${result.address.location2}+${result.location.zip_code}`;

  // const words = [];
  // result.location.address1.split(" ").forEach((word) => {
  //   words.push(word);
  // });

  //https://www.google.com/maps/place/1200+Pennsylvania+Ave.+SE,+Washington,+DC+20003
  //https://www.google.com/maps/place/{words[0]}+{words[1]}+{words[2]}+{result.address.location2}+{result.location.zip_code}
  //`https://www.google.com/maps/place/${words[0]}+${words[1]}+${words[2]}+${result.address.location2}+${result.location.zip_code}`;

  // const supportedURL = `https://www.google.com/maps/place/${words[0]}+${words[1]}+${words[2]}+${result.address.location2}+${result.location.zip_code}`;

  const supportedURL = () => {
    const streetWords = [];
    result.location.address1.split(" ").forEach((word) => {
      streetWords.push(word);
    });
    const townWords = [];
    result.location.city.split(" ").forEach((word) => {
      townWords.push(word);
    });
    if (streetWords[3]) {
      if (townWords[1]) {
        return `https://maps.apple.com/?address=${streetWords[0]}%20${streetWords[1]}%20${streetWords[2]}%20${streetWords[3]},%20${townWords[0]}%20${townWords[1]},%20${result.location.state}%20${result.location.zip_code}`;
      } else {
        //town only has one word
        return `https://maps.apple.com/?address=${streetWords[0]}%20${streetWords[1]}%20${streetWords[2]}%20${streetWords[3]},%20${result.location.city},%20${result.location.state}%20${result.location.zip_code}`;
      }
    } else {
      //street only has two words (does not count ave or st)
      if (townWords[1]) {
        return `https://maps.apple.com/?address=${streetWords[0]}%20${streetWords[1]}%20${streetWords[2]},%20${townWords[0]}%20${townWords[1]},%20${result.location.state}%20${result.location.zip_code}`;
      } else {
        return `https://maps.apple.com/?address=${streetWords[0]}%20${streetWords[1]}%20${streetWords[2]},%20${result.location.city},%20${result.location.state}%20${result.location.zip_code}`;
      }
    }
  };

  //`https://www.google.com/maps/place/${words[0]}+${words[1]}+${words[2]}+${result.location.city}+${result.location.state}+${result.location.zip_code}`;

  // const supportedURL = `https://www.google.com/`;

  //https://maps.apple.com/?address=328%20Lexington%20Ave,%20Oyster%20Bay,%20NY%20%2011771

  //`https://maps.apple.com/?address=${words[0]}%20${words[1]}%20${words[2]},%20${result.location.city},%20${result.location.state}%20%20${result.location.zip_code}`

  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return <Button title={children} onPress={handlePress} />;
  };

  if (!result) {
    //if there is not result yet, then we will not show anything on the screen oncesoever
    return null;
  }

  return (
    <View>
      <Text>{result.name}</Text>
      <Text>
        {result.location.address1}, {result.location.city}
      </Text>
      <OpenURLButton url={supportedURL()}>View in Maps</OpenURLButton>
      <FlatList
        data={result.photos}
        //result.photos is an array of strings
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300,
  },
});

export default ResultsShowScreen;
