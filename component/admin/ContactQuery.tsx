// components/admin/ContactInquiries.tsx
"use client";

import { useState, useEffect } from "react";
import { Mail, Globe, Calendar, MessageSquare, Package, CheckCircle } from "lucide-react";
import { collection, getDocs, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebase/config";

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  country: string;
  message: string;
  packageInterest: string | null;
  status: string;
  read: boolean;
  emailSent: boolean;
  timestamp: any;
  type: string;
}

export default function ContactInquiries() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read" | "pending">("all");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const inquiriesRef = collection(db, "inquiries");
      const q = query(inquiriesRef, orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      
      const data: ContactInquiry[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as ContactInquiry));
      
      setInquiries(data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const inquiryRef = doc(db, "inquiries", id);
      await updateDoc(inquiryRef, { read: true });
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, read: true } : inq))
      );
    } catch (error) {
      console.error("Error marking as read:", error);
      alert("Failed to mark as read");
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Unknown date";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString();
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (filter === "all") return true;
    if (filter === "unread") return !inq.read;
    if (filter === "read") return inq.read;
    if (filter === "pending") return inq.status === "pending";
    return true;
  });

  const statusCounts = {
    all: inquiries.length,
    unread: inquiries.filter((inq) => !inq.read).length,
    read: inquiries.filter((inq) => inq.read).length,
    pending: inquiries.filter((inq) => inq.status === "pending").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading inquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Contact Inquiries</h2>
        <p className="text-sm text-gray-600 mt-1">View all customer inquiries and messages</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-6">
        <div className="flex gap-2">
          {(["all", "unread", "read", "pending"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition capitalize ${
                filter === status
                  ? "bg-red-800 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status} ({statusCounts[status]})
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No inquiries found</p>
          </div>
        ) : (
          filteredInquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className={`bg-white rounded-xl shadow-sm border-2 transition-all ${
                !inquiry.read
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200"
              }`}
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{inquiry.name}</h3>
                      {!inquiry.read && (
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-red-100 text-red-800">
                          NEW
                        </span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        inquiry.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}>
                        {inquiry.status}
                      </span>
                      {inquiry.emailSent && (
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-800">
                          Email Sent
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {inquiry.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {inquiry.country}
                      </span>
                      {inquiry.packageInterest && (
                        <span className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          Interest: {inquiry.packageInterest}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(inquiry.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>
                </div>

                {/* Mark as Read Button */}
                {!inquiry.read && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => markAsRead(inquiry.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Read
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}