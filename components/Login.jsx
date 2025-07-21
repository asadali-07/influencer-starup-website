import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../src/store/authStore"

const Login = () => {
  const navigate = useNavigate();
  const { refreshAuth } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Logo animation
    gsap.fromTo(
      logoRef.current,
      { scale: 0.5, opacity: 0, y: -30 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.2,
      }
    );

    // Form animation
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.5 }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const data = await fetch(
        "https://two407-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await data.json();

      if (data.ok) {
        console.log("Login successful:", result);

        // Since your backend sets cookies, refresh the auth state
        // This will read the newly set cookie and update the store
        setTimeout(() => {
          refreshAuth();
        }, 100); // Small delay to ensure cookie is set

        setFormData({ email: "", password: "" });
        setErrors({});
        navigate("/");
      } else {
        setErrors({
          email: result.message || "Login failed. Please try again.",
        });
        console.error("Login failed:", result);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        error: "Network error. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-black to-gray-900/20"></div>

      {/* Animated floating particles */}
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

      {/* Logo Section */}
      <motion.div
        ref={logoRef}
        className="text-center mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="inline-block mb-6"
          whileHover={{
            scale: 1.05,
            rotate: [0, -1, 1, 0],
          }}
          transition={{ duration: 0.4 }}
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center justify-center space-x-4 mt-16 mb-5"
        >
          {/* Logo and Text Side by Side */}
          <motion.img
            src="/logo.png"
            alt="LUXE"
            className="w-12 h-12 object-contain filter drop-shadow-sm"
            initial={{ scale: 0.8, opacity: 0, x: -10 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          />
          <h1 className="text-5xl font-thin text-white tracking-[0.3em]">
            LUXE
          </h1>
        </motion.div>

        <motion.div
          className="w-24 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mt-3"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
        <p className="text-gray-400 text-sm tracking-widest mt-3">COLLECTION</p>
      </motion.div>

      {/* Login Form */}
      <motion.div
        ref={formRef}
        className="w-full max-w-sm relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <h2 className="text-2xl font-light text-white tracking-wide">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Sign in to your account
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <motion.input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-0 py-4 bg-transparent border-0 border-b text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all duration-300 text-lg ${
                  errors.email ? "border-red-400" : "border-gray-600"
                }`}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-2"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <motion.input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-0 py-4 bg-transparent border-0 border-b text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all duration-300 text-lg ${
                  errors.password ? "border-red-400" : "border-gray-600"
                }`}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-2"
                >
                  {errors.password}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              className="pt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-white text-black font-medium tracking-[0.2em] hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 text-sm"
                whileHover={{
                  scale: isLoading ? 1 : 1.02,
                  boxShadow: "0 10px 25px rgba(255,255,255,0.1)",
                  borderRadius: "50px",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-4 h-4 border-2 border-black border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    SIGNING IN
                  </motion.div>
                ) : (
                  "SIGN IN"
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Sign Up Section */}
          <motion.div
            className="text-center mt-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.5 }}
          >
            <span className="text-gray-400 text-sm">
              Don't have an account?{" "}
            </span>
            <motion.div
              className="text-white font-medium hover:underline transition-all duration-300"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 8px rgba(255,255,255,0.3)",
              }}
            >
              <Link to="/signup">Sign up</Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
