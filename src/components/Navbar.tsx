import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Home } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const links = [
  { href: "#about", label: "关于" },
  { href: "#skills", label: "工具" },
  { href: "/friend", label: "联系", isRoute: true },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Detect scroll for navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") && isHome) {
      e.preventDefault();
      const element = document.getElementById(href.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
    setOpen(false);
  };

  // Page title for non-home pages
  const pageTitles: Record<string, string> = {
    "/daily": "日常点滴",
    "/study": "学无止境",
    "/photography": "光影瞬间",
    "/gaming": "游戏人生",
    "/friend": "交个朋友",
    "/photos": "照片墙",
  };
  const currentPageTitle = pageTitles[location.pathname];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-background/80 border-b border-border shadow-lg shadow-black/20"
            : "backdrop-blur-md bg-background/60 border-b border-border"
        }`}
      >
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 origin-left"
          style={{ scaleX }}
        />

        <div className="container mx-auto max-w-6xl flex items-center justify-between h-16 px-8">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="font-rounded text-sm font-bold tracking-widest text-orange-200 bg-orange-500/20 px-4 py-2 rounded-full hover:bg-orange-500/30 transition-colors"
          >
            Leo_homepage
          </Link>

          {/* Center: Page title for non-home pages (desktop) */}
          {!isHome && currentPageTitle && (
            <motion.span
              className="hidden md:block font-mono text-sm text-muted-foreground/70 tracking-widest uppercase"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentPageTitle}
            </motion.span>
          )}

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            {/* Return home button for non-home pages */}
            {!isHome && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 font-rounded text-sm font-bold tracking-widest text-white/60 bg-white/5 px-3 py-2 rounded-full hover:bg-white/10 hover:text-white transition-colors border border-white/10"
                >
                  <Home className="w-3.5 h-3.5" />
                  首页
                </Link>
              </motion.div>
            )}

            {isHome && links.map((l) => {
              const target = l.isRoute ? l.href : l.href;
              const isAnchor = target.startsWith("#");

              return isAnchor ? (
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
            className="md:hidden text-foreground p-1"
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
              <div className="flex flex-col gap-3 px-8 py-5">
                {!isHome && (
                  <Link
                    to="/"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-2 font-rounded text-sm font-bold tracking-widest text-white/70 bg-white/5 px-4 py-2 rounded-full hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <Home className="w-4 h-4" />
                    返回首页
                  </Link>
                )}
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
    </>
  );
};

export default Navbar;
