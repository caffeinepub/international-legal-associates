import { Button } from "@/components/ui/button";
import { getTaruResponse } from "@/utils/taruBrain";
import {
  createRecognition,
  isRecognitionSupported,
  speak,
  stopSpeaking,
} from "@/utils/voiceEngine";
import { Mic, MicOff, PhoneOff } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import TaruAvatar from "./TaruAvatar";
import VoiceWaveform from "./VoiceWaveform";

interface Props {
  onEndCall: (lastTaruText: string) => void;
}

type CallState = "listening" | "speaking" | "idle";

export default function CallMode({ onEndCall }: Props) {
  const [callState, setCallState] = useState<CallState>("idle");
  const [muted, setMuted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [statusText, setStatusText] = useState("Connecting...");
  const [lastText, setLastText] = useState("");
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mutedRef = useRef(false);
  const startListeningRef = useRef<() => void>(() => {});

  startListeningRef.current = function startListening() {
    if (!isRecognitionSupported() || mutedRef.current) {
      setCallState("idle");
      setStatusText("Tap mic to speak");
      return;
    }
    const rec = createRecognition(
      (txt) => {
        recognitionRef.current = null;
        const response = getTaruResponse(txt);
        setLastText(response);
        setCallState("speaking");
        setStatusText("Taru is speaking...");
        speak(response, undefined, () => {
          setCallState("listening");
          setStatusText("Taru is listening...");
          startListeningRef.current();
        });
      },
      () => {
        setCallState("idle");
        setStatusText("Tap mic to speak");
      },
    );
    if (!rec) {
      setStatusText("Speech not supported on this browser");
      return;
    }
    recognitionRef.current = rec;
    rec.start();
    setCallState("listening");
    setStatusText("Taru is listening...");
  };

  useEffect(() => {
    const greeting =
      "Hey! I'm so happy you called! Talk to me, I'm listening! 💕";
    setLastText(greeting);
    setCallState("speaking");
    setStatusText("Taru is speaking...");
    speak(greeting, undefined, () => {
      setCallState("listening");
      setStatusText("Taru is listening...");
      startListeningRef.current();
    });
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      stopSpeaking();
      recognitionRef.current?.stop();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function toggleMute() {
    if (!muted) {
      recognitionRef.current?.stop();
      mutedRef.current = true;
      setMuted(true);
      setCallState("idle");
      setStatusText("Muted");
    } else {
      mutedRef.current = false;
      setMuted(false);
      setStatusText("Taru is listening...");
      startListeningRef.current();
    }
  }

  function handleEnd() {
    stopSpeaking();
    recognitionRef.current?.stop();
    if (timerRef.current) clearInterval(timerRef.current);
    onEndCall(lastText);
  }

  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  return (
    <motion.div
      data-ocid="call.modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between py-16 px-6"
      style={{
        background:
          "radial-gradient(ellipse at top, oklch(0.18 0.1 300) 0%, oklch(0.07 0.05 280) 50%, oklch(0.05 0.03 260) 100%)",
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            LIVE
          </span>
          <span className="text-purple-200 text-sm font-mono">
            {minutes}:{secs}
          </span>
        </div>
        <p className="text-white/60 text-sm">Call with Taru</p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={
            callState === "speaking" ? { scale: [1, 1.05, 1] } : { scale: 1 }
          }
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <TaruAvatar
            state={callState === "idle" ? "idle" : callState}
            size="lg"
          />
        </motion.div>

        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-gradient">
            Taru
          </h2>
          <motion.p
            key={statusText}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-purple-300 text-sm mt-1"
          >
            {statusText}
          </motion.p>
        </div>

        <VoiceWaveform
          isActive={callState === "speaking" || callState === "listening"}
        />

        {lastText && (
          <motion.div
            key={lastText}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xs text-center glass rounded-2xl px-4 py-3"
          >
            <p className="text-white/80 text-sm leading-relaxed">{lastText}</p>
          </motion.div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <Button
          data-ocid="call.toggle"
          variant="ghost"
          onClick={toggleMute}
          className={`w-14 h-14 rounded-full p-0 ${
            muted
              ? "bg-red-500/20 text-red-400 border border-red-500/40"
              : "bg-white/10 text-white border border-white/20"
          }`}
        >
          {muted ? <MicOff size={22} /> : <Mic size={22} />}
        </Button>

        <Button
          data-ocid="call.close_button"
          onClick={handleEnd}
          className="w-16 h-16 rounded-full p-0 bg-red-500 hover:bg-red-600 text-white shadow-2xl"
        >
          <PhoneOff size={24} />
        </Button>
      </div>
    </motion.div>
  );
}
