import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

/**
 * Important: For a real app it could be better to use Mocks
 * In this case the actual query is run for simplicity
 */
const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache()
});

test("Search for Colombia by code works", async () => {
  const { container } = render(
    <MemoryRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </MemoryRouter>
  );

  let findByCodeInput = container.getElementsByClassName("find-by-code")[0];

  // Change search value to co (lowercase).
  fireEvent.change(findByCodeInput, { target: { value: "co" } });

  findByCodeInput = container.getElementsByClassName("find-by-code")[0];

  const goButton = container.querySelector("form button");

  fireEvent.click(goButton);

  // Check if Colombia was found by checking the capital.
  expect(await screen.findByText("Bogotá")).toBeInTheDocument();
});
