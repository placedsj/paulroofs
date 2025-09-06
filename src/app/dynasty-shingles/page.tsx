
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Shield, Droplets, Wind, Star } from "lucide-react";
import { ColorChartSelector } from "@/components/color-chart-selector";
import { dynastyShingleColors } from "@/lib/colors";

const dynastyBenefits = [
    { icon: <Shield className="h-6 w-6 text-primary" />, text: "Class 3 Impact Resistance rating, which may lower insurance premiums." },
    { icon: <Wind className="h-6 w-6 text-primary" />, text: "Built-in ArmourZone for superior high-wind and weather protection." },
    { icon: <Droplets className="h-6 w-6 text-primary" />, text: "Algae-resistant technology to prevent unsightly black streaks." },
    { icon: <Star className="h-6 w-6 text-primary" />, text: "Dimensional profile and deep shadow bands for a stunning, high-end look." }
];

const faqs = [
    { 
        question: "What is the warranty on IKO Dynasty shingles?", 
        answer: "IKO Dynasty shingles come with a limited lifetime warranty. We also provide our own workmanship warranty, ensuring your investment is protected from all angles. Contact us for the full warranty details." 
    },
    { 
        question: "How do Dynasty shingles handle harsh weather?", 
        answer: "They are one of the best choices for our Maritime climate. Their heavy-duty construction and ArmourZone nailing strip provide exceptional resistance to high winds, and their Class 3 Impact Resistance rating means they stand up well against hail and debris." 
    },
    { 
        question: "Are these shingles energy efficient?", 
        answer: "While all roofing helps with insulation, certain Dynasty colors are designed to be more reflective, which can help keep your attic cooler in the summer and potentially reduce your air conditioning costs." 
    },
    { 
        question: "How long does a Dynasty roof installation take?", 
        answer: "For an average-sized home, a full roof replacement with Dynasty shingles typically takes 2-4 days, depending on weather and the complexity of your roof. We always work efficiently while maintaining the highest quality standards." 
    }
];

export default function DynastyShinglesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] w-full bg-secondary/30">
            <Image
                src="https://ik.imagekit.io/ik5x4q7jl/Gemini_Generated_Image_13yq9113yq9113yq.png?updatedAt=1757039964062"
                alt="A stunning home with IKO Dynasty asphalt shingles"
                fill
                priority
                className="object-cover"
                data-ai-hint="durable roof home"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/60 to-transparent" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold text-shadow-outline">
                    IKO DYNASTY SHINGLES
                </h1>
                <p className="mt-4 max-w-3xl text-lg md:text-xl text-zinc-200 text-shadow-outline-sm">
                    Performance-Engineered for Unmatched Durability and Curb Appeal
                </p>
            </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-5xl mx-auto">
                {/* Introduction */}
                <section className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">THE PEAK OF PERFORMANCE & STYLE</h2>
                    <p className="text-muted-foreground text-lg">
                        When you choose IKO Dynasty shingles, you're not just getting a roof; you're getting a shield. Engineered for superior weather protection and designed with a stunning architectural look, Dynasty is the ultimate choice for homeowners who demand the best.
                    </p>
                </section>
                
                {/* Color Selector Section */}
                <section id="colors" className="mb-16">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl">Dynasty Color Collection</CardTitle>
                            <CardDescription>Explore the vibrant, high-definition color blends that will elevate your home's curb appeal.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ColorChartSelector colors={dynastyShingleColors} />
                        </CardContent>
                    </Card>
                </section>

                {/* Benefits Section */}
                <section className="mb-16">
                     <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">WHY CHOOSE DYNASTY?</h2>
                     <div className="grid md:grid-cols-2 gap-6">
                        {dynastyBenefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 bg-secondary/30 rounded-lg">
                                {benefit.icon}
                                <p className="text-muted-foreground">{benefit.text}</p>
                            </div>
                        ))}
                     </div>
                </section>
                
                 {/* CTA Section */}
                <section className="text-center bg-secondary/30 p-8 rounded-lg mb-16">
                    <h3 className="text-2xl font-bold mb-4">Ready to See the Dynasty Difference?</h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Visualize these shingles on your own home with our AI tool, or get a precise, no-obligation quote from our team.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg">
                            <Link href="/visualizer">AI Roof Visualizer</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="/#contact">Get a Free Quote</Link>
                        </Button>
                    </div>
                </section>


                {/* FAQ Section */}
                <section>
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">FREQUENTLY ASKED QUESTIONS</h2>
                    <Accordion type="single" collapsible className="w-full">
                       {faqs.map((faq, index) => (
                         <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-lg font-semibold">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                       ))}
                    </Accordion>
                </section>

            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
