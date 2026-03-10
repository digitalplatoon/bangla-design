import { 
  Sparkles, 
  Palette, 
  Globe, 
  Smartphone, 
  Zap, 
  Shield,
  CreditCard,
  Languages
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Design",
    description: "Describe your vision and watch AI create stunning websites instantly. No design skills needed.",
  },
  {
    icon: Palette,
    title: "Beautiful Templates",
    description: "Choose from hundreds of professionally designed templates tailored for Bangladeshi businesses.",
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description: "Connect your own domain or get a free subdomain. Full DNS management included.",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    description: "Every website is automatically optimized for mobile devices and tablets.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built on modern infrastructure for blazing fast load times and optimal performance.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with SSL certificates and 99.9% uptime guarantee.",
  },
  {
    icon: CreditCard,
    title: "Local Payments",
    description: "Pay easily with bKash, Nagad, and other local payment methods. No international card needed.",
  },
  {
    icon: Languages,
    title: "Bangla Support",
    description: "Full Bengali language support for both the builder interface and your websites.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
            Everything You Need to Build Amazing Websites
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Powerful features designed specifically for Bangladeshi entrepreneurs and businesses.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="border-2 transition-colors hover:border-bangla-green/50">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-bangla-green/10">
                  <feature.icon className="h-6 w-6 text-bangla-green" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
