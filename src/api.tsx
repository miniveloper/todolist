const BASE_URL = "https://api.coinpaprika.com/v1";

export const fetchCoins = async () => {
  const json = await (await fetch(`${BASE_URL}/coins`)).json();
  return json.slice(0, 100);
};

export const fetchChart = async (coinId: string) => {
  const json = await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
  return json;
};

export const fetchPrice = async (coinId: string) => {
  const json = await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
  return json;
};

export const fetchCoinHistory = async (coinId: string) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 14;

  const json = await (
    await fetch(
      `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
    )
  ).json();
  return json;
};
