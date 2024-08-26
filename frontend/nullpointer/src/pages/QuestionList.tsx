import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import Question from "../components/Question";
import QuestionModel from "../models/question";
import QuestionFilters from "../models/questionFilters";
import { getAllQuestions } from "../services/questionService";

const QuestionList = () => {
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [questionCounter, setQuestionCounter] = useState<number>(0);
  const [filters, setFilters] = useState<QuestionFilters>({
    ascending: false,
    page: 0,
    size: 10,
  });

  useEffect(() => {
    getAllQuestions(filters)
      .then((questionsResponse) => {
        setQuestions(questionsResponse.content);
        setQuestionCounter(questionsResponse.totalElements);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [filters]);

  return (
    <div className="w-full flex justify-center mt-2">
      <div className="w-3/5">
        <Filter onFilterChange={setFilters} questionsNumber={questionCounter} />
        <ul>
          {questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionList;
