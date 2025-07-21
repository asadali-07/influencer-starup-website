import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import testimonials from "../data/testimonial";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const ownerRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    // Cleanup function to prevent memory leaks
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    // Hero animation - no ScrollTrigger needed for initial section
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }

    // Story section animation - fixed ScrollTrigger
    if (storyRef.current) {
      gsap.fromTo(
        storyRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none none", // Changed to prevent reverse
            once: true, // Animation plays only once
          },
        }
      );
    }

    // Owner section animation - fixed ScrollTrigger
    if (ownerRef.current) {
      gsap.fromTo(
        ownerRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ownerRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none none", // Changed to prevent reverse
            once: true, // Animation plays only once
          },
        }
      );
    }

    // Testimonials animation - fixed ScrollTrigger
    if (testimonialsRef.current) {
      gsap.fromTo(
        testimonialsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none none", // Changed to prevent reverse
            once: true, // Animation plays only once
          },
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
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

      <div className="relative z-10">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="min-h-screen flex items-center justify-center px-6"
        >
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <motion.img
                src="/logo.png"
                alt="LUXE"
                className="w-16 h-16 object-contain filter drop-shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <h1 className="text-6xl md:text-7xl font-thin tracking-[0.3em]">
                LUXE
              </h1>
            </div>

            <motion.div
              className="w-32 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1 }}
            />

            <motion.p
              className="text-gray-400 text-sm tracking-widest mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              COLLECTION
            </motion.p>

            <motion.h2
              className="text-3xl md:text-4xl font-light mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              Crafting Memories Through <br />
              <span className="italic text-gray-300">Exquisite Fragrances</span>
            </motion.h2>

            <motion.p
              className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              Every bottle tells a story of passion, artistry, and the
              relentless pursuit of olfactory perfection.
            </motion.p>
          </div>
        </section>

        {/* Brand Story Section */}
        <section ref={storyRef} className="py-10 px-6" style={{ opacity: 1 }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-4xl font-light tracking-wide mb-8">
                  The Story Behind <br />
                  <span className="italic text-gray-300">LUXE Collection</span>
                </h3>

                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p>
                    Born from a passion for luxury and an obsession with
                    perfection, LUXE Collection began as a dream to create
                    fragrances that transcend the ordinary. Each scent is
                    meticulously crafted using the finest ingredients sourced
                    from around the world.
                  </p>

                  <p>
                    Our journey started in 2020 with a simple belief: that
                    fragrance is not just about scent, but about creating an
                    emotional connection that lasts a lifetime. Every bottle
                    represents hundreds of hours of research, testing, and
                    refinement.
                  </p>

                  <p>
                    Today, LUXE Collection stands as a testament to
                    uncompromising quality and artistic vision, with each
                    fragrance telling its own unique story of elegance and
                    sophistication.
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <h4 className="text-3xl font-light mb-2">4+</h4>
                    <p className="text-gray-400 text-sm tracking-wide">
                      YEARS OF CRAFTSMANSHIP
                    </p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-3xl font-light mb-2">50K+</h4>
                    <p className="text-gray-400 text-sm tracking-wide">
                      SATISFIED CUSTOMERS
                    </p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-3xl font-light mb-2">12</h4>
                    <p className="text-gray-400 text-sm tracking-wide">
                      SIGNATURE FRAGRANCES
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10">
                  <img
                    src="/All.png"
                    alt="LUXE Collection Craftsmanship"
                    className="w-full h-80 object-cover rounded-2xl"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/600x400/1a1a1a/ffffff?text=LUXE+Craftsmanship";
                    }}
                  />
                  <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm italic">
                      "Every fragrance is a masterpiece, crafted with precision
                      and passion"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Owner/Founder Section */}
        <section
          ref={ownerRef}
          className="py-20 px-6 bg-gradient-to-r from-gray-900/30 to-transparent"
          style={{ opacity: 1 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-light tracking-wide mb-16">
              Meet The <span className="italic text-gray-300">Visionary</span>
            </h3>

            <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-12 border border-white/10">
              <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white/20">
                <img
                  src="/faisu.jpg"
                  alt="Founder & CEO"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x400/1a1a1a/ffffff?text=AS";
                  }}
                />
              </div>

              <h4 className="text-2xl font-light mb-2">Faisal Skeikh</h4>

              <p className="text-gray-400 mb-8 tracking-wide">
                Founder & Master Perfumer
              </p>

              <blockquote className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto italic">
                "I've always believed that fragrance has the power to transport
                us, to evoke memories, and to make us feel truly alive. LUXE
                Collection is my life's work—a dedication to creating scents
                that don't just smell beautiful, but tell stories and create
                lasting impressions. Every bottle represents my commitment to
                excellence and my passion for the art of perfumery."
              </blockquote>

              <div className="mt-8 text-center">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-4"></div>
                <p className="text-gray-400 text-sm">
                  5+ Years in Luxury Fragrance Industry
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          ref={testimonialsRef}
          className="py-20 px-6"
          style={{ opacity: 1 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-light tracking-wide mb-4">
                What Our{" "}
                <span className="italic text-gray-300">Clients Say</span>
              </h3>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/100x100/1a1a1a/ffffff?text=" +
                            testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("");
                        }}
                      />
                    </div>
                    <div>
                      <h5 className="font-medium">{testimonial.name}</h5>
                      <p className="text-gray-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="text-gray-300 leading-relaxed italic">
                    "{testimonial.content}"
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-light mb-6">
              Experience{" "}
              <span className="italic text-gray-300">LUXE Collection</span>
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Join thousands of satisfied customers who have made LUXE their
              signature scent.
            </p>
            <motion.div
              className="px-8 py-4 bg-white text-black font-medium tracking-wider hover:bg-gray-100 transition-colors "
              whileHover={{ scale: 1.05, borderRadius: "50px" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/products">EXPLORE COLLECTION</Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
