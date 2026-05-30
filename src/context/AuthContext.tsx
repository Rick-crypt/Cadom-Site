import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export type UserRole = 'client' | 'admin' | 'super-admin';

interface UserData {
  uid: string;
  email: string | null;
  role: UserRole;
  photoURL?: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const handleUserData = async (firebaseUser: any) => {
    try {
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDocInfo = await getDoc(userDocRef);
      let role: UserRole = 'client';
      let photoURL = firebaseUser.photoURL || undefined;

      const isSuperAdmin = firebaseUser.email === 'andymbourou45@gmail.com' || firebaseUser.email === 'autre@example.com';
      
      if (isSuperAdmin) {
        role = 'super-admin';
        if (!userDocInfo.exists() || userDocInfo.data()?.role !== 'super-admin') {
          await setDoc(userDocRef, { email: firebaseUser.email, role: 'super-admin' }, { merge: true });
        }
      } else if (userDocInfo.exists()) {
        role = userDocInfo.data().role || 'client';
        if (userDocInfo.data().photoURL) photoURL = userDocInfo.data().photoURL;
        if (userDocInfo.data().isAdmin && !userDocInfo.data().role) {
          role = 'admin';
        }
      } else {
        await setDoc(userDocRef, { email: firebaseUser.email, role: 'client' }, { merge: true });
      }

      return { uid: firebaseUser.uid, email: firebaseUser.email, role, photoURL };
    } catch (e) {
      console.error("Error fetching user data", e);
      const role = (firebaseUser.email === 'andymbourou45@gmail.com' || firebaseUser.email === 'autre@example.com') ? 'super-admin' : 'client';
      return { uid: firebaseUser.uid, email: firebaseUser.email, role, photoURL: firebaseUser.photoURL || undefined };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await handleUserData(firebaseUser);
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signOut = () => firebaseSignOut(auth);

  const isAdmin = user?.role === 'admin' || user?.role === 'super-admin';
  const isSuperAdmin = user?.role === 'super-admin';

  const contextValue = useMemo(() => ({
    user,
    loading,
    isAdmin,
    isSuperAdmin,
    signOut,
  }), [user, loading, isAdmin, isSuperAdmin]);

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? (
        <div className="flex h-screen w-screen items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" /></div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

