const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY_TOKEN;
const API_URL = "https://api.unsplash.com";

export const getPhotos = async (query = "", page = 1, perPage = 12) => {
  let url;
  if (query) {
    url = `${API_URL}/search/photos?client_id=${ACCESS_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}&per_page=${perPage}`;
  } else {
    url = `${API_URL}/photos?client_id=${ACCESS_KEY}&page=${page}&per_page=${perPage}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch photos");
  }
  const data = await response.json();
  return query ? data.results : data;
};
