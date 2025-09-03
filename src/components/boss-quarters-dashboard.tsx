"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LogOut } from 'lucide-react';

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
    setDailyProgressLog(prev => [...prev, newEntry]);
    setNewProgressEntry('');
  }, [newProgressEntry]);

  if (!isMounted) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-500 to-green-700">
            <div className="text-white text-2xl">Loading...</div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-green-900 p-4 sm:p-6">
        <div className="container mx-auto">
            <header className="flex flex-col sm:flex-row justify-between items-center mb-6 text-white">
                <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wider text-shadow-outline mb-4 sm:mb-0">
                    Boss Quarters
                </h1>
                <Button onClick={handleLogout} variant="destructive" className="font-bold">
                    <LogOut className="mr-2 h-4 w-4" /> LOGOUT
                </Button>
            </header>

            <p className="text-lg text-green-200 mb-8 text-center max-w-3xl mx-auto text-shadow-outline-sm">
                PROJECT MANAGEMENT | QUOTES | INVOICES | ADMIN TOOLS
            </p>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white/20 backdrop-blur-sm h-auto">
                    <TabsTrigger value="overview">PROJECT OVERVIEW</TabsTrigger>
                    <TabsTrigger value="tracking">PROJECT TRACKING</TabsTrigger>
                    <TabsTrigger value="quotes">QUOTES</TabsTrigger>
                    <TabsTrigger value="invoices">INVOICES</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                    <Card className="bg-white/90 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-3xl text-green-800">PROJECT OVERVIEW 📊</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                            <div className="space-y-2">
                                <label className="font-bold text-gray-700 uppercase">PROJECT NAME:</label>
                                <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="font-bold text-gray-700 uppercase">CLIENT CONTACT:</label>
                                <Input value={clientContact} onChange={(e) => setClientContact(e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="tracking" className="mt-6">
                     <Card className="bg-white/90 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-3xl text-green-800">PROJECT TRACKING 📝</CardTitle>
                            <CardDescription>Log daily progress and important notes.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-green-700 mb-2 uppercase">DAILY PROGRESS LOG</h3>
                                <div className="flex gap-2 mb-3">
                                    <Input
                                        value={newProgressEntry}
                                        onChange={(e) => setNewProgressEntry(e.target.value)}
                                        placeholder="Add new daily progress entry..."
                                        onKeyPress={(e) => e.key === 'Enter' && addDailyProgressEntry()}
                                    />
                                    <Button onClick={addDailyProgressEntry} className="bg-green-600 hover:bg-green-700">ADD</Button>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg border border-green-200 max-h-60 overflow-y-auto space-y-2">
                                    {dailyProgressLog.length > 0 ? (
                                        dailyProgressLog.map(entry => (
                                            <p key={entry.id} className="text-sm text-gray-800">
                                                <span className="font-bold">{entry.timestamp.toLocaleDateString()}:</span> {entry.text}
                                            </p>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No daily progress logged yet.</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="quotes" className="mt-6">
                    <Card className="bg-white/90 backdrop-blur-sm">
                        <CardHeader>
                             <CardTitle className="text-3xl text-blue-800">QUOTE MANAGEMENT 💰</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Card className="bg-blue-50 border-blue-200">
                                <CardHeader>
                                    <CardTitle className="text-2xl text-blue-700">CREATE NEW QUOTE</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input type="text" placeholder="Client Name" />
                                        <Input type="email" placeholder="Client Email" />
                                        <Input type="text" placeholder="Project Type" />
                                        <Input type="number" placeholder="Estimated Cost" />
                                    </div>
                                    <Textarea placeholder="Project Description..." rows={4} />
                                    <Button className="bg-blue-600 hover:bg-blue-700">GENERATE QUOTE</Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl text-gray-700">RECENT QUOTES</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">No quotes created yet.</p>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="invoices" className="mt-6">
                    <Card className="bg-white/90 backdrop-blur-sm">
                        <CardHeader>
                             <CardTitle className="text-3xl text-purple-800">INVOICE MANAGEMENT 📋</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Card className="bg-purple-50 border-purple-200">
                                <CardHeader>
                                    <CardTitle className="text-2xl text-purple-700">CREATE NEW INVOICE</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input type="text" placeholder="Invoice Number" />
                                        <Input type="date" placeholder="Due Date" />
                                        <Input type="text" placeholder="Client Name" />
                                        <Input type="number" placeholder="Total Amount" />
                                    </div>
                                    <Textarea placeholder="Invoice Items & Details..." rows={4} />
                                    <Button className="bg-purple-600 hover:bg-purple-700">GENERATE INVOICE</Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl text-gray-700">PENDING INVOICES</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">No pending invoices.</p>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <footer className="mt-12 text-center text-green-200 text-sm">
                <p>PAUL'S ROOFING BOSS QUARTERS | SECURE ADMINISTRATIVE ACCESS</p>
            </footer>
        </div>
    </div>
  );
}
