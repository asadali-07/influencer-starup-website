import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProductVideo = () => {
  const sectionRef = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const particlesRef = useRef([]);

  const handleMouseEnter = () => {
    if (video2Ref.current) {
      const video = video2Ref.current.querySelector("video");
      if (video) {
        video.muted = false;
      }
    }
  };

  const handleMouseLeave = () => {
    if (video2Ref.current) {
      const video = video2Ref.current.querySelector("video");
      if (video) {
        video.muted = true;
      }
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    // GSAP Timeline for coordinated animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Title animation with 3D effect
    tl.fromTo(
      title,
      { y: 100, opacity: 0, rotationX: 45, transformPerspective: 1000 },
      { y: 0, opacity: 1, rotationX: 0, duration: 1.2, ease: "power3.out" }
    );

    // Subtitle animation
    tl.fromTo(
      subtitle,
      { y: 50, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
      "-=0.8"
    );

    // Enhanced 3D video animations
    tl.fromTo(
      [video1, video2],
      {
        y: 150,
        opacity: 0,
        scale: 0.8,
        rotationY: 25,
        transformPerspective: 1000,
        transformOrigin: "center center",
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1.8,
        ease: "power4.out",
        stagger: 0.3,
      },
      "-=0.5"
    );

    // Continuous 3D floating animation for videos
    gsap.to(video1, {
      rotationY: 3,
      rotationX: 2,
      y: -15,
      duration: 4,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      transformPerspective: 1000,
    });

    gsap.to(video2, {
      rotationY: -3,
      rotationX: -2,
      y: 15,
      duration: 4.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1,
      transformPerspective: 1000,
    });

    // Floating particles animation
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.fromTo(
          particle,
          { y: 50, opacity: 0, scale: 0, rotation: 180 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            delay: 1.5 + index * 0.2,
            ease: "back.out(1.7)",
          }
        );

        // Subtle floating animation with 3D rotation
        gsap.to(particle, {
          y: "random(-15, 15)",
          x: "random(-8, 8)",
          rotation: "random(-360, 360)",
          duration: "random(5, 8)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.7,
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const videoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateX: 45,
      rotateY: 25,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden py-16 "
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30" />

      {/* Enhanced floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            ref={(el) => (particlesRef.current[index] = el)}
            className="absolute w-2 h-2 bg-white/10 rounded-full blur-sm"
            style={{
              left: `${10 + index * 8}%`,
              top: `${15 + index * 6}%`,
              transform: "translateZ(0)", // 3D context
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-block bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-light tracking-wider uppercase border border-white/20">
              Signature Collection
            </span>
          </motion.div>

          <h2
            ref={titleRef}
            className="text-5xl lg:text-7xl font-light text-white mb-6 leading-tight"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="block">Experience</span>
            <span className="block bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent font-extralight">
              Luxury
            </span>
          </h2>

          <p
            ref={subtitleRef}
            className="text-gray-400 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Immerse yourself in the artistry of our signature fragrances
          </p>
        </div>

        {/* Videos Grid with 3D perspective */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        >
          <motion.div
            ref={video1Ref}
            className="relative group"
            variants={videoVariants}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              rotateX: 2,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border border-gray-700/50">
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-white/5 z-10 pointer-events-none"></div>

              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-96 lg:h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
              >
                <source src="/video1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h3 className="text-xl font-light mb-2 text-white">
                  Signature Collection
                </h3>
                <p className="text-gray-400 font-light">
                  Crafted with precision
                </p>
              </div>
            </div>

            {/* Enhanced floating elements */}
            <motion.div
              className="absolute -top-2 -right-2 w-4 h-4 bg-white/20 rounded-full backdrop-blur-sm"
              animate={{
                y: [0, -8, 0],
                rotateZ: [0, 180, 360],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-4 -right-4 w-2 h-2 bg-white/15 rounded-full backdrop-blur-sm"
              animate={{
                y: [0, 10, 0],
                x: [0, 5, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>

          <motion.div
            ref={video2Ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative group"
            variants={videoVariants}
            whileHover={{
              scale: 1.05,
              rotateY: -5,
              rotateX: -2,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border border-gray-700/50">
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-white/5 z-10 pointer-events-none"></div>

              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-96 lg:h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
              >
                <source src="/video2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h3 className="text-xl font-light mb-2 text-white">
                  Artisan Process
                </h3>
                <p className="text-gray-400 font-light">
                  Handcrafted excellence
                </p>
              </div>
            </div>

            {/* Enhanced floating elements */}
            <motion.div
              className="absolute -bottom-2 -left-2 w-3 h-3 bg-white/15 rounded-full backdrop-blur-sm"
              animate={{
                y: [0, 8, 0],
                rotateZ: [0, -180, -360],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <motion.div
              className="absolute -top-4 -left-4 w-2 h-2 bg-white/20 rounded-full backdrop-blur-sm"
              animate={{
                y: [0, -10, 0],
                x: [0, -5, 0],
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Enhanced background pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
      </div>
    </motion.section>
  );
};

export default ProductVideo;
