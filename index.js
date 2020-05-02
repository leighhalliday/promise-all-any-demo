const axios = require("axios");
require("core-js/features/promise/any");

async function frankRates(currency) {
  const result = await axios.get(
    `https://api.frankfurter.app/latest?base=${currency}`
  );
  return { ...result.data, source: "frank" };
}

async function ratesRates(currency) {
  const result = await axios.get(
    `https://api.ratesapi.io/api/latest?base=${currency}`
  );
  return { ...result.data, source: "rates" };
}

async function all() {
  const currencies = ["USD", "CAD"];
  const promises = currencies.map(async (currency) => {
    const result = await axios.get(
      `https://api.ratesapi.io/api/latest?base=${currency}`
    );
    return result.data;
  });
  const rates = await Promise.all(promises);
  console.log(rates);
}

async function any() {
  const fastest = await Promise.any([frankRates("CAD"), ratesRates("CAD")]);
  console.log(fastest);
}

all();
any();
