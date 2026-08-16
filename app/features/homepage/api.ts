import { wpFetch } from "~/lib/api/client";

export async function fetchHome() {
  const [page] = await wpFetch<any[]>("/pages?slug=home");

  const [heroImage, heroBanner] = await Promise.all([
    page.acf.hero_image ? wpFetch(`/media/${page.acf.hero_image}`) : null,
    page.acf.hero_banner ? wpFetch(`/media/${page.acf.hero_banner}`) : null,
  ]);
  

  return { ...page.acf, heroImage, heroBanner };
}
