import { ProjectCard } from './project-card';
import type { Project } from '@/lib/api';

interface ProjectGridProps {
  projects: Project[];
  currentUserId: number;
  onInviteClick: (projectId: number) => void;
}

export function ProjectGrid({ projects, currentUserId, onInviteClick }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          currentUserId={currentUserId}
          onInviteClick={onInviteClick}
        />
      ))}
    </div>
  );
}