import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import Question from "../components/Question";
import QuestionModel from "../models/question/question";
import QuestionFilters from "../models/questionFilters";
import { getAllQuestions } from "../services/questionService";
import { Link } from "react-router-dom";
import { IoFilterSharp } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const QuestionList = () => {
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [questionCounter, setQuestionCounter] = useState<number>(0);
  const [filters, setFilters] = useState<QuestionFilters>({
    ascending: false,
    page: 0,
    size: 10,
  });
  const [showFilter, setShowFilter] = useState<boolean>(false);

  useEffect(() => {
    getAllQuestions(filters)
      .then((questionsResponse) => {
        setQuestions(questionsResponse.content);
        setQuestionCounter(questionsResponse.totalElements | 0);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [filters]);

  return (
    <div className="w-full flex justify-center mt-2">
      <div className="w-3/5">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center mb-3">
            <button
              className={`min-w-20 h-10 border rounded-md text-base flex items-center justify-evenly ` +
                (showFilter ? "bg-cyan-300 border-cyan-800 text-cyan-800" : "text-cyan-500 hover:bg-cyan-100 border-cyan-500")
              }
              onClick={(e) => {
                setShowFilter(!showFilter);
              }}
            >
              <IoFilterSharp />
              Filter
            </button>
            <div className="ml-5">
              {questionCounter} questions
            </div>
          </div>

          <Link to={"/questions/ask"}>
            <button
              className="min-w-24 h-9 rounded-md text-white bg-cyan-500 hover:bg-cyan-600 text-xs"
            >
              Ask Question
            </button>
          </Link>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {showFilter && (
            <motion.div  {...fade_filters}>
              <Filter onFilterChange={setFilters} questionsNumber={questionCounter} />
            </motion.div>
          )}
        </AnimatePresence>

        <ul>
          {questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const fade_filters = {
  initial: { opacity: 0.5, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 0 },
  transition: { duration: 0.1 },
};

export default QuestionList;
