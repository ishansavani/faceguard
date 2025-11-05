import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar
        variant="with-categories"
        onToggle={(collapsed) => setSidebarCollapsed(collapsed)}
      />

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? "md:pl-16" : "md:pl-64"
        }`}
      >
        <Header />

        {/* Main Content */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 bg-background"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #f0f0f0",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
