import React from "react";

const UnSuccess = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-lg text-center relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24  text-primary mx-auto mb-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 2a8 8 0 00-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 00-8-8zm0 14a6 6 0 100-12 6 6 0 000 12zm-.707-9.293a1 1 0 00-1.414 1.414L8.586 10 7.293 11.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clip-rule="evenodd"
        />
      </svg>
      <h1 className="text-2xl font-bold text-primary mb-4">
        Payment Unsuccessful
      </h1>
      <button
        onClick={() => {
          window.location.href = "/";
        }}
        className="bg-primary cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Go Dashboard
      </button>

      <div className="absolute bottom-0 left-0 w-full h-px bg-primary"></div>
    </div>
  );
};

export default UnSuccess;
