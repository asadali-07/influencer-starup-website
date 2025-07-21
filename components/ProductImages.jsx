import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useCartStore } from "../src/store/cartStore";
import perfumeProducts from "../data/perfumeData";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ProductImages = () => {
  const { addItem } = useCartStore();
  const [activeImage, setActiveImage] = useState(0);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const colorCirclesRef = useRef([]);

  useEffect(() => {
    // Initial animation for container
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
    );

    // Animate color circles
    gsap.fromTo(
      colorCirclesRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.5,
        ease: "back.out(1.7)",
      }
    );
  }, []);

  const handleColorChange = (index) => {
    if (index === activeImage) return;

    // Animate out current image
    gsap.to(imageRef.current, {
      scale: 0.8,
      opacity: 0,
      rotation: -10,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setActiveImage(index);
        // Animate in new image
        gsap.fromTo(
          imageRef.current,
          { scale: 0.8, opacity: 0, rotation: 10 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.5,
            ease: "power3.out",
          }
        );
      },
    });

    // Animate container background change
    gsap.to(containerRef.current, {
      background: `linear-gradient(135deg, ${perfumeProducts[index].color}20, #000000)`,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const currentProduct = perfumeProducts[activeImage];

  return (
    <section id="products" className="py-20 bg-black overflow-hidden mt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl lg:text-5xl font-light text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Signature Collection
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Experience our exclusive range of luxury fragrances, each crafted
            with distinctive character and elegance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Product Image Card */}
          <motion.div
            ref={containerRef}
            className={`relative bg-gradient-to-br ${currentProduct.bgGradient} rounded-3xl p-8 lg:p-12`}
            layout
          >
            {/* Glowing background effect */}
            <div
              className="absolute inset-0 rounded-3xl blur-3xl opacity-20"
              style={{ backgroundColor: currentProduct.color }}
            />

            <div className="relative z-10 flex items-center justify-center">
              <motion.div
                ref={imageRef}
                className="relative w-full max-w-md h-96 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/30 backdrop-blur-sm"
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  boxShadow: `0 25px 50px ${currentProduct.color}40`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Full Product Image */}
                <div className="w-full h-full relative">
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="w-full h-full object-contain p-4"
                    style={{
                      filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
                    }}
                  />

                  {/* Gradient overlay for better text visibility */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-white text-xl font-light mb-1">
                      {currentProduct.name}
                    </h3>
                    <p className="text-gray-300 text-sm">Premium Fragrance</p>
                  </div>
                </div>

                {/* Floating particles */}
                <motion.div
                  className="absolute top-6 right-6 w-3 h-3 rounded-full opacity-60"
                  style={{ backgroundColor: currentProduct.color }}
                  animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute top-20 right-12 w-2 h-2 rounded-full opacity-40"
                  style={{ backgroundColor: currentProduct.color }}
                  animate={{
                    y: [0, 12, 0],
                    scale: [1, 0.8, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5,
                  }}
                />
                <motion.div
                  className="absolute bottom-20 left-6 w-2 h-2 rounded-full opacity-50"
                  style={{ backgroundColor: currentProduct.color }}
                  animate={{
                    x: [0, 8, 0],
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.9, 0.5],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Product Details & Color Selector */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl lg:text-4xl font-light text-white mb-4">
                  {currentProduct.name}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  A sophisticated blend that captures the essence of luxury and
                  elegance. Crafted with the finest ingredients to create an
                  unforgettable sensory experience.
                </p>

                <div className="flex items-center space-x-4 mb-8">
                  <span className="text-white text-2xl font-light">{`$${currentProduct.price}`}</span>
                  <span className="text-gray-500 text-lg line-through">{`$${currentProduct.originalPrice}`}</span>
                  <span
                    className="text-white px-3 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: currentProduct.color }}
                  >
                    25% OFF
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Color Selection */}
            <div>
              <h4 className="text-white text-lg font-light mb-6">
                Select Fragrance
              </h4>
              <div className="flex flex-wrap gap-4">
                {perfumeProducts.map((product, index) => (
                  <motion.button
                    key={product.id}
                    ref={(el) => (colorCirclesRef.current[index] = el)}
                    onClick={() => handleColorChange(index)}
                    className={`relative w-14 h-14 rounded-full border-2 transition-all duration-300 overflow-hidden ${
                      activeImage === index
                        ? "border-white shadow-lg scale-110 ring-2 ring-white/30"
                        : "border-gray-600 hover:border-gray-400 hover:scale-105"
                    }`}
                    style={{ backgroundColor: product.color }}
                    whileHover={{ scale: activeImage === index ? 1.1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {/* Small product image in circle */}
                    <div className="absolute inset-1 rounded-full overflow-hidden bg-black/20">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-1 opacity-80"
                      />
                    </div>

                    {activeImage === index && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white "
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    {/* Tooltip */}
                    <motion.div
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 pointer-events-none z-10"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {product.name}
                    </motion.div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="bg-white text-black px-8 py-4  font-medium tracking-wide hover:bg-gray-100 transition-all duration-300 shadow-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
                  borderRadius: "50px",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  addItem({
                    id: currentProduct.id,
                    name: currentProduct.name,
                    quantity: 1,
                    price: currentProduct.price,
                    originalPrice: currentProduct.originalPrice,
                    image: currentProduct.image,
                    color: currentProduct.color,
                    description: currentProduct.description,
                    category: currentProduct.category,
                  });
                  toast.success(`${currentProduct.name} added to cart!`);
                }}
              >
                Add to Cart
              </motion.button>

              <motion.div
                className="border border-white/30 text-white px-8 py-4 rounded-full font-light tracking-wide hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={`/products/${currentProduct.id}`}>Learn More</Link>
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
        </div>
      </div>
    </section>
  );
};

export default ProductImages;
