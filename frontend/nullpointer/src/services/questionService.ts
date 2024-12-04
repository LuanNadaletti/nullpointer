import api from "../api/api";
import AskQuestionModel from "../models/question/askQuestion";
import { default as Question, default as QuestionModel } from "../models/question/question";
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

export async function getQuestionById(id: string): Promise<QuestionModel> {
  try {
    const response = await api.get(`/questions/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch the question.");
  }
}

export async function getQuestionsByUserId(id: string): Promise<Question[]> {
  try {
    const response = await api.get(`/questions/user/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch the questions.");
  }
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