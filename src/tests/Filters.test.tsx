import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Filters from "../components/Filters";

/**
 * Important: For a real app it could be better to use Mocks
 * In this case the actual query is run for simplicity
 */
const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache()
});  

test("Add currency button works", async () => {
  const { container } = render(
    <ApolloProvider client={client}>
      <Filters setFilters={() => {}} />
    </ApolloProvider>
  );

  // Await until Currency subtitle is shown (after the query finished)
  expect(await screen.findByText("Currency")).toBeInTheDocument();

  let selects = container.getElementsByClassName('form-select');

  const addCurrencyButton = container.getElementsByClassName('filters__add-currency')[0];

  expect(selects.length).toBe(1); // One select exists by default

  fireEvent.click(addCurrencyButton);

  selects = container.getElementsByClassName('form-select');

  // Check if currency select was added successfully
  expect(selects.length).toBe(2);
});
