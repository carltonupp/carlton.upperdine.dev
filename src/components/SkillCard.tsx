import styles from "../styles/about.module.scss";

export default function SkillCard(props: {
  skillName: string;
  proficiency: number;
}) {
  const style = getStyling(props.proficiency);

  return (
    <div
      className="border border-gray-300 rounded-md p-1 text-center"
      style={{ background: style }}
    >
      {props.skillName}
    </div>
  );
}

const getStyling = (percentage: number) => {
  const remaining = 100 - percentage;
  const color = getFillColour(percentage);

  if (percentage < 50) {
    // gradient only works 50% and up so I had to get creative...
    return `linear-gradient(to left, white ${remaining}%, ${color} ${percentage}%)`;
  }

  return `linear-gradient(to right, ${color} ${percentage}%, white ${remaining}%)`;
};

const getFillColour = (percentage: number) => {
  if (percentage > 80) {
    return styles.green;
  }
  if (percentage > 50) {
    return styles.amber;
  }

  return styles.red;
};
