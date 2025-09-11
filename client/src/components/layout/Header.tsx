import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X, Phone } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect border-b border-border/50" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3"
            data-testid="link-home"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">
                ENLITE EV CARE
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Where EVs get Expert Care
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground hover:text-primary transition-colors font-medium"
              data-testid="button-nav-home"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-foreground hover:text-primary transition-colors font-medium"
              data-testid="button-nav-services"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors font-medium"
              data-testid="button-nav-about"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors font-medium"
              data-testid="button-nav-contact"
            >
              Contact
            </button>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>+91 9666994443</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => scrollToSection("contact")}
            className="hidden md:inline-flex bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl"
            data-testid="button-book-service"
          >
            Book Service
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-border/50 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2"
                data-testid="button-mobile-nav-home"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2"
                data-testid="button-mobile-nav-services"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2"
                data-testid="button-mobile-nav-about"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2"
                data-testid="button-mobile-nav-contact"
              >
                Contact
              </button>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground py-2">
                <Phone className="w-4 h-4" />
                <span>+91 9666994443</span>
              </div>
              <Button
                onClick={() => scrollToSection("contact")}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600"
                data-testid="button-mobile-book-service"
              >
                Book Service
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
