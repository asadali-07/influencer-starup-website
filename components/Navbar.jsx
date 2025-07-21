import React, { useState, useEffect, useRef} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ShoppingCart } from "lucide-react";
import { Heart } from "lucide-react";
import { useCartStore } from "../src/store/cartStore";
import { useWishlistStore } from "../src/store/wishlistStore";
import { Link } from "react-router-dom";
import { useAuthStore } from "../src/store/authStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { accessToken, clearAccessToken } = useAuthStore();
  const navigate = useNavigate();
  const { items } = useCartStore();
  const { wishlist } = useWishlistStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);

const handleLogout = () => {
    clearAccessToken();
    navigate("/login");
};

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // GSAP animation for navbar entrance
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // GSAP animation for logo
    gsap.fromTo(
      logoRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, delay: 0.3, ease: "back.out(1.7)" }
    );

    // GSAP stagger animation for menu items
    gsap.fromTo(
      menuItemsRef.current,
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out",
      }
    );
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = ["Home", "About", "Products", "Login"];

  // Directly check the accessToken value
  const isLoggedIn = !!accessToken.value;

  return (
    <motion.nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black backdrop-blur-xl shadow-2xl" : "bg-black/90"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            ref={logoRef}
            className="flex items-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link to="/">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-12 h-12 object-contain filter drop-shadow-lg"
              />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-16">
            {navItems.map(
              (item, index) =>
                !(isLoggedIn && item === "Login") && (
                  <motion.div
                    key={item}
                    ref={(el) => (menuItemsRef.current[index] = el)}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link
                      to={`/${
                        item.toLowerCase() === "home" ? "" : item.toLowerCase()
                      }`}
                      className="text-gray-300 hover:text-white font-light text-sm tracking-widest uppercase transition-colors duration-300 relative group"
                    >
                      {item}
                      <motion.div
                        className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-white via-gray-300 to-white"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    </Link>
                  </motion.div>
                )
            )}

            {/* Logout */}
            {isLoggedIn && (
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white font-light text-sm tracking-widest uppercase transition-colors duration-300 relative group"
                >
                  Logout
                  <motion.div
                    className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-white via-gray-300 to-white"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </button>
              </motion.div>
            )}

            {/* Wishlist Link */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                to="/wishlist"
                className="text-gray-300 hover:text-white font-light text-sm tracking-widest uppercase transition-colors duration-300 relative group"
              >
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-4 bg-gray-900  text-white text-xs rounded-full px-1">
                    {wishlist.length}
                  </span>
                )}
                <Heart className="inline-block mr-2" size={18} />
                Wishlist
                <motion.div
                  className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-white via-gray-300 to-white"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </Link>
            </motion.div>
          </div>

          {/* Cart Button using framer-motion */}
          <motion.div
            className="hidden lg:block overflow-hidden"
            whileTap={{ scale: 0.95 }}
            whileHover={{
              scale: 1.05,
              borderRadius: "50px",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              to="/cart"
              className="block bg-gradient-to-r from-white to-gray-100 text-black px-6 py-3 font-medium text-sm tracking-wider hover:shadow-lg transition-shadow duration-300"
            >
              <ShoppingCart className="inline-block mr-2" size={18} />
              Cart
              <span
                className={`ml-2 text-xs bg-gray-900 text-white rounded-full px-2 py-1 ${
                  items.length > 0 ? "" : "hidden"
                }`}
              >
                {items.length}
              </span>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <motion.span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <motion.span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 bg-black backdrop-blur-xl border-b border-gray-900/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 py-8 space-y-8">
              {navItems.map((item, index) => 
                !(isLoggedIn && item === "Login") && (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      to={`/${
                        item.toLowerCase() === "home" ? "" : item.toLowerCase()
                      }`}
                      className="block text-gray-300 hover:text-white font-light text-lg tracking-widest uppercase transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                )
              )}

              {/* Mobile Logout */}
              {isLoggedIn && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block text-gray-300 hover:text-white font-light text-lg tracking-widest uppercase transition-colors duration-300"
                  >
                    Logout
                  </button>
                </motion.div>
              )}

              {/* Mobile Wishlist Link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <Link
                  to="/wishlist"
                  className="block text-gray-300 hover:text-white font-light text-lg tracking-widest uppercase transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="inline-block mr-2" size={18} />
                  Wishlist
                </Link>
              </motion.div>

              {/* Mobile Cart Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    to="/cart"
                    className="block w-full bg-gradient-to-r from-white to-gray-100 text-black px-6 py-3 font-medium text-sm tracking-wider mt-8 hover:shadow-lg hover:rounded-[50px] transition-all duration-300 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className="inline-block mr-2" size={18} />
                    Cart
                    <span className="ml-2 text-xs bg-gray-800 text-white rounded-full px-2 py-1">
                      {items.length}
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;