import axios from "axios";

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY_TOKEN;

const api = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export const getPhotos = async (query = "", page = 1, perPage = 12) => {
  try {
    if (query) {
      const response = await api.get("/search/photos", {
        params: {
          query,
          page,
          per_page: perPage,
        },
      });

      return response.data.results;
    }

    const response = await api.get("/photos", {
      params: {
        page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch photos");
  }
};
