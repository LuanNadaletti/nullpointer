import { User } from "../user";

export default interface AnswerModel {
    id: number;
    user: User;
    answerText: string;
    creationDate: Date;
}