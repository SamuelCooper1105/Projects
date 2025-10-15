import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import PlaylistData from './Types'; // Assuming you have a type definition for PlaylistData

const clientId = "1586d326bf87450b94cc5d2dbec16f17"; 
//const params = new URLSearchParams(window.location.search);
//const code = params.get("code");
const playlistId = "37vVbInEzfnXJQjVuU7bAZ"




export default function MainFlow() {
  const [playlists, setPlaylists] = useState<PlaylistData | null>(null);
  const params = useLocalSearchParams();

  useEffect(() => {
    // Only run this effect on web
    if (Platform.OS !== 'web') return;

    const codeParam = params.code;
    const code = Array.isArray(codeParam) ? codeParam[0] : codeParam;

    if (!code) {
      redirectToAuthCodeFlow(clientId);
    } else {
      // Use an async function inside useEffect
      (async () => {
        const accessToken = await getAccessToken(clientId, code);
        const fetchedPlaylists = await fetchPlaylistByID(accessToken, playlistId);
        setPlaylists(fetchedPlaylists);
      })();
    }
  }, [params.code]); // Add dependencies as needed

  return (
    <PlaylistDisplay playlists ={playlists} />
  );

}

    const styles = StyleSheet.create({
     playlistTitle: {
      fontSize: 24,
     fontWeight: 'bold',
     marginBottom: 16,
     },
     trackItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      },
    });

export async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128); // generates a randome string for this session
    const challenge = await generateCodeChallenge(verifier); // a hashed version of the verifier, this uses SHA-256

    localStorage.setItem("verifier", verifier); // stores the verifier for later use during the roke nexchange

    const params = new URLSearchParams(); // creates a new query string for the authorization URL
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://127.0.0.1:8081/callback"); // adds in the OAuth2 parameters 
    params.append("scope", "user-read-private user-read-email playlist-read-private playlist-read-collaborative");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


export async function getAccessToken(clientId: string, code: string): Promise<string> {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://127.0.0.1:8081/callback");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

async function fetchPlaylistByID( token: string, playlistId: string): Promise<any>{
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`,
        {   method: "GET",
            headers: {
            Authorization: `Bearer ${token}` }
        });
        return await response.json();
    }


function PlaylistDisplay({ playlist }: any) {
    if(!playlist) {
        return <div>No playlist data.</div>;
    }
    return (
      <div>
        <h2>{playlist.name}</h2>
        {playlist.tracks.items.map((item: any) => (
          <p key={item.track.id}>
            {item.track.name} by {item.track.artists.map((a: any) => a.name).join(', ')}
          </p>
        ))}
      </div>
    );
}


