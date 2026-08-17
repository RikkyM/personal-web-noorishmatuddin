import { Link, useLoaderData } from "react-router";
import { fetchHome } from "~/features/homepage/api";
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
  return await fetchHome();
}

export default function Home() {
  const data = useLoaderData<typeof loader>();

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
      <section className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3">
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
              className="relative min-h-55 md:min-h-65.5 flex items-center justify-center overflow-hidden p-5 text-pretty text-white md:justify-start"
              // style={{ backgroundImage: `url(${item?.image?.link})` }}
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

        <div className="flex min-h-55 md:min-h-45.5 items-center justify-center overflow-hidden bg-[#840000] p-5 text-pretty text-white sm:col-span-2 md:justify-start lg:col-span-1">
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-1 gap-2">
            <h2 className="text-lg font-bold sm:text-center sm:self-center lg:self-start lg:text-left">
              {/* Mari Bergabung Menjadi Relawan Noor Ishmatuddin */}
              {data.sub_hero_3_title}
            </h2>
            <p className="max-w-md text-xs md:text-sm">
              {/* Lebih dekat dengan Noor Ishmatuddin, Buka Peluang Usaha dan
              lapangan kerja */}
              {data.sub_hero_3_subtitle}
            </p>
            <button
              type="button"
              className="relative mt-4 sm:m-auto lg:m-0 w-max cursor-pointer rounded border-2 border-[#FFCC00] px-5 py-2 text-sm shadow"
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
                {/* Noor Ishmatuddin, S.IP */}
                {data?.hero_title}
              </h1>
              <h4 className="text-sm text-gray-500">
                WAKIL KETUA DPRD BANYUASIN
              </h4>
            </div>
            <p className="text-sm text-pretty text-wrap text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur
              eaque, ullam suscipit deleniti molestias pariatur. Doloremque,
              sed. Ipsam suscipit culpa alias recusandae necessitatibus dolorum
              quasi doloribus iure reprehenderit corrupti quae commodi explicabo
              laboriosam, nesciunt sapiente dolore blanditiis, repellendus
              ratione magnam. Cum quam exercitationem quidem laudantium ducimus
              labore repudiandae neque. Ut, possimus ea! Voluptatem tempore qui
              vitae aliquam corporis iusto sunt cum, tenetur consequuntur vero
              autem dicta quasi earum. Maxime facilis minima praesentium dolores
              numquam animi aut commodi esse, obcaecati voluptatum.
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
      <section className="bg-[#840000] py-14 md:py-20 overflow-hidden px-5 px-5">
        <div className="mx-auto flex max-w-6xl flex-col md:flex-row gap-8 md:gap-4">
          <div className="text-white flex-1">
            <div className="max-w-110 mx-auto md:mx-0">
              <h2 className="text-3xl font-semibold text-center md:text-left md:max-w-72">SEKILAS PARTAI GERINDRA</h2>
              <div className="h-0.5 bg-white w-72 mx-auto md:mx-0 rounded-full mt-4 mb-8 lg:my-12" />
              <p className="text-sm md:text-base text-pretty text-center md:text-left">
                Partai GERINDRA adalah Partai Nasionalis-Religius, Partai Terbuka,
                Partai Tengah, Partai yang menjunjung tinggi Pluralisme dan partai
                yang peduli pada Rakyat Kecil.
              </p>
            </div>
          </div>
          <div className="flex-1">
            <iframe
              // width="570"
              // height="321"
              className="aspect-video"
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
    </>
  );
}
