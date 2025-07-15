interface UserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: { spotify: string; };
    followers: { href: string; total: number; };
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

interface Image {
    url: string;
    height: number;
    width: number;
}


interface PlaylistTrack {
   track: {
        name: string;
        artists: {name: string } [];
        album: {
            name: string;
            images: { url: string }[];
        };
    } | null;
}
interface PlaylistResponse {
    name: string;
    description: string;
    images: {url: string } [];
    tracks: {
        items: PlaylistTrack[];
    };
    }
