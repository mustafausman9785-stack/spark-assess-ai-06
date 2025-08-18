
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Save, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Question {
  id: string;
  type: 'mcq' | 'short' | 'essay';
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  points: number;
}

interface AssessmentForm {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  timeLimit: string;
  passingScore: string;
  instructions: string;
  questions: Question[];
}

interface ManualAssessmentFormProps {
  onSave: (assessment: AssessmentForm) => void;
  onCancel: () => void;
}

export const ManualAssessmentForm = ({ onSave, onCancel }: ManualAssessmentFormProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [assessment, setAssessment] = useState<AssessmentForm>({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    timeLimit: '',
    passingScore: '',
    instructions: '',
    questions: []
  });

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 1
    };
    setAssessment({ ...assessment, questions: [...assessment.questions, newQuestion] });
  };

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    setAssessment({
      ...assessment,
      questions: assessment.questions.map(q => 
        q.id === questionId ? { ...q, ...updates } : q
      )
    });
  };

  const removeQuestion = (questionId: string) => {
    setAssessment({
      ...assessment,
      questions: assessment.questions.filter(q => q.id !== questionId)
    });
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const question = assessment.questions.find(q => q.id === questionId);
    if (question && question.options) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const handleSave = () => {
    onSave(assessment);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-ai-gray-900">Create Manual Assessment</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPreview(true)}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} className="bg-ai-blue hover:bg-ai-blue-600">
            <Save className="w-4 h-4 mr-2" />
            Save Assessment
          </Button>
        </div>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Assessment Title *</Label>
              <Input
                id="title"
                value={assessment.title}
                onChange={(e) => setAssessment({ ...assessment, title: e.target.value })}
                placeholder="Enter assessment title"
              />
            </div>
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={assessment.category} onValueChange={(value) => setAssessment({ ...assessment, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                  <SelectItem value="project-management">Project Management</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={assessment.description}
              onChange={(e) => setAssessment({ ...assessment, description: e.target.value })}
              placeholder="Describe what this assessment covers"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select value={assessment.difficulty} onValueChange={(value) => setAssessment({ ...assessment, difficulty: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
              <Input
                id="timeLimit"
                type="number"
                value={assessment.timeLimit}
                onChange={(e) => setAssessment({ ...assessment, timeLimit: e.target.value })}
                placeholder="60"
              />
            </div>
            <div>
              <Label htmlFor="passingScore">Passing Score (%)</Label>
              <Input
                id="passingScore"
                type="number"
                value={assessment.passingScore}
                onChange={(e) => setAssessment({ ...assessment, passingScore: e.target.value })}
                placeholder="70"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="instructions">Instructions for Test Takers</Label>
            <Textarea
              id="instructions"
              value={assessment.instructions}
              onChange={(e) => setAssessment({ ...assessment, instructions: e.target.value })}
              placeholder="Enter any special instructions or guidelines"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Questions Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Questions ({assessment.questions.length})</CardTitle>
          <Button onClick={addQuestion} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {assessment.questions.map((question, index) => (
            <Card key={question.id} className="border-ai-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Q{index + 1}</Badge>
                    <Select
                      value={question.type}
                      onValueChange={(value: 'mcq' | 'short' | 'essay') => {
                        const updates: Partial<Question> = { type: value };
                        if (value === 'mcq' && !question.options) {
                          updates.options = ['', '', '', ''];
                          updates.correctAnswer = 0;
                        }
                        updateQuestion(question.id, updates);
                      }}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mcq">Multiple Choice</SelectItem>
                        <SelectItem value="short">Short Answer</SelectItem>
                        <SelectItem value="essay">Essay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Points:</Label>
                    <Input
                      type="number"
                      value={question.points}
                      onChange={(e) => updateQuestion(question.id, { points: parseInt(e.target.value) || 1 })}
                      className="w-16"
                      min="1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(question.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Question Text *</Label>
                  <Textarea
                    value={question.question}
                    onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                    placeholder="Enter your question here"
                    rows={2}
                  />
                </div>

                {question.type === 'mcq' && question.options && (
                  <div className="space-y-3">
                    <Label>Answer Options</Label>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct-${question.id}`}
                          checked={question.correctAnswer === optionIndex}
                          onChange={() => updateQuestion(question.id, { correctAnswer: optionIndex })}
                          className="text-ai-blue"
                        />
                        <Label className="text-sm min-w-0">{String.fromCharCode(65 + optionIndex)})</Label>
                        <Input
                          value={option}
                          onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                          placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                          className="flex-1"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {question.type === 'short' && (
                  <div>
                    <Label>Sample Answer (for reference)</Label>
                    <Input
                      value={question.correctAnswer as string || ''}
                      onChange={(e) => updateQuestion(question.id, { correctAnswer: e.target.value })}
                      placeholder="Expected answer or key points"
                    />
                  </div>
                )}

                {question.type === 'essay' && (
                  <div>
                    <Label>Grading Rubric (optional)</Label>
                    <Textarea
                      value={question.correctAnswer as string || ''}
                      onChange={(e) => updateQuestion(question.id, { correctAnswer: e.target.value })}
                      placeholder="Describe the key points or criteria for grading this essay"
                      rows={2}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {assessment.questions.length === 0 && (
            <div className="text-center py-8 text-ai-gray-500">
              <p>No questions added yet. Click "Add Question" to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-ai-blue hover:bg-ai-blue-600">
          Save Assessment
        </Button>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Assessment Preview: {assessment.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-ai-blue-light p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Assessment Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Category:</strong> {assessment.category}</div>
                <div><strong>Difficulty:</strong> {assessment.difficulty}</div>
                <div><strong>Time Limit:</strong> {assessment.timeLimit} minutes</div>
                <div><strong>Passing Score:</strong> {assessment.passingScore}%</div>
              </div>
              {assessment.description && (
                <div className="mt-2">
                  <strong>Description:</strong> {assessment.description}
                </div>
              )}
            </div>

            <div className="space-y-4">
              {assessment.questions.map((question, index) => (
                <Card key={question.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">Question {index + 1}</h4>
                      <Badge variant="outline">{question.points} pt{question.points !== 1 ? 's' : ''}</Badge>
                    </div>
                    <p className="mb-3">{question.question}</p>
                    
                    {question.type === 'mcq' && question.options && (
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className={`p-2 rounded ${question.correctAnswer === optionIndex ? 'bg-green-50 border-green-200 border' : 'bg-gray-50'}`}>
                            {String.fromCharCode(65 + optionIndex)}) {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
