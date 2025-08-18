import { useState, useEffect } from 'react';
import { ChatInterface } from './ChatInterface';
import { AssessmentPreview } from './AssessmentPreview';
import { LoadingStage } from './LoadingStage';
import { ManualAssessmentForm } from './ManualAssessmentForm';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface AssessmentConfig {
  topic: string;
  difficulty: string;
  questionCount: string;
  questionType: string;
}

export type AppState = 'chat' | 'loading' | 'preview' | 'customizing';

const defaultAssessmentConfig: AssessmentConfig = {
  topic: '',
  difficulty: 'Medium',
  questionCount: '10',
  questionType: 'MCQs'
};

const AssessmentCreator = () => {
  const [appState, setAppState] = useState<AppState>('chat');
  const [assessmentConfig, setAssessmentConfig] = useState<AssessmentConfig>(defaultAssessmentConfig);

  const handleManualSave = (assessment: any) => {
    console.log('Assessment saved manually:', assessment);
    setAppState('preview');
  };

  return (
    <div className="flex h-full max-h-screen">
      {/* Left Panel - Chat Interface */}
      <div className="w-1/3 border-r border-ai-gray-200 flex flex-col bg-white">
        <ScrollArea className="flex-1">
          <ChatInterface
            appState={appState}
            assessmentConfig={assessmentConfig}
            onConfigChange={setAssessmentConfig}
            onStateChange={setAppState}
          />
        </ScrollArea>
      </div>

      {/* Right Panel - Dynamic Content */}
      <div className="flex-1 flex flex-col bg-ai-gray-50">
        <ScrollArea className="flex-1">
          {appState === 'chat' && (
            <div className="flex items-center justify-center h-full p-8">
              <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-ai-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-ai-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-ai-gray-900 mb-2">Ready to Create</h3>
                <p className="text-ai-gray-600 mb-6">
                  Start by telling me what kind of assessment you'd like to create. I'll guide you through the process step by step.
                </p>
                <div className="bg-white p-4 rounded-lg border border-ai-gray-200">
                  <p className="text-sm text-ai-gray-500 italic">
                    "Create a cybersecurity assessment with 10 medium difficulty questions"
                  </p>
                </div>
              </div>
            </div>
          )}

          {appState === 'loading' && <LoadingStage />}

          {appState === 'preview' && (
            <AssessmentPreview
              assessmentConfig={assessmentConfig}
              onStateChange={setAppState}
            />
          )}

          {appState === 'customizing' && (
            <ManualAssessmentForm
              onSave={handleManualSave}
              onCancel={() => setAppState('preview')}
            />
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default AssessmentCreator;
