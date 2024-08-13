import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Root from "../pages/Root";
import SignUp from "../pages/SignUp";
import QuestionList from "../pages/QuestionList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <QuestionList /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <p>login</p> },
    ],
  },
]);

/* FAZER TABELA DE TAGS TABELA DE QUESTIONXTAGS */