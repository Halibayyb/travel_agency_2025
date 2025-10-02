// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/src/hook/useAuth";
import { authService } from "@/src/lib/firebase/authService";
import { LayoutDashboard, Settings, LogOut, MessageSquare, Menu  } from "lucide-react";
import OverviewDashboard from "@/component/admin/Overview";
import SettingsDashboard from "@/component/admin/Settings";
import ContactInquiries from "@/component/admin/ContactQuery";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "settings" | "inquiries">("overview");

  // Gate - Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-4xl mb-4">🔄</div>
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = async () => {
    await authService.logout();
    router.push("/");
  };

  const navItems = [
    {
      id: "overview" as const,
      name: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "inquiries" as const,
      name: "Contact Inquiries",
      icon: MessageSquare,
    },
    {
      id: "settings" as const,
      name: "Settings",
      icon: Settings,
    },
    
  ];

  return (
    <div className="min-h-screen bg-gray-50 font2">
  {/* Top Bar */}
  <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
    <div className="px-4 py-3 md:py-4">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-gray-700 hover:text-gray-900 transition"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex-1 lg:flex-none">
          <h1 className="text-lg md:text-2xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-xs md:text-sm text-gray-600 hidden sm:block">
            Welcome, {user.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-2 md:px-6 rounded-lg hover:bg-red-600 transition font-semibold flex items-center gap-2 text-xs md:text-sm"
        >
          <LogOut className="w-3 h-3 md:w-4 md:h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  </nav>

  <div className="flex pt-[64px] md:pt-[88px]">
    {/* Sidebar - Desktop */}
    <aside className="hidden lg:block w-64 bg-white shadow-md min-h-[calc(100vh-88px)] fixed left-0">
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-red-800 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>

    {/* Mobile Sidebar */}
    {mobileMenuOpen && (
      <>
        {/* Overlay */}
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        {/* Sidebar */}
        <aside className="lg:hidden fixed left-0 top-[64px] md:top-[88px] w-64 bg-white shadow-md h-[calc(100vh-64px)] md:h-[calc(100vh-88px)] z-40 overflow-y-auto">
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                        isActive
                          ? "bg-red-800 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      </>
    )}

    {/* Main Content */}
    <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8 w-full">
      {activeTab === "overview" && <OverviewDashboard />}
      {activeTab === "inquiries" && <ContactInquiries />}
      {activeTab === "settings" && <SettingsDashboard />}
    </main>
  </div>
</div>
  );
}