// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/src/hook/useAuth";
import { authService } from "@/src/lib/firebase/authService";
import { db } from "@/src/lib/firebase/config";
import { 
  collection, 
  query, 
  getDocs, 
  orderBy, 
  limit,
  where,
  Timestamp 
} from "firebase/firestore";
import { 
  Users, 
  TrendingUp, 
  MapPin, 
  Calendar,
  Globe,
  Monitor,
  Clock,
  Home
} from "lucide-react";

interface VisitorData {
  id: string;
  visitId: string;
  date: string;
  timestamp: Timestamp;
  page: string;
  pageName?: string;
  destination?: string;
  destinationType?: string;
  userAgent?: string;
  language?: string;
  screenResolution?: string;
}

interface DestinationStats {
  [key: string]: number;
}

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
  });
  const [destinationStats, setDestinationStats] = useState<DestinationStats>({});
  const [loadingData, setLoadingData] = useState(true);

  // Gate - Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Fetch visitor data
  useEffect(() => {
    if (user) {
      fetchVisitorData();
    }
  }, [user]);

  const fetchVisitorData = async () => {
    try {
      setLoadingData(true);
      const visitorsRef = collection(db, "visitors");
      
      // Get all visitors
      const allVisitorsQuery = query(
        visitorsRef,
        orderBy("timestamp", "desc"),
        limit(100)
      );
      const snapshot = await getDocs(allVisitorsQuery);
      
      const visitorData: VisitorData[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as VisitorData));
      
      setVisitors(visitorData);
      
      // Calculate statistics
      const now = new Date();
      const today = now.toDateString();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      const todayCount = visitorData.filter(v => v.date === today).length;
      const weekCount = visitorData.filter(v => {
        const visitDate = v.timestamp?.toDate();
        return visitDate && visitDate >= weekAgo;
      }).length;
      const monthCount = visitorData.filter(v => {
        const visitDate = v.timestamp?.toDate();
        return visitDate && visitDate >= monthAgo;
      }).length;
      
      setStats({
        total: visitorData.length,
        today: todayCount,
        thisWeek: weekCount,
        thisMonth: monthCount,
      });
      
      // Calculate destination statistics
      const destStats: DestinationStats = {};
      visitorData.forEach(v => {
        if (v.destination) {
          destStats[v.destination] = (destStats[v.destination] || 0) + 1;
        } else if (v.page === '/' || v.pageName?.includes('Home')) {
          // Count homepage visits
          destStats['HOMEPAGE'] = (destStats['HOMEPAGE'] || 0) + 1;
        }
      });
      setDestinationStats(destStats);
      
    } catch (error) {
      console.error("Error fetching visitor data:", error);
    } finally {
      setLoadingData(false);
    }
  };

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
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600">Welcome, {user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Visitors</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <Users className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Today</p>
                <p className="text-3xl font-bold text-green-600">{stats.today}</p>
              </div>
              <Calendar className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">This Week</p>
                <p className="text-3xl font-bold text-purple-600">{stats.thisWeek}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">This Month</p>
                <p className="text-3xl font-bold text-orange-600">{stats.thisMonth}</p>
              </div>
              <Globe className="w-12 h-12 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Destination Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-amber-600" />
            Visitors by Destination
          </h2>
          
          {Object.keys(destinationStats).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(destinationStats)
                .sort(([, a], [, b]) => b - a)
                .map(([destination, count]) => (
                  <div 
                    key={destination}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-center mb-2">
                      {destination === 'HOMEPAGE' ? (
                        <Home className="w-5 h-5 mr-2 text-blue-600" />
                      ) : (
                        <MapPin className="w-5 h-5 mr-2 text-amber-600" />
                      )}
                      <p className="text-sm text-gray-600 font-medium">
                        {destination === 'HOMEPAGE' ? 'Home Page' : destination}
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-amber-600">{count}</p>
                    <p className="text-xs text-gray-500">visits</p>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500">No destination data available</p>
          )}
        </div>

        {/* Recent Visitors Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Clock className="w-6 h-6 mr-2 text-blue-600" />
            Recent Visitors
          </h2>
          
          {loadingData ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading visitor data...</p>
            </div>
          ) : visitors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="pb-3 text-sm font-semibold text-gray-600">Date/Time</th>
                    <th className="pb-3 text-sm font-semibold text-gray-600">Page</th>
                    <th className="pb-3 text-sm font-semibold text-gray-600">Destination</th>
                    <th className="pb-3 text-sm font-semibold text-gray-600">Device</th>
                    <th className="pb-3 text-sm font-semibold text-gray-600">Language</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.slice(0, 20).map((visitor) => {
                    const visitDate = visitor.timestamp?.toDate();
                    const deviceInfo = visitor.userAgent?.includes('Mobile') ? 'Mobile' : 'Desktop';
                    
                    return (
                      <tr key={visitor.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 text-sm text-gray-700">
                          {visitDate ? (
                            <>
                              <div>{visitDate.toLocaleDateString()}</div>
                              <div className="text-xs text-gray-500">
                                {visitDate.toLocaleTimeString()}
                              </div>
                            </>
                          ) : (
                            visitor.date
                          )}
                        </td>
                        <td className="py-3 text-sm text-gray-700">
                          {visitor.pageName || visitor.page}
                        </td>
                        <td className="py-3 text-sm">
                          {visitor.destination ? (
                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs">
                              {visitor.destination}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-3 text-sm text-gray-700">
                          <span className="flex items-center">
                            <Monitor className="w-4 h-4 mr-1" />
                            {deviceInfo}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-700">
                          {visitor.language || '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No visitor data yet</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}