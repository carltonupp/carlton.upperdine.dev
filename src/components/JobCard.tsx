import { Job } from "@/shared/models";
import Image from "next/image";

export default function JobCard(props: { job: Job }) {
  return (
    <div className="flex my-5">
      <Image
        src={props.job.logo}
        alt="company logo"
        height={100}
        width={100}
        className={"mr-5 hidden md:block"}
      ></Image>
      <div>
        <h3 className="text-lg font-bold">{props.job.title}</h3>
        <p className="text-sm font-bold">{props.job.company}</p>
        <p className="text-sm font-semibold">
          {props.job.start} - {props.job.end ?? "Present"}
        </p>
        {props.job.description}
      </div>
    </div>
  );
}
