import { ApiError } from "../api-error";

const BASE_URL = import.meta.env.VITE_API_URL;

const cache = new Map<string, { data: any; expiry: number }>();

export async function wpFetch<T>(
  path: string,
  options?: RequestInit,
  ttlMs = 60_000,
): Promise<T> {
  const cached = cache.get(path);
  if (cached && cached.expiry > Date.now()) return cached.data as T;

  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) throw new ApiError(`Request failed: ${path}`, res.status);

  const data = await res.json();
  cache.set(path, { data, expiry: Date.now() + ttlMs });
  return data;
}

export async function wpFetchWithMeta<T>(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}${path}`, options);

  if (!res.ok) {
    throw new ApiError(`Request failed: ${path}`, res.status);
  }

  return {
    data: (await res.json()) as T,
    total: Number(res.headers.get("X-WP-Total") ?? 0),
    totalPages: Number(res.headers.get("X-WP-TotalPages") ?? 0),
  };
}
