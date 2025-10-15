export default interface PlaylistData {
  name: string;
  tracks: {
    items: Array<{
      track: {
        id: string;
        name: string;
        album: {
          images: Array<{ url: string }>;
        };
      };
    }>;
  };
}