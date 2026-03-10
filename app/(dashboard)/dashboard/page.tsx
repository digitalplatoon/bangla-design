import Link from "next/link"
import { Plus, Globe2, Sparkles, ArrowUpRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stats = [
  { name: "Total Sites", value: "3", change: "+1 this month", icon: Globe2 },
  { name: "AI Generations", value: "45/100", change: "55 remaining", icon: Sparkles },
  { name: "Total Views", value: "1,234", change: "+12% from last month", icon: TrendingUp },
]

const recentSites = [
  { name: "My Restaurant", domain: "myrestaurant.bangla.design", status: "published", views: 423 },
  { name: "Portfolio Site", domain: "portfolio.bangla.design", status: "draft", views: 0 },
  { name: "Shop Online", domain: "shop.bangla.design", status: "published", views: 811 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening with your sites.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/builder">
            <Plus className="mr-2 h-4 w-4" />
            Create New Site
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Sites</CardTitle>
            <CardDescription>Your recently created or modified websites</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSites.map((site) => (
                <div key={site.name} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Globe2 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{site.name}</p>
                      <p className="text-sm text-muted-foreground">{site.domain}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={site.status === "published" ? "success" : "secondary"}>
                      {site.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{site.views} views</span>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/sites/${site.name.toLowerCase().replace(/\s/g, "-")}`}>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button variant="outline" className="h-auto justify-start gap-4 p-4" asChild>
              <Link href="/dashboard/builder">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bangla-green/10">
                  <Sparkles className="h-5 w-5 text-bangla-green" />
                </div>
                <div className="text-left">
                  <p className="font-medium">AI Website Builder</p>
                  <p className="text-sm text-muted-foreground">Create a new site with AI assistance</p>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto justify-start gap-4 p-4" asChild>
              <Link href="/dashboard/templates">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Globe2 className="h-5 w-5 text-blue-500" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Browse Templates</p>
                  <p className="text-sm text-muted-foreground">Start from a professional template</p>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto justify-start gap-4 p-4" asChild>
              <Link href="/dashboard/billing">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <TrendingUp className="h-5 w-5 text-amber-500" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Upgrade Plan</p>
                  <p className="text-sm text-muted-foreground">Get more AI generations and features</p>
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
