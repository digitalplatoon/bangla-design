import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const plans = [
  {
    name: "Free",
    description: "Perfect for trying out the platform",
    price: 0,
    period: "forever",
    features: [
      "1 Website",
      "Bangla.design subdomain",
      "5 AI generations/month",
      "Basic templates",
      "Community support",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    description: "For individuals and small businesses",
    price: 499,
    period: "month",
    features: [
      "5 Websites",
      "Custom domain support",
      "100 AI generations/month",
      "All templates",
      "Priority support",
      "Analytics dashboard",
      "Remove branding",
    ],
    cta: "Get Pro",
    popular: true,
  },
  {
    name: "Business",
    description: "For agencies and large teams",
    price: 1499,
    period: "month",
    features: [
      "Unlimited Websites",
      "Custom domain support",
      "Unlimited AI generations",
      "All templates + Premium",
      "24/7 Priority support",
      "Advanced analytics",
      "White-label solution",
      "Team collaboration",
      "API access",
    ],
    cta: "Get Business",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="bg-muted/50 py-20 md:py-32">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Choose the plan that fits your needs. All plans include bKash and Nagad payment options.
          </p>
        </div>
        
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative flex flex-col ${plan.popular ? "border-2 border-bangla-green shadow-lg" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" variant="default">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {plan.price === 0 ? "Free" : `৳${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground">/{plan.period}</span>
                  )}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-bangla-green" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href="/register">{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <span className="text-sm text-muted-foreground">Accepted payment methods:</span>
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-bkash px-4 py-2 text-sm font-semibold text-white">bKash</span>
            <span className="rounded-lg bg-nagad px-4 py-2 text-sm font-semibold text-white">Nagad</span>
            <span className="rounded-lg border bg-background px-4 py-2 text-sm font-semibold">Card</span>
          </div>
        </div>
      </div>
    </section>
  )
}
