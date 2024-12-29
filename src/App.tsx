import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from '@/pages/auth/login';
import { RegisterPage } from '@/pages/auth/register';
import { LandingPage } from '@/pages/dashboard/landing';
import { ProjectPage } from '@/pages/dashboard/project';
import { Toaster } from '@/components/ui/toaster';
import { UserProvider } from '@/contexts/user';

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<LandingPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </UserProvider>
  );
}