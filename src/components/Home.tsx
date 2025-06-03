export default function Home() {
    return (
        <div className={"w-auto flex flex-col text-start"}>
            <h2 className={"text-2xl font-bold"}>
                Project with React, TypeScript, Tailwind CSS, shadcn/ui & Supabase
            </h2>
            <div className={"w-full mt-3"}>
                <p className={"text-xl font-bold"}>
                    Technical Stack
                </p>
            </div>
            <div className="w-full mt-3">
                <ul>
                    <li>
                        <span className={"font-semibold"}>React (v18+)</span> - Component-based UI architecture
                    </li>
                    <li>
                        <span className={"font-semibold"}>TypeScript </span> - Static typing for enhanced code quality and developer experience
                    </li>
                    <li>
                        <span className={"font-semibold"}>Tailwind CSS</span> - Utility-first CSS framework for rapid styling
                    </li>
                    <li>
                        <span className={"font-semibold"}>Shadcn/ui</span> - Beautiful, accessible UI components built with Radix UI and Tailwind
                    </li>
                    <li>
                        <span className={"font-semibold"}>Supabase</span> - Open-source Firebase alternative for backend services
                    </li>
                </ul>
            </div>
        </div>
    )
}