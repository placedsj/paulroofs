
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ProjectCard } from "@/components/project-card";

// In a real app, this would come from an API
const initialProjects = [
    {
        id: 'project-1',
        name: 'Smith Residence Roof Replacement',
        address: '123 Maple St, Rothesay, NB',
        foreman: 'Mike Henderson',
        crew: ['Caleb Tiner', 'John Doe', 'Peter Jones'],
        status: 'In Progress',
        tasks: [
            { id: 'task-1', description: 'Complete tear-off of old shingles', completed: true },
            { id: 'task-2', description: 'Inspect roof decking for rot', completed: true },
            { id: 'task-3', description: 'Install new ice and water shield', completed: false },
            { id: 'task-4', description: 'Begin laying new asphalt shingles', completed: false },
        ],
        materials: [
            { name: 'IKO Dynasty Shingles', color: 'Castle Grey', quantity: '45 bundles' },
            { name: 'Ice & Water Shield', quantity: '3 rolls' },
            { name: 'Roofing Nails', quantity: '2 boxes' },
        ],
        notes: "Client has a dog named Max, make sure to keep the gate closed. Watch out for the garden on the west side of the house."
    },
     {
        id: 'project-2',
        name: 'Johnson Siding Project',
        address: '456 Oak Ave, Quispamsis, NB',
        foreman: 'Caleb Tiner',
        crew: ['James Brown', 'Alex Williams'],
        status: 'Starting Soon',
        tasks: [
            { id: 'task-5', description: 'Material delivery confirmation', completed: false },
            { id: 'task-6', description: 'Site prep and setup', completed: false },
        ],
        materials: [
             { name: 'Vinyl Siding', color: 'Driftwood', quantity: '20 squares' },
             { name: 'J-Channel & Trim', quantity: '15 pieces' },
        ],
        notes: "Material delivery scheduled for Tuesday morning. Client wants to confirm color before starting."
    }
];

export function CrewHub() {
    const [projects, setProjects] = useState(initialProjects);
    const [selectedProject, setSelectedProject] = useState(initialProjects[0]);

    // In the future, we can use this to show different views for different roles
    const userRole = 'owner'; 

    return (
        <div>
            <CardHeader className="text-center px-0">
                <CardTitle className="text-3xl md:text-4xl mt-2">Crew Project Hub</CardTitle>
                <CardDescription className="text-lg">
                    A real-time overview of all active and upcoming projects.
                </CardDescription>
            </CardHeader>
            <div className="grid lg:grid-cols-3 gap-8 items-start mt-8">
                <div className="lg:col-span-1 space-y-4">
                    <h2 className="text-xl font-bold">Active Jobs</h2>
                     {projects.map(project => (
                        <div key={project.id} onClick={() => setSelectedProject(project)} className="cursor-pointer">
                            <Card className={selectedProject.id === project.id ? "border-primary" : ""}>
                                <CardHeader>
                                    <CardTitle className="text-lg">{project.name}</CardTitle>
                                    <CardDescription>{project.address}</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    ))}
                </div>
                 <div className="lg:col-span-2">
                    {selectedProject && <ProjectCard project={selectedProject} />}
                 </div>

            </div>
        </div>
    );
}
