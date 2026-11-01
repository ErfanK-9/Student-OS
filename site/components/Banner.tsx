"use client";
// The animated feature banner (Stageshow kit). Each Stage server-renders its poster
// frame, so reduced-motion viewers and the first paint both get the finished still.
import StudentOsGrid from "./banner";

export default function Banner() {
  return (
    <div role="img" aria-label="Student OS demo: /today writes a morning brief, /study runs a timed quiz, /apply matches a resume line to a job ad.">
      <StudentOsGrid />
    </div>
  );
}
