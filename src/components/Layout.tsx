import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-900">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 