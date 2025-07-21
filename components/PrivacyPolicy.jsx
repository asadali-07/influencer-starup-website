import React, { useState } from "react";
import { motion } from "framer-motion";
import privacyData from "../data/privacyData";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const navigationItems = privacyData.map((section) => ({
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
              PRIVACY POLICY
            </motion.p>

            <motion.h2
              className="text-3xl md:text-4xl font-light mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Your Privacy{" "}
              <span className="italic text-gray-300">Matters to Us</span>
            </motion.h2>

            <motion.p
              className="text-gray-400 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Learn how we collect, use, and protect your personal information.
              We are committed to maintaining the highest standards of privacy
              and data security.
            </motion.p>
          </div>
        </section>

        {/* Privacy Content */}
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
                    Policy Sections
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

              {/* Privacy Content */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
                  {privacyData.map((section) => (
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
                        const currentIndex = privacyData.findIndex(
                          (item) => item.id === activeSection
                        );
                        if (currentIndex > 0) {
                          setActiveSection(privacyData[currentIndex - 1].id);
                        }
                      }}
                      disabled={
                        privacyData.findIndex(
                          (item) => item.id === activeSection
                        ) === 0
                      }
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ← Previous
                    </motion.button>

                    <span className="text-gray-400 text-sm">
                      {privacyData.findIndex(
                        (item) => item.id === activeSection
                      ) + 1}{" "}
                      of {privacyData.length}
                    </span>

                    <motion.button
                      className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-sm font-medium tracking-wide hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => {
                        const currentIndex = privacyData.findIndex(
                          (item) => item.id === activeSection
                        );
                        if (currentIndex < privacyData.length - 1) {
                          setActiveSection(privacyData[currentIndex + 1].id);
                        }
                      }}
                      disabled={
                        privacyData.findIndex(
                          (item) => item.id === activeSection
                        ) ===
                        privacyData.length - 1
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
                Privacy <span className="italic text-gray-300">Questions?</span>
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                If you have any questions about this Privacy Policy or how we
                handle your personal information, our privacy team is here to
                help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-8 py-4 bg-white text-black font-medium tracking-wider hover:bg-gray-100 transition-colors "
                  whileHover={{ scale: 1.05, borderRadius: "50px" }}
                  whileTap={{ scale: 0.95 }}
                >
                  CONTACT PRIVACY TEAM
                </motion.button>
                <motion.button
                  className="px-8 py-4 border border-gray-600 text-white font-medium tracking-wider hover:border-white transition-colors rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  MANAGE PREFERENCES
                </motion.button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <h5 className="font-medium mb-2">Privacy Email</h5>
                    <p className="text-gray-400">privacy@luxecollection.com</p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">
                      Data Protection Officer
                    </h5>
                    <p className="text-gray-400">dpo@luxecollection.com</p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Last Updated</h5>
                    <p className="text-gray-400">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
