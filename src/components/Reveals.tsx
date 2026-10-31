"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Fades in every `.reveal` element once it scrolls into view. The hidden
// state only applies under `html.js`, so content still shows without script.
export default function Reveals() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    document
      .querySelectorAll(".reveal:not(.is-in)")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
