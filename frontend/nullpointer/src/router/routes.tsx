import { createBrowserRouter } from "react-router-dom";
import AskQuestion from "../pages/AskQuestion";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import QuestionList from "../pages/QuestionList";
import Register from "../pages/Register";
import Root from "../pages/Root";
import ProtectedRoute from "./ProtectedRoute";
import QuestionDetails from "../pages/QuestionDetails";

export const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <QuestionList /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "/questions", element: <QuestionList /> },
      {
        path: "/questions/ask", element: (
          <ProtectedRoute>
            <AskQuestion />
          </ProtectedRoute>
        )
      },
      { path: "/questions/:id", element: <QuestionDetails /> },
    ],
  },
]);

/* FAZER TABELA DE TAGS TABELA DE QUESTIONXTAGS */