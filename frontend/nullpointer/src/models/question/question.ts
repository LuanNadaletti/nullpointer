import AnswerModel from "../answer/answerModel";
import { User } from "../user";

export default interface QuestionModel {
  id: number;
  title: string;
  questionText: string;
  creationDate: string;
  user: User;
  answers: AnswerModel[];
}
