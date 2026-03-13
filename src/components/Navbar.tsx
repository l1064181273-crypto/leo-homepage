import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const links = [
  { href: "#about", label: "关于" },
  { href: "#skills", label: "工具" },
  { href: "/friend", label: "联系", isRoute: true },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's an anchor link and we are on the home page, scroll smoothly
    if (href.startsWith("#") && isHome) {
      e.preventDefault();
      const element = document.getElementById(href.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        // Update URL hash without jumping
        window.history.pushState(null, "", href);
      }
    }
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/60 border-b border-border">
      <div className="container mx-auto max-w-6xl flex items-center justify-between h-16 px-8">
        <Link to="/" className="font-rounded text-sm font-bold tracking-widest text-orange-200 bg-orange-500/20 px-4 py-2 rounded-full hover:bg-orange-500/30 transition-colors">
          Leo_homepage
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-8">
          {links.map((l) => {
            const target = l.isRoute ? l.href : (isHome ? l.href : `/${l.href}`);
            const isAnchor = target.startsWith("#");
            
            return isAnchor && isHome ? (
              <a
                key={l.href}
                href={target}
                onClick={(e) => handleScroll(e, target)}
                className="font-rounded text-sm font-bold tracking-widest text-orange-200 bg-orange-500/20 px-4 py-2 rounded-full hover:bg-orange-500/30 transition-colors cursor-pointer"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                to={target}
                className="font-rounded text-sm font-bold tracking-widest text-orange-200 bg-orange-500/20 px-4 py-2 rounded-full hover:bg-orange-500/30 transition-colors"
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-b border-border bg-background/90 backdrop-blur-md"
          >
            <div className="flex flex-col gap-4 px-8 py-6">
              {links.map((l) => {
                const target = l.isRoute ? l.href : (isHome ? l.href : `/${l.href}`);
                const isAnchor = target.startsWith("#");

                return isAnchor && isHome ? (
                  <a
                    key={l.href}
                    href={target}
                    onClick={(e) => handleScroll(e, target)}
                    className="font-rounded text-sm font-bold tracking-widest text-orange-200 bg-orange-500/20 px-4 py-2 rounded-full hover:bg-orange-500/30 transition-colors cursor-pointer"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.href}
                    to={target}
                    onClick={() => setOpen(false)}
                    className="font-rounded text-sm font-bold tracking-widest text-orange-200 bg-orange-500/20 px-4 py-2 rounded-full hover:bg-orange-500/30 transition-colors"
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
