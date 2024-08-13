export default interface QuestionFilters {
  title?: string;
  author?: string;
  sortBy?: string;
  ascending?: boolean;
  page: number;
  size: number;
}
