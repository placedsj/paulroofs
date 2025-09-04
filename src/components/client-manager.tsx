
"use client";

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { NotebookText, Sparkles, Loader2, Plus, Trash2, FileText, FileSignature, Home, Megaphone } from 'lucide-react';
import { refineLogEntry } from '@/ai/flows/log-refiner-flow';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

type DailyLogEntry = {
    id: string;
    text: string;
    timestamp: Date;
};

export type Client = {
    id: string;
    name: string;
    contact: string;
    address: string;
    log: DailyLogEntry[];
};

type ClientManagerProps = {
    onClientAction: (client: Client, view: 'quotes' | 'invoices' | 'storyteller' | 'promoter') => void;
};


export function ClientManager({ onClientAction }: ClientManagerProps) {
  const [clients, setClients] = useState<Client[]>([
      { id: '1', name: 'Smith Residence', contact: 'John Smith - (506) 555-0123', address: '123 Maple St, Rothesay', log: [] }
  ]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(clients[0] || null);
  const [newClientName, setNewClientName] = useState('');
  const [newClientContact, setNewClientContact] = useState('');
  const [newClientAddress, setNewClientAddress] = useState('');

  const [newProgressEntry, setNewProgressEntry] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const { toast } = useToast();

  const handleAddClient = () => {
    if (!newClientName || !newClientContact || !newClientAddress) {
        toast({ variant: 'destructive', title: 'Missing Information', description: 'Please fill out all fields to add a new client.' });
        return;
    }
    const newClient: Client = {
        id: Date.now().toString(),
        name: newClientName,
        contact: newClientContact,
        address: newClientAddress,
        log: []
    };
    setClients(prev => [...prev, newClient]);
    setNewClientName('');
    setNewClientContact('');
    setNewClientAddress('');
    setSelectedClient(newClient);
  };
  
  const handleDeleteClient = (clientId: string) => {
    setClients(prev => prev.filter(c => c.id !== clientId));
    if (selectedClient?.id === clientId) {
        setSelectedClient(clients[0] || null);
    }
  };

  const addDailyProgressEntry = useCallback(() => {
    if (!selectedClient || newProgressEntry.trim() === '') return;
    const newEntry = {
        id: Date.now().toString(),
        text: newProgressEntry.trim(),
        timestamp: new Date()
    };
    const updatedClient = { ...selectedClient, log: [newEntry, ...selectedClient.log] };
    setSelectedClient(updatedClient);
    setClients(clients.map(c => c.id === selectedClient.id ? updatedClient : c));
    setNewProgressEntry('');
  }, [newProgressEntry, selectedClient, clients]);

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

  return (
    <div className="grid lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Clients</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {clients.map(client => (
                            <div key={client.id} className="flex items-center">
                                <Button 
                                    variant={selectedClient?.id === client.id ? 'secondary' : 'ghost'} 
                                    onClick={() => setSelectedClient(client)}
                                    className="w-full justify-start"
                                >
                                    {client.name}
                                </Button>
                                <Button variant="ghost" size="icon" className="ml-2 h-8 w-8" onClick={() => handleDeleteClient(client.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full"><Plus className="mr-2"/> Add Client</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Client Project</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <Input value={newClientName} onChange={e => setNewClientName(e.target.value)} placeholder="Project Name (e.g., Smith Residence)" />
                                <Input value={newClientContact} onChange={e => setNewClientContact(e.target.value)} placeholder="Client Contact (Name & Phone)" />
                                <Input value={newClientAddress} onChange={e => setNewClientAddress(e.target.value)} placeholder="Project Address" />
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button onClick={handleAddClient}>Add Client</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </div>

        <div className="lg:col-span-2">
            {selectedClient ? (
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-3xl text-primary">{selectedClient.name}</CardTitle>
                            <CardDescription>{selectedClient.contact} | {selectedClient.address}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                             <Button variant="outline" onClick={() => onClientAction(selectedClient, 'quotes')}><FileText className="mr-2" /> New Quote</Button>
                             <Button variant="outline" onClick={() => onClientAction(selectedClient, 'invoices')}><FileSignature className="mr-2" /> New Invoice</Button>
                             <Button variant="outline" onClick={() => onClientAction(selectedClient, 'storyteller')}><Home className="mr-2" /> Create Story</Button>
                             <Button variant="outline" onClick={() => onClientAction(selectedClient, 'promoter')}><Megaphone className="mr-2" /> Promote Project</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2"><NotebookText /> Daily Project Log</CardTitle>
                            <CardDescription>Log daily progress and important notes. Use the AI refiner to clean up your notes.</CardDescription>
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
                                    {selectedClient.log.length > 0 ? (
                                        selectedClient.log.map(entry => (
                                            <div key={entry.id} className="text-sm text-foreground flex items-start">
                                                <span className="font-semibold text-muted-foreground w-40 shrink-0">{entry.timestamp.toLocaleString()}:</span> 
                                                <p>{entry.text}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted-foreground text-center py-4">No daily progress logged for this client yet.</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                 <Card>
                    <CardContent className="p-12 text-center">
                        <h3 className="text-xl font-semibold text-muted-foreground">No Client Selected</h3>
                        <p className="text-muted-foreground mt-2">Please select a client from the list or add a new one to get started.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    </div>
  );
}
