// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   id: number;
//   name: string;
//   email: string;
//   topics: string[];
//   subTopics: Record<string, string[]>;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<any>
// ) {
//   const apiUrl = "http://localhost:3000/data";

//   if (req.method === "GET") {
//     try {
//       const response = await fetch(apiUrl);
//       const comments = await response.json();
//       return res.status(200).json(comments);
//     } catch (error) {
//       return res.status(500).json({ error: "Error fetching comments." });
//     }
//   } else if (req.method === "POST") {
//     const { id, name, email, topics, subTopics }: Data = req.body;

//     if (
//       !id ||
//       !name ||
//       !email ||
//       !subTopics.id ||
//       Object.keys(subTopics).length === 0
//     ) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     try {
//       const newFormData: Data = {
//         id,
//         name,
//         email,
//         topics,
//         subTopics,
//       };

//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newFormData),
//       });

//       if (response.ok) {
//         return res.status(201).json(newFormData);
//       } else {
//         return res.status(500).json({ error: "Error saving form data." });
//       }
//     } catch (error) {
//       console.error("Error saving form data:", error);
//       return res
//         .status(500)
//         .json({ error: "There was an error saving the form data." });
//     }
//   } else {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }
// }
// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   id: number;
//   name: string;
//   email: string;
//   // topics: string[];
//   subTopics: Record<string, string[]>;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<any>
// ) {
//   const apiUrl = "http://localhost:3000/data";

//   if (req.method === "GET") {
//     try {
//       const response = await fetch(apiUrl);
//       const comments = await response.json();
//       return res.status(200).json(comments);
//     } catch (error) {
//       return res.status(500).json({ error: "Error fetching comments." });
//     }
//   } else if (req.method === "POST") {
//     const { id, name, email, subTopics }: Data = req.body;

//     if (
//       !id ||
//       !name ||
//       !email ||
//       !subTopics.id ||
//       Object.keys(subTopics).length === 0
//     ) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     try {
//       const newFormData: Data = {
//         id,
//         name,
//         email,
//         subTopics,
//       };

//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newFormData),
//       });

//       if (response.ok) {
//         return res.status(201).json(newFormData);
//       } else {
//         return res.status(500).json({ error: "Error saving form data." });
//       }
//     } catch (error) {
//       console.error("Error saving form data:", error);
//       return res
//         .status(500)
//         .json({ error: "There was an error saving the form data." });
//     }
//   } else {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }
// }
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  empId: number;
  empName: string;
  empMailId: string;
  topicsSelected: number[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const apiUrl = "http://localhost:3000/data";

  if (req.method === "GET") {
    try {
      const response = await fetch(apiUrl);
      const comments = await response.json();

      const simplifiedData = comments.map((item: any) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        subTopics: item.subTopics,
      }));

      return res.status(200).json(simplifiedData);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching comments." });
    }
  } else if (req.method === "POST") {
    const { empId, empMailId, empName, topicsSelected }: Data = req.body;

    if (
      !empId ||
      !empName ||
      !empMailId ||
      !topicsSelected ||
      topicsSelected.length === 0
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    try {
      const newFormData: Data = {
        empId,
        empName,
        empMailId,
        topicsSelected,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFormData),
      });

      if (response.ok) {
        return res.status(201).json(newFormData);
      } else {
        return res.status(500).json({ error: "Error saving form data." });
      }
    } catch (error) {
      console.error("Error saving form data:", error);
      return res
        .status(500)
        .json({ error: "There was an error saving the form data." });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
