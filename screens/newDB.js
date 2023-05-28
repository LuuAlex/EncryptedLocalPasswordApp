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
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { openDatabase } from "react-native-sqlite-storage";
import * as SQLite from "expo-sqlite";
import * as Asset from "expo-asset"

export default function NewDB({ navigation }) {
  const [fileLoc, onChangeFileLoc] = React.useState("");
  const [value, onChangeText] = React.useState("");

  const pickDirectory = async () => {
    console.log("hi!!!!!");
    try {
      const permission = await FileSystem.requestDirectoryPermissionsAsync();
      if (permission.granted) {
        const dir =
          await FileSystem.StorageAccessFramework.browseForFolderAsync();
        console.log(dir);
      }
    } catch (error) {
      console.log("error");
    }
  };

  async function submit(file) {
    const fileUri = `${FileSystem.documentDirectory}UserDatabase.db`;
    const downloadedFile = await FileSystem.downloadAsync(
      Asset.fromModule(SQLite.openDatabase("UserDatabase.db")).uri,
      fileUri
    );
    if (downloadedFile.status != 200) {
      handleError();
    }

    const UTI = "public.item";
    const shareResult = await Sharing.shareAsync(downloadedFile.uri, { UTI });
    navigation.navigate("Home", db);
    console.log(file);
  }

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("InitialLand")}
      >
        <Text style={styles.nav}>&lt; Back</Text>
      </TouchableOpacity>
      <Text style={styles.h1}>Create a New Password Database</Text>
      <Text style={styles.p}>
        Please select a file location for the database and make a master
        password. Do not forget your master password!
      </Text>
      <View style={styles.buttonGroup}>
        <View style={styles.button}>
          <Text style={styles.p}>
            Step 1: Pick a location (can be a online storage folder) to store
            your encrypted passwords
          </Text>
          <TouchableOpacity style={styles.buttonButton} onPress={pickDirectory}>
            <Text style={styles.p}>Choose Location</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <Text style={styles.p}>
            Step 2: Create a strong master password. Do not forget this!
          </Text>
          <TouchableOpacity style={styles.buttonButton} onPress={null}>
            <TextInput
              autoCapitalize={"none"}
              autoComplete={"off"}
              blurOnSubmit={true}
              autoCorrect={false}
              onChangeText={(text) => onChangeText(text)}
              value={value}
              style={styles.p}
            ></TextInput>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.buttonButton}
          onPress={() => submit(fileLoc)}
        >
          <Text style={styles.p}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
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
    marginLeft: width * 0.05,
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
