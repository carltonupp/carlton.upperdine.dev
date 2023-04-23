import { getStyling } from "../../../src/shared/utilities/skillCardBackgroundCalculator";

test("returns green linear gradient given proficiency > 80", () => {
  expect(getStyling(81)).toBe(
    "linear-gradient(to right, rgba(101, 221, 131, 0.5) 81%, white 19%)"
  );
});

test("returns amber linear gradient given proficiency > 50", () => {
  expect(getStyling(61)).toBe(
    "linear-gradient(to right, rgba(223, 162, 30, 0.5) 61%, white 39%)"
  );
});

test("returns red linear gradient given proficiency <= 50", () => {
  expect(getStyling(50)).toBe(
    "linear-gradient(to right, rgba(190, 62, 62, 0.5) 50%, white 50%)"
  );
});

test("returns reversed linear gradient given proficiency < 50", () => {
  expect(getStyling(49)).toBe(
    "linear-gradient(to left, white 51%, rgba(190, 62, 62, 0.5) 49%)"
  );
});
