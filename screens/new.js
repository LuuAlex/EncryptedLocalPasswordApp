import React from 'react';
import Encryption from '../encryption_tools/encryption.js';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';
var RNFS = require('react-native-fs');

export default function New({route, navigation}) {
  const {password} = route.params;
  const dataLoc = `${RNFS.DocumentDirectoryPath}/LocalPasswordStorageDATA`;

  const [name, setName] = React.useState('');
  const [value1, setText1] = React.useState('');
  const [value2, setText2] = React.useState('');

  async function submit() {
    try {
      const fileUri1 = `${dataLoc}/user.txt`;
      const fileUri2 = `${dataLoc}/salt.txt`;

      const existingDataE = await RNFS.readFile(fileUri1);
      const salt = await RNFS.readFile(fileUri2);
      const hashInfo = Encryption.hash(password, salt);

      const existingDATA = Encryption.decrypt(existingDataE, hashInfo);
      const existingJSON = JSON.parse(existingDATA);
      const len = Object.keys(existingJSON).length;
      existingJSON[`${name}${name.length}+${randomString(15)}id${len}`] = {
        name: name,
        user: value1,
        pass: value2,
      };

      const newData = Encryption.encrypt(
        JSON.stringify(existingJSON),
        hashInfo,
      );
      await RNFS.writeFile(fileUri1, newData);
    } catch {
      console.log('error create new password');
    }
    navigation.navigate('Home', {password: password});
  }

  function randomString(length) {
    let rv = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const totalLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      rv += characters.charAt(Math.floor(Math.random() * totalLength));
    }
    return rv;
  }

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={styles.container}
      style={{backgroundColor: '#da635d'}}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.goBack('Home')}>
        <Text style={styles.nav}>&lt; Back</Text>
      </TouchableOpacity>
      <Text style={styles.h1}>Add New Credentials</Text>
      <Text style={styles.p}></Text>
      <View style={styles.buttonGroup}>
        <View style={styles.button}>
          <Text style={styles.p}>Enter account name:</Text>
          <TouchableOpacity style={styles.buttonButton} onPress={null}>
            <TextInput
              autoCapitalize={'none'}
              autoComplete={'off'}
              blurOnSubmit={true}
              autoCorrect={false}
              value={name}
              onChangeText={text => setName(text)}
              style={styles.p}></TextInput>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <Text style={styles.p}>Enter username:</Text>
          <TouchableOpacity style={styles.buttonButton} onPress={null}>
            <TextInput
              autoCapitalize={'none'}
              autoComplete={'off'}
              blurOnSubmit={true}
              autoCorrect={false}
              value={value1}
              onChangeText={text => setText1(text)}
              style={styles.p}></TextInput>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <Text style={styles.p}>Enter password:</Text>
          <TouchableOpacity style={styles.buttonButton} onPress={null}>
            <TextInput
              autoCapitalize={'none'}
              autoComplete={'off'}
              blurOnSubmit={true}
              autoCorrect={false}
              value={value2}
              onChangeText={text => setText2(text)}
              style={styles.p}></TextInput>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.buttonButton} onPress={submit}>
          <Text style={styles.p}>Save Credentials</Text>
        </TouchableOpacity>
      </View>
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
    marginLeft: width * 0.06,
    marginTop: height * 0.065,
  },
  nav: {
    fontFamily: 'Helvetica',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'flex-start',
    position: 'absolute',
  },
  h1: {
    marginTop: height * 0.14,
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
