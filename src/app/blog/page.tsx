

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
  const [latestPost, ...otherPosts] = sortedPosts;

  const postImages = [
    "https://ik.imagekit.io/ik5x4q7jl/Gemini_Generated_Image_qy1662qy1662qy16.png?updatedAt=1757040233005",
    "https://ik.imagekit.io/ik5x4q7jl/Gemini_Generated_Image_70a98570a98570a9.png?updatedAt=1757040228550",
    "https://ik.imagekit.io/ik5x4q7jl/Gemini_Generated_Image_tzrbwntzrbwntzrb.png?updatedAt=1757040227936",
    "https://ik.imagekit.io/ik5x4q7jl/rs=w_1280,h_960.webp?updatedAt=1757040223897",
    "https://ik.imagekit.io/ik5x4q7jl/download.webp?updatedAt=1757040223799",
    "https://ik.imagekit.io/ik5x4q7jl/495541199_10161644959733867_8106039805902393432_n.jpg?updatedAt=1757040223678",
    "https://ik.imagekit.io/ik5x4q7jl/rs=w_719,h_751.webp?updatedAt=1757040223723",
    "https://ik.imagekit.io/ik5x4q7jl/download%20(1).webp?updatedAt=1757040223642",
    "https://ik.imagekit.io/ik5x4q7jl/541362907_122139082238867953_8397629622451905856_n.jpg?updatedAt=1757040223447",
    "https://ik.imagekit.io/ik5x4q7jl/541359478_122139082262867953_4249044785827027468_n.jpg?updatedAt=1757040223397",
    "https://ik.imagekit.io/ik5x4q7jl/qt=q_68.webp?updatedAt=1757040223513",
    "https://ik.imagekit.io/ik5x4q7jl/Gemini_Generated_Image_x0tknhx0tknhx0tk.png?updatedAt=1757039966609",
    "https://ik.imagekit.io/ik5x4q7jl/Gemini_Generated_Image_juhr08juhr08juhr.png?updatedAt=1757039965413",
    "https://ik.imagekit.io/ik5x4q7jl/Gemini_Generated_Image_13yq9113yq9113yq.png?updatedAt=1757039964062",
    "https://ik.imagekit.io/ik5x4q7jl/Gemini_Generated_Image_78d1g678d1g678d1.png?updatedAt=1757039964955"
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-secondary/20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-shadow-outline">THE ROOFING CHRONICLES</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Expert advice from the Asphalt Bros on everything roofing, siding, and home exteriors in Southern New Brunswick.
            </p>
          </div>
          
          {latestPost && (
            <Card className="mb-12 overflow-hidden md:grid md:grid-cols-2 md:items-center">
                <div className="relative h-64 md:h-full min-h-[300px]">
                    <Image
                      src={`https://ik.imagekit.io/ik5x4q7jl/rs=w_1280,h_960.webp?updatedAt=1757040223897`}
                      alt={latestPost.title}
                      fill
                      className="object-cover"
                      data-ai-hint="vinyl siding"
                      priority
                    />
                     <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-transparent" />
                </div>
                <div className="p-8">
                    <Badge variant="secondary" className="mb-2">Latest Post</Badge>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                        <Link href={`/blog/${latestPost.slug}`} className="hover:text-primary transition-colors">{latestPost.title}</Link>
                    </h2>
                    <p className="text-muted-foreground mb-6 line-clamp-3">{latestPost.introduction}</p>
                    <Button asChild>
                        <Link href={`/blog/${latestPost.slug}`}>
                            Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </Card>
          )}


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post, index) => (
              <Card key={post.slug} className="flex flex-col overflow-hidden group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={postImages[index % postImages.length] || `https://picsum.photos/600/400?random=${post.slug}`}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint={post.category === 'Siding' ? 'vinyl siding' : 'roofing texture'}
                    />
                  </div>
                </Link>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                  <CardTitle className="text-xl h-20">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="line-clamp-3">{post.introduction}</CardDescription>
                </CardContent>
                <div className="p-6 pt-0">
                   <Button asChild variant="link" className="p-0 h-auto text-base">
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
