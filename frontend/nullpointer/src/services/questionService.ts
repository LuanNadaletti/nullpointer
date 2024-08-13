import api from "../api/api";
import Question from "../models/question";
import QuestionFilters from "../models/questionFilters";

export function getAllQuestions(filters: QuestionFilters): Promise<{content: Question[], totalElements: number}> {
  return api
    .get("/questions", { params: filters })
    .then((response) => {
      return {
        content: response.data.content,
        totalElements: response.data.totalElements
      }
    });
}
