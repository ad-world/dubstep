import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { UserContext, UserContextProps } from "./contexts/userContext";
import { ChakraProvider } from "@chakra-ui/react";
const initialContext: UserContextProps = {
  userid: null,
  username: null,
  access_token: null,
  profile_img: null,
};

const doc = document.getElementById("root");

ReactDOM.createRoot(doc as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <UserContext.Provider value={initialContext}>
        <Router>
          <App />
        </Router>
      </UserContext.Provider>
    </ChakraProvider>
  </React.StrictMode>
);
