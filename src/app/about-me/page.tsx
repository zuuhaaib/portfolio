import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "about me",
  description:
    "who zuhaib is: CS student at York University in Toronto, software, ethics, music, and other shenanigans.",
};

export default function Page() {
  return <AboutClient />;
}
