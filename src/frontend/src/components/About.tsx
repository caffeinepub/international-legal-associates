import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const highlights = [
  "Dedicated to precision and ethical practice",
  "Trusted by individuals, corporations, and institutions",
  "Full-spectrum paralegal support across practice areas",
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{ background: "oklch(0.22 0.055 243)" }}
    >
      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(200,162,90,0.8) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="h-px w-8 bg-gold" />
              <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
                Who We Are
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight mb-6">
              About International Legal Associates
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              International Legal Associates is a premier paralegal services
              firm founded with an unwavering commitment to providing
              comprehensive legal support. Established by Ashutosh Singh, we set
              the standard for accuracy, professionalism, and client-focused
              solutions.
            </p>
            <p className="text-white/70 leading-relaxed mb-8">
              Under the leadership of CEO Taranpreet Kaur, our firm brings
              together specialists across litigation, criminal law, corporate
              matters, and immigration — serving clients with integrity and
              excellence at every stage of their legal journey.
            </p>

            <ul className="space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div
              className="rounded-sm overflow-hidden aspect-[4/3] relative"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.27 0.065 243) 0%, oklch(0.32 0.06 243) 100%)",
                border: "1px solid rgba(200,162,90,0.3)",
              }}
            >
              {/* Decorative legal office illustration */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="w-16 h-16 border-2 border-gold/50 rounded-full flex items-center justify-center mb-4">
                  <span className="text-gold font-black text-xl">ILA</span>
                </div>
                <p className="text-white/50 text-center text-sm uppercase tracking-widest">
                  Dedicated to Justice
                </p>
                <p className="text-white/30 text-center text-xs mt-2">
                  Integrity · Excellence · Precision
                </p>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/50" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/50" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/50" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
