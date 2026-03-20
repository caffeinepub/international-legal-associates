import type { EmotionType } from "../hooks/useTaruBrain";

interface TaruFaceProps {
  emotion: EmotionType;
  isSpeaking: boolean;
  isListening: boolean;
  size?: number;
}

const glowColors: Record<EmotionType, string> = {
  happy: "#55D6C6",
  sad: "#46CFE0",
  curious: "#F2D27A",
  thinking: "#B8A9E8",
  surprised: "#FF8C7A",
  excited: "#F2D27A",
  neutral: "#55D6C6",
};

export function TaruFace({
  emotion,
  isSpeaking,
  isListening,
  size = 280,
}: TaruFaceProps) {
  const glowColor = glowColors[emotion];
  const innerSize = size * 0.82;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      role="img"
      aria-label={`Taru is feeling ${emotion}`}
    >
      {/* Outer dashed decorative ring */}
      <div
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: "50%",
          border: `1px dashed ${glowColor}30`,
          transition: "border-color 1s ease",
          pointerEvents: "none",
        }}
      />
      {/* Inner ring */}
      <div
        style={{
          position: "absolute",
          width: innerSize,
          height: innerSize,
          borderRadius: "50%",
          border: `1px solid ${glowColor}20`,
          transition: "border-color 1s ease",
          pointerEvents: "none",
        }}
      />

      {/* Speaking pulse rings */}
      {isSpeaking && (
        <>
          <div
            className="speaking-pulse-ring-1"
            style={{
              position: "absolute",
              width: innerSize + 20,
              height: innerSize + 20,
              borderRadius: "50%",
              border: `2px solid ${glowColor}50`,
              pointerEvents: "none",
            }}
          />
          <div
            className="speaking-pulse-ring-2"
            style={{
              position: "absolute",
              width: innerSize + 40,
              height: innerSize + 40,
              borderRadius: "50%",
              border: `2px solid ${glowColor}30`,
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* Listening golden breathing ring */}
      {isListening && (
        <div
          className="listening-breathe-ring"
          style={{
            position: "absolute",
            width: innerSize + 16,
            height: innerSize + 16,
            borderRadius: "50%",
            border: "2px solid #F2D27A80",
            pointerEvents: "none",
          }}
        />
      )}

      {/* AI-generated avatar */}
      <img
        src="/assets/generated/taru-ai-avatar-transparent.dim_400x400.png"
        alt="Taru"
        style={{
          width: innerSize,
          height: innerSize,
          borderRadius: "50%",
          objectFit: "cover",
          objectPosition: "center top",
          border: `3px solid ${glowColor}`,
          boxShadow: `0 0 24px ${glowColor}60, 0 0 48px ${glowColor}20`,
          filter: isSpeaking ? "brightness(1.1)" : "brightness(1)",
          transition:
            "border-color 1s ease, box-shadow 1s ease, filter 0.2s ease",
          display: "block",
        }}
      />

      {/* Status indicator dot */}
      {(isSpeaking || isListening) && (
        <div
          style={{
            position: "absolute",
            top: size * 0.12,
            right: size * 0.12,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: isListening ? "#F2D27A" : glowColor,
            boxShadow: `0 0 8px ${isListening ? "#F2D27A" : glowColor}`,
            animation: "status-blink 1s ease-in-out infinite",
          }}
        />
      )}
    </div>
  );
}
