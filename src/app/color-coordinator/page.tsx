
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ColorCoordinatorForm } from "./color-coordinator-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Palette } from "lucide-react";

export default function ColorCoordinatorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 bg-secondary/20">
        <div className="container mx-auto px-4 py-12">
            <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                    <Palette className="mx-auto h-12 w-12 text-primary" />
                    <CardTitle className="text-3xl md:text-4xl mt-2">AI Color Coordinator</CardTitle>
                    <CardDescription className="text-lg">
                        Get expert color palette suggestions for your entire home exterior.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ColorCoordinatorForm />
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
