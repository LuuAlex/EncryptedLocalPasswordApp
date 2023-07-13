import React from "react";
import Encryption from '../encryption_tools/encryption.js'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
} from "react-native";
import DocumentPicker from "react-native-document-picker";
var RNFS = require('react-native-fs');

export default function NewDB({ navigation }) {

  const [fileLoc, setFileLoc] = React.useState("");
  const [fileName, setFileName] = React.useState("Choose Folder");
  const [value, setText] = React.useState("");

  const pickDirectory = async () => {
    try {
      const response = await DocumentPicker.pickDirectory({
        allowMultiSelection: false,
      });
      setFileLoc(RNFS.DocumentDirectoryPath); // OLD arg: response.uri
      const ary = response.uri.split("/")
      setFileName(ary[ary.length - 2]);
    } catch (err) {
      console.warn(err);
    }
  };

  async function submit() {
    const fileUri = `${fileLoc}/LocalPasswordStorageDATA`;
    try {
      const fileUri1 = `${fileUri}/user.txt`;
      const fileUri2 = `${fileUri}/salt.txt`;
      await RNFS.mkdir(`${fileLoc}/LocalPasswordStorageDATA`);
      //const hashInfo = Encryption.hash(value, false);
      //await RNFS.writeFile(fileUri1, Encryption.encrypt("", hashInfo));
      //await RNFS.writeFile(fileUri2, hashInfo);
      await RNFS.writeFile(fileUri1, "");
      await RNFS.writeFile(fileUri2, "");
      console.log("Created files");
    } catch {
      console.log("Error creating files");
    }
    navigation.navigate("Home", { password: "test" });
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
            <Text style={styles.p}>{fileName}</Text>
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
              onChangeText={(text) => setText(text)}
              value={value}
              style={styles.p}
            ></TextInput>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.buttonButton}
          onPress={submit}
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
