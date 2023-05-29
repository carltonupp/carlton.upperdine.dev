import { Job } from "@/core/jobs";
import type { NextApiRequest, NextApiResponse } from "next";

const jobs: Job[] = [
  {
    company: "BJSS",
    description: `Working as a consultant for a variety of industries and 
                clients. Most recently I have been working on a large scale digital 
                transformation program for a leading British online gambling company 
                and am now working on a project for a public sector client.`,
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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Job[]>
) {
  res.status(200).json([...jobs]);
}
