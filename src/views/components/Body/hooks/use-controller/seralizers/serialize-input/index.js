const numbers = new Set([
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
]);

export default (value) => ({
  type: numbers.has(String(value)) ? "number" : "operation",
  value: String(value),
});
