import { tickets } from '../utils';

test("Tickets function works", async () => {
  const testResult1 = tickets([25, 25, 50]);
  expect(testResult1).toBe('YES');

  const testResult2 = tickets([25, 100]);
  expect(testResult2).toBe('NO');

  const testResult3 = tickets([25, 25, 50, 50, 100]);
  expect(testResult3).toBe('NO');

  const testResult4 = tickets([25, 25, 50, 25, 25, 100]);
  expect(testResult4).toBe('YES');

  // Test with different bills
  const testResult5 = tickets([5, 10, 5, 10, 5, 25], 5, [5, 10, 25]);
  expect(testResult5).toBe('YES');
})
