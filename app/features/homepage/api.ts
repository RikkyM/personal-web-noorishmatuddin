import { wpFetch } from "~/lib/api/client";

export async function fetchHome() {
  const [page] = await wpFetch<any[]>("/pages?slug=home");

  const [heroImage, heroBanner, subHero1, subHero2] = await Promise.all([
    page.acf.hero_image ? wpFetch(`/media/${page.acf.hero_image}`) : null,
    page.acf.hero_banner ? wpFetch(`/media/${page.acf.hero_banner}`) : null,
    page.acf.sub_hero_1 ? wpFetch(`/media/${page.acf.sub_hero_1}`) : null,
    page.acf.sub_hero_2 ? wpFetch(`/media/${page.acf.sub_hero_2}`) : null,
  ]);

  return { ...page.acf, heroImage, heroBanner, subHero1, subHero2 };
}
