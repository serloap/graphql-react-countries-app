import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import * as ReactDOMClient from "react-dom/client";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement || document.createElement('div'));

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache()
});

root.render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);
