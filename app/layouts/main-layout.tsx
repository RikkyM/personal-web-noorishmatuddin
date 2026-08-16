import { useLocation, useOutlet } from "react-router";
import Navbar from "~/components/shared/navbar";

const MainLayout = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <section className="min-h-screen">
      <Navbar />
      <main className="font-georgia">{outlet}</main>
    </section>
  );
};

export default MainLayout;
