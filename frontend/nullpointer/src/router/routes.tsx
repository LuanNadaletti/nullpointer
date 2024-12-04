import { createBrowserRouter } from "react-router-dom";
import AskQuestion from "../pages/AskQuestion";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Question from "../pages/question/Question";
import QuestionList from "../pages/QuestionList";
import Register from "../pages/Register";
import Root from "../pages/Root";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile";

export const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <QuestionList /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "questions", element: <QuestionList /> },
      { path: "questions/:id", element: <Question /> },
      {
        path: "questions",
        children: [
          {
            path: "ask",
            element: (
              <ProtectedRoute>
                <AskQuestion />
              </ProtectedRoute>
            )
          },
        ],
      },
      {
        path: "users/:id",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      }
    ],
  },
]);