import facebookIcon from "~/assets/icons/facebook.svg";
import instagramIcon from "~/assets/icons/instagram.svg";
import tiktokIcon from "~/assets/icons/tiktok.svg";
import youtubeIcon from "~/assets/icons/youtube.svg";

type SocialType = {
  key: string;
  icon: string;
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
