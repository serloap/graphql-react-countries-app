import { Currency } from "./types";

export const getCurrencies = (countries: Currency[] = []) =>
  new Set( // To avoid duplicated currencies
    countries
      .map(({ currency }) => (currency || "").split(",")) // Needed for countries that have multiple currencies, like Zimbabwe
      .flat() // Flatten arrays generated in the previous map (merge subarrays to the first level array)
      .filter((currency) => currency) // Remove empty strings
      .sort((a: string, b: string) => a.localeCompare(b)) // Order alphabetically
  );

export const getMappedFilters = (
  continents: { [key: string]: boolean },
  currencies: string[]
) => {
  const _currencies = currencies.filter((currency) => currency);
  const _continents = Object.entries(continents)
    .filter(([__, value]) => value)
    .map(([key]) => key);

  return {
    currencies: _currencies.length ? _currencies.join("|") : undefined,
    continents: _continents.length ? _continents : undefined
  };
};


export const tickets = (queue: number[], ticketPrice = 25, bills = [ticketPrice, 50, 100]) => {
  console.log('Tickets queue: ', queue); // eslint-disable-line no-console.

  const availableBills: { [key: number]: number } = Object.assign({}, ...bills.map((key) => ({ [key]: 0 })));

  if (bills.indexOf(ticketPrice) === -1) {
    throw new Error('There\'s no bill equals to the ticket price.');
  }

  for (let i = 0; i < queue.length; i += 1) {
    if (bills.indexOf(queue[i]) === -1) {console.log(bills, queue[i]);
      throw new Error('Person is paying with a not existing / not allowed bill.');
    }

    if (queue[i] < ticketPrice) {
      console.log('Final Bills Quantity: ', availableBills); // eslint-disable-line no-console.
      
      return 'NO'; // Doesn't have enough money.
    }
    
    if (queue[i] === ticketPrice) {
      availableBills[ticketPrice] += 1;
    } else {
      let remaingChange = queue[i] - ticketPrice;

      // Biggest bills first
      [...bills].reverse().forEach((bill) => {
        if (bill <= remaingChange) { // Ignore bills bigger than the change.
          const neededBills = Math.floor(remaingChange / bill);

          if (availableBills[bill] >= neededBills) {
            availableBills[bill] -= neededBills;
            remaingChange = remaingChange - (bill * neededBills);
          }
        }
      });

      if (remaingChange === 0) {
        availableBills[queue[i]] += 1; // Could give change, save the received bill.
      } else {
        console.log('Final Bills Quantity: ', availableBills); // eslint-disable-line no-console.

        return 'NO';
      }
    }
  }

  console.log('Final Bills Quantity: ', availableBills); // eslint-disable-line no-console.
  
  return 'YES';
} 
