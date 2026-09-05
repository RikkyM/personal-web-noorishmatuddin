import dayjs from "dayjs";
import { ArrowLeft, CalendarDays, Newspaper } from "lucide-react";
import { useNavigate } from "react-router";
import type { News } from "~/features/news/types";
import { wpFetch } from "~/lib/api/client";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/kegiatan.$slug";

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;

  const kegiatan = await wpFetch<News[]>(`/posts?slug=${slug}&_embed`);

  const post = kegiatan?.[0];

  if (!post) {
    throw new Response("Kegiatan tidak ditemukan", {
      status: 404,
    });
  }

  return post;
}

export function meta({ loaderData: data }: Route.MetaArgs) {
  if (!data) {
    return [
      { title: "Kegiatan Tidak Ditemukan - Bersama Membangun Banyuasin" },
    ];
  }
  return [
    {
      title: `${data.title.rendered} - Noor Ishmatuddin, S.I.P.`,
    },
    {
      name: "description",
      content:
        "Noor Ishmatuddin, S.I.P. — Wakil Ketua DPRD Banyuasin. Bersama membangun Banyuasin melalui program dan kegiatan untuk masyarakat.",
    },
  ];
}

export default function DetailKegiatan({
  loaderData: data,
}: Route.ComponentProps) {
  const navigate = useNavigate();

  const category = data._embedded?.["wp:term"]
    ?.flat()
    .find((term) => term.taxonomy === "category");

  return (
    <>
      <section>
        <div className="mx-auto max-w-7xl py-5 md:py-10">
          <div className="px-4 md:px-14">
            <div className="mx-auto max-w-240 px-10">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 transition-colors duration-250 hover:bg-gray-300"
              >
                <ArrowLeft className="size-5" />
                <span>Kembali</span>
              </button>
            </div>
            <div className="mt-3">
              <h1 className="mx-auto max-w-240 px-5 text-center font-bold text-[#991010] sm:text-xl md:text-2xl">
                {data.title.rendered}
              </h1>
              <div className="flex flex-col justify-center gap-3 py-3 md:flex-row">
                <p className="order-2 flex items-center justify-center gap-2 text-center text-xs md:order-1 md:justify-start md:text-sm">
                  <Newspaper className="size-4 min-w-4 md:size-5 md:min-w-5" />
                  <span>{category?.name}</span>
                </p>
                <p className="order-1 flex items-center justify-center gap-2 text-center text-xs md:order-2 md:justify-start md:text-sm">
                  <CalendarDays className="size-4 min-w-4 md:size-5 md:min-w-5" />
                  <span>
                    {dayjs(data.date_gmt)
                      .locale("id")
                      .format("ddd, DD MMM YYYY [|] HH:mm [WIB]")}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: data.content.rendered }}
            // className={cn(
            //   "space-y-7 transition-colors duration-250",
            //   "[&_a]:text-blue-500 [&_a]:hover:text-blue-700",
            //   "[&_img]:mx-auto [&_img:first-of-type]:mt-5 [&_img:first-of-type]:mb-12",
            //   "[&_p]:px-5 [&_p]:text-pretty [&_p]:md:px-32",
            // )}
            className={cn(
              "space-y-7 transition-colors duration-250",
              "[&_a]:text-blue-500 [&_a]:hover:text-blue-700",
              "[&_img]:mx-auto [&_img:first-of-type]:mt-5 [&_img:first-of-type]:mb-12",
              "[&_p]:px-5 [&_p:not(:has(img))]:text-sm [&_p:not(:has(img))]:text-pretty [&_p:not(:has(img))]:md:mx-auto [&_p:not(:has(img))]:md:max-w-240 [&_p:not(:has(img))]:md:text-base",
            )}
          />
        </div>
      </section>
    </>
  );
}
