import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    quote: "Called Asphalt Bros Roofing to repair my mothers roof. They showed up bright and early and got the job done in a few hours, Great service!",
    name: "J. Armstrong",
    location: "Review via Website",
    avatar: "JA"
  },
  {
    quote: "Asphalt Bros Roofing Ltd are highly recommended. They came and done a free estimate and quote which is reasonable and started the job within 2 weeks. They are hard workers and very respectful of our property. They also did a great job and cleaned up thoroughly. We had no complaints at all and would definitely recommend them.",
    name: "P. Feran",
    location: "Review via Website",
    avatar: "PF"
  },
  {
    quote: "From the first phone call to the last shingle every aspect of the recent work done on our roof by Asphalt Bros was handled in a professional manner. The quote was free, the price was reasonable, and the work was done in a timely and organized way. I would recommend them to anyone!",
    name: "B. Golding",
    location: "Review via Website",
    avatar: "BG"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">WHAT OUR CLIENTS SAY</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col bg-secondary/30">
              <CardContent className="pt-6 flex-grow flex flex-col">
                <p className="text-muted-foreground italic flex-grow">"{testimonial.quote}"</p>
                <div className="mt-6 flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
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
