import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useShop } from "../context/ShopContext";
export default function Layout() {
  const { toast, setToast } = useShop();
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      {toast && (
        <div className="toast" role="status">
          {toast}
          <button onClick={() => setToast(null)}>×</button>
        </div>
      )}
    </>
  );
}
