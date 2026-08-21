import { ArrowRight } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { fetchHome } from "~/features/homepage/api";
import { socials } from "~/features/homepage/socials";
import { fetchSiteSettings } from "~/features/settings/api";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Noor Ishmatuddin, S.I.P. - Bersama Membangun Banyuasin" },
    {
      name: "description",
      content: "Noor Ishmatuddin",
    },
  ];
}

export async function loader() {
  const [home, settings] = await Promise.all([
    fetchHome(),
    fetchSiteSettings(),
  ]);

  return {
    home,
    settings,
  };
}

export default function Home() {
  const initialData = useLoaderData<typeof loader>();

  const { home: data, settings } = initialData;

  const socialMedia = settings?.social_media;

  return (
    <>
      <section
        className={`relative h-170 overflow-hidden bg-black/80 bg-cover bg-center md:min-h-160`}
        style={{
          backgroundImage: `url(${data?.heroBanner?.link})`,
        }}
      >
        <div className="absolute inset-0 bg-gray-700/60" />
        <img
          src={data?.heroImage?.link}
          alt={data?.hero_title}
          className="absolute inset-x-0 -bottom-32 mx-auto max-h-160 min-h-140 object-cover object-center md:-bottom-20 md:h-150 lg:h-180"
        />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl">
          <div
            className={cn(
              "flex flex-1 flex-col items-center gap-2 px-5 py-20 text-white text-shadow-black text-shadow-sm md:max-w-100",
              "md:items-start md:justify-center md:py-0",
            )}
          >
            <h1
              className={cn(
                "text-center text-2xl font-bold text-balance uppercase",
                "md:text-left md:text-3xl lg:text-4xl",
              )}
            >
              {data?.hero_title}
            </h1>
            <p
              className={cn(
                "text-center text-xl font-semibold text-pretty",
                "md:w-120 md:text-left md:text-base lg:text-lg",
              )}
            >
              {data?.hero_subtext}
            </p>
          </div>
          <div
            className={cn(
              "flex hidden flex-1 flex-col items-center gap-2 px-5 text-white text-shadow-black text-shadow-sm",
              "md:flex md:items-start md:py-20",
            )}
          >
            <div className="self-end text-pretty md:max-w-80 lg:max-w-96">
              <h2 className="text-3xl font-semibold">{data?.hero_subtext2}</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {(
          [
            {
              image: data.subHero1,
              title: data.sub_hero_1_title,
              subtitle: data.sub_hero_1_subtitle,
            },
            {
              image: data.subHero2,
              title: data?.sub_hero_2_title,
              subtitle: data?.sub_hero_2_subtitle,
            },
          ] as const
        ).map((item, index) => {
          return (
            <div
              key={index}
              className="relative flex min-h-55 items-center justify-center overflow-hidden p-5 text-pretty text-white md:min-h-65.5 md:justify-start"
            >
              <div
                className="absolute inset-0 bg-cover bg-center grayscale-100"
                style={{ backgroundImage: `url(${item?.image?.link})` }}
              />
              <div className="absolute inset-0 bg-gray-800/40 brightness-10" />
              <div className="relative flex flex-col gap-2">
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="max-w-md text-xs md:text-sm">{item.subtitle}</p>
                <button
                  type="button"
                  className="relative mt-4 w-max cursor-pointer rounded bg-[#840000] px-5 py-2 text-sm shadow"
                >
                  Lihat Lebih Lanjut
                </button>
              </div>
            </div>
          );
        })}

        <div className="flex min-h-55 items-center justify-center overflow-hidden bg-[#840000] p-5 text-pretty text-white sm:col-span-2 md:min-h-45.5 md:justify-start lg:col-span-1">
          <div className="relative grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            <h2 className="text-lg font-bold sm:self-center sm:text-center lg:self-start lg:text-left">
              {data.sub_hero_3_title}
            </h2>
            <p className="max-w-md text-xs md:text-sm">
              {data.sub_hero_3_subtitle}
            </p>
            <button
              type="button"
              className="relative mt-4 w-max cursor-pointer rounded border-2 border-[#FFCC00] px-5 py-2 text-sm shadow sm:m-auto lg:m-0"
            >
              Bergabung
            </button>
          </div>
        </div>
      </section>
      <section className="overflow-hidden bg-white py-24 md:py-28">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 md:flex-row md:gap-0">
          <div className="flex-1">
            <img
              src="/ishmatfront.png"
              alt="ishmat"
              className="mx-auto w-full max-w-72 md:h-120 md:w-max md:max-w-full"
            />
          </div>
          <div className="flex flex-1 flex-col gap-5 px-4 md:px-5">
            <div
              className={cn(
                "relative w-max",
                'after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:w-28 after:bg-[#840000] after:content-[""] after:md:w-72',
              )}
            >
              <h1
                className={cn(
                  "relative w-max text-center text-lg font-semibold text-[#840000] md:text-3xl",
                )}
              >
                {data?.hero_title}
              </h1>
              <p className="text-sm text-gray-500">
                WAKIL KETUA DPRD BANYUASIN
              </p>
            </div>
            <p className="text-sm text-pretty text-wrap text-gray-500">
              {data?.profile_singkat}
            </p>
            <Link
              to="/profil"
              className="w-max bg-[#840000] px-4 py-1.5 text-sm font-bold text-white"
            >
              LIHAT LEBIH LANJUT
            </Link>
          </div>
        </div>
      </section>
      {/* Section-Sosmed */}
      <section className="l g:pt-5 bg-white pt-10 lg:pb-20">
        <div className="mx-auto max-w-6xl space-y-5 lg:px-5">
          <h1 className="text-center text-lg font-bold text-black md:text-2xl lg:text-left lg:text-4xl">
            Terhubung dengan Noor
          </h1>
          <div className="grid bg-gray-500 sm:grid-cols-2 lg:grid-cols-4">
            {socials.map((item) => {
              const social = socialMedia[item.key];

              const { key, icon: Icon, label } = item;
              const { url, image } = social;

              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  className="group relative flex min-h-40 overflow-hidden select-none md:min-h-44 lg:aspect-4/3"
                >
                  {image && (
                    <img
                      src={image}
                      alt={label}
                      className="absolute inset-0 h-full w-full object-cover object-center grayscale-100 transition-[scale,filter] duration-250 group-hover:scale-105 group-hover:grayscale-0 lg:object-center"
                    />
                  )}
                  <div className="flex w-full items-end justify-between p-3 font-medium text-white">
                    <div className="relative flex items-center gap-3">
                      <Icon
                        // data={icon}
                        // type="image/svg+xml"
                        className="w-6 rounded-full bg-white grayscale-100 transition-[filter] duration-150 duration-250 group-hover:grayscale-0"
                      />
                      <h2 className="text-shadow-gray-600 text-shadow-md">
                        {label}
                      </h2>
                    </div>
                    <ArrowRight />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
      {/* End-Section-Sosmed */}

      <section className="overflow-hidden bg-[#840000] px-5 py-14 md:py-20">
        <div className="mx-auto flex max-w-6xl touch-pan-y flex-col gap-8 md:flex-row md:gap-4">
          <div className="flex-1 text-white">
            <div className="mx-auto max-w-110 md:mx-0">
              <h2 className="text-center text-3xl font-semibold md:max-w-72 md:text-left">
                SEKILAS PARTAI GERINDRA
              </h2>
              <div className="mx-auto mt-4 mb-8 h-0.5 w-72 rounded-full bg-white md:mx-0 lg:my-12" />
              <p className="text-center text-sm text-pretty md:text-left md:text-base">
                Partai GERINDRA adalah Partai Nasionalis-Religius, Partai
                Terbuka, Partai Tengah, Partai yang menjunjung tinggi Pluralisme
                dan partai yang peduli pada Rakyat Kecil.
              </p>
            </div>
          </div>
          <div className="flex-1">
            <iframe
              // width="570"
              // height="321"
              className="mx-auto aspect-video max-h-72 md:mx-0 md:max-h-max"
              src="https://www.youtube.com/embed/-ezWF-LO8Zo"
              title="Mars Gerindra"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white py-14 md:px-5 md:py-20">
        <div className="mx-auto max-w-6xl space-y-5">
          <div className="text-center md:text-left">
            <h1 className="text-lg font-semibold text-[#840000]">
              Kegiatan Saya
            </h1>
            <p className="text-xl font-bold text-black md:text-3xl">
              Ikuti terus kegiatan Saya disini
            </p>
            <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-[#840000] md:mx-0" />
          </div>
          <div className="grid md:grid-cols-2 md:gap-5">
            {/* {console.log()} */}
            {/* {data?.news.map((new, i) => (
              <Link
                key={i}
                to="/"
                className="flex min-h-44 items-end bg-gray-500 md:aspect-square"
              >
                <div className="px-5 py-5 text-white">
                  <button
                    type="button"
                    className="mb-2 bg-[#840000] px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Kategori
                  </button>
                  <h2 className="mb-3 font-bold text-pretty md:text-xl">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit.
                  </h2>
                  <p className="text-xs text-pretty md:text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
                    repudiandae!
                  </p>
                </div>
              </Link>
            ))} */}
            {data?.news.map((item, i) => {
              const category = item._embedded?.["wp:term"]
                ?.flat()
                .find((term) => term.taxonomy === "category");

              // console.log(item)
              // console.log([
              //   ...item.content.rendered.matchAll(
              //     /<img[^>]+src=["']([^"']+)["']/g,
              //   ),
              // ]);

              return (
                <Link
                  key={i}
                  to="/"
                  className="relative flex min-h-44 items-end bg-gray-500 md:aspect-square"
                >
                  <img
                    src={
                      item.content.rendered.match(
                        /<img[^>]+src=["']([^"']+)["']/,
                      )?.[1]
                    }
                    alt="image"
                    className="absolute inset-0 h-full w-full object-cover object-center brightness-65"
                  />
                  <div className="relative px-5 py-5 text-white">
                    <button
                      type="button"
                      className="mb-2 bg-[#840000] px-3 py-1.5 text-xs font-medium text-white"
                    >
                      {category.name}
                    </button>
                    <h2 className="mb-3 font-bold text-pretty text-white md:text-xl">
                      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Impedit. */}
                      {/* {console.log(item)} */}
                      {item?.title?.rendered}
                    </h2>
                    <p className="text-xs text-pretty md:text-sm">
                      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ad, repudiandae! */}
                      {item?.title?.rendered}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex justify-center md:justify-start">
            <Link
              to="/kegiatan"
              className="w-max bg-[#0a0a0a] px-5 py-3 text-xs font-bold whitespace-nowrap text-white md:mx-0 md:text-sm"
            >
              Lihat Lebih Lanjut
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
