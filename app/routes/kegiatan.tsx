import dayjs from "dayjs";
import { ChevronDown, Search } from "lucide-react";
import React from "react";
import { Link, useLoaderData, useSearchParams } from "react-router";
import BgImage from "~/assets/images/kegiatan.jpg";
import Pagination from "~/components/shared/pagination";
import type { News } from "~/features/news/types";
import { wpFetch, wpFetchWithMeta } from "~/lib/api/client";
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
  const perPage = Number(url.searchParams.get("per_page") ?? 6);

  const search = url.searchParams.get("q") ?? "";
  const kategori = url.searchParams.get("kategori") ?? "";
  const dateFrom = url.searchParams.get("from") ?? "";
  const dateTo = url.searchParams.get("to") ?? "";

  const params = new URLSearchParams({
    search,
    per_page: String(perPage),
    page: String(page),
    orderby: "date",
    order: "desc",
    categories_exclude: "1",
    _embed: "",
  });

  if (kategori) {
    params.set("categories", kategori);
  }

  if (dateFrom) {
    params.set("after", `${dateFrom}T00:00:00`);
  }

  if (dateTo) {
    params.set("before", `${dateTo}T23:59:59`);
  }

  const result = await wpFetchWithMeta<any[]>(`/posts?${params.toString()}`);
  const categories = await wpFetch<any[]>("/categories?exclude=1");

  return {
    ...result,
    page,
    perPage,
    categories,
  };
}

export default function kegiatan() {
  const { data, page, total, totalPages, categories } =
    useLoaderData<typeof loader>();

  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = React.useState<{
    search: string;
    kategori: string;
    date_from: string;
    date_to: string;
  }>({
    search: searchParams.get("q") ?? "",
    kategori: "",
    date_from: "",
    date_to: "",
  });

  const dataFilter =
    searchParams.get("q") ||
    searchParams.get("kategori") ||
    searchParams.get("from") ||
    searchParams.get("to");

  const dateFromRef = React.useRef<HTMLInputElement | null>(null);
  const dateToRef = React.useRef<HTMLInputElement | null>(null);
  const openDatePicker = (ref: React.RefObject<HTMLInputElement | null>) => {
    ref.current?.showPicker();
  };

  React.useEffect(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (filters.date_from && filters.date_to) {
        next.set("from", filters.date_from);
        next.set("to", filters.date_to);
      } else {
        next.delete("from");
        next.delete("to");
      }
      next.delete("page");

      return next;
    });
  }, [filters.date_from, filters.date_to, setSearchParams]);

  const clearFilters = () => {
    if (dateFromRef.current) dateFromRef.current.value = "";
    if (dateToRef.current) dateToRef.current.value = "";

    setFilters({
      search: "",
      kategori: "",
      date_from: "",
      date_to: "",
    });

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("q");
      next.delete("kategori");
      next.delete("from");
      next.delete("to");
      next.delete("page");
      next.delete("per_page");
      return next;
    });
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
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-black">Show:</span>
                <label
                  htmlFor="per_page"
                  className="flex items-center gap-2 border border-gray-400 p-1.5 select-none"
                >
                  <span className="sr-only">Per Page</span>
                  <select
                    name="per_page"
                    id="per_page"
                    className="appearance-none text-center outline-none"
                    value={searchParams.get("per_page") ?? "6"}
                    onChange={(e) => {
                      setSearchParams((prev) => {
                        const value = e.target.value;
                        const next = new URLSearchParams(prev);

                        if (value === "6") {
                          next.delete("per_page");
                        } else {
                          next.set("per_page", e.target.value);
                        }

                        next.delete("page");

                        return next;
                      });
                    }}
                  >
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="12">12</option>
                  </select>
                </label>
              </div>
              <label
                htmlFor="search"
                className="relative flex w-full flex-1 items-center gap-2 overflow-clip border border-gray-400 pl-1.5"
              >
                <Search className="size-5 min-w-5 stroke-2 text-black" />
                <input
                  type="text"
                  id="search"
                  placeholder="Cari Kegiatan..."
                  className="w-max flex-1 py-1.5 text-black outline-none placeholder:text-gray-400"
                  value={filters.search ?? ""}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      setSearchParams((prev) => {
                        const next = new URLSearchParams(prev);
                        if (filters.search !== "") {
                          next.set("q", filters.search);
                        } else {
                          next.delete("q");
                        }
                        next.delete("page");
                        return next;
                      });
                    }
                  }}
                />
                {filters.search && (
                  <button
                    type="button"
                    className="h-full cursor-pointer bg-[#840000] px-2 py-1.5 text-white"
                    onClick={() => {
                      setSearchParams((prev) => {
                        const next = new URLSearchParams(prev);
                        next.set("q", filters.search);
                        next.delete("page");
                        return next;
                      });
                    }}
                  >
                    Cari
                  </button>
                )}
              </label>
            </div>
            <div className="flex flex-1 flex-col items-center gap-2 md:flex-row">
              <label
                htmlFor="kategori"
                className="relative w-full flex-1 border border-gray-400"
              >
                <span className="sr-only">Kategori</span>
                <select
                  name="kategori"
                  id="kategori"
                  className="w-full appearance-none p-1.5 text-black outline-none"
                  onChange={(e) => {
                    setSearchParams((prev) => {
                      const value = e.target.value;
                      const next = new URLSearchParams(prev);
                      if (value !== "") {
                        next.set("kategori", e.target.value);
                      } else {
                        next.delete("kategori");
                      }
                      next.delete("page");
                      return next;
                    });
                  }}
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((category) => (
                    <option value={category.id}>{category?.name}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-1.5 size-5 min-w-5 -translate-y-1/2 text-black" />
              </label>
              <div className="flex w-full flex-1 flex-wrap items-center gap-2 whitespace-nowrap *:w-full *:flex-1 *:overflow-clip">
                <label htmlFor="date_from">
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
                    onChange={(e) => {
                      setFilters((prev) => ({
                        ...prev,
                        date_from: e.target.value,
                      }));
                    }}
                    max={filters.date_to || undefined}
                    className="sr-only"
                  />
                </label>
                <label htmlFor="date_to">
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
            {(searchParams.get("q") ||
              searchParams.get("kategori") ||
              searchParams.get("from") ||
              searchParams.get("to")) && (
              <button
                type="button"
                className="w-max cursor-pointer bg-red-600 px-2 py-1 text-sm text-white"
                onClick={() => clearFilters()}
              >
                Bersihkan Filter
              </button>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item: News) => {
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
                  <div className="bg-gray-400">
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
                      <Link
                        to={`?kategori=${category?.id}`}
                        className="w-max bg-[#840000] px-3 py-1.5 text-xs text-white"
                      >
                        {category?.name ?? "-"}
                      </Link>
                      <span className="text-xs text-gray-500 md:text-sm">
                        {item.date
                          ? dayjs(item.date)
                              .locale("id")
                              .format("DD MMM YYYY [•] HH:mm [WIB]")
                          : "-"}
                      </span>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.excerpt.rendered,
                      }}
                      className="mt-1.5 line-clamp-4 text-sm text-pretty text-gray-600 md:mt-2"
                    />
                  </div>
                </div>
              );
            })}
            {dataFilter && data.length === 0 && (
              <div className="grid h-72 w-full place-content-center sm:col-span-2 lg:col-span-3">
                <span className="font-semibold text-gray-500">
                  Kegiatan tidak ditemukan
                </span>
              </div>
            )}
          </div>
          <Pagination page={page} total={total} totalPages={totalPages} />
        </section>
      </section>
    </>
  );
}
