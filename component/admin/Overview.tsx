// components/admin/Overview.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Users, Calendar, TrendingUp, MapPin, BarChart3, Clock, Globe, Monitor, Home } from 'lucide-react';
import { db } from "@/src/lib/firebase/config";
import { collection, query, getDocs, orderBy, limit, Timestamp } from "firebase/firestore";
import * as Chart from 'chart.js';

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
  name: string;
  count: number;
  percentage: string;
}

export default function OverviewDashboard() {
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [visitorStats, setVisitorStats] = useState({ 
    total: 0, 
    today: 0, 
    thisWeek: 0, 
    thisMonth: 0 
  });
  const [topDestinations, setTopDestinations] = useState<DestinationStats[]>([]);
  const [topPages, setTopPages] = useState<DestinationStats[]>([]);
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const lineChartInstance = useRef<Chart.Chart | null>(null);

  useEffect(() => {
    // Register Chart.js components
    Chart.Chart.register(
      Chart.CategoryScale,
      Chart.LinearScale,
      Chart.LineElement,
      Chart.PointElement,
      Chart.LineController,
      Chart.Title,
      Chart.Tooltip,
      Chart.Legend,
      Chart.Filler
    );

    loadAllData();

    return () => {
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (visitors.length > 0) {
      calculateStats();
      updateTrendChart();
    }
  }, [visitors]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      await loadVisitors();
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadVisitors = async () => {
    try {
      const visitorsRef = collection(db, "visitors");
      const allVisitorsQuery = query(
        visitorsRef,
        orderBy("timestamp", "desc"),
        limit(200)
      );
      const snapshot = await getDocs(allVisitorsQuery);
      
      const visitorData: VisitorData[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as VisitorData));
      
      setVisitors(visitorData);
    } catch (error) {
      console.error('Error loading visitors:', error);
    }
  };

  const calculateStats = () => {
    const now = new Date();
    const today = now.toDateString();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const todayCount = visitors.filter(v => v.date === today).length;
    const weekCount = visitors.filter(v => {
      const visitDate = v.timestamp?.toDate();
      return visitDate && visitDate >= startOfWeek;
    }).length;
    const monthCount = visitors.filter(v => {
      const visitDate = v.timestamp?.toDate();
      return visitDate && visitDate >= startOfMonth;
    }).length;

    setVisitorStats({
      total: visitors.length,
      today: todayCount,
      thisWeek: weekCount,
      thisMonth: monthCount
    });

    // Calculate top destinations
    const destCounts: { [key: string]: number } = {};
    visitors.forEach(v => {
      if (v.destination) {
        destCounts[v.destination] = (destCounts[v.destination] || 0) + 1;
      } else if (v.page === '/' || v.pageName?.includes('Home')) {
        destCounts['HOMEPAGE'] = (destCounts['HOMEPAGE'] || 0) + 1;
      }
    });

    const topDestArray = Object.entries(destCounts)
      .map(([name, count]) => ({
        name: name === 'HOMEPAGE' ? 'Home Page' : name,
        count,
        percentage: ((count / visitors.length) * 100).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    setTopDestinations(topDestArray);

    // Calculate top pages
    const pageCounts: { [key: string]: number } = {};
    visitors.forEach(v => {
      const page = v.pageName || v.page || 'Unknown';
      pageCounts[page] = (pageCounts[page] || 0) + 1;
    });

    const topPagesArray = Object.entries(pageCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: ((count / visitors.length) * 100).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    setTopPages(topPagesArray);
  };

  const updateTrendChart = () => {
    if (!lineChartRef.current) return;

    if (lineChartInstance.current) {
      lineChartInstance.current.destroy();
    }

    const last14Days = [];
    const now = new Date();

    for (let i = 13; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const dateString = date.toDateString();

      const visitorCount = visitors.filter(v => v.date === dateString).length;
      const destinationCount = visitors.filter(v => {
        return v.date === dateString && v.destination;
      }).length;

      last14Days.push({
        label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        visitors: visitorCount,
        destinations: destinationCount
      });
    }

    const ctx = lineChartRef.current.getContext('2d');
    if (!ctx) return;

    lineChartInstance.current = new Chart.Chart(ctx, {
      type: 'line',
      data: {
        labels: last14Days.map(d => d.label),
        datasets: [
          {
            label: 'Total Visitors',
            data: last14Days.map(d => d.visitors),
            borderColor: 'rgba(220, 38, 38, 1)',
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'Destination Views',
            data: last14Days.map(d => d.destinations),
            borderColor: 'rgba(251, 191, 36, 1)',
            backgroundColor: 'rgba(251, 191, 36, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 15,
              font: { size: 12, weight: 'normal' }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            displayColors: true
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              color: '#6B7280',
              font: { size: 12 }
            },
            grid: {
              color: 'rgba(107, 114, 128, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#6B7280',
              font: { size: 11 }
            },
            grid: {
              display: false
            }
          }
        }
      }
    });
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Time', 'Page', 'Destination', 'Device', 'Language', 'User Agent', 'Screen Resolution'];
    
    const rows = visitors.map(visitor => {
      const visitDate = visitor.timestamp?.toDate();
      const deviceInfo = visitor.userAgent?.includes('Mobile') ? 'Mobile' : 'Desktop';
      
      return [
        visitDate ? visitDate.toLocaleDateString() : visitor.date,
        visitDate ? visitDate.toLocaleTimeString() : '',
        visitor.pageName || visitor.page || '',
        visitor.destination || '',
        deviceInfo,
        visitor.language || '',
        visitor.userAgent || '',
        visitor.screenResolution || ''
      ];
    });
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    downloadCSV(csvContent, `visitors_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const exportDestinationsCSV = () => {
    const headers = ['Destination', 'Views', 'Percentage'];
    const rows = topDestinations.map(dest => [
      dest.name,
      dest.count.toString(),
      `${dest.percentage}%`
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    downloadCSV(csvContent, `top_destinations_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const exportPagesCSV = () => {
    const headers = ['Page', 'Visits', 'Percentage'];
    const rows = topPages.map(page => [
      page.name,
      page.count.toString(),
      `${page.percentage}%`
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    downloadCSV(csvContent, `top_pages_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const exportStatsCSV = () => {
    const headers = ['Metric', 'Value'];
    const rows = [
      ['Total Visitors', visitorStats.total.toString()],
      ['Today', visitorStats.today.toString()],
      ['This Week', visitorStats.thisWeek.toString()],
      ['This Month', visitorStats.thisMonth.toString()],
      ['Travel Interests', visitors.filter(v => v.destination).length.toString()],
      ['Engagement Rate', `${destinationViewRate}%`]
    ];
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    downloadCSV(csvContent, `visitor_stats_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const destinationViewRate = visitors.length > 0 
    ? ((visitors.filter(v => v.destination).length / visitors.length) * 100).toFixed(1)
    : '0';

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-red-800" />
              </div>
              <p className="text-sm text-gray-600 font-medium">Total Visitors</p>
            </div>
            <button
              onClick={exportStatsCSV}
              className="text-gray-400 hover:text-red-800 transition"
              title="Export Stats"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">{visitorStats.total}</p>
          <p className="text-sm text-green-600 font-semibold">
            +{visitorStats.thisWeek} this week
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-amber-800" />
            </div>
            <p className="text-sm text-gray-600 font-medium">Travel Interests</p>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {visitors.filter(v => v.destination).length}
          </p>
          <p className="text-sm text-gray-600">Destination views</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-800" />
            </div>
            <p className="text-sm text-gray-600 font-medium">Live Tracking</p>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">{visitorStats.today}</p>
          <p className="text-sm text-gray-600">Visitors today</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-800" />
            </div>
            <p className="text-sm text-gray-600 font-medium">Destination Views</p>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">{destinationViewRate}%</p>
          <p className="text-sm text-gray-600">Engagement rate</p>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-red-800" />
          Activity Overview (Last 14 Days)
        </h3>
        <div style={{ height: '320px', position: 'relative' }}>
          <canvas ref={lineChartRef}></canvas>
        </div>
      </div>

      {/* Top Destinations and Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Destinations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-800" />
              Top 5 Destinations
            </h3>
            <button
              onClick={exportDestinationsCSV}
              className="text-gray-400 hover:text-amber-800 transition"
              title="Export Destinations"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            {topDestinations.length > 0 ? (
              topDestinations.map((dest, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{dest.name}</span>
                    <span className="text-sm text-gray-600">
                      {dest.count} views ({dest.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${dest.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No destination data available</p>
            )}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-red-800" />
              Top 5 Pages
            </h3>
            <button
              onClick={exportPagesCSV}
              className="text-gray-400 hover:text-red-800 transition"
              title="Export Pages"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            {topPages.length > 0 ? (
              topPages.map((page, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{page.name}</span>
                    <span className="text-sm text-gray-600">
                      {page.count} visits ({page.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-800 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${page.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No page data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Visitors Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-800" />
            Recent Visitors
          </h3>
          <button
            onClick={exportToCSV}
            className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-900 transition font-semibold flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
        </div>
        
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
      </div>

      {/* Quick Insights */}
      <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-xl shadow-sm border border-red-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-red-800" />
          Quick Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-red-100">
            <p className="text-sm text-gray-600 mb-1">Most Popular Destination</p>
            <p className="text-lg font-bold text-gray-900">{topDestinations[0]?.name || 'N/A'}</p>
            <p className="text-xs text-gray-500 mt-1">{topDestinations[0]?.count || 0} views</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-red-100">
            <p className="text-sm text-gray-600 mb-1">Most Visited Page</p>
            <p className="text-lg font-bold text-gray-900">{topPages[0]?.name || 'N/A'}</p>
            <p className="text-xs text-gray-500 mt-1">{topPages[0]?.count || 0} visits</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-red-100">
            <p className="text-sm text-gray-600 mb-1">This Month</p>
            <p className="text-lg font-bold text-gray-900">{visitorStats.thisMonth} visitors</p>
            <p className="text-xs text-gray-500 mt-1">
              {visitors.filter(v => {
                const visitDate = v.timestamp?.toDate();
                const now = new Date();
                return visitDate && 
                  visitDate.getMonth() === now.getMonth() && 
                  visitDate.getFullYear() === now.getFullYear() &&
                  v.destination;
              }).length} destination views
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}