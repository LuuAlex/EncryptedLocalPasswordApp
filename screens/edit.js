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
  Alert,
} from 'react-native';
var RNFS = require('react-native-fs');

export default function Edit({route, navigation}) {
  const {password, data, d} = route.params;
  const dataLoc = `${RNFS.DocumentDirectoryPath}/LocalPasswordStorageDATA`;

  const [name, setName] = React.useState(data[d].name);
  const [value1, setText1] = React.useState(data[d].user);
  const [value2, setText2] = React.useState(data[d].pass);

  async function confirmDelete() {
    return Alert.alert(
      'Confirm Delete Password',
      'Are you sure you want to delete this credential? This action cannot be reversed.',
      [
        {
          text: 'Delete',
          onPress: () => {
            deleteP();
          },
          style: 'destructive',
        },
        {text: 'No'},
      ],
    );
  }

  async function submit() {
    try {
      const fileUri1 = `${dataLoc}/user.txt`;
      const fileUri2 = `${dataLoc}/salt.txt`;

      const salt = await RNFS.readFile(fileUri2);
      const hashInfo = Encryption.hash(password, salt);

      var oldName = data[d].name.length
      delete data[d];
      const newID = `${name}${d.substr(oldName - d.length)}`

      data[newID] = {name: "", user: "", pass: ""}
      data[newID].name = name;
      data[newID].user = value1;
      data[newID].pass = value2;

      const newData = Encryption.encrypt(JSON.stringify(data), hashInfo);
      await RNFS.writeFile(fileUri1, newData);
    } catch {
      console.log('error edit password');
    }
    navigation.navigate('Home', {password: password});
  }

  async function deleteP() {
    try {
      const fileUri1 = `${dataLoc}/user.txt`;
      const fileUri2 = `${dataLoc}/salt.txt`;

      const salt = await RNFS.readFile(fileUri2);
      const hashInfo = Encryption.hash(password, salt);

      delete data[d];

      const newData = Encryption.encrypt(JSON.stringify(data), hashInfo);
      await RNFS.writeFile(fileUri1, newData);
    } catch {
      console.log('error delete');
    }
    navigation.navigate('Home', {password: password});
  }

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={styles.container}
      style={{backgroundColor: '#da635d'}}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.goBack('Home')}>
        <Text style={styles.nav}>&lt; Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton2} onPress={() => confirmDelete()}>
        <Text style={styles.nav}>&#x2715; DELETE</Text>
      </TouchableOpacity>
      <Text style={styles.h1}>Edit Credentials</Text>
      <View style={styles.buttonGroup}>
        <View style={styles.button}>
          <Text style={styles.p}>Edit account name:</Text>
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
          <Text style={styles.p}>Edit username:</Text>
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
          <Text style={styles.p}>Edit password:</Text>
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
          <Text style={styles.p}>Save Changes</Text>
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
  navButton2: {
    alignSelf: 'flex-start',
    position: 'absolute',
    marginLeft: width * 0.69,
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
