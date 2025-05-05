import ky from "ky";

export const restApi = ky.create({
  prefixUrl: import.meta.env.VITE_REST_API_URL ?? "",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000 * 40, // 40 seconds
});
