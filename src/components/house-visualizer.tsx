"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ColorOption } from './color-chart';

type HouseVisualizerProps = {
    selectedColor: ColorOption | null;
    houseStyle: string;
    setHouseStyle: (style: string) => void;
};

const houseStyles = {
    colonial: { bodyClass: 'w-48 h-32 bg-yellow-100', roofClass: 'w-48 h-20 -top-14', bodyColor: '#FDF2D5' },
    ranch: { bodyClass: 'w-64 h-24 bg-blue-100', roofClass: 'w-64 h-12 -top-10', bodyColor: '#E0F2FE' },
    cape: { bodyClass: 'w-40 h-28 bg-gray-200', roofClass: 'w-40 h-24 -top-20', bodyColor: '#E5E7EB' },
    modern: { bodyClass: 'w-56 h-32 bg-stone-200', roofClass: 'w-56 h-8 -top-8 flat-roof', bodyColor: '#E7E5E4' },
};

export function HouseVisualizer({ selectedColor, houseStyle, setHouseStyle }: HouseVisualizerProps) {
    const currentStyle = houseStyles[houseStyle as keyof typeof houseStyles] || houseStyles.colonial;

    return (
        <Card>
            <CardHeader>
                <CardTitle>ROOF VISUALIZER</CardTitle>
                <CardDescription>Click on colors to preview them on your roof style.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <Label htmlFor="house-style">House Style:</Label>
                    <Select value={houseStyle} onValueChange={setHouseStyle}>
                        <SelectTrigger id="house-style" className="w-full">
                            <SelectValue placeholder="Select a house style" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="colonial">Colonial</SelectItem>
                            <SelectItem value="ranch">Ranch</SelectItem>
                            <SelectItem value="cape">Cape Cod</SelectItem>
                            <SelectItem value="modern">Modern</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="bg-gradient-to-b from-blue-400 to-blue-600 p-4 rounded-lg relative overflow-hidden min-h-[256px] flex items-end justify-center">
                    <div className="relative z-10">
                        <div 
                            className={`relative border-2 border-black/20 ${currentStyle.bodyClass}`}
                            style={{backgroundColor: currentStyle.bodyColor}}
                        >
                             {/* Roof */}
                            <div
                                className={`absolute left-0 transition-colors duration-300 ${currentStyle.roofClass}`}
                                style={{
                                    backgroundColor: selectedColor ? selectedColor.color : '#708090',
                                    clipPath: currentStyle.roofClass.includes('flat-roof') ? 'none' : 'polygon(50% 0%, 0% 100%, 100% 100%)',
                                    borderBottom: '2px solid #333'
                                }}
                            ></div>
                             {/* Door */}
                             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-12 bg-amber-800 border border-amber-900"></div>
                        </div>
                    </div>
                    {selectedColor && (
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded">
                            <p className="text-sm font-bold">{selectedColor.name}</p>
                            <p className="text-xs">{selectedColor.code}</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
