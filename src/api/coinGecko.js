const BASE_URL ="https://api.coingecko.com/api/v3"

export const fetchCryptos = async() => {
  const response = await fetch(
    `${BASE_URL}YOUR API HERE`
  );
  if(!response.ok){
  throw new Error("Failed to fetch crypto")
  }
  return response.json();
};

export const fetchCoinData = async(id) => {
  const response = await fetch(
    `${BASE_URL}/coins/${id}YOUR API HERE`
  );
  if(!response.ok){
  throw new Error("Failed to fetch crypto")
  }
  return response.json();
};

export const fetchChartData = async (id) => {
  const response = await fetch(
    `${BASE_URL}/coins/${id}/YOUR API HERE`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch chart data");
  }

  return response.json();
};