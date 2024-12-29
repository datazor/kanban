import { mockMembers } from './members';
import type { Project } from '../types';

export const mockProjects: Project[] = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design and improved user experience.",
    startDate: "2024-03-15",
    members: [mockMembers[0], mockMembers[1]]
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Development of a new mobile application for both iOS and Android platforms.",
    startDate: "2024-03-20",
    members: [mockMembers[0], mockMembers[2]]
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Planning and execution of Q2 marketing campaign across multiple channels.",
    startDate: "2024-04-01",
    members: mockMembers
  }
];