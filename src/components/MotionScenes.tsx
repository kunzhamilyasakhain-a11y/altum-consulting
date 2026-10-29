"use client";
import { useAnimate, type AnimationSequence } from "motion/react";
import { useEffect } from "react";
import { Icon } from "./Icons";
import { sceneMedia, type SceneName } from "@/lib/config";

/** Один управляемый timeline на сцену: пауза вне viewport, при reduced motion и ручной паузе. */
function useScene(kind: "hero" | SceneName) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const sequences: Record<string, AnimationSequence> = {
      hero: [
        [
          ".hero-render",
          { y: [0, -13, 0], rotateZ: [-1, 1, -1], scale: [1, 1.025, 1] },
          { duration: 10, at: 0 },
        ],
        [
          ".hero-glass-one",
          { y: [0, -10, 0], rotate: [-7, -4, -7] },
          { duration: 10, at: 0 },
        ],
        [
          ".hero-glass-two",
          { y: [0, 12, 0], rotate: [6, 3, 6] },
          { duration: 10, at: 0 },
        ],
        [
          ".hero-glass-three",
          { y: [0, -9, 0], rotate: [-5, -2, -5] },
          { duration: 10, at: 0 },
        ],
        [
          ".hero-orbit-light",
          { pathLength: [0, 1, 0], opacity: [0, 0.8, 0] },
          { duration: 10, at: 0 },
        ],
      ],
      courses: [
        [
          ".render-image",
          { y: [0, -5, 0], rotate: [-1, 0.5, -1] },
          { duration: 8, at: 0 },
        ],
        [
          ".demo-window",
          {
            opacity: [0, 1, 1, 1, 0],
            y: [24, 0, 0, 0, 24],
            rotate: [3, -2, -2, -2, 3],
          },
          { duration: 8, at: 0, times: [0, 0.15, 0.6, 0.85, 1] },
        ],
        [
          ".answer-cursor",
          {
            x: [25, 0, 0, 0, 25],
            y: [35, 0, 0, 0, 35],
            opacity: [0, 0, 1, 0, 0],
          },
          { duration: 8, at: 0, times: [0, 0.27, 0.4, 0.62, 1] },
        ],
        [
          ".answer-success",
          { opacity: [0, 0, 1, 1, 0], scale: [0.6, 0.6, 1, 1, 0.6] },
          { duration: 8, at: 0, times: [0, 0.41, 0.48, 0.85, 1] },
        ],
        [
          ".answer-selected",
          {
            backgroundColor: [
              "#faf0e9",
              "#faf0e9",
              "#e6efdf",
              "#e6efdf",
              "#faf0e9",
            ],
          },
          { duration: 8, at: 0, times: [0, 0.4, 0.48, 0.85, 1] },
        ],
        [
          ".live-progress-fill",
          { scaleX: [0.12, 0.12, 1, 1, 0.12] },
          { duration: 8, at: 0, times: [0, 0.4, 0.73, 0.86, 1] },
        ],
      ],
      training: [
        [
          ".training-world",
          { scale: [1, 1.04, 1], y: [0, -5, 0] },
          { duration: 9, at: 0 },
        ],
        [
          ".knight-render",
          {
            x: ["0%", "0%", "32%", "32%", "0%"],
            y: ["0%", "-8%", "-28%", "-28%", "0%"],
            rotate: [0, 0, 3, 3, 0],
          },
          { duration: 9, at: 0, times: [0, 0.2, 0.4, 0.75, 1] },
        ],
        [
          ".strategy-path",
          { strokeDashoffset: [240, 240, 0, 0, 240], opacity: [0, 0, 1, 1, 0] },
          { duration: 9, at: 0, times: [0, 0.25, 0.55, 0.8, 1] },
        ],
        [
          ".decision-card",
          { opacity: [0, 1, 1, 0], y: [10, 0, 0, 10] },
          { duration: 9, at: 0, times: [0, 0.35, 0.8, 1] },
        ],
        [
          ".strategy-sweep",
          { x: ["-120%", "180%"], opacity: [0, 0.5, 0] },
          { duration: 9, at: 0 },
        ],
      ],
      digital: [
        [
          ".render-image",
          { y: [0, -6, 0], rotate: [0, -1, 0] },
          { duration: 8, at: 0 },
        ],
        [
          ".live-analytics",
          { opacity: [0, 1, 1, 0], x: [20, 0, 0, 20] },
          { duration: 8, at: 0, times: [0, 0.18, 0.85, 1] },
        ],
        [
          ".live-chart",
          { strokeDashoffset: [210, 210, 0, 0, 210] },
          { duration: 8, at: 0, times: [0, 0.2, 0.62, 0.85, 1] },
        ],
        [
          ".chart-bar",
          { scaleY: [0.1, 0.1, 1, 1, 0.1] },
          { duration: 8, at: 0, times: [0, 0.2, 0.6, 0.85, 1] },
        ],
        [
          ".ai-mini",
          { opacity: [0, 0, 1, 1, 0], scale: [0.7, 0.7, 1, 1, 0.7] },
          { duration: 8, at: 0, times: [0, 0.4, 0.65, 0.85, 1] },
        ],
      ],
    };
    const controls = root.querySelector("video")
      ? null
      : animate(sequences[kind], { repeat: Infinity, ease: "easeInOut" });
    controls?.pause();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      const stopped =
        reduced.matches ||
        document.documentElement.dataset.motion === "off" ||
        document.hidden;
      root.classList.toggle("scene-playing", visible && !stopped);
      if (visible && !stopped) controls?.play();
      else controls?.pause();
      const video = root.querySelector("video");
      if (video) {
        if (visible && !stopped) void video.play().catch(() => {});
        else video.pause();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        update();
      },
      { threshold: 0.12 },
    );
    const mutation = new MutationObserver(update);
    observer.observe(root);
    mutation.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      controls?.stop();
      observer.disconnect();
      mutation.disconnect();
      reduced.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [scope, animate, kind]);
  return scope;
}

export function HeroScene() {
  const scope = useScene("hero");
  return (
    <div
      className="hero-cinema"
      ref={scope}
      onPointerMove={(event) => {
        if (
          window.matchMedia(
            "(pointer:fine) and (prefers-reduced-motion:no-preference)",
          ).matches &&
          document.documentElement.dataset.motion !== "off"
        ) {
          const b = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty(
            "--yaw",
            `${((event.clientX - b.left) / b.width - 0.5) * 5}deg`,
          );
          event.currentTarget.style.setProperty(
            "--pitch",
            `${((event.clientY - b.top) / b.height - 0.5) * -4}deg`,
          );
        }
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--yaw", "0deg");
        event.currentTarget.style.setProperty("--pitch", "0deg");
      }}
    >
      <div className="hero-halo" />
      <div className="hero-pedestal" />
      <div className="hero-depth">
        <img
          className="hero-render"
          src="/art/hero.webp"
          srcSet="/art/hero-small.webp 640w, /art/hero.webp 1400w"
          sizes="(max-width:600px) 100vw, 65vw"
          width="1536"
          height="1024"
          alt="Объёмная скульптура из рубинового и янтарного стекла"
          fetchPriority="high"
        />
      </div>
      <svg
        className="hero-orbit-svg"
        viewBox="0 0 720 680"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="hero-orbit-light"
          d="M130 395C-60 495 642 503 652 380S62 350 92 460"
          stroke="#FFAE39"
          strokeWidth="1.5"
          pathLength="1"
        />
      </svg>
      <a className="hero-glass hero-glass-one" href="#courses">
        <span className="glass-symbol">
          <Icon name="play" />
        </span>
        <span>
          <small>ЗНАНИЯ В ДЕЙСТВИИ</small>Электронные курсы
          <span className="mini-bars">
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
        </span>
        <Icon name="arrow" />
      </a>
      <a className="hero-glass hero-glass-two" href="#training">
        <span className="glass-symbol">
          <Icon name="team" />
        </span>
        <span>
          <small>ОПЫТ, КОТОРЫЙ РАЗВИВАЕТ</small>Корпоративное обучение
          <br />и бизнес-игры
        </span>
      </a>
      <a className="hero-glass hero-glass-three" href="#digital">
        <span className="glass-chart">
          <i />
          <i />
          <i />
        </span>
        <span>
          <small>ИДЕИ СТАНОВЯТСЯ РЕАЛЬНОСТЬЮ</small>Digital Marketing & AI
          <span className="mini-bars">
            <i />
            <i />
            <i />
          </span>
        </span>
      </a>
      <span className="cinema-coordinate">A / 01 — DIGITAL IN MOTION</span>
    </div>
  );
}

export function ServiceScene({ name }: { name: SceneName }) {
  const scope = useScene(name);
  const media = sceneMedia[name];
  return (
    <div
      className={`service-cinema cinema-${name}`}
      ref={scope}
      aria-label={
        name === "courses"
          ? "Демонстрационный электронный курс с выбором ответа"
          : name === "training"
            ? "Объёмная композиция бизнес-игры с шахматами"
            : "Демонстрационный цифровой продукт с аналитикой"
      }
      role="img"
    >
      {media.webm || media.mp4 ? (
        <>
          <video
            muted
            loop
            playsInline
            preload="none"
            poster={media.poster}
            className="scene-video"
          >
            {media.webm && <source src={media.webm} type="video/webm" />}
            {media.mp4 && <source src={media.mp4} type="video/mp4" />}
          </video>
          <img
            className="video-fallback"
            src={media.poster}
            width="1536"
            height="1024"
            loading="lazy"
            alt=""
          />
        </>
      ) : (
        <>
          <div
            className={name === "training" ? "training-world" : "render-world"}
          >
            <img
              className="render-image"
              src={
                name === "training" ? "/art/training-base.webp" : media.poster
              }
              {...(name !== "training"
                ? {
                    srcSet: `${media.poster.replace(".webp", "-small.webp")} 640w, ${media.poster} 1000w`,
                    sizes: "(max-width:850px) 100vw, 35vw",
                  }
                : {})}
              width="1536"
              height="1024"
              loading="lazy"
              alt=""
            />
            {name === "training" && (
              <img
                className="knight-render"
                src="/art/knight.webp"
                width="400"
                height="600"
                loading="lazy"
                alt=""
              />
            )}
          </div>
          {name === "courses" && (
            <div className="demo-window">
              <div className="demo-top">
                <span />
                <span />
                <span />
                <small>УЧИМСЯ ВМЕСТЕ / ДЕМО</small>
              </div>
              <strong>С чего начать диалог?</strong>
              <div className="answer-selected">
                <i />С открытого вопроса
                <Icon name="check" className="answer-success" />
              </div>
              <div className="answer-option">
                <i />С готового решения
              </div>
              <div className="live-progress">
                <div className="live-progress-fill" />
              </div>
              <svg
                className="answer-cursor"
                viewBox="0 0 24 30"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m2 1 2 25 6-7 10-1Z"
                  fill="#8C1830"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </div>
          )}
          {name === "training" && (
            <>
              <svg
                className="strategy-overlay"
                viewBox="0 0 500 360"
                fill="none"
                aria-hidden="true"
              >
                <path
                  className="strategy-path"
                  d="m120 280 100-55 80 44 83-58"
                  stroke="#FFD582"
                  strokeWidth="1.4"
                  strokeDasharray="240"
                />
                <circle cx="120" cy="280" r="4" fill="#FFB93D" />
                <circle cx="383" cy="211" r="4" fill="#FFB93D" />
              </svg>
              <div className="decision-card">
                <small>СТРАТЕГИЯ В ДЕЙСТВИИ</small>
                <span>
                  Новый ход
                  <br />
                  Новая перспектива
                </span>
                <div>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="strategy-sweep" />
            </>
          )}
          {name === "digital" && (
            <>
              <div className="live-analytics">
                <span className="analytics-label">
                  АНАЛИТИКА / ДЕМО <i />
                </span>
                <div className="analytics-bars">
                  <i className="chart-bar" />
                  <i className="chart-bar" />
                  <i className="chart-bar" />
                  <i className="chart-bar" />
                  <i className="chart-bar" />
                </div>
                <svg viewBox="0 0 180 75" fill="none" aria-hidden="true">
                  <path
                    className="live-chart"
                    d="m4 65 28-16 25 8 31-24 28 9 35-30 24 5"
                    stroke="#F35E19"
                    strokeWidth="3"
                    strokeDasharray="210"
                  />
                </svg>
              </div>
              <div className="ai-mini">
                <Icon name="digital" />
                <span>
                  AI<span>CONNECTED IDEAS</span>
                </span>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
