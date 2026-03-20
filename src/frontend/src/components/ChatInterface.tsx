import { Mic, MicOff, Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { EmotionType } from "../hooks/useTaruBrain";
import { TaruFace } from "./TaruFace";

interface Message {
  id: string;
  role: "user" | "taru";
  text: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  emotion: EmotionType;
  isSpeaking: boolean;
  isListening: boolean;
  messages: Message[];
  onSend: (text: string) => void;
  onMicToggle: () => void;
  transcript: string;
}

export function ChatInterface({
  emotion,
  isSpeaking,
  isListening,
  messages,
  onSend,
  onMicToggle,
  transcript,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (transcript) setInput(transcript);
  }, [transcript]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll ref side-effect
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    onSend(text);
    setInput("");
    inputRef.current?.focus();
  }, [input, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: "var(--taru-card)",
        borderRadius: 24,
        border: "1px solid var(--taru-border)",
        overflow: "hidden",
      }}
    >
      {/* Chat Header */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ borderBottom: "1px solid var(--taru-border)" }}
      >
        <div className="relative">
          <TaruFace
            emotion={emotion}
            isSpeaking={isSpeaking}
            isListening={isListening}
            size={48}
          />
        </div>
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              color: "var(--taru-text)",
            }}
          >
            Taru
          </div>
          <div className="flex items-center gap-2">
            {isSpeaking ? (
              <span
                className="flex items-center gap-1"
                style={{ fontSize: "0.75rem", color: "var(--taru-accent)" }}
              >
                <span style={{ color: "var(--taru-accent)" }}>Speaking</span>
                <span
                  className="speaking-dot inline-block w-1 h-1 rounded-full"
                  style={{ background: "var(--taru-accent)" }}
                />
                <span
                  className="speaking-dot inline-block w-1 h-1 rounded-full"
                  style={{ background: "var(--taru-accent)" }}
                />
                <span
                  className="speaking-dot inline-block w-1 h-1 rounded-full"
                  style={{ background: "var(--taru-accent)" }}
                />
              </span>
            ) : isListening ? (
              <span
                className="flex items-center gap-1"
                style={{ fontSize: "0.75rem", color: "var(--taru-gold)" }}
              >
                <span
                  className="listen-ring inline-block w-2 h-2 rounded-full"
                  style={{ background: "var(--taru-gold)" }}
                />
                Listening...
              </span>
            ) : (
              <span style={{ fontSize: "0.75rem", color: "var(--taru-muted)" }}>
                ● Online
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          minHeight: 0,
        }}
        data-ocid="chat.panel"
      >
        {messages.length === 0 && (
          <div
            className="flex flex-col items-center justify-center h-full gap-3"
            data-ocid="chat.empty_state"
            style={{
              color: "var(--taru-muted)",
              fontSize: "0.875rem",
              opacity: 0.7,
            }}
          >
            <div style={{ fontSize: "2.5rem" }}>💬</div>
            <div>Start a conversation with Taru!</div>
          </div>
        )}
        {messages.map((msg, i) =>
          msg.role === "user" ? (
            <div
              key={msg.id}
              className="flex justify-end"
              data-ocid={`chat.item.${i + 1}`}
            >
              <div className="chat-bubble-user">
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.9rem",
                    color: "var(--taru-text)",
                  }}
                >
                  {msg.text}
                </p>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#AAB6C680",
                    textAlign: "right",
                    marginTop: 4,
                  }}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div
              key={msg.id}
              className="flex justify-start items-end gap-2"
              data-ocid={`chat.item.${i + 1}`}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #55D6C6, #46CFE0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#0B1220",
                  flexShrink: 0,
                }}
              >
                T
              </div>
              <div className="chat-bubble-taru">
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.9rem",
                    color: "var(--taru-text)",
                  }}
                >
                  {msg.text}
                </p>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#AAB6C680",
                    marginTop: 4,
                  }}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ),
        )}
        {isSpeaking && (
          <div
            className="flex justify-start items-end gap-2"
            data-ocid="chat.loading_state"
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #55D6C6, #46CFE0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#0B1220",
              }}
            >
              T
            </div>
            <div
              className="chat-bubble-taru flex items-center gap-1"
              style={{ padding: "12px 18px" }}
            >
              <span
                className="speaking-dot inline-block w-2 h-2 rounded-full"
                style={{ background: "var(--taru-accent)" }}
              />
              <span
                className="speaking-dot inline-block w-2 h-2 rounded-full"
                style={{ background: "var(--taru-accent)" }}
              />
              <span
                className="speaking-dot inline-block w-2 h-2 rounded-full"
                style={{ background: "var(--taru-accent)" }}
              />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div
        className="px-4 py-3 flex items-center gap-2"
        style={{ borderTop: "1px solid var(--taru-border)" }}
      >
        <button
          type="button"
          className={`btn-icon ${isListening ? "listening" : ""}`}
          onClick={onMicToggle}
          title={isListening ? "Stop listening" : "Start voice input"}
          data-ocid="chat.toggle"
        >
          {isListening ? <MicOff size={16} /> : <Mic size={16} />}
        </button>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? "Listening..." : "Type a message..."}
          className="input-glow flex-1"
          data-ocid="chat.input"
          style={{
            background: "rgba(11,18,32,0.6)",
            border: "1px solid var(--taru-border)",
            borderRadius: 100,
            padding: "10px 18px",
            color: "var(--taru-text)",
            fontSize: "0.9rem",
            fontFamily: "inherit",
            transition: "all 0.25s ease",
          }}
        />
        <button
          type="button"
          className="btn-icon"
          onClick={handleSend}
          disabled={!input.trim()}
          style={{ opacity: input.trim() ? 1 : 0.4 }}
          data-ocid="chat.submit_button"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

export type { Message };
