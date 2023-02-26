import Job from "@/components/Job";
import Skill from "@/components/Skill";
import { Experience, Proficiency } from "@/shared/models";
import Head from "next/head";

export default function About() {
  const proficiencies: Proficiency[] = [
    {
      technology: "C#",
      level: 100,
    },
    {
      technology: "TypeScript",
      level: 95,
    },
    {
      technology: "Microsoft Azure",
      level: 90,
    },
    {
      technology: "Angular",
      level: 90,
    },
    {
      technology: "Terraform",
      level: 75,
    },
    {
      technology: "React",
      level: 80,
    },
    {
      technology: "Go",
      level: 60,
    },
    {
      technology: "Java/Kotlin",
      level: 75,
    },
    {
      technology: "Spring Boot",
      level: 75,
    },
    {
      technology: "ASP.NET Core",
      level: 95,
    },
    {
      technology: "Azure DevOps",
      level: 90,
    },
    {
      technology: "SQL Server",
      level: 70,
    },
  ];

  const jobs: Experience[] = [
    {
      company: "BJSS",
      description: `Working as a consultant for a variety of industries and 
                clients. Most recently I have been working on a large scale digital 
                transformation program for a leading British online gambling company.`,
      logo: "/companies/bjss.svg",
      start: "September 2022",
      title: "Senior Software Engineer",
    },
    {
      company: "Smoothwall",
      description: `Working as the technical lead for the company's Cloud Filter 
                solution, I was tasked with evolving the team's engineering practices 
                as the application scaled. At peak our system hit approximately 250k 
                devices using our solution, and the critical nature of our product meant
                that stability was crucial.`,
      logo: "/companies/smoothwall.svg",
      start: "May 2021",
      end: "May 2022",
      title: "Senior Software Engineer",
    },
    {
      company: "3Squared",
      description: `Worked on a number of products under the 3Squared banner, developing features 
                and fixing bugs. Outside of my product work, I built a number of internal libraries used
                by the wider team including a framework for creating ASP.NET Core health checks. I also 
                temporarily took charge of the company's cloud estate in Azure, utilising IaC tooling such
                as Terraform to provision and manage resources, as well as offering guidance on 
                architectural decisions.`,
      logo: "/companies/3squared.svg",
      start: "January 2019",
      end: "May 2021",
      title: "Software Engineer",
    },
    {
      company: "MAM Software",
      description: `Predominantly working on a SaaS product used by garages across the UK and North America
                to manage their bookings. I added a number of features to the application, as well as being part of
                a massive rewrite of core parts of the application using React and TypeScript. Prior to this role, 
                I worked as a QA Engineer, and used Selenium WebDriver to create automated tests using C#.`,
      logo: "companies/MAM.svg",
      start: "May 2011",
      end: "December 2018",
      title: "Software Engineer",
    },
  ];

  return (
    <div className="mx-auto w-7/12">
      <Head>
        <title>🧔🏻‍♂️ | Carlton Upperdine</title>
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
        {proficiencies
          .sort((a, b) => (a.level < b.level ? 1 : -1))
          .map((p, i) => {
            return (
              <div key={i} className="mr-5 mt-5">
                <Skill skillName={p.technology} proficiency={p.level} />
              </div>
            );
          })}
      </div>
      <br />
      <h2 className="text-2xl">Experience</h2>
      {jobs.map((j, i) => {
        return <Job job={j} key={i} />;
      })}
    </div>
  );
}
