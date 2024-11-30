import React, { useState, useEffect } from "react";

type FormData = {
  id: number;
  employeeId: string;
  employeeName: string;
  email: string;
  topics: string[];
  subTopics: Record<string, string[]>;
};

interface Data {
  topic: string;
  subTopic: string;
  description: string;
}

const Form: React.FC = () => {
  const [Datas, setData] = useState<Data[]>([]);

  // Fetch the available topics and subtopics
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
    id: 0,
    employeeId: "",
    employeeName: "",
    email: "",
    topics: [],
    subTopics: {},
  });

  const [subTopics, setSubTopics] = useState<
    Record<string, { subTopic: string; description: string }[]>
  >({});

  // Extract unique topics from the fetched data
  const topics = Array.from(new Set(Datas.map((data) => data.topic)));

  // Handle topic selection and deselection
  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTopic = e.target.value;
    setFormData((prev) => {
      const updatedTopics = e.target.checked
        ? [...prev.topics, selectedTopic]
        : prev.topics.filter((topic) => topic !== selectedTopic);
      return { ...prev, topics: updatedTopics };
    });
  };

  // Update subtopics whenever topics change
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

  // Handle subtopic selection
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

  // Construct the string for the text area
  const getTextAreaValue = () => {
    let text = "";
    formData.topics.forEach((topic) => {
      text += `${topic}:\n`;
      const subTopicsForTopic = formData.subTopics[topic] || [];
      subTopicsForTopic.forEach((subTopic) => {
        text += `  - ${subTopic}\n`;
      });
      text += "\n";
    });
    return text;
  };

  // Submit form data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Log form data to check if it's correctly structured
    console.log("Submitting form data:", formData);

    try {
      const response = await fetch("http://localhost:3001/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error response from server:", errorResponse);
        alert(
          errorResponse.error || "Failed to submit data. Please try again."
        );
      } else {
        alert("Data submitted successfully!");
        setFormData({
          id: 0,
          employeeId: "",
          employeeName: "",
          email: "",
          topics: [],
          subTopics: {},
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while submitting data.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        L&D Program - 2025
      </h1>
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Speaker Registration Form
      </h2>
      <div className="p-6 max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Employee ID */}
          <div className="mb-4">
            <label htmlFor="employeeId" className="block text-sm font-semibold">
              Employee Id
            </label>
            <input
              type="text"
              id="employeeId"
              value={formData.employeeId}
              onChange={(e) =>
                setFormData({ ...formData, employeeId: e.target.value })
              }
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Employee Name */}
          <div className="mb-4">
            <label
              htmlFor="employeeName"
              className="block text-sm font-semibold"
            >
              Employee Name
            </label>
            <input
              type="text"
              id="employeeName"
              value={formData.employeeName}
              onChange={(e) =>
                setFormData({ ...formData, employeeName: e.target.value })
              }
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Employee Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold">
              Employee Email
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

          {/* Topics Selection */}
          <div className="mb-4">
            <label htmlFor="topic" className="block text-sm font-semibold">
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
                    className="text-sm font-semibold"
                  >
                    {topic}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Subtopics Selection */}
          {formData.topics.map((topic) => (
            <div key={topic} className="mb-4">
              <label
                htmlFor={`subTopic-${topic}`}
                className="block text-sm font-semibold"
              >
                Select Subtopics for {topic}
              </label>
              <div className="space-y-2">
                {subTopics[topic]?.map((subTopicData) => (
                  <div
                    key={subTopicData.subTopic}
                    className="flex items-center"
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
          ))}

          {/* Display Selected Topics and Subtopics */}
          <div className="mb-4">
            <label
              htmlFor="selectedData"
              className="block text-sm font-semibold"
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

          {/* Submit Button */}
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
