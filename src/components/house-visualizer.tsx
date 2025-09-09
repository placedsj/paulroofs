"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ColorOption } from '../lib/colors';
import { RoofVisualizerImage } from './roof-visualizer-image';

type HouseVisualizerProps = {
    selectedColor: ColorOption | null;
    houseStyle: string;
    setHouseStyle: (style: string) => void;
};

const houseStyles = [
    { value: 'ranch', label: 'Ranch', image: 'https://ik.imagekit.io/ik5x4q7jl/ranch-house.jpg', roofPath: 'M0,250 L400,100 L800,250 L800,310 L750,300 L50,220 L0,230 Z' },
    { value: 'colonial', label: 'Colonial', image: 'https://ik.imagekit.io/ik5x4q7jl/colonial-house.jpg', roofPath: 'M15,220 L400,100 L785,220 L785,280 L400,160 L15,280 Z' },
    { value: 'modern', label: 'Modern', image: 'https://ik.imagekit.io/ik5x4q7jl/modern-house.jpg', roofPath: 'M100,200 L500,150 L800,220 L800,280 L500,210 L100,260 Z' },
];


export function HouseVisualizer({ selectedColor, houseStyle, setHouseStyle }: HouseVisualizerProps) {
    const currentStyle = houseStyles.find(s => s.value === houseStyle) || houseStyles[0];

    return (
        <Card>
            <CardHeader>
                <CardTitle>ROOF VISUALIZER</CardTitle>
                <CardDescription>Select a house style and click on colors to preview.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <Label htmlFor="house-style">House Style:</Label>
                    <Select value={houseStyle} onValueChange={setHouseStyle}>
                        <SelectTrigger id="house-style" className="w-full">
                            <SelectValue placeholder="Select a house style" />
                        </SelectTrigger>
                        <SelectContent>
                            {houseStyles.map(style => (
                                <SelectItem key={style.value} value={style.value}>{style.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                
                <RoofVisualizerImage 
                    imageUrl={currentStyle.image}
                    roofPath={currentStyle.roofPath}
                    roofColor={selectedColor ? selectedColor.color : '#708090'}
                />

                {selectedColor && (
                    <div className="mt-4 bg-background border rounded-md p-2 text-center">
                        <p className="text-sm font-bold">{selectedColor.name}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

    