import { useCallback, useEffect, useRef, useState } from "react";

// Speech Recognition type stubs for browsers that don't fully expose these types
interface ISpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((ev: Event) => void) | null;
  onend: ((ev: Event) => void) | null;
  onerror: ((ev: Event) => void) | null;
  onresult: ((ev: ISpeechRecognitionEvent) => void) | null;
}

interface ISpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: ISpeechRecognitionResultList;
}

interface ISpeechRecognitionResultList {
  length: number;
  [index: number]: ISpeechRecognitionResult;
}

interface ISpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: ISpeechRecognitionAlternative;
}

interface ISpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    SpeechRecognition: new () => ISpeechRecognition;
    webkitSpeechRecognition: new () => ISpeechRecognition;
  }
}

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  // Initialise female voice
  useEffect(() => {
    const loadVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const female = voices.find(
        (v) =>
          (v.name.toLowerCase().includes("female") ||
            v.name.toLowerCase().includes("samantha") ||
            v.name.toLowerCase().includes("victoria") ||
            v.name.toLowerCase().includes("zira") ||
            v.name.toLowerCase().includes("google uk english female") ||
            v.name.toLowerCase().includes("karen") ||
            v.name.toLowerCase().includes("moira") ||
            v.name.toLowerCase().includes("tessa")) &&
          v.lang.startsWith("en"),
      );
      voiceRef.current =
        female || voices.find((v) => v.lang.startsWith("en")) || null;
    };

    loadVoice();
    window.speechSynthesis.onvoiceschanged = loadVoice;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const clean = text.replace(/[😊😢🤔💭😲🎉💕💙😄]/gu, "").trim();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.voice = voiceRef.current;
    utterance.pitch = 1.2;
    utterance.rate = 0.95;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) return;

    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }

    const recognition: ISpeechRecognition = new SpeechRecognitionClass();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
    };

    recognition.onresult = (event: ISpeechRecognitionEvent) => {
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        }
      }
      if (final) setTranscript(final);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.start();
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return {
    speak,
    startListening,
    stopListening,
    isSpeaking,
    isListening,
    transcript,
  };
}
