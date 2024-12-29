import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface ProjectDescriptionProps {
  description: string;
}

export function ProjectDescription({ description }: ProjectDescriptionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Project Description
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {description || 'No description provided'}
        </p>
      </CardContent>
    </Card>
  );
}