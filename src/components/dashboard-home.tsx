
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, PlusCircle, BarChart, Settings, FileSignature } from "lucide-react";

type View = 'dashboard' | 'clients' | 'quotes' | 'coordinator' | 'invoices' | 'promoter' | 'blog' | 'storyteller' | 'video' | 'visualizer' | 'recommender';

type DashboardHomeProps = {
    setActiveView: (view: View) => void;
};


export function DashboardHome({ setActiveView }: DashboardHomeProps) {
    const stats = [
        { title: "Active Projects", value: "3", icon: <Users /> },
        { title: "Quotes Pending", value: "5", icon: <FileText /> },
        { title: "Revenue (Month)", value: "$12,500", icon: <BarChart /> },
        { title: "Overdue Invoices", value: "1", icon: <Settings /> },
    ];

    const quickActions = [
        { title: "New Client Project", view: "clients", icon: <PlusCircle /> },
        { title: "Generate Quote", view: "quotes", icon: <FileText /> },
        { title: "Manage Clients", view: "clients", icon: <Users /> },
        { title: "Generate Invoice", view: "invoices", icon: <FileSignature /> },
    ];


  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
            <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <div className="text-muted-foreground">{stat.icon}</div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                        {/* Placeholder for future sparkline or percentage change */}
                    </p>
                </CardContent>
            </Card>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Start a common task with one click.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    {quickActions.map(action => (
                        <Button 
                            key={action.title} 
                            variant="outline" 
                            className="p-6 h-auto flex flex-col items-start justify-start gap-2 text-left"
                            onClick={() => setActiveView(action.view as View)}
                        >
                           {action.icon}
                           <span className="font-semibold">{action.title}</span>
                        </Button>
                    ))}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>A log of recent actions and events.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <p className="text-sm text-muted-foreground text-center p-8">Recent activity feed coming soon.</p>
                </CardContent>
            </Card>
      </div>
    </div>
  );
}
