
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { dynastyShingleColors, cambridgeShingleColors, type ColorOption } from '@/lib/colors';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WandSparkles, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RoofVisualizerImage } from './roof-visualizer-image';

export function AIVisualizer() {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(dynastyShingleColors[0]);
  const [activeTab, setActiveTab] = useState('dynasty');

  const houseImage = "https://ik.imagekit.io/ik5x4q7jl/Gemini_Generated_Image_qy1662qy1662qy16.png?updatedAt=1757040233005";
  const roofPath = "M-5,245 C150,150 650,150 805,245 L800,310 L400,230 L0,310 Z";

  const ColorPicker = ({ colors, onSelect }: { colors: ColorOption[], onSelect: (color: ColorOption) => void }) => {
    return (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
            {colors.map((color: ColorOption) => (
                <div key={color.name} onClick={() => onSelect(color)} className="cursor-pointer group text-center" title={color.name}>
                    <div 
                        className={cn(
                            "w-full h-16 rounded-md border-2 border-transparent group-hover:border-primary transition-all",
                            selectedColor?.name === color.name && "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
                        )}
                        style={{ backgroundColor: color.color }}
                    />
                    <p className="text-xs text-center mt-2 text-muted-foreground truncate">{color.name}</p>
                </div>
            ))}
        </div>
    );
  };

  return (
    <Card className="max-w-6xl mx-auto">
        <CardHeader className="text-center">
            <Palette className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="text-3xl md:text-4xl mt-2">Product Explorer</CardTitle>
            <CardDescription className="text-lg">
                Virtually explore our high-quality IKO shingle options on a sample home.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                    <RoofVisualizerImage 
                        imageUrl={houseImage}
                        roofPath={roofPath}
                        roofColor={selectedColor.color}
                        data-ai-hint="house exterior"
                    />
                     {selectedColor && (
                        <div className="mt-4 bg-background border rounded-md p-3 text-center">
                            <p className="text-lg font-bold">{selectedColor.name}</p>
                            <p className="text-sm text-muted-foreground">{activeTab === 'dynasty' ? 'IKO Dynasty' : 'IKO Cambridge'}</p>
                        </div>
                    )}
                </div>

                <div className="flex flex-col h-full">
                   <Tabs
                        defaultValue="dynasty"
                        className="w-full"
                        onValueChange={(value) => {
                            setActiveTab(value);
                            setSelectedColor(value === 'dynasty' ? dynastyShingleColors[0] : cambridgeShingleColors[0]);
                        }}
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="dynasty">IKO Dynasty</TabsTrigger>
                            <TabsTrigger value="cambridge">IKO Cambridge</TabsTrigger>
                        </TabsList>
                        <TabsContent value="dynasty" className="mt-6">
                           <h3 className="text-xl font-bold mb-4">Select a Dynasty Color</h3>
                           <ColorPicker colors={dynastyShingleColors} onSelect={setSelectedColor} />
                        </TabsContent>
                         <TabsContent value="cambridge" className="mt-6">
                           <h3 className="text-xl font-bold mb-4">Select a Cambridge Color</h3>
                           <ColorPicker colors={cambridgeShingleColors} onSelect={setSelectedColor} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}
