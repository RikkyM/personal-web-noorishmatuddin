import { ArrowRight } from "lucide-react";
import { useRouteLoaderData } from "react-router";
import { socials } from "~/features/homepage/socials";
import type { loader as rootLoader } from "~/root";

export default function ConnectWithMe() {
  const rootData = useRouteLoaderData<typeof rootLoader>("root");
  const settings = rootData?.settings;
  const socialMedia = settings?.social_media;

  return (
    <section className="l g:pt-5 bg-white pt-10 lg:pb-20">
      <div className="mx-auto max-w-7xl space-y-5 lg:px-5">
        <h1 className="text-center text-lg font-bold text-black md:text-2xl lg:text-left lg:text-4xl">
          Terhubung dengan Saya
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
  );
}
