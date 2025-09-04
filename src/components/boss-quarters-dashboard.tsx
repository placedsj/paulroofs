
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { LogOut, Palette, Edit, FileText, Megaphone, PenSquare, FileSignature, LayoutDashboard, NotebookText, Wand2, Home, Sparkles, Loader2, Users } from 'lucide-react';
import { QuoteGenerator } from './quote-generator';
import { ColorCoordinator } from './color-coordinator';
import { InvoiceGenerator } from './invoice-generator';
import { ProjectPromoter } from './project-promoter';
import { BlogPostGenerator } from './blog-post-generator';
import { HomeStoryGenerator } from './home-story-generator';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { refineLogEntry } from '@/ai/flows/log-refiner-flow';
import { useToast } from '@/hooks/use-toast';

type DailyLogEntry = {
    id: string;
    text: string;
    timestamp: Date;
};

type View = 'overview' | 'tracking' | 'quotes' | 'coordinator' | 'invoices' | 'promoter' | 'blog' | 'storyteller';

export function BossQuartersDashboard() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [activeView, setActiveView] = useState<View>('overview');
  const [projectName, setProjectName] = useState("SAMPLE ROOFING PROJECT");
  const [clientContact, setClientContact] = useState("John Smith - (506) 555-0123");
  const [dailyProgressLog, setDailyProgressLog] = useState<DailyLogEntry[]>([]);
  const [newProgressEntry, setNewProgressEntry] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const { toast } = useToast();

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

  const addDailyProgressEntry = useCallback(() => {
    if (newProgressEntry.trim() === '') return;
    const newEntry = {
        id: Date.now().toString(),
        text: newProgressEntry.trim(),
        timestamp: new Date()
    };
    setDailyProgressLog(prev => [newEntry, ...prev]);
    setNewProgressEntry('');
  }, [newProgressEntry]);

  const handleRefineEntry = async () => {
    if (newProgressEntry.trim() === '') return;
    setIsRefining(true);
    try {
      const result = await refineLogEntry({ rawNotes: newProgressEntry });
      setNewProgressEntry(result.refinedEntry);
    } catch (e) {
      console.error(e);
      toast({
        variant: 'destructive',
        title: 'Refinement Failed',
        description: 'The AI could not refine the notes. Please try again.',
      });
    } finally {
      setIsRefining(false);
    }
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
        case 'overview':
            return (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl text-primary">Project Overview</CardTitle>
                        <CardDescription>High-level view of the current job.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                        <div className="space-y-2">
                            <label className="font-bold text-muted-foreground text-sm uppercase">PROJECT NAME:</label>
                            <Input className="text-lg" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="font-bold text-muted-foreground text-sm uppercase">CLIENT CONTACT:</label>
                            <Input className="text-lg" value={clientContact} onChange={(e) => setClientContact(e.target.value)} />
                        </div>
                    </CardContent>
                </Card>
            );
        case 'tracking':
            return (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl text-primary flex items-center gap-2"><NotebookText /> Daily Project Log</CardTitle>
                        <CardDescription>Log daily progress and important notes for the current project. Use the AI refiner to clean up your notes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <div className="flex gap-2 mb-3">
                                <div className="relative w-full">
                                    <Input
                                        value={newProgressEntry}
                                        onChange={(e) => setNewProgressEntry(e.target.value)}
                                        placeholder="Log today's progress (e.g., 'finished tear-off, started underlayment')."
                                        onKeyPress={(e) => e.key === 'Enter' && addDailyProgressEntry()}
                                        className="pr-28"
                                    />
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={handleRefineEntry}
                                      disabled={isRefining || !newProgressEntry}
                                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8"
                                      >
                                        {isRefining ? <Loader2 className="animate-spin" /> : <Sparkles />}
                                        Refine
                                    </Button>
                                </div>
                                <Button onClick={addDailyProgressEntry}>Add Log</Button>
                            </div>
                            <div className="bg-secondary/30 p-4 rounded-lg border max-h-96 overflow-y-auto space-y-3">
                                {dailyProgressLog.length > 0 ? (
                                    dailyProgressLog.map(entry => (
                                        <div key={entry.id} className="text-sm text-foreground flex items-start">
                                            <span className="font-semibold text-muted-foreground w-40 shrink-0">{entry.timestamp.toLocaleString()}:</span> 
                                            <p>{entry.text}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground text-center py-4">No daily progress logged yet.</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            );
        case 'quotes': return <QuoteGenerator />;
        case 'coordinator': return <ColorCoordinator />;
        case 'invoices': return <InvoiceGenerator />;
        case 'promoter': return <ProjectPromoter />;
        case 'blog': return <BlogPostGenerator />;
        case 'storyteller': return <HomeStoryGenerator />;
        default: return null;
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
                                <SidebarMenuButton onClick={() => setActiveView('overview')} isActive={activeView === 'overview'}><LayoutDashboard/> Project Overview</SidebarMenuButton>
                            </SidebarMenuItem>
                             <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => setActiveView('tracking')} isActive={activeView === 'tracking'}><NotebookText/> Daily Log</SidebarMenuButton>
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
                                <SidebarMenuButton onClick={() => setActiveView('promoter')} isActive={activeView === 'promoter'}><Megaphone/> Project Promoter</SidebarMenuButton>
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
