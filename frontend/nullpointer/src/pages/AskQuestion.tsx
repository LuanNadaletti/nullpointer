import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AskQuestionModel from "../models/question/askQuestion";
import { askQuestion } from "../services/questionService";
import DiscardConfirmationModal from "../components/ConfirmDialog";

const AskQuestion: React.FC = () => {
    const formMethods = useForm();
    const navigate = useNavigate();

    const [isDiscardModalOpen, setDiscardModalOpen] = useState<boolean>(false);

    const titleError = formMethods.formState.errors.title?.message?.toString();
    const bodyError = formMethods.formState.errors.body?.message?.toString();

    const submitForm = formMethods.handleSubmit(async (data: FieldValues) => {
        const question: AskQuestionModel = {
            title: data.title,
            questionText: data.body,
        };

        try {
            await askQuestion(question);
            navigate("/");
        } catch (error: any) {
            if (error.response) {

            } else {
                throw error;
            }
        }
    });

    const handleDiscardClick = () => {
        setDiscardModalOpen(true);
    }

    const clearForm = async () => {
        setDiscardModalOpen(false);
        formMethods.reset();
    }

    return (<div className="flex items-center flex-col bg-gray-100 min-h-screen">
        <div className="w-3/5">
            <FormProvider {...formMethods}>
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <div className="border w-full rounded-md p-6 text-sm mt-7 bg-white">
                        <p className="text-base"><b>Título</b></p>

                        <input type="text"
                            className="border rounded-md p-2 w-full mt-2 text-xs" placeholder="Escreva seu título aqui"
                            {...formMethods.register("title", {
                                minLength: {
                                    value: 20,
                                    message: "O título deve ter pelo menos 20 caracteres."
                                },
                                required: {
                                    value: true,
                                    message: "O título é obrigatório."
                                }
                            })}
                        />
                        <div className="text-xs text-red-600">{titleError}</div>

                        <p className="text-xs text-gray-500 mt-3">Pense nele como uma pergunta que você está fazendo a outra pessoa, e seja detalhado.</p>
                    </div>

                    <div className="border w-full rounded-md p-6 text-sm mt-5 bg-white">
                        <p className="text-base"><b>Qual é a sua pergunta</b></p>

                        <textarea className="border rounded-md p-2 w-full mt-2 text-xs h-48" minLength={50}
                            {...formMethods.register("body", {
                                minLength: {
                                    value: 250,
                                    message: "O texto da pergunta deve ter pelo menos 250 caracteres."
                                },
                                required: {
                                    value: true,
                                    message: "O texto da pergunta é obrigatório."
                                }
                            })} />

                        <div className="text-xs text-red-600">{bodyError}</div>

                        <p className="text-xs text-gray-500 mt-3">Descreva seu problema com o máximo de detalhes possível.</p>
                    </div>

                    <div className="w-full mt-5">
                        <div className="flex items-center content-between w-2/3 flex-wrap">
                            <button onClick={submitForm} className="w-16 h-9 rounded-md text-white bg-cyan-500 hover:bg-cyan-600 text-sm">
                                Postar
                            </button>

                            <button onClick={handleDiscardClick} className="text-red-600 text-sm hover:bg-red-100 w-16 h-9 rounded-md ml-3">
                                Descartar
                            </button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>

        <DiscardConfirmationModal isOpen={isDiscardModalOpen}
            onClose={() => setDiscardModalOpen(false)}
            onConfirm={clearForm} />
    </div>)
}

export default AskQuestion;
