import type {AuthSession} from "../../types.ts";
import {createContext, useContext, useEffect, useState} from "react";
import {supabase} from "../../supabaseClient.ts";
import {useLocation, useNavigate} from "react-router";

interface AuthContextType {
    session: AuthSession | null;
    setSession: (session: AuthSession | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// /contexts/auth/authProvider.tsx
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [session, setSession] = useState<AuthSession | null>(null)
    useEffect(() => {
        const origin = location.state?.from?.pathname || '/dashboard';
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session as AuthSession);
            navigate(origin);
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session as AuthSession);
            navigate(origin);
        })
    }, []);

    return (
        <AuthContext.Provider value={{ session, setSession }}>
            {children}
        </AuthContext.Provider>
    );
};

// /contexts/auth/useAuth.tsx
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default useAuth;