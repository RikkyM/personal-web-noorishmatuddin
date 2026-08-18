import { useQuery } from "@tanstack/react-query";
import { fetchSiteSettings } from "~/features/settings/api";
import { navigations } from "./constants/navigations";
import FooterColumn from "./footer-column";
import type { BottomNav } from "./types";

function transform(
  socialMedia?: Record<string, { url?: string; image?: string }>,
): BottomNav[] {
  if (!socialMedia) return [];

  return Object.entries(socialMedia).map(([platform, data]) => ({
    key: platform,
    label: platform,
    url: data.url,
    image: data.image,
    type: "anchor",
  }));
}

export default function Footer() {
  const { data } = useQuery({
    queryKey: ["site-settings", "footer"],
    queryFn: fetchSiteSettings,
    select: (data) => ({
      socialLinks: transform(data.social_media),
    }),
  });

  const socials =
    data?.socialLinks.filter((item) => item.key !== "whatsapp") ?? [];

  return (
    <footer className="border-t font-georgia border-gray-50 bg-[#F5F1E8] shadow">
      <section className="mx-auto py-10">
        <div className="mx-auto grid max-w-6xl gap-8 px-16 md:grid-cols-4 md:px-5">
          <div className="mx-auto md:mx-0 md:max-w-56">
            <img src="/logo.png" alt="logo" />
            <p className="font-medium md:text-sm text-pretty">
              Bersatu Membangun Banyuasin, Salam Indonesia Raya. Setia Bergerak
              untuk Indonesia Raya. Gerindra Menang
            </p>
          </div>
          <FooterColumn title="Social" items={socials} />
          <FooterColumn title="Menu" items={navigations} />
          <FooterColumn title="Informasi" items={[]} />
        </div>
      </section>
      <section className="border-t border-gray-400 bg-[#0a0a0a] py-3 text-center text-sm text-white">
        <p>
          ©2026{" "}
          <a href="https://noorishmatuddin.com/" className="text-red-600">
            noorishmatuddin.com
          </a>{" "}
          All rights reserved
        </p>
      </section>
    </footer>
  );
}
