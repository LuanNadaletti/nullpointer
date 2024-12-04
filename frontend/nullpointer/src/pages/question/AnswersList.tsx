import AnswerModel from "../../models/answer/answerModel";
import Answer from "./Answer";

interface AnswersListProps {
    answers: AnswerModel[];
}

const AnswersList: React.FC<AnswersListProps> = ({ answers }) => {
    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">
                {answers.length > 0 ? "Answers" : "No answers yet"}
            </h2>

            {answers.length > 0 ? (
                <ul className="space-y-4">
                    {answers.map((answer) => (
                        <li key={answer.id}>
                            <Answer answer={answer} />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-gray-600">Be the first to answer this question!</div>
            )}
        </div>
    )
}

export default AnswersList;