import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "../lib/animations";
import { successStories } from "../lib/successStories";
import { Link } from "react-router-dom";

const testimonials = successStories.filter((s) => s.quote);

const Testimonial = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const story = testimonials[current];

  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 bg-secondary">
      <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
        <svg
          className="w-10 h-10 mx-auto mb-6 text-primary opacity-40"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
        </svg>

        <div className="relative min-h-[200px] md:min-h-[180px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
            >
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight leading-snug mb-8">
                "{story.quote}"
              </blockquote>
              <div>
                <p className="font-semibold text-base">{story.quotePerson}</p>
                <p className="body-text text-sm">{story.quoteRole}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-primary w-6"
                  : "bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Link to full page */}
        <Link
          to="/success-stories"
          className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-primary hover:underline underline-offset-4 transition-colors"
        >
          View all success stories
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
};

export default Testimonial;
