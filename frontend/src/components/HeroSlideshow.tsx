"use client";

import { useEffect, useState } from "react";

const slides = [
  "/images/5crest-hero-marine-drive.png",
  "/images/5crest-hero-colaba.png",
  "/images/5crest-hero-fort.png",
];

export default function HeroSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((currentSlide) =>
        (currentSlide + 1) % slides.length,
      );
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {slides.map((slide, index) => (
        <div
          key={slide}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-[1600ms] ease-in-out ${
            index === activeSlide
              ? "scale-105 opacity-100"
              : "scale-100 opacity-0"
          }`}
          style={{ backgroundImage: `url('${slide}')` }}
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,40,38,0.96)_0%,rgba(16,40,38,0.78)_42%,rgba(16,40,38,0.37)_100%)]" />

      <div className="absolute bottom-8 right-6 flex gap-2 md:bottom-12 md:right-12">
        {slides.map((slide, index) => (
          <span
            key={slide}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === activeSlide
                ? "w-10 bg-[#efb08d]"
                : "w-4 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
