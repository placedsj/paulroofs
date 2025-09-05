
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const galleryImages = [
  { src: "https://ik.imagekit.io/ik5x4q7jl/sdfada_gJM9TZDCe?updatedAt=1757040358273", alt: "High-quality asphalt shingle roof", hint: "asphalt shingle" },
  { src: "https://picsum.photos/seed/img2/600/400", alt: "Roof repair in progress", hint: "roof repair" },
  { src: "https://picsum.photos/seed/img3/600/400", alt: "New roof installation", hint: "new roof" },
  { src: "https://picsum.photos/seed/img4/600/400", alt: "Commercial roofing project", hint: "commercial roof" },
  { src: "https://picsum.photos/seed/img5/600/400", alt: "Cleaned roof after moss removal", hint: "roof cleaning" },
  { src: "https://picsum.photos/seed/img6/600/400", alt: "Team working on a roof", hint: "roofing team" },
  { src: "https://picsum.photos/seed/img7/600/400", alt: "Detailed gutter work", hint: "gutter installation" },
  { src: "https://picsum.photos/seed/img8/600/400", alt: "Storm damaged roof before repair", hint: "storm damage" },
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
