import { motion } from "motion/react";

type AvatarState = "idle" | "speaking" | "listening";

interface Props {
  state: AvatarState;
  size?: "sm" | "md" | "lg";
}

export default function TaruAvatar({ state, size = "md" }: Props) {
  const sizeCls = {
    sm: "w-16 h-16",
    md: "w-32 h-32",
    lg: "w-52 h-52",
  }[size];

  const ringColor =
    state === "speaking"
      ? "ring-pink-400"
      : state === "listening"
        ? "ring-blue-400"
        : "ring-purple-600/40";

  const animClass =
    state === "speaking"
      ? "animate-pulse-glow"
      : state === "listening"
        ? "animate-pulse-blue"
        : "";

  return (
    <motion.div
      className={`relative ${sizeCls} flex-shrink-0`}
      animate={
        state === "speaking"
          ? {
              scale: [1, 1.03, 1],
              transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY },
            }
          : { scale: 1 }
      }
    >
      {/* Outer glow ring */}
      <div
        className={`absolute inset-0 rounded-full ${animClass}`}
        style={{
          background:
            state === "speaking"
              ? "radial-gradient(circle, oklch(0.72 0.28 330 / 0.25) 0%, transparent 70%)"
              : state === "listening"
                ? "radial-gradient(circle, oklch(0.72 0.18 240 / 0.25) 0%, transparent 70%)"
                : "transparent",
        }}
      />
      <img
        src="/assets/generated/taru-ai-avatar-transparent.dim_400x400.png"
        alt="Taru"
        className={`w-full h-full rounded-full object-cover ring-4 ${ringColor} shadow-2xl`}
      />
      {/* Mic/speaker indicator */}
      {state !== "idle" && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs"
          style={
            state === "speaking"
              ? { background: "oklch(0.72 0.28 330)" }
              : { background: "oklch(0.72 0.18 240)" }
          }
        >
          {state === "speaking" ? "🔊" : "🎙"}
        </motion.div>
      )}
    </motion.div>
  );
}
