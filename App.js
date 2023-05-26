import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Encrypted Local Password Manager</Text>
      <Text style={styles.p}>Please make a selection below:</Text>
      <Button 
        style={styles.button}
        onPress={null} 
        title='I need a new password database (new users)' />
      <Button 
        style={styles.button}
        onPress={null} 
        title='I already have an existing password database' />
      <StatusBar style="auto" />
    </View>
  );
}

var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#da635d',
    alignItems: 'center',
  },
  h1: {
    marginTop: height * 0.1,
    marginLeft: width * 0.02,
    marginRight: width * 0.02,
    fontFamily: 'Helvetica',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
  },
  p: {
    marginTop: height * 0.05,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    fontFamily: 'Helvetica',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },
  button: {
    marginTop: height * 0.2,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    fontFamily: 'Helvetica',
    color: '#fff',
    backgroundColor: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },
});

// Colors: https://www.color-hex.com/color-palette/3307
