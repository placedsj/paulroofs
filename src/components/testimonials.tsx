import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    quote: "The Asphalt Bros crew did an amazing job on our new roof. It looks fantastic and our neighbors have all complimented it. Highly recommend!",
    name: "John & Jane Smith",
    location: "Moncton, NB",
    avatar: "JS"
  },
  {
    quote: "Professional, punctual, and the quality of work is second to none. The cleanup was immaculate. We couldn't be happier with our decision to go with Asphalt Bros Roofing.",
    name: "David Lee",
    location: "Riverview, NB",
    avatar: "DL"
  },
  {
    quote: "After the last big storm, we had some serious damage. The Asphalt Bros team was out here for an emergency repair in no time. They were a lifesaver!",
    name: "Mary Johnson",
    location: "Dieppe, NB",
    avatar: "MJ"
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
