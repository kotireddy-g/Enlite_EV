import { Zap, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">ENLITE EV CARE</h3>
                <p className="text-xs text-gray-400">Pure Electric Solutions</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner for professional electric vehicle services across 2, 3, and bus segments in Hyderabad.
            </p>
            <div className="flex space-x-4">
              <button 
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                data-testid="button-social-facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button 
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                data-testid="button-social-twitter"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button 
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                data-testid="button-social-instagram"
              >
                <Instagram className="w-4 h-4" />
              </button>
              <button 
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                data-testid="button-social-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection("home")}
                className="block text-gray-400 hover:text-white transition-colors text-left"
                data-testid="button-footer-nav-home"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block text-gray-400 hover:text-white transition-colors text-left"
                data-testid="button-footer-nav-services"
              >
                Our Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block text-gray-400 hover:text-white transition-colors text-left"
                data-testid="button-footer-nav-about"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block text-gray-400 hover:text-white transition-colors text-left"
                data-testid="button-footer-nav-contact"
              >
                Contact
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block text-gray-400 hover:text-white transition-colors text-left"
                data-testid="button-footer-book-service"
              >
                Book Service
              </button>
            </div>
          </div>

          {/* Services Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <div className="space-y-2">
              <span className="block text-gray-400">2-Wheeler EV Service</span>
              <span className="block text-gray-400">3-Wheeler EV Service</span>
              <span className="block text-gray-400">Electric Bus Maintenance</span>
              <span className="block text-gray-400">Battery Management</span>
              <span className="block text-gray-400">Performance Diagnostics</span>
              <span className="block text-gray-400">Emergency Repairs</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-500" />
                <div>
                  <div className="text-sm text-gray-400">+91 9666994443</div>
                  <div className="text-sm text-gray-400">99080 99964</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-400">info@enliteev.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-purple-500 mt-1" />
                <div className="text-sm text-gray-400">
                  LIG 549, Road No-3<br />
                  KPHB Colony<br />
                  Hyderabad-500072, Telangana
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 ENLITE EV CARE. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button className="text-gray-400 hover:text-white text-sm transition-colors" data-testid="button-privacy">
              Privacy Policy
            </button>
            <button className="text-gray-400 hover:text-white text-sm transition-colors" data-testid="button-terms">
              Terms of Service
            </button>
            <button className="text-gray-400 hover:text-white text-sm transition-colors" data-testid="button-cookies">
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
