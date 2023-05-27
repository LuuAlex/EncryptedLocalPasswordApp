import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

const user = {location: null}

export default function Home({ navigation }, passInfo) {
  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("InitialLand")}
      >
        <Text style={styles.nav}>&#xFF0B; New</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

var { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#da635d",
    alignItems: "center",
  },
  navButton: {
    alignSelf: "flex-start",
    position: "absolute",
    marginLeft: width * 0.8,
    marginTop: height * 0.061,
  },
  nav: {
    fontFamily: "Helvetica",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "flex-start",
    position: "absolute",
  },
  h1: {
    marginTop: height * 0.12,
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.02,
    fontFamily: "Helvetica",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
  },
  p: {
    marginVertical: height * 0.004,
    marginHorizontal: width * 0.05,
    fontFamily: "Helvetica",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  buttonGroup: {
    marginTop: height * 0.05,
  },
  button: {
    marginVertical: height * 0.015,
    marginHorizontal: width * 0.05,
  },
  buttonButton: {
    marginVertical: height * 0.01,
    borderWidth: 5,
    borderStyle: "solid",
    borderRadius: 10,
    borderColor: "#fff",
    backgroundColor: "#4e4e56",
  },
});

// Colors: https://www.color-hex.com/color-palette/3307
