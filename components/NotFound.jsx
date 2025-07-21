import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const NotFound = ({
  customTitle = "Lost in the Essence",
  customSubtitle = "The page you're looking for seems to have vanished like a fleeting fragrance. Let us guide you back to our luxurious collection.",
  customBadge = "Page Not Found",
}) => {
  const containerRef = useRef(null);
  const numberRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    // GSAP timeline for coordinated animations
    const tl = gsap.timeline();

    // Container animation
    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    );

    // 404 number animation
    tl.fromTo(
      numberRef.current,
      { scale: 0.5, opacity: 0, y: 100 },
      { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
      "-=0.5"
    );

    // Title animation
    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
      "-=0.8"
    );

    // Subtitle animation
    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.6"
    );

    // CTA button animation
    tl.fromTo(
      ctaRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.3"
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
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            ref={(el) => (particlesRef.current[index] = el)}
            className="absolute w-2 h-2 bg-white/20 rounded-full blur-sm"
            style={{
              left: `${15 + index * 12}%`,
              top: `${25 + index * 8}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20 relative z-10 text-center">
        {/* 404 Number */}
        <motion.div
          ref={numberRef}
          className="mb-8"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <h1 className="text-8xl lg:text-9xl font-extralight text-transparent bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text leading-none">
            404
          </h1>
          {/* Glowing effect behind the number */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-10" />
        </motion.div>

        {/* Error Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-block bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-light tracking-wider uppercase border border-white/20">
            {customBadge}
          </span>
        </motion.div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-4xl lg:text-6xl font-light text-white mb-6 leading-tight"
        >
          <span className="block bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent font-extralight">
            {customTitle}
          </span>
        </h2>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-gray-400 text-lg lg:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {customSubtitle}
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center"
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
            <Link to="/">Return Home</Link>
          </motion.button>

          <motion.button
            className="border border-white/30 text-white px-8 py-4 rounded-full font-light tracking-wide hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link to="/products">Explore Collection</Link>
          </motion.button>
        </div>

        {/* Decorative elements */}
        <div className="mt-16 relative">
          <motion.div
            className="absolute left-1/4 w-4 h-4 bg-white/10 rounded-full backdrop-blur-sm"
            animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute right-1/4 w-6 h-6 bg-white/15 rounded-full backdrop-blur-sm"
            animate={{ y: [0, 10, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />
        </div>
      </div>

      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
      </div>

      {/* Additional floating elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-3 h-3 bg-white/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-2 h-2 bg-white/25 rounded-full"
        animate={{
          y: [0, 15, 0],
          x: [0, -8, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </section>
  );
};

export default NotFound;
