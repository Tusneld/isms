import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Eye,
  Edit,
  Trash2,
  GraduationCap
} from 'lucide-react';
import { useLearnerStore } from '@/store/useLearnerStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const LearnersPage = () => {
  const { learners, deleteLearner } = useLearnerStore();
  const { toast } = useToast();
  
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [viewingLearner, setViewingLearner] = useState(null);

  const grades = [...new Set(learners.map((l) => l.grade))].sort();

  const filteredLearners = learners.filter((learner) => {
    const matchesSearch = 
      learner.firstName.toLowerCase().includes(search.toLowerCase()) ||
      learner.lastName.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = gradeFilter === 'all' || learner.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  const handleDelete = (id) => {
    deleteLearner(id);
    toast({
      title: 'Learner removed',
      description: 'The learner has been removed from the system.',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'transferred': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Learners</h1>
          <p className="text-muted-foreground">Manage student records and information</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Learner
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-popover">
                <SelectValue placeholder="Filter by grade" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Grades</SelectItem>
                {grades.map((grade) => (
                  <SelectItem key={grade} value={grade}>Grade {grade}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Learners Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            Student Records
            <Badge variant="secondary" className="ml-2">{filteredLearners.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Grade</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground hidden md:table-cell">Parent</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground hidden lg:table-cell">Phone</th>
                  <th className="text-center py-3 px-4 font-semibold text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLearners.map((learner) => (
                  <tr key={learner.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary-foreground">
                            {learner.firstName.charAt(0)}{learner.lastName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{learner.firstName} {learner.lastName}</p>
                          <p className="text-xs text-muted-foreground">{learner.gender === 'male' ? 'Male' : 'Female'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{learner.grade}{learner.class}</Badge>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell text-muted-foreground">
                      {learner.parentName}
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell text-muted-foreground">
                      {learner.parentPhone}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={getStatusColor(learner.status)}>
                        {learner.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => setViewingLearner(learner)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg bg-card">
                            <DialogHeader>
                              <DialogTitle>Learner Profile</DialogTitle>
                            </DialogHeader>
                            {viewingLearner && (
                              <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                                    <span className="text-xl font-bold text-primary-foreground">
                                      {viewingLearner.firstName.charAt(0)}{viewingLearner.lastName.charAt(0)}
                                    </span>
                                  </div>
                                  <div>
                                    <h3 className="text-xl font-bold">{viewingLearner.firstName} {viewingLearner.lastName}</h3>
                                    <p className="text-muted-foreground">Grade {viewingLearner.grade}{viewingLearner.class}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-muted-foreground">Date of Birth</p>
                                    <p className="font-medium">{new Date(viewingLearner.dateOfBirth).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Gender</p>
                                    <p className="font-medium capitalize">{viewingLearner.gender}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Parent/Guardian</p>
                                    <p className="font-medium">{viewingLearner.parentName}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Contact</p>
                                    <p className="font-medium">{viewingLearner.parentPhone}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-muted-foreground">Address</p>
                                    <p className="font-medium">{viewingLearner.address}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Enrollment Date</p>
                                    <p className="font-medium">{new Date(viewingLearner.enrollmentDate).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Status</p>
                                    <Badge variant={getStatusColor(viewingLearner.status)}>
                                      {viewingLearner.status}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(learner.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLearners.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground">No learners found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LearnersPage;