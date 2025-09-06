
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ColorChart } from './color-chart';
import type { ColorOption } from '@/lib/colors';

type ColorChartSelectorProps = {
    colors: ColorOption[];
};

export function ColorChartSelector({ colors }: ColorChartSelectorProps) {
    const [selectedColor, setSelectedColor] = useState<ColorOption>(colors[0]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-center bg-secondary/30 p-6 rounded-lg">
                <div className="md:w-1/3">
                    <h3 className="text-2xl font-bold mb-2">{selectedColor.name}</h3>
                    <p className="text-muted-foreground">Preview of the selected color blend. See how the high-definition tones can complement your home.</p>
                </div>
                 <div className="md:w-2/3">
                     <div className="rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={selectedColor.image}
                            alt={`Preview of ${selectedColor.name} shingle`}
                            width={800}
                            height={400}
                            className="object-cover w-full"
                        />
                     </div>
                </div>
            </div>
            
            <ColorChart 
                colors={colors}
                onColorSelect={setSelectedColor}
                selectedColor={selectedColor}
            />
        </div>
    );
}
