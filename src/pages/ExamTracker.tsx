
import { useState } from 'react';
import { Calendar, Clock, Users, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ExamTracker = () => {
  const upcomingExams = [
    {
      id: 1,
      name: 'Cybersecurity Final Assessment',
      date: '2024-02-15',
      time: '14:00',
      participants: 45,
      status: 'scheduled'
    },
    {
      id: 2,
      name: 'React Development Quiz',
      date: '2024-02-18',
      time: '10:30',
      participants: 32,
      status: 'scheduled'
    },
    {
      id: 3,
      name: 'Project Management Midterm',
      date: '2024-02-20',
      time: '09:00',
      participants: 28,
      status: 'scheduled'
    },
  ];

  const ongoingExams = [
    {
      id: 4,
      name: 'Database Design Assessment',
      date: '2024-02-12',
      time: '11:00',
      participants: 38,
      status: 'in-progress',
      completed: 23,
      remaining: 15
    },
    {
      id: 5,
      name: 'Digital Marketing Quiz',
      date: '2024-02-12',
      time: '13:30',
      participants: 19,
      status: 'in-progress',
      completed: 12,
      remaining: 7
    },
  ];

  const completedExams = [
    {
      id: 6,
      name: 'Python Programming Test',
      date: '2024-02-10',
      time: '15:00',
      participants: 41,
      status: 'completed',
      avgScore: 82.5,
      passRate: 95
    },
    {
      id: 7,
      name: 'Data Analysis Quiz',
      date: '2024-02-08',
      time: '10:00',
      participants: 29,
      status: 'completed',
      avgScore: 78.2,
      passRate: 89
    },
    {
      id: 8,
      name: 'Web Development Assessment',
      date: '2024-02-05',
      time: '14:30',
      participants: 35,
      status: 'completed',
      avgScore: 85.1,
      passRate: 97
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-ai-blue-light text-ai-blue">Scheduled</Badge>;
      case 'in-progress':
        return <Badge className="bg-warning-light text-warning">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-success-light text-success">Completed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ai-gray-900">Exam Tracker</h1>
        <p className="text-ai-gray-600 mt-1">Monitor and manage all your assessments</p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="space-y-4">
            {upcomingExams.map((exam) => (
              <Card key={exam.id} className="border-ai-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-ai-gray-900 mb-2">{exam.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-ai-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exam.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{exam.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{exam.participants} participants</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(exam.status)}
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Reschedule</Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ongoing">
          <div className="space-y-4">
            {ongoingExams.map((exam) => (
              <Card key={exam.id} className="border-ai-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-ai-gray-900 mb-2">{exam.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-ai-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exam.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{exam.time}</span>
                        </div>
                      </div>
                      <div className="text-sm text-ai-gray-600">
                        <span className="text-success font-medium">{exam.completed} completed</span>
                        <span className="mx-2">•</span>
                        <span className="text-warning font-medium">{exam.remaining} remaining</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(exam.status)}
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Monitor</Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="space-y-4">
            {completedExams.map((exam) => (
              <Card key={exam.id} className="border-ai-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-ai-gray-900 mb-2">{exam.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-ai-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exam.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{exam.participants} participants</span>
                        </div>
                      </div>
                      <div className="text-sm text-ai-gray-600">
                        <span>Avg Score: <span className="font-medium text-ai-blue">{exam.avgScore}%</span></span>
                        <span className="mx-2">•</span>
                        <span>Pass Rate: <span className="font-medium text-success">{exam.passRate}%</span></span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(exam.status)}
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View Results</Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamTracker;
