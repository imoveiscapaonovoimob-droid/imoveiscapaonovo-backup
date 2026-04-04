"use client";

import { useEffect } from "react";
import { trackEvent } from "./GoogleAnalytics";

export default function ScrollTracker() {
  useEffect(() => {
    let scrolled50 = false;
    let scrolled90 = false;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrolledPercentage = (window.scrollY / scrollHeight) * 100;

      if (scrolledPercentage >= 50 && !scrolled50) {
        scrolled50 = true;
        trackEvent({ action: "scroll_50", category: "Engagement", label: "Scrolled 50%" });
      }

      if (scrolledPercentage >= 90 && !scrolled90) {
        scrolled90 = true;
        trackEvent({ action: "scroll_90", category: "Engagement", label: "Scrolled 90%" });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
