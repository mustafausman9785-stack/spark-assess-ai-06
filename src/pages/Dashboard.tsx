
import { useState } from 'react';
import { Plus, TrendingUp, Users, FileText, Award, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import AssessmentCreator from '@/components/AssessmentCreator';
import { ManualAssessmentForm } from '@/components/ManualAssessmentForm';

const Dashboard = () => {
  const [showNewAssessmentModal, setShowNewAssessmentModal] = useState(false);
  const [assessmentMode, setAssessmentMode] = useState<'manual' | 'ai' | null>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);

  const stats = [
    { title: 'Total Assessments', value: '142', icon: FileText, color: 'text-ai-blue', change: '+12%' },
    { title: 'Total Users', value: '1,284', icon: Users, color: 'text-green-600', change: '+8%' },
    { title: 'Assessments Taken', value: '3,567', icon: TrendingUp, color: 'text-orange-600', change: '+15%' },
    { title: 'Average Score', value: '78.5%', icon: Award, color: 'text-ai-blue', change: '+2.1%' },
  ];

  const recentAssessments = [
    { 
      id: 1, 
      name: 'Cybersecurity Fundamentals', 
      category: 'Security', 
      created: '2 hours ago', 
      questions: 25, 
      status: 'active',
      difficulty: 'Medium',
      timeLimit: 60,
      participants: 45
    },
    { 
      id: 2, 
      name: 'React Development Quiz', 
      category: 'Programming', 
      created: '1 day ago', 
      questions: 15, 
      status: 'draft',
      difficulty: 'Hard',
      timeLimit: 45,
      participants: 0
    },
    { 
      id: 3, 
      name: 'Project Management Basics', 
      category: 'Management', 
      created: '3 days ago', 
      questions: 30, 
      status: 'active',
      difficulty: 'Easy',
      timeLimit: 90,
      participants: 78
    },
    { 
      id: 4, 
      name: 'Database Design', 
      category: 'Programming', 
      created: '1 week ago', 
      questions: 20, 
      status: 'archived',
      difficulty: 'Medium',
      timeLimit: 75,
      participants: 23
    },
  ];

  const handleNewAssessment = (mode: 'manual' | 'ai') => {
    setAssessmentMode(mode);
    setShowNewAssessmentModal(false);
  };

  const handleSaveAssessment = (assessment: any) => {
    console.log('Saving assessment:', assessment);
    setAssessmentMode(null);
    // Here you would typically save to a backend
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-ai-gray-900">Dashboard</h1>
          <p className="text-ai-gray-600 mt-1">Welcome back! Here's what's happening with your assessments.</p>
        </div>
        
        <Dialog open={showNewAssessmentModal} onOpenChange={setShowNewAssessmentModal}>
          <DialogTrigger asChild>
            <Button className="bg-ai-blue hover:bg-ai-blue-600 w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              New Assessment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Assessment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Button 
                onClick={() => handleNewAssessment('manual')}
                className="w-full h-20 bg-white border-2 border-ai-gray-200 hover:border-ai-blue text-ai-gray-900 hover:bg-ai-blue-light"
                variant="outline"
              >
                <div className="text-center">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-ai-blue" />
                  <div className="font-medium">Manual Assessment Creation</div>
                  <div className="text-sm text-ai-gray-500">Create questions manually</div>
                </div>
              </Button>
              
              <Button 
                onClick={() => handleNewAssessment('ai')}
                className="w-full h-20 bg-ai-blue-light border-2 border-ai-blue text-ai-blue hover:bg-ai-blue hover:text-white"
              >
                <div className="text-center">
                  <Award className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-medium">AI Assistant</div>
                  <div className="text-sm opacity-80">Let AI help you create</div>
                </div>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-ai-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-ai-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl md:text-3xl font-bold text-ai-gray-900">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className="ml-4">
                  <stat.icon className={`w-8 h-8 md:w-12 md:h-12 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Assessments */}
      <Card className="border-ai-gray-200">
        <CardHeader>
          <CardTitle className="text-ai-gray-900 flex items-center justify-between">
            <span>Recent Assessments</span>
            <Badge variant="outline">{recentAssessments.length} total</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAssessments.map((assessment, index) => (
              <div key={index} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-white rounded-lg border border-ai-gray-100 hover:border-ai-blue-200 transition-colors">
                <div className="flex-1 mb-3 lg:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-ai-gray-900">{assessment.name}</h3>
                    <Badge className={getStatusColor(assessment.status)}>{assessment.status}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-ai-gray-500">
                    <span>{assessment.category}</span>
                    <span>{assessment.questions} questions</span>
                    <span>{assessment.difficulty}</span>
                    <span>{assessment.participants} participants</span>
                  </div>
                  <p className="text-xs text-ai-gray-400 mt-1">Created {assessment.created}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedAssessment(assessment)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Manual Assessment Creation Modal */}
      {assessmentMode === 'manual' && (
        <Dialog open={true} onOpenChange={() => setAssessmentMode(null)}>
          <DialogContent className="max-w-6xl h-[90vh] overflow-hidden p-0">
            <ManualAssessmentForm 
              onSave={handleSaveAssessment}
              onCancel={() => setAssessmentMode(null)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* AI Assistant Modal */}
      {assessmentMode === 'ai' && (
        <Dialog open={true} onOpenChange={() => setAssessmentMode(null)}>
          <DialogContent className="max-w-6xl h-[90vh] overflow-hidden p-0">
            <AssessmentCreator />
          </DialogContent>
        </Dialog>
      )}

      {/* Assessment Details Modal */}
      {selectedAssessment && (
        <Dialog open={true} onOpenChange={() => setSelectedAssessment(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedAssessment.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-ai-blue-light rounded-lg">
                <div><strong>Category:</strong> {selectedAssessment.category}</div>
                <div><strong>Status:</strong> <Badge className={getStatusColor(selectedAssessment.status)}>{selectedAssessment.status}</Badge></div>
                <div><strong>Questions:</strong> {selectedAssessment.questions}</div>
                <div><strong>Difficulty:</strong> {selectedAssessment.difficulty}</div>
                <div><strong>Time Limit:</strong> {selectedAssessment.timeLimit} minutes</div>
                <div><strong>Participants:</strong> {selectedAssessment.participants}</div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedAssessment(null)}>Close</Button>
                <Button className="bg-ai-blue hover:bg-ai-blue-600">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Assessment
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Dashboard;
