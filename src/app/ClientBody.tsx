"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.className = "antialiased dark bg-background text-foreground";
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <body className="antialiased dark" suppressHydrationWarning>
      {children}
    </body>
  );
}
