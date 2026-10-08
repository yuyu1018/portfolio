"use strict";

const form = document.querySelector("#inquiry-form");
const fields = form.querySelector("fieldset");
const button = form.querySelector('button[type="submit"]');
const buttonLabel = button.querySelector("[data-submit-label]");
const pendingNotice = document.querySelector("#inquiry-pending");
const status = document.querySelector("#inquiry-status");
const endpoint = form.getAttribute("action").trim();
const isConfigured = /^https:\/\/formspree\.io\/f\/[a-z0-9]+\/?$/i.test(endpoint);
let isSubmitting = false;

const showStatus = (message, state) => {
  status.textContent = message;
  status.dataset.state = state;
};

// 送信先を設定するまで、誤送信を防ぎメールでの問い合わせを案内する。
if (isConfigured) {
  fields.disabled = false;
  button.disabled = false;
  pendingNotice.hidden = true;
  form.removeAttribute("aria-describedby");
}

form.addEventListener("input", (event) => {
  if (typeof event.target.setCustomValidity === "function") {
    event.target.setCustomValidity("");
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!isConfigured || isSubmitting) return;

  for (const input of fields.querySelectorAll("input, textarea")) {
    input.setCustomValidity(input.value.trim() ? "" : "入力してください。");
  }
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  for (const name of ["name", "email", "message"]) {
    data.set(name, data.get(name).trim());
  }

  isSubmitting = true;
  fields.disabled = true;
  button.disabled = true;
  buttonLabel.textContent = "送信中…";
  form.setAttribute("aria-busy", "true");
  showStatus("メッセージを送信しています。", "sending");

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    if (!response.ok) {
      showStatus(
        response.status === 429
          ? "ただいま送信できません。時間をおいてお試しいただくか、メールでご連絡ください。"
          : "送信できませんでした。入力内容をご確認のうえ、もう一度お試しください。メールでもお問い合わせいただけます。",
        "error",
      );
      return;
    }

    form.reset();
    showStatus("お問い合わせを受け付けました。ご連絡ありがとうございます。", "success");
  } catch (error) {
    showStatus(
      error.name === "AbortError"
        ? "送信の確認に時間がかかっています。重複送信を避けるため、再送前にメールでご確認ください。"
        : "送信結果を確認できませんでした。通信状況をご確認ください。メールでもお問い合わせいただけます。",
      "error",
    );
  } finally {
    window.clearTimeout(timeout);
    isSubmitting = false;
    fields.disabled = false;
    button.disabled = false;
    buttonLabel.textContent = "送信する";
    form.removeAttribute("aria-busy");
  }
});
