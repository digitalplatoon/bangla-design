import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const templates = [
  {
    name: "E-commerce Store",
    category: "Business",
    image: "/templates/ecommerce.jpg",
    popular: true,
  },
  {
    name: "Restaurant Menu",
    category: "Food & Dining",
    image: "/templates/restaurant.jpg",
    popular: false,
  },
  {
    name: "Portfolio",
    category: "Personal",
    image: "/templates/portfolio.jpg",
    popular: true,
  },
  {
    name: "Corporate Site",
    category: "Business",
    image: "/templates/corporate.jpg",
    popular: false,
  },
  {
    name: "Blog",
    category: "Content",
    image: "/templates/blog.jpg",
    popular: false,
  },
  {
    name: "Landing Page",
    category: "Marketing",
    image: "/templates/landing.jpg",
    popular: true,
  },
]

export function TemplatesSection() {
  return (
    <section id="templates" className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
            Start with Beautiful Templates
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Choose from professionally designed templates and customize them with AI assistance.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.name} className="group overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="mb-2 text-4xl font-bold text-muted-foreground/20">
                        {template.name.charAt(0)}
                      </div>
                      <span className="text-sm text-muted-foreground">Preview</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button variant="secondary" size="sm">
                      Use Template
                    </Button>
                  </div>
                  {template.popular && (
                    <Badge className="absolute left-3 top-3" variant="success">
                      Popular
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.category}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/templates">
              View All Templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
