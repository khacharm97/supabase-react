import {Navbar} from "@/components/Navbar.tsx";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className="min-h-screen w-screen flex flex-col justify-between ">
            <div className={"flex items-center justify-center "}>
                <Navbar />
            </div>
            <main className="main-content flex-1 flex justify-center mt-20 sm:px-20 px-4 w-full">
                {children}
            </main>
            <footer className="footer px-4 sm:px-20">
            </footer>
        </div>
    )
}