
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Repeat, Droplets, Wind, Home, Building, Snowflake, Sun, Search, Layers, Camera, Sparkles, CalendarCheck } from 'lucide-react';


const services = [
    {
        icon: <Repeat className="h-8 w-8 text-primary" />,
        title: "Roof Replacement",
        description: "Full roof tear-off and replacement. We work with you to choose the best materials, ensuring a long-lasting, high-quality roof for your home."
    },
    {
        icon: <Wrench className="h-8 w-8 text-primary" />,
        title: "Roof Repair",
        description: "From minor leaks to significant wear, our expert team will diagnose and fix any issue, extending the life of your existing roof with quality materials."
    },
    {
        icon: <Layers className="h-8 w-8 text-primary" />,
        title: "Siding Installation & Repair",
        description: "Boost your home's curb appeal and protection. We install and repair a variety of siding materials to match your style and budget."
    },
    {
        icon: <Droplets className="h-8 w-8 text-primary" />,
        title: "Gutter Cleaning & Repair",
        description: "Clogged or damaged gutters can cause serious water damage. We offer comprehensive cleaning and repair services to ensure they function perfectly."
    },
    {
        icon: <Camera className="h-8 w-8 text-primary" />,
        title: "Drone-Assisted Inspections",
        description: "Using modern drone technology, we conduct thorough, safe, and efficient roof inspections, providing you with a detailed report of your roof's condition."
    },
     {
        icon: <Wind className="h-8 w-8 text-primary" />,
        title: "Storm Damage Repair",
        description: "Fast, reliable emergency repairs for storm-damaged roofs. We work quickly to secure your home and prevent further damage. Available 7 days a week."
    },
    {
        icon: <CalendarCheck className="h-8 w-8 text-primary" />,
        title: "Seasonal Maintenance Packages",
        description: "Preventative care to extend the life of your roof and siding. Our annual packages include gutter cleaning, a full exterior inspection, and a heat-loss check."
    },
    {
        icon: <Snowflake className="h-8 w-8 text-primary" />,
        title: "Rooftop Snow Removal",
        description: "Heavy snow load can be dangerous for your roof's structure. Our team provides safe and effective snow and ice dam removal to protect your home."
    },
    {
        icon: <Sparkles className="h-8 w-8 text-primary" />,
        title: "Holiday Light Installation",
        description: "Let us handle the hassle of holiday decorating. We offer professional, safe, and beautiful Christmas light installation and takedown services."
    }
]

export function ServicesSection() {
    return (
        <section id="services" className="py-20 bg-secondary/20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold">Expert Roofing & Siding Services</h2>
                    <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg">
                        Welcome to Asphalt Bros Roofing, where we provide quality roofing and siding solutions for your home. Our experienced team is ready to assist you with all your exterior needs. Contact us today for a free estimate!
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map(service => (
                         <Card key={service.title} className="flex flex-col">
                            <CardHeader className="items-center text-center">
                                {service.icon}
                                <CardTitle className="mt-4">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground text-center">{service.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
