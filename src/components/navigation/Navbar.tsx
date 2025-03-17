"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "About", path: "/" },
  { name: "Experience", path: "/experience" },
  { name: "Projects", path: "/projects" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 backdrop-blur-md font-mono">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold tracking-tight text-2xl">airwu</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="hidden md:flex md:items-center md:space-x-4"
        >
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <motion.div
                className="relative group px-3 py-2"
                whileHover={{ scale: 1.05, z: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span
                  className={`font-medium ${
                    pathname === item.path
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                </span>
                {pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden"
        >
          <div className="border-t border-border/40 bg-background/80 backdrop-blur-md px-4 py-3 shadow-lg">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                >
                  <motion.div
                    whileHover={{ x: 5 }}
                    className={`px-3 py-2 ${
                      pathname === item.path
                        ? "font-medium text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
