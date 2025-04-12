import { useState, useEffect } from 'react';
import { useLocation, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { GapAnalysis } from '@/components/GapAnalysis';
import { ResourcesSection } from '@/components/ResourcesSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { AiResources } from '@/components/AiResources';
import { InterviewQuestions } from '@/components/InterviewQuestions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [knowledge, setKnowledge] = useState('');
  const [aiOutput, setAiOutput] = useState<any>(null);
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  useEffect(() => {
    const state = location.state as { topic?: string; knowledgeInput?: string; aiOutput?: any } | null;

    if (state?.topic) {
      setTopic(state.topic);
    } else {
      setTopic('JavaScript');
      setShowPlaceholder(true);
    }

    if (state?.knowledgeInput) {
      setKnowledge(state.knowledgeInput);
    }

    if (state?.aiOutput) {
      setAiOutput(state.aiOutput);
    }
  }, [location.state]);

  const handleGoBack = () => {
    navigate('/topic-input');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleGoBack}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>

        {showPlaceholder && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Demo Mode</AlertTitle>
            <AlertDescription>
              You're viewing sample data. Start a real analysis from the homepage.
            </AlertDescription>
          </Alert>
        )}

        <Routes>
          <Route path="/" element={<GapAnalysis topic={topic} knowledge={knowledge}  aiOutput={aiOutput}  />} />
          <Route path="/resources" element={<ResourcesSection topic={topic} aiOutput={aiOutput} />} />
          <Route path="/projects" element={<ProjectsSection topic={topic} />} />
          <Route path="/ai-resources" element={<AiResources topic={topic}  />} />
          <Route path="/interview-questions" element={<InterviewQuestions topic={topic}  />} />
          <Route path="*" element={<Navigate to="/results" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default ResultsPage;
