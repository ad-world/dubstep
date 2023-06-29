import { createContext } from "react";

export interface UserContextProps {
  userid: string | null;
  access_token: string | null;
  username: string | null;
  profile_img: string | null;
}

export const UserContext = createContext<UserContextProps>({
  userid: null,
  username: null,
  access_token: null,
  profile_img: null,
});
