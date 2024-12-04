import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import DiscardConfirmationModal from "../../components/ConfirmDialog";

type AnswerFormInputs = {
    answerText: string;
}

interface AnswerFormProps {
    onSubmitAnswer: (aswerText: string) => void;
}

const AnswerForm: React.FC<AnswerFormProps> = ({ onSubmitAnswer }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AnswerFormInputs>();

    const [isDiscardModalOpen, setDiscardModalOpen] = useState<boolean>(false);

    const onSubmit: SubmitHandler<AnswerFormInputs> = (data) => {
        onSubmitAnswer(data.answerText);
        reset();
    }

    const handleDiscardClick = () => {
        setDiscardModalOpen(true);
    }

    const clearForm = async () => {
        setDiscardModalOpen(false);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <label htmlFor="answerText" className="text-lg font-semibold">
                Your Answer
            </label>
            <textarea
                id="answerText"
                {...register("answerText", { required: "Answer is required" })}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-cyan-500"
                rows={5}
            />

            {errors.answerText && (
                <div className="text-xs text-red-600 m-0 bold font-bold">{errors.answerText.message}</div>
            )}

            <div className="w-full mt-5">
                <div className="flex items-center content-between w-2/3 flex-wrap">
                    <button type="submit" className="w-16 h-9 rounded-md text-white bg-cyan-500 hover:bg-cyan-600 text-sm">
                        Post
                    </button>

                    <button type="button" onClick={handleDiscardClick} className="text-red-600 text-sm hover:bg-red-100 w-16 h-9 rounded-md ml-3">
                        Discard
                    </button>
                </div>
            </div>

            <DiscardConfirmationModal isOpen={isDiscardModalOpen}
                onClose={() => setDiscardModalOpen(false)}
                onConfirm={clearForm} />
        </form>
    )
}

export default AnswerForm;