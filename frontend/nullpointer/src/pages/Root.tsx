import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Root = () => {
  return (
    <div className="m-0 flex flex-col justify-between">
      <Header />
      <Outlet />
    </div>
  );
};

export default Root;
