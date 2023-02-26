import Image from "next/image"
import styles from "../styles/about.module.scss";

interface JobProps {
    title: string; 
    start: string;
    end?: string;
    logo: string; 
    description: string;
}

export default function Job(props: JobProps) {
    return (
        <div className="flex m-5">
                <Image src={props.logo} 
                    alt="company logo" height={100} width={100} className={styles.companyImage + " mr-5"}></Image>
                <div>
                    <h3 className="text-lg font-bold">{props.title}</h3>
                    <p className="text-sm font-semibold">{props.start} - {props.end ?? 'Present'}</p>
                    {props.description}
                </div>
        </div>
    )
}