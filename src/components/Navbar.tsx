"use client"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Shadcnlogo from "@/assets/shadcn-logo.svg"
import {useNavigate} from "react-router";
import useAuth from "@/contexts/auth/authContext.tsx";
import {Button} from "@/components/ui/button.tsx";
import {supabase} from "@/supabaseClient.ts";

export function Navbar() {
    const navigate = useNavigate();
    const {session} = useAuth();
    const navigateToHome = () => {
        navigate('/')
    }
    const navigateToDashboard = () => {
        navigate('/dashboard')
    }
    const navigateToLogin = () => {
        navigate('/signin')
    }
    return (
        <div className={"flex items-center justify-between w-full px-4 py-2 bg-white border-b border-gray-200"}>
            <div>
                <img src={Shadcnlogo} alt="" width={24} height={'auto'} className={"cursor-pointer"} onClick={navigateToHome}/>
            </div>
            <NavigationMenu viewport={false} className={"mt-1"}>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <span onClick={navigateToHome} className={"cursor-pointer"}>Home</span>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    {session?.user && <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <span onClick={navigateToDashboard} className={"cursor-pointer"}>Dashboard</span>
                        </NavigationMenuLink>
                    </NavigationMenuItem>}
                </NavigationMenuList>
            </NavigationMenu>
            <div>
                {
                    session?.user ? <div>
                            <Button onClick={() => supabase.auth.signOut()}>SignOut</Button>
                    </div> :
                    <div>
                        <Button onClick={navigateToLogin}>SignIn</Button>
                    </div>
                }
            </div>
        </div>

    )
}
