import { motion } from "framer-motion";
import { MdError } from "react-icons/md";

interface ErrorProps {
  message: string;
}

const InputError = (props: ErrorProps) => {
  return (
    <motion.p
      className="flex items-center gap-1 px-2 font-semibold text-sm text-red-500 bg-red-100 rounded-md"
      {...framer_error}
    >
      <MdError />
      {props.message}
    </motion.p>
  );
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};

export default InputError;
