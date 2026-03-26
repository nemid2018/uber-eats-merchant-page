import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 h-16">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold tracking-tight font-display" onClick={() => setOpen(false)}>
            Uber{" "}<span className="text-primary">Eats</span>
          </Link>
          <span className="text-xs text-muted-foreground font-medium ml-2 hidden sm:inline">
            for Merchants
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/why-partner" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Why Partner With Us
          </Link>
          <Link to="/success-stories" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Success Stories
          </Link>
          <a
            href="https://merchants.ubereats.com/us/en/s/signup/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-colors active:scale-[0.98]"
          >
            Get started
          </a>
        </div>

        {/* Mobile: Get started + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href="https://merchants.ubereats.com/us/en/s/signup/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
          >
            Get started
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4">
          <Link
            to="/why-partner"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            Why Partner With Us
          </Link>
          <Link
            to="/success-stories"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            Success Stories
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
