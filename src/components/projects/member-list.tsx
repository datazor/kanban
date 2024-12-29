import { useState } from 'react';
import { Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils/string';
import type { ProjectMember } from '@/lib/api';

const roleColors = {
  Administrator: 'text-blue-600',
  Member: 'text-green-600',
  Observer: 'text-purple-600',
} as const;

interface MemberListProps {
  members: ProjectMember[];
  projectId: number;
}

export function MemberList({ members, projectId }: MemberListProps) {
  const [currentUserRole] = useState(() => 
    members.find(member => member.id === 1)?.role
  );

  const isAdmin = currentUserRole === 'Administrator';

  const handleRoleChange = async (memberId: number, newRole: string) => {
    // TODO: Implement role change API call
    console.log('Change role', { memberId, newRole });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Team Members
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  {!isAdmin && (
                    <p className={`text-sm ${roleColors[member.role]}`}>
                      {member.role}
                    </p>
                  )}
                </div>
              </div>
              {isAdmin && member.id !== 1 && (
                <Select
                  defaultValue={member.role}
                  onValueChange={(value) => handleRoleChange(member.id, value)}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Member">Member</SelectItem>
                    <SelectItem value="Observer">Observer</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}