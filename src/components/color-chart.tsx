
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ColorOption } from '@/lib/colors';

type ColorChartProps = {
    colors: ColorOption[];
    title?: string;
    onColorSelect: (color: ColorOption) => void;
    selectedColor: ColorOption | null;
};

export function ColorChart({ colors, title, onColorSelect, selectedColor }: ColorChartProps) {
    return (
        <div className="space-y-4">
            {title && <h3 className="text-xl font-semibold text-center">{title}</h3>}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {colors.map((colorOption) => (
                    <div
                        key={colorOption.name}
                        className="cursor-pointer group"
                        onClick={() => onColorSelect(colorOption)}
                        aria-label={`Select color ${colorOption.name}`}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onColorSelect(colorOption)}
                    >
                        <div className={cn(
                            "rounded-lg overflow-hidden border-2 transition-all",
                            selectedColor?.name === colorOption.name 
                                ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background" 
                                : "border-border group-hover:border-primary"
                        )}>
                            <Image
                                src={colorOption.image}
                                alt={colorOption.name}
                                width={200}
                                height={200}
                                className="object-cover w-full h-auto aspect-square"
                            />
                        </div>
                        <p className="text-sm font-medium text-foreground text-center mt-2 truncate">{colorOption.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
