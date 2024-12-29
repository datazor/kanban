import { ArrowLeft } from 'lucide-react';
import { RegisterForm } from '@/components/auth/register-form';
import { Button } from '@/components/ui/button';
import { GradientText } from '@/components/ui/gradient-text';

export function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tighter">
            Join <GradientText>KanbanFlow</GradientText>
          </h1>
          <p className="text-muted-foreground">
            Create an account to get started
          </p>
        </div>
        <RegisterForm />
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full" asChild>
            <a href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}