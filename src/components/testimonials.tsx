
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image";

const testimonials = [
  {
    quote: "Called Asphalt Bros Roofing to repair my mothers roof. They showed up bright and early and got the job done in a few hours, Great service!",
    name: "J. Armstrong",
    location: "Review via Website",
    avatar: "JA",
    image: "https://ik.imagekit.io/ik5x4q7jl/sdfada_gJM9TZDCe?updatedAt=1757040358273"
  },
  {
    quote: "Asphalt Bros Roofing Ltd are highly recommended. They came and done a free estimate and quote which is reasonable and started the job within 2 weeks. They are hard workers and very respectful of our property. They also did a great job and cleaned up thoroughly. We had no complaints at all and would definitely recommend them.",
    name: "P. Feran",
    location: "Review via Website",
    avatar: "PF",
    image: "https://ik.imagekit.io/ik5x4q7jl/Gemini_Generated_Image_13yq9113yq9113yq.png?updatedAt=1757039964062"
  },
  {
    quote: "From the first phone call to the last shingle every aspect of the recent work done on our roof by Asphalt Bros was handled in a professional manner. The quote was free, the price was reasonable, and the work was done in a timely and organized way. I would recommend them to anyone!",
    name: "B. Golding",
    location: "Review via Website",
    avatar: "BG",
    image: "https://ik.imagekit.io/ik5x4q7jl/541362907_122139082238867953_8397629622451905856_n.jpg?updatedAt=1757040223447"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">WHAT OUR CLIENTS SAY</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col bg-secondary/30 overflow-hidden relative text-white min-h-[350px]">
                <Image
                    src={testimonial.image}
                    alt={`Completed project for ${testimonial.name}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />
                <CardContent className="pt-6 flex-grow flex flex-col justify-end relative z-10">
                    <p className="text-primary-foreground italic flex-grow text-lg font-medium">"{testimonial.quote}"</p>
                    <div className="mt-6 flex items-center">
                    <Avatar className="h-12 w-12 mr-4 border-2 border-primary">
                        <AvatarFallback className="bg-primary text-primary-foreground font-bold">{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold text-primary-foreground">{testimonial.name}</p>
                        <p className="text-sm text-primary-foreground/80">{testimonial.location}</p>
                    </div>
                    </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
