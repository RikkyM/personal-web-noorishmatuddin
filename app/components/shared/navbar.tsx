import { Home, Menu, NotebookPen, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { Link, useNavigation } from "react-router";
import { cn } from "~/lib/utils";

const navigations = [
  {
    url: "/",
    label: "Beranda",
    icon: Home,
  },
  {
    url: "/profil",
    label: "Profil",
    icon: User,
  },
  {
    url: "/kegiatan",
    label: "Kegiatan",
    icon: NotebookPen,
  },
];

export default function Navbar() {
  const navigation = useNavigation();
  const [open, setOpen] = React.useState(false);

  const refs = React.useRef(false);

  const isNavigate = navigation.state !== "idle";

  return (
    <>
      <header className="font-georgia sticky top-0 z-20 h-20 bg-white shadow">
        {isNavigate && (
          <div className="absolute top-0 left-0 h-0.5 w-full overflow-hidden">
            <div className="h-full w-1/3 animate-[indicator_1.5s_ease-in-out_infinite] bg-[#840000]" />
          </div>
        )}
        <nav className="relative mx-auto flex h-20 max-w-6xl justify-between px-5 py-2">
          <Link
            to="/"
            viewTransition
            className="flex h-full w-max items-center"
          >
            <img
              src="/logo.png"
              className="block h-full w-auto object-contain"
              alt="logo"
            />
          </Link>
          <div className="flex items-center">
            <ul className="flex hidden items-center gap-5 text-lg text-[#840000] md:flex">
              {navigations.map((nav) => (
                <li key={nav.label}>
                  <Link to={nav.url}>{nav.label}</Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="rounded-full bg-[#840000] px-4 py-1.5 text-sm text-white"
                >
                  Kirim Aspirasi
                </button>
              </li>
            </ul>
            <button
              type="button"
              className="block h-max w-max cursor-pointer rounded p-1 transition-colors duration-200 hover:bg-gray-300 md:hidden"
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            >
              <Menu />
            </button>
          </div>
        </nav>
      </header>
      <section
        className={cn(
          "font-georgia absolute inset-0 z-30 overflow-auto",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <AnimatePresence mode="wait">
          {open && (
            <nav
              onMouseDown={(e) => {
                refs.current = e.target === e.currentTarget;
              }}
              onMouseUp={(e) => {
                if (e.target === e.currentTarget && refs.current) {
                  setOpen(false);
                }
                refs.current = false;
              }}
              className="fixed inset-0 z-30 p-5 md:hidden"
            >
              <motion.div
                initial={{ opacity: 0, translateY: "25px" }}
                animate={{ opacity: 1, translateY: "0px" }}
                exit={{ opacity: 0, translateY: "25px" }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 z-30 flex flex-col gap-10 bg-white p-5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex h-14 w-full items-center justify-between">
                  <img
                    src="/logo.png"
                    className="block h-full w-auto object-contain"
                    alt="logo"
                  />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="cursor-pointer rounded transition-colors duration-200 hover:bg-gray-300"
                  >
                    <X />
                  </button>
                </div>
                <ul className="flex flex-col gap-3 text-right text-xl font-medium">
                  {navigations.map((nav, index) => (
                    <motion.li
                      key={nav.label}
                      initial={{ filter: "blur(5px)", y: 10 }}
                      animate={{
                        filter: "blur(0px)",
                        y: 0,
                        transition: { duration: 0.25, delay: index * 0.15 },
                      }}
                      exit={{
                        filter: "blur(5px)",
                        y: 10,
                        transition: { duration: 0.12, delay: 0 },
                      }}
                      onClick={() => setOpen(false)}
                      className="relative"
                    >
                      <Link
                        to={nav.url}
                        className="flex items-center justify-between text-[#840000] hover:underline"
                      >
                        <nav.icon className="size-5" />
                        <span>{nav.label}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </nav>
          )}
        </AnimatePresence>
      </section>
      {/* <nav className="absolute inset-0 z-30 bg-white">asa</nav> */}
    </>
  );
}
