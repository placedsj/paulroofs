
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, MapPin, HardHat, ClipboardList, Package, MessageSquare, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Project = {
    id: string;
    name: string;
    address: string;
    foreman: string;
    crew: string[];
    status: string;
    tasks: { id: string, description: string, completed: boolean }[];
    materials: { name: string, color?: string, quantity: string }[];
    notes: string;
};

type ProjectCardProps = {
    project: Project;
};

const InfoSection = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div>
        <h3 className="font-bold text-lg flex items-center gap-2 mb-2 text-primary">{icon} {title}</h3>
        <div className="pl-8 space-y-2 text-muted-foreground">{children}</div>
    </div>
);

export function ProjectCard({ project }: ProjectCardProps) {
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

                <InfoSection icon={<MessageSquare />} title="Job Notes">
                    <p className="p-4 bg-background rounded-md border">{project.notes}</p>
                </InfoSection>
                 <div className="grid grid-cols-2 gap-4">
                    <InfoSection icon={<Camera />} title="Job Photos">
                        <p className="italic">Photo gallery coming soon...</p>
                    </InfoSection>
                    <InfoSection icon={<Users />} title="Group Chat">
                         <p className="italic">Group chat coming soon...</p>
                    </InfoSection>
                </div>

            </CardContent>
        </Card>
    );
}
