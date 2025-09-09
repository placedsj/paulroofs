
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, MapPin, HardHat, ClipboardList, Package, MessageSquare, Camera, Clock, UserCheck, Wrench, PackagePlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export type ChatMessage = {
    user: string;
    text: string;
    timestamp: Date;
};

export type TimeLog = {
    user: string;
    hours: number;
    activity: string;
    date: Date;
};

export type Project = {
    id: string;
    name: string;
    address: string;
    foreman: string;
    crew: string[];
    status: string;
    tasks: { id: string, description: string, completed: boolean }[];
    materials: { name: string, color?: string, quantity: string }[];
    tools: string[];
    materialLeftover: { name: string, quantity: string }[];
    notes: string;
    chatMessages: ChatMessage[];
    timeLogs: TimeLog[];
    eta: string;
};

type ProjectCardProps = {
    project: Project;
    onUpdate: (project: Project) => void;
    currentUser: string;
};

const InfoSection = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div>
        <h3 className="font-bold text-lg flex items-center gap-2 mb-2 text-primary">{icon} {title}</h3>
        <div className="pl-8 space-y-2 text-muted-foreground">{children}</div>
    </div>
);

export function ProjectCard({ project, onUpdate, currentUser }: ProjectCardProps) {
    const [chatInput, setChatInput] = useState('');
    const [timeHours, setTimeHours] = useState('');
    const [timeActivity, setTimeActivity] = useState('');
    const [etaInput, setEtaInput] = useState(project.eta);

    const handleSendMessage = () => {
        if (!chatInput.trim()) return;
        const newMessage: ChatMessage = {
            user: currentUser,
            text: chatInput,
            timestamp: new Date()
        };
        onUpdate({ ...project, chatMessages: [...project.chatMessages, newMessage] });
        setChatInput('');
    };

    const handleLogTime = () => {
        const hours = parseFloat(timeHours);
        if (isNaN(hours) || hours <= 0 || !timeActivity.trim()) return;
        const newLog: TimeLog = {
            user: currentUser,
            hours,
            activity: timeActivity,
            date: new Date()
        };
        onUpdate({ ...project, timeLogs: [...project.timeLogs, newLog] });
        setTimeHours('');
        setTimeActivity('');
    };
    
    const handleUpdateEta = () => {
        onUpdate({ ...project, eta: etaInput });
    };
    
    return (
        <Card className="shadow-lg">
            <CardHeader className="bg-secondary/30">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl">{project.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-2"><MapPin className="h-4 w-4" /> {project.address}</CardDescription>
                    </div>
                    <Badge variant={project.status === 'In Progress' ? 'default' : 'secondary'}>{project.status}</Badge>
                </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <InfoSection icon={<HardHat />} title="Team">
                        <p><strong>Foreman:</strong> {project.foreman}</p>
                        <p><strong>Crew:</strong> {project.crew.join(', ')}</p>
                    </InfoSection>

                    <InfoSection icon={<Package />} title="Materials">
                        {project.materials.map(mat => (
                            <p key={mat.name}>{mat.quantity} of {mat.color} {mat.name}</p>
                        ))}
                    </InfoSection>
                </div>
                
                 <InfoSection icon={<ClipboardList />} title="Daily Tasks">
                     <div className="space-y-2">
                        {project.tasks.map(task => (
                            <div key={task.id} className="flex items-center gap-3">
                                <Checkbox id={task.id} checked={task.completed} />
                                <label htmlFor={task.id} className={`flex-1 ${task.completed ? 'line-through text-muted-foreground/50' : ''}`}>{task.description}</label>
                            </div>
                        ))}
                     </div>
                </InfoSection>
                
                 <div className="grid md:grid-cols-2 gap-6">
                    <InfoSection icon={<Wrench />} title="Required Tools">
                        <ul className="list-disc pl-5">
                            {project.tools.map(tool => (
                                <li key={tool}>{tool}</li>
                            ))}
                        </ul>
                    </InfoSection>

                    <InfoSection icon={<PackagePlus />} title="Material Leftover">
                        {project.materialLeftover.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {project.materialLeftover.map(mat => (
                                    <li key={mat.name}>{mat.quantity} of {mat.name}</li>
                                ))}
                            </ul>
                        ) : <p>None reported.</p>}
                    </InfoSection>
                </div>


                <Separator />

                <div className="grid lg:grid-cols-2 gap-6">
                    <InfoSection icon={<Clock />} title="Time & Progress">
                         <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Log Your Time</label>
                                <div className="flex gap-2 mt-1">
                                    <Input value={timeHours} onChange={e => setTimeHours(e.target.value)} type="number" placeholder="Hours" className="w-20" />
                                    <Input value={timeActivity} onChange={e => setTimeActivity(e.target.value)} placeholder="Activity (e.g., Framing)" />
                                    <Button onClick={handleLogTime}>Log</Button>
                                </div>
                            </div>
                             <div>
                                <label className="text-sm font-medium">Update ETA</label>
                                <div className="flex gap-2 mt-1">
                                    <Input value={etaInput} onChange={e => setEtaInput(e.target.value)} placeholder="e.g., 2 days remaining" />
                                     <Button onClick={handleUpdateEta}>Set</Button>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground mb-2">Logged Timesheets:</h4>
                                <div className="text-sm space-y-1 max-h-24 overflow-y-auto pr-2">
                                    {project.timeLogs.map((log, i) => (
                                        <p key={i}><strong>{log.user}:</strong> {log.hours}hrs - {log.activity}</p>
                                    ))}
                                </div>
                            </div>
                         </div>
                    </InfoSection>

                    <InfoSection icon={<UserCheck />} title="Today's ETA">
                        <p className="text-lg font-bold text-foreground">{project.eta}</p>
                    </InfoSection>
                </div>
                
                <Separator />

                <InfoSection icon={<MessageSquare />} title="Daily Check-in & Chat">
                    <div className="bg-background border rounded-lg p-3 space-y-3">
                        <div className="max-h-48 overflow-y-auto space-y-3 pr-2">
                            {project.chatMessages.map((msg, i) => (
                                <div key={i} className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-sm text-foreground">{msg.user}</p>
                                        <p className="text-xs text-muted-foreground">{msg.timestamp.toLocaleTimeString()}</p>
                                    </div>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 pt-2 border-t">
                            <Input 
                                value={chatInput} 
                                onChange={e => setChatInput(e.target.value)}
                                placeholder={`Checking in as ${currentUser}...`}
                                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                            />
                            <Button onClick={handleSendMessage}>Send</Button>
                        </div>
                    </div>
                </InfoSection>


                <InfoSection icon={<MessageSquare />} title="Job Notes">
                    <p className="p-4 bg-background rounded-md border">{project.notes}</p>
                </InfoSection>
                 <div className="grid grid-cols-2 gap-4">
                    <InfoSection icon={<Camera />} title="Job Photos">
                        <p className="italic">Photo gallery coming soon...</p>
                    </InfoSection>
                </div>

            </CardContent>
        </Card>
    );
}
