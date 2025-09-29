
import Link from 'next/link';

export default function HandbookPage() {
  return (
    <div className="bg-zinc-900 min-h-screen">
      {/* Header */}
      <div className="bg-zinc-800 border-b border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-zinc-50">
                Paul's Roofing
            </Link>
            <Link href="/" className="text-zinc-400 hover:text-orange-500 transition-colors">
                Back to Home
            </Link>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-extrabold text-zinc-50 mb-4 text-center">Homeowner's Handbook</h1>
        <p className="text-xl text-zinc-400 mb-12 text-center">Your guide to roofing care and maintenance.</p>

        <div className="prose prose-invert prose-lg max-w-none mx-auto text-zinc-300">
            <p>
                Welcome to the Paul's Roofing Homeowner's Handbook! This guide is designed to help you understand and care for your new roof. Proper maintenance will ensure your roof lasts a lifetime, protecting your home and family for decades to come.
            </p>
            <h2 className="text-3xl font-bold text-zinc-50 mt-12 mb-4">Understanding Your Roof</h2>
            <p>
                Your new roof is a complex system of components working together to keep your home safe and dry. Here are the key parts of your roofing system:
            </p>
            <ul>
                <li><strong>Roofing Material:</strong> This is the outermost layer of your roof, whether it's metal panels, asphalt shingles, or another material. It's the first line of defense against the elements.</li>
                <li><strong>Underlayment:</strong> A waterproof barrier installed directly on the roof deck, beneath the roofing material. It provides a secondary layer of protection against water intrusion.</li>
                <li><strong>Flashing:</strong> Pieces of metal installed at joints and valleys to prevent water from seeping into the structure.</li>
                <li><strong>Ventilation:</strong> A system of vents that allows air to circulate, preventing heat and moisture buildup in your attic.</li>
            </ul>

            <h2 className="text-3xl font-bold text-zinc-50 mt-12 mb-4">Maintenance Tips</h2>
            <p>
                Regular maintenance is key to maximizing the lifespan of your roof. Here are some tips to keep your roof in top condition:
            </p>
            <ul>
                <li><strong>Inspect Your Roof Regularly:</strong> At least twice a year (spring and fall), visually inspect your roof for any signs of damage, such as loose or missing shingles, damaged flashing, or blocked vents.</li>
                <li><strong>Keep Your Gutters Clean:</strong> Clogged gutters can cause water to back up and damage your roof and fascia. Clean your gutters at least twice a year.</li>
                <li><strong>Trim Overhanging Branches:</strong> Tree branches can scrape against your roof and cause damage. Keep them trimmed back to prevent contact.</li>
                <li><strong>Avoid Walking on Your Roof:</strong> Foot traffic can damage roofing materials. If you need to access your roof, take care to walk on the strongest points and wear soft-soled shoes.</li>
            </ul>

            <h2 className="text-3xl font-bold text-zinc-50 mt-12 mb-4">Warranty Information</h2>
            <p>
                Your new roof is covered by a comprehensive warranty. Please refer to your warranty documents for specific details about coverage and claim procedures. If you have any questions about your warranty, please don't hesitate to contact us.
            </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-700 py-12 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-zinc-500">© 2025 Paul's Roofing. All rights reserved.</p>
            </div>
      </footer>
    </div>
  );
}
