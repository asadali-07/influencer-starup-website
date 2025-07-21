import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../src/store/authStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
        "https://two407-backend.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const result = await data.json();

      if (data.ok) {
        setAccessToken(result.accessToken);
        toast.success(result.message || "Account created successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});
        navigate("/");
      } else {
        setErrors({
          email: result.message || "Signup failed. Please try again.",
        });
        console.error("Signup failed:", result);
      }
    } catch (error) {
      console.error("Signup error:", error);
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
        className="text-center mb-12"
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
          className="flex items-center justify-center space-x-3 mt-16 mb-5"
        >
          {/* Logo and Text Side by Side */}
          <motion.img
            src="/logo.png"
            alt="LUXE"
            className="w-10 h-10 object-contain filter drop-shadow-sm"
            initial={{ scale: 0.8, opacity: 0, x: -10 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          />
          <h1 className="text-4xl font-thin text-white tracking-[0.3em]">
            LUXE
          </h1>
        </motion.div>

        <motion.div
          className="w-20 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mt-2"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
        <p className="text-gray-400 text-xs tracking-widest mt-2">COLLECTION</p>
      </motion.div>

      {/* Signup Form */}
      <motion.div
        ref={formRef}
        className="w-full max-w-md relative"
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
              Create Account
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Join the LUXE Collection
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields Row */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <div>
                <motion.input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-0 py-3 bg-transparent border-0 border-b text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all duration-300 ${
                    errors.firstName ? "border-red-400" : "border-gray-600"
                  }`}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                {errors.firstName && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1"
                  >
                    {errors.firstName}
                  </motion.p>
                )}
              </div>

              <div>
                <motion.input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-0 py-3 bg-transparent border-0 border-b text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all duration-300 ${
                    errors.lastName ? "border-red-400" : "border-gray-600"
                  }`}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                {errors.lastName && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1"
                  >
                    {errors.lastName}
                  </motion.p>
                )}
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
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

            {/* Password Field */}
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

            {/* Confirm Password Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <motion.input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-0 py-4 bg-transparent border-0 border-b text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all duration-300 text-lg ${
                  errors.confirmPassword ? "border-red-400" : "border-gray-600"
                }`}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-2"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              className="pt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
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
                    CREATING ACCOUNT
                  </motion.div>
                ) : (
                  "CREATE ACCOUNT"
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Login Link */}
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            <span className="text-gray-400 text-sm">
              Already have an account?{" "}
            </span>
            <motion.div
              className="text-white font-medium hover:underline transition-all duration-300"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 8px rgba(255,255,255,0.3)",
              }}
            >
              <Link to="/login">Sign in</Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          color: "white",
          fontFamily: "inherit",
          fontSize: "14px",
          fontWeight: "300",
          letterSpacing: "0.5px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
        }}
        progressStyle={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 100%)",
          height: "2px",
        }}
        closeButtonStyle={{
          color: "rgba(255, 255, 255, 0.7)",
          fontSize: "16px",
        }}
        style={{
          zIndex: 9999,
        }}
      />
    </div>
  );
};

export default Signup;
