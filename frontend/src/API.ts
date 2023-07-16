import { API_URL } from "./constants";
import { DubstepResponse } from "./types/api";
import { SpotifyPlaylistResponse, SpotifyUser } from "./types/spotify";

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
