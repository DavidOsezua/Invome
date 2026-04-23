import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export function AppShell() {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
