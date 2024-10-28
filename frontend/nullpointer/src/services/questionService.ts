import { AxiosError } from "axios";
import api from "../api/api";
import AskQuestionModel from "../models/question/askQuestion";
import Question from "../models/question/question";
import QuestionFilters from "../models/questionFilters";

export async function getAllQuestions(filters: QuestionFilters): Promise<{ content: Question[], totalElements: number }> {
  return api
    .get("/questions", { params: filters })
    .then((response) => {
      return {
        content: response.data.content,
        totalElements: response.data.page.totalElements
      }
    });
}

export async function askQuestion(question: AskQuestionModel): Promise<string> {
  try {
    const response = await api.post("/questions", question);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      let errorMessage;
      switch (error.response.status) {
        case 401:
          errorMessage = "You must be logged in to ask a question.";
          break;
        default:
          errorMessage = error.response.data?.message || 'An error occurred. Please try again later.';
          break;
      }
      throw new Error(errorMessage);
    } else {
      throw new Error('Network error');
    }
  }
}