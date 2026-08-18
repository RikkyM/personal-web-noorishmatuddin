import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section className="font-georgia flex h-[90vh]">
      <div className="m-auto max-w-6xl p-6 text-center">
        <h1 className="mb-2 text-5xl font-semibold">404</h1>
        <h3 className="text-lg font-semibold md:text-2xl">
          Halaman tidak ditemukan
        </h3>
        <p className="my-4 text-center text-sm text-gray-500 md:mx-auto md:max-w-120 md:text-base">
          Mohon maaf, halaman yang Anda cari tidak tersedia atau mungkin telah
          dipindahkan. Silakan kembali ke beranda atau jelajahi kegiatan dan
          profil kami.
        </p>
        <Link to="/" className="bg-[#840000] text-white px-4 py-1.5 font-medium text-sm">
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  );
}
