import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import MainFlow from './spotfyflow'; // or './mainflow' — adjust to your actual filename

export default function Index() {
  const [startAuth, setStartAuth] = useState(false);

  if (startAuth) {
    return <MainFlow />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Spotify Playlist Viewer</Text>
      <Button
        title="Login with Spotify"
        onPress={() => setStartAuth(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});