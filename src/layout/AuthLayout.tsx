import { Outlet } from "react-router-dom";
import { AuthTabs } from "../components/AuthTabs";

const AuthLayout = () => {
  return (
    <section className="grid grid-cols-2 min-h-screen">
      {/* This is the left column*/}
      <div className="bg-primary flex items-center justify-center px-16">
        <div className="text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-md bg-white/10 grid place-items-center shrink-0">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                <path
                  d="M10 9.5v13M22 9.5v13M10 9.5l12 13"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight">Invome</span>
          </div>

          <div>
            <h1 className="font-bold text-[32px] text-surface">
              Welcome to Invome
            </h1>
            <p className=" text-surface-muted tracking-wide">
              Invoicing made easy and seamless.
            </p>
          </div>
        </div>
      </div>

      {/* This is the right column */}
      <div className="flex flex-col items-center justify-center  px-16 bg-canvas">
        <div className="w-full max-w-sm">
          {/* Tab switcher */}
          <div className="flex mb-4">
            <AuthTabs />
          </div>

          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
