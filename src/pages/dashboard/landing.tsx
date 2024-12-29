import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ProjectGrid } from '@/components/projects/project-grid';
import { InviteUserDialog } from '@/components/projects/invite-user-dialog';
import { projectApi } from '@/lib/api/projects';
import { useUser } from '@/contexts/user';
import type { Project } from '@/lib/types/project';

export function LandingPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const data = await projectApi.getProjects(user.name);
        setProjects(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch projects');
        console.error('Failed to fetch projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  const handleInviteClick = (projectId: number) => {
    setSelectedProjectId(projectId);
    setInviteDialogOpen(true);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-muted-foreground">Loading projects...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-destructive">{error}</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
        <main>
          {projects.length > 0 ? (
            <ProjectGrid
              projects={projects}
              currentUserId={user?.id ?? 0}
              onInviteClick={handleInviteClick}
            />
          ) : (
            <div className="max-w-md space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Get Started</h2>
                <p className="text-muted-foreground">
                  Create your first project using the + button in the sidebar
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
      {selectedProjectId && (
        <InviteUserDialog
          projectId={selectedProjectId}
          open={inviteDialogOpen}
          onOpenChange={setInviteDialogOpen}
        />
      )}
    </DashboardLayout>
  );
}