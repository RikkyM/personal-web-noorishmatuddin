import { wpFetch } from "~/lib/api/client";

export async function fetchHome() {
  const [page] = await wpFetch<any[]>("/pages?slug=home");
  const news = await wpFetch<any[]>("/posts?per_page=4&orderBy=date&order=desc&_embed")

  // const [heroImage, heroBanner, subHero1, subHero2] = await Promise.all([
  //   page.acf.hero_image ? wpFetch(`/media/${page.acf.hero_image}`) : null,
  //   page.acf.hero_banner ? wpFetch(`/media/${page.acf.hero_banner}`) : null,
  //   page.acf.sub_hero_1 ? wpFetch(`/media/${page.acf.sub_hero_1}`) : null,
  //   page.acf.sub_hero_2 ? wpFetch(`/media/${page.acf.sub_hero_2}`) : null,
  // ]);
  const ids = [
    page.acf.hero_image,
    page.acf.hero_banner,
    page.acf.sub_hero_1,
    page.acf.sub_hero_2,
  ].filter(Boolean);
  const mediaList = ids.length
    ? await wpFetch<any[]>(
        `/media?include=${ids.join(",")}`,
        undefined,
        3600_000,
      )
    : [];

  // return { ...page.acf, news };

  const mediaById = new Map(mediaList.map((m) => [m.id, m]));

  const heroImage = mediaById.get(page.acf.hero_image) ?? null;
  const heroBanner = mediaById.get(page.acf.hero_banner) ?? null;
  const subHero1 = mediaById.get(page.acf.sub_hero_1) ?? null;
  const subHero2 = mediaById.get(page.acf.sub_hero_2) ?? null;

  return { ...page.acf, heroImage, heroBanner, subHero1, subHero2, news };
}
