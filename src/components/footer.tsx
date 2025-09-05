import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary/20 border-t border-border py-12">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold font-headline text-primary mb-4">
          ASPHALT BROS ROOFING LTD
        </h3>
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
            <Link href="#contact" className="text-sm text-muted-foreground hover:text-primary">CONTACT</Link>
        </div>
        <p className="text-sm text-muted-foreground/80">
          © {new Date().getFullYear()} Asphalt Bros Roofing LTD. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
