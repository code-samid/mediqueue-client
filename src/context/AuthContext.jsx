'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import axios from 'axios';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Get JWT from backend
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/jwt`,
            { email: currentUser.email }
          );
          localStorage.setItem('token', res.data.token);
        } catch (err) {
          console.error('JWT error:', err);
        }
      } else {
        localStorage.removeItem('token');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Register with email and password
  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Update display name after register
  const updateUserProfile = (name, photo) =>
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo || null,
    });

  // Login with email and password
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Google login
  const googleLogin = () =>
    signInWithPopup(auth, new GoogleAuthProvider());

  // Logout
  const logout = () => signOut(auth);

  const value = {
    user,
    loading,
    register,
    updateUserProfile,
    login,
    googleLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);