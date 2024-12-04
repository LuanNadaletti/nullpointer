import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AnswerQuestionModel from "../../models/answer/answerQuestionModel";
import QuestionModel from "../../models/question/question";
import { answerQuestion } from "../../services/answerService";
import { getQuestionById } from "../../services/questionService";
import AnswerForm from "./AnswerForm";
import AnswersList from "./AnswersList";
import QuestionHeader from "./QuestionHeader";

const Question: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const queryClient: QueryClient = useQueryClient();
    const [submitError, setSubmitError] = useState<string | null>(null);

    const { data: question, isLoading, isError } = useQuery<QuestionModel, Error>({
        queryKey: ['question', id],
        queryFn: () => getQuestionById(id!),
        refetchOnWindowFocus: false,
        enabled: !!id,
    });

    const mutation = useMutation({
        mutationFn: answerQuestion,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["question", id]
            });
        },
        onError: (error: any) => {
            setSubmitError(error.message || "An error occurred. Please try again.")
        }
    })

    const onSubmitAnswer = async (answerText: string) => {
        setSubmitError(null);

        const answer: AnswerQuestionModel = {
            answerText: answerText,
            questionId: id!
        }

        mutation.mutate(answer);
    }

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error loading question.</div>

    return (<div className="max-w-3xl mx-auto p-4">
        {question && (
            <>
                <QuestionHeader question={question} />
                <div className="mt-6">
                    <AnswersList answers={question.answers || []} />
                </div>
                <div className="mt-6">
                    <AnswerForm onSubmitAnswer={onSubmitAnswer} />
                    <div className="text-xs text-red-600 m-0 font-bold">{submitError}</div>
                </div>
            </>
        )}
    </div>);
}

export default Question;