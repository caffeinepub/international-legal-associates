import { Button } from "@/components/ui/button";
import { getTaruResponse } from "@/utils/taruBrain";
import {
  createRecognition,
  isRecognitionSupported,
  speak,
} from "@/utils/voiceEngine";
import { Mic, MicOff, Phone, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import TaruAvatar from "./TaruAvatar";

interface Message {
  id: number;
  role: "user" | "taru";
  text: string;
}

interface Props {
  initialMessages: Message[];
  onMessagesChange: (msgs: Message[]) => void;
  onStartCall: () => void;
  taruState: "idle" | "speaking" | "listening";
  onTaruStateChange: (s: "idle" | "speaking" | "listening") => void;
}

let msgId = 100;

export default function ChatMode({
  initialMessages,
  onMessagesChange,
  onStartCall,
  taruState,
  onTaruStateChange,
}: Props) {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: msgId++, role: "user", text };
    const response = getTaruResponse(text);
    const taruMsg: Message = { id: msgId++, role: "taru", text: response };
    onMessagesChange([...initialMessages, userMsg, taruMsg]);
    setInput("");
    onTaruStateChange("speaking");
    speak(response, undefined, () => onTaruStateChange("idle"));
  }

  function toggleMic() {
    if (!isRecognitionSupported()) return;
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      onTaruStateChange("idle");
      return;
    }
    const rec = createRecognition(
      (txt) => {
        setIsListening(false);
        onTaruStateChange("idle");
        sendMessage(txt);
      },
      () => {
        setIsListening(false);
        onTaruStateChange("idle");
      },
    );
    if (!rec) return;
    recognitionRef.current = rec;
    rec.start();
    setIsListening(true);
    onTaruStateChange("listening");
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 glass border-b border-white/10">
        <div className="flex items-center gap-3">
          <TaruAvatar state={taruState} size="sm" />
          <div>
            <p className="font-display font-bold text-white text-sm">Taru</p>
            <p className="text-xs text-purple-300">
              {taruState === "speaking"
                ? "Speaking..."
                : taruState === "listening"
                  ? "Listening..."
                  : "Online ✨"}
            </p>
          </div>
        </div>
        <Button
          data-ocid="chat.call_button"
          onClick={onStartCall}
          className="rounded-full w-10 h-10 p-0 bg-green-500 hover:bg-green-400 text-white shadow-lg"
        >
          <Phone size={16} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <AnimatePresence initial={false}>
          {initialMessages.map((msg, idx) => (
            <motion.div
              key={msg.id}
              data-ocid={`chat.item.${idx + 1}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {msg.role === "taru" && (
                <img
                  src="/assets/uploads/images-5--1.jpeg"
                  alt="Taru"
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-2 ring-pink-400/50"
                />
              )}
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-br-sm text-white"
                    : "rounded-bl-sm text-white"
                }`}
                style={
                  msg.role === "user"
                    ? {
                        background:
                          "linear-gradient(135deg, oklch(0.55 0.25 290), oklch(0.5 0.28 310))",
                      }
                    : {
                        background:
                          "linear-gradient(135deg, oklch(0.35 0.15 330 / 0.8), oklch(0.3 0.12 310 / 0.8))",
                        backdropFilter: "blur(10px)",
                        border: "1px solid oklch(0.6 0.2 330 / 0.3)",
                      }
                }
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-3 glass border-t border-white/10">
        <div className="flex items-center gap-2">
          {isRecognitionSupported() && (
            <Button
              data-ocid="chat.toggle"
              variant="ghost"
              onClick={toggleMic}
              className={`rounded-full w-10 h-10 p-0 flex-shrink-0 ${
                isListening
                  ? "bg-blue-500/30 text-blue-300"
                  : "text-purple-300 hover:text-white"
              }`}
            >
              {isListening ? (
                <Mic size={18} className="animate-pulse" />
              ) : (
                <MicOff size={18} />
              )}
            </Button>
          )}
          <input
            data-ocid="chat.input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Say something to Taru... 💕"
            className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white placeholder:text-purple-300/60 outline-none focus:border-pink-400/60 transition-colors"
          />
          <Button
            data-ocid="chat.submit_button"
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="rounded-full w-10 h-10 p-0 flex-shrink-0 text-white"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.28 330), oklch(0.6 0.3 290))",
            }}
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
