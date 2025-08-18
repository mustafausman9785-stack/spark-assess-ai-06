
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
    <div className="h-full bg-ai-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-ai-gray-200 flex-shrink-0">
        <div className="px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-ai-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-semibold text-ai-gray-900">
                  Assessment Creator
                </h1>
                <p className="text-sm text-ai-gray-500 hidden sm:block">
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
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel - Workspace */}
        <div className="flex-1 lg:w-[70%] bg-white order-2 lg:order-1">
          <WorkspacePanel 
            appState={appState}
            assessmentConfig={assessmentConfig}
            onStateChange={setAppState}
          />
        </div>

        {/* Right Panel - Chat */}
        <div className="w-full lg:w-[30%] border-t lg:border-t-0 lg:border-l border-ai-gray-200 bg-ai-gray-50 order-1 lg:order-2 min-h-[300px] lg:min-h-0">
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
