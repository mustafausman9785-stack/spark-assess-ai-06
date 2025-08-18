
import { useState } from 'react';
import { Plus, TrendingUp, Users, FileText, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AssessmentCreator from '@/components/AssessmentCreator';

const Dashboard = () => {
  const [showNewAssessmentModal, setShowNewAssessmentModal] = useState(false);
  const [assessmentMode, setAssessmentMode] = useState<'manual' | 'ai' | null>(null);

  const stats = [
    { title: 'Total Assessments', value: '142', icon: FileText, color: 'text-ai-blue' },
    { title: 'Total Users', value: '1,284', icon: Users, color: 'text-success' },
    { title: 'Assessments Taken', value: '3,567', icon: TrendingUp, color: 'text-warning' },
    { title: 'Average Score', value: '78.5%', icon: Award, color: 'text-ai-blue' },
  ];

  const recentAssessments = [
    { name: 'Cybersecurity Fundamentals', category: 'Security', created: '2 hours ago', questions: 25 },
    { name: 'React Development Quiz', category: 'Programming', created: '1 day ago', questions: 15 },
    { name: 'Project Management Basics', category: 'Management', created: '3 days ago', questions: 30 },
    { name: 'Database Design', category: 'Programming', created: '1 week ago', questions: 20 },
  ];

  const handleNewAssessment = (mode: 'manual' | 'ai') => {
    setAssessmentMode(mode);
    setShowNewAssessmentModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-ai-gray-900">Dashboard</h1>
          <p className="text-ai-gray-600 mt-1">Welcome back! Here's what's happening with your assessments.</p>
        </div>
        
        <Dialog open={showNewAssessmentModal} onOpenChange={setShowNewAssessmentModal}>
          <DialogTrigger asChild>
            <Button className="bg-ai-blue hover:bg-ai-blue-600">
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
                className="w-full h-20 bg-white border-2 border-ai-gray-200 hover:border-ai-blue text-ai-gray-900"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-ai-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-ai-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-ai-gray-900 mt-2">{stat.value}</p>
                </div>
                <stat.icon className={`w-12 h-12 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Assessments */}
      <Card className="border-ai-gray-200">
        <CardHeader>
          <CardTitle className="text-ai-gray-900">Recent Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAssessments.map((assessment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-ai-gray-100">
                <div>
                  <h3 className="font-medium text-ai-gray-900">{assessment.name}</h3>
                  <p className="text-sm text-ai-gray-500">{assessment.category} • {assessment.questions} questions</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-ai-gray-500">{assessment.created}</p>
                  <Button variant="outline" size="sm" className="mt-1">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Assistant Modal */}
      {assessmentMode === 'ai' && (
        <Dialog open={true} onOpenChange={() => setAssessmentMode(null)}>
          <DialogContent className="max-w-6xl h-[80vh]">
            <AssessmentCreator />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Dashboard;
