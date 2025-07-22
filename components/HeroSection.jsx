import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    // GSAP timeline for coordinated animations
    const tl = gsap.timeline();

    // Hero container animation
    tl.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    );

    // Title animation
    tl.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
      "-=0.5"
    );

    // Subtitle animation
    tl.fromTo(
      subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.8"
    );

    // CTA button animation
    tl.fromTo(
      ctaRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Product image animation
    tl.fromTo(
      imageRef.current,
      { scale: 0.8, opacity: 0, rotation: -10 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: "power3.out" },
      "-=1.2"
    );

    // Floating particles animation
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.fromTo(
          particle,
          { y: 100, opacity: 0, scale: 0 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: 1 + index * 0.2,
            ease: "power2.out",
          }
        );

        // Continuous floating animation
        gsap.to(particle, {
          y: "random(-20, 20)",
          x: "random(-10, 10)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5,
        });
      }
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-black overflow-hidden flex items-center mt-10"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            ref={(el) => (particlesRef.current[index] = el)}
            className="absolute w-2 h-2 bg-white/20 rounded-full blur-sm"
            style={{
              left: `${20 + index * 15}%`,
              top: `${30 + index * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-block bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-light tracking-wider uppercase border border-white/20">
                Exclusive Collection
              </span>
            </motion.div>

            <h1
              ref={titleRef}
              className="text-5xl lg:text-7xl font-light text-white mb-6 leading-tight"
            >
              <span className="block">Essence of</span>
              <span className="block bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent font-extralight">
                Luxury
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-gray-400 text-lg lg:text-xl mb-8 max-w-lg leading-relaxed"
            >
              Discover our signature collection of premium fragrances, crafted
              with the finest ingredients for the most discerning connoisseurs.
            </p>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                className="bg-white text-black px-8 py-4 font-medium tracking-wide hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-white/20"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
                  borderRadius: "50px",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link to="/products">Explore Collection</Link>
              </motion.button>

              <motion.button
                className="border border-white/30 text-white px-8 py-4 rounded-full font-light tracking-wide hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  to="https://www.instagram.com/mr_faisu_07/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Story
                </Link>
              </motion.button>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              ref={imageRef}
              className="relative"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-gray-300/20 rounded-full blur-3xl scale-150 opacity-50" />

              {/* Product placeholder - replace with your perfume image */}
              <div className="relative w-92 h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl flex items-center justify-center border border-gray-700/50 ">
                <img
                  fetchPriority="high"
                  src="/All.png"
                  alt="Perfume"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Floating elements around product */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-white/15 rounded-full backdrop-blur-sm"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <p className="text-white/60 text-xs mt-2 tracking-wider">SCROLL</p>
        </motion.div>
      </div>

      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
      </div>
    </section>
  );
};

export default HeroSection;
