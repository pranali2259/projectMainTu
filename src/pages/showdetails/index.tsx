import React from "react";
import { useResponse } from "@/contex/Contex";
import { useRouter } from "next/router";

const ResultPage = () => {
  const { response } = useResponse();
  const router = useRouter();
  console.log(response);

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="relative flex items-center justify-between p-3 flex-col sm:flex-row">
        <img src="Logo 2.png" alt="Logo" className="h-20 w-auto mb-4 sm:mb-0" />
      </div>
      <div className="mt-12 mb-12 text-center text-white">
        {response ? (
          <>
            <p className="text-xl font-semibold mb-4">
              <strong>Message:</strong> {response.message}
            </p>
            {response.userData && (
              <div>
                <p className="mb-2">
                  <strong>Employee ID:</strong> {response.userData.empId}
                </p>
                <p className="mb-2">
                  <strong>Employee Name:</strong> {response.userData.empName}
                </p>
                <p>
                  <strong>Topics Selected:</strong>{" "}
                  {response.userData.topicsSelected.join(", ")}
                </p>
              </div>
            )}
          </>
        ) : (
          <p>No response available yet.</p>
        )}
      </div>

      <div
        onClick={handleClick}
        className="mt-8 bg-blue-500 text-white py-2 px-8 rounded-md text-lg font-medium hover:bg-blue-600 cursor-pointer transition duration-300 ease-in-out"
      >
        Back
      </div>
    </div>
  );
};

export default ResultPage;
