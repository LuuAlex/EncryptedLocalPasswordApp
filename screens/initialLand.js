import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

export default function InitialLand({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Encrypted Local Password Manager</Text>
      <Text style={styles.p}>Please make a selection below:</Text>
      <View style={styles.buttonGroup}>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.buttonButton}
            onPress={() => navigation.navigate("NewDB")}
          >
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
  h1: {
    marginTop: height * 0.16,
    marginHorizontal: width * 0.02,
    fontFamily: "Helvetica",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
  },
  p: {
    marginVertical: height * 0.025,
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
