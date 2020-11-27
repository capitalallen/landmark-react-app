import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ResultsScreen({ route, navigation }) {
  const { name, image, text, url } = route.params;
  const [prediction, setPrediction] = useState();
  
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Results</Text>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => navigation.navigate("ImageScreen")}
            >
              <MaterialCommunityIcons
                name="close-circle"
                size={50}
              />
            </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <View style={styles.card}>
            <Text style={styles.resultTitle}>{name}</Text>
            <Image
              style={styles.image}
              source={{
                uri: image,
              }}
            />
            <Text style={styles.infoText} numberOfLines={10}>
              {text}
            </Text>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => {console.log("yes!");Linking.openURL(url)}}
            >
              <Text style={styles.registerText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    left: 160,
    bottom: 60,
  },
  infoText: {
    fontFamily: "Avenir",
    fontSize: 15,
    fontWeight: "normal",
    textAlign: "center",
    top: 25,
  },
  resultTitle: {
    fontFamily: "Avenir",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    top: 0,
  },
  image: {
    width: 250,
    height: 200,
    borderRadius: 15,
    top: 10,
  },
  card: {
    backgroundColor: "white",
    width: "90%",
    height: "102%",
    borderRadius: 15,
    alignItems: "center",
    top: -30,
    padding: 20,
  },
  registerText: {
    fontFamily: "Avenir",
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  registerButton: {
    backgroundColor: "#5d7eea",
    width: 271,
    height: 65,
    borderRadius: 7,
    justifyContent: "center",
    marginTop: 40,
  },
  buttonContainer: {
    alignItems: "center",
    flex: 0.8,
    padding: 30,
    top: 20,
  },
  subtext: {
    color: "#5A5A5A",
    fontFamily: "Avenir",
    fontSize: 18,
    textAlign: "center",
    top: 31,
  },
  title: {
    fontFamily: "Avenir",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  textContainer: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
    top: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8FAFB",
    top: 30,
  },
});

export default ResultsScreen;
