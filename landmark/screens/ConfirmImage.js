import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import * as tf from "@tensorflow/tfjs";
import {
  fetch,
  decodeJpeg,
  bundleResourceIO,
} from "@tensorflow/tfjs-react-native";
import * as jpeg from "jpeg-js";

function ConfirmImage({ route, navigation }) {
  const { photoUrl, base64 } = route.params;
  // console.log(base64);
  getWiki = async (name) => {
    // top = this;
    var data = await fetch("="+name)
    .then((res)=> res.json())
    .then((json) => {
      return {
        description:json.summary,
        imageurl:json.imageurl,
        wikiurl: json.url    
      }
    })
    .catch((err)=>{
      console.log(err);
      return false;
    });
    return data;
  }
  const getResult = async () => {
    let name = "";
    try {
      let key = "";
      console.log("------1-------");
      let googleVisionRes = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          key,
        {
          method: "POST",
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: base64,
                },
                features: [{ type: "LANDMARK_DETECTION", maxResults: 5 }],
              },
            ],
          }),
        });
      console.log("------2-------");
      let json = await googleVisionRes.json();
      console.log(json);
      try {
        name = json["responses"][0]["landmarkAnnotations"][0]["description"];
        console.log(name);
        getWiki(name).then(res =>{
          description=res.description;
          imageurl=res.imageurl;
          wikiurl=res.wikiurl;
          console.log(name);
          navigation.navigate("ResultsScreen", {
            name:name,
            text:description,
            image:imageurl,
            url:wikiurl
          });
        })
      } catch (error) {
        navigation.navigate("ResultsScreen", {
          name: "Place not found",
          image:
            "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
          text: "No information available",
          url: "https://google.com",
        });
        return;
      }
    } catch(error){
        navigation.navigate("ResultsScreen", {
          name: "Place not found",
          image:
            "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
          text: "No information available",
          url: "https://google.com",
        });
      }      
    }
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ImageBackground style={styles.image} source={{ uri: photoUrl }} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.registerButton} onPress={getResult}>
            <Text style={styles.registerText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("CameraScreen")}
          >
            <Text style={styles.registerText}>Retake</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    top: 60,
    borderRadius: 20,
    height: 700,
  },
  buttonContainer: {
    top: 40,
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
    marginVertical: 20,
  },
  image: {
    width: 350,
    height: 350,
  },
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#F8FAFB",
  },
});

export default ConfirmImage;
