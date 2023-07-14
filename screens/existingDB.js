import React from 'react';
import Encryption from '../encryption_tools/encryption.js';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
var RNFS = require('react-native-fs');

export default function ExistingDB({navigation}) {
  const [value, setText] = React.useState('');
  const [incorrect, setIncorrect] = React.useState('');
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);

  async function submit() {
    const fileUri = `${RNFS.DocumentDirectoryPath}/LocalPasswordStorageDATA`;
    const fileUri2 = `${fileUri}/salt.txt`;
    const fileUri3 = `${fileUri}/hash.txt`;
    const salt = await RNFS.readFile(fileUri2);
    const hash = await RNFS.readFile(fileUri3);
    if (!Encryption.passCheck(value, salt, hash)) {
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
        }, 2000);
    } else {
      console.log('logged in');
      navigation.navigate('Home', {password: value});
    }

  }

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={styles.container}
      style={{backgroundColor:'#da635d'}}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('InitialLand')}>
        <Text style={styles.nav}>&lt; Back</Text>
      </TouchableOpacity>
      <Text style={styles.h1}>Existing Password Database</Text>
      <Text style={styles.p}>
        Please enter your master password. Unfortunately, if you forgot it, there is no way to recover your saved passwords. 
      </Text>
      <View style={styles.buttonGroup}>
        <View style={styles.button}>
          <Text style={styles.p}>
            Enter your master password:
          </Text>
          <TouchableOpacity style={styles.buttonButton} onPress={null}>
            <TextInput
              autoCapitalize={'none'}
              autoComplete={'off'}
              blurOnSubmit={true}
              autoCorrect={false}
              onChangeText={text => setText(text)}
              value={value}
              style={styles.p}></TextInput>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.buttonButton} onPress={submit}>
          <Text style={styles.p}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
      {isAlertVisible && <Text style={styles.p}>{incorrect}
        Incorrect Password. Try Again.
      </Text>}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#da635d',
    alignItems: 'center',
  },
  navButton: {
    alignSelf: 'flex-start',
    position: 'absolute',
    marginLeft: width * 0.05,
    marginTop: height * 0.061,
  },
  nav: {
    fontFamily: 'Helvetica',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'flex-start',
    position: 'absolute',
  },
  h1: {
    marginTop: height * 0.12,
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.02,
    fontFamily: 'Helvetica',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
  },
  p: {
    marginVertical: height * 0.004,
    marginHorizontal: width * 0.05,
    fontFamily: 'Helvetica',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
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
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: '#fff',
    backgroundColor: '#4e4e56',
  },
});

// Colors: https://www.color-hex.com/color-palette/3307
