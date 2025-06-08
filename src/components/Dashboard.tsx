import {useState, useEffect} from 'react'
import {supabase} from '../supabaseClient'
import Avatar from "./Avatar.tsx";
import useAuth from "../contexts/auth/authContext.tsx";
import type {AuthSession} from "../types.ts";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card.tsx";

export default function Dashboard() {
    const {session} = useAuth();
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState<null | string>(null)
    const [website, setWebsite] = useState<null | string>(null)
    const [avatar_url, setAvatarUrl] = useState<null | string>(null)

    useEffect(() => {
        let ignore = false

        async function getProfile() {
            setLoading(true)
            const {user} = session as AuthSession
            const {data, error} = await supabase
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
        const {user} = session as AuthSession

        const updates = {
            id: user.id,
            username,
            website,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        }

        const {error} = await supabase.from('profiles').upsert(updates)

        if (error) {
            alert(error.message)
        } else {
            setAvatarUrl(avatarUrl)
        }
        setLoading(false)
    }

    return (
        <form className={"w-full max-w-lg"} onSubmit={updateProfile}>
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Avatar
                                url={avatar_url}
                                size={150}
                                onUpload={(event: React.FormEvent<HTMLFormElement>, url: string) => {
                                    updateProfile(event, url)
                                }}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="text" value={session?.user.email} disabled/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">Name</Label>
                            <Input
                                id="username"
                                type="text"
                                required
                                value={username || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                                id="website"
                                type="url"
                                value={website || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebsite(e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button className="button primary" type="submit" disabled={loading}>
                        {loading ? 'Loading ...' : 'Update'}
                    </Button>
                </CardFooter>
            </Card>
        </form>

    )
}