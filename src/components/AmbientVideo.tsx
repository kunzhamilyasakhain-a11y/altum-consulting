"use client";

import { useEffect, useRef, useState } from "react";

/** Silent ambient film; the poster stays visible until a frame is playing. */
export function AmbientVideo({
  name,
  className = "",
}: {
  name: "about-team" | "about-triangle" | "summit";
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let failed = false;
    let disposed = false;
    const update = () => {
      const allowed =
        visible &&
        !failed &&
        !document.hidden &&
        !reduced.matches &&
        document.documentElement.dataset.motion !== "off";
      if (!allowed) {
        video.pause();
        setPlaying(false);
        return;
      }
      if (!video.getAttribute("src")) {
        video.src = `/motion/${name}.mp4`;
        video.load();
      }
      video.muted = true;
      void video.play().catch(() => {
        if (!disposed) setPlaying(false);
      });
    };
    const onPlaying = () => setPlaying(true);
    const onError = () => {
      failed = true;
      update();
    };
    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        update();
      },
      { threshold: 0.08 },
    );
    const preferences = new MutationObserver(update);
    intersection.observe(video);
    preferences.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("error", onError);
    update();
    return () => {
      disposed = true;
      intersection.disconnect();
      preferences.disconnect();
      reduced.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("error", onError);
      video.pause();
    };
  }, [name]);
  return (
    <div
      className={`ambient-video ${className}`}
      data-playing={playing}
      aria-hidden="true"
    >
      <img src={`/motion/${name}-poster.webp`} alt="" loading="lazy" />
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={`/motion/${name}-poster.webp`}
        tabIndex={-1}
      />
    </div>
  );
}
