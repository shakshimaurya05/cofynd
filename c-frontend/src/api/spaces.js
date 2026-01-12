const BASE_URL = "http://localhost:5000/api/spaces";

export async function fetchSpaces({ spaceType, city }) {
  let url = BASE_URL;

  if (spaceType && city) {
    url = `${BASE_URL}/type/${spaceType}?city=${city}`;
  } else if (spaceType) {
    url = `${BASE_URL}/type/${spaceType}`;
  } else if (city) {
    url = `${BASE_URL}/city/${city}`;
  }

  const res = await fetch(url);
  return res.json();
}
