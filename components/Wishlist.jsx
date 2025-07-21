import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useWishlistStore } from "../src/store/wishlistStore";
import { useCartStore } from "../src/store/cartStore";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const wishlistRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
    );

    // Wishlist animation
    gsap.fromTo(
      wishlistRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.4 }
    );
  }, []);

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const moveSelectedToCart = async () => {
    if (selectedItems.length === 0) return;

    setIsLoading(true);
    const itemsToAdd = wishlist.filter(
      (item) => selectedItems.includes(item.id) && item.inStock
    ); //because we only want to add items that are in stock and selected item array store only id
    for (const item of itemsToAdd) {
      addItem(item);
      removeFromWishlist(item.id);
    }
    setIsLoading(false);
    setSelectedItems([]);
  };
  const selectedAvailableItems = selectedItems.filter((id) =>
    wishlist.find((item) => item.id === id && item.inStock)
  );

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

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <motion.img
              src="/logo.png"
              alt="LUXE"
              className="w-10 h-10 object-contain filter drop-shadow-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
            <h1 className="text-4xl font-thin tracking-[0.3em]">LUXE</h1>
          </div>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-2"></div>
          <p className="text-gray-400 text-xs tracking-widest">WISHLIST</p>

          {wishlist.length > 0 && (
            <motion.p
              className="text-gray-400 text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
            </motion.p>
          )}
        </motion.div>

        {wishlist.length === 0 ? (
          /* Empty Wishlist */
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="w-24 h-24 mx-auto mb-6 opacity-30"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-full h-full"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
            <h3 className="text-xl font-light mb-4">Your wishlist is empty</h3>
            <p className="text-gray-400 mb-8">
              Save your favorite fragrances for later
            </p>
            <motion.button
              className="px-8 py-3 bg-white text-black font-medium tracking-wider hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/products">CONTINUE SHOPPING</Link>
            </motion.button>
          </motion.div>
        ) : (
          <div>
            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
              <motion.div
                className="backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-white/10 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {selectedAvailableItems.length} of {selectedItems.length}{" "}
                    selected items available
                  </span>
                  <div className="flex space-x-4">
                    <motion.button
                      onClick={() => setSelectedItems([])}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      Clear Selection
                    </motion.button>
                    <motion.button
                      onClick={moveSelectedToCart}
                      disabled={
                        selectedAvailableItems.length === 0 || isLoading
                      }
                      className="px-4 py-2 bg-white text-black text-sm font-medium tracking-wider hover:bg-gray-100 transition-colors disabled:opacity-50"
                      whileHover={{
                        scale: selectedAvailableItems.length > 0 ? 1.05 : 1,
                        borderRadius: "50px",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isLoading
                        ? "ADDING..."
                        : `ADD ${selectedAvailableItems.length} TO CART`}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Wishlist Items Grid */}
            <motion.div
              ref={wishlistRef}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AnimatePresence>
                {wishlist.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.1 }}
                    layout
                  >
                    {/* Selection Checkbox */}
                    <motion.div
                      className="absolute top-4 left-4 z-10"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <motion.button
                        onClick={() => toggleSelectItem(item.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedItems.includes(item.id)
                            ? "bg-white border-white"
                            : "border-gray-600 hover:border-white"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {selectedItems.includes(item.id) && (
                          <svg
                            className="w-3 h-3 text-black"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </motion.button>
                    </motion.div>

                    {/* Remove Button */}
                    <motion.button
                      onClick={() => {
                        removeFromWishlist(item.id);
                        setSelectedItems((prev) =>
                          prev.filter((itemId) => itemId !== item.id)
                        );
                      }}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>

                    {/* Product Image */}
                    <motion.div
                      className="w-full h-40 flex items-center justify-center mb-6"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </motion.div>

                    {/* Product Info */}
                    <div className="text-center">
                      <h3 className="text-lg font-light tracking-wide mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400 text-sm">
                          {item.size}
                        </span>
                        <span className="text-white font-medium">
                          ${item.price}
                        </span>
                      </div>

                      {/* Stock Status */}
                      <div className="mb-4">
                        {item.inStock ? (
                          <span className="text-green-400 text-sm">
                            In Stock
                          </span>
                        ) : (
                          <span className="text-red-400 text-sm">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <motion.button
                        onClick={() => {
                          addItem(item);
                          removeFromWishlist(item.id);
                        }}
                        disabled={!item.inStock || isLoading}
                        className="w-full py-3 bg-white text-black font-medium tracking-wider hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        whileHover={{
                          scale: item.inStock ? 1.02 : 1,
                          boxShadow: item.inStock
                            ? "0 5px 15px rgba(255,255,255,0.1)"
                            : "none",
                          borderRadius: item.inStock ? "50px" : "none",
                        }}
                        whileTap={{ scale: item.inStock ? 0.98 : 1 }}
                      >
                        {!item.inStock ? "OUT OF STOCK" : "ADD TO CART"}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Continue Shopping */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="px-8 py-3 border border-gray-600 rounded-full text-white font-medium tracking-wider hover:border-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/products">CONTINUE SHOPPING</Link>
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
