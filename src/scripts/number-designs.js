"use strict";

const preview = document.querySelector("#number-preview");
const controls = document.querySelectorAll("[data-number-design]");
const status = document.querySelector("#number-preview-status");
let selected = "color-pop";

function updatePreview() {
  const previewDocument = preview.contentDocument;
  if (!previewDocument) return;

  const samples = documentSampleMap(selected);
  previewDocument.querySelectorAll(".project-point__number").forEach((image) => {
    const source = samples.get(image.alt);
    if (!source) return;
    image.loading = "eager";
    image.src = source;
  });
}

function documentSampleMap(design) {
  const option = document.querySelector(`#${design}`);
  return new Map(Array.from(option.querySelectorAll(".number-option__samples img"), (image) => [image.alt, image.src]));
}

function selectDesign(design) {
  selected = design;
  controls.forEach((control) => control.setAttribute("aria-pressed", String(control.dataset.numberDesign === design)));
  document.querySelectorAll(".number-option").forEach((option) => {
    option.dataset.selected = String(option.id === design);
  });
  const label = document.querySelector(`#${design} h2`).textContent.trim();
  status.textContent = `選択中：${label}`;
  updatePreview();
}

controls.forEach((control) => {
  control.addEventListener("click", () => selectDesign(control.dataset.numberDesign));
});

preview.addEventListener("load", () => {
  updatePreview();
  preview.contentDocument.fonts.ready.then(() => {
    const details = preview.contentDocument.querySelector("#details");
    if (!details) return;
    const frameWindow = preview.contentWindow;
    frameWindow.scrollTo({ top: details.getBoundingClientRect().top + frameWindow.scrollY - 32, behavior: "instant" });
  });
});

selectDesign(selected);
