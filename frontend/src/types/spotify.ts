export type SpotifyUser = {
  country: string;
  display_name: string;
  email: string;
  href: string;
  product: string;
  type: string;
  uri: string;
};

export type SpotifyPlaylistOwner = {
  display_name: string;
  href: string;
  id: string;
  type: string;
  uri: string;
};

export type SpotifyPlaylist = {
  collaborative: boolean;
  description: string | null;
  href: string;
  id: string;
  images: Array<SpotifyImage>;
  name: string;
  owner: SpotifyPlaylistOwner;
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
  };
  type: string;
  uri: string;
};

export type SpotifyImage = {
  height: number | null;
  width: number | null;
  url: string;
};

export type SpotifyPlaylistResponse = {
  href: string;
  items: Array<SpotifyPlaylist>;
  limit: number | null;
  next: number | null;
  offset: number | null;
  previous: number | null;
  total: number | null;
};

export type Seed = {
  afterFilteringSize: number;
  afterRelinkingSize: number;
  href: string | null;
  id: string | null;
  initialPoolSize: number;
  type: string;
};

export type SpotifyTrack = {
  album: object;
  artists: Array<{
    name: string;
    uri: string;
    id: string;
  }>;
  duration_ms: number;
  id: string;
  href: string;
  name: string;
  popularity: number;
  type: string;
  uri: string;
  preview_url: string;
};

export type SpotifyRecommendationResponse = {
  seeds: Array<Seed>;
  tracks: Array<SpotifyTrack>;
};
