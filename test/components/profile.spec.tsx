import Profile from "../../src/components/Profile";
import "@testing-library/jest-dom";
import { RenderResult, render } from "@testing-library/react";

describe("Profile component", () => {
  let body: RenderResult;

  beforeEach(() => {
    body = render(<Profile />);
  });

  it("renders with the correct display picture", () => {
    const image = body.getByAltText(
      "me enjoying the scenery of Zakynthos town"
    );
    expect(image).toBeInTheDocument();
    expect(image.getAttribute("src")).toContain("pfp.jpg");
  });
});
