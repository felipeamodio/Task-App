import React, {useState} from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import Login from './src/pages/Login';

export default function App() {
  const [user, setUser] = useState(null);

  if(!user){
    return <Login />
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6FC',
    paddingHorizontal: 10,
    paddingTop: 25
  }
})