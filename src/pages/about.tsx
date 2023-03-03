import JobCard from "@/components/JobCard";
import SkillCard from "@/components/SkillCard";
import { JobService, SkillService } from "@/shared/services";
import Head from "next/head";

export default function About() {
  const skills = SkillService.getAll();
  const jobs = JobService.getAll();

  return (
    <div className="mx-auto w-10/12 md:w-7/12">
      <Head>
        <title>/home/carlton/about</title>
      </Head>
      <h2 className="text-2xl">Hello!</h2>
      <div className="mt-5">
        I am a Software Engineer currently based in the UK and have worked on
        software in a number of industries including transport, cyber safety and
        sports betting. I am particularly interested in system design,
        functional programming, cloud architecture, and high scale systems.
      </div>

      <br />
      <h2 className="text-2xl">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row auto-rows-max">
        {skills
          .sort((a, b) => (a.level < b.level ? 1 : -1))
          .map((p, i) => {
            return (
              <div key={i} className="mr-5 mt-5">
                <SkillCard skillName={p.technology} proficiency={p.level} />
              </div>
            );
          })}
      </div>
      <br />
      <h2 className="text-2xl">Experience</h2>
      {jobs.map((j, i) => {
        return <JobCard job={j} key={i} />;
      })}
    </div>
  );
}
