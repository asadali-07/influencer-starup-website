import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const socialRef = useRef([]);
  const location = useLocation();

  // Smooth scroll to anchor links
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

  useEffect(() => {
    // GSAP animation for footer entrance
    gsap.fromTo(
      footerRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // GSAP animation for logo
    gsap.fromTo(
      logoRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, delay: 0.3, ease: "back.out(1.7)" }
    );

    // GSAP stagger animation for links
    gsap.fromTo(
      linksRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out",
      }
    );

    // GSAP stagger animation for social icons
    gsap.fromTo(
      socialRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.8,
        ease: "back.out(1.7)",
      }
    );
  }, []);

  const footerLinks = [
    {
      title: "Company",
      links: ["About", "Products", "Home", "Login"],
    },
    {
      title: "Support",
      links: ["HelpCenter", "TermsofService", "PrivacyPolicy", "FAQ"],
    },
    {
      title: "Our Perfumes",
      links: ["CrushRed", "EdgeGreen", "FlamePurple", "IntenseBlue"],
    },
  ];

  const socialLinks = [
    { name: "Twitter", image: "/twitter.png", href: "https://twitter.com" },
    {
      name: "Instagram",
      image: "/instagram.png",
      href: "https://www.instagram.com/mr_faisu_07/",
    },
    { name: "LinkedIn", image: "/linkedin.png", href: "https://linkedin.com" },
    { name: "GitHub", image: "/github.png", href: "https://github.com" },
  ];

  return (
    <motion.footer
      ref={footerRef}
      className="bg-black border-t border-gray-900/50 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <motion.div
              ref={logoRef}
              className="flex items-center space-x-3 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img
                src="/logo.png"
                alt="Logo"
                className="w-10 h-10 object-contain filter drop-shadow-lg"
              />
            </motion.div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md">
              Creating exceptional digital experiences with cutting-edge
              technology and innovative design solutions.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  ref={(el) => (socialRef.current[index] = el)}
                  className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center transition-all duration-300 text-sm"
                  whileHover={{
                    scale: 1.2,
                    y: -2,
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    to={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={social.image}
                      alt={social.name}
                      className="w-6 h-6 "
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, sectionIndex) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-white font-medium text-sm tracking-wider uppercase mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link}
                    ref={(el) =>
                      (linksRef.current[sectionIndex * 4 + linkIndex] = el)
                    }
                  >
                    <motion.div
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300 relative group"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Link
                        to={`${
                          sectionIndex === 2
                            ? `#products`
                            : `${link.toLowerCase()}` === "faq"
                            ? "#faq"
                            : `/${
                                link.toLowerCase() === "home"
                                  ? ""
                                  : link.toLowerCase()
                              }`
                        }`}
                      >
                        {link}
                      </Link>
                      <motion.div
                        className="absolute -bottom-1 left-0 h-px bg-white"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          className="mt-16 pt-8 border-t border-gray-900/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-white font-medium text-lg mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-400 text-sm">
                Get the latest news and updates delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:max-w-md lg:w-full">
              <motion.input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-900/50 border border-gray-800 rounded-full px-6 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white transition-colors duration-300"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <motion.button
                className="bg-white text-black px-8 py-3  font-medium text-sm tracking-wide hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap"
                whileHover={{ scale: 1.05, borderRadius: "50px" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-900/50 flex flex-col lg:flex-row lg:items-center lg:justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-xs mb-4 lg:mb-0">
            © 2025 Your Company. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <motion.div
              className="text-gray-500 hover:text-white text-xs transition-colors duration-300"
              whileHover={{ y: -1 }}
            >
              <Link to="/privacypolicy">Privacy Policy</Link>
            </motion.div>
            <motion.div
              className="text-gray-500 hover:text-white text-xs transition-colors duration-300"
              whileHover={{ y: -1 }}
            >
              <Link to="/termofservice">Terms of Service</Link>
            </motion.div>
            <motion.div
              className="text-gray-500 hover:text-white text-xs transition-colors duration-300"
              whileHover={{ y: -1 }}
            >
              <Link to="/helpcenter">Help Center</Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
