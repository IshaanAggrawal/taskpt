"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User, LogOut, LogIn, UserPlus, Loader2 } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        setUserName(res.data.name || "User");
      } catch (error) {
        setUserName(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [pathname]);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUserName(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading) {
    return (
      <header className="flex items-center justify-between border-b px-6 py-4 h-18.25 bg-white dark:bg-zinc-950">
        <div className="h-6 w-32 bg-gray-100 dark:bg-zinc-800 animate-pulse rounded" />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 dark:bg-zinc-950/95 px-6 py-4 shadow-sm">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          TaskManager
        </Link>
        {userName && (
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link 
              href="/" 
              className={`transition-colors hover:text-blue-600 ${
                pathname === "/" ? "text-blue-600 font-bold" : "text-gray-500"
              }`}
            >
              My Tasks
            </Link>
            <Link 
              href="/dashboard" 
              className={`transition-colors hover:text-blue-600 ${
                pathname === "/dashboard" ? "text-blue-600 font-bold" : "text-gray-500"
              }`}
            >
              Profile
            </Link>
          </nav>
        )}
      </div>
      <div className="flex items-center gap-4">
        {userName ? (
          <>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full">
              <User className="w-4 h-4" />
              <span>Hi, {userName}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout} 
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost" size="sm">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">
                <UserPlus className="w-4 h-4 mr-2" />
                Register
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}