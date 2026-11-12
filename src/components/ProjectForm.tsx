"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/config";

export function ProjectForm() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const inFlight = useRef(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>("[data-contact]");
      if (!target) return;
      opener.current = target;
      if (!inFlight.current) {
        form.current?.reset();
        setStatus("idle");
      }
      dialog.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const currentForm = event.currentTarget;
    const data = new FormData(currentForm);
    const name = String(data.get("name") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    if (!name) {
      const nameInput = currentForm.elements.namedItem("name") as HTMLInputElement;
      nameInput.setCustomValidity("Введите ваше имя.");
      nameInput.reportValidity();
      return;
    }

    inFlight.current = true;
    setStatus("sending");
    try {
      const response = await fetch(siteConfig.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, method: "email", contact }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error("Delivery failed");
      currentForm.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
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
        onClick={() => dialog.current?.close()}
        aria-label="Закрыть форму"
      >
        ✕
      </button>
      <h2 id="dialog-title">Обсудим вашу задачу</h2>
      <p>Оставьте email, и мы свяжемся с вами.</p>
      <form ref={form} onSubmit={submit} aria-busy={status === "sending"}>
        <label htmlFor="project-name">
          Ваше имя
          <input
            id="project-name"
            name="name"
            autoComplete="name"
            placeholder="Как к вам обращаться"
            maxLength={100}
            required
            onInput={(event) => event.currentTarget.setCustomValidity("")}
          />
        </label>
        <label htmlFor="project-contact">
          Ваш email
          <input
            id="project-contact"
            name="contact"
            type="email"
            autoComplete="email"
            placeholder="name@company.kz"
            maxLength={150}
            required
          />
        </label>
        <button className="button primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Отправляем заявку…" : "Отправить заявку"}
        </button>
        {status === "success" && (
          <p className="form-success" role="status">Заявка отправлена. Спасибо за обращение!</p>
        )}
        {status === "error" && (
          <p className="form-error" role="alert">Заявку не удалось отправить. Попробуйте ещё раз или напишите нам.</p>
        )}
      </form>
      <p className="form-note">
        Можно также написать напрямую{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </p>
    </dialog>
  );
}
