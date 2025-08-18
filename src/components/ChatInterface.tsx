
import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AssessmentConfig, AppState } from './AssessmentCreator';

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
  chips?: string[];
  isTyping?: boolean;
}

interface ChatInterfaceProps {
  appState: AppState;
  assessmentConfig: AssessmentConfig;
  onConfigChange: (config: AssessmentConfig) => void;
  onStateChange: (state: AppState) => void;
}

export const ChatInterface = ({ 
  appState, 
  assessmentConfig, 
  onConfigChange, 
  onStateChange 
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversationFlow = [
    {
      message: "👋 Hi, I'm your Assessment Assistant. Tell me what assessment you'd like to create.",
      chips: []
    },
    {
      message: "Got it ✅. What difficulty level should the questions be?",
      chips: ["Easy", "Medium", "Hard", "Mixed"]
    },
    {
      message: "Perfect! How many questions do you want?",
      chips: ["5", "10", "15", "20", "25"]
    },
    {
      message: "What type of questions would you prefer?",
      chips: ["MCQs", "Short Answers", "Both"]
    },
    {
      message: "Excellent! I have all the details. Do you want me to generate the assessment now?",
      chips: ["Yes, Proceed", "Review Settings"]
    }
  ];

  useEffect(() => {
    // Initialize with greeting
    addAIMessage(conversationFlow[0].message, conversationFlow[0].chips);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addAIMessage = (content: string, chips: string[] = [], delay = 1000) => {
    // Add typing indicator
    const typingId = `typing-${Date.now()}`;
    setMessages(prev => [...prev, {
      id: typingId,
      type: 'ai',
      content: '',
      timestamp: new Date(),
      isTyping: true
    }]);

    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== typingId));
      setMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        type: 'ai',
        content,
        timestamp: new Date(),
        chips
      }]);
    }, delay);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      type: 'user',
      content,
      timestamp: new Date()
    }]);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    addUserMessage(input);
    
    if (currentStep === 0) {
      onConfigChange({ ...assessmentConfig, topic: input });
      setCurrentStep(1);
      addAIMessage(conversationFlow[1].message, conversationFlow[1].chips);
    }
    
    setInput('');
  };

  const handleChipClick = (chip: string) => {
    addUserMessage(chip);
    
    switch (currentStep) {
      case 1: // Difficulty
        onConfigChange({ ...assessmentConfig, difficulty: chip });
        setCurrentStep(2);
        addAIMessage(conversationFlow[2].message, conversationFlow[2].chips);
        break;
      case 2: // Question count
        onConfigChange({ ...assessmentConfig, questionCount: chip });
        setCurrentStep(3);
        addAIMessage(conversationFlow[3].message, conversationFlow[3].chips);
        break;
      case 3: // Question type
        onConfigChange({ ...assessmentConfig, questionType: chip });
        setCurrentStep(4);
        addAIMessage(conversationFlow[4].message, conversationFlow[4].chips);
        break;
      case 4: // Proceed
        if (chip === "Yes, Proceed") {
          onStateChange('loading');
          addAIMessage("🚀 Starting assessment generation...", []);
        }
        break;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 bg-white border-b border-ai-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-ai-blue rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-ai-gray-900">AI Assistant</h3>
            <p className="text-sm text-ai-gray-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div className="flex items-start space-x-2 max-w-[85%]">
              {message.type === 'ai' && (
                <div className="w-8 h-8 bg-ai-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div>
                {message.isTyping ? (
                  <div className="message-bubble-ai">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                ) : (
                  <div className={message.type === 'ai' ? 'message-bubble-ai' : 'message-bubble-user'}>
                    {message.content}
                  </div>
                )}
                
                {message.chips && message.chips.length > 0 && !message.isTyping && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.chips.map((chip, index) => (
                      <button
                        key={index}
                        onClick={() => handleChipClick(chip)}
                        className="chip-button-primary text-xs"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {message.type === 'user' && (
                <div className="w-8 h-8 bg-ai-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-ai-gray-600" />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {appState === 'chat' && currentStep === 0 && (
        <div className="p-4 bg-white border-t border-ai-gray-200">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon" className="bg-ai-blue hover:bg-ai-blue-600">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Configuration Summary */}
      {(appState === 'loading' || appState === 'preview') && (
        <div className="p-4 bg-white border-t border-ai-gray-200">
          <h4 className="font-medium text-ai-gray-900 mb-2">Assessment Settings</h4>
          <div className="space-y-1 text-sm text-ai-gray-600">
            <div><span className="font-medium">Topic:</span> {assessmentConfig.topic}</div>
            <div><span className="font-medium">Difficulty:</span> {assessmentConfig.difficulty}</div>
            <div><span className="font-medium">Questions:</span> {assessmentConfig.questionCount}</div>
            <div><span className="font-medium">Type:</span> {assessmentConfig.questionType}</div>
          </div>
        </div>
      )}
    </div>
  );
};
