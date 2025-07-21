import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useLoadingStore from "../src/store/loadingStore";

const Loading = () => {
  const { isLoading, loadingProgress, loadingMessage } = useLoadingStore();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
          </div>

          {/* Elegant Floating Elements */}
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-px h-px bg-white/20 rounded-full"
              style={{
                left: `${20 + index * 30}%`,
                top: `${30 + index * 15}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 1.5,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Main Content Container */}
          <div className="relative z-10 text-center">
            {/* Logo Section */}
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Logo Container */}
              <motion.div
                className="relative flex flex-col items-center justify-center mb-12"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Subtle Logo Glow */}
                <motion.div
                  className="absolute w-24 h-24 bg-white/[0.03] rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Logo */}
                <motion.div
                  className="relative z-10 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1.5 }}
                >
                  <motion.img
                    src="/logo.png"
                    alt="LUXE"
                    className="w-16 h-16 object-contain filter brightness-110 contrast-110"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </motion.div>

                {/* LUXE Text */}
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                >
                  {["L", "U", "X", "E"].map((letter, index) => (
                    <motion.span
                      key={index}
                      className="text-4xl md:text-5xl font-extralight tracking-[0.4em] inline-block text-white/90"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 1 + index * 0.1,
                        duration: 0.8,
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
                className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 1.5,
                  duration: 1.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </motion.div>

            {/* Loading Indicator */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              {/* Minimal Spinner */}
              <motion.div className="relative w-12 h-12 mx-auto mb-12">
                <motion.div className="absolute inset-0 rounded-full border border-white/10" />
                <motion.div
                  className="absolute inset-0 rounded-full border border-transparent border-t-white/60"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Elegant Dots */}
              <div className="flex items-center justify-center space-x-2 mb-12">
                {[...Array(3)].map((_, index) => (
                  <motion.div
                    key={index}
                    className="w-1 h-1 bg-white/40 rounded-full"
                    animate={{
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="space-y-6"
            >
              {/* Loading Label */}
              <motion.p
                className="text-white/60 text-xs tracking-[0.2em] font-light uppercase"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Loading
              </motion.p>

              {/* Dynamic Message */}
              <motion.p
                className="text-white/50 text-xs font-light h-4"
                key={loadingMessage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {loadingMessage}
              </motion.p>

              {/* Progress Percentage */}
              <motion.p
                className="text-white/80 text-lg font-extralight"
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {loadingProgress}%
              </motion.p>
            </motion.div>

            {/* Minimal Progress Bar */}
            <motion.div
              className="mt-12 w-48 mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
            >
              <div className="relative w-full h-px bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-white/60"
                  initial={{ width: "0%" }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />

                {/* Subtle shimmer effect */}
                <motion.div
                  className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-2rem", "12rem"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1,
                  }}
                />
              </div>
            </motion.div>

            {/* Luxury Brand Tagline */}
            <motion.p
              className="mt-16 text-white/30 text-xs tracking-[0.3em] font-extralight uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 2 }}
            >
              Crafting Excellence
            </motion.p>
          </div>

          {/* Subtle Corner Accents */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-px bg-gradient-to-r from-white/20 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 2 }}
          />
          <motion.div
            className="absolute top-8 left-8 w-px h-16 bg-gradient-to-b from-white/20 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.2, duration: 2 }}
          />

          <motion.div
            className="absolute bottom-8 right-8 w-16 h-px bg-gradient-to-l from-white/20 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.4, duration: 2 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-px h-16 bg-gradient-to-t from-white/20 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.6, duration: 2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
