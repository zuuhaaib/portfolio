import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "projects",
  description: "things zuhaib made instead of sleeping.",
};

export default function Page() {
  return <ProjectsClient />;
}
