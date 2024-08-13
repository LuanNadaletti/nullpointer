import { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import QuestionFilters from "../models/questionFilters";

interface Props {
  onFilterChange: (filters: QuestionFilters) => void;
  questionsNumber: number;
}

const Filter = ({ onFilterChange, questionsNumber }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [ascending, setAscending] = useState<boolean>(true);

  const handleFilterChange = () => {
    const filters: QuestionFilters = {
      title: title || undefined,
      author: author || undefined,
      sortBy: sortBy || undefined,
      ascending: ascending,
      page: 0,
      size: 10,
    };
    onFilterChange(filters);
  };

  return (
    <div>
      <div className="flex items-center mb-3">
        <button
          className="min-w-20 h-10 border rounded-md border-cyan-500 text-cyan-500 text-base hover:bg-cyan-100 flex items-center justify-evenly"
          onClick={(e) => {
            setOpen(!open);
          }}
        >
          <IoFilterSharp />
          Filter
        </button>
        <div className="ml-5">
          { questionsNumber } questions
        </div>
      </div>

      {open && (
        <div className="border rounded-md bg-gray-100">
          <div className="p-4">
            <legend className="text-base font-semibold">Sorted by</legend>
          </div>
          <div className="p-3 border-t">
            <button
              onClick={handleFilterChange}
              className="min-w-20 h-9 rounded-md text-white bg-cyan-500 hover:bg-cyan-600 text-sm"
            >
              Apply filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;