import Link from "next/link";
import { PropsWithChildren } from "react";
import Profile from "./Profile";

export default function Layout({ children }: PropsWithChildren) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen font-mono">
      <header className="bg-sky-900 mb-8 py-4">
        <div className="container mx-auto text-center md:text-left md:flex justify-center text-white text-xl">
          <div className="basis-1/2">
            <>Carlton Upperdine</>
          </div>
          <div>
            <Link href="/" className="basis-1/2 mr-4">
              <>Home</>
            </Link>
            <Link href="/about" className="mr-4">
              <>About</>
            </Link>
            <Link href="/posts">
              <>Posts</>
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto flex-1">
        <Profile />
        {children}
      </main>
      <footer className="bg-sky-900 mt-8 py-4">
        <div className="container mx-auto flex justify-center text-white">
          &copy; {currentYear} Carlton Upperdine
        </div>
      </footer>
    </div>
  );
}
