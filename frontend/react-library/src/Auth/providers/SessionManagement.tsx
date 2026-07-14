import type { Session } from "@supabase/supabase-js";
import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "../../api/supabaseClient";
import { SpinnerLoading } from "../../layouts/Utils/SpinnerLoading";
import { AuthContext } from "../context/AuthContext";

export const SessionManagement = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return <SpinnerLoading />;
  }
  return (
    <AuthContext.Provider value={{ session: user, loading: false }}>
      {" "}
      {children}{" "}
    </AuthContext.Provider>
  );
};
