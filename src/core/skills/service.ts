import { Skill } from "./models";

export const getSkills = async (): Promise<Skill[]> => {
    const res = await fetch("/api/skills");
    return await res.json();
};