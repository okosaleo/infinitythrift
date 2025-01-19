"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AlignJustify, X } from "lucide-react";

const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/", label: "Services" },
  { path: "/", label: "Contact" },
  { path: "/", label: "FAQ" },
];

export default function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  gsap.registerPlugin(useGSAP);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.set(".menu-link-item-holder", { y: 75 });
    tl.current = gsap
      .timeline({ paused: true })
      .to(".menu-overlay", {
        duration: 1.25,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.inOut",
      })
      .to(".menu-link-item-holder", {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: -0.75,
      });
  }, { scope: container.current! });

  useEffect(() => {
    if (isMenuOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isMenuOpen]);

  return (
    <div ref={container} className="relative overflow-hidden">
      <div className="menu-overlay fixed top-0 left-0 w-screen h-screen p-8 bg-text-button z-50 flex [clip-path:polygon(0%_0%,_100%_0%,_100%_0%,_0%_0%)]  justify-center text-primary-day ">
        {/* menu-overlay-bar */}
        <div className="menu-overlay-bar fixed top-[-40px] left-0 w-screen p-5 flex justify-between items-center z-50 ">
          <div className="menu-logo ">
            <Link href="/">   <Image
            src="/img/infilogo.png"
            alt="Logo"
            width={112}
            height={45}
            className="object-cover"
          /></Link>
          </div>
          <div className="menu-close cursor-pointer">
           <X onClick={toggleMenu} className="size-4 text-content-day" />
          </div>
        </div>

        {/* menu overlay items */}
        <div className="menu-copy flex flex-col  items-center justify-between pt-2 mt-4 w-full">
          <div className="menu-links mt-16 ">
            {menuLinks.map((link, index) => (
              <div
                key={index}
                className="menu-link-item items-center  justify-center w-full [clip-path:polygon(0_0,_100%_0,_100%_110%,_0%_110%)] flex p-2"
              >
                <div
                  className="menu-link-item-holder relative"
                  onClick={toggleMenu}
                >
                  <Link
                    className="menu-link  text-black text-2xl  text-center"
                    href={link.path}
                  >
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
            <div
                className="menu-link-item items-center  justify-center w-full [clip-path:polygon(0_0,_100%_0,_100%_110%,_0%_110%)] flex p-2"
              >
                <div
                  className="menu-link-item-holder relative"
                  onClick={toggleMenu}
                >
                  <Link
                    className="menu-link  text-black text-2xl  text-center border-[1px] border-content-day px-28 py-1 rounded-md "
                    href="/sign-in"
                  >
                    Log in
                  </Link>
                </div>
              </div>
              <div
                className="menu-link-item items-center  justify-center w-full [clip-path:polygon(0_0,_100%_0,_100%_110%,_0%_110%)] flex p-2"
              >
                <div
                  className="menu-link-item-holder relative"
                  onClick={toggleMenu}
                >
                  <Link
                    className="menu-link  text-text-button text-2xl  text-center bg-primary-day px-[6.4rem] py-1 rounded-md "
                    href="/sign-up"
                  >
                    Register
                  </Link>
                </div>
              </div>
          </div>
        </div>
      </div>
      <nav className="flex items-center justify-between h-12">
        <div className="md:px-10 px-3 ">
          <Image
            src="/img/infilogo.png"
            alt="Logo"
            width={112}
            height={45}
            className="object-cover"
          />
        </div>
        <div
          className="md:hidden flex px-4"
          onClick={toggleMenu}
        >
          <AlignJustify className="text-[black] size-4 " />
        </div>
        <div className="text-base  justify-between w-2/6 md:flex hidden flex-row gap-1 text-content-day items-center">
          <Link href="/about">About</Link>
          <Link href="/">Services</Link>
          <Link href="/">Contact</Link>
          <Link href="/">FAQ</Link>
          <Link href="/">Blog</Link>
        </div>
        <div className="md:flex hidden justify-center flex-row gap-2 items-center px-10">
          <Link
            href="/sign-in"
            className="border-[1px] text-base border-primary-day px-3 py-1 rounded-md"
          >
            Log In
          </Link>
          <Link
            href="/sign-up"
            className="bg-primary-day text-base text-text-button border-primary-day px-3 py-1 rounded-md"
          >
            Register
          </Link>
        </div>
      </nav>
    </div>
  );
}

