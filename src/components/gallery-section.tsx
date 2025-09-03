import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const galleryImages = [
  { src: "https://picsum.photos/600/400?random=1", alt: "Modern home with a charcoal metal roof.", hint: "metal roof" },
  { src: "https://picsum.photos/600/400?random=2", alt: "Close-up of a new standing seam metal roof.", hint: "metal roof" },
  { src: "https://picsum.photos/600/400?random=3", alt: "Ranch style house with a new forest green metal roof.", hint: "green metal roof" },
  { src: "https://picsum.photos/600/400?random=4", alt: "Two-story house with a brand new red metal roof.", hint: "red metal roof" },
  { src: "https://picsum.photos/600/400?random=5", alt: "Detailed view of metal roof flashing and trim work.", hint: "metal roof" },
  { src: "https://picsum.photos/600/400?random=6", alt: "Completed metal roofing project on a large luxury house.", hint: "metal roof house" },
];

export function GallerySection() {
  return (
    <section id="gallery" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">OUR WORK</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A showcase of our quality craftsmanship and the beautiful, durable roofs we've installed across Southern New Brunswick.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <div key={index} className="group overflow-hidden rounded-lg shadow-lg">
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={400}
                className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
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
