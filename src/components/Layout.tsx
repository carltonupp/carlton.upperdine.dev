import Link from "next/link";
import { PropsWithChildren } from "react";
import Profile from "./Profile";

export default function Layout({ children }: PropsWithChildren) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen font-sans-">
      <header className="bg-sky-900 mb-8 py-4">
        <div className="container mx-auto text-center md:text-left md:flex justify-center text-white text-xl">
          <Link href="/" className="basis-1/2">
            <>Carlton Upperdine</>
          </Link>
          <div>
            <Link href="https://blog.upperdine.dev">
              <>Blog</>
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
