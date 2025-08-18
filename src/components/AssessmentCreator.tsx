
import { useState, useEffect } from 'react';
import { ChatInterface } from './ChatInterface';
import { WorkspacePanel } from './WorkspacePanel';

export interface AssessmentConfig {
  topic: string;
  difficulty: string;
  questionCount: string;
  questionType: string;
}

export type AppState = 
  | 'chat'
  | 'loading'
  | 'preview'
  | 'customizing';

const AssessmentCreator = () => {
  const [appState, setAppState] = useState<AppState>('chat');
  const [assessmentConfig, setAssessmentConfig] = useState<AssessmentConfig>({
    topic: '',
    difficulty: '',
    questionCount: '',
    questionType: ''
  });

  return (
    <div className="min-h-screen bg-ai-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-ai-gray-200">
        <div className="max-w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-ai-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-ai-gray-900">
                  Assessment Creator
                </h1>
                <p className="text-sm text-ai-gray-500">
                  AI-powered assessment generation platform
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="px-3 py-1 bg-ai-blue-50 text-ai-blue text-sm font-medium rounded-full">
                Beta
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Workspace (70%) */}
        <div className="flex-1 w-[70%] bg-white">
          <WorkspacePanel 
            appState={appState}
            assessmentConfig={assessmentConfig}
            onStateChange={setAppState}
          />
        </div>

        {/* Right Panel - Chat (30%) */}
        <div className="w-[30%] border-l border-ai-gray-200 bg-ai-gray-50">
          <ChatInterface 
            appState={appState}
            assessmentConfig={assessmentConfig}
            onConfigChange={setAssessmentConfig}
            onStateChange={setAppState}
          />
        </div>
      </div>
    </div>
  );
};

export default AssessmentCreator;
