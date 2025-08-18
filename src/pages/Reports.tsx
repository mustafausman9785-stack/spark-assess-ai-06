
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Download, Filter, TrendingUp, Users, Award, Target } from 'lucide-react';

const Reports = () => {
  const [selectedAssessment, setSelectedAssessment] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '2024-01-01', to: '2024-12-31' });
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Enhanced dummy data
  const avgScoresData = [
    { name: 'Cybersecurity', score: 78, participants: 145, improvement: 5.2 },
    { name: 'Programming', score: 85, participants: 203, improvement: 3.1 },
    { name: 'Project Mgmt', score: 72, participants: 98, improvement: -1.2 },
    { name: 'Data Science', score: 80, participants: 167, improvement: 7.8 },
    { name: 'Marketing', score: 76, participants: 89, improvement: 2.4 },
    { name: 'Design', score: 82, participants: 76, improvement: 4.1 },
  ];

  const completionRateData = [
    { name: 'Completed', value: 65, color: '#10B981', count: 1853 },
    { name: 'In Progress', value: 25, color: '#F59E0B', count: 712 },
    { name: 'Not Started', value: 10, color: '#EF4444', count: 285 },
  ];

  const trendsData = [
    { month: 'Jan', assessments: 120, completionRate: 68, avgScore: 74 },
    { month: 'Feb', assessments: 132, completionRate: 72, avgScore: 76 },
    { month: 'Mar', assessments: 141, completionRate: 69, avgScore: 78 },
    { month: 'Apr', assessments: 138, completionRate: 75, avgScore: 77 },
    { month: 'May', assessments: 156, completionRate: 78, avgScore: 79 },
    { month: 'Jun', assessments: 142, completionRate: 71, avgScore: 80 },
  ];

  const performanceByDifficulty = [
    { difficulty: 'Easy', avgScore: 87, passRate: 92, participants: 324 },
    { difficulty: 'Medium', avgScore: 75, passRate: 78, participants: 567 },
    { difficulty: 'Hard', avgScore: 62, passRate: 54, participants: 189 },
  ];

  const departmentPerformance = [
    { department: 'Engineering', avgScore: 82, completionRate: 78, assessments: 45 },
    { department: 'Marketing', avgScore: 76, completionRate: 85, assessments: 32 },
    { department: 'Sales', avgScore: 71, completionRate: 72, assessments: 28 },
    { department: 'HR', avgScore: 79, completionRate: 91, assessments: 19 },
    { department: 'Finance', avgScore: 77, completionRate: 68, assessments: 23 },
  ];

  const skillGapAnalysis = [
    { skill: 'Technical Skills', current: 65, target: 85, gap: 20 },
    { skill: 'Communication', current: 78, target: 90, gap: 12 },
    { skill: 'Leadership', current: 62, target: 80, gap: 18 },
    { skill: 'Problem Solving', current: 71, target: 85, gap: 14 },
    { skill: 'Teamwork', current: 82, target: 90, gap: 8 },
  ];

  const topPerformers = [
    { name: 'Alice Johnson', department: 'Engineering', avgScore: 94, assessments: 8 },
    { name: 'Bob Smith', department: 'Marketing', avgScore: 91, assessments: 6 },
    { name: 'Carol Davis', department: 'Finance', avgScore: 89, assessments: 7 },
    { name: 'David Wilson', department: 'HR', avgScore: 88, assessments: 5 },
    { name: 'Eva Brown', department: 'Sales', avgScore: 87, assessments: 9 },
  ];

  const chartConfig = {
    score: { label: "Average Score", color: "#2563EB" },
    assessments: { label: "Assessments", color: "#2563EB" },
    completionRate: { label: "Completion Rate", color: "#10B981" },
    participants: { label: "Participants", color: "#F59E0B" },
  };

  const exportReport = () => {
    console.log('Exporting report...');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-ai-gray-900">Analytics & Reports</h1>
          <p className="text-ai-gray-600 mt-1">Comprehensive assessment performance insights</p>
        </div>
        <Button onClick={exportReport} className="bg-ai-blue hover:bg-ai-blue-600 w-full sm:w-auto">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-ai-gray-200">
        <CardHeader>
          <CardTitle className="text-ai-gray-900 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters & Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-ai-gray-700 mb-2 block">Assessment</label>
              <Select value={selectedAssessment} onValueChange={setSelectedAssessment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select assessment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assessments</SelectItem>
                  <SelectItem value="cybersecurity">Cybersecurity Fundamentals</SelectItem>
                  <SelectItem value="react">React Development Quiz</SelectItem>
                  <SelectItem value="pm">Project Management</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-ai-gray-700 mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="soft-skills">Soft Skills</SelectItem>
                  <SelectItem value="leadership">Leadership</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-ai-gray-700 mb-2 block">Date From</label>
              <Input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-ai-gray-700 mb-2 block">Date To</label>
              <Input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              />
            </div>
          </div>
          <Button className="mt-4 bg-ai-blue hover:bg-ai-blue-600">Apply Filters</Button>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-ai-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ai-gray-600">Total Participants</p>
                <p className="text-3xl font-bold text-ai-gray-900">2,850</p>
                <p className="text-sm text-green-600">+12% this month</p>
              </div>
              <Users className="w-12 h-12 text-ai-blue" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-ai-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ai-gray-600">Average Score</p>
                <p className="text-3xl font-bold text-ai-gray-900">78.5%</p>
                <p className="text-sm text-green-600">+2.1% improvement</p>
              </div>
              <Award className="w-12 h-12 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-ai-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ai-gray-600">Completion Rate</p>
                <p className="text-3xl font-bold text-ai-gray-900">75.2%</p>
                <p className="text-sm text-green-600">+5.8% this month</p>
              </div>
              <Target className="w-12 h-12 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-ai-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ai-gray-600">Trending Up</p>
                <p className="text-3xl font-bold text-ai-gray-900">6</p>
                <p className="text-sm text-ai-gray-600">categories improved</p>
              </div>
              <TrendingUp className="w-12 h-12 text-ai-blue" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Average Scores by Category */}
        <Card className="border-ai-gray-200">
          <CardHeader>
            <CardTitle className="text-ai-gray-900">Performance by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={avgScoresData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="score" fill="var(--color-score)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Completion Rate Pie Chart */}
        <Card className="border-ai-gray-200">
          <CardHeader>
            <CardTitle className="text-ai-gray-900">Assessment Completion Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={completionRateData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {completionRateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex justify-center gap-4 mt-4">
              {completionRateData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name}: {item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends and Department Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trends Line Chart */}
        <Card className="border-ai-gray-200">
          <CardHeader>
            <CardTitle className="text-ai-gray-900">Assessment Trends (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendsData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="assessments" 
                    stroke="var(--color-assessments)" 
                    fill="var(--color-assessments)"
                    fillOpacity={0.3}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgScore" 
                    stroke="var(--color-score)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card className="border-ai-gray-200">
          <CardHeader>
            <CardTitle className="text-ai-gray-900">Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentPerformance.map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-ai-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{dept.department}</h4>
                    <p className="text-sm text-ai-gray-600">{dept.assessments} assessments</p>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-2">
                      <Badge variant="outline">Score: {dept.avgScore}%</Badge>
                      <Badge variant="outline">Completion: {dept.completionRate}%</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Gap Analysis and Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Gap Analysis */}
        <Card className="border-ai-gray-200">
          <CardHeader>
            <CardTitle className="text-ai-gray-900">Skill Gap Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillGapAnalysis.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{skill.skill}</span>
                    <span className="text-sm text-ai-gray-600">Gap: {skill.gap}%</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-ai-gray-200 rounded-full h-2">
                      <div 
                        className="bg-ai-blue h-2 rounded-full" 
                        style={{ width: `${skill.current}%` }}
                      ></div>
                      <div 
                        className="absolute top-0 h-2 w-1 bg-red-500 rounded" 
                        style={{ left: `${skill.target}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-ai-gray-500 mt-1">
                      <span>Current: {skill.current}%</span>
                      <span>Target: {skill.target}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="border-ai-gray-200">
          <CardHeader>
            <CardTitle className="text-ai-gray-900">Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-ai-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-ai-blue rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{performer.name}</h4>
                      <p className="text-sm text-ai-gray-600">{performer.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-ai-blue">{performer.avgScore}%</div>
                    <div className="text-sm text-ai-gray-600">{performer.assessments} tests</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
