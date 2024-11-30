// import React, { useState, useEffect } from "react";

// type FormData = {
//   id: string | number;
//   name: string;
//   email: string;
//   topics: string[];
//   subTopics: Record<string, string[]>;
// };

// interface Data {
//   topic: string;
//   subTopic: string;
//   description: string;
// }

// interface Dataprop {
//   Datas: Data[];
// }

// const Form: React.FC = () => {
//   const [Datas, setData] = useState<Data[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/datas");

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const data: Data[] = await response.json();
//         setData(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const [formData, setFormData] = useState<FormData>({
//     id: "",
//     name: "",
//     email: "",
//     topics: [],
//     subTopics: {},
//   });

//   const [subTopics, setSubTopics] = useState<
//     Record<string, { subTopic: string; description: string }[]>
//   >({});

//   const topics = Array.from(new Set((Datas || []).map((data) => data.topic)));

//   const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedTopic = e.target.value;
//     setFormData((prev) => {
//       const updatedTopics = e.target.checked
//         ? [...prev.topics, selectedTopic]
//         : prev.topics.filter((topic) => topic !== selectedTopic);
//       return { ...prev, topics: updatedTopics };
//     });
//   };

//   useEffect(() => {
//     const selectedSubTopics: Record<
//       string,
//       { subTopic: string; description: string }[]
//     > = {};

//     formData.topics.forEach((topic) => {
//       const subTopicsForTopic = Datas.filter(
//         (item) => item.topic === topic
//       ).map((item) => ({
//         subTopic: item.subTopic,
//         description: item.description,
//       }));
//       selectedSubTopics[topic] = subTopicsForTopic;
//     });

//     setSubTopics(selectedSubTopics);
//   }, [formData.topics, Datas]);

//   const handleSubTopicChange = (
//     topic: string,
//     subTopic: string,
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const selectedSubTopics = formData.subTopics[topic] || [];
//     const updatedSubTopics = e.target.checked
//       ? [...selectedSubTopics, subTopic]
//       : selectedSubTopics.filter((sub) => sub !== subTopic);

//     setFormData((prev) => ({
//       ...prev,
//       subTopics: {
//         ...prev.subTopics,
//         [topic]: updatedSubTopics,
//       },
//     }));
//   };

//   const getTextAreaValue = () => {
//     let text = "";
//     formData.topics.forEach((topic) => {
//       text += `${topic}:\n`;
//       const subTopicsForTopic = formData.subTopics[topic] || [];
//       subTopicsForTopic.forEach((subTopic) => {
//         text += `  - ${subTopic}\n`;
//       });
//       text += "\n";
//     });
//     return text;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("/api/hello", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         alert("Data submitted successfully!");
//       } else {
//         alert("Failed to submit data.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Error occurred while submitting data.");
//     }
//   };

//   return (
//     <div className="bg-black">
//       <div className="flex items-center justify-between p-4">
//         <img src="Logo 2.png" alt="Logo" className="h-16 w-auto" />

//         <div className="flex-grow text-center">
//           <h1 className="text-3xl font-semibold text-white">
//             L&D Program - 2025
//           </h1>
//           <h1 className="text-3xl font-semibold text-white">
//             Speaker Registration Form
//           </h1>
//         </div>
//       </div>
//       {/* <h1></h1>
//       <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
//         L&D Program - 2025
//       </h1>
//       <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
//         Speaker Registration Form
//       </h2> */}
//       <div className="p-5 max-w-xl mx-auto">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="mb-4">
//             <label
//               htmlFor="id"
//               className="block text-sm font-semibold  text-white"
//             >
//               Employee Id:
//             </label>
//             <input
//               type="number"
//               id="name"
//               value={formData.id}
//               onChange={(e) =>
//                 setFormData({ ...formData, id: parseInt(e.target.value) })
//               }
//               className="w-full mt-2 p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="name"
//               className="block text-sm font-semibold  text-white"
//             >
//               Employee Name:
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//               className="w-full mt-2 p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-sm font-semibold  text-white"
//             >
//               Employee Email:
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               className="w-full mt-2 p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>

//           {/* <div className="mb-4">
//             <label
//               htmlFor="topic"
//               className="block text-sm font-semibold  text-white"
//             >
//               Select Topics
//             </label>
//             <div className="space-y-2">
//               {topics.map((topic) => (
//                 <div key={topic} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={`topic-${topic}`}
//                     value={topic}
//                     checked={formData.topics.includes(topic)}
//                     onChange={handleTopicChange}
//                     className="mr-2"
//                   />
//                   <label
//                     htmlFor={`topic-${topic}`}
//                     className="text-sm font-semibold  text-white"
//                   >
//                     {topic}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div> */}

//           {formData.topics.map((topic) => (
//             <div key={topic} className="mb-4">
//               <label
//                 htmlFor={`subTopic-${topic}`}
//                 className="block text-sm font-semibold  text-white"
//               >
//                 Select Subtopics for {topic}
//               </label>
//               <div className="space-y-2">
//                 {subTopics[topic]?.map((subTopicData) => (
//                   <div
//                     key={subTopicData.subTopic}
//                     className="flex items-center  text-white "
//                   >
//                     <input
//                       type="checkbox"
//                       id={`subTopic-${subTopicData.subTopic}`}
//                       value={subTopicData.subTopic}
//                       checked={
//                         formData.subTopics[topic]?.includes(
//                           subTopicData.subTopic
//                         ) || false
//                       }
//                       onChange={(e) =>
//                         handleSubTopicChange(topic, subTopicData.subTopic, e)
//                       }
//                       className="mr-2"
//                     />
//                     <label
//                       htmlFor={`subTopic-${subTopicData.subTopic}`}
//                       className="text-sm"
//                     >
//                       {subTopicData.subTopic} - {subTopicData.description}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}

//           <div className="mb-4">
//             <label
//               htmlFor="selectedData"
//               className="block text-sm font-semibold  text-white"
//             >
//               Selected Topics and Subtopics
//             </label>
//             <textarea
//               id="selectedData"
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
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Form;
import React, { useState, useEffect } from "react";

type FormData = {
  id: string | number;
  name: string;
  email: string;
  topics: string[];
  subTopics: Record<string, string[]>;
};

interface Data {
  topic: string;
  subTopic: string;
  description: string;
  subTopicId: string;
}

interface Dataprop {
  Datas: Data[];
}

const Form: React.FC = () => {
  const [Datas, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/datas");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: Data[] = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [formData, setFormData] = useState<FormData>({
    id: "",
    name: "",
    email: "",
    topics: [],
    subTopics: {},
  });

  const [subTopics, setSubTopics] = useState<
    Record<string, { subTopic: string; description: string }[]>
  >({});

  const topics = Array.from(new Set((Datas || []).map((data) => data.topic)));

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTopic = e.target.value;
    setFormData((prev) => {
      const updatedTopics = e.target.checked
        ? [...prev.topics, selectedTopic]
        : prev.topics.filter((topic) => topic !== selectedTopic);
      return { ...prev, topics: updatedTopics };
    });
  };

  useEffect(() => {
    const selectedSubTopics: Record<
      string,
      { subTopic: string; description: string }[]
    > = {};

    formData.topics.forEach((topic) => {
      const subTopicsForTopic = Datas.filter(
        (item) => item.topic === topic
      ).map((item) => ({
        subTopic: item.subTopic,
        description: item.description,
      }));
      selectedSubTopics[topic] = subTopicsForTopic;
    });

    setSubTopics(selectedSubTopics);
  }, [formData.topics, Datas]);

  const handleSubTopicChange = (
    topic: string,
    subTopic: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedSubTopics = formData.subTopics[topic] || [];
    const updatedSubTopics = e.target.checked
      ? [...selectedSubTopics, subTopic]
      : selectedSubTopics.filter((sub) => sub !== subTopic);

    setFormData((prev) => ({
      ...prev,
      subTopics: {
        ...prev.subTopics,
        [topic]: updatedSubTopics,
      },
    }));
  };

  const getTextAreaValue = () => {
    let text = "";
    formData.topics.forEach((topic) => {
      text += `${topic}\n`;
      text += "\n";
    });
    return text;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Data submitted successfully!");
      } else {
        alert("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while submitting data.");
    }
  };

  return (
    <div className="bg-black">
      <div className="flex items-center justify-between p-4">
        <img src="Logo 2.png" alt="Logo" className="h-16 w-auto" />

        <div className="flex-grow text-center">
          <h1 className="text-3xl font-semibold text-white">
            L&D Program - 2025
          </h1>
          <h1 className="text-3xl font-semibold text-white">
            Speaker Registration Form
          </h1>
        </div>
      </div>
      {/* <h1></h1>
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        L&D Program - 2025
      </h1>
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Speaker Registration Form
      </h2> */}
      <div className="p-5 max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="id"
              className="block text-sm font-semibold  text-white"
            >
              Employee Id:
            </label>
            <input
              type="number"
              id="name"
              value={formData.id}
              onChange={(e) =>
                setFormData({ ...formData, id: parseInt(e.target.value) })
              }
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold  text-white"
            >
              Employee Name:
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold  text-white"
            >
              Employee Email:
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* <div className="mb-4">
            <label
              htmlFor="topic"
              className="block text-sm font-semibold  text-white"
            >
              Select Topics
            </label>
            <div className="space-y-2">
              {topics.map((topic) => (
                <div key={topic} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`topic-${topic}`}
                    value={topic}
                    checked={formData.topics.includes(topic)}
                    onChange={handleTopicChange}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`topic-${topic}`}
                    className="text-sm font-semibold  text-white"
                  >
                    {topic}
                  </label>
                </div>
              ))}
            </div>
          </div> */}
          <div className="mb-4">
            <label
              htmlFor="topic"
              className="block text-sm font-semibold  text-white"
            >
              Select Topics
            </label>
            <div className="space-y-2">
              {Datas.map((topic) => (
                <div key={topic.topic} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`topic-${topic}`}
                    value={topic.subTopic}
                    checked={formData.topics.includes(topic.subTopic)}
                    onChange={handleTopicChange}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`topic-${topic}`}
                    className="text-sm font-semibold  text-white"
                  >
                    {topic.subTopic}-{topic.description}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* {formData.topics.map((topic) => (
            <div key={topic} className="mb-4">
              <label
                htmlFor={`subTopic-${topic}`}
                className="block text-sm font-semibold  text-white"
              >
                Select Subtopics for {topic}
              </label>
              <div className="space-y-2">
                {subTopics[topic]?.map((subTopicData) => (
                  <div
                    key={subTopicData.subTopic}
                    className="flex items-center  text-white "
                  >
                    <input
                      type="checkbox"
                      id={`subTopic-${subTopicData.subTopic}`}
                      value={subTopicData.subTopic}
                      checked={
                        formData.subTopics[topic]?.includes(
                          subTopicData.subTopic
                        ) || false
                      }
                      onChange={(e) =>
                        handleSubTopicChange(topic, subTopicData.subTopic, e)
                      }
                      className="mr-2"
                    />
                    <label
                      htmlFor={`subTopic-${subTopicData.subTopic}`}
                      className="text-sm"
                    >
                      {subTopicData.subTopic} - {subTopicData.description}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))} */}

          <div className="mb-4">
            <label
              htmlFor="selectedData"
              className="block text-sm font-semibold  text-white"
            >
              Selected Topics and Subtopics
            </label>
            <textarea
              id="selectedData"
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
        </form>
      </div>
    </div>
  );
};

export default Form;
