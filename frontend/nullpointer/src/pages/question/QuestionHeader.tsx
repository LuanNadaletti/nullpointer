import { Link } from "react-router-dom";
import QuestionModel from "../../models/question/question";

interface QuestionHeaderProps {
  question: QuestionModel;
}

const QuestionHeader = ({ question }: QuestionHeaderProps) => {
  return (
    <div className="pb-4">
      <h1 className="text-2xl font-semibold">{question.title}</h1>
      <div className="text-sm text-gray-500">
        Asked by <Link to={`/users/${question.user.id}`} className="text-blue-500">{question.user.username}</Link> on{" "}
        {new Date(question.creationDate).toLocaleDateString()}
      </div>
      {/* <div className="flex flex-wrap mt-2">
        {question.tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div> */} 
      <p className="mt-4 max-w-full whitespace-pre-wrap break-words text-gray-700 border-t pt-2">{question.questionText}</p>
    </div>
  );
};

export default QuestionHeader;
