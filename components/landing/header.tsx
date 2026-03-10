"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-bangla-green">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">
            <span className="text-bangla-green">Bangla</span>
            <span className="text-foreground">.design</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link href="#templates" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Templates
          </Link>
          <Link href="#about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            About
          </Link>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Get Started Free</Link>
          </Button>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-b bg-background md:hidden">
          <div className="container space-y-4 py-4">
            <Link href="#features" className="block text-sm font-medium text-muted-foreground">
              Features
            </Link>
            <Link href="#pricing" className="block text-sm font-medium text-muted-foreground">
              Pricing
            </Link>
            <Link href="#templates" className="block text-sm font-medium text-muted-foreground">
              Templates
            </Link>
            <Link href="#about" className="block text-sm font-medium text-muted-foreground">
              About
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="outline" asChild className="w-full">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/register">Get Started Free</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
