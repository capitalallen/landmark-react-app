import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import AppText from "../components/Text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const height = Dimensions.get("screen").height;

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = ({ email, password }) => {
    // const result = await authApi.login(email, password);
    // if (!result.ok) return setLoginFailed(true);
    // setLoginFailed(false);
    // auth.logIn(result.data);
    // console.log(email, password);
    try {
      // let response = await fetch(
      //   "https://landmarkapp-backend.herokuapp.com/login",
      //   {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       email: email,
      //       password: password,
      //     }),
      //   }
      // );
      // let json = await response.json();
      let json = {'status':"success"}
      if (json["status"] === "success") {
        console.log("Login Successful");
        setErrorMessage(false);
        setLoginFailed(false);
        navigation.navigate("AppNavigator");
      } else {
        console.log("Login Failed");
        setErrorMessage(true);
        setLoginFailed(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{ backgroundColor: "#F8FAFB", flex: 1, width: "100%", top: 30 }}
    >
      <View style={styles.titleContainer}>
        <AppText style={styles.text}>Login</AppText>
      </View>
      <View style={styles.googleContainer}>
        <TouchableOpacity>
          <View style={styles.googleSignUp}>
            <View style={styles.iconContainer}>
              {/* <MaterialCommunityIcons
                name={"google"}
                size={30}
                color={"dodgerblue"}
                style={styles.icon}
              /> */}
              <Image
                style={{ width: 40, height: 40 }}
                source={require("../assets/google.png")}
              />
            </View>
            <Text style={styles.googleButton}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>
        <AppText style={styles.orButton}>Or sign in with email</AppText>
      </View>

      <View style={styles.formContainer}>
        <Screen style={styles.container}>
          <Form
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormField
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              name="email"
            />
            <FormField
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              textContentType="password"
              name="password"
            />

            {errorMessage && (
              <AppText
                style={[
                  styles.haveAccountText,
                  {
                    textAlign: "center",
                    color: "red",
                    fontSize: 16,
                    paddingVertical: 10,
                  },
                ]}
              >
                Incorrect credentials, please try again
              </AppText>
            )}

            <SubmitButton style={styles.registerButton} title="Login" />
            <View style={styles.haveAccountContainer}>
              <AppText style={styles.haveAccountText}>
                Don't have an account?
              </AppText>
              <View style={styles.loginText}>
                <Button
                  color={"#EA765D"}
                  title="Sign up"
                  onPress={() => navigation.navigate("RegisterScreen")}
                />
              </View>
            </View>
          </Form>
        </Screen>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orButton: {
    color: "#A8A8A8",
    textAlign: "center",
    marginTop: 25,
  },
  icon: {
    left: 5,
    top: 4,
  },
  iconContainer: {
    backgroundColor: "white",
    height: 40,
    width: 40,
    top: 8,
    borderRadius: 20,
    left: 60,
  },
  googleButton: {
    marginTop: 15,
    left: 65,
    color: "#2D3748",
    fontFamily: "Avenir",
    fontSize: 18,
    fontWeight: "bold",
  },
  googleSignUp: {
    flexDirection: "row",
    backgroundColor: "#F8FAFB",
    borderWidth: 2,
    borderColor: "#CECECE",
    borderRadius: 12,
    height: 60,
  },
  haveAccountContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  haveAccountText: {
    color: "#2D3748",
  },
  loginText: {
    color: "#EA765D",
    top: -8,
  },
  titleContainer: {
    flex: 0.2,
    marginTop: 40,
  },
  registerButton: {
    borderRadius: 12,
    marginTop: 20,
    backgroundColor: "#EA765D",
    height: 60,
    fontSize: 24,
  },
  googleContainer: {
    flex: 0.1,
    padding: 30,
  },
  formContainer: {
    padding: 30,
    flex: 0.6,
  },
  text: {
    textAlign: "center",
    fontSize: 55,
    fontWeight: "bold",
    top: 40,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
});

export default LoginScreen;
