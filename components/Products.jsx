import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../src/store/cartStore";
import { useWishlistStore } from "../src/store/wishlistStore";
import perfumeProducts from "../data/perfumeData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const { addItem } = useCartStore();
  const { addToWishlist } = useWishlistStore();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Title animation
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Cards stagger animation
    gsap.fromTo(
      cardsRef.current,
      { y: 100, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={sectionRef} className="py-20 bg-black overflow-hidden mt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.span
            className="inline-block bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-light tracking-wider uppercase border border-white/20 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Collection
          </motion.span>

          <h2 className="text-4xl lg:text-6xl font-light text-white mb-6 leading-tight">
            <span className="block">Luxury</span>
            <span className="block bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
              Fragrances
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Discover our complete collection of premium fragrances, each
            carefully crafted to capture unique emotions and create
            unforgettable experiences.
          </p>
        </div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {perfumeProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="block group relative"
            >
              <motion.div
                ref={(el) => (cardsRef.current[index] = el)}
                variants={cardVariants}
                className="relative bg-gradient-to-br from-gray-900/50 to-black rounded-3xl p-6 border border-gray-800/50 backdrop-blur-sm overflow-hidden"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Glowing background effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl"
                  style={{ backgroundColor: product.color }}
                />

                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span
                    className="text-white text-xs px-3 py-1 rounded-full font-medium"
                    style={{ backgroundColor: `${product.color}80` }}
                  >
                    {product.category}
                  </span>
                </div>

                {/* Product Image */}
                <div className="relative h-64 mb-6 flex items-center justify-center">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))" }}
                    whileHover={{ rotateY: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />

                  {/* Floating particles */}
                  <motion.div
                    className="absolute top-4 left-4 w-2 h-2 rounded-full opacity-60"
                    style={{ backgroundColor: product.color }}
                    animate={{
                      y: [0, -10, 0],
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="relative z-10">
                  <h3 className="text-white text-xl font-light mb-2 group-hover:text-white transition-colors duration-300">
                    {product.name}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-white text-xl font-light">
                        ${product.price}
                      </span>
                      <span className="text-gray-500 text-sm line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <span
                      className="text-white text-xs px-2 py-1 rounded-full font-medium"
                      style={{ backgroundColor: product.color }}
                    >
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addItem({
                          id: product.id,
                          name: product.name,
                          quantity: 1,
                          price: product.price,
                          originalPrice: product.originalPrice,
                          image: product.image,
                          color: product.color,
                          description: product.description,
                          category: product.category,
                        });
                        toast.success(`${product.name} added to cart!`);
                      }}
                      className="flex-1 bg-white text-black py-3  font-medium text-sm tracking-wide hover:bg-gray-100 transition-all duration-300"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                        borderRadius: "50px",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      Add to Cart
                    </motion.button>

                    <motion.button
                      className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToWishlist({
                          id: product.id,
                          name: product.name,
                          quantity: 1,
                          price: product.price,
                          originalPrice: product.originalPrice,
                          image: product.image,
                          color: product.color,
                          description: product.description,
                          category: product.category,
                          inStock: product.inStock,
                        });
                        toast.success(`${product.name} added to wishlist!`);
                      }}
                    >
                      <Heart className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>

                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              </motion.div>
            </Link>
          ))}
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
    </section>
  );
};

export default Products;