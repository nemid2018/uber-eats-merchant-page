import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../lib/animations";
import { successStories, categories } from "../lib/successStories";
import { Link } from "react-router-dom";

const SuccessStories = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered =
    activeCategory === "All"
      ? successStories
      : successStories.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight font-display">
              Uber <span className="text-primary">Eats</span>
            </span>
            <span className="text-xs text-muted-foreground font-medium ml-2 hidden sm:inline">
              for Merchants
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/why-partner"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Why Partner With Us
            </Link>
            <Link
              to="/success-stories"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Success Stories
            </Link>
            <a
              href="https://merchants.ubereats.com/us/en/s/signup/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-colors active:scale-[0.98]"
            >
              Get started
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Success stories
            </h1>
            <p className="body-text text-lg md:text-xl max-w-2xl">
              Businesses leverage the Uber platform every day to expand their
              reach and strengthen their brand. See how merchants like you are
              growing.
            </p>
          </motion.div>
        </section>

        {/* Category Filter */}
        <section className="px-6 md:px-12 lg:px-20 pb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Stories Grid */}
        <section className="px-6 md:px-12 lg:px-20 pb-20">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((story, index) => (
              <motion.a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                key={story.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.2, 0, 0, 1],
                }}
                className="group bg-card rounded-[var(--radius)] border border-border overflow-hidden hover:shadow-[var(--card-shadow-hover)] transition-shadow duration-300 cursor-pointer"
              >
                {/* Color band */}
                <div className="h-48 bg-primary flex items-center justify-center p-8">
                  <div className="text-center">
                    {story.stat && (
                      <p className="text-4xl font-bold text-primary-foreground mb-1">
                        {story.stat}
                      </p>
                    )}
                    <p className="text-lg font-bold tracking-tight text-primary-foreground">
                      {story.name}
                    </p>
                    <p className="text-sm font-medium text-primary-foreground/90 mt-1">
                      {story.location}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground mb-3">
                    {story.category}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {story.headline}
                  </h3>
                  <p className="body-text text-sm line-clamp-3">
                    {story.description}
                  </p>

                  {story.quote && (
                    <blockquote className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm italic text-muted-foreground line-clamp-3">
                        "{story.quote}"
                      </p>
                      {story.quotePerson && (
                        <p className="text-xs font-medium mt-2">
                          — {story.quotePerson}
                          {story.quoteRole && (
                            <span className="text-muted-foreground">
                              , {story.quoteRole}
                            </span>
                          )}
                        </p>
                      )}
                    </blockquote>
                  )}
                </div>
              </motion.a>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">
              No stories found in this category.
            </p>
          )}
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 lg:px-20 py-20 bg-primary">
          <motion.div {...fadeInUp} className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-primary-foreground">
              Ready to write your success story?
            </h2>
            <p className="text-base font-bold text-primary-foreground/90 mb-8">
              Join thousands of merchants growing their business with Uber Eats.
            </p>
            <a
              href="https://merchants.ubereats.com/us/en/s/signup/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-colors active:scale-[0.98]"
            >
              Get started today
            </a>
          </motion.div>
        </section>
      </div>

      <footer className="px-6 md:px-12 lg:px-20 py-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Uber Technologies, Inc. For merchant
          partnership inquiries only.
        </p>
      </footer>
    </div>
  );
};

export default SuccessStories;
