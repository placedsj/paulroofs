
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RecommendationForm } from "./recommendation-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export default function RecommendationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 bg-secondary/20">
        <div className="container mx-auto px-4 py-12">
            <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                    <Lightbulb className="mx-auto h-12 w-12 text-primary" />
                    <CardTitle className="text-3xl md:text-4xl mt-2">AI Roofing Recommender</CardTitle>
                    <CardDescription className="text-lg">
                        Get an expert recommendation for materials and colors based on your home's style and location.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RecommendationForm />
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
