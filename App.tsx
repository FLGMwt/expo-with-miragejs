import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-browser-polyfill';
import { Server } from '@miragejs/server';

new Server({
  routes() {
    this.namespace = '/api';
    this.get('/users', () => [
      { id: '1', name: 'Luke' },
      { id: '2', name: 'Leah' },
      { id: '3', name: 'Anakin' },
    ]);
  },
});

export default function App() {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(json => setUsers(json));
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      {users.map(user => (
        <Text key={user.id}>{user.name}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
