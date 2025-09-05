
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const galleryImages = [
  { src: "https://ik.imagekit.io/ik5x4q7jl/sdfada_gJM9TZDCe?updatedAt=1757040358273", alt: "High-quality asphalt shingle roof", hint: "asphalt shingle" },
  { src: "https://ik.imagekit.io/ik5x4q7jl/495541199_10161644959733867_8106039805902393432_n.jpg?updatedAt=1757040223678", alt: "Roof repair in progress", hint: "roof repair" },
  { src: "https://ik.imagekit.io/ik5x4q7jl/541362907_122139082238867953_8397629622451905856_n.jpg?updatedAt=1757040223447", alt: "New roof installation", hint: "new roof" },
  { src: "https://ik.imagekit.io/ik5x4q7jl/download.webp?updatedAt=1757040223799", alt: "Commercial roofing project", hint: "commercial roof" },
  { src: "https://ik.imagekit.io/ik5x4q7jl/541359478_122139082262867953_4249044785827027468_n.jpg?updatedAt=1757040223397", alt: "Cleaned roof after moss removal", hint: "roof cleaning" },
  { src: "https://ik.imagekit.io/ik5x4q7jl/rs=w_1280,h_960.webp?updatedAt=1757040223897", alt: "Team working on a roof", hint: "roofing team" },
  { src: "https://ik.imagekit.io/ik5x4q7jl/rs=w_719,h_751.webp?updatedAt=1757040223723", alt: "Detailed gutter work", hint: "gutter installation" },
  { src: "https://ik.imagekit.io/ik5x4q7jl/download%20(1).webp?updatedAt=1757040223642", alt: "Storm damaged roof before repair", hint: "storm damage" },
];

export function GallerySection() {
  return (
    <section id="gallery" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">EXPLORE OUR WORK</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            A showcase of our quality craftsmanship and the beautiful, durable roofs we've installed.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="group overflow-hidden rounded-lg shadow-lg">
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={400}
                className="object-cover w-full h-full aspect-[4/3] transform transition-transform duration-500 group-hover:scale-110"
                data-ai-hint={image.hint}
              />
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
            <p className="text-lg text-muted-foreground mb-6">Impressed by what you see?</p>
            <Button asChild size="lg" className="font-bold text-lg">
                <Link href="#contact">GET A QUOTE FOR YOUR PROJECT</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
