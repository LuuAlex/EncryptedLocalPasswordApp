import React from 'react';
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
  UseState,
  RefreshControl,
} from 'react-native';
var RNFS = require('react-native-fs');

export default function Home({ route, navigation }) {
  const { password } = route.params;

  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState(null);
  const dataLoc = `${RNFS.DocumentDirectoryPath}/LocalPasswordStorageDATA`;
  readFile();

  async function readFile() {
    const fileUri1 = `${dataLoc}/user.txt`;
    const fileUri2 = `${dataLoc}/salt.txt`;
    const salt = await RNFS.readFile(fileUri2);
    const hashInfo = Encryption.hash(password, salt);
    var content = await RNFS.readFile(fileUri1);
    var dContent = Encryption.decrypt(content, hashInfo);
    setData(dContent);
    return dContent;
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={styles.container}
      style={{backgroundColor:'#da635d'}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('New', {password: password})}>
        <Text style={styles.nav}>&#xFF0B; New</Text>
      </TouchableOpacity>
      <Text style={styles.h1}>Saved Credentials</Text>
      <Entry data={data} />
      <View style={{marginVertical:20}}></View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

export function Entry(data) {
  data = data.data;
  const dataAry = String(data).split('\n\n').slice(0, -1);
  const rv = dataAry.map(d => (
    <View key={d} style={styles.box}>
      <Text style={styles.boxP1}>{d.split('\n')[0]}</Text>
      <Text style={styles.boxP2}>Username: {d.split('\n')[1]}</Text>
      <Text style={styles.boxP2}>Password: {d.split('\n')[2]}</Text>
    </View>
  ));
  return rv;
}

async function getData(fileUri) {
  return await RNFS.readFile(fileUri);
}

var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#da635d',
    alignItems: 'center',
  },
  navButton: {
    alignSelf: 'flex-start',
    position: 'absolute',
    marginLeft: width * 0.78,
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
  box: {
    marginVertical: height * 0.01,
    marginHorizontal: width * 0.01,
    borderWidth: 3,
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: '#fff',
    backgroundColor: '#4e4e56',
  },
  boxP1: {
    marginVertical: height * 0.004,
    marginHorizontal: width * 0.05,
    width: width * 0.65,
    fontFamily: 'Helvetica',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  boxP2: {
    marginVertical: height * 0.004,
    marginHorizontal: width * 0.05,
    width: width * 0.65,
    fontFamily: 'Helvetica',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left',
  },
});

// Colors: https://www.color-hex.com/color-palette/3307
