import { isRouteErrorResponse, useOutlet } from "react-router";
import CallCenter from "~/components/shared/call-center";
import Footer from "~/components/shared/footer/footer";
import Navbar from "~/components/shared/navbar";
import type { Route } from "./+types/main-layout";

export default function MainLayout() {
  const outlet = useOutlet();

  return (
    <section className="relative h-dvh scrollbar-thin overflow-auto">
      <Navbar />
      <main className="font-georgia">{outlet}</main>
      <CallCenter />
      <Footer />
    </section>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const status = isRouteErrorResponse(error) ? error.status : 500;
  const message =
    status === 404 ? "Halaman tidak ditemukan" : "Terjadi kesalahan";

  return (
    <div className="container mx-auto p-4 pt-16 text-center">
      <h1 className="text-4xl font-bold">{status}</h1>
      <p>{message}</p>
    </div>
  );
}