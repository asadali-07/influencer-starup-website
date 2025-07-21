import React, { useRef, useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Search, SearchIcon, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../src/store/cartStore";
import { useWishlistStore } from "../src/store/wishlistStore";
import perfumeProducts from "../data/perfumeData";
import { toast } from "react-toastify";

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const { addItem } = useCartStore();
  const { addToWishlist } = useWishlistStore();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(perfumeProducts.map(product => product.category))];
    return cats;
  }, []);

  // Filter products based on search term and category
  const filteredProducts = useMemo(() => {
    return perfumeProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

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

  const clearSearch = () => {
    setSearchTerm("");
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

          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            Discover our complete collection of premium fragrances, each
            carefully crafted to capture unique emotions and create
            unforgettable experiences.
          </p>

          {/* Search and Filter Section */}
          <motion.div
            className="max-w-4xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 z-50 " />
              </div>
              <input
                type="text"
                placeholder="Search fragrances..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-full py-4 pl-14 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-300 font-light tracking-wide"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-light text-sm tracking-wider uppercase transition-all duration-300 border ${
                    selectedCategory === category
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-gray-300 border-gray-700 hover:border-white/50 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Results Count */}
            <motion.p
              className="text-gray-400 text-sm font-light tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProducts.length} {filteredProducts.length === 1 ? 'fragrance' : 'fragrances'} found
            </motion.p>
          </motion.div>
        </div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={`${searchTerm}-${selectedCategory}`} // Re-trigger animation on filter change
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
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
                  layout
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
                        className="flex-1 bg-white text-black py-3 font-medium text-sm tracking-wide hover:bg-gray-100 transition-all duration-300"
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
            ))
          ) : (
            /* No Results Message */
            <motion.div
              className="col-span-full text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-12 max-w-md mx-auto">
                <Search className="w-16 h-16 text-gray-600 mx-auto mb-6" />
                <h3 className="text-white text-xl font-light mb-4">No fragrances found</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-6">
                  Try adjusting your search terms or category filter to find the perfect fragrance.
                </p>
                <motion.button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="bg-white text-black px-6 py-3 rounded-full font-medium text-sm tracking-wide hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear Filters
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Products;