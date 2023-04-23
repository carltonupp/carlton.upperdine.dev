import { getStyling } from "../core/utils";

export default function SkillCard(props: {
  skillName: string;
  proficiency: number;
}) {
  const style = getStyling(props.proficiency);

  return (
    <div
      data-testid="skill-card"
      className="border border-gray-300 rounded-md p-1 text-center"
      style={{ background: style }}
    >
      {props.skillName}
    </div>
  );
}
