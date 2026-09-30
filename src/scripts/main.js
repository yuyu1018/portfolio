"use strict";

const hero = document.querySelector(".hero");
const sections = document.querySelectorAll(".main-content > section[data-theme]");
const navigationLinks = document.querySelectorAll(".global-nav__link");
const menuToggle = document.querySelector(".menu-toggle");
const globalNav = document.querySelector(".global-nav");

const setMenuOpen = (isOpen, restoreFocus = false) => {
  globalNav.classList.toggle("is-open", isOpen);
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
  document.body.classList.toggle("is-menu-open", isOpen);

  if (isOpen) {
    requestAnimationFrame(() => navigationLinks[0]?.focus());
  } else if (restoreFocus) {
    menuToggle.focus();
  }
};

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false, true);
  }

  if (event.key === "Tab" && menuToggle.getAttribute("aria-expanded") === "true") {
    const focusableElements = [menuToggle, ...navigationLinks];
    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
});

const desktopMedia = window.matchMedia("(min-width: 1200px)");
desktopMedia.addEventListener("change", ({ matches }) => {
  if (matches) setMenuOpen(false);
});

const activateSection = (section) => {
  const { theme } = section.dataset;

  hero.dataset.theme = theme;

  navigationLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === `#${section.id}`;
    link.classList.toggle("is-current", isCurrent);

    if (isCurrent) {
      link.setAttribute("aria-current", "page");
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
