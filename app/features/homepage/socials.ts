import facebookIcon from "~/assets/icons/facebook.svg";
import instagramIcon from "~/assets/icons/instagram.svg";
import tiktokIcon from "~/assets/icons/tiktok.svg";
import youtubeIcon from "~/assets/icons/youtube.svg";

type SocialType = {
  icon: string;
  label: string;
  url: string;
  image?: string;
};

export const socials: SocialType[] = [
  {
    icon: facebookIcon,
    label: "Facebook",
    url: "https://web.facebook.com/noorishmatuddinsyarifudin",
    image: "/facebook.jpg",
  },
  {
    icon: instagramIcon,
    label: "Instagram",
    url: "https://www.instagram.com/noorishmatuddin_/",
    image: "/instagram.jpg",
  },
  {
    icon: tiktokIcon,
    label: "Tiktok",
    url: "https://www.tiktok.com/@noorishmatuddin",
    image: "/tiktok.jpg",
  },
  {
    icon: youtubeIcon,
    label: "Youtube",
    url: "https://www.youtube.com/@noorishmatuddin",
    image: "/youtube.jpg",
  },
] as const;
