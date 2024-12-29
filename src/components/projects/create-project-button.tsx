import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CreateProjectButtonProps {
  onClick: () => void;
}

export function CreateProjectButton({ onClick }: CreateProjectButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            className="h-10 w-10 rounded-lg hover:bg-accent hover:shadow-md transition-all"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Create New Project</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}