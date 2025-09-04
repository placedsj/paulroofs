
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ColorChart, type ColorOption } from '@/components/color-chart';
import { HouseVisualizer } from '@/components/house-visualizer';
import { Check, Wrench, Building, Droplets } from 'lucide-react';
import { metalColors, shingleColors } from '@/lib/colors';

const serviceBenefits = {
    metal: ["40+ Year Warranty", "Energy Efficient", "Storm Resistant", "Fire Resistant", "Low Maintenance", "Eco-Friendly"],
    shingles: ["25-30 Year Warranty", "Wind Resistant", "Impact Resistant", "Algae Resistant", "Cost Effective", "Quick Installation"]
};

export function ServicesSection() {
    const [selectedService, setSelectedService] = useState('metal');
    const [selectedColor, setSelectedColor] = useState<ColorOption | null>(metalColors[0]);
    const [houseStyle, setHouseStyle] = useState('ranch');
    
    const handleTabChange = (value: string) => {
        setSelectedService(value);
        if (value === 'metal') {
            setSelectedColor(metalColors[0]);
        } else if (value === 'shingles') {
            setSelectedColor(shingleColors[0]);
        } else {
            setSelectedColor(null);
        }
    };

    const currentColors = selectedService === 'metal' ? metalColors : shingleColors;

    return (
        <section id="services" className="py-20 bg-secondary/20">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">OUR SERVICES</h2>
                
                <Tabs defaultValue="metal" onValueChange={handleTabChange} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mx-auto max-w-lg h-auto">
                        <TabsTrigger value="metal">METAL ROOFING</TabsTrigger>
                        <TabsTrigger value="shingles">ASPHALT SHINGLES</TabsTrigger>
                        <TabsTrigger value="other">OTHER SERVICES</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="metal" className="mt-8 space-y-8">
                        <ServiceInfoCard 
                            title="PREMIUM METAL ROOFING"
                            description="Lifetime protection with our premium metal roofing systems. Choose from our extensive color palette and see how it looks on your home."
                            benefits={serviceBenefits.metal}
                        />
                        <div className="grid lg:grid-cols-2 gap-8">
                            <ColorChart colors={metalColors} title="DAIRYTOWN EXTERIORS - METAL COLORS" onColorSelect={setSelectedColor} selectedColor={selectedColor} />
                            <HouseVisualizer selectedColor={selectedColor} houseStyle={houseStyle} setHouseStyle={setHouseStyle} />
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="shingles" className="mt-8 space-y-8">
                        <ServiceInfoCard 
                            title="PREMIUM ASPHALT SHINGLES"
                            description="Traditional roofing with modern performance. Our architectural shingles provide excellent protection and curb appeal."
                            benefits={serviceBenefits.shingles}
                        />
                        <div className="grid lg:grid-cols-2 gap-8">
                            <ColorChart colors={shingleColors} title="IKO CAMBRIDGE - SHINGLE COLORS" onColorSelect={setSelectedColor} selectedColor={selectedColor} />
                            <HouseVisualizer selectedColor={selectedColor} houseStyle={houseStyle} setHouseStyle={setHouseStyle} />
                        </div>
                    </TabsContent>

                    <TabsContent value="other" className="mt-8">
                        <div className="grid md:grid-cols-3 gap-8">
                             <OtherServiceCard 
                                icon={<Wrench className="h-8 w-8 text-primary" />}
                                title="ROOF REPAIRS" 
                                description="Emergency repairs and maintenance for all roofing types. Available 24/7 for urgent situations."
                                items={["Leak Detection & Repair", "Storm Damage Assessment", "Gutter Repair & Cleaning", "Emergency Tarping"]}
                            />
                            <OtherServiceCard 
                                icon={<Building className="h-8 w-8 text-primary" />}
                                title="SIDING & EXTERIORS" 
                                description="Complete exterior renovations with Hardie Board and other premium materials."
                                items={["Hardie Board Siding", "Vinyl Siding", "Wood Siding", "Trim & Soffit Work"]}
                            />
                            <OtherServiceCard 
                                icon={<Droplets className="h-8 w-8 text-primary" />}
                                title="GUTTERS & EAVESTROUGH" 
                                description="Expert installation of seamless gutter systems to protect your foundation and landscaping."
                                items={["Seamless Gutter Systems", "Gutter Guard Installation", "Downspout Repair & Install", "Soffit & Fascia Vents"]}
                            />
                        </div>
                    </TabsContent>
                </Tabs>
                
                <div className="mt-16 text-center">
                    <div className="bg-primary/90 p-8 rounded-lg">
                        <h3 className="text-3xl font-bold text-primary-foreground mb-4">READY TO GET STARTED?</h3>
                        <p className="text-primary-foreground/80 text-lg mb-6">
                            Get a free estimate for your roofing project. We'll help you choose the perfect materials and colors.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" variant="secondary" className="font-bold text-lg bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                                <a href="tel:+15067177285">CALL (506) 717-PAUL</a>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="font-bold text-lg text-primary-foreground border-2 border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                                <Link href="#contact">GET FREE QUOTE</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ServiceInfoCard({ title, description, benefits }: { title: string, description: string, benefits: string[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-lg mb-6">{description}</p>
                <div className="grid md:grid-cols-3 gap-4 text-foreground">
                    {benefits.map(benefit => (
                         <div key={benefit} className="flex items-center">
                            <Check className="h-5 w-5 text-primary mr-2" />
                            <span>{benefit}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}


function OtherServiceCard({ icon, title, description, items }: { icon: React.ReactNode, title: string, description: string, items: string[] }) {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center text-center">
                {icon}
                <CardTitle className="mt-4">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <ul className="space-y-3">
                    {items.map(item => (
                        <li key={item} className="flex items-start">
                            <Check className="h-4 w-4 text-primary/80 mr-2 mt-1 shrink-0" />
                            <span className="text-muted-foreground text-sm">{item}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
