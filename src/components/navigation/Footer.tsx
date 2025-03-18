"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/20 mt-12 py-12 bg-background/60 backdrop-blur-sm font-mono">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <Link href="/" className="text-xl font-bold">
              airwu.dev
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              checkout my old website at <u><a className="bg-gradient-to-r from-[#89b4fa] via-[#cba6f7] to-[#f5c2e7] bg-clip-text text-transparent" href="https://old1.airwu.dev">old1.airwu.dev</a></u>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center md:items-end"
          >
            <div className="flex space-x-6 mb-4">
              {[
                { name: "GitHub", href: "https://github.com/airwuu" },
                { name: "LinkedIn", href: "https://linkedin.com/in/airwu" },
                // { name: "Discord", href: "#" },
                { name: "Email", href: "mailto:wu@ucmerced.edu" },
              ].map((link) => (
                <motion.a
                  target="_blank" rel="noopener noreferrer"
                  key={link.name}
                  href={link.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              © {currentYear} Aaron Wu. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
