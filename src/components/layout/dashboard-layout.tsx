import { useState } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { CreateProjectDialog } from '../projects/create-project-dialog';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onProjectDialogOpen={() => setIsProjectDialogOpen(true)} />
      <CreateProjectDialog 
        open={isProjectDialogOpen} 
        onOpenChange={setIsProjectDialogOpen} 
      />
      <div className="pl-16">
        <Header />
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}