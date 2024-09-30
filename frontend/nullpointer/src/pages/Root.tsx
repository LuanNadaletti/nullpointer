import { Outlet } from "react-router-dom";
import Footer from "../components/root/Footer";
import Header from "../components/root/Header";
import { AuthProvider } from "../contexts/Auth";

const Root = () => {
  return (
    <AuthProvider>
      <div className="m-0 flex flex-col justify-between">
        <Header />
        <div className="min-h-screen">
          <Outlet />
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default Root;
