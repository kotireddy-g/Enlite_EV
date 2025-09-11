import { Button } from "@/components/ui/button";
import {
  Bike,
  Car,
  Bus,
  Check,
  Wrench,
  Battery,
  Gauge,
  Truck,
} from "lucide-react";

export default function ServicesSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Our <span className="gradient-text">Specialized Services</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive electric vehicle maintenance across all segments with
            cutting-edge diagnostic equipment and certified expertise.
          </p>
        </div>

        {/* Service Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Two Wheeler Service Card */}
          <div className="service-card bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 sm:p-8 border border-green-200">
            <div className="space-y-6">
              <img
                src="https://images.unsplash.com/photo-1504333638930-c8787321eee0?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Technician working on electric scooter in professional workshop with diagnostic tools"
                className="w-full h-40 sm:h-48 object-cover rounded-lg"
                data-testid="img-service-2wheeler"
              />

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Bike className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">2-Wheeler EV Service</h3>
                </div>

                <p className="text-muted-foreground">
                  Smart care for scooters and motorcycles with advanced
                  diagnostics.
                </p>

                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Battery Health & Range Diagnostics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Motor & Controller Tuning</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Charging Port & Onboard Charger Repair</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Brake, Suspension & Tyre Service</span>
                  </li>
                </ul>

                <p className="text-sm text-green-600 font-medium">
                  Keep your scooter efficient, safe, and road-ready.
                </p>

                <Button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-green-500 text-white hover:bg-green-600"
                  data-testid="button-book-2wheeler"
                >
                  Book 2-Wheeler Service
                </Button>
              </div>
            </div>
          </div>

          {/* Three Wheeler Service Card */}
          <div className="service-card bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 sm:p-8 border border-blue-200">
            <div className="space-y-6">
              <img
                src="https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Auto mechanic performing diagnostic service on vehicle in professional garage workshop"
                className="w-full h-40 sm:h-48 object-cover rounded-lg"
                data-testid="img-service-3wheeler"
              />

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">3-Wheeler EV Service</h3>
                </div>

                <p className="text-muted-foreground">
                  Reliable maintenance for auto-rickshaws & cargo EVs built for
                  durability.
                </p>

                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-blue-500" />
                    <span>Battery Reconditioning</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-blue-500" />
                    <span>Controller & Motor Overhaul</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-blue-500" />
                    <span>Charging & Wiring Harness Repair</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-blue-500" />
                    <span>Chassis & Structural Reinforcement</span>
                  </li>
                </ul>

                <p className="text-sm text-blue-600 font-medium">
                  Maximize uptime and extend your 3W's lifespan.
                </p>

                <Button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-blue-500 text-white hover:bg-blue-600"
                  data-testid="button-book-3wheeler"
                >
                  Book 3-Wheeler Service
                </Button>
              </div>
            </div>
          </div>

          {/* Bus Service Card */}
          <div className="service-card bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 sm:p-8 border border-purple-200">
            <div className="space-y-6">
              <img
                src="https://images.unsplash.com/photo-1632823471565-1ecdf0ba7e2c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Professional technician servicing large vehicle in maintenance depot with specialized equipment"
                className="w-full h-40 sm:h-48 object-cover rounded-lg"
                data-testid="img-service-bus"
              />

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <Bus className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">Electric Bus Service</h3>
                </div>

                <p className="text-muted-foreground">
                  Fleet-grade solutions to keep buses running efficiently.
                </p>

                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-purple-500" />
                    <span>Fleet Battery Management Service</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-purple-500" />
                    <span>High-Voltage System & Inverter Repair</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-purple-500" />
                    <span>HVAC & Climate Control Maintenance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-purple-500" />
                    <span>Route Efficiency & Downtime Optimization</span>
                  </li>
                </ul>

                <p className="text-sm text-purple-600 font-medium">
                  Smarter service for reliable, cost-efficient bus operations.
                </p>

                <Button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-purple-500 text-white hover:bg-purple-600"
                  data-testid="button-book-bus"
                >
                  Book Bus Service
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mx-auto flex items-center justify-center">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold">Emergency Repair</h4>
            <p className="text-sm text-muted-foreground">
              24/7 roadside assistance
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mx-auto flex items-center justify-center">
              <Battery className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold">All Electric Part Repair</h4>
            <p className="text-sm text-muted-foreground">To Extend the Life</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mx-auto flex items-center justify-center">
              <Gauge className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold">Performance Tuning</h4>
            <p className="text-sm text-muted-foreground">
              Boost range & efficiency
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mx-auto flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold">Pickup & Delivery</h4>
            <p className="text-sm text-muted-foreground">
              Hassle-free doorstep service
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
