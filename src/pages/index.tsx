import React from "react";
import Form from "./Form/Form3";
import Detail from "@/pages/Detail/Detail";
import Link from "next/link";
interface Data {
  empId: number;
  empName: string;
  topicsSelected: string[];
}

interface DataProps {
  data: Data[];
}
const index: React.FC<DataProps> = ({ data }) => {
  return (
    <div className="bg-black">
      <Form />
      <Detail data={data} />
    </div>
  );
};

export default index;

export async function getServerSideProps() {
  try {
    const response = await fetch("http://127.0.0.1:8080/get-all-users");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: [],
      },
    };
  }
}
