import { Button } from "@/components/ui/button";
import { Award, Cpu, Shield, Leaf } from "lucide-react";

export default function AboutSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">
                Why Choose{" "}
                <span className="gradient-text">ENLITE EV CARE?</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                At Enlite EV Care, we are dedicated to providing the best
                solutions for your electric vehicle’s maintenance, ensuring a
                sustainable and efficient driving experience. Here’s why you
                should trust us with your EV needs:
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Certified Excellence
                  </h3>
                  <p className="text-muted-foreground">
                    Our technicians are certified experts in electric vehicle
                    systems. With continuous training on the latest EV
                    technologies, we ensure your vehicle receives the most
                    accurate and reliable service.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Cpu className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Advanced Diagnostics
                  </h3>
                  <p className="text-muted-foreground">
                    We use state-of-the-art diagnostic tools to precisely
                    identify faults and optimize your EV's performance. Our
                    advanced equipment ensures that every repair is done with
                    the highest level of accuracy.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Reliable and Affordable
                  </h3>
                  <p className="text-muted-foreground">
                    We provide consistent, cost-effective solutions for all EV
                    segments, ensuring you get the best value for your
                    investment. Our services are designed to keep your EV in top
                    condition without breaking the bank.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Eco-Friendly Approach
                  </h3>
                  <p className="text-muted-foreground">
                    We are committed to sustainable practices, including proper
                    battery recycling and minimizing our environmental impact.
                    Our eco-friendly solutions reflect our dedication to both
                    the planet and the future of electric mobility.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600"
                data-testid="button-learn-more"
              >
                Learn More About Us
              </Button>
              <Button
                variant="outline"
                className="border border-primary text-primary hover:bg-primary hover:text-white"
                data-testid="button-view-certifications"
              >
                View Certifications
              </Button>
            </div>
          </div>

          {/* About Visual */}
          <div className="space-y-6">
            <img
              src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
              alt="Professional mechanics working on diagnostics"
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
              data-testid="img-about-main"
            />

            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                alt="Advanced diagnostic equipment"
                className="w-full h-40 object-cover rounded-lg shadow-md"
                data-testid="img-about-equipment"
              />

              <img
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                alt="Certified technician with precision tools"
                className="w-full h-40 object-cover rounded-lg shadow-md"
                data-testid="img-about-technician"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
