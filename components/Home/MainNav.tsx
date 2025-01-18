import Image from "next/image";
import Link from "next/link";


export default function MainNav() {
  return (
    <nav className="flex items-center justify-between h-12">
        <div className="md:px-10 px-3 ">
            <Image src="/img/infilogo.png" alt="Logo" width={112} height={45} className="object-cover" />
        </div>
        <div className="text-base  justify-between w-2/6 md:flex hidden flex-row gap-1 text-content-day items-center">
            <Link href="/">About</Link>
            <Link href="/">Services</Link>
            <Link href="/">Contact</Link>
            <Link href="/">FAQ</Link>
            <Link href="/">Blog</Link>
        </div>
        <div className="md:flex hidden justify-center flex-row gap-2 items-center px-10">
            <Link href="/sign-in" className="border-[1px] text-base border-primary-day px-3 py-1 rounded-md">Log In</Link>
            <Link href="/sign-up" className="bg-primary-day text-base text-text-button border-primary-day px-3 py-1 rounded-md">Register</Link>
        </div>
    </nav>
  )
}
