"use strict";

document.documentElement.classList.add("has-js");

const header = document.querySelector(".c-header");
const stage = document.querySelector(".c-hero");
const navLinks = [...document.querySelectorAll(".c-nav__link")];
const sections = [...document.querySelectorAll(".c-section[id], .c-contact[id]")];
const revealElements = document.querySelectorAll(".reveal");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleSection) return;

    const theme = visibleSection.target.id;
    document.body.dataset.theme = theme;
    stage.dataset.theme = theme;

    navLinks.forEach((link) => {
      const isCurrent = link.hash === `#${visibleSection.target.id}`;
      link.classList.toggle("is-current", isCurrent);
      if (isCurrent) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  },
  { rootMargin: "-35% 0px -55%", threshold: [0, 0.2, 0.5] },
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { rootMargin: "0px 0px -10%", threshold: 0.12 },
);

revealElements.forEach((element) => revealObserver.observe(element));
