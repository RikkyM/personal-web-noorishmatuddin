import dayjs from "dayjs";
import { ChevronDown, Search } from "lucide-react";
import React from "react";
import BgImage from "~/assets/images/kegiatan.jpg";
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

export default function kegiatan() {
  const [date, setDate] = React.useState<{ from: string; to: string }>({
    from: "",
    to: "",
  });

  const dateFromRef = React.useRef<HTMLInputElement | null>(null);
  const dateToRef = React.useRef<HTMLInputElement | null>(null);
  const openDatePicker = (ref: React.RefObject<HTMLInputElement | null>) => {
    ref.current?.showPicker();
  };

  return (
    <>
      <section
        className="relative h-40 bg-cover bg-position-[50%_25%] md:h-60 lg:h-90"
        style={{
          backgroundImage: `url(${BgImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto flex h-full max-w-6xl items-center">
          <h1 className="text-4xl font-bold text-white">Kegiatan</h1>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-3 md:px-5 py-10 text-sm md:text-base">
        <div className="flex flex-col gap-2.5">
          <label
            htmlFor="search"
            className="flex items-center gap-2 border border-gray-400 p-1.5"
          >
            <Search className="size-5 min-w-5" />
            <input
              type="text"
              id="search"
              placeholder="Cari Kegiatan..."
              className="flex-1 outline-none"
            />
          </label>
          <div className="flex flex-1 flex-col md:flex-row items-center gap-2">
            <label
              htmlFor="kategori"
              className="relative flex-1 border border-gray-400 w-full"
            >
              <select
                name="kategori"
                id="kategori"
                className="w-full appearance-none p-1.5 outline-none"
              >
                <option value="">Pilih Kategori</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-1.5 size-5 min-w-5 -translate-y-1/2" />
            </label>
            <div className="flex flex-1 w-full items-center gap-2 *:flex-1 whitespace-nowrap flex-wrap">
              <label htmlFor="date_from" className="w-full">
                <button
                  type="button"
                  onClick={() => openDatePicker(dateFromRef)}
                  className="relative h-full w-full border border-gray-400 p-1.5 text-left"
                >
                  {date.from !== ""
                    ? dayjs(date.from).format("DD MMM YYYY")
                    : "Pilih Tanggal Mulai"}
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-1.5 size-5 min-w-5 -translate-y-1/2" />
                </button>
                <input
                  ref={dateFromRef}
                  type="date"
                  id="date_from"
                  onChange={(e) =>
                    setDate((prev) => ({ ...prev, from: e.target.value }))
                  }
                  className="sr-only"
                />
              </label>
              <label htmlFor="date_to" className="w-full">
                <button
                  type="button"
                  onClick={() => openDatePicker(dateToRef)}
                  className="relative h-full w-full border border-gray-400 p-1.5 text-left"
                >
                  {date.to !== ""
                    ? dayjs(date.to).format("DD MMM YYYY")
                    : "Pilih Tanggal Akhir"}
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-1.5 size-5 min-w-5 -translate-y-1/2" />
                </button>
                <input
                  ref={dateToRef}
                  type="date"
                  id="date_to"
                  onChange={(e) =>
                    setDate((prev) => ({ ...prev, to: e.target.value }))
                  }
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div>dsad</div>
        ))}
      </section>
    </>
  );
}
