import { Link } from "react-router";
import type { News } from "~/features/news/types";

type Props = {
  news: News[];
};

export default function GridKegiatan({ news }: Props) {
  return (
    <section className="overflow-hidden bg-white py-14 md:px-5 md:py-20">
      <div className="mx-auto max-w-7xl space-y-5">
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
          {news?.map((item: News, i: number) => {
            const category = item._embedded?.["wp:term"]
              ?.flat()
              .find((term) => term.taxonomy === "category");

            return (
              <Link
                key={i}
                to={`/kegiatan/${item.slug}`}
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
                    {category?.name ?? "-"}
                  </button>
                  <h2 className="mb-3 font-bold text-pretty text-white md:text-xl">
                    {item?.title?.rendered}
                  </h2>
                  <p className="text-xs text-pretty md:text-sm">
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
  );
}
