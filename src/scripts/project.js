"use strict";

const targets = document.querySelectorAll("[data-project-reveal]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0, rootMargin: "0px 0px -32px 0px" },
  );

  targets.forEach((target) => observer.observe(target));
  document.documentElement.classList.add("project-motion");

  reducedMotion.addEventListener("change", ({ matches }) => {
    if (!matches) return;
    observer.disconnect();
    document.documentElement.classList.remove("project-motion");
  });
}
