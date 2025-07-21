import React from "react";
import { motion } from "framer-motion";

const LoadingFallback = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white flex items-center justify-center overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      </div>

      {/* Elegant Floating Elements - Visible immediately */}
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-white/40 rounded-full"
          style={{
            left: `${20 + index * 30}%`,
            top: `${30 + index * 15}%`,
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: index * 0.2, // Reduced delay
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main Content Container - Show immediately */}
      <div className="relative z-10 text-center">
        {/* Logo Section - No initial delay */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 1, y: 0 }} // Start visible
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo Container */}
          <motion.div
            className="relative flex flex-col items-center justify-center mb-8"
            initial={{ scale: 1 }} // Start at full scale
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Subtle Logo Glow */}
            <motion.div
              className="absolute w-20 h-20 bg-white/[0.08] rounded-full blur-2xl"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Fallback Logo - Show immediately */}
            <motion.div
              className="relative z-10 mb-6"
              initial={{ opacity: 1 }} // Start visible
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-12 h-12 border border-white/50 rounded-full flex items-center justify-center"
                animate={{
                  borderColor: [
                    "rgba(255,255,255,0.5)",
                    "rgba(255,255,255,0.8)",
                    "rgba(255,255,255,0.5)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-6 h-6 bg-white/80 rounded-full"></div>
              </motion.div>
            </motion.div>

            {/* Brand Text - Show immediately with staggered letters */}
            <motion.div
              className="flex items-center"
              initial={{ opacity: 1 }} // Start visible
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {["L", "U", "X", "E"].map((letter, index) => (
                <motion.span
                  key={index}
                  className="text-3xl md:text-4xl font-extralight tracking-[0.4em] inline-block text-white"
                  initial={{ opacity: 1, y: 0 }} // Start visible
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.05, // Very short delay for stagger effect
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Minimal Divider */}
          <motion.div
            className="w-12 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* Loading Indicator - Show immediately */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 1 }} // Start visible
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Minimal Spinner */}
          <motion.div className="relative w-10 h-10 mx-auto mb-8">
            <motion.div className="absolute inset-0 rounded-full border border-white/20" />
            <motion.div
              className="absolute inset-0 rounded-full border border-transparent border-t-white/80"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Elegant Dots */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-white/60 rounded-full"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.1, // Reduced delay
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Loading Text - Show immediately */}
        <motion.div
          initial={{ opacity: 1 }} // Start visible
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* Loading Label */}
          <motion.p
            className="text-white/80 text-xs tracking-[0.2em] font-light uppercase"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading Experience...
          </motion.p>

          {/* Luxury Brand Tagline */}
          <motion.p
            className="text-white/50 text-xs tracking-[0.3em] font-extralight uppercase"
            initial={{ opacity: 0.5 }} // Start semi-visible
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Crafting Excellence
          </motion.p>
        </motion.div>
      </div>

      {/* Subtle Corner Accents - Show with minimal delay */}
      <motion.div
        className="absolute top-8 left-8 w-12 h-px bg-gradient-to-r from-white/40 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      />
      <motion.div
        className="absolute top-8 left-8 w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      />

      <motion.div
        className="absolute bottom-8 right-8 w-12 h-px bg-gradient-to-l from-white/40 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-px h-12 bg-gradient-to-t from-white/40 to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      />
    </div>
  );
};

export default LoadingFallback;
