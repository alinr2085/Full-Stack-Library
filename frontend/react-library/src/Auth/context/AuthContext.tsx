import type { Session } from "@supabase/supabase-js";
import { createContext } from "react";

type AuthContextType = {
  session: Session | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
});
