import dayjs from "dayjs";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import React from "react";
import { Link, useLoaderData } from "react-router";
import BgImage from "~/assets/images/kegiatan.jpg";
import type { News } from "~/features/news/types";
import { wpFetchWithMeta } from "~/lib/api/client";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/kegiatan";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kegiatan - Noor Ishmatuddin, S.I.P." },
    {
      name: "description",
      content:
        "Kumpulan dokumentasi kegiatan dan program kerja Noor Ishmatuddin, S.I.P., Wakil Ketua DPRD Banyuasin, dalam menjalankan tugas dan aspirasi masyarakat Banyuasin.",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  const page = Number(url.searchParams.get("page") ?? 1);
  const perPage = 6;

  const result = await wpFetchWithMeta<any[]>(
    `/posts?per_page=${perPage}&page=${page}&orderby=date&order=desc&categories_exclude=1&_embed`,
  );

  return {
    ...result,
    page,
    perPage,
  };
}

export default function kegiatan() {
  const { data, page, perPage, total, totalPages } =
    useLoaderData<typeof loader>();

  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  const [filters, setFilters] = React.useState<{
    search: string;
    kategori: string;
    date_from: string;
    date_to: string;
  }>({
    search: "",
    kategori: "",
    date_from: "",
    date_to: "",
  });

  const dateFromRef = React.useRef<HTMLInputElement | null>(null);
  const dateToRef = React.useRef<HTMLInputElement | null>(null);
  const openDatePicker = (ref: React.RefObject<HTMLInputElement | null>) => {
    ref.current?.showPicker();
  };

  return (
    <>
      <section
        className="relative h-40 bg-cover bg-position-[50%_25%] px-5 md:h-60 lg:h-90"
        style={{
          backgroundImage: `url(${BgImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto flex h-full max-w-6xl items-center">
          <h1 className="text-4xl font-bold text-white">KEGIATAN</h1>
        </div>
      </section>
      <section className="overflow-hidden bg-white">
        <section className="mx-auto max-w-6xl space-y-3 px-3 py-10 text-sm md:px-5 md:text-base">
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="search"
              className="flex items-center gap-2 border border-gray-400 pl-1.5"
            >
              <Search className="size-5 min-w-5 stroke-2 text-black" />
              <input
                type="text"
                id="search"
                placeholder="Cari Kegiatan..."
                className="flex-1 py-1.5 pr-1.5 text-black outline-none placeholder:text-gray-400"
              />
            </label>
            <div className="flex flex-1 flex-col items-center gap-2 md:flex-row">
              <label
                htmlFor="kategori"
                className="relative w-full flex-1 border border-gray-400"
              >
                <select
                  name="kategori"
                  id="kategori"
                  className="w-full appearance-none p-1.5 text-black outline-none"
                >
                  <option value="">Pilih Kategori</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-1.5 size-5 min-w-5 -translate-y-1/2 text-black" />
              </label>
              <div className="flex w-full flex-1 flex-wrap items-center gap-2 whitespace-nowrap *:flex-1">
                <label htmlFor="date_from" className="w-full">
                  <button
                    type="button"
                    onClick={() => openDatePicker(dateFromRef)}
                    className="relative h-full w-full border border-gray-400 p-1.5 text-left"
                  >
                    <span className="text-black">
                      {filters.date_from !== ""
                        ? dayjs(filters.date_from).format("DD MMM YYYY")
                        : "Pilih Tanggal Mulai"}
                    </span>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-1.5 size-5 min-w-5 -translate-y-1/2 text-black" />
                  </button>
                  <input
                    ref={dateFromRef}
                    type="date"
                    id="date_from"
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        date_from: e.target.value,
                      }))
                    }
                    max={filters.date_from || undefined}
                    className="sr-only"
                  />
                </label>
                <label htmlFor="date_to" className="w-full">
                  <button
                    type="button"
                    onClick={() => openDatePicker(dateToRef)}
                    className="relative h-full w-full border border-gray-400 p-1.5 text-left"
                  >
                    <span className="text-black">
                      {filters.date_to !== ""
                        ? dayjs(filters.date_to).format("DD MMM YYYY")
                        : "Pilih Tanggal Akhir"}
                    </span>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-1.5 size-5 min-w-5 -translate-y-1/2 text-black" />
                  </button>
                  <input
                    ref={dateToRef}
                    type="date"
                    id="date_to"
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        date_to: e.target.value,
                      }))
                    }
                    min={filters.date_from || undefined}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item: News, i) => {
              const featuredImage =
                item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
              const category = item._embedded?.["wp:term"]
                ?.flat()
                .find((term) => term.taxonomy === "category");

              const contentImage = item.content?.rendered.match(
                /<img[^>]+src=["']([^"']+)["']/,
              )?.[1];

              const imageUrl = featuredImage || contentImage || null;

              return (
                <div key={item.id} className="border border-gray-300 shadow">
                  <div>
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.title.rendered ?? "Gambar Kegiat, imageUrlan"}
                        className="h-48 w-full object-cover md:h-60"
                      />
                    ) : (
                      <div className="flex h-48 items-center justify-center bg-gray-100 md:h-60">
                        <span className="text-gray-400">Tidak ada gambar</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 p-2">
                    <Link
                      to={`/kegiatan/${item.slug}`}
                      dangerouslySetInnerHTML={{
                        __html: item?.title?.rendered,
                      }}
                      className="line-clamp-2 font-semibold text-black transition-colors duration-150 hover:text-[#840000]"
                      title={item.title.rendered}
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="w-max bg-[#840000] px-3 py-1.5 text-xs text-white">
                        {category?.name ?? "-"}
                      </span>
                      <span className="text-xs md:text-sm text-gray-500">
                        {item.date
                          ? dayjs(item.date)
                              .locale("id")
                              .format("DD MMM YYYY [•] HH:mm [WIB]")
                          : "-"}
                      </span>
                    </div>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item.excerpt.rendered,
                      }}
                      className="mt-1.5 line-clamp-4 text-sm text-pretty text-gray-500 md:mt-2"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <p className="order-2 text-xs text-black md:order-1 md:text-sm">
              Halaman {page} dari {totalPages} • Total {total} Kegiatan
            </p>
            <div className="order-1 flex items-center gap-2 select-none md:order-2">
              <div
                className={cn(
                  "flex items-center rounded pl-1 pr-2 py-0.5 text-sm transition-colors duration-250 md:text-base",
                  page > 1
                    ? "text-black hover:bg-gray-300"
                    : "cursor-default text-gray-400",
                )}
              >
                <ChevronLeft className="size-5 min-w-5" />
                {page > 1 ? (
                  <Link to={`?page=${page - 1}`}>Sebelumnya</Link>
                ) : (
                  <span>Sebelumnya</span>
                )}
              </div>
              <div
                className={cn(
                  "flex items-center rounded pl-2 pr-1 py-0.5 text-sm transition-colors duration-250 md:text-base",
                  page < totalPages
                    ? "text-black hover:bg-gray-300"
                    : "cursor-default text-gray-400",
                )}
              >
                {page < totalPages ? (
                  <Link to={`?page=${page + 1}`}>
                    <span>Selanjutnya</span>
                  </Link>
                ) : (
                  <span>Selanjutnya</span>
                )}
                <ChevronRight className="size-5 min-w-5" />
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
