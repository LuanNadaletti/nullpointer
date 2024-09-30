import api from "../api/api";
import AskQuestionModel from "../models/question/askQuestion";
import Question from "../models/question/question";
import QuestionFilters from "../models/questionFilters";

export function getAllQuestions(filters: QuestionFilters): Promise<{ content: Question[], totalElements: number }> {
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
      throw new Error(error.response.data.message || 'Registration failed');
    } else {
      throw new Error('Network error');
    }
  }
}