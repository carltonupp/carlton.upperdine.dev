import { RecentPost } from "../../src/components/RecentPost";
import "@testing-library/jest-dom";
import { RenderResult, render } from "@testing-library/react";

describe("Recent Post component", () => {
  let body: RenderResult;

  beforeEach(() => {
    const frontmatter = {
      blurb: "Now this is a story all about how...",
      date: "01/01/2001",
      title: "Hello, World!",
    };

    body = render(<RecentPost slug="hello-world" frontmatter={frontmatter} />);
  });

  it("renders the correct post title", () => {
    expect(body.getByText("Hello, World!")).toBeInTheDocument();
  });

  it("renders with the correct date format", () => {
    expect(body.getByText("Published: Mon Jan 01 2001")).toBeInTheDocument();
  });

  it("renders with the correct blurb", () => {
    expect(
      body.getByText("Now this is a story all about how...")
    ).toBeInTheDocument();
  });

  it("renders with the correct link href", () => {
    const link = body.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toContain("/post/hello-world");
  });
});
