"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sample services data
const services = [
  {
    id: 1,
    title: "Classic Haircut",
    description: "Traditional haircut with precision and style",
    image: "/placeholder.svg?height=500&width=800",
  },
  {
    id: 2,
    title: "Beard Trim",
    description: "Expert beard shaping and grooming",
    image: "/placeholder.svg?height=500&width=800",
  },
  {
    id: 3,
    title: "Hot Towel Shave",
    description: "Luxurious traditional hot towel shave experience",
    image: "/placeholder.svg?height=500&width=800",
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((current) =>
      current === services.length - 1 ? 0 : current + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? services.length - 1 : current - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative w-full h-[600px] overflow-hidden">
      {services.map((service, index) => (
        <div
          key={service.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === activeIndex
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          style={{
            backgroundImage: `url(${service.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full flex items-center justify-center">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                <p className="mb-6">{service.description}</p>
                <a
                  href="/appointment"
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm p-2 rounded-full hover:bg-white/70 transition-colors"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm p-2 rounded-full hover:bg-white/70 transition-colors"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </section>
  );
}
