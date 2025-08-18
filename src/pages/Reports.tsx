
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Reports = () => {
  const [selectedAssessment, setSelectedAssessment] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '2024-01-01', to: '2024-12-31' });

  // Dummy data for charts
  const avgScoresData = [
    { name: 'Cybersecurity', score: 78 },
    { name: 'Programming', score: 85 },
    { name: 'Project Mgmt', score: 72 },
    { name: 'Data Science', score: 80 },
    { name: 'Marketing', score: 76 },
  ];

  const completionRateData = [
    { name: 'Completed', value: 65, color: '#10B981' },
    { name: 'In Progress', value: 25, color: '#F59E0B' },
    { name: 'Not Started', value: 10, color: '#EF4444' },
  ];

  const trendsData = [
    { month: 'Jan', assessments: 120 },
    { month: 'Feb', assessments: 132 },
    { month: 'Mar', assessments: 141 },
    { month: 'Apr', assessments: 138 },
    { month: 'May', assessments: 156 },
    { month: 'Jun', assessments: 142 },
  ];

  const chartConfig = {
    score: { label: "Average Score", color: "#2563EB" },
    assessments: { label: "Assessments", color: "#2563EB" },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ai-gray-900">Reports</h1>
        <p className="text-ai-gray-600 mt-1">Analyze assessment performance and trends</p>
      </div>

      {/* Filters */}
      <Card className="border-ai-gray-200">
        <CardHeader>
          <CardTitle className="text-ai-gray-900">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Average Scores Bar Chart */}
        <Card className="border-ai-gray-200">
          <CardHeader>
            <CardTitle className="text-ai-gray-900">Average Scores by Category</CardTitle>
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
            <CardTitle className="text-ai-gray-900">Assessment Completion Rate</CardTitle>
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
          </CardContent>
        </Card>
      </div>

      {/* Trends Line Chart */}
      <Card className="border-ai-gray-200">
        <CardHeader>
          <CardTitle className="text-ai-gray-900">Assessment Trends (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendsData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="assessments" 
                  stroke="var(--color-assessments)" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
