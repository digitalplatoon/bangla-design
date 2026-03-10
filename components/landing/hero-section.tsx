"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-background py-20 md:py-32">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4 text-bangla-green" />
            <span>Bangladesh&apos;s First AI Website Builder</span>
          </div>
          
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Build Your Dream Website with{" "}
            <span className="gradient-text">AI Power</span>
          </h1>
          
          <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
            Create stunning, professional websites in minutes using AI. No coding required. 
            Supports bKash and Nagad payments for easy subscription management.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="xl" asChild>
              <Link href="/register">
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="#templates">View Templates</Link>
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-bangla-green" />
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-bangla-green" />
              <span>Secure & Reliable</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-bangla-green" />
              <span>AI-Powered</span>
            </div>
          </div>
        </div>
        
        <div className="relative mt-16">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border bg-background shadow-2xl">
            <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <div className="ml-4 flex-1 rounded bg-muted px-4 py-1 text-xs text-muted-foreground">
                bangla.design/builder
              </div>
            </div>
            <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 p-8">
              <div className="grid h-full grid-cols-3 gap-4">
                <div className="rounded-lg border-2 border-dashed border-muted-foreground/20 bg-background/50 p-4">
                  <div className="mb-2 h-3 w-16 rounded bg-muted-foreground/20" />
                  <div className="h-2 w-full rounded bg-muted-foreground/10" />
                  <div className="mt-1 h-2 w-3/4 rounded bg-muted-foreground/10" />
                </div>
                <div className="col-span-2 rounded-lg border-2 border-dashed border-bangla-green/40 bg-bangla-green/5 p-4">
                  <div className="flex h-full flex-col items-center justify-center gap-2">
                    <Sparkles className="h-8 w-8 text-bangla-green" />
                    <span className="text-sm font-medium text-bangla-green">AI Building...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
