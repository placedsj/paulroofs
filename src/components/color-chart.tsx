"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type ColorOption = {
    name: string;
    color: string;
    code: string;
};

type ColorChartProps = {
    colors: ColorOption[];
    title: string;
    onColorSelect: (color: ColorOption) => void;
    selectedColor: ColorOption | null;
};

export function ColorChart({ colors, title, onColorSelect, selectedColor }: ColorChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {colors.map((colorOption) => (
                        <div
                            key={colorOption.code}
                            className="cursor-pointer group"
                            onClick={() => onColorSelect(colorOption)}
                            aria-label={`Select color ${colorOption.name}`}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onColorSelect(colorOption)}
                        >
                            <div
                                className={cn(
                                    "w-full h-16 rounded-lg border-2 border-border group-hover:border-primary transition-all mb-2",
                                    selectedColor?.code === colorOption.code ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                                )}
                                style={{ backgroundColor: colorOption.color }}
                            ></div>
                            <p className="text-xs font-medium text-foreground text-center truncate">{colorOption.name}</p>
                            <p className="text-xs text-muted-foreground text-center">{colorOption.code}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
