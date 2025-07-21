import React, { useState } from "react";
import { motion } from "framer-motion";
import termsData from "../data/termData";

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const navigationItems = termsData.map((section) => ({
    id: section.id,
    title: section.title,
  }));

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden mt-10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-black to-gray-900/20"></div>

      {/* Floating Particles */}
      <motion.div
        className="absolute top-20 left-1/4 w-2 h-2 bg-white/10 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-1/3 w-1 h-1 bg-white/20 rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-white/15 rounded-full"
        animate={{
          y: [0, -10, 0],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="flex items-center justify-center space-x-4 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                src="/logo.png"
                alt="LUXE"
                className="w-12 h-12 object-contain filter drop-shadow-sm"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <h1 className="text-4xl md:text-5xl font-thin tracking-[0.3em]">
                LUXE
              </h1>
            </motion.div>

            <motion.div
              className="w-24 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            />

            <motion.p
              className="text-gray-400 text-xs tracking-widest mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              TERMS OF SERVICE
            </motion.p>

            <motion.h2
              className="text-3xl md:text-4xl font-light mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Legal{" "}
              <span className="italic text-gray-300">Terms & Conditions</span>
            </motion.h2>

            <motion.p
              className="text-gray-400 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Please read these terms and conditions carefully before using our
              services. Your access to and use of our services is conditioned on
              your acceptance of these terms.
            </motion.p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Navigation Sidebar */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                <div className="sticky top-6">
                  <h3 className="text-lg font-light mb-6 text-gray-300">
                    Quick Navigation
                  </h3>
                  <div className="space-y-2">
                    {navigationItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full px-4 py-3 rounded-lg text-left text-sm transition-all duration-300 ${
                          activeSection === item.id
                            ? "bg-white/10 border border-white/20 text-white"
                            : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/8 hover:text-white"
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 1.6 + index * 0.05,
                          duration: 0.6,
                        }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {item.title}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Terms Content */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
                  {termsData.map((section) => (
                    <motion.div
                      key={section.id}
                      className={`${
                        activeSection === section.id ? "block" : "hidden"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <h3 className="text-2xl font-light mb-6 text-white">
                        {section.title}
                      </h3>
                      <div className="prose prose-invert max-w-none">
                        {section.content
                          .split("\n\n")
                          .map((paragraph, index) => (
                            <p
                              key={index}
                              className="text-gray-300 leading-relaxed mb-4 last:mb-0"
                            >
                              {paragraph}
                            </p>
                          ))}
                      </div>
                    </motion.div>
                  ))}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
                    <motion.button
                      className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-sm font-medium tracking-wide hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => {
                        const currentIndex = termsData.findIndex(
                          (item) => item.id === activeSection
                        );
                        if (currentIndex > 0) {
                          setActiveSection(termsData[currentIndex - 1].id);
                        }
                      }}
                      disabled={
                        termsData.findIndex(
                          (item) => item.id === activeSection
                        ) === 0
                      }
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ← Previous
                    </motion.button>

                    <span className="text-gray-400 text-sm">
                      {termsData.findIndex(
                        (item) => item.id === activeSection
                      ) + 1}{" "}
                      of {termsData.length}
                    </span>

                    <motion.button
                      className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-sm font-medium tracking-wide hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => {
                        const currentIndex = termsData.findIndex(
                          (item) => item.id === activeSection
                        );
                        if (currentIndex < termsData.length - 1) {
                          setActiveSection(termsData[currentIndex + 1].id);
                        }
                      }}
                      disabled={
                        termsData.findIndex(
                          (item) => item.id === activeSection
                        ) ===
                        termsData.length - 1
                      }
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Next →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-6 py-16">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-12 border border-white/10">
              <h3 className="text-3xl font-light mb-4">
                Questions About Our{" "}
                <span className="italic text-gray-300">Terms?</span>
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                If you have any questions about these Terms of Service, please
                don't hesitate to contact our legal team. We're here to ensure
                you have a clear understanding of our policies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-8 py-4 bg-white text-black font-medium tracking-wider hover:bg-gray-100 transition-colors "
                  whileHover={{ scale: 1.05, borderRadius: "50px" }}
                  whileTap={{ scale: 0.95 }}
                >
                  CONTACT LEGAL TEAM
                </motion.button>
                <motion.button
                  className="px-8 py-4 border border-gray-600 text-white font-medium tracking-wider rounded-full hover:border-white transition-colors "
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  DOWNLOAD PDF
                </motion.button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-gray-500 text-sm">
                  Last updated:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
