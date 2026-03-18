import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0B1F3A 0%, #0E2A4A 40%, #162d52 60%, #0B1F3A 100%)",
      }}
    >
      {/* Decorative grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,162,90,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,162,90,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative circles */}
      <div
        aria-hidden="true"
        className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-5"
        style={{ background: "oklch(0.72 0.1 76)" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-5"
        style={{ background: "oklch(0.72 0.1 76)" }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Tagline pill */}
          <div className="inline-flex items-center gap-2 mb-8">
            <div aria-hidden="true" className="h-px w-8 bg-gold" />
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
              Premier Paralegal Services
            </span>
            <div aria-hidden="true" className="h-px w-8 bg-gold" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase text-white leading-tight tracking-tight mb-6">
            Excellence In
            <br />
            <span className="text-gold">Legal Support</span>
          </h1>

          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            International Legal Associates provides expert paralegal services
            with precision, integrity, and dedication — standing beside you at
            every step of your legal journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact">
              <Button
                data-ocid="hero.primary_button"
                className="bg-gold hover:bg-gold-light text-navy font-bold uppercase tracking-widest text-sm px-8 py-4 h-auto rounded-none transition-all duration-200 hover:scale-105"
              >
                Schedule a Consultation
              </Button>
            </a>
            <a href="#services">
              <Button
                data-ocid="hero.secondary_button"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 font-semibold uppercase tracking-widest text-sm px-8 py-4 h-auto rounded-none transition-all duration-200"
              >
                Our Services
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: "20+", label: "Years Experience" },
            { value: "500+", label: "Cases Handled" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "4", label: "Expert Team Members" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-gold text-2xl sm:text-3xl font-black">
                {stat.value}
              </p>
              <p className="text-white/60 text-xs uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom wave separator */}
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <title>Decorative wave</title>
          <path
            d="M0 60L1440 60L1440 20C1200 60 720 0 0 40L0 60Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
