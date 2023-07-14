import { API_URL } from "./constants";
import { SpotifyUser } from "./types/spotify";

export const getUserInfo = async (): Promise<SpotifyUser> => {
  const data = await fetch(`${API_URL}/me`, { credentials: "include" });
  const response: SpotifyUser = await data.json();

  return response;
};
