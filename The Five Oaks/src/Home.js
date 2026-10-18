import { useEffect, useState } from "react";
import "./Home.css";

const images = {
  living:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85",
  dining:
    "https://images.pexels.com/photos/8583540/pexels-photo-8583540.jpeg?auto=compress&cs=tinysrgb&w=1920",
  bedroom:
    "https://images.pexels.com/photos/13041940/pexels-photo-13041940.jpeg?auto=compress&cs=tinysrgb&w=1920",
};

const slides = [
  {
    image: images.living,
    alt: "Warm living room with natural textures and wooden furniture",
    label: "NATURAL BEAUTY. EVERYDAY LIVING.",
    title: "Rooted in nature.\nMade for your home.",
    description:
      "Discover oak furniture and beautiful wood finishes that bring warmth, character, and timeless style to your space.",
  },
  {
    image: images.dining,
    alt: "Elegant wooden dining table surrounded by chairs",
    label: "ROOM FOR CONNECTION",
    title: "Beautiful wood.\nMemorable moments.",
    description:
      "From everyday breakfasts to evenings with friends, find dining pieces that make gathering feel special.",
  },
  {
    image: images.bedroom,
    alt: "Wooden bedside table styled with books and soft linen",
    label: "COMFORT IN EVERY DETAIL",
    title: "Natural textures.\nQuiet comforts.",
    description:
      "Create a restful retreat with warm wood tones, thoughtful details, and the simple beauty of oak.",
  },
];

const categories = [
  {
    title: "Living",
    description: "Warmth for everyday moments",
    image: images.living,
    link: "/shop?category=living",
  },
  {
    title: "Dining",
    description: "Gather around something beautiful",
    image: images.dining,
    link: "/shop?category=dining",
  },
  {
    title: "Bedroom",
    description: "A softer place to begin and end",
    image: images.bedroom,
    link: "/shop?category=bedroom",
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    function updatePreference() {
      setReducedMotion(preference.matches);
    }

    updatePreference();
    preference.addEventListener("change", updatePreference);

    return () => {
      preference.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  function changeSlide(direction) {
    setPaused(true);

    setActiveSlide(
      (current) => (current + direction + slides.length) % slides.length
    );
  }

  function selectSlide(index) {
    setActiveSlide(index);
    setPaused(true);
  }

  const currentSlide = slides[activeSlide];

  return (
    <main className="five-oaks">
      <div className="announcement">
        Natural oak. Beautiful finishes. A home that feels like you.
      </div>

      <header className="oaks-header">
        <a
          href="/"
          className="oaks-brand"
          aria-label="The Five Oaks home"
        >
          <span className="brand-trees" aria-hidden="true">
            ♧
          </span>

          <span>
            THE FIVE OAKS
            <small>FURNITURE & HOME</small>
          </span>
        </a>

        <nav className="oaks-nav" aria-label="Main navigation">
          <a href="/shop">Shop</a>
          <a href="#collections">Collections</a>
          <a href="/about">Our story</a>
          <a href="/contact">Contact</a>
        </nav>

        <a href="/shop" className="header-button">
          Explore the store
          <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section
        className="oaks-hero"
        aria-label="Featured collections"
        aria-roledescription="carousel"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`oaks-slide ${
              index === activeSlide ? "is-active" : ""
            }`}
            aria-hidden={index !== activeSlide}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          </div>
        ))}

        <div className="hero-shade" />

        <div className="oaks-hero-content">
          <span className="oaks-eyebrow">
            {currentSlide.label}
          </span>

          <h1>{currentSlide.title}</h1>

          <p>{currentSlide.description}</p>

          <div className="oaks-actions">
            <a href="/shop" className="oaks-button">
              Shop the collection
              <span aria-hidden="true">↗</span>
            </a>

            <a href="/about" className="oaks-story-link">
              Discover The Five Oaks
            </a>
          </div>
        </div>

        <div className="hero-bottom">
          <span className="hero-caption">
            Oak & warmth — The home collection
          </span>

          <div className="slideshow-controls">
            <button
              type="button"
              className="slide-arrow"
              onClick={() => changeSlide(-1)}
              aria-label="Previous image"
            >
              <span aria-hidden="true">←</span>
            </button>

            <div className="slide-dots">
              {slides.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  className={`slide-dot ${
                    index === activeSlide ? "is-active" : ""
                  }`}
                  aria-label={`Show image ${index + 1}`}
                  aria-pressed={index === activeSlide}
                  onClick={() => selectSlide(index)}
                />
              ))}
            </div>

            <button
              type="button"
              className="slide-arrow"
              onClick={() => changeSlide(1)}
              aria-label="Next image"
            >
              <span aria-hidden="true">→</span>
            </button>

            {!reducedMotion && (
              <button
                type="button"
                className="slide-pause"
                onClick={() => setPaused((current) => !current)}
                aria-label={
                  paused ? "Play slideshow" : "Pause slideshow"
                }
              >
                {paused ? "Play" : "Pause"}
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="oaks-intro">
        <span className="oaks-eyebrow">
          WELCOME TO THE FIVE OAKS
        </span>

        <h2>A little nature. A lot of home.</h2>

        <p>
          Rich grain, warm tones, and finishes you’ll love coming home
          to. Explore furniture and home essentials inspired by the
          enduring beauty of wood.
        </p>
      </section>

      <section
        className="oaks-collections"
        id="collections"
        aria-labelledby="collections-title"
      >
        <div className="collections-heading">
          <h2 id="collections-title">Find your natural style.</h2>

          <a href="/shop">
            Explore all products <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="oaks-category-grid">
          {categories.map((category) => (
            <a
              href={category.link}
              className="oaks-category"
              key={category.title}
            >
              <div className="category-image">
                <img
                  src={category.image}
                  alt={`${category.title} collection with natural wood finishes`}
                  loading="lazy"
                />

                <span aria-hidden="true">↗</span>
              </div>

              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </a>
          ))}
        </div>
      </section>

      <footer className="oaks-footer">
        <span>THE FIVE OAKS</span>
        <p>Natural character. Lasting style.</p>

        <small>
          © {new Date().getFullYear()} The Five Oaks. All rights
          reserved.
        </small>
      </footer>
    </main>
  );
}