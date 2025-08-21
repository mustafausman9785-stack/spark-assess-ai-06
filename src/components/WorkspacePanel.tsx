
import { useState, useEffect } from 'react';
import { LoadingStage } from './LoadingStage';
import { AssessmentPreview } from './AssessmentPreview';
import { AssessmentConfig, AppState } from './AssessmentCreator';
import { Brain, Sparkles } from 'lucide-react';

interface WorkspacePanelProps {
  appState: AppState;
  assessmentConfig: AssessmentConfig;
  onStateChange: (state: AppState) => void;
}

export const WorkspacePanel = ({ 
  appState, 
  assessmentConfig, 
  onStateChange 
}: WorkspacePanelProps) => {
  
  const renderContent = () => {
    switch (appState) {
      case 'chat':
        return <WelcomeScreen />;
      case 'loading':
        return (
          <LoadingStage 
            assessmentConfig={assessmentConfig} 
            onComplete={() => onStateChange('preview')} 
          />
        );
      case 'preview':
      case 'customizing':
        return <AssessmentPreview assessmentConfig={assessmentConfig} onStateChange={onStateChange} />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {renderContent()}
    </div>
  );
};

const WelcomeScreen = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-ai-blue-light rounded-full flex items-center justify-center mx-auto mb-6">
          <Brain className="w-10 h-10 text-ai-blue" />
        </div>
        
        <h2 className="text-2xl font-bold text-ai-gray-900 mb-4">
          AI Assessment Creator
        </h2>
        
        <p className="text-ai-gray-600 mb-6 leading-relaxed">
          Create professional assessments in minutes with our AI-powered platform. 
          Just tell our assistant what you need, and we'll handle the rest.
        </p>
        
        <div className="flex items-center justify-center space-x-2 text-ai-blue">
          <Sparkles className="w-5 h-5" />
          <span className="text-sm font-medium">Start chatting to begin</span>
        </div>
        
        <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
          <div className="bg-ai-gray-50 rounded-lg p-4">
            <div className="font-medium text-ai-gray-900 mb-1">Quick Setup</div>
            <div className="text-ai-gray-600">Guided conversation flow</div>
          </div>
          <div className="bg-ai-gray-50 rounded-lg p-4">
            <div className="font-medium text-ai-gray-900 mb-1">Smart Generation</div>
            <div className="text-ai-gray-600">AI-powered question creation</div>
          </div>
          <div className="bg-ai-gray-50 rounded-lg p-4">
            <div className="font-medium text-ai-gray-900 mb-1">Multiple Formats</div>
            <div className="text-ai-gray-600">Export to PDF, Word, LMS</div>
          </div>
          <div className="bg-ai-gray-50 rounded-lg p-4">
            <div className="font-medium text-ai-gray-900 mb-1">Easy Editing</div>
            <div className="text-ai-gray-600">Customize and refine content</div>
          </div>
        </div>
      </div>
    </div>
  );
};
