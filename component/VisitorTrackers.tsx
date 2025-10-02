// components/VisitorTracker.tsx
"use client";

import { useEffect } from "react";
import { db } from "@/src/lib/firebase/config";
import { collection, addDoc } from "firebase/firestore";

interface VisitorTrackerProps {
  destination?: string;
  pageName?: string;
}

export default function VisitorTracker({ 
  destination, 
  pageName 
}: VisitorTrackerProps = {}) {
  useEffect(() => {
    const getCountryInfo = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return {
          country: data.country_name,
          countryCode: data.country_code,
          city: data.city,
          region: data.region,
          ip: data.ip
        };
      } catch (error) {
        console.error("Error fetching country:", error);
        return {
          country: 'Unknown',
          countryCode: 'Unknown',
          city: 'Unknown',
          region: 'Unknown'
        };
      }
    };

    const trackVisitor = async () => {
      try {
        const today = new Date().toDateString();
        const currentPath = window.location.pathname;
        
        // Get country information
        const countryInfo = await getCountryInfo();
        
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
          // Location info
          country: countryInfo.country,
          countryCode: countryInfo.countryCode,
          city: countryInfo.city,
          region: countryInfo.region,
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

        console.log("Visitor tracked:", {
          page: currentPath,
          country: countryInfo.country,
          destination: destination || 'N/A',
        });

      } catch (error) {
        console.error("Error tracking visitor:", error);
      }
    };

    // Track visitor once when component mounts
    trackVisitor();
  }, [destination, pageName]);

  return null;
}