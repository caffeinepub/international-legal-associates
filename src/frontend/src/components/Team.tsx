import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "motion/react";

const leaders = [
  {
    name: "Ashutosh Singh",
    role: "Founder",
    bio: "Visionary founder with deep expertise in legal strategy and business development. His pioneering approach built International Legal Associates into a premier firm of integrity.",
    img: "/assets/uploads/1773862404110-1.png",
    initials: "AS",
  },
  {
    name: "Taranpreet Kaur",
    role: "Chief Executive Officer",
    bio: "Accomplished CEO driving operational excellence and client-focused service delivery. Her leadership shapes the firm's strategic direction and commitment to quality.",
    img: "/assets/generated/ceo-portrait.dim_300x300.jpg",
    initials: "TK",
  },
];

function TeamCard({
  member,
  index,
}: {
  member: (typeof leaders)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white border border-border hover:border-gold hover:shadow-gold rounded-sm overflow-hidden group transition-all duration-300"
      data-ocid={`team.item.${index + 1}`}
    >
      <div className="relative overflow-hidden" style={{ height: "280px" }}>
        <div
          className="absolute inset-0"
          style={{ background: "oklch(0.22 0.055 243)" }}
        />
        <Avatar className="absolute inset-0 w-full h-full rounded-none">
          <AvatarImage
            src={member.img}
            alt={member.name}
            className="object-cover w-full h-full"
          />
          <AvatarFallback
            className="w-full h-full rounded-none text-4xl font-black text-gold"
            style={{ background: "oklch(0.22 0.055 243)" }}
          >
            {member.initials}
          </AvatarFallback>
        </Avatar>
        <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="h-0.5 w-8 bg-gold mb-3" />
        <h3 className="font-black uppercase text-sm tracking-wider text-navy">
          {member.name}
        </h3>
        <p className="text-gold text-xs uppercase tracking-widest font-semibold mt-0.5 mb-3">
          {member.role}
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section id="team" className="py-24 bg-white">
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
              The People
            </span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-navy tracking-tight">
            Our Leadership
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {leaders.map((m, i) => (
            <TeamCard key={m.name} member={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
