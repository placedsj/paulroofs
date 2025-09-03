"use client";

import Image from 'next/image';

type RoofVisualizerImageProps = {
    imageUrl: string;
    roofPath: string;
    roofColor: string;
};

export function RoofVisualizerImage({ imageUrl, roofPath, roofColor }: RoofVisualizerImageProps) {
    return (
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border">
            <Image
                src={imageUrl}
                alt="House for roof color visualization"
                fill
                priority
                className="object-cover"
                data-ai-hint="house exterior"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 800 600"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <pattern id="roofTexture" patternUnits="userSpaceOnUse" width="100" height="100">
                        <path d="M0 10 L100 10 M0 30 L100 30 M0 50 L100 50 M0 70 L100 70 M0 90 L100 90" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
                    </pattern>
                </defs>
                 <path
                    d={roofPath}
                    fill={roofColor}
                    stroke="rgba(0,0,0,0.3)"
                    strokeWidth="1.5"
                    style={{ transition: 'fill 0.3s ease-in-out' }}
                />
                 <path
                    d={roofPath}
                    fill="url(#roofTexture)"
                    style={{ mixBlendMode: 'overlay', opacity: 0.5 }}
                />
            </svg>
        </div>
    );
}
