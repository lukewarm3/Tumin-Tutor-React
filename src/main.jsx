import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { extendTheme } from "@chakra-ui/react";

const styles = {
  global: (props) => ({
    "html, body": {
      fontFamily: "'Poppins', sans-serif",
    },
  }),
};

const config = {
  initialColorMode: "light",
  useSystemColorMode: false, // set to true if you want to use the system color mode
};

const theme = extendTheme({ config, styles });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
