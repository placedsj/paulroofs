import Link from 'next/link';
import Image from 'next/image';
import { posts } from '@/lib/posts';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const sortedPosts = [...posts].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 bg-secondary/20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-shadow-outline">THE ROOFING CHRONICLES</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Paul's pearls of wisdom, dad jokes, and expert advice on everything roofing in Southern New Brunswick.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col overflow-hidden">
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="relative h-56 w-full">
                    <Image
                      src={`https://picsum.photos/600/400?random=${post.slug}`}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint="roofing texture"
                    />
                  </div>
                </Link>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                  <CardTitle className="text-2xl h-24">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{post.introduction}</CardDescription>
                </CardContent>
                <div className="p-6 pt-0">
                   <Button asChild variant="link" className="p-0 h-auto">
                        <Link href={`/blog/${post.slug}`}>
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
