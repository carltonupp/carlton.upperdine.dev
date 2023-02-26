import Job from "@/components/Job";
import Skill from "@/components/Skill";
import { Experience, Proficiency } from "@/shared/models";

export default function About() {
    const proficiencies: Proficiency[] = [
        {
            technology: "C#",
            level: 100
        },
        {
            technology: "TypeScript",
            level: 95
        },
        {
            technology: "Microsoft Azure",
            level: 90
        },
        {
            technology: "Angular",
            level: 90
        },
        {
            technology: "Terraform",
            level: 75
        },
        {
            technology: "React",
            level: 80
        },
        {
            technology: "Go",
            level: 60
        },
        {
            technology: "Java/Kotlin",
            level: 75
        },
        {
            technology: "Spring Boot",
            level: 75
        },
        {
            technology: "ASP.NET Core",
            level: 95
        },
        {
            technology: "Azure DevOps",
            level: 90
        },
        {
            technology: "SQL Server",
            level: 70
        }
    ];

    const jobs: Experience[] = [
        {
            company: "BJSS",
            description: `BJSS is the leading technology and engineering consultancy 
                for business. Trusted by our clients, we collaborate with some of the 
                world’s leading organisations to deliver complex, innovative technology, 
                engineering, and industry solutions that millions of people use every day.`,
            logo: "/companies/bjss.svg",
            start: "September 2022",
            title: "Senior Software Engineer"
        },
        {
            company: "Smoothwall",
            description: `Smoothwall is the leading digital safeguarding solutions provider 
                in UK Education. 12,500 schools, colleges and multi-academy trusts 
                depend on our technologies to keep their students safe and their 
                education organisations compliant.`,
            logo: "/companies/smoothwall.svg",
            start: "May 2021",
            end: "May 2022",
            title: "Senior Software Engineer"

        },
        {
            company: "3Squared",
            description: `
            At 3Squared, we design, develop and commission integrated software solutions for some of the UKs biggest brands within rail and construction.

            Our teams collaborate across disciplines to provide integrated, compelling multiplatform software solutions that deliver value to our customers.
            
            We have a powerful, flexible and integrated software platform designed to support the operations of today’s modern rail operators and support the Digital Railway.
            `,
            logo: "/companies/3squared.svg",
            start: "January 2019",
            end: "May 2021",
            title: "Software Engineer"
        },
        {
            company: "MAM Software (acquired by KCS)",
            description: `
            Kerridge Commercial Systems (KCS), the parent 
            company of MAM Software, provides specialised 
            software, services, and support to deliver fully 
            integrated trading and business management solutions 
            to companies in the distributive trades across the world.
            `,
            logo: "companies/MAM.svg",
            start: "May 2016",
            end: "December 2018",
            title: "Software Engineer"
        }
    ]

    return (
        <div className="mx-auto w-7/12">
            <h2 className="text-2xl">Hello!</h2>
            <div className="mt-5">
                I am a Software Engineer currently based in the UK and have worked on software in a number of industries 
                including transport, cyber safety and sports betting. I am particularly interested in system design, functional programming, cloud architecture, and high 
                scale systems.
            </div>

            <br />
            <h2 className="text-2xl">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row auto-rows-max">
                {proficiencies.sort((a, b) => a.level < b.level ? 1 : -1).map((p, i) => {
                    return (
                        <div key={i} className="mr-5 mt-5">
                            <Skill skillName={p.technology} proficiency={p.level}/>
                        </div>
                    );
                })}
            </div>
            <br />
            <h2 className="text-2xl">Experience</h2>
            {jobs.map((j, i) => {
                return (
                    <Job job={j} key={i} />
                )
            })}
        </div>
    )
}