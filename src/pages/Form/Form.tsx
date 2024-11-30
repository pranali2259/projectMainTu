import React from "react";
import Dropdown from "@/pages/Form/Dropdown";
const Form = () => {
  return (
    <div className="bg-white p-8 w-full max-w-4xl mx-auto">
      <h1></h1>
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        L&D Program - 2025
      </h1>
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Speaker Registration Form
      </h2>
      <div className="mx-auto mt-5 p-6 bg-white">
        <form className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="employeeId"
                className="block text-sm font-medium text-gray-700"
              >
                Employee Id
              </label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your employee id"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="employeeName"
                className="block text-sm font-medium text-gray-700"
              >
                Employee Name
              </label>
              <input
                type="text"
                id="employeeName"
                name="employeeName"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your employee name"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="employeeEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Employee Email
              </label>
              <input
                type="text"
                id="employeeEmail"
                name="employeeEmail"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your employee Email"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="employeeId"
                className="block text-sm font-medium text-gray-700"
              >
                Topic
              </label>
              <Dropdown />
            </div>
            <div className="flex-1"></div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
