export function initializeOpening() {
  const root = document.documentElement;
  const opening = document.querySelector(".opening");

  if (!opening || !root.classList.contains("has-opening")) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const controller = new AbortController();
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => {
      controller.abort();
      window.clearTimeout(fallback);
      root.classList.remove("has-opening");
      resolve();
    };

    // CSSアニメーションの終了を待つ。読み込み遅延や途中の操作でも必ず解除する。
    const fallback = window.setTimeout(finish, 2000);
    const options = { signal: controller.signal };
    opening.addEventListener("animationend", (event) => {
      if (event.target === opening) finish();
    }, options);
    opening.addEventListener("animationcancel", finish, options);
    motionPreference.addEventListener("change", finish, options);

    ["pointerdown", "keydown", "focusin", "wheel", "touchstart", "scroll", "pagehide"].forEach((type) => {
      window.addEventListener(type, finish, { ...options, passive: true });
    });
  });
}
