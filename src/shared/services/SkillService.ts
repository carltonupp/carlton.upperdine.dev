import { Skill } from "../models";

export class SkillService {
    static async getAll(): Promise<Skill[]> {
        const res = await fetch("/api/skills")
        return await res.json();
    }
}