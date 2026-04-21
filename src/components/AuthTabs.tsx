import { cn } from "../lib/utils";
import { Link, useLocation } from "react-router-dom";
export type AuthTab = "login" | "signup";

export function AuthTabs() {
  const location = useLocation();
  const isLogin = location.pathname === "/auth/login";
  const isSignUp = location.pathname === "/auth/signup";

  console.log(location.pathname);

  return (
    <div className="inline-flex p-1 max-w-50 w-full rounded-full bg-ink-blue/15">
      {(["login", "signup"] as AuthTab[]).map((tab: string) => (
        <Link
          to={`${tab}`}
          key={tab}
          // onClick={() => handleChange(tab)}
          className={cn(
            "px-5 py-1.5 rounded-full flex justify-center items-center text-sm font-medium transition-colors w-full cursor-pointer border-0",
            isLogin && tab === "login"
              ? "bg-ink-blue text-white shadow-xs"
              : isSignUp && tab === "signup"
                ? "bg-ink-blue text-white shadow-xs"
                : "bg-transparent text-ink-blue/50 hover:text-ink-blue",
          )}
        >
          {tab === "login" ? "Login" : "Sign Up"}
        </Link>
      ))}
    </div>
  );
}
