import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Root from "../pages/Root";
import Register from "../pages/Register";
import Login from "../pages/Login";
import QuestionList from "../pages/QuestionList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <QuestionList /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

/* FAZER TABELA DE TAGS TABELA DE QUESTIONXTAGS */