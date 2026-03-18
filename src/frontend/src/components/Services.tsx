import {
  BookOpen,
  Briefcase,
  FileText,
  Globe,
  Lightbulb,
  Scale,
} from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: Briefcase,
    title: "Corporate Law Support",
    desc: "Comprehensive legal support for businesses navigating complex corporate matters.",
  },
  {
    icon: Lightbulb,
    title: "Intellectual Property",
    desc: "Protecting your innovations, trademarks, copyrights, and creative assets.",
  },
  {
    icon: Globe,
    title: "Immigration Services",
    desc: "Expert guidance through visa applications, residency, and citizenship processes.",
  },
  {
    icon: Scale,
    title: "Litigation Support",
    desc: "Strategic courtroom preparation, case management, and procedural assistance.",
  },
  {
    icon: BookOpen,
    title: "Legal Research",
    desc: "Thorough legal research and analysis to strengthen your legal position.",
  },
  {
    icon: FileText,
    title: "Document Review",
    desc: "Meticulous review, drafting, and organization of legal documentation.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
              What We Offer
            </span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-navy tracking-tight">
            Our Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group p-6 border border-border hover:border-gold hover:shadow-gold rounded-sm transition-all duration-300 cursor-default"
              data-ocid={`services.item.${i + 1}`}
            >
              <div className="w-12 h-12 bg-navy/5 group-hover:bg-gold/10 rounded-sm flex items-center justify-center mb-4 transition-colors">
                <svc.icon className="w-6 h-6 text-navy group-hover:text-gold transition-colors" />
              </div>
              <h3 className="font-bold uppercase text-sm tracking-wider text-navy mb-2">
                {svc.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {svc.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
