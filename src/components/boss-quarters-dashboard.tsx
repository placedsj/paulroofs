"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LogOut, Palette, Edit, FileText } from 'lucide-react';
import { QuoteGenerator } from './quote-generator';
import { ColorCoordinator } from './color-coordinator';

type DailyLogEntry = {
    id: string;
    text: string;
    timestamp: Date;
};

export function BossQuartersDashboard() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [projectName, setProjectName] = useState("SAMPLE ROOFING PROJECT");
  const [clientContact, setClientContact] = useState("John Smith - (506) 555-0123");
  const [dailyProgressLog, setDailyProgressLog] = useState<DailyLogEntry[]>([]);
  const [newProgressEntry, setNewProgressEntry] = useState('');

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

  if (!isMounted) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
             <h1 className="text-2xl">Loading Boss Quarters...</h1>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30 p-4 sm:p-6">
        <div className="container mx-auto">
            <header className="flex flex-col sm:flex-row justify-between items-center mb-6 text-foreground">
                <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wider text-shadow-outline mb-4 sm:mb-0">
                    Boss Quarters
                </h1>
                <Button onClick={handleLogout} variant="destructive" className="font-bold">
                    <LogOut className="mr-2 h-4 w-4" /> LOGOUT
                </Button>
            </header>

            <p className="text-lg text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
                Your central command for Project Management, AI Tools, and Administration.
            </p>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-background h-auto">
                    <TabsTrigger value="overview">Project Overview</TabsTrigger>
                    <TabsTrigger value="tracking">Daily Log</TabsTrigger>
                    <TabsTrigger value="quotes">AI Quote Generator</TabsTrigger>
                    <TabsTrigger value="coordinator">AI Color Coordinator</TabsTrigger>
                    <TabsTrigger value="invoices">Invoices</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
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
                </TabsContent>

                <TabsContent value="tracking" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-3xl text-primary">Daily Project Log</CardTitle>
                            <CardDescription>Log daily progress and important notes for the current project.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <div className="flex gap-2 mb-3">
                                    <Input
                                        value={newProgressEntry}
                                        onChange={(e) => setNewProgressEntry(e.target.value)}
                                        placeholder="Log today's progress (e.g., 'Finished tear-off, started underlayment')."
                                        onKeyPress={(e) => e.key === 'Enter' && addDailyProgressEntry()}
                                    />
                                    <Button onClick={addDailyProgressEntry}>Add Log</Button>
                                </div>
                                <div className="bg-secondary/30 p-4 rounded-lg border max-h-60 overflow-y-auto space-y-3">
                                    {dailyProgressLog.length > 0 ? (
                                        dailyProgressLog.map(entry => (
                                            <div key={entry.id} className="text-sm text-foreground flex items-start">
                                                <span className="font-semibold text-muted-foreground w-28 shrink-0">{entry.timestamp.toLocaleDateString()}:</span> 
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
                </TabsContent>
                
                <TabsContent value="quotes" className="mt-6">
                    <QuoteGenerator />
                </TabsContent>

                <TabsContent value="coordinator" className="mt-6">
                    <ColorCoordinator />
                </TabsContent>

                <TabsContent value="invoices" className="mt-6">
                    <Card>
                        <CardHeader>
                             <CardTitle className="text-3xl text-primary">Invoice Management</CardTitle>
                             <CardDescription>Create and track client invoices.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <p className="text-muted-foreground text-center py-12">Invoice management coming soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <footer className="mt-12 text-center text-muted-foreground text-sm">
                <p>PAUL'S ROOFING BOSS QUARTERS | SECURE ADMINISTRATIVE ACCESS</p>
            </footer>
        </div>
    </div>
  );
}
