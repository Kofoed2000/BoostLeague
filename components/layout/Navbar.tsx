"use client";

import { useEffect, useState } from "react";
import Button from "../ui/Button";

const links = [
  {
    name: "Calculator",
    href: "#calculator",
  },
  {
    name: "Services",
    href: "#services",
  },
  {
    name: "Reviews",
    href: "#reviews",
  },
  {
    name: "FAQ",
    href: "#faq",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        right-0
        z-50
        transition-all
        duration-300
        ${
          scrolled
            ? "border-b border-zinc-800 bg-black/70 backdrop-blur-xl"
            : "bg-transparent"
        }
      `}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <a
          href="#"
          className="text-3xl font-black text-blue-500"
        >
          BoostLeague
        </a>

        <nav className="hidden gap-10 lg:flex">

          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="
                text-gray-300
                transition
                hover:text-white
              "
            >
              {link.name}
            </a>
          ))}

        </nav>

        <Button text="Order Now" />

      </div>
    </header>
  );
}