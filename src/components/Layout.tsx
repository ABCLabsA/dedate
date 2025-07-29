import { Outlet } from "react-router-dom";
// import Header from "./Header";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 py-10 px-4">
      {/* <Header /> */}
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Layout; 