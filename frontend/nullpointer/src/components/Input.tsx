import { AnimatePresence } from "framer-motion";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import InputError from "./InputError";

interface Props {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  validation?: RegisterOptions<FieldValues, string> | undefined;
}

const Input = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = errors[props.name];

  return (
    <div className="flex flex-col w-full gap-1 mt-1">
      <div className="flex justify-between">
        <label htmlFor={props.id} className="font-bold capitalize">
          {props.label}
        </label>
        <AnimatePresence mode="wait" initial={false}>
          {inputError && (
            <InputError message={inputError.message!.toString()} />
          )}
        </AnimatePresence>
      </div>

      <input
        id={props.id}
        type={props.type || "text"}
        placeholder={props.placeholder}
        className="relative border rounded-lg border-gray-300 p-4 h-5 w-full text-sm text-slate-500 focus:outline-none"
        {...register(props.name, props.validation)}
      />
    </div>
  );
};

export default Input;
