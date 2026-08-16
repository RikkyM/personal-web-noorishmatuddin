import { useLocation, useOutlet } from "react-router";
import Navbar from "~/components/shared/navbar";

const MainLayout = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <>
      <Navbar />
      <main className="font-georgia">{outlet}</main>
    </>
  );
};

export default MainLayout;
