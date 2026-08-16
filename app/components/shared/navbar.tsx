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
    <header className="h-20 bg-white shadow font-georgia sticky top-0 z-50">
      <nav className="flex justify-between h-full px-5 py-2 max-w-6xl mx-auto">
        <Link to="/">
          <img src="/logo.png" className="h-full min-w-max" alt="logo" />
        </Link>
        <div className="flex items-center">
          <ul className="flex items-center gap-5 text-lg text-[#9C0707] hidden md:flex">
            {navigations.map((nav) => (
              <li key={nav.label}>
                <Link to={nav.url}>{nav.label}</Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="bg-[#9C0707] text-white px-3 py-1 rounded-lg"
              >
                Kirim Aspirasi
              </button>
            </li>
          </ul>
          <button
            type="button"
            className="md:hidden cursor-pointer transition-colors duration-200 hover:bg-gray-300 h-max w-max p-1 rounded"
          >
            <Menu />
          </button>
        </div>
      </nav>
    </header>
  );
}
