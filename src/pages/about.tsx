import Skill from "@/components/Skill";
import Image from "next/image";

type Experience = "Highly Proficient" | "Proficient" | "Some Experience" | "Learning";

interface Proficiency {
    technology: string;
    level: number;
}

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
    ]

    return (
        <div className="mx-auto w-7/12">
            <h2 className="text-2xl">Hello!</h2>
            <div className="">
                
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
            <div className="flex">
                <Image src="https://www.bjss.com/hubfs/bjss_logo_25_Blue%26Navy%20(RGB).svg" alt="company logo"
                    height={55} width={100} className="mr-5"></Image>
                <div>
                    <h3 className="text-lg font-bold">Software Engineer</h3>
                    <p className="text-sm font-semibold">September 2022 - Present</p>
                    BJSS is the leading technology and engineering consultancy 
                    for business. Trusted by our clients, we collaborate with 
                    some of the world’s leading organisations to deliver complex, 
                    innovative technology, engineering, and industry solutions 
                    that millions of people use every day.
                </div>
            </div>
        </div>
    )
}