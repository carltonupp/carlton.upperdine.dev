import { Job } from "./models";

export const getJobs = async (): Promise<Job[]> => {
  const res = await fetch("/api/jobs");
  return await res.json();
};
