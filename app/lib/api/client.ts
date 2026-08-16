import { ApiError } from "../api-error";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function wpFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options);

  if (!res.ok) {
    throw new ApiError(`Request failed: ${path}`, res.status);
  }

  return res.json();
}
