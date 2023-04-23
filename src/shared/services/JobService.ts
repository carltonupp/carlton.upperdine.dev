import { Job } from "../models";

export class JobService {
  static async getAll(): Promise<Job[]> {
    const res = await fetch("/api/jobs");
    return await res.json();
  }
}
