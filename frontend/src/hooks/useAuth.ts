"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getMyAccount } from "@/lib/auth-api";
import { createClient } from "@/lib/supabase/client";


export function useAuth() {
  const [supabase] = useState(createClient);
  const [user, setUser] = useState<User | null>(null);
  const [accountRole, setAccountRole] = useState<
    "customer" | "admin" | null
  >(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      let currentRole: "customer" | "admin" | null = null;

      if (currentUser) {
        try {
          const profile = await getMyAccount();
          currentRole = profile.role;
        } catch {
          currentRole = null;
        }
      }

      if (isMounted) {
        setUser(currentUser);
        setAccountRole(currentRole);
        setIsAuthLoading(false);
      }
    }

    void loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        if (isMounted) {
          setUser(currentSession?.user ?? null);
          setAccountRole(null);
          setIsAuthLoading(false);

          if (currentSession?.user) {
            void loadUser();
          }
        }
      },
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  return {
    user,
    isAuthenticated: Boolean(user),
    accountRole,
    isAdmin: accountRole === "admin",
    isAuthLoading,
    signOut,
  };
}
