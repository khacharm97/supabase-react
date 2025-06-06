import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import Avatar from "./Avatar.tsx";
import useAuth from "../contexts/auth/authContext.tsx";
import type {AuthSession} from "../types.ts";

export default function Dashboard() {
    const { session } = useAuth();
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState<null | string>(null)
    const [website, setWebsite] = useState<null | string>(null)
    const [avatar_url, setAvatarUrl] = useState<null | string>(null)

    useEffect(() => {
        let ignore = false
        async function getProfile() {
            setLoading(true)
            const { user } = session as AuthSession
            const { data, error } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url`)
                .eq('id', user.id)
                .single()

            if (!ignore) {
                if (error) {
                    console.warn(error)
                } else if (data) {
                    setUsername(data.username)
                    setWebsite(data.website)
                    setAvatarUrl(data.avatar_url)
                }
            }

            setLoading(false)
        }

        getProfile()

        return () => {
            ignore = true
        }
    }, [session])

    async function updateProfile(event: React.FormEvent<HTMLFormElement>, avatarUrl: string) {
        event.preventDefault()

        setLoading(true)
        const { user } = session as AuthSession

        const updates = {
            id: user.id,
            username,
            website,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        }

        const { error } = await supabase.from('profiles').upsert(updates)

        if (error) {
            alert(error.message)
        } else {
            setAvatarUrl(avatarUrl)
        }
        setLoading(false)
    }

    return (
        <form onSubmit={updateProfile} className="form-widget">
            <Avatar
                url={avatar_url}
                size={150}
                onUpload={(event: React.FormEvent<HTMLFormElement>, url: string) => {
                    updateProfile(event, url)
                }}
            />
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" value={session?.user.email} disabled />
            </div>
            <div>
                <label htmlFor="username">Name</label>
                <input
                    id="username"
                    type="text"
                    required
                    value={username || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    type="url"
                    value={website || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebsite(e.target.value)}
                />
            </div>

            <div>
                <button className="button block primary" type="submit" disabled={loading}>
                    {loading ? 'Loading ...' : 'Update'}
                </button>
            </div>

            <div>
                <button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
                    Sign Out
                </button>
            </div>
        </form>
    )
}