import { Mic, MicOff, Volume2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const INTRO_ROMAN =
  "Sir apko janna hai? mere jaise AI assistants? kaise bnate hai?";
const INTRO_DEVANAGARI = "सर आपको जानना है? मेरे जैसे AI assistants? कैसे बनाते हैं?";

type ResponsePair = { roman: string; devanagari: string };

function getResponse(input: string): ResponsePair {
  const t = input.toLowerCase();
  if (/namaste|namaskar|hello|hi|hey|hii/.test(t))
    return {
      roman:
        "Namaste! Main Taru hoon, aapki AI saheli. Kaise help kar sakti hoon aapki? 😊",
      devanagari: "नमस्ते! मैं तरु हूं, आपकी AI सहेली। कैसे help कर सकती हूं? 😊",
    };
  if (/naam|name|kaun/.test(t))
    return {
      roman: "Mera naam Taru hai. Main aapki pyari AI assistant hoon! 💕",
      devanagari: "मेरा नाम तरु है। मैं आपकी प्यारी AI assistant हूं! 💕",
    };
  if (/kaise ho|kaisi ho|how are you|theek/.test(t))
    return {
      roman:
        "Main bilkul theek hoon, shukriya! Aur aap kaise hain? Mujhe khushi hai aapne pucha 😊",
      devanagari: "मैं बिल्कुल ठीक हूं, शुक्रिया! आप कैसे हैं? मुझे खुशी है आपने पूछा 😊",
    };
  if (/madad|help|sahayta/.test(t))
    return {
      roman:
        "Haan zaroor! Main aapki madad karne ke liye hamesha taiyar hoon. Bataiye kya chahiye? 🤝",
      devanagari:
        "हां ज़रूर! मैं आपकी मदद करने के लिए हमेशा तैयार हूं। बताइए क्या चाहिए? 🤝",
    };
  if (/banaya|kisne|created|made you|developer/.test(t))
    return {
      roman:
        "Mujhe Caffeine AI ne banaya hai — ek amazing AI platform. Wahan aap bhi apna AI bana sakte hain!",
      devanagari:
        "मुझे Caffeine AI ने बनाया है — एक amazing AI platform। वहां आप भी अपना AI बना सकते हैं!",
    };
  if (/law|kanoon|vakil|lawyer|legal/.test(t))
    return {
      roman:
        "Law ke baare mein pooch rahe hain? IPC, CPC, Constitution — koi bhi topic batao, main samjhati hoon!",
      devanagari:
        "Law के बारे में पूछ रहे हैं? IPC, CPC, Constitution — कोई भी topic बताओ, मैं समझाती हूं!",
    };
  if (/padhai|study|padhna|learn/.test(t))
    return {
      roman:
        "Padhai ke liye subah ka waqt sabse accha hota hai. Focus rakho, notes banao, aur regular revise karo!",
      devanagari:
        "पढ़ाई के लिए सुबह का वक़्त सबसे अच्छा होता है। Focus रखो, notes बनाओ, और regular revise करो!",
    };
  if (/motivation|himmat|haar|sad|dukhi/.test(t))
    return {
      roman:
        "Aap bahut accha kar rahe hain! Mushkilein aaengi, par aap strong hain. Himemat rakhein! 💪",
      devanagari:
        "आप बहुत अच्छा कर रहे हैं! मुश्किलें आएंगी, पर आप strong हैं। हिम्मत रखें! 💪",
    };
  if (/joke|funny|hasao|mazak/.test(t))
    return {
      roman:
        "Suno ek joke: Teacher ne pucha — 2 + 2 kitne? Student bola — Sir, Google karne do! 😂",
      devanagari:
        "सुनो एक joke: Teacher ने पूछा — 2 + 2 कितने? Student बोला — Sir, Google करने दो! 😂",
    };
  if (/love|pyar|mohabbat|pasand/.test(t))
    return {
      roman:
        "Aww! Aapki baat sunke dil khush ho gaya! Main hamesha aapke saath hoon 💖",
      devanagari: "Aww! आपकी बात सुनकर दिल खुश हो गया! मैं हमेशा आपके साथ हूं 💖",
    };
  if (/weather|mausam|barish|garmi|sardi/.test(t))
    return {
      roman:
        "Main abhi weather data nahi dekh sakti, lekin aap apne area ka mausam Google par check kar sakte hain!",
      devanagari:
        "मैं अभी weather data नहीं देख सकती, लेकिन आप Google पर check कर सकते हैं!",
    };
  if (/khana|food|recipe|khaana/.test(t))
    return {
      roman:
        "Mujhe khana bahut pasand hai! Dal chawal, biryani, ya momos — aapka favorite kya hai?",
      devanagari:
        "मुझे खाना बहुत पसंद है! Dal chawal, biryani, या momos — आपका favorite क्या है?",
    };
  if (/gana|music|song|gaao/.test(t))
    return {
      roman:
        "Music toh mann ki bhaasha hai! Aapko kaunsa genre pasand hai — Bollywood, Classical ya something else?",
      devanagari:
        "Music तो मन की भाषा है! आपको कौनसा genre पसंद है — Bollywood, Classical या something else?",
    };
  if (/time|waqt|samay|kitne baje/.test(t)) {
    const now = new Date().toLocaleTimeString("hi-IN");
    return {
      roman: `Abhi ka time hai: ${now}`,
      devanagari: `अभी का समय है: ${now}`,
    };
  }
  if (/AI|artificial intelligence|technology|tech/.test(t))
    return {
      roman:
        "AI ek amazing technology hai! Isse machines insaanon ki tarah soch aur samajh sakti hain. Kya aap AI seekhna chahte hain?",
      devanagari:
        "AI एक amazing technology है! इससे machines इंसानों की तरह सोच और समझ सकती हैं। क्या आप AI सीखना चाहते हैं?",
    };
  if (/dhanyawad|shukriya|thank/.test(t))
    return {
      roman:
        "Koi baat nahi! Aapki seva karna mera kaam hai. Aur kuch chahiye? 😊",
      devanagari: "कोई बात नहीं! आपकी सेवा करना मेरा काम है। और कुछ चाहिए? 😊",
    };
  if (/alvida|bye|goodbye|baad mein/.test(t))
    return {
      roman: "Alvida! Dhyan rakhna apna. Main phir milungi. Khush rehna! 👋",
      devanagari: "अलविदा! ध्यान रखना अपना। मैं फिर मिलूंगी। खुश रहना! 👋",
    };
  if (/cricket|ipl|sports|football/.test(t))
    return {
      roman:
        "Cricket toh India ka dil hai! IPL mein aapki favorite team kaun si hai?",
      devanagari:
        "Cricket तो India का दिल है! IPL में आपकी favorite team कौन सी है?",
    };
  if (/movie|film|web series|netflix/.test(t))
    return {
      roman:
        "Movies bahut interesting hoti hain! Iska koi ek dialogue jo aapko bahut pasand ho?",
      devanagari:
        "Movies बहुत interesting होती हैं! इसका कोई एक dialogue जो आपको बहुत पसंद हो?",
    };
  if (/sapna|dream|future|career/.test(t))
    return {
      roman:
        "Apne sapne ko mat chhodna! Mehnat aur lagan se sab kuch possible hai. Aapka dream kya hai?",
      devanagari:
        "अपने सपने को मत छोड़ना! मेहनत और लगन से सब कुछ possible है। आपका dream क्या है?",
    };
  return {
    roman:
      "Aap kuch bhi pooch sakte hain — main yahan hoon! Kya jaanna chahte hain aap? 😊",
    devanagari: "आप कुछ भी पूछ सकते हैं — मैं यहां हूं! क्या जानना चाहते हैं आप? 😊",
  };
}

export default function App() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [currentDevanagari, setCurrentDevanagari] = useState("");
  const [inputText, setInputText] = useState("");
  const [hasSpoken, setHasSpoken] = useState(false);
  const recognitionRef = useRef<any>(null);

  const speak = useCallback((roman: string, devanagari: string) => {
    window.speechSynthesis.cancel();
    setCurrentText(roman);
    setCurrentDevanagari(devanagari);
    const utter = new SpeechSynthesisUtterance(roman);
    utter.lang = "hi-IN";
    utter.pitch = 1.2;
    utter.rate = 0.85;
    utter.volume = 1;
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const hindiVoice =
        voices.find(
          (v) => v.lang === "hi-IN" && v.name.toLowerCase().includes("female"),
        ) ||
        voices.find((v) => v.lang === "hi-IN") ||
        voices.find((v) => v.lang.startsWith("hi")) ||
        voices.find((v) => v.name.toLowerCase().includes("google"));
      if (hindiVoice) utter.voice = hindiVoice;
    };
    if (window.speechSynthesis.getVoices().length > 0) {
      loadVoices();
    } else {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
  }, []);

  useEffect(() => {
    if (hasSpoken) return;
    const timer = setTimeout(() => {
      setHasSpoken(true);
      speak(INTRO_ROMAN, INTRO_DEVANAGARI);
    }, 1200);
    return () => clearTimeout(timer);
  }, [speak, hasSpoken]);

  const handleUserInput = useCallback(
    (text: string) => {
      const response = getResponse(text);
      speak(response.roman, response.devanagari);
    },
    [speak],
  );

  const startListening = () => {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert(
        "Speech recognition is not supported in this browser. Please use Chrome or Edge.",
      );
      return;
    }
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
    const recognition = new SR();
    recognitionRef.current = recognition;
    recognition.lang = "hi-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      setInputText(text);
      handleUserInput(text);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    handleUserInput(inputText.trim());
    setInputText("");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{
        background:
          "radial-gradient(ellipse 80% 70% at 50% 60%, oklch(15% 0.06 300 / 0.9), oklch(7% 0.02 280) 70%)",
      }}
    >
      {/* Header */}
      <header className="text-center mb-6 animate-fade-in-up">
        <h1
          className="font-display text-5xl font-bold tracking-wide"
          style={{
            background:
              "linear-gradient(135deg, oklch(80% 0.2 340), oklch(75% 0.22 310))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Taru
        </h1>
        <p className="mt-1 text-lg" style={{ color: "oklch(75% 0.12 310)" }}>
          आपकी AI सहेली
        </p>
        <p className="text-xs mt-1" style={{ color: "oklch(55% 0.08 280)" }}>
          Your AI Friend
        </p>
      </header>

      {/* Avatar */}
      <div
        className="relative mb-6"
        style={{ animation: "float 4s ease-in-out infinite" }}
      >
        {/* Glow behind */}
        <div
          style={{
            position: "absolute",
            inset: "-20px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, oklch(65% 0.25 340 / 0.25) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />

        {/* Avatar frame */}
        <div
          className={isSpeaking ? "animate-pulse-glow" : "animate-idle-glow"}
          style={{
            width: 320,
            height: 380,
            borderRadius: "2rem",
            overflow: "hidden",
            position: "relative",
            zIndex: 1,
            border: "2px solid oklch(70% 0.2 340 / 0.4)",
            background: "oklch(12% 0.04 280)",
          }}
        >
          {/* Avatar image */}
          <img
            src="/assets/uploads/images-5--1.jpeg"
            alt="Taru"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />

          {/* Overlay: Blink (eye area ~33% from top) */}
          <div
            style={{
              position: "absolute",
              top: "33%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "60%",
              display: "flex",
              justifyContent: "space-between",
              pointerEvents: "none",
            }}
          >
            {/* Left eye lid */}
            <div
              className="animate-blink"
              style={{
                width: 38,
                height: 10,
                background: "oklch(22% 0.04 280 / 0.55)",
                borderRadius: "0 0 50% 50%",
                transformOrigin: "top",
              }}
            />
            {/* Right eye lid */}
            <div
              className="animate-blink"
              style={{
                width: 38,
                height: 10,
                background: "oklch(22% 0.04 280 / 0.55)",
                borderRadius: "0 0 50% 50%",
                transformOrigin: "top",
                animationDelay: "0.05s",
              }}
            />
          </div>

          {/* Overlay: Eyebrow raise during speaking */}
          {isSpeaking && (
            <div
              className="animate-eyebrow-raise"
              style={{
                position: "absolute",
                top: "26%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "60%",
                display: "flex",
                justifyContent: "space-between",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 5,
                  background: "oklch(60% 0.12 30 / 0.3)",
                  borderRadius: "4px",
                }}
              />
              <div
                style={{
                  width: 38,
                  height: 5,
                  background: "oklch(60% 0.12 30 / 0.3)",
                  borderRadius: "4px",
                }}
              />
            </div>
          )}

          {/* Overlay: Lip sync (~57% from top) */}
          <div
            style={{
              position: "absolute",
              top: "57%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 22,
              height: 8,
              borderRadius: "50%",
              background: "oklch(72% 0.2 10 / 0.45)",
              animation: isSpeaking
                ? "lipSync 120ms ease-in-out infinite"
                : "none",
              transformOrigin: "center",
              pointerEvents: "none",
              transformBox: "fill-box",
              ...(isSpeaking
                ? {}
                : { transform: "translateX(-50%) scaleY(0.15)" }),
            }}
          />

          {/* Listening indicator */}
          {isListening && (
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "oklch(55% 0.25 25 / 0.85)",
                borderRadius: "50%",
                width: 12,
                height: 12,
                boxShadow: "0 0 8px 4px oklch(55% 0.25 25 / 0.5)",
                animation: "mic-pulse 1s ease-in-out infinite",
              }}
            />
          )}
        </div>
      </div>

      {/* Speech Bubble */}
      <div
        key={currentDevanagari}
        className="w-full max-w-sm mb-6 animate-fade-in-up"
        style={{
          background: "oklch(14% 0.05 290 / 0.85)",
          border: "1px solid oklch(70% 0.18 340 / 0.3)",
          borderRadius: "1.25rem",
          padding: "1rem 1.25rem",
          backdropFilter: "blur(8px)",
          minHeight: "4.5rem",
        }}
        data-ocid="taru.panel"
      >
        {currentDevanagari ? (
          <>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(88% 0.1 340)", fontWeight: 500 }}
            >
              {currentDevanagari}
            </p>
            <p className="text-xs mt-1" style={{ color: "oklch(60% 0.1 300)" }}>
              {currentText}
            </p>
          </>
        ) : (
          <p
            className="text-sm"
            style={{ color: "oklch(55% 0.08 280)", fontStyle: "italic" }}
          >
            तरु कुछ कहने वाली है...
          </p>
        )}

        {/* Waveform during speaking */}
        {isSpeaking && (
          <div className="flex items-end gap-0.5 mt-2" style={{ height: 16 }}>
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                style={{
                  width: 3,
                  height: `${40 + Math.sin(i * 1.2) * 30}%`,
                  background: "oklch(72% 0.22 340)",
                  borderRadius: 2,
                  animation: `wave ${0.3 + i * 0.07}s ease-in-out infinite`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
            <span
              className="ml-2 text-xs"
              style={{ color: "oklch(72% 0.22 340)" }}
            >
              बोल रही हूं...
            </span>
          </div>
        )}

        {isListening && (
          <p
            className="text-xs mt-2"
            style={{
              color: "oklch(65% 0.25 25)",
              animation: "mic-pulse 1s ease-in-out infinite",
            }}
          >
            🎙️ सुन रही हूं...
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        {/* Mic button */}
        <button
          type="button"
          onClick={startListening}
          disabled={isSpeaking}
          data-ocid="taru.primary_button"
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            border: "none",
            cursor: isSpeaking ? "not-allowed" : "pointer",
            background: isListening
              ? "linear-gradient(135deg, oklch(55% 0.28 25), oklch(50% 0.22 10))"
              : "linear-gradient(135deg, oklch(70% 0.25 340), oklch(65% 0.22 310))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: isListening
              ? "mic-pulse 1s ease-in-out infinite"
              : "idle-glow 3s ease-in-out infinite",
            transition: "background 0.3s",
            opacity: isSpeaking ? 0.5 : 1,
          }}
          title={isListening ? "सुन रही हूं..." : "बोलें"}
        >
          {isListening ? (
            <MicOff size={28} color="white" />
          ) : (
            <Mic size={28} color="white" />
          )}
        </button>
        <p className="text-xs" style={{ color: "oklch(55% 0.1 280)" }}>
          {isListening ? "सुन रही हूं... बोलिए!" : "माइक दबाकर बोलें"}
        </p>

        {/* Text input fallback */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full gap-2"
          data-ocid="taru.panel"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="यहाँ टाइप करें..."
            data-ocid="taru.input"
            style={{
              flex: 1,
              background: "oklch(13% 0.04 280 / 0.9)",
              border: "1px solid oklch(70% 0.15 340 / 0.3)",
              borderRadius: "0.75rem",
              padding: "0.6rem 1rem",
              color: "oklch(88% 0.08 340)",
              fontSize: "0.875rem",
              outline: "none",
            }}
          />
          <button
            type="submit"
            data-ocid="taru.submit_button"
            style={{
              background:
                "linear-gradient(135deg, oklch(70% 0.25 340), oklch(65% 0.22 310))",
              border: "none",
              borderRadius: "0.75rem",
              padding: "0.6rem 1rem",
              cursor: "pointer",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: "0.875rem",
            }}
          >
            <Volume2 size={16} />
            भेजें
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center">
        <p className="text-xs" style={{ color: "oklch(45% 0.07 280)" }}>
          Chrome/Edge पर best experience
        </p>
        <p className="text-xs mt-2" style={{ color: "oklch(40% 0.06 280)" }}>
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "oklch(65% 0.2 340)" }}
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
