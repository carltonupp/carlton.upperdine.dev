import { Skill } from "../models";

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
      level: 80,
    },
    {
      technology: "Go",
      level: 60,
    },
    {
      technology: "Java/Kotlin",
      level: 75,
    },
    {
      technology: "Spring Boot",
      level: 75,
    },
    {
      technology: "ASP.NET Core",
      level: 95,
    },
    {
      technology: "Node.js",
      level: 80,
    },
    {
      technology: "SQL Server",
      level: 70,
    },
  ];

export class SkillService {
    static getAll(): Skill[] {
        return skills
    }
}