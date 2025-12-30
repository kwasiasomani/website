import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Certifications", href: "#certifications" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  const sectionIds = useMemo(
    () => navItems.map((i) => i.href.replace("#", "")),
    []
  );

  // ✅ Fix: screenY -> scrollY
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Scroll-spy (highlights current section)
  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          );

        if (visible[0]?.target?.id) {
          setActiveHash(`#${visible[0].target.id}`);
        }
      },
      {
        root: null,
        threshold: [0.15, 0.25, 0.35, 0.5],
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  // ✅ Smooth scroll click (desktop + mobile)
  const handleNavClick = (href) => (e) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const el = document.querySelector(href);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveHash(href);
    window.history.replaceState(null, "", href);
  };

  const linkBase =
    "px-4 py-2 rounded-full text-sm md:text-[15px] transition-all duration-300 select-none";
  const linkIdle = "text-foreground/70 hover:text-foreground hover:bg-white/5";
  const linkActive =
    "text-primary bg-primary/10 shadow-[0_0_22px_rgba(59,130,246,0.35)] ring-1 ring-primary/20";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-40 transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/70 backdrop-blur-md border-b border-white/5"
          : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Brand */}
        <a
          className="text-xl font-bold text-primary flex items-center"
          href="#home"
          onClick={handleNavClick("#home")}
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground">Kwasi</span> Portfolio
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2 rounded-full px-2 py-2 bg-white/5 backdrop-blur-md border border-white/10">
          {navItems.map((item) => {
            const isActive = activeHash === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick(item.href)}
                className={cn(linkBase, isActive ? linkActive : linkIdle)}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile menu */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col gap-4 text-xl">
            {navItems.map((item) => {
              const isActive = activeHash === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick(item.href)}
                  className={cn(
                    "px-6 py-3 rounded-full transition-all duration-300",
                    isActive
                      ? "text-primary bg-primary/10 ring-1 ring-primary/20"
                      : "text-foreground/80 hover:text-primary hover:bg-white/5"
                  )}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
