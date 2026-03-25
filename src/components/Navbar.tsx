import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 h-16">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold tracking-tight font-display">
            Uber{" "}
            <span className="text-primary">Eats</span>
          </Link>
          <span className="text-xs text-muted-foreground font-medium ml-2 hidden sm:inline">
            for Merchants
          </span>
        </div>
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
            className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-colors active:scale-[0.98]"
          >
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
