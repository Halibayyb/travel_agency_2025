// components/VisitorTracker.tsx
"use client";

import { useEffect } from "react";
import { db } from "@/src/lib/firebase/config";
import { collection, addDoc } from "firebase/firestore";

interface VisitorTrackerProps {
  destination?: string; // Optional destination name
  pageName?: string;     // Optional custom page name
}

export default function VisitorTracker({ 
  destination, 
  pageName 
}: VisitorTrackerProps = {}) {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const today = new Date().toDateString();
        const currentPath = window.location.pathname;
        
        // Generate unique visit ID
        const visitId = `visit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Prepare tracking data
        const trackingData = {
          visitId,
          date: today,
          timestamp: new Date(),
          page: currentPath,
          pageName: pageName || currentPath,
          // Browser info
          userAgent: navigator.userAgent,
          language: navigator.language,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
        };

        // Add destination if provided (for destination pages)
        if (destination) {
          Object.assign(trackingData, {
            destination: destination,
            destinationType: 'city',
          });
        }

        // Track to visitors collection
        const visitorsRef = collection(db, "visitors");
        await addDoc(visitorsRef, trackingData);

        console.log("📊 Visitor tracked:", {
          page: currentPath,
          destination: destination || 'N/A',
        });

      } catch (error) {
        console.error("❌ Error tracking visitor:", error);
      }
    };

    // Track visitor once when component mounts
    trackVisitor();
  }, [destination, pageName]); // Re-track if destination changes

  return null;
}