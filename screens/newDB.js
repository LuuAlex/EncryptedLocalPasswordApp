import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

export default function NewDB({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("InitialLand")}
      >
        <Text style={styles.nav}>&lt; Back</Text>
      </TouchableOpacity>
      <Text style={styles.h1}>Create a New Password Database</Text>
      <Text style={styles.p}>Please select a file location for the database and make a master password. Do not forget your master password!</Text>
      <View style={styles.buttonGroup}>
        <View style={styles.button}>
          <TouchableOpacity style={styles.buttonButton} onPress={null}>
            <Text style={styles.p}>I need a new password database</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.buttonButton} onPress={null}>
            <Text style={styles.p}>
              I already have an existing password database
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
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
    marginHorizontal: width * 0.02,
    fontFamily: "Helvetica",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
  },
  p: {
    marginVertical: height * 0.02,
    marginHorizontal: width * 0.05,
    fontFamily: "Helvetica",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  buttonGroup: {
    marginTop: height * 0.05,
  },
  button: {
    marginVertical: height * 0.02,
    marginHorizontal: width * 0.05,
  },
  buttonButton: {
    borderWidth: 8,
    borderStyle: "solid",
    borderRadius: 25,
    borderColor: "#fff",
    backgroundColor: "#4e4e56",
  },
});

// Colors: https://www.color-hex.com/color-palette/3307
