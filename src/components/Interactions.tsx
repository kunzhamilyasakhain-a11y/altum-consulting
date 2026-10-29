"use client";
import { useEffect, useState } from "react";
import { ProjectForm } from "./ProjectForm";
export function Interactions() {
  const [menu, setMenu] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            reveal.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => reveal.observe(el));
    const motionObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("is-running", e.isIntersecting),
        ),
      { threshold: 0.05 },
    );
    document
      .querySelectorAll(".summit-art, .about-art, .advantages")
      .forEach((el) => motionObserver.observe(el));
    const process = document.querySelector<HTMLElement>(".process");
    let pending = false;
    const progress = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        if (process) {
          const box = process.getBoundingClientRect();
          const value = Math.max(
            0,
            Math.min(1, (innerHeight * 0.82 - box.top) / (box.height * 0.8)),
          );
          process.style.setProperty("--progress", String(value));
        }
        pending = false;
      });
    };
    progress();
    window.addEventListener("scroll", progress, { passive: true });
    return () => {
      reveal.disconnect();
      motionObserver.disconnect();
      window.removeEventListener("scroll", progress);
    };
  }, []);
  useEffect(() => {
    if (!menu) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        document.querySelector<HTMLButtonElement>(".mobile-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);
  function toggleMotion() {
    const next = !paused;
    setPaused(next);
    document.documentElement.dataset.motion = next ? "off" : "on";
  }
  return (
    <>
      <button
        className="mobile-toggle"
        aria-label={menu ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={menu}
        aria-controls="mobile-menu"
        onClick={() => setMenu(!menu)}
      >
        {menu ? "✕" : "☰"}
      </button>
      <nav
        id="mobile-menu"
        className={`mobile-menu ${menu ? "open" : ""}`}
        aria-label="Мобильная навигация"
        inert={!menu}
      >
        {[
          ["Направления", "#services"],
          ["Почему ALTUM", "#why"],
          ["Как мы работаем", "#process"],
          ["О компании", "#about"],
          ["iSpring", "#ispring"],
          ["Контакты", "#contact"],
        ].map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMenu(false)}>
            {label}
            <span>↗</span>
          </a>
        ))}
      </nav>
      <button
        className="motion-toggle"
        onClick={toggleMotion}
        aria-pressed={paused}
        aria-label={paused ? "Включить анимации" : "Приостановить анимации"}
      >
        <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
        <span>{paused ? "Включить движение" : "Пауза анимаций"}</span>
      </button>
      <ProjectForm />
    </>
  );
}
