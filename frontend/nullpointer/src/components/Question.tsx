import QuestionModel from "../models/question/question";
import { getTimeAgoText } from "../utils/timeAgo";

interface QuestionProps {
  question: QuestionModel;
}

const Question: React.FC<QuestionProps> = ({ question }: QuestionProps) => {
  return (
    <div className="border-b-2 border-b-slate-100 p-4 flex">
      <div className="w-24 text-gray-500 text-sm mr-3 text-right">
        <p>0 views</p>
        <p>0 answers</p>
        <p>0 votes</p>
      </div>

      <div className="w-full">
        <a href={`/questions/${question.id}`} className="text-blue-500 text-xl">
          {question.title}
        </a>

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

export default Question;
