"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { directions } from "@/lib/content";
import { siteConfig } from "@/lib/config";
import { typography as t } from "@/lib/typography";

export function ProjectForm() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const inFlight = useRef(false);
  const request = useRef({ fingerprint: "", id: "" });
  const [direction, setDirection] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-contact]",
      );
      if (!target) return;
      opener.current = target;
      if (!inFlight.current) {
        form.current?.reset();
        setDirection(target.dataset.direction || "");
        setStatus("idle");
        setError("");
        request.current = { fingerprint: "", id: "" };
      }
      dialog.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  function close() {
    dialog.current?.close();
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const contactInput = event.currentTarget.elements.namedItem(
      "contact",
    ) as HTMLInputElement;
    const contactValue = contactInput.value.trim();
    const validContact =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue) ||
      (/^\+?[\d() .-]{7,30}$/.test(contactValue) &&
        contactValue.replace(/\D/g, "").length >= 7);
    if (!validContact) {
      contactInput.setCustomValidity(
        "Укажите email или телефон с кодом страны",
      );
      contactInput.reportValidity();
      return;
    }
    if (!siteConfig.contactEndpoint) {
      setStatus("error");
      setError("Онлайн-отправка пока недоступна. Заявка не отправлена.");
      return;
    }
    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") || "").trim(),
      company: String(data.get("company") || "").trim(),
      contact: String(data.get("contact") || "").trim(),
      direction,
      task: String(data.get("task") || "").trim(),
      consent: data.get("consent") === "on",
      website: String(data.get("website") || ""),
    };
    const fingerprint = JSON.stringify(payload);
    if (request.current.fingerprint !== fingerprint) {
      request.current = { fingerprint, id: crypto.randomUUID() };
    }
    inFlight.current = true;
    setStatus("sending");
    setError("");
    const abort = new AbortController();
    const timeout = setTimeout(() => abort.abort(), 25000);
    try {
      const response = await fetch(siteConfig.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, requestId: request.current.id }),
        signal: abort.signal,
      });
      const result = await response.json();
      if (!response.ok || result.delivered !== true || !result.receipt) {
        throw new Error("delivery");
      }
      setStatus("success");
      form.current?.reset();
      requestAnimationFrame(() =>
        dialog.current?.querySelector<HTMLElement>(".form-success")?.focus(),
      );
    } catch {
      setStatus("error");
      setError(
        "Не удалось подтвердить отправку. Проверьте соединение и попробуйте ещё раз. Ваш текст сохранён в форме.",
      );
    } finally {
      clearTimeout(timeout);
      inFlight.current = false;
    }
  }
  return (
    <dialog
      ref={dialog}
      className="contact-dialog"
      aria-labelledby="dialog-title"
      onClose={() => opener.current?.focus()}
    >
      <button
        className="dialog-close"
        type="button"
        onClick={close}
        aria-label="Закрыть форму"
      >
        ✕
      </button>
      <h2 id="dialog-title">Обсудить проект</h2>
      {status === "success" ? (
        <div className="form-success" role="status" tabIndex={-1}>
          <h3>Заявка отправлена</h3>
          <p>Мы получили ваше сообщение и свяжемся с вами.</p>
        </div>
      ) : (
        <>
          {!siteConfig.contactEndpoint && (
            <p className="form-availability" role="status">
              Онлайн-отправка пока недоступна
              {siteConfig.email ? (
                <>
                  . Напишите нам:{" "}
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </>
              ) : (
                ". Заявка не будет отправлена"
              )}
              .
            </p>
          )}
          <form ref={form} onSubmit={submit} aria-busy={status === "sending"}>
            <div className="form-row">
              <label htmlFor="project-name">
                <span>
                  Имя <span aria-hidden="true">*</span>
                </span>
                <input
                  id="project-name"
                  name="name"
                  autoComplete="name"
                  maxLength={100}
                  required
                />
              </label>
              <label htmlFor="project-company">
                Компания
                <input
                  id="project-company"
                  name="company"
                  autoComplete="organization"
                  maxLength={200}
                />
              </label>
            </div>
            <label htmlFor="project-contact">
              <span>
                Телефон или email <span aria-hidden="true">*</span>
              </span>
              <input
                id="project-contact"
                name="contact"
                autoComplete="on"
                maxLength={200}
                required
                aria-describedby="contact-hint"
                onInput={(event) => event.currentTarget.setCustomValidity("")}
              />
              <small id="contact-hint">
                Укажите один способ связи: email или телефон с кодом страны
              </small>
            </label>
            <label htmlFor="project-direction">
              <span>
                Направление проекта <span aria-hidden="true">*</span>
              </span>
              <select
                id="project-direction"
                name="direction"
                required
                value={direction}
                onChange={(event) => setDirection(event.target.value)}
              >
                <option value="" disabled>
                  Выберите направление
                </option>
                {directions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {t(item.title)}
                  </option>
                ))}
              </select>
              {direction && (
                <small>
                  {t(
                    directions.find((item) => item.id === direction)?.title ||
                      "",
                  )}
                </small>
              )}
            </label>
            <label htmlFor="project-task">
              Описание задачи
              <textarea
                id="project-task"
                name="task"
                rows={3}
                maxLength={5000}
              />
            </label>
            <div className="form-honeypot" aria-hidden="true">
              <label htmlFor="project-website">
                Website
                <input
                  id="project-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>
            <label className="consent-label" htmlFor="project-consent">
              <input
                id="project-consent"
                name="consent"
                type="checkbox"
                required
              />
              <span>
                Согласен на обработку персональных данных{" "}
                <span aria-hidden="true">*</span>
                {siteConfig.privacyUrl && (
                  <>
                    {" "}
                    —{" "}
                    <a
                      href={siteConfig.privacyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      политика конфиденциальности
                    </a>
                  </>
                )}
              </span>
            </label>
            <button
              className="button primary"
              type="submit"
              disabled={status === "sending" || !siteConfig.contactEndpoint}
            >
              {status === "sending" ? "Отправка…" : "Обсудить проект"}
            </button>
            {status === "error" && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
          </form>
        </>
      )}
    </dialog>
  );
}
