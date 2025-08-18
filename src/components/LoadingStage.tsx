
import { useState, useEffect } from 'react';
import { Search, Brain, FileText, CheckCircle } from 'lucide-react';
import { AssessmentConfig } from './AssessmentCreator';

interface LoadingStageProps {
  assessmentConfig: AssessmentConfig;
  onComplete: () => void;
}

interface Stage {
  id: string;
  label: string;
  icon: React.ReactNode;
  status: 'pending' | 'loading' | 'complete';
}

export const LoadingStage = ({ assessmentConfig, onComplete }: LoadingStageProps) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const stages: Stage[] = [
    {
      id: 'analyzing',
      label: 'Analyzing requirements',
      icon: <Search className="w-5 h-5" />,
      status: 'complete'
    },
    {
      id: 'generating',
      label: 'Generating questions',
      icon: <Brain className="w-5 h-5" />,
      status: currentStageIndex >= 1 ? 'loading' : 'pending'
    },
    {
      id: 'formatting',
      label: 'Formatting assessment',
      icon: <FileText className="w-5 h-5" />,
      status: currentStageIndex >= 2 ? (currentStageIndex > 2 ? 'complete' : 'loading') : 'pending'
    },
    {
      id: 'finalizing',
      label: 'Finalizing content',
      icon: <CheckCircle className="w-5 h-5" />,
      status: currentStageIndex >= 3 ? 'complete' : 'pending'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStageIndex(prev => {
        if (prev < 3) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => onComplete(), 1000);
          return prev;
        }
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    setProgress((currentStageIndex + 1) / stages.length * 100);
  }, [currentStageIndex, stages.length]);

  const getStageStatus = (index: number): 'pending' | 'loading' | 'complete' => {
    if (index < currentStageIndex) return 'complete';
    if (index === currentStageIndex) return 'loading';
    return 'pending';
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-ai-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-ai-gray-900 mb-2">
            Creating Your Assessment
          </h2>
          <p className="text-ai-gray-600">
            Generating {assessmentConfig.questionCount} {assessmentConfig.questionType.toLowerCase()} questions 
            about {assessmentConfig.topic}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-ai-gray-700">Progress</span>
            <span className="text-sm font-medium text-ai-blue">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-ai-gray-200 rounded-full h-2">
            <div 
              className="bg-ai-blue h-2 rounded-full transition-all duration-500 ease-out pulse-progress"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stages */}
        <div className="space-y-4">
          {stages.map((stage, index) => {
            const status = getStageStatus(index);
            return (
              <div
                key={stage.id}
                className={`progress-step ${
                  status === 'complete' 
                    ? 'progress-step-complete' 
                    : status === 'loading' 
                    ? 'progress-step-loading' 
                    : 'progress-step-pending'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                    ${status === 'complete' 
                      ? 'bg-success-light text-success' 
                      : status === 'loading' 
                      ? 'bg-ai-blue-50 text-ai-blue' 
                      : 'bg-ai-gray-100 text-ai-gray-400'
                    }
                  `}>
                    {status === 'complete' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : status === 'loading' ? (
                      <div className="animate-spin">
                        {stage.icon}
                      </div>
                    ) : (
                      stage.icon
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-medium">
                      {stage.label}
                      {status === 'loading' && (
                        <span className="ml-2 typing-dots text-ai-blue">
                          <span className="animate-typing"></span>
                          <span className="animate-typing" style={{ animationDelay: '0.16s' }}></span>
                          <span className="animate-typing" style={{ animationDelay: '0.32s' }}></span>
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {status === 'complete' && (
                    <CheckCircle className="w-5 h-5 text-success" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion Message */}
        {currentStageIndex >= 3 && (
          <div className="mt-8 p-4 bg-success-light rounded-lg border border-success/20 animate-fade-in">
            <div className="flex items-center space-x-2 text-success">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Assessment generated successfully!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
