import { useLoaderData } from "react-router";
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
        className={`relative h-[calc(100dvh-80px)] min-h-160 overflow-hidden bg-black/80 bg-cover bg-center md:min-h-160`}
        style={{
          backgroundImage: `url(${data?.heroBanner?.link})`,
        }}
      >
        <img
          src={data?.heroImage?.link}
          alt={data?.hero_title}
          className="absolute inset-x-0 -bottom-32 mx-auto h-160 object-cover object-center md:-bottom-20 md:h-150 lg:h-180"
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
      <section className="grid grid-cols-1 *:min-h-32 md:grid-cols-2 lg:grid-cols-3">
        {(
          [
            {
              image: data.sub_hero_1,
              title: data.sub_hero_1_title,
              subtitle: data.sub_hero_1_subtitle,
            },
            {
              image: data.sub_hero_2,
              title: data?.sub_hero_2_title,
              subtitle: data?.sub_hero_2_subtitle,
            },
          ] as const
        ).map((item) => (
          <div
            className="bg-gray-500 bg-cover bg-center p-5 text-pretty text-white"
            style={{ backgroundImage: `url(${item?.image?.link})` }}
            
          >
            {console.log(item)}
            <h2 className="font-bold">{item.title}</h2>
            <p className="text-sm">{item.subtitle}</p>
          </div>
        ))}

        <div className="bg-[#9C0707] p-5 md:col-span-2 lg:col-span-1">
          asdasd
        </div>
      </section>
    </>
  );
}
