import Link from 'next/link';

export function Header() {
  return (
    <nav className="sticky top-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="h-10 flex items-center">
            <Link href="/" className="text-2xl font-bold text-zinc-50 hover:text-orange-500 transition-colors">
              <img
                src="/images/logo-round.png"
                alt="Paul's Roofing Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-zinc-400 hover:text-orange-500 transition-colors">
              HOME
            </Link>
            <Link href="/#services" className="text-zinc-400 hover:text-orange-500 transition-colors">
              SERVICES
            </Link>
            <Link href="/visualizer" className="text-zinc-400 hover:text-orange-500 transition-colors">
              VISUALIZER
            </Link>
            {/* Link to the combined Handbook/Resource page */}
            <Link href="/handbook" className="text-zinc-400 hover:text-orange-500 transition-colors">
              RESOURCES 📖
            </Link>
            
            <Link href="/#contact" className="text-zinc-400 hover:text-orange-500 transition-colors">
              CONTACT
            </Link>
            
            {/* STAFF LINK */}
            <Link 
              href="/boss-quarters" 
              className="text-sm font-bold text-orange-500 hover:text-orange-400 px-3 py-2 border-2 border-orange-500 rounded-lg transition-colors"
            >
              BOSS QUARTERS 🛠️
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
