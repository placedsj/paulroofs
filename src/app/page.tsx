

import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ServicesSection } from '@/components/services-section';
import { Testimonials } from '@/components/testimonials';
import { GallerySection } from '@/components/gallery-section';
import { ContactForm } from '@/components/contact-form';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section id="home" className="relative h-screen min-h-[600px] w-full">
          <Image
            src="https://ik.imagekit.io/ik5x4q7jl/sdfada_gJM9TZDCe?updatedAt=1757040358273"
            alt="A beautiful asphalt shingle roof on a modern home."
            fill
            priority
            className="object-cover"
            data-ai-hint="asphalt shingle roof"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/50 to-transparent" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold text-shadow-outline">
              ASPHALT BROS ROOFING LTD
            </h1>
            <p className="mt-6 max-w-2xl text-xl md:text-2xl text-zinc-200 text-shadow-outline-sm">
              Reliable Roofing Solutions for Your Home
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="font-bold text-lg">
                <a href="tel:+15066500407">
                  <Phone className="mr-2 h-5 w-5" />
                  CALL (506) 650-0407
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
                    <h2 className="text-4xl font-bold">ABOUT ASPHALT BROS ROOFING</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative rounded-lg overflow-hidden shadow-lg h-96">
                        <Image
                            src="https://picsum.photos/800/600"
                            alt="The Asphalt Bros Roofing family team"
                            fill
                            className="object-cover"
                            data-ai-hint="family team photo"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                         <div className="absolute bottom-0 left-0 p-6">
                            <h3 className="text-2xl font-bold text-white text-shadow-outline">Our Family</h3>
                         </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-6">A FAMILY-RUN & OWNED COMPANY</h3>
                        <div className="space-y-4 text-muted-foreground text-lg">
                           <p>Asphalt Bros Roofing LTD is a family-run and owned roofing company dedicated to delivering quality roofing services.</p>
                           <p>Mike has been in the roofing industry for many years and has always wanted a company of his own to showcase his talent. Caleb although new to the roofing industry has years of business experience and was very excited for this new opportunity with his brother in law.</p>
                        </div>
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
                        <h3 className="text-2xl font-bold mb-6">CONTACT US</h3>
                        <p className="text-muted-foreground mb-6">To get a free quote, or if you have questions or special requests, just drop us a line. We look forward to hearing from you!</p>
                        <div className="space-y-6">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4 shrink-0">
                                    <Phone className="text-primary-foreground" />
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">(506) 650-0407</p>
                                    <p className="text-muted-foreground text-sm">Open 9am - 5pm, 7 days a week for emergencies</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4 shrink-0">
                                    <Mail className="text-primary-foreground" />
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">mikehenderson.abr@gmail.com</p>
                                     <p className="font-semibold text-lg">calebtiner.abr@gmail.com</p>
                                    <p className="text-muted-foreground text-sm">General inquiries</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4 shrink-0">
                                    <Instagram className="text-primary-foreground" />
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">@asphaltbrosroofing</p>
                                    <p className="text-muted-foreground text-sm">Follow us on Instagram!</p>
                                </div>
                            </div>
                             <div className="flex items-center">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4 shrink-0">
                                    <Facebook className="text-primary-foreground" />
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">Find us on Facebook</p>
                                    <p className="text-muted-foreground text-sm">Promotions & pictures of our work.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ContactForm />
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
