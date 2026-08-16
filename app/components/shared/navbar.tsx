import { Menu } from "lucide-react";
import { Link } from "react-router";

const navigations = [
  {
    url: "/",
    label: "Beranda",
  },
  {
    url: "/profil",
    label: "Profil",
  },
  {
    url: "/kegiatan",
    label: "Kegiatan",
  },
];

export default function Navbar() {
  return (
    <header className="font-georgia sticky top-0 z-50 h-20 bg-white shadow">
      <nav className="relative mx-auto flex h-20 max-w-6xl justify-between px-5 py-2">
        <Link to="/" className="flex h-full w-max items-center">
          {/* <img src="/logo.png" className="md:h-full md:min-w-max" alt="logo" /> */}
          <img
            src="/logo.png"
            className="block h-full w-auto object-contain"
            alt="logo"
          />
        </Link>
        <div className="flex items-center">
          <ul className="flex hidden items-center gap-5 text-lg text-[#9C0707] md:flex">
            {navigations.map((nav) => (
              <li key={nav.label}>
                <Link to={nav.url}>{nav.label}</Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="rounded-lg bg-[#9C0707] px-3 py-1 text-white"
              >
                Kirim Aspirasi
              </button>
            </li>
          </ul>
          <button
            type="button"
            className="h-max w-max cursor-pointer rounded p-1 transition-colors duration-200 hover:bg-gray-300 md:hidden"
          >
            <Menu />
          </button>
        </div>
      </nav>
    </header>
  );
}
