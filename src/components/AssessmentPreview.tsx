import { useState } from 'react';
import { Download, Edit3, CheckCircle, FileText, FileImage, Upload, Eye, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AssessmentConfig, AppState } from './AssessmentCreator';

interface AssessmentPreviewProps {
  assessmentConfig: AssessmentConfig;
  onStateChange: (state: AppState) => void;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

const dummyQuestions: Question[] = [
  {
    id: '1',
    question: 'What is the main goal of cybersecurity?',
    options: [
      'Protecting digital assets',
      'Securing networks only', 
      'Preventing all attacks',
      'All of the above'
    ],
    correctAnswer: 'All of the above',
    explanation: 'Cybersecurity encompasses protecting all digital assets, securing networks, and preventing various types of attacks.'
  },
  {
    id: '2', 
    question: 'Which of the following is considered the weakest link in cybersecurity?',
    options: [
      'Outdated software',
      'Human error',
      'Weak passwords',
      'Unpatched systems'
    ],
    correctAnswer: 'Human error',
    explanation: 'While all options are security risks, human error is often cited as the weakest link in cybersecurity.'
  },
  {
    id: '3',
    question: 'What does the principle of "least privilege" mean in cybersecurity?',
    options: [
      'Giving users maximum access for convenience',
      'Providing users only the minimum access needed to perform their job',
      'Restricting all access to administrators only',
      'Allowing full access during business hours only'
    ],
    correctAnswer: 'Providing users only the minimum access needed to perform their job'
  },
  {
    id: '4',
    question: 'Which type of attack uses deceptive emails to trick users into revealing sensitive information?',
    options: [
      'Malware',
      'Phishing', 
      'DDoS',
      'SQL Injection'
    ],
    correctAnswer: 'Phishing'
  },
  {
    id: '5',
    question: 'What is two-factor authentication (2FA)?',
    options: [
      'Using two different passwords',
      'Logging in twice',
      'Using two different verification methods',
      'Having two user accounts'
    ],
    correctAnswer: 'Using two different verification methods'
  }
];

export const AssessmentPreview = ({ assessmentConfig, onStateChange }: AssessmentPreviewProps) => {
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set());
  const [showExplanations, setShowExplanations] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>(
    dummyQuestions.slice(0, parseInt(assessmentConfig.questionCount))
  );

  const questionsToShow = questions;

  const toggleQuestionSelection = (questionId: string) => {
    const newSelection = new Set(selectedQuestions);
    if (newSelection.has(questionId)) {
      newSelection.delete(questionId);
    } else {
      newSelection.add(questionId);
    }
    setSelectedQuestions(newSelection);
  };

  const handleEditQuestion = (questionId: string) => {
    setEditingQuestion(questionId);
    setIsEditing(true);
  };

  const handleSaveQuestion = (questionId: string, updatedQuestion: Partial<Question>) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, ...updatedQuestion } : q
    ));
    setEditingQuestion(null);
    setIsEditing(false);
  };

  const handleManualEditMode = () => {
    onStateChange('customizing');
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-ai-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-ai-gray-900 mb-2">
              {assessmentConfig.topic} Assessment
            </h2>
            <div className="flex items-center space-x-6 text-sm text-ai-gray-600">
              <div className="flex items-center space-x-1">
                <span className="font-medium">Difficulty:</span>
                <span className="px-2 py-1 bg-ai-blue-50 text-ai-blue rounded-full text-xs font-medium">
                  {assessmentConfig.difficulty}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-medium">Questions:</span>
                <span>{assessmentConfig.questionCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-medium">Type:</span>
                <span>{assessmentConfig.questionType}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExplanations(!showExplanations)}
              className="action-button-secondary"
            >
              <Eye className="w-4 h-4 mr-2" />
              {showExplanations ? 'Hide' : 'Show'} Explanations
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleManualEditMode}
              className="action-button-secondary"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Manual Edit Mode
            </Button>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {questionsToShow.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              showExplanations={showExplanations}
              isEditing={editingQuestion === question.id}
              onEdit={() => handleEditQuestion(question.id)}
              onSave={(updatedQuestion) => handleSaveQuestion(question.id, updatedQuestion)}
              onCancel={() => setEditingQuestion(null)}
            />
          ))}
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white border-t border-ai-gray-200 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 grid grid-cols-3 gap-3">
              <Button className="action-button-primary">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="action-button-secondary">
                <FileText className="w-4 h-4 mr-2" />
                Download Word
              </Button>
              <Button variant="outline" className="action-button-secondary">
                <Upload className="w-4 h-4 mr-2" />
                Export to LMS
              </Button>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={handleManualEditMode}
                className="action-button-secondary"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Customize
              </Button>
              <Button className="action-button-primary">
                <CheckCircle className="w-4 h-4 mr-2" />
                Finalize
              </Button>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-ai-gray-500">
              Assessment ready for review • {questionsToShow.length} questions generated • 
              Estimated completion time: {Math.ceil(questionsToShow.length * 1.5)} minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Separate component for individual question cards to keep things organized
const QuestionCard = ({ 
  question, 
  index, 
  showExplanations, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel 
}: {
  question: Question;
  index: number;
  showExplanations: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (updatedQuestion: Partial<Question>) => void;
  onCancel: () => void;
}) => {
  const [editedQuestion, setEditedQuestion] = useState(question.question);
  const [editedOptions, setEditedOptions] = useState(question.options);
  const [editedCorrectAnswer, setEditedCorrectAnswer] = useState(question.correctAnswer);
  const [editedExplanation, setEditedExplanation] = useState(question.explanation || '');

  const handleSave = () => {
    onSave({
      question: editedQuestion,
      options: editedOptions,
      correctAnswer: editedCorrectAnswer,
      explanation: editedExplanation
    });
  };

  if (isEditing) {
    return (
      <div className="question-card animate-fade-in border-ai-blue">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 bg-ai-blue-50 text-ai-blue rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm">
              {index + 1}
            </div>
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ai-gray-700 mb-2">Question</label>
              <Textarea
                value={editedQuestion}
                onChange={(e) => setEditedQuestion(e.target.value)}
                className="w-full"
                rows={2}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-ai-gray-700 mb-2">Options</label>
              <div className="space-y-2">
                {editedOptions.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <span className="w-6 h-6 bg-ai-gray-100 rounded-full flex items-center justify-center text-xs font-semibold">
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...editedOptions];
                        newOptions[optionIndex] = e.target.value;
                        setEditedOptions(newOptions);
                      }}
                      className="flex-1"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-ai-gray-700 mb-2">Correct Answer</label>
              <select
                value={editedCorrectAnswer}
                onChange={(e) => setEditedCorrectAnswer(e.target.value)}
                className="w-full p-2 border border-ai-gray-300 rounded-md"
              >
                {editedOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-ai-gray-700 mb-2">Explanation (Optional)</label>
              <Textarea
                value={editedExplanation}
                onChange={(e) => setEditedExplanation(e.target.value)}
                className="w-full"
                rows={2}
                placeholder="Add an explanation for the correct answer..."
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="question-card animate-fade-in">
      <div className="flex items-start space-x-4">
        <div className="w-8 h-8 bg-ai-blue-50 text-ai-blue rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm">
          {index + 1}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-semibold text-ai-gray-900 text-lg leading-relaxed flex-1">
              {question.question}
            </h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={onEdit}
              className="ml-4 hover:bg-ai-gray-100"
            >
              <Edit3 className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {question.options.map((option, optionIndex) => {
              const isCorrect = option === question.correctAnswer;
              const letter = String.fromCharCode(65 + optionIndex); // A, B, C, D
              
              return (
                <div
                  key={optionIndex}
                  className={`
                    flex items-center p-3 rounded-lg border transition-all duration-200 cursor-pointer
                    ${isCorrect && showExplanations
                      ? 'bg-success-light border-success text-success'
                      : 'bg-ai-gray-50 border-ai-gray-200 hover:bg-ai-gray-100'
                    }
                  `}
                >
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mr-3
                    ${isCorrect && showExplanations
                      ? 'bg-success text-white'
                      : 'bg-white border-2 border-ai-gray-300 text-ai-gray-600'
                    }
                  `}>
                    {letter}
                  </div>
                  <span className={`
                    ${isCorrect && showExplanations ? 'font-medium' : ''}
                  `}>
                    {option}
                  </span>
                  {isCorrect && showExplanations && (
                    <CheckCircle className="w-4 h-4 ml-auto text-success" />
                  )}
                </div>
              );
            })}
          </div>
          
          {showExplanations && question.explanation && (
            <div className="mt-4 p-3 bg-ai-blue-50 border-l-4 border-ai-blue rounded-r-lg">
              <div className="flex items-start space-x-2">
                <div className="text-ai-blue font-medium text-sm">Explanation:</div>
              </div>
              <p className="text-ai-gray-700 text-sm mt-1">{question.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
