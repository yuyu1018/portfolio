"use strict";

import { initializeNavigation } from "./navigation.js";

initializeNavigation();

document.documentElement.classList.add("js");

const hero = document.querySelector(".hero");
const sections = document.querySelectorAll(".main-content > section[data-theme]");
const navigationLinks = document.querySelectorAll(".global-nav__link");
const revealTargets = document.querySelectorAll("[data-reveal]");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach((target) => target.classList.add("is-revealed"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
}

const activateSection = (section) => {
  const { theme } = section.dataset;

  hero.dataset.theme = theme;

  navigationLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === `#${section.id}`;
    link.classList.toggle("is-current", isCurrent);

    if (isCurrent) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activateSection(entry.target);
      }
    });
  },
  {
    rootMargin: "-45% 0px -45% 0px",
    threshold: 0,
  },
);

sections.forEach((section) => sectionObserver.observe(section));

const likeTabs = [...document.querySelectorAll(".about__like-tab")];
const likePanels = [...document.querySelectorAll(".about__like-panel")];

const activateLike = (nextTab, moveFocus = false) => {
  const panelId = nextTab.getAttribute("aria-controls");

  likeTabs.forEach((tab) => {
    const isCurrent = tab === nextTab;
    tab.classList.toggle("is-current", isCurrent);
    tab.setAttribute("aria-selected", String(isCurrent));
    tab.tabIndex = isCurrent ? 0 : -1;
  });

  likePanels.forEach((panel) => {
    panel.hidden = panel.id !== panelId;
  });

  if (moveFocus) nextTab.focus();
};

likeTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateLike(tab));

  tab.addEventListener("keydown", (event) => {
    let nextIndex;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % likeTabs.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + likeTabs.length) % likeTabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = likeTabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    activateLike(likeTabs[nextIndex], true);
  });
});
