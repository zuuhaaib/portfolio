import type { Metadata } from "next";
import BrianRotClient from "./BrianRotClient";

export const metadata: Metadata = {
  title: "brian_rot",
  description: "highly curated (and questionably justified) music and movie takes.",
};

export default function Page() {
  return <BrianRotClient />;
}
