import { Button } from "@/components/ui/button";
import { Clock, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="pt-16 min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text">Expert Care</span> for Your{" "}
                <span className="text-foreground">Electric Future</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Professional maintenance, diagnostics, and repair services for electric 2-wheelers, 3-wheelers, and buses in Hyderabad. Certified technicians, advanced tools, genuine parts.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 text-lg hover:from-green-600 hover:to-blue-600 shadow-xl hover:shadow-2xl"
                data-testid="button-book-now"
              >
                Book Service Now
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="border-2 border-primary text-primary px-8 py-4 text-lg hover:bg-primary hover:text-white"
                data-testid="button-get-quote"
              >
                Get Free Quote
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text" data-testid="text-stats-customers">500+</div>
                <div className="text-sm text-muted-foreground">Satisfied Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text" data-testid="text-stats-experience">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text" data-testid="text-stats-certified">100%</div>
                <div className="text-sm text-muted-foreground">Certified Technicians</div>
              </div>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Professional electric vehicle service center"
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              data-testid="img-hero-main"
            />
            
            {/* Floating Service Cards */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-500" />
                <div className="text-sm">
                  <div className="font-semibold">Quick Service</div>
                  <div className="text-muted-foreground">Same Day Pickup</div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
                <div className="text-sm">
                  <div className="font-semibold">Warranty Protected</div>
                  <div className="text-muted-foreground">6 Month Guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
