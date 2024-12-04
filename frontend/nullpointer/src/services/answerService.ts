import api from "../api/api";
import AnswerQuestionModel from "../models/answer/answerQuestionModel";

export async function answerQuestion(answer: AnswerQuestionModel): Promise<void> {
    try {
        await api.post("/answers", answer);
    } catch (error: any) {
        throw new Error(error.message);
    }
}