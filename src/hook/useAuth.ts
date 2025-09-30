// hooks/useAuth.ts
// 💂 THE SECURITY GUARD - Simple hook, no Context API!

"use client";

import { useState, useEffect } from "react";
import { auth } from "../lib/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser) {
        console.log("🟢 Security Guard: Someone is inside!", currentUser.email);
      } else {
        console.log("🔴 Security Guard: Nobody's inside!");
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;