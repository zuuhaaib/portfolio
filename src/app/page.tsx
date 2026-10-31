import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: { absolute: "Zuhaib Khan" },
};

export default function Page() {
  return <HomeClient />;
}
