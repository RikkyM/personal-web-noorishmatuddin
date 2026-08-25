import dayjs from "dayjs";
import { ArrowLeft, CalendarDays, Newspaper } from "lucide-react";
import { useNavigate } from "react-router";
import type { News } from "~/features/news/types";
import { wpFetch } from "~/lib/api/client";
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
        <div className="mx-auto max-w-6xl py-5 md:py-10">
          <div className="px-4 md:px-14">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 cursor-pointer transition-colors duration-250 hover:bg-gray-300 px-2 py-1 rounded"
            >
              <ArrowLeft className="size-5" />
              <span>Kembali</span>
            </button>
            <div className="mt-3">
              <h1 className="text-center text-4xl font-bold text-[#991010]">
                {data.title.rendered}
              </h1>
              <div className="flex flex-col justify-center gap-3 py-3 md:flex-row">
                <p className="flex items-center gap-2 text-center">
                  <Newspaper className="size-5 min-w-5" />
                  <span>{category?.name}</span>
                </p>
                <p className="flex items-center gap-2 text-center">
                  <CalendarDays className="size-5 min-w-5" />
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
            className="space-y-7 [&_img]:mx-auto [&_img:first-of-type]:mt-5 [&_img:first-of-type]:mb-12 [&_p]:px-14"
          />
        </div>
      </section>
    </>
  );
}
