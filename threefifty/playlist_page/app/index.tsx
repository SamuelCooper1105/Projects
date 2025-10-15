import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Linking, ScrollView, Text, View } from 'react-native';
import {
  clientId,
  fetchPlaylistByID,
  getAccessToken,
  playlistId,
  redirectToAuthCodeFlow,
} from '../playlist/spotify';

export default function HomeScreen() {
  const { code } = useLocalSearchParams();
  const [playlist, setPlaylist] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // If no code param, redirect to Spotify auth
        if (!code) {
          const authUrl = await redirectToAuthCodeFlow(clientId);
          Linking.openURL(authUrl);
          return;
        }
        console.log('Code param:', code);
        const token = await getAccessToken(clientId, code as string);
        console.log('Access token:', token);
        const playlistData = await fetchPlaylistByID(token, playlistId);
        console.log('playlist data:', playlistData);
        setPlaylist(playlistData);
      } catch (err) {
        console.error('Error fetching playlist:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [code]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  if (!playlist) {
    return <Text>No playlist loaded</Text>;
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{playlist.name}</Text>
      <Text>Owner: {playlist.owner.display_name}</Text>
      {playlist.images?.[0]?.url && (
        <Image
          source={{ uri: playlist.images[0].url }}
          style={{ width: 300, height: 300, marginVertical: 20 }}
        />
      )}

      {playlist.tracks.items.map((item: any, index: number) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text>{item.track.name} – {item.track.artists.map((a: any) => a.name).join(', ')}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
