
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, Palette, FileText, Megaphone, PenSquare, FileSignature, LayoutDashboard, Home, Users } from 'lucide-react';
import { QuoteGenerator } from './quote-generator';
import { ColorCoordinator } from './color-coordinator';
import { InvoiceGenerator } from './invoice-generator';
import { ProjectPromoter } from './project-promoter';
import { BlogPostGenerator } from './blog-post-generator';
import { HomeStoryGenerator } from './home-story-generator';
import { ClientManager } from './client-manager';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import type { Client } from './client-manager';

type View = 'clients' | 'quotes' | 'coordinator' | 'invoices' | 'promoter' | 'blog' | 'storyteller';

export function BossQuartersDashboard() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [activeView, setActiveView] = useState<View>('clients');
  const [contextualClient, setContextualClient] = useState<Client | null>(null);
  
  useEffect(() => {
    setIsMounted(true);
    try {
      if (sessionStorage.getItem('isAuthenticated') !== 'true') {
        router.replace('/login');
      }
    } catch (error) {
        console.error("Session storage is not available.");
        router.replace('/login');
    }
  }, [router]);

  const handleLogout = () => {
    try {
        sessionStorage.removeItem('isAuthenticated');
    } catch (error) {
        console.error("Session storage is not available.");
    }
    router.push('/');
  };

  const handleClientAction = (client: Client, view: View) => {
    setContextualClient(client);
    setActiveView(view);
  };

  if (!isMounted) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
             <h1 className="text-2xl">Loading Boss Quarters...</h1>
        </div>
    );
  }

  const renderContent = () => {
    switch (activeView) {
        case 'clients': return <ClientManager onClientAction={handleClientAction} />;
        case 'quotes': return <QuoteGenerator client={contextualClient} />;
        case 'coordinator': return <ColorCoordinator />;
        case 'invoices': return <InvoiceGenerator client={contextualClient} />;
        case 'promoter': return <ProjectPromoter client={contextualClient} />;
        case 'blog': return <BlogPostGenerator />;
        case 'storyteller': return <HomeStoryGenerator client={contextualClient} />;
        default: return <ClientManager onClientAction={handleClientAction} />;
    }
  }

  return (
    <SidebarProvider>
        <div className="min-h-screen bg-secondary/30 flex">
            <Sidebar>
                <div className="flex flex-col h-full">
                    <div className="p-4 border-b">
                         <h2 className="text-2xl font-bold font-headline text-primary">BOSS QUARTERS</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <SidebarMenu>
                             <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => setActiveView('clients')} isActive={activeView === 'clients'}><Users/> Client Manager</SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <p className="p-4 text-xs text-muted-foreground font-semibold uppercase">AI Tools</p>
                         <SidebarMenu>
                             <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => setActiveView('storyteller')} isActive={activeView === 'storyteller'}><Home/> Homestead Storyteller</SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => setActiveView('quotes')} isActive={activeView === 'quotes'}><FileText/> Quote Generator</SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => setActiveView('coordinator')} isActive={activeView === 'coordinator'}><Palette/> Color Coordinator</SidebarMenuButton>
                            </SidebarMenuItem>
                             <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => setActiveView('invoices')} isActive={activeView === 'invoices'}><FileSignature/> Invoice Generator</SidebarMenuButton>
                            </SidebarMenuItem>
                             <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => setActiveView('promoter')} isActive={active_view === 'promoter'}><Megaphone/> Project Promoter</SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => setActiveView('blog')} isActive={activeView === 'blog'}><PenSquare/> Blog Writer</SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </div>
                    <div className="p-4 border-t">
                        <Button onClick={handleLogout} variant="destructive" className="w-full font-bold">
                            <LogOut className="mr-2 h-4 w-4" /> LOGOUT
                        </Button>
                    </div>
                </div>
            </Sidebar>

            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <header className="flex items-center justify-between mb-6 text-foreground sm:justify-end">
                    <SidebarTrigger className="sm:hidden" />
                    <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wider text-shadow-outline hidden sm:block">
                        Boss Quarters
                    </h1>
                </header>
                {renderContent()}
                 <footer className="mt-12 text-center text-muted-foreground text-sm">
                    <p>PAUL'S ROOFING BOSS QUARTERS | SECURE ADMINISTRATIVE ACCESS</p>
                </footer>
            </main>
        </div>
    </SidebarProvider>
  );
}
