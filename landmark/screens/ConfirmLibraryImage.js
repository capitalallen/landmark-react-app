import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import SvgComponent1 from "../svg/SvgComponent1";
import SvgComponent2 from "../svg/SvgComponent2";
import SvgComponent3 from "../svg/SvgComponent3";

function ConfirmLibraryImage({ route, navigation }) {
  const { photoUrl, base64 } = route.params;
  // console.log(base64);
  const getWiki = async (name) => {
    // top = this;
    var data = await fetch("https://us-central1-ace-resolver-237602.cloudfunctions.net/first-function/getlandmark?name="+name)
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
      let key = "AIzaSyBfXxyl7OhrX4eBcPdYhN87hsFaj_MK-Uo";
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
      let json = await googleVisionRes.json();
      try {
        name = json["responses"][0]["landmarkAnnotations"][0]["description"];
        getWiki(name).then(res =>{
          console.log('------');
          let description=res['description'].substring(0,200);
          let imageurl=res['imageurl'];
          let wikiurl=res['wikiurl'];
          navigation.navigate("ResultsScreen", {
            name:name,
            text:description,
            image:imageurl,
            url:wikiurl
          });
        }).catch(err=>{
          navigation.navigate("ResultsScreen", {
            name: "Place not found",
            image:
              "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
            text: "No information available",
            url: "https://google.com",
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

  // console.log(photoUrl);
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
            onPress={() => navigation.navigate("ImageScreen")}
          >
            <Text style={styles.registerText}>Rechoose</Text>
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

export default ConfirmLibraryImage;
