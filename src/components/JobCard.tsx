import { Job } from "@/shared/models";
import Image from "next/image";

interface JobCardProps {
  job: Job;
}

function JobCard({ job }: JobCardProps) {
  return (
    <div className="flex my-5">
      <Image
        src={job.logo}
        alt="company logo"
        height={100}
        width={100}
        className={"mr-5 hidden md:block"}
      ></Image>
      <div>
        <h3 className="text-lg font-bold" id="job-title">
          {job.title}
        </h3>
        <p className="text-sm font-bold" id="job-company">
          {job.company}
        </p>
        <p className="text-sm font-semibold" id="job-dates">
          {job.start} - {job.end ?? "Present"}
        </p>
        {job.description}
      </div>
    </div>
  );
}

export default JobCard;
