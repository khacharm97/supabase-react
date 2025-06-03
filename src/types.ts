export type AuthUser = {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at: string | null;
    phone: string | null;
    confirmed_at: string | null;
    created_at: string;
    updated_at: string;
}
export type AuthSession = {
    access_token: string;
    expires_in: number;
    expires_at: number;
    refresh_token: string;
    token_type: string;
    user: AuthUser;
}