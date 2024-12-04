import { Link } from "react-router-dom";
import QuestionModel from "../models/question/question";
import { getTimeAgoText } from "../utils/timeAgo";

interface QuestionProps {
  question: QuestionModel;
}

const QuestionItem: React.FC<QuestionProps> = ({ question }: QuestionProps) => {
  return (
    <div className="border-b-2 border-b-slate-100 p-4 flex">
      <div className="w-24 text-gray-500 text-sm mr-3 text-right">
        <p>{question.answers.length} answers</p>
      </div>

      <div className="w-full">
        <Link to={`/questions/${question.id}`}>
          <span className="text-blue-500 text-xl">{question.title}</span>
        </Link>

        <p className="text-sm text-right">
          <a href={`/users/${question.user.id}`} className="text-blue-500">
            {question.user.username}
          </a>{" "}
          <span className="text-gray-600">
            asked {getTimeAgoText(question.creationDate)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default QuestionItem;
