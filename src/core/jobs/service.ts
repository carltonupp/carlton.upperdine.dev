import { Job } from "./models";

export const getJobs = (): Promise<Job[]> => {
  return fetch("/api/jobs").then((res) => res.json());
};
