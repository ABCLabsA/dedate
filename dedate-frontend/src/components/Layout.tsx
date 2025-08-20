import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#fbeffb] to-[#fdf6e3] dark:bg-zinc-900">
      <Header className="fixed top-0 left-0 right-0 z-50" />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default Layout; 