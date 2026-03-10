const BASE_URL = "https://api.coworkspaze.com/api/spaces";

const optimizeCloudinaryUrl = (url) => {
  if (!url || !url.includes('cloudinary')) return url;
  return url.replace('/upload/', '/upload/f_auto,q_auto,w_400/');
};

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
  image: optimizeCloudinaryUrl(space.images?.[0]),
  images: space.images?.map(optimizeCloudinaryUrl) || [],
});

export async function fetchSpaces({ city, page = 1, limit = 20 }) {
  let url = BASE_URL;
  if (city) url = `${BASE_URL}/city/${city}`;

  url += `?page=${page}&limit=${limit}`;

  const res = await fetch(url);
  const data = await res.json();

  // Handle paginated response
  if (data.spaces) {
    return {
      spaces: data.spaces.map(mapSpace),
      pagination: data.pagination
    };
  }

  // Handle non-paginated response (for other routes)
  return { spaces: data.map(mapSpace), pagination: null };
}

export async function fetchSpacesByLocation({ city, microLocation, page = 1, limit = 20 }) {
  const url = `${BASE_URL}/city/${city}/microLocation/${encodeURIComponent(microLocation)}?page=${page}&limit=${limit}`;
  
  const res = await fetch(url);
  const data = await res.json();

  if (data.spaces) {
    return {
      spaces: data.spaces.map(mapSpace),
      pagination: data.pagination
    };
  }

  return { spaces: (data || []).map(mapSpace), pagination: null };
}


export async function fetchSpaceById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch space");
  return res.json();
}