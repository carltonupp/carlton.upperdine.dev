import SkillCard from "../../src/components/SkillCard";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

describe("Skill Card component", () => {
  it("renders with the correct skill name", () => {
    const body = render(<SkillCard skillName="jest" proficiency={99} />);
    expect(body.getByText("jest")).toBeInTheDocument();
  });
});
