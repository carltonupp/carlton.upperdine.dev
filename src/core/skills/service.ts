import { Skill } from "./models";

export const getSkills = (): Promise<Skill[]> => {
  return fetch("/api/skills").then((res) => res.json());
};
