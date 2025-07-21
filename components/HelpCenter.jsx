import React, { useState } from "react";
import { motion } from "framer-motion";
import helpCategories from "../data/helpCategory";
import quickActions from "../data/quickAction";

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics =
    helpCategories.find((cat) => cat.id === activeCategory)?.topics || [];

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
              HELP CENTER
            </motion.p>

            <motion.h2
              className="text-3xl md:text-4xl font-light mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              How can we <span className="italic text-gray-300">help you?</span>
            </motion.h2>

            <motion.p
              className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Find answers, get support, and discover everything you need to
              know about your LUXE experience.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              className="max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors backdrop-blur-sm"
                />
                <motion.button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.h3
              className="text-2xl font-light text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              Quick <span className="italic text-gray-300">Actions</span>
            </motion.h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <div className="text-3xl mb-4">{action.icon}</div>
                  <h4 className="text-lg font-medium mb-2">{action.title}</h4>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {action.description}
                  </p>
                  <motion.button
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm font-medium tracking-wide hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {action.action}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.h3
              className="text-2xl font-light text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              Browse by <span className="italic text-gray-300">Category</span>
            </motion.h3>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Category Tabs */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.4, duration: 0.8 }}
              >
                <div className="space-y-2">
                  {helpCategories.map((category, index) => (
                    <motion.button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full px-6 py-4 rounded-xl text-left flex items-center space-x-3 transition-all duration-300 ${
                        activeCategory === category.id
                          ? "bg-white/10 border border-white/20 text-white"
                          : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/8 hover:text-white"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.6 + index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-medium tracking-wide">
                        {category.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Topics List */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.4, duration: 0.8 }}
              >
                <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h4 className="text-xl font-light mb-6">
                    {
                      helpCategories.find((cat) => cat.id === activeCategory)
                        ?.name
                    }{" "}
                    Topics
                  </h4>
                  <div className="space-y-4">
                    {filteredTopics.map((topic, index) => (
                      <motion.a
                        key={index}
                        href={topic.link}
                        className="block p-4 rounded-lg border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300 group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 group-hover:text-white transition-colors">
                            {topic.title}
                          </span>
                          <svg
                            className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="px-6 py-16">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.8 }}
          >
            <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-12 border border-white/10">
              <h3 className="text-3xl font-light mb-4">
                Need{" "}
                <span className="italic text-gray-300">
                  Personal Assistance?
                </span>
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                Our luxury fragrance experts are available 24/7 to provide
                personalized support and help you discover your perfect scent.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-8 py-4 bg-white text-black font-medium tracking-wider hover:bg-gray-100 transition-colors "
                  whileHover={{ scale: 1.05, borderRadius: "50px" }}
                  whileTap={{ scale: 0.95 }}
                >
                  CONTACT SUPPORT
                </motion.button>
                <motion.button
                  className="px-8 py-4 border border-gray-600 text-white font-medium tracking-wider hover:border-white transition-colors rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  SCHEDULE CALL
                </motion.button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <h5 className="font-medium mb-2">Email Support</h5>
                    <p className="text-gray-400">support@luxecollection.com</p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Phone Support</h5>
                    <p className="text-gray-400">+1 (555) 123-LUXE</p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Hours</h5>
                    <p className="text-gray-400">24/7 Premium Support</p>
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

export default HelpCenter;
