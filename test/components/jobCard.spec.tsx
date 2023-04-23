import "@testing-library/jest-dom";
import { RenderResult, render } from "@testing-library/react";
import { JobCard } from "../../src/components";
import { Job } from "@/shared/models";

describe("Job Card Component", () => {
  let body: RenderResult;
  beforeEach(() => {
    body = render(
      <JobCard
        job={{
          company: "test company",
          title: "example job title",
          start: "01/01/2001",
          description: "description of duties",
          logo: "http://example.com/not-used.png",
        }}
      />
    );
  });

  it("renders with the correct company name", () => {
    expect(body.getByText("test company")).toBeInTheDocument();
  });

  it("renders with the correct job title", () => {
    expect(body.getByText("example job title")).toBeInTheDocument();
  });

  describe("renders with the correct job dates", () => {
    it("renders with an end date of present when one isn't supplied", () => {
      expect(body.getByText("01/01/2001 - Present")).toBeInTheDocument();
    });

    it("renders with the correct end date when one is supplied", () => {
      const job: Job = {
        company: "test company",
        title: "example job title",
        start: "01/01/2001",
        end: "01/01/2002",
        description: "description of duties",
        logo: "http://example.com/not-used.png",
      };

      const documentBody = render(<JobCard job={job} />);
      expect(
        documentBody.getByText("01/01/2001 - 01/01/2002")
      ).toBeInTheDocument();
    });
  });

  it("renders with the correct company image", () => {
    const image = body.getByAltText("company logo");
    expect(image).toBeInTheDocument();
    expect(image.getAttribute("src")).toContain("not-used.png");
  });

  it("renders with the correct job description", () => {
    expect(body.getByText("description of duties")).toBeInTheDocument();
  });
});
