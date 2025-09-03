"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  const navLinks = [
    { href: "#home", label: "HOME" },
    { href: "#services", label: "SERVICES" },
    { href: "#about", label: "ABOUT" },
    { href: "#contact", label: "CONTACT" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold font-headline text-primary">
            PAUL'S ROOFING
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
             <Button asChild variant="outline" size="sm">
                <Link href="/recommendations">AI Recommender</Link>
            </Button>
            <Button asChild size="sm">
                <Link href="/login">BOSS QUARTERS</Link>
            </Button>
          </nav>
           <div className="md:hidden">
            <Button asChild size="sm">
                <Link href="/login">LOGIN</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
