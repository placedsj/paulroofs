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
              OLD SCHOOL WORK ETHIC. NEW SCHOOL ROOFING.
            </h1>
            <p className="mt-6 max-w-2xl text-xl md:text-2xl text-zinc-200 text-shadow-outline-sm">
              THE LAST ROOF YOU'LL EVER NEED.
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
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold">30 YEARS OF ROOFING EXCELLENCE</h2>
                    <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg">
                        Based in Quispamsis, Paul's Roofing has been the trusted choice for homeowners throughout Southern New Brunswick for three decades. We specialize in premium metal and asphalt roofing systems engineered to last, backed by comprehensive warranties and expert craftsmanship.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative rounded-lg overflow-hidden shadow-lg h-96">
                        <Image
                            src="https://picsum.photos/800/600"
                            alt="Paul's Roofing team working on a roof"
                            fill
                            className="object-cover"
                            data-ai-hint="roofing team work"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                         <div className="absolute bottom-0 left-0 p-6">
                            <h3 className="text-2xl font-bold text-white text-shadow-outline">Licensed & Insured</h3>
                            <p className="text-white/90 text-shadow-outline-sm">Peace of mind guaranteed.</p>
                         </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-6">WHY CHOOSE PAUL'S ROOFING?</h3>
                        <ul className="space-y-4">
                            {[
                                { title: "30+ Years of Experience", description: "Three decades of dedicated service in Southern NB." },
                                { title: "Metal Roofing Specialists", description: "Expert installation of durable and beautiful metal roofs." },
                                { title: "Lifetime Warranties", description: "We stand by our work with available lifetime warranties." },
                                { title: "Premium Materials", description: "We use only the best materials for a long-lasting finish." },
                                { title: "24/7 Emergency Service", description: "Ready to respond when you need us most." },
                                { title: "Locally Owned & Operated", description: "Proudly serving our local community." },
                            ].map((item) => (
                                <li key={item.title} className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <Check className="h-6 w-6 text-primary mr-3 mt-1" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">{item.title}</h4>
                                        <p className="text-muted-foreground">{item.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
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
