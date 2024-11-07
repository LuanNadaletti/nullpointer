import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <div className="h-dvh flex flex-col justify-center items-center">
      <div className="flex flex-col items-center space-y-10">
        <h1 className="font-semibold text-4xl">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className="text-gray-600 italic">
          {error.statusText || error.message}
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
