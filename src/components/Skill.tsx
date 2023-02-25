import styles from '../styles/about.module.scss';

export default function Skill(props: {skillName: string, proficiency: number}) {
    const style = getStyling(props.proficiency)

    return (
        <div className={styles.skill} style={{ background: style }}>
            {props.skillName}
        </div>
    );
}

const getStyling = (percentage: number) => {
    const remaining = 100 - percentage;
    const color = getFillColour(percentage);
    return `linear-gradient(to right, ${color} ${percentage}%, white ${remaining}%)`
}

const getFillColour = (percentage: number) => {
    if (percentage > 80) {
        return styles.green;
    }
    if (percentage > 50) {
        return styles.amber;
    }

    return styles.red;
}