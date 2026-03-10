import type { Metadata, Viewport } from "next"
import { Inter, Poppins, Noto_Sans_Bengali } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

const notoBengali = Noto_Sans_Bengali({ 
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-bengali",
})

export const metadata: Metadata = {
  title: "Bangla.design - AI Website Builder for Bangladesh",
  description: "Build stunning websites in minutes with AI. The first national-level AI website builder platform for Bangladesh with bKash & Nagad payment support.",
  keywords: ["AI website builder", "Bangladesh", "bKash", "Nagad", "web design", "bangla", "website maker"],
  authors: [{ name: "Bangla.design Team" }],
  openGraph: {
    title: "Bangla.design - AI Website Builder for Bangladesh",
    description: "Build stunning websites in minutes with AI. The first national-level AI website builder platform for Bangladesh.",
    url: "https://bangla.design",
    siteName: "Bangla.design",
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bangla.design - AI Website Builder for Bangladesh",
    description: "Build stunning websites in minutes with AI.",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#006A4E",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} ${notoBengali.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
