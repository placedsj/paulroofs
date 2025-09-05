
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Repeat, Droplets, Wind, Home, Building, Snowflake, Sun, Search } from 'lucide-react';


const services = [
    {
        icon: <Wrench className="h-8 w-8 text-primary" />,
        title: "Roof Repair",
        description: "Our team of experts will repair any leaks, damage, or wear and tear on your roof. We use high-quality materials and provide expert service and advice."
    },
    {
        icon: <Repeat className="h-8 w-8 text-primary" />,
        title: "Roof Replacement",
        description: "If your roof is beyond repair, we offer affordable and efficient roof replacement services. Our team will work with you to find the best solution for your home."
    },
    {
        icon: <Droplets className="h-8 w-8 text-primary" />,
        title: "Gutter Installation & Repair",
        description: "Properly functioning gutters are crucial to protecting your home from water damage. We offer installation and maintenance services to ensure your gutters are working properly."
    },
    {
        icon: <Wind className="h-8 w-8 text-primary" />,
        title: "Storm Damage Repair",
        description: "If your roof has been damaged by a storm, our team will quickly assess the damage and provide a solution. We work with you to provide a stress free process. We are available 7 days a week for emergency repairs."
    },
    {
        icon: <Home className="h-8 w-8 text-primary" />,
        title: "Roof Maintenance",
        description: "Preventative maintenance is key to extending the life of your roof. We offer regular maintenance services to keep your roof in top condition."
    },
    {
        icon: <Building className="h-8 w-8 text-primary" />,
        title: "Commercial Roofing",
        description: "We also offer commercial roofing services for businesses of any size. Our team has experience in a variety of roofing types and can provide the best solution for your business."
    },
    {
        icon: <Snowflake className="h-8 w-8 text-primary" />,
        title: "Snow Removal",
        description: "Snow and ice building up on your roof? Our experts are here to provide snow removal off of your roof to relieve your roof of the very heavy snow load."
    },
    {
        icon: <Search className="h-8 w-8 text-primary" />,
        title: "Roof Inspections",
        description: "We offer a roof inspection service. We will do an assessment and provide you with a detailed report of the condition of your roof, expected remaining lifespan and any repairs that need done."
    },
    {
        icon: <Sun className="h-8 w-8 text-primary" />,
        title: "Roof Cleaning Services",
        description: "Is your roof dirty? Covered in dirt and moss? We offer roof cleaning services. Reach out today for a free quote! Our experts are happy to help."
    }
]

export function ServicesSection() {
    return (
        <section id="services" className="py-20 bg-secondary/20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold">Expert Roofing Services</h2>
                    <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg">
                        Welcome to Asphalt Bros Roofing, where we provide quality roofing solutions for your home or business. Our experienced team is ready to assist you with all your roofing needs. Contact us today for a free estimate!
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
