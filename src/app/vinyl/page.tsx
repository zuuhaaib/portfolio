import type { Metadata } from "next";
import VinylClient from "./VinylClient";

export const metadata: Metadata = {
  title: "explore",
  description: "spin the vinyl and pick where to go next.",
};

export default function Page() {
  return <VinylClient />;
}
