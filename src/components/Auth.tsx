import { useState } from 'react'
import { supabase } from '../supabaseClient'
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Loader2Icon} from "lucide-react";

export default function Auth() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setLoading(true)
        const { error } = await supabase.auth.signInWithOtp({ email })

        if (error) {
            alert(error.message)
        } else {
            alert('Check your email for the login link!')
        }
        setLoading(false)
    }

    return (
        <div className="row flex flex-center">
            <div className="col-6 form-widget">
                <h1 className="header text-center">Sign in</h1>
                <p className="description text-lg mt-4">Sign in via magic link with your email below</p>
                <form className="form-widget" onSubmit={handleLogin}>
                    <div className={"mt-4"}>
                        <Input type="email" placeholder="Email" required={true} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <Button className={'button mt-4'} disabled={loading}>
                            {loading ? <span className={"flex gap-2 items-center"}>
                                <Loader2Icon className="animate-spin" />
                                Loading
                            </span> : <span>Send magic link</span>}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}