const BASE_URL = "https://api.coingecko.com/api/v3/";
const API_KEY = "CG-su1buyJaWubhAn9Bttng9R3w";

function getCoinList(vs_currency) {
  return `${BASE_URL}coins/markets?x_cg_demo_api_key=${API_KEY}&vs_currency=${vs_currency}&order=market_cap_desc&per_page=20&page=1`;
}

export { getCoinList };
