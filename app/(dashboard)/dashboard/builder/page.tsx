"use client"

import { useState } from "react"
import { Sparkles, Wand2, Loader2, Globe2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

const templates = [
  { id: "restaurant", name: "Restaurant", description: "Perfect for cafes and restaurants" },
  { id: "portfolio", name: "Portfolio", description: "Showcase your work professionally" },
  { id: "ecommerce", name: "E-commerce", description: "Sell products online" },
  { id: "business", name: "Business", description: "Corporate and business sites" },
  { id: "blog", name: "Blog", description: "Share your thoughts and stories" },
  { id: "landing", name: "Landing Page", description: "Marketing and product launches" },
]

export default function BuilderPage() {
  const [prompt, setPrompt] = useState("")
  const [siteName, setSiteName] = useState("")
  const [generating, setGenerating] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim() || !siteName.trim()) {
      toast.error("Please enter both a site name and description")
      return
    }

    setGenerating(true)
    
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: selectedTemplate 
            ? `${siteName} - ${selectedTemplate} template: ${prompt || "Create a professional website"}`
            : `${siteName}: ${prompt}`,
          type: "website",
          language: "bn",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Generation failed")
      }

      toast.success("Website generated successfully!")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Generation failed")
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">AI Website Builder</h1>
        <p className="text-muted-foreground">Describe your dream website and let AI create it for you</p>
      </div>

      <Tabs defaultValue="ai" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ai" className="gap-2">
            <Sparkles className="h-4 w-4" />
            AI Generation
          </TabsTrigger>
          <TabsTrigger value="template" className="gap-2">
            <Globe2 className="h-4 w-4" />
            From Template
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-bangla-green" />
                Generate with AI
              </CardTitle>
              <CardDescription>
                Describe your website idea in detail and our AI will create it for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Website Name</Label>
                <Input
                  id="siteName"
                  placeholder="e.g., My Restaurant, Portfolio, Online Shop"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prompt">Describe Your Website</Label>
                <textarea
                  id="prompt"
                  className="min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="e.g., I want a modern restaurant website with a menu section, photo gallery, reservation form, and contact information. The design should be warm and inviting with earthy colors."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleGenerate} 
                disabled={generating || !prompt.trim() || !siteName.trim()}
                className="w-full"
                size="lg"
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Website
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Better Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                <li>Be specific about the type of website you want</li>
                <li>Mention specific sections or pages you need</li>
                <li>Describe the color scheme or mood you prefer</li>
                <li>Include any specific features like forms, galleries, or e-commerce</li>
                <li>You can write in English or Bangla</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="template" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="templateSiteName">Website Name</Label>
              <Input
                id="templateSiteName"
                placeholder="Enter your website name"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all hover:border-bangla-green/50 ${
                    selectedTemplate === template.id ? "border-2 border-bangla-green" : ""
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                      <Globe2 className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Button 
              onClick={handleGenerate}
              disabled={!selectedTemplate || !siteName.trim() || generating}
              className="w-full"
              size="lg"
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Create from Template
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
