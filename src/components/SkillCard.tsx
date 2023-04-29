import { getStyling } from "../core/skills";

interface SkillCardProps {
  skillName: string;
  proficiency: number;
}

export default function SkillCard({ proficiency, skillName }: SkillCardProps) {
  return (
    <div
      data-testid="skill-card"
      className="border border-gray-300 rounded-md p-1 text-center"
      style={{ background: getStyling(proficiency) }}
    >
      {skillName}
    </div>
  );
}
