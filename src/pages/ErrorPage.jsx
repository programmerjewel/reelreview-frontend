// src/components/ErrorPage.jsx
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        {/* Movie-themed 404 Illustration */}
        <div className="mb-6">
          <svg
            className="w-32 h-32 mx-auto text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
            ></path>
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Oops! Movie Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist. Maybe it was moved or deleted.
        </p>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-300"
        >
          Back to ReelReview
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;