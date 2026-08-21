import facebookIcon from "~/assets/icons/facebook.svg?react";
import instagramIcon from "~/assets/icons/instagram.svg?react";
import tiktokIcon from "~/assets/icons/tiktok.svg?react";
import youtubeIcon from "~/assets/icons/youtube.svg?react";

type SocialType = {
  key: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  //   url: string;
  //   image?: string;
};

export const socials: SocialType[] = [
  {
    key: "facebook",
    icon: facebookIcon,
    label: "Facebook",
    // url: "https://facebook.com/noorishmatuddinsyarifudin",
    // image: "/facebook.jpg",
  },
  {
    key: "instagram",
    icon: instagramIcon,
    label: "Instagram",
    // url: "https://www.instagram.com/noorishmatuddin_/",
    // image: "/instagram.jpg",
  },
  {
    key: "tiktok",
    icon: tiktokIcon,
    label: "Tiktok",
    // url: "https://www.tiktok.com/@noorishmatuddin",
    // image: "/tiktok.jpg",
  },
  {
    key: "youtube",
    icon: youtubeIcon,
    label: "Youtube",
    // url: "https://www.youtube.com/@noorishmatuddin",
    // image: "/youtube.jpg",
  },
] as const;
