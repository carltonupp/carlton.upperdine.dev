import { Experience } from "@/shared/models";
import Image from "next/image";
import styles from "../styles/about.module.scss";

export default function Job(props: { job: Experience }) {
  return (
    <div className="flex my-5">
      <Image
        src={props.job.logo}
        alt="company logo"
        height={100}
        width={100}
        className={styles.companyImage + " mr-5"}
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
