import { createContext, useContext, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const sawAuthEvent = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        sawAuthEvent.current = true;
        setSession(session);
        setLoading(false);
      }
    );

    const bootstrap = async () => {
      let current: Session | null = null;
      for (let attempt = 0; attempt < 3; attempt += 1) {
        const { data } = await supabase.auth.getSession();
        current = data.session ?? null;
        if (current) break;
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      if (!isMounted || sawAuthEvent.current) return;
      setSession(current);
      setLoading(false);
    };

    bootstrap();

    return () => {
      isMounted = false;
      subscription?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: session?.user ?? null, session, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
