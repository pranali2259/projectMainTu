// import React, { useState, useEffect, useRef } from "react";
// import { useResponse } from "@/contex/Contex";
// import { useRouter } from "next/router";

// type FormData = {
//   empId: string | number;
//   empName: string;
//   empMailId: string;
//   topicsSelected: number[];
// };

// interface Data {
//   topicId: number;
//   subTopic: string;
//   description: string;
//   message: string;
// }

// const Form: React.FC = () => {
//   const [Datas, setData] = useState<Data[]>([]);
//   const [present, setPresent] = useState(false);
//   const { updateResponse } = useResponse();
//   const route = useRouter();
//   const inputref = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (inputref.current) {
//       inputref.current.focus();
//     }
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8080/fetch-data");
//         const data = await response.json();
//         setData(data);

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const [formData, setFormData] = useState<FormData>({
//     empId: "",
//     empName: "",
//     empMailId: "",

//     topicsSelected: [],
//   });

//   const handleSubTopicChange = (
//     topicId: number,
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const updatedSubTopics = e.target.checked
//       ? [...formData.topicsSelected, topicId]
//       : formData.topicsSelected.filter((id) => id !== topicId);

//     setFormData({
//       ...formData,
//       topicsSelected: updatedSubTopics,
//     });
//   };

//   const getTextAreaValue = () => {
//     const selectedSubTopics = formData.topicsSelected.map((topicId) => {
//       const subTopicData = Datas.find((item) => item.topicId === topicId);
//       return subTopicData ? subTopicData.subTopic : "";
//     });

//     return selectedSubTopics.join("\n");
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://127.0.0.1:8080/add-user", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const result = await response.json();
//       const status = await response.status;

//       console.log(status);
//       if (status === 200) {
//         updateResponse(result);
//         route.push("/showdetails");
//       } else {
//         setPresent(true);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Error occurred while submitting data.");
//     }
//   };

//   return (
//     <div className="bg-black">
//       <div className="relati flex items-center justify-between p-3 flex-col sm:flex-row">
//         <img src="Logo 2.png" alt="Logo" className="h-20 w-auto mb-4 sm:mb-0" />

//         <div className="flex-grow text-center ">
//           <h1 className="text-3xl font-semibold text-white">
//             L&D Program - 2025
//           </h1>
//           <h1 className="text-3xl font-semibold text-white">
//             Speaker Registration Form
//           </h1>
//         </div>
//       </div>
//       <div className="p-5 max-w-xl mx-auto">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="mb-4">
//             <label
//               htmlFor="id"
//               className="block text-sm font-semibold text-white"
//             >
//               Employee Id:
//             </label>
//             <input
//               ref={inputref}
//               type="number"
//               id="id"
//               placeholder="123"
//               value={formData.empId}
//               onChange={(e) =>
//                 setFormData({ ...formData, empId: parseInt(e.target.value) })
//               }
//               className="w-full mt-2 p-2 border-none outline-none bg-transparentn "
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="name"
//               className="block text-sm font-semibold text-white"
//             >
//               Employee Name:
//             </label>
//             <input
//               type="text"
//               id="name"
//               placeholder="abc"
//               value={formData.empName}
//               onChange={(e) =>
//                 setFormData({ ...formData, empName: e.target.value })
//               }
//               className="w-full mt-2 p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-sm font-semibold text-white"
//             >
//               Employee Email:
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="acb@techouts.com"
//               value={formData.empMailId}
//               onChange={(e) =>
//                 setFormData({ ...formData, empMailId: e.target.value })
//               }
//               className="w-full mt-2 p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="subTopics"
//               className="block text-sm font-semibold text-white"
//             >
//               Select Topics:
//             </label>
//             <div className="space-y-2 overflow-y-scroll h-36">
//               {Datas.map((subTopicData) => (
//                 <div
//                   key={subTopicData.topicId}
//                   className="flex items-center text-white"
//                 >
//                   <input
//                     type="checkbox"
//                     id={`subTopic-${subTopicData.topicId}`}
//                     value={subTopicData.subTopic}
//                     checked={formData.topicsSelected.includes(
//                       subTopicData.topicId
//                     )}
//                     onChange={(e) =>
//                       handleSubTopicChange(subTopicData.topicId, e)
//                     }
//                     className="mr-2"
//                   />
//                   <label
//                     htmlFor={`subTopic-${subTopicData.topicId}`}
//                     className="text-sm"
//                   >
//                     {subTopicData.subTopic} - {subTopicData.description}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="selectedData"
//               className="block text-sm font-semibold text-white"
//             >
//               Selected Topics:
//             </label>
//             <textarea
//               id="selectedData"
//               placeholder="selected topics will show here."
//               value={getTextAreaValue()}
//               readOnly
//               rows={6}
//               className="w-full mt-2 p-2 border border-gray-300 rounded"
//             />
//           </div>

//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
//             >
//               Submit
//             </button>
//           </div>
//           {present && (
//             <div className="flex items-center justify-center ">
//               <p className="text-red-400">User already registered</p>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Form;
import React, { useState, useEffect, useRef } from "react";
import { useResponse } from "@/contex/Contex";
import { useRouter } from "next/router";

type FormData = {
  empId: string | number;
  empName: string;
  empMailId: string;
  topicsSelected: number[];
};

interface Data {
  topicId: number;
  subTopic: string;
  description: string;
  message: string;
}

const Form: React.FC = () => {
  const [Datas, setData] = useState<Data[]>([]);
  const [noDataMessage, setNoDataMessage] = useState<string | null>(null);
  const [notuserMessage, setNotUserMessage] = useState<string | null>(null);
  const { updateResponse } = useResponse();
  const route = useRouter();
  const inputref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputref.current) {
      inputref.current.focus();
    }
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/fetch-data");
        const data = await response.json();
        const status = await response.status;
        if (status === 200) {
          setData(data);
          setNoDataMessage(null);
        } else {
          setNoDataMessage(data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setNoDataMessage("please try again");
      }
    };

    fetchData();
  }, []);

  const [formData, setFormData] = useState<FormData>({
    empId: "",
    empName: "",
    empMailId: "",
    topicsSelected: [],
  });

  const handleSubTopicChange = (
    topicId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedSubTopics = e.target.checked
      ? [...formData.topicsSelected, topicId]
      : formData.topicsSelected.filter((id) => id !== topicId);

    setFormData({
      ...formData,
      topicsSelected: updatedSubTopics,
    });
  };

  const getTextAreaValue = () => {
    const selectedSubTopics = formData.topicsSelected.map((topicId) => {
      const subTopicData = Datas.find((item) => item.topicId === topicId);
      return subTopicData ? subTopicData.subTopic : "";
    });

    return selectedSubTopics.join("\n");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8080/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      const status = await response.status;

      console.log(status);
      if (status === 200) {
        updateResponse(result);
        setNotUserMessage(null);
        route.push("/showdetails");
      } else {
        setNotUserMessage(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while submitting data.");
    }
  };

  return (
    <div className="bg-black">
      <div className="relati flex items-center justify-between p-3 flex-col sm:flex-row">
        <img src="Logo 2.png" alt="Logo" className="h-20 w-auto mb-4 sm:mb-0" />

        <div className="flex-grow text-center ">
          <h1 className="text-3xl font-semibold text-white">
            L&D Program - 2025
          </h1>
          <h1 className="text-3xl font-semibold text-white">
            Speaker Registration Form
          </h1>
        </div>
      </div>
      <div className="p-5 max-w-xl mx-auto">
        {noDataMessage && (
          <div className="mb-4 text-center text-red-400">
            <p>{noDataMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="id"
              className="block text-sm font-semibold text-white"
            >
              Employee Id:
            </label>
            <input
              ref={inputref}
              type="number"
              id="id"
              placeholder="123"
              value={formData.empId}
              onChange={(e) =>
                setFormData({ ...formData, empId: parseInt(e.target.value) })
              }
              className="w-full mt-2 p-2 border-none outline-none bg-transparentn "
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-white"
            >
              Employee Name:
            </label>
            <input
              type="text"
              id="name"
              placeholder="abc"
              value={formData.empName}
              onChange={(e) =>
                setFormData({ ...formData, empName: e.target.value })
              }
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white"
            >
              Employee Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="acb@techouts.com"
              value={formData.empMailId}
              onChange={(e) =>
                setFormData({ ...formData, empMailId: e.target.value })
              }
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="subTopics"
              className="block text-sm font-semibold text-white"
            >
              Select Topics:
            </label>
            <div className="space-y-2 overflow-y-scroll h-36">
              {Datas.map((subTopicData) => (
                <div
                  key={subTopicData.topicId}
                  className="flex items-center text-white"
                >
                  <input
                    type="checkbox"
                    id={`subTopic-${subTopicData.topicId}`}
                    value={subTopicData.subTopic}
                    checked={formData.topicsSelected.includes(
                      subTopicData.topicId
                    )}
                    onChange={(e) =>
                      handleSubTopicChange(subTopicData.topicId, e)
                    }
                    className="mr-2"
                  />
                  <label
                    htmlFor={`subTopic-${subTopicData.topicId}`}
                    className="text-sm"
                  >
                    {subTopicData.subTopic} - {subTopicData.description}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="selectedData"
              className="block text-sm font-semibold text-white"
            >
              Selected Topics:
            </label>
            <textarea
              id="selectedData"
              placeholder="selected topics will show here."
              value={getTextAreaValue()}
              readOnly
              rows={6}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
          {notuserMessage && (
            <div className="mb-4 text-center text-red-400">
              <p>{notuserMessage}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
