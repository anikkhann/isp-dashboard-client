import React from "react";

const Success = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-lg text-center relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 mx-auto mb-4"
        style={{ color: "#2DB48B" }}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M3.293 9.293a1 1 0 011.414 0l3 3a1 1 0 001.414 0l7-7a1 1 0 10-1.414-1.414l-6.293 6.293a1 1 0 01-1.414 0l-2.293-2.293a1 1 0 00-1.414 1.414l3 3z"
          clip-rule="evenodd"
        />
      </svg>

      <h1 className="text-2xl font-bold mb-4" style={{ color: "#2DB48B" }}>
        Payment Successful
      </h1>
      <button
        onClick={() => {
          window.location.href = "/";
        }}
        className="bg-primary cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Go Dashboard
      </button>

      <div
        className="absolute bottom-0 left-0 w-full h-px"
        style={{ color: "#2DB48B" }}
      ></div>
    </div>
  );
};

export default Success;
