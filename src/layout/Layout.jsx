import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar
        variant="with-categories"
        onToggle={(collapsed) => setSidebarCollapsed(collapsed)}
      />

      {/* Main content area */}
      <div
        className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? "md:pl-16" : "md:pl-64"
        }`}
      >
        <Header />

        <main
          id="main-content"
          className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 bg-background w-full"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #f0f0f0",
          }}
        >
          <Outlet /> {/* This is where routes will render */}
        </main>
      </div>
    </div>
  );
}
