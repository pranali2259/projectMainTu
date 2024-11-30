import { useState } from "react";
import data from "@/pages/data/data.json";
import { Autocomplete, TextField } from "@mui/material";

const Index = () => {
  const topics = [...new Set(data.map((each) => each.topic))];

  const [topic, setTopic] = useState<string>(topics[0]);

  const subtopics = data
    .filter((each) => each.topic === topic)
    .map((item) => item.subTopic);
  const [subTopic, setSubtopic] = useState<string[]>([]);

  return (
    <>
      <select
        onChange={(e) => {
          setTopic(e.target.value), setSubtopic([]);
        }}
        value={topic}
      >
        {topics.map((each) => (
          <option key={each} value={each}>
            {each}
          </option>
        ))}
      </select>
      <br />
      <Autocomplete
        multiple
        id="tags-outlined"
        options={subtopics}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        value={subTopic}
        onChange={(e: any, newValue: string[]) => setSubtopic(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Subtopics"
            placeholder="Select subtopics"
          />
        )}
      />
    </>
  );
};

export default Index;
export async function getServerSideProps() {
  try {
    const response = await fetch("http://localhost:5000/Tours");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return {
      props: {
        Tours: data || [],
      },
    };
  } catch (error) {
    console.error("Error fetching Tours:", error);
    return {
      props: {
        Tours: [],
      },
    };
  }
}
