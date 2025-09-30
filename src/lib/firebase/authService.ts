// services/authService.ts
// 🚪 THE DOOR LOCK - Simple lock/unlock functions

import { 
  signInWithEmailAndPassword,
  signOut,
  User
} from "firebase/auth";
import { auth } from "./config";

export const authService = {
  // 🟢 Login
  login: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user, error: null };
    } catch (error: any) {
      return { success: false, user: null, error: error.message };
    }
  },

  // 🔴 Logout
  logout: async () => {
    try {
      await signOut(auth);
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};