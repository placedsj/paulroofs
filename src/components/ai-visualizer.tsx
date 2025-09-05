
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { dynastyShingleColors, cambridgeShingleColors, type ColorOption } from '@/lib/colors';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AIVisualizer() {
  const [selectedShingle, setSelectedShingle] = useState<ColorOption>(dynastyShingleColors[0]);
  const [activeTab, setActiveTab] = useState('dynasty');

  const ColorPicker = ({ colors, onSelect }: { colors: ColorOption[], onSelect: (color: ColorOption) => void }) => {
    return (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
            {colors.map((color: ColorOption) => (
                <div key={color.name} onClick={() => onSelect(color)} className="cursor-pointer group text-center" title={color.name}>
                    <div 
                        className={cn(
                            "w-full h-16 rounded-md border-2 border-transparent group-hover:border-primary transition-all",
                            selectedShingle?.name === color.name && "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
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
                Virtually explore our high-quality IKO shingle options.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border bg-secondary/30">
                         {selectedShingle && (
                            <Image
                                key={selectedShingle.name}
                                src={selectedShingle.image}
                                alt={`IKO Shingle sample in ${selectedShingle.name}`}
                                fill
                                priority
                                className="object-cover transition-opacity duration-300"
                                data-ai-hint="shingle sample"
                            />
                         )}
                    </div>
                     {selectedShingle && (
                        <div className="mt-4 bg-background border rounded-md p-3 text-center">
                            <p className="text-lg font-bold">{selectedShingle.name}</p>
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
                            setSelectedShingle(value === 'dynasty' ? dynastyShingleColors[0] : cambridgeShingleColors[0]);
                        }}
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="dynasty">IKO Dynasty</TabsTrigger>
                            <TabsTrigger value="cambridge">IKO Cambridge</TabsTrigger>
                        </TabsList>
                        <TabsContent value="dynasty" className="mt-6">
                           <h3 className="text-xl font-bold mb-4">Select a Dynasty Color</h3>
                           <ColorPicker colors={dynastyShingleColors} onSelect={setSelectedShingle} />
                        </TabsContent>
                         <TabsContent value="cambridge" className="mt-6">
                           <h3 className="text-xl font-bold mb-4">Select a Cambridge Color</h3>
                           <ColorPicker colors={cambridgeShingleColors} onSelect={setSelectedShingle} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}
