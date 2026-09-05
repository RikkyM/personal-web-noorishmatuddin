import { wpFetch } from "~/lib/api/client";

export async function fetchNews() {
  const news = await wpFetch<any[]>(
    "/posts?per_page=4&orderBy=date&order=desc&_embed",
  );
  return news;
}
