import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, Siren, Check } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ServicesSection } from '@/components/services-section';
import { Testimonials } from '@/components/testimonials';
import { GallerySection } from '@/components/gallery-section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section id="home" className="relative h-screen min-h-[600px] w-full">
          <Image
            src="https://picsum.photos/1920/1080"
            alt="A beautiful metal roof on a modern house"
            fill
            priority
            className="object-cover"
            data-ai-hint="metal roof house"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/50 to-transparent" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold text-shadow-outline">
              THE LAST ROOF YOU'LL EVER NEED.
            </h1>
            <p className="mt-6 max-w-2xl text-xl md:text-2xl text-zinc-200 text-shadow-outline-sm">
              30 YEARS ON THE ROOF. READY FOR YOURS.
            </p>
            <p className="mt-4 max-w-xl text-lg text-zinc-300">
              Southern New Brunswick's Premier Metal Roofing Specialist.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="font-bold text-lg">
                <a href="tel:+15067177285">
                  <Phone className="mr-2 h-5 w-5" />
                  CALL (506) 717-PAUL
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-bold text-lg border-2 border-primary text-primary-foreground bg-transparent hover:bg-primary hover:text-primary-foreground">
                <Link href="#contact">GET FREE QUOTE</Link>
              </Button>
            </div>
          </div>
        </section>

        <ServicesSection />

        <section id="about" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-8">30 YEARS OF EXCELLENCE</h2>
                        <p className="text-muted-foreground text-lg mb-6">
                            Based in Quispamsis, New Brunswick, Paul's Roofing has been the trusted choice for homeowners throughout Southern NB for three decades.
                        </p>
                        <p className="text-muted-foreground text-lg mb-6">
                            We specialize in premium metal roofing systems that are engineered to last a lifetime, backed by comprehensive warranties and expert craftsmanship.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-primary rounded-full mr-4"></div>
                                <span className="text-foreground">Licensed & Insured</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-primary rounded-full mr-4"></div>
                                <span className="text-foreground">Lifetime Warranties Available</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-primary rounded-full mr-4"></div>
                                <span className="text-foreground">Emergency Services 24/7</span>
                            </div>
                        </div>
                    </div>
                    <Card className="bg-card">
                        <CardHeader>
                            <CardTitle className="text-2xl">WHY CHOOSE US?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-muted-foreground">
                                {[
                                    "30+ years of roofing experience",
                                    "Specialized in metal roofing systems",
                                    "Serving all of Southern New Brunswick",
                                    "Premium materials and workmanship",
                                    "Comprehensive warranty coverage",
                                    "Emergency repair services"
                                ].map((item) => (
                                    <li key={item} className="flex items-start">
                                        <Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        <Testimonials />

        <GallerySection />

        <section id="contact" className="py-20 bg-secondary/20">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16">GET IN TOUCH</h2>
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold mb-6">CONTACT INFORMATION</h3>
                        <div className="space-y-6">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4 shrink-0">
                                    <Phone className="text-primary-foreground" />
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">(506) 717-PAUL</p>
                                    <p className="text-muted-foreground text-sm">Available 24/7 for emergencies</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4 shrink-0">
                                    <Mail className="text-primary-foreground" />
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">paul@paulsroofing.ca</p>
                                    <p className="text-muted-foreground text-sm">General inquiries</p>
                                </div>
                            </div>
                             <div className="flex items-center">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4 shrink-0">
                                    <Siren className="text-primary-foreground" />
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">hurry@paulsroofing.ca</p>
                                    <p className="text-muted-foreground text-sm">Emergency repairs</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4 shrink-0">
                                    <MapPin className="text-primary-foreground" />
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">Quispamsis, New Brunswick</p>
                                    <p className="text-muted-foreground text-sm">Serving all of Southern NB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">REQUEST A QUOTE</CardTitle>
                            <CardDescription>Fill out the form below and we'll get back to you.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <Input type="text" placeholder="Your Name" />
                                <Input type="email" placeholder="Your Email" />
                                <Input type="tel" placeholder="Your Phone" />
                                <Textarea placeholder="Describe your roofing needs..." rows={4} />
                                <Button type="submit" className="w-full font-bold">SEND REQUEST</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
