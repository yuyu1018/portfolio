"use strict";

export function initializeNavigation({ compactAt } = {}) {
  const menuToggle = document.querySelector(".menu-toggle");
  const globalNav = document.querySelector(".global-nav");
  if (!menuToggle || !globalNav) return;

  const navigationLinks = [...globalNav.querySelectorAll(".global-nav__link")];
  const setMenuOpen = (isOpen, restoreFocus = false) => {
    globalNav.classList.toggle("is-open", isOpen);
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
    document.body.classList.toggle("is-menu-open", isOpen);

    if (isOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (menuToggle.getAttribute("aria-expanded") === "true") {
            navigationLinks[0]?.focus();
          }
        });
      });
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

  if (compactAt) {
    const compactMedia = window.matchMedia(`(max-width: ${compactAt}px)`);
    compactMedia.addEventListener("change", ({ matches }) => {
      if (matches) setMenuOpen(false);
    });
  }
}
