import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const roleConfig = {
  super_admin: { label: 'Super Admin', variant: 'default' },
  regional_admin: { label: 'Regional Admin', variant: 'default' },
  school_admin: { label: 'School Admin', variant: 'secondary' },
  teacher: { label: 'Teacher', variant: 'secondary' },
  parent: { label: 'Parent', variant: 'outline' },
  learner: { label: 'Learner', variant: 'outline' },
  receptionist: { label: 'Receptionist', variant: 'secondary' },
  librarian: { label: 'Librarian', variant: 'secondary' },
  accountant: { label: 'Accountant', variant: 'secondary' },
};

export const RoleBadge = ({ role, className }) => {
  const config = roleConfig[role];
  
  return (
    <Badge variant={config.variant} className={cn(className)}>
      {config.label}
    </Badge>
  );
};