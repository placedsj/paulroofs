
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-secondary/20 border-t border-border py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-4 mb-4">
             <Image 
              src="https://ik.imagekit.io/ik5x4q7jl/495541199_10161644959733867_8106039805902393432_n.jpg?updatedAt=1757040223678"
              alt="Asphalt Bros Roofing Logo"
              width={64}
              height={48}
              className="rounded-lg"
            />
        </div>
        <p className="text-muted-foreground mb-4 max-w-md mx-auto">
          Reliable Roofing Solutions for Your Home
        </p>
        <div className="flex justify-center space-x-6 mb-6 flex-wrap">
            <Link href="#home" className="text-sm text-muted-foreground hover:text-primary">HOME</Link>
            <Link href="#services" className="text-sm text-muted-foreground hover:text-primary">SERVICES</Link>
            <Link href="#about" className="text-sm text-muted-foreground hover:text-primary">ABOUT</Link>
            <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-primary">TESTIMONIALS</Link>
            <Link href="#gallery" className="text-sm text-muted-foreground hover:text-primary">OUR WORK</Link>
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">BLOG</Link>
            <Link href="/visualizer" className="text-sm text-muted-foreground hover:text-primary">AI TOOLS</Link>
            <Link href="#contact" className="text-sm text-muted-foreground hover:text-primary">CONTACT</Link>
        </div>
        <p className="text-sm text-muted-foreground/80">
          © {new Date().getFullYear()} Asphalt Bros Roofing LTD. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
