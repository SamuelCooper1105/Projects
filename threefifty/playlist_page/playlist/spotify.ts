import * as Crypto from 'expo-crypto'; // For SHA-256 hashing
import * as SecureStore from 'expo-secure-store'; // Instead of localStorage

export const playlistId = "37vVbInEzfnXJQjVuU7bAZ";
export const clientId = "1586d326bf87450b94cc5d2dbec16f17";
export const redirectUri = "http://127.0.0.1:8081"; // your Expo redirect URI

export async function generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export async function generateCodeChallenge(codeVerifier: string) {
    const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        codeVerifier,
        { encoding: Crypto.CryptoEncoding.BASE64 }
    );

    return digest
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = await generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    await SecureStore.setItemAsync("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", redirectUri);
    params.append("scope", "playlist-read-private playlist-read-collaborative");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

    // Open this in a browser
    return authUrl;
}

export async function getAccessToken(clientId: string, code: string): Promise<string> {
    const verifier = await SecureStore.getItemAsync("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString()
    });

    const { access_token } = await result.json();
    return access_token;
}

export async function fetchPlaylistByID(token: string, playlistId: string): Promise<any> {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return await response.json();
}
