import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useCartStore } from "../src/store/cartStore";
import { useWishlistStore } from "../src/store/wishlistStore";
import perfumeProducts from "../data/perfumeData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const { addItem } = useCartStore();
  const { addToWishlist } = useWishlistStore();
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");

  const imageRef = useRef(null);
  const detailsRef = useRef(null);
  const specificationRef = useRef(null);

  useEffect(() => {
    // Find product by ID
    const foundProduct = perfumeProducts.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
    setLoading(false);

    if (foundProduct) {
      // GSAP animations
      gsap.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0, rotation: -10 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        detailsRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.4 }
      );

      gsap.fromTo(
        specificationRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.6 }
      );
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="text-white text-xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Product not found</div>
      </div>
    );
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-600"
        }`}
      >
        ★
      </span>
    ));
  };

  const tabs = [
    { id: "description", label: "Description" },
    { id: "notes", label: "Fragrance Notes" },
    { id: "reviews", label: "Reviews" },
    { id: "shipping", label: "Shipping & Care" },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ol className="flex items-center space-x-2 text-gray-400 text-sm">
            <li>
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>/</li>
            <li>
              <a
                href="/products"
                className="hover:text-white transition-colors"
              >
                Products
              </a>
            </li>
            <li>/</li>
            <li className="text-white">{product.name}</li>
          </ol>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image Section */}
          <div ref={imageRef} className="space-y-6">
            <motion.div
              className={`relative bg-gradient-to-br from-gray-900/50 to-black rounded-3xl p-8 lg:p-12 border border-gray-800/50`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Stock indicator */}
              {product.stockCount < 15 && (
                <div className="absolute top-6 left-6 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Only {product.stockCount} left!
                </div>
              )}

              {/* Glowing background effect */}
              <div
                className="absolute inset-0 rounded-3xl blur-3xl opacity-20"
                style={{ backgroundColor: product.color }}
              />

              <div className="relative z-10 flex items-center justify-center">
                <motion.img
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  className="w-full max-w-md h-96 object-contain"
                  style={{ filter: "drop-shadow(0 15px 35px rgba(0,0,0,0.5))" }}
                  whileHover={{ rotateY: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </div>

              {/* Category Badge */}
              <div className="absolute top-6 right-6">
                <span
                  className="text-white text-sm px-4 py-2 rounded-full font-medium backdrop-blur-sm"
                  style={{ backgroundColor: `${product.color}80` }}
                >
                  {product.category}
                </span>
              </div>
            </motion.div>

            {/* Image Thumbnails */}
            <div className="flex space-x-4">
              {product.images.map((img, index) => (
                <motion.div
                  key={index}
                  className={`w-20 h-20 rounded-xl border-2 cursor-pointer overflow-hidden ${
                    activeImageIndex === index
                      ? "border-white"
                      : "border-gray-700"
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-contain bg-gray-900"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div ref={detailsRef} className="space-y-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-gray-400 text-sm">{product.brand}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400 text-sm">
                  Launched {product.launchYear}
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-light text-white mb-4">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                  <span className="text-gray-400 ml-2">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                {product.longDescription}
              </p>
              {/* Product Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/50">
                  <span className="text-gray-400 text-sm">Concentration</span>
                  <p className="text-white font-medium">
                    {product.concentration}
                  </p>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/50">
                  <span className="text-gray-400 text-sm">Longevity</span>
                  <p className="text-white font-medium">{product.longevity}</p>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/50">
                  <span className="text-gray-400 text-sm">Season</span>
                  <p className="text-white font-medium">{product.season}</p>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/50">
                  <span className="text-gray-400 text-sm">Occasion</span>
                  <p className="text-white font-medium">{product.occasion}</p>
                </div>
              </div>
              {/* Price Section */}
              <div className="flex items-center space-x-4 mb-6">
                <div
                  className="text-3xl lg:text-4xl font-light text-white
                  flex items-center space-x-2"
                >
                  <span>${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through text-lg">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <span className="text-gray-400 text-sm font-medium">
                  {product.stockCount > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button
                  onClick={() => {
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
                  className="flex-1 bg-white text-black py-4 rounded-full font-medium tracking-wide hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Cart
                </motion.button>

                <motion.button
                  className="flex-1 border border-white/30 text-white py-4 rounded-full font-light tracking-wide hover:border-white hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
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
                  Add to Wishlist
                </motion.button>
              </div>

              {/* Shipping Info */}
              <div className="bg-green-900/20 border border-green-800/50 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-2 text-green-400 mb-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                  <span className="font-medium">Free Shipping</span>
                </div>
                <p className="text-green-300 text-sm">
                  {product.shippingInfo.estimatedDelivery} •{" "}
                  {product.shippingInfo.returnPolicy}
                </p>
              </div>

              {/* Stock Status */}
              {product.inStock && (
                <div className="flex items-center space-x-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">
                    In Stock ({product.stockCount} available)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Product Information Tabs */}
        <div ref={specificationRef} className="mt-20">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-800">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-white border-b-2 border-white"
                    : "text-gray-400 hover:text-white"
                }`}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "description" && (
                <div className="space-y-6">
                  <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800/50">
                    <h3 className="text-2xl text-white mb-4">
                      About {product.name}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {product.longDescription}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-white font-medium mb-3">
                          Perfumer
                        </h4>
                        <p className="text-gray-400">{product.perfumer}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-3">Gender</h4>
                        <p className="text-gray-400">{product.gender}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-3">Sillage</h4>
                        <p className="text-gray-400">{product.sillage}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-3">
                          Best For
                        </h4>
                        <p className="text-gray-400">{product.occasion}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notes" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800/50">
                    <h3 className="text-xl text-white mb-6">
                      Fragrance Pyramid
                    </h3>

                    <div className="space-y-6">
                      <div className="relative">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                          <h4 className="text-white font-medium">Top Notes</h4>
                        </div>
                        <p className="text-gray-400 pl-7">
                          {product.notes.top.join(", ")}
                        </p>
                        <div className="absolute left-2 top-8 w-px h-8 bg-gradient-to-b from-yellow-400 to-orange-400"></div>
                      </div>

                      <div className="relative">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                          <h4 className="text-white font-medium">
                            Middle Notes
                          </h4>
                        </div>
                        <p className="text-gray-400 pl-7">
                          {product.notes.middle.join(", ")}
                        </p>
                        <div className="absolute left-2 top-8 w-px h-8 bg-gradient-to-b from-orange-400 to-red-400"></div>
                      </div>

                      <div>
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                          <h4 className="text-white font-medium">Base Notes</h4>
                        </div>
                        <p className="text-gray-400 pl-7">
                          {product.notes.base.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800/50">
                    <h3 className="text-xl text-white mb-6">Ingredients</h3>
                    <div className="text-gray-400 leading-relaxed">
                      {product.ingredients.join(", ")}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-8">
                  {/* Review Summary */}
                  <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800/50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="text-center">
                        <div className="text-4xl font-light text-white mb-2">
                          {product.rating}
                        </div>
                        <div className="flex justify-center space-x-1 mb-2">
                          {renderStars(product.rating)}
                        </div>
                        <div className="text-gray-400">
                          Based on {product.reviews} reviews
                        </div>
                      </div>

                      <div className="space-y-2">
                        {product.reviewsData.map((review, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <span className="text-gray-400 w-8">
                              {review.rating}★
                            </span>
                            <div className="flex-1 bg-gray-800 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{
                                  width: `${
                                    (review.count / product.reviews) * 100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-gray-400 w-8">
                              {review.count}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {product.testimonials.map((testimonial, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">
                                {testimonial.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="text-white font-medium">
                                {testimonial.name}
                              </div>
                              {testimonial.verified && (
                                <div className="text-green-400 text-xs">
                                  Verified Purchase
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                        <p className="text-gray-300">{testimonial.comment}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800/50">
                    <h3 className="text-xl text-white mb-6">
                      Shipping Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300">
                          Free shipping on all orders
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300">
                          {product.shippingInfo.estimatedDelivery}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-gray-300">
                          {product.shippingInfo.returnPolicy}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800/50">
                    <h3 className="text-xl text-white mb-6">
                      Care Instructions
                    </h3>
                    <ul className="space-y-3">
                      {product.careInstructions.map((instruction, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-300">{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
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
  );
};

export default ProductDetail;
