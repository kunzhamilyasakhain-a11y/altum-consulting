"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/config";

export function ProjectForm() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const inFlight = useRef(false);
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [contacts, setContacts] = useState({ email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>("[data-contact]");
      if (!target) return;
      opener.current = target;
      if (!inFlight.current) {
        form.current?.reset();
        setMethod("email");
        setContacts({ email: "", phone: "" });
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
    if (method === "phone" && (!/^[+0-9 ()-]+$/.test(contact) || !/^\d{10,15}$/.test(contact.replace(/\D/g, "")))) {
      const input = currentForm.elements.namedItem("contact") as HTMLInputElement;
      input.setCustomValidity("Введите номер телефона с кодом страны или города.");
      input.reportValidity();
      return;
    }

    inFlight.current = true;
    setStatus("sending");
    try {
      const response = await fetch(siteConfig.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, method, contact }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error("Delivery failed");
      currentForm.reset();
      setMethod("email");
      setContacts({ email: "", phone: "" });
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
      <h2 id="dialog-title">Обсудить проект</h2>
      <p>Оставьте контакт, и мы свяжемся с вами.</p>
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
        <fieldset className="project-contact-method">
          <legend>Как с вами связаться?</legend>
          <div>
            <label><input type="radio" name="method" value="email" checked={method === "email"} onChange={() => setMethod("email")} /> По email</label>
            <label><input type="radio" name="method" value="phone" checked={method === "phone"} onChange={() => setMethod("phone")} /> По телефону</label>
          </div>
        </fieldset>
        <label htmlFor="project-contact">
          {method === "email" ? "Ваш email" : "Ваш телефон"}
          <input
            key={method}
            id="project-contact"
            name="contact"
            type={method === "email" ? "email" : "tel"}
            autoComplete={method === "email" ? "email" : "tel"}
            placeholder={method === "email" ? "name@company.kz" : "+7 700 000 00 00"}
            value={contacts[method]}
            onChange={(event) => {
              event.currentTarget.setCustomValidity("");
              setContacts({ ...contacts, [method]: event.currentTarget.value });
            }}
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
