import React from 'react';
import { useParams } from 'react-router-dom';
import QuestionModel from '../models/question/question';
import { getTimeAgoText } from '../utils/timeAgo';
import { answerQuestion, getQuestionById } from '../services/questionService';
import { useAuth } from '../contexts/Auth';

interface Answer {
  id: number;
  answerText: string;
  user: {
    id: number;
    username: string;
  };
  creationDate: string;
}

interface QuestionDetails extends QuestionModel {
  answers: Answer[];
}

const QuestionView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = React.useState<QuestionDetails | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [newAnswer, setNewAnswer] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string>('');
  const { authenticated } = useAuth();

  React.useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setLoading(true);
        if (id) {
          const questionData = await getQuestionById(id);
          setQuestion(questionData as QuestionDetails);
        }
      } catch (error: any) {
        setError(error.message || 'Error loading question');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswer.trim() || !id) return;

    try {
      setIsSubmitting(true);
      const response = await answerQuestion(id, newAnswer);
      
      setQuestion(prev => prev ? {
        ...prev,
        answers: [...prev.answers, response]
      } : null);
      setNewAnswer('');
    } catch (error: any) {
      setError(error.message || 'Error submitting answer');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center h-screen">
        <div className="text-2xl font-bold text-gray-700 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="flex justify-center h-screen">
        <div className="text-xl">Question not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{question.title}</h1>
      
      <div className="mb-4 text-gray-600">
        <span>
          Published by {question.user.username} {getTimeAgoText(question.creationDate)}
        </span>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="prose max-w-none whitespace-pre-wrap">
          {question.questionText}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Answers ({question.answers?.length || 0})
        </h2>
        
        {question.answers?.map((answer) => (
          <div key={answer.id} className="bg-white p-6 rounded-lg shadow-md mb-4">
            <div className="whitespace-pre-wrap">
              {answer.answerText}
            </div>
            <div className="mt-4 text-gray-600 text-sm">
              Answered by {answer.user.username} {getTimeAgoText(answer.creationDate)}
            </div>
          </div>
        ))}

        {authenticated ? (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Your Answer</h3>
            <form onSubmit={handleSubmitAnswer}>
              <textarea
                className="w-full p-4 border rounded-lg mb-4 min-h-[150px]"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Type your answer here..."
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="min-w-24 h-9 rounded-md text-white bg-cyan-500 hover:bg-cyan-600 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Submit Answer'}
              </button>
            </form>
          </div>
        ) : (
          <div className="mt-8 text-center p-4 bg-gray-100 rounded-lg">
            <p>Please login to answer this question</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionView;
