import { useState } from "react";
import QuestionFilters from "../models/questionFilters";

interface FilterProps {
  onFilterChange: (filters: QuestionFilters) => void;
  questionsNumber: number;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange, questionsNumber }: FilterProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [title, setTitle] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [author, setAuthor] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortBy, setSortBy] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ascending, setAscending] = useState<boolean>(true);

  const handleFilterChange = () => {
    const filters: QuestionFilters = {
      title: title,
      author: author,
      sortBy: sortBy,
      ascending: ascending,
      page: 0,
      size: 10
    };
    onFilterChange(filters);
  };

  return (
    <div>
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
    </div>
  );
};

export default Filter;
