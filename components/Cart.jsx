import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useCartStore } from "../src/store/cartStore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../src/store/authStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { accessToken } = useAuthStore();
  const { items, removeItem, increaseQuantity, decreaseQuantity } =
    useCartStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const cartRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
    );

    // Cart animation
    gsap.fromTo(
      cartRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.4 }
    );
  }, []);

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "luxe10") {
      setDiscount(0.1);
      setPromoCode("");
      toast.success("Promo code applied! 10% off");
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal - discountAmount + shipping;

  const handleCheckout = async () => {
    if (!accessToken.value) {
      navigate("/login");
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success("Proceeding to checkout...");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden mt-16 sm:mt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-black to-gray-900/20"></div>

      {/* Floating Particles - Hidden on mobile for performance */}
      <motion.div
        className="absolute top-20 left-1/4 w-2 h-2 bg-white/10 rounded-full hidden md:block"
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
        className="absolute top-40 right-1/3 w-1 h-1 bg-white/20 rounded-full hidden md:block"
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <motion.img
              src="/logo.png"
              alt="LUXE"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain filter drop-shadow-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-thin tracking-[0.2em] sm:tracking-[0.3em]">
              LUXE
            </h1>
          </div>
          <div className="w-16 sm:w-20 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-2"></div>
          <p className="text-gray-400 text-xs tracking-widest">SHOPPING CART</p>
        </motion.div>

        {items.length === 0 ? (
          /* Empty Cart */
          <motion.div
            className="text-center py-12 sm:py-16 lg:py-20 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 opacity-30"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-full h-full"
              >
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
              </svg>
            </motion.div>
            <h3 className="text-lg sm:text-xl font-light mb-3 sm:mb-4">
              Your cart is empty
            </h3>
            <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
              Discover our luxury fragrance collection
            </p>
            <motion.button
              className="px-6 sm:px-8 py-3 bg-white text-black font-medium tracking-wider hover:bg-gray-100 transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/products">CONTINUE SHOPPING</Link>
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                ref={cartRef}
                className="space-y-4 sm:space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <AnimatePresence>
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="backdrop-blur-sm bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ delay: index * 0.1 }}
                      layout
                    >
                      {/* Mobile Layout */}
                      <div className="flex flex-col sm:hidden space-y-4">
                        <div className="flex items-center space-x-4">
                          {/* Product Image */}
                          <motion.div
                            className="w-16 h-16 flex-shrink-0"
                            whileHover={{ scale: 1.1 }}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </motion.div>

                          {/* Product Info */}
                          <div className="flex-grow">
                            <h3 className="text-base font-light tracking-wide">
                              {item.name}
                            </h3>
                            <p className="text-gray-400 text-sm">{item.size}</p>
                            <p className="text-white font-medium mt-1">
                              ${item.price}
                            </p>
                          </div>

                          {/* Remove Button */}
                          <motion.button
                            onClick={() => {
                              removeItem(item.id);
                              toast.success("Item removed from cart");
                            }}
                            className="text-gray-400 hover:text-red-400 transition-colors p-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </motion.button>
                        </div>

                        {/* Quantity Controls and Total */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <motion.button
                              onClick={() => decreaseQuantity(item.id)}
                              className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-white transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M20 12H4"
                                />
                              </svg>
                            </motion.button>

                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>

                            <motion.button
                              onClick={() =>
                                increaseQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-white transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                            </motion.button>
                          </div>

                          {/* Item Total */}
                          <div className="text-right">
                            <p className="font-medium text-lg">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Desktop/Tablet Layout */}
                      <div className="hidden sm:flex items-center space-x-4 md:space-x-6">
                        {/* Product Image */}
                        <motion.div
                          className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0"
                          whileHover={{ scale: 1.1 }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </motion.div>

                        {/* Product Info */}
                        <div className="flex-grow">
                          <h3 className="text-base md:text-lg font-light tracking-wide">
                            {item.name}
                          </h3>
                          <p className="text-gray-400 text-sm">{item.size}</p>
                          <p className="text-white font-medium mt-1">
                            ${item.price}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2 md:space-x-3">
                          <motion.button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-white transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          </motion.button>

                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>

                          <motion.button
                            onClick={() =>
                              increaseQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-white transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </motion.button>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                          onClick={() => {
                            removeItem(item.id);
                            toast.success("Item removed from cart");
                          }}
                          className="text-gray-400 hover:text-red-400 transition-colors p-2"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </motion.button>

                        {/* Item Total */}
                        <div className="text-right w-16 md:w-20">
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 mt-6 lg:mt-0">
              <motion.div
                className="backdrop-blur-sm bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 lg:sticky lg:top-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-lg sm:text-xl font-light tracking-wide mb-4 sm:mb-6">
                  Order Summary
                </h3>

                {/* Promo Code */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row gap-2 mb-5">
                    <input
                      type="text"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-grow px-3 sm:px-4 py-2 sm:py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors text-sm sm:text-base"
                    />
                    <motion.button
                      onClick={applyPromoCode}
                      className="px-4 py-2 sm:py-3 border border-gray-600 rounded-lg hover:border-white transition-colors text-sm sm:text-base whitespace-nowrap"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Apply
                    </motion.button>
                  </div>
                  {discount > 0 && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-400 text-sm mt-2"
                    >
                      Promo code applied! 10% off
                    </motion.p>
                  )}
                </div>

                {/* Order Details */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400 text-sm sm:text-base">
                      <span>Discount (10%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-400">Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-green-400 text-xs sm:text-sm">
                      Free shipping on orders over $100
                    </p>
                  )}
                  <div className="border-t border-gray-700 pt-2 sm:pt-3">
                    <div className="flex justify-between text-base sm:text-lg font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full py-3 sm:py-4 bg-white text-black font-medium tracking-[0.2em] hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 text-xs sm:text-sm"
                  whileHover={{
                    scale: isLoading ? 1.05 : 1.02,
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
                        className="w-4 h-4 border-2 border-black border-t-transparent mr-2"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      PROCESSING
                    </motion.div>
                  ) : (
                    "PROCEED TO CHECKOUT"
                  )}
                </motion.button>

                {/* Continue Shopping */}
                <motion.button
                  className="w-full mt-3 rounded-full sm:mt-4 py-2 sm:py-3 border border-gray-600 text-white font-medium tracking-wider hover:border-white transition-colors text-xs sm:text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link to="/products">CONTINUE SHOPPING</Link>
                </motion.button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
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

export default Cart;
