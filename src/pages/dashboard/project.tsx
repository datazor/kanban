import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ProjectHeader } from '@/components/projects/project-header';
import { TaskBoard } from '@/components/tasks/task-board';
import { projectApi } from '@/lib/api/projects';
import type { Project } from '@/lib/types/project';

export function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await projectApi.getProject(Number(id));
        setProject(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch project');
        console.error('Failed to fetch project:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-muted-foreground">Loading project...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !project) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-destructive">{error || 'Project not found'}</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6 space-y-4">
        <ProjectHeader project={project} />
        <TaskBoard projectId={project.id} members={project.members} />
      </div>
    </DashboardLayout>
  );
}