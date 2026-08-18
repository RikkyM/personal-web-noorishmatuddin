import { useQuery } from "@tanstack/react-query";
import WaIcon from "~/assets/icons/whatsapp.svg?react";
import { fetchSiteSettings } from "~/features/settings/api";
import { cn } from "~/lib/utils";

export default function CallCenter() {
  const { data } = useQuery({
    queryKey: ["site-settings", "whatsapp"],
    queryFn: fetchSiteSettings,
  });

  const number = data?.social_media?.whatsapp?.number;

  if (!number) {
    return null;
  }

  const url = `https://wa.me/+${number}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed shadow ring ring-gray-200 bottom-5 right-5 aspect-square size-12 rounded-full bg-[#25D366] p-2"
    >
      <div className="z-20 flex items-center justify-center">
        <WaIcon className="w-full text-white" />
      </div>
      <span
        className={cn(
          "pointer-events-none text-sm absolute top-1/2 right-full z-10 ml-2 -translate-y-1/2 rounded-full bg-white px-2 py-1 whitespace-nowrap opacity-0 shadow ring ring-gray-200 transition-[margin,opacity] duration-150",
          "group-hover:mr-2 group-hover:opacity-100",
        )}
      >
        Call Center
      </span>
    </a>
  );
}
