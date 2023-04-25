import {JobCard, SkillCard} from "@/components";
import { getJobs, Job } from "@/core/jobs";
import { getSkills, Skill } from "@/core/skills";
import { buildPageTitle } from "@/core/utils";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function About() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    function populate() {
      Promise.all([getJobs(), getSkills()]).then(
        ([jobs, skills]) => {
          setJobs(jobs);
          setSkills(skills);
        }
      );
    }

    if (!jobs.length || !skills?.length) {
      populate();
    }
  }, [jobs, skills]);

  return (
    <>
      <Head>
        <title>{buildPageTitle("About")}</title>
      </Head>
      <div className="mx-auto w-10/12 md:w-7/12">
        <h2 className="text-2xl">Hello!</h2>
        <div className="mt-5">
          I am a Software Engineer currently based in the UK and have worked on
          software in a number of industries including transport, cyber safety
          and sports betting. I am particularly interested in system design,
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
        {jobs?.map((j, i) => {
          return <JobCard job={j} key={i} />;
        })}
      </div>
    </>
  );
}
