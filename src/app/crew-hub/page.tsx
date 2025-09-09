
import { CrewHub } from "@/components/crew-hub";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function CrewHubPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 bg-secondary/20">
        <div className="container mx-auto px-4 py-12">
            <CrewHub />
        </div>
      </main>
      <Footer />
    </div>
  );
}
