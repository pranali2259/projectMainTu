import React from "react";

interface Data {
  empId: number;
  empName: string;
  topicsSelected: string[];
}

interface DataProps {
  data: Data[];
}

const EmployeeTopics: React.FC<DataProps> = ({ data }) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Employees Selected Topics
      </h1>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left text-lg font-semibold">
              Employee ID
            </th>
            <th className="py-2 px-4 border-b text-left text-lg font-semibold">
              Employee Name
            </th>
            <th className="py-2 px-4 border-b text-left text-lg font-semibold">
              Topics Selected
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((employee) => (
              <tr key={employee.empId} className="bg-gray-50">
                <td className="py-3 px-4 border-b text-sm">{employee.empId}</td>
                <td className="py-3 px-4 border-b text-sm">
                  {employee.empName}
                </td>
                <td className="py-3 px-4 border-b text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    {employee.topicsSelected.length > 0 ? (
                      employee.topicsSelected.map((topic, index) => (
                        <li key={index} className="text-gray-700 text-sm">
                          {topic}
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-700 text-sm">
                        No topics selected
                      </li>
                    )}
                  </ul>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-3 text-white">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTopics;

// export async function getServerSideProps() {
//   try {
//     const response = await fetch("http://127.0.0.1:8080/get-all-users");
//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }
//     const data = await response.json();
//     return {
//       props: {
//         data,
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {
//         data: [],
//       },
//     };
//   }
// }
