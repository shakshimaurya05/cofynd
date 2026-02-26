const BASE_URL = "https://coworkspaze.onrender.com/api/spaces";

const mapSpace = (space) => ({
  _id: space._id,
  name: space.companyName,
  location: space.microLocation,
  city: space.city,
  rating: space.rating || 4.5,
  pricePerMonth:
    space.pricing?.dedicatedSeat ||
    space.pricing?.cabinSeat ||
    0,
  image: space.images?.[0],
  images: space.images,
});

export async function fetchSpaces({ city }) {
  let url = BASE_URL;
  if (city) url = `${BASE_URL}/city/${city}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.map(mapSpace);
}


export async function fetchSpaceById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch space");
  return res.json();
}