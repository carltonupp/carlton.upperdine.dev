import { Skill } from "@/shared/models";
import { NextApiRequest, NextApiResponse } from "next";
import jobs from "./jobs";

const skills: Skill[] = [
  {
    technology: "C#",
    level: 100,
  },
  {
    technology: "TypeScript",
    level: 95,
  },
  {
    technology: "Microsoft Azure",
    level: 90,
  },
  {
    technology: "Angular",
    level: 90,
  },
  {
    technology: "Terraform",
    level: 75,
  },
  {
    technology: "React",
    level: 90,
  },
  {
    technology: "Go",
    level: 60,
  },
  {
    technology: "Java/Kotlin",
    level: 80,
  },
  {
    technology: "Spring Boot",
    level: 80,
  },
  {
    technology: "ASP.NET Core",
    level: 95,
  },
  {
    technology: "Node.js",
    level: 85,
  },
  {
    technology: "SQL Server",
    level: 70,
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Skill[]>
) {
  res.status(200).json([...skills]);
}
