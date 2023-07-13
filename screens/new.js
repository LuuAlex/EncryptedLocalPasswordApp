import React from 'react';
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
import {StackActions, NavigationActions} from 'react-navigation';
var RNFS = require('react-native-fs');

export default function New({navigation}) {
  const dataLoc = `${RNFS.DocumentDirectoryPath}/LocalPasswordStorageDATA`;

  const [name, setName] = React.useState('');
  const [value1, setText1] = React.useState('');
  const [value2, setText2] = React.useState('');

  async function submit() {
    try {
      const fileUri1 = `${dataLoc}/user.txt`;
      const existingData = await RNFS.readFile(fileUri1);
      await RNFS.writeFile(
        fileUri1,
        `${existingData}${name}\n${value1}\n${value2}\n\n`,
      );
      console.log('wrote new password');
    } catch {
      console.log('error create new password password');
    }
    navigation.navigate('Home');
  }

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.goBack('Home')}>
        <Text style={styles.nav}>&lt; Back</Text>
      </TouchableOpacity>
      <Text style={styles.h1}>Add New Password</Text>
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
          <Text style={styles.p}>Save Password</Text>
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
