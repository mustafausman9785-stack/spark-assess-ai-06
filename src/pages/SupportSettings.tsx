
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SupportSettings = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator'
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    assessmentReminders: false,
    weeklyReports: true,
    systemUpdates: true
  });
  const [assessmentDefaults, setAssessmentDefaults] = useState({
    defaultDifficulty: 'Medium',
    defaultQuestionCount: '10',
    defaultQuestionType: 'MCQs'
  });

  const faqItems = [
    {
      question: 'How do I create a new assessment?',
      answer: 'You can create a new assessment by clicking the "New Assessment" button on the dashboard and choosing either manual creation or AI assistance.'
    },
    {
      question: 'Can I modify questions after creating an assessment?',
      answer: 'Yes, you can edit questions at any time by going to the assessment preview and clicking the "Customize" button.'
    },
    {
      question: 'How do I export assessments to different formats?',
      answer: 'After creating an assessment, you can use the export options to download as PDF, Word document, or export directly to supported LMS platforms.'
    },
    {
      question: 'Is there a limit to the number of questions per assessment?',
      answer: 'There is no hard limit, but we recommend keeping assessments between 10-50 questions for optimal user experience.'
    },
    {
      question: 'How can I track student progress?',
      answer: 'Use the Reports section to view detailed analytics including completion rates, average scores, and performance trends.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleSaveProfile = () => {
    // Simulate save action
    alert('Profile settings saved successfully!');
  };

  const handleSaveNotifications = () => {
    alert('Notification preferences saved successfully!');
  };

  const handleSaveDefaults = () => {
    alert('Default assessment preferences saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ai-gray-900">Support & Settings</h1>
        <p className="text-ai-gray-600 mt-1">Get help and manage your preferences</p>
      </div>

      <Tabs defaultValue="support" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="support">Support</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="support" className="space-y-6">
          {/* FAQ Section */}
          <Card className="border-ai-gray-200">
            <CardHeader>
              <CardTitle className="text-ai-gray-900">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-ai-gray-100 pb-4 last:border-b-0">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <h3 className="font-medium text-ai-gray-900">{item.question}</h3>
                      {expandedFAQ === index ? (
                        <ChevronDown className="w-5 h-5 text-ai-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-ai-gray-500" />
                      )}
                    </button>
                    {expandedFAQ === index && (
                      <p className="mt-3 text-ai-gray-600">{item.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="border-ai-gray-200">
            <CardHeader>
              <CardTitle className="text-ai-gray-900">Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="support-name">Name</Label>
                    <Input id="support-name" placeholder="Your name" />
                  </div>
                  <div>
                    <Label htmlFor="support-email">Email</Label>
                    <Input id="support-email" type="email" placeholder="your.email@example.com" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="support-message">Message</Label>
                  <Textarea 
                    id="support-message" 
                    placeholder="Describe your issue or question..." 
                    rows={4}
                  />
                </div>
                <Button className="bg-ai-blue hover:bg-ai-blue-600">Send Message</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Profile Settings */}
          <Card className="border-ai-gray-200">
            <CardHeader>
              <CardTitle className="text-ai-gray-900">Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="profile-name">Name</Label>
                  <Input
                    id="profile-name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="profile-email">Email</Label>
                  <Input
                    id="profile-email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="profile-role">Role</Label>
                  <Select value={profile.role} onValueChange={(value) => setProfile({ ...profile, role: value })}>
                    <SelectTrigger id="profile-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administrator">Administrator</SelectItem>
                      <SelectItem value="Instructor">Instructor</SelectItem>
                      <SelectItem value="Student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSaveProfile} className="bg-ai-blue hover:bg-ai-blue-600">
                  Save Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="border-ai-gray-200">
            <CardHeader>
              <CardTitle className="text-ai-gray-900">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-ai-gray-500">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, emailNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="assessment-reminders">Assessment Reminders</Label>
                    <p className="text-sm text-ai-gray-500">Get reminded about upcoming assessments</p>
                  </div>
                  <Switch
                    id="assessment-reminders"
                    checked={notifications.assessmentReminders}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, assessmentReminders: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-reports">Weekly Reports</Label>
                    <p className="text-sm text-ai-gray-500">Receive weekly performance summaries</p>
                  </div>
                  <Switch
                    id="weekly-reports"
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, weeklyReports: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="system-updates">System Updates</Label>
                    <p className="text-sm text-ai-gray-500">Get notified about system updates</p>
                  </div>
                  <Switch
                    id="system-updates"
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, systemUpdates: checked })
                    }
                  />
                </div>
                <Button onClick={handleSaveNotifications} className="bg-ai-blue hover:bg-ai-blue-600">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Default Assessment Preferences */}
          <Card className="border-ai-gray-200">
            <CardHeader>
              <CardTitle className="text-ai-gray-900">Default Assessment Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="default-difficulty">Default Difficulty</Label>
                  <Select 
                    value={assessmentDefaults.defaultDifficulty} 
                    onValueChange={(value) => 
                      setAssessmentDefaults({ ...assessmentDefaults, defaultDifficulty: value })
                    }
                  >
                    <SelectTrigger id="default-difficulty">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                      <SelectItem value="Mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="default-question-count">Default Question Count</Label>
                  <Select 
                    value={assessmentDefaults.defaultQuestionCount} 
                    onValueChange={(value) => 
                      setAssessmentDefaults({ ...assessmentDefaults, defaultQuestionCount: value })
                    }
                  >
                    <SelectTrigger id="default-question-count">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="default-question-type">Default Question Type</Label>
                  <Select 
                    value={assessmentDefaults.defaultQuestionType} 
                    onValueChange={(value) => 
                      setAssessmentDefaults({ ...assessmentDefaults, defaultQuestionType: value })
                    }
                  >
                    <SelectTrigger id="default-question-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MCQs">MCQs</SelectItem>
                      <SelectItem value="Short Answers">Short Answers</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSaveDefaults} className="bg-ai-blue hover:bg-ai-blue-600">
                  Save Defaults
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportSettings;
