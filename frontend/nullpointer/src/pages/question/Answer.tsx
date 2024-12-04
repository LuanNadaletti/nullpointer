import { Link } from "react-router-dom";
import AnswerModel from "../../models/answer/answerModel";

interface AnswerProps {
    answer: AnswerModel;
}

const Answer: React.FC<AnswerProps> = ({ answer }) => {
    return (
        <div className="border-b py-4">
          <p className="text-gray-700">{answer.answerText}</p>
          <div className="text-sm text-gray-500 mt-2">
            Answered by <Link to={`/users/${answer.user.id}`} className="text-blue-500">{answer.user.username}</Link> on{" "}
            {new Date(answer.creationDate).toLocaleDateString()}
          </div>
        </div>
      );
}

export default Answer;