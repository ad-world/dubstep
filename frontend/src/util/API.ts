import { API_URL } from "./constants";
import {
  CreatePlaylistFromPlaylistRequest,
  DubstepResponse,
} from "../types/api";
import {
  SpotifyPlaylistResponse,
  SpotifyRecommendationResponse,
  SpotifyUser,
} from "../types/spotify";

export const getUserInfo = async (): Promise<SpotifyUser> => {
  const data = await fetch(`${API_URL}/me`, { credentials: "include" });
  const response: SpotifyUser = await data.json();

  return response;
};

export const logout = async (): Promise<boolean> => {
  const data = await fetch(`${API_URL}/logout`, { credentials: "include" });
  const response = await data.json();

  return response;
};

export const ping = async (): Promise<{ isLoggedIn: boolean }> => {
  const data = await fetch(`${API_URL}/ping`, { credentials: "include" });
  const response = await data.json();

  return response;
};

export const getPlaylists = async (): Promise<
  DubstepResponse<SpotifyPlaylistResponse>
> => {
  const data = await fetch(`${API_URL}/playlists`, {
    credentials: "include",
  });
  const res = await data.json();
  return res;
};

export const getRecommendations = async (
  playlist_id: string
): Promise<DubstepResponse<SpotifyRecommendationResponse>> => {
  const data = await fetch(`${API_URL}/recommendations`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({
      playlist_id,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const res = await data.json();
  return res;
};

export const createPlaylistFromPlaylist = async (
  createPlaylistRequest: CreatePlaylistFromPlaylistRequest
): Promise<DubstepResponse<any>> => {
  const data = await fetch(`${API_URL}/createPlaylistFromPlaylist`, {
    credentials: "include",
    method: "pos",
    body: JSON.stringify(createPlaylistRequest),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const res = await data.json();
  return res;
};
