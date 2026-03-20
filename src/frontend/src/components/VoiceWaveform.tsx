import { motion } from "motion/react";

interface Props {
  isActive: boolean;
  color?: string;
}

const BAR_IDS = ["b0", "b1", "b2", "b3", "b4", "b5", "b6"];

export default function VoiceWaveform({ isActive, color = "#e879f9" }: Props) {
  return (
    <div className="flex items-center justify-center gap-1 h-12">
      {BAR_IDS.map((id, i) => (
        <motion.div
          key={id}
          style={{ backgroundColor: color }}
          className="w-1.5 rounded-full"
          animate={
            isActive
              ? {
                  scaleY: [0.3, 1, 0.4, 0.9, 0.3],
                  height: ["8px", "32px", "12px", "28px", "8px"],
                }
              : { scaleY: 0.3, height: "8px" }
          }
          transition={
            isActive
              ? {
                  duration: 0.8,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}
