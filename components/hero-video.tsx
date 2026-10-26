"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";

// Background footage for the hero: a trainer coaching a client through a
// press. Stock clip from Pexels (pexels.com/video/12188782, Pexels License:
// free for commercial use, no attribution needed), trimmed to a 10 s loop
// with no audio.
//
// The poster is server-rendered, so the hero looks finished without
// JavaScript. The video is only added after mount, and never for visitors
// who prefer reduced motion or have Save-Data on. It pauses while the hero is
// off screen, and the button lets anyone stop it (WCAG 2.2.2).
// False on the server and for reduced motion or Save-Data, so only the
// poster renders there.
function canPlayVideo() {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const saveData =
    (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData === true;
  return !reduceMotion && !saveData;
}
const noSubscribe = () => () => {};

export function HeroVideo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const enabled = useSyncExternalStore(noSubscribe, canPlayVideo, () => false);
  const [visible, setVisible] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, [enabled]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (visible && !userPaused) {
      // Autoplay can still be refused (e.g. Low Power Mode); the poster stays
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [enabled, visible, userPaused]);

  return (
    <>
      <div ref={wrapRef} className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative backdrop, already a small WebP */}
        <img
          src="/video/hero-coaching-poster.webp"
          srcSet="/video/hero-coaching-poster-720.webp 720w, /video/hero-coaching-poster.webp 1280w"
          sizes="100vw"
          alt=""
          // The poster is the largest thing above the fold, so it's the LCP
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {enabled && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            poster="/video/hero-coaching-poster.webp"
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden
          >
            <source
              src="/video/hero-coaching-720.mp4"
              type="video/mp4"
              media="(max-width: 767px)"
            />
            <source src="/video/hero-coaching-1280.webm" type="video/webm" />
            <source src="/video/hero-coaching-1280.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-black/[0.66]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      {enabled && (
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={
            userPaused ? "Play background video" : "Pause background video"
          }
          className="absolute right-3 top-3 z-10 sm:right-4 sm:top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
        >
          {userPaused ? (
            <Play className="h-4 w-4" aria-hidden />
          ) : (
            <Pause className="h-4 w-4" aria-hidden />
          )}
        </button>
      )}
    </>
  );
}
