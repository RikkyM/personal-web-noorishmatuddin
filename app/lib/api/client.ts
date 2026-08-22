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

export async function wpFetchWithMeta<T>(
  path: string,
  options?: RequestInit
) {
  const res = await fetch(`${BASE_URL}${path}`, options);

  if (!res.ok) {
    throw new ApiError(`Request failed: ${path}`, res.status);
  }

  return {
    data: (await res.json()) as T,
    total: Number(res.headers.get('X-WP-Total') ?? 0),
    totalPages: Number(res.headers.get("X-WP-TotalPages") ?? 0)
  }
}
