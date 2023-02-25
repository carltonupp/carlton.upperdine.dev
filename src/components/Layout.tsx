import Link from "next/link";
import { PropsWithChildren } from "react";
import Profile from "./Profile";


export default function Layout ({ children } : PropsWithChildren) {
    return (
        <div className="flex flex-col min-h-screen font-mono">
            <header className="bg-sky-900 mb-8 py-4">
                <div className="container mx-auto flex justify-center text-white text-xl">
                    <Link href="/">
                        <>Carlton Upperdine</>
                    </Link>
                </div>
            </header>
            <main className="container mx-auto flex-1">
                <Profile />
                {children}
            </main>
            <footer className="bg-sky-900 mt-8 py-4">
                <div className="container mx-auto flex justify-center text-white">
                    &copy; 2023 Carlton Upperdine
                </div>
            </footer>
        </div>
    );
}