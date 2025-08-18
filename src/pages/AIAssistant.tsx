
import AssessmentCreator from '@/components/AssessmentCreator';

const AIAssistant = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ai-gray-900">AI Assistant</h1>
        <p className="text-ai-gray-600 mt-1">Create assessments with the help of AI</p>
      </div>
      
      <div className="bg-white rounded-lg border border-ai-gray-200 h-[calc(100vh-200px)]">
        <AssessmentCreator />
      </div>
    </div>
  );
};

export default AIAssistant;
