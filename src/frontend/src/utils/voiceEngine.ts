let selectedVoice: SpeechSynthesisVoice | null = null;

const FEMALE_KEYWORDS = [
  "samantha",
  "victoria",
  "karen",
  "zira",
  "susan",
  "female",
  "woman",
  "girl",
  "fiona",
  "moira",
  "tessa",
  "allison",
  "ava",
  "joanna",
  "salli",
  "kendra",
  "kimberly",
];

export function initVoice(): Promise<void> {
  return new Promise((resolve) => {
    const trySet = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return;

      // 1. Name match
      for (const kw of FEMALE_KEYWORDS) {
        const match = voices.find((v) => v.name.toLowerCase().includes(kw));
        if (match) {
          selectedVoice = match;
          resolve();
          return;
        }
      }
      // 2. en-US female fallback
      const enUs = voices.find((v) => v.lang.startsWith("en"));
      if (enUs) {
        selectedVoice = enUs;
        resolve();
        return;
      }
      // 3. First available
      selectedVoice = voices[0];
      resolve();
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      trySet();
    } else {
      window.speechSynthesis.onvoiceschanged = trySet;
    }
  });
}

export function speak(
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
): void {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  if (selectedVoice) utter.voice = selectedVoice;
  utter.pitch = 1.2;
  utter.rate = 0.95;
  utter.volume = 1.0;
  utter.onstart = () => onStart?.();
  utter.onend = () => onEnd?.();
  window.speechSynthesis.speak(utter);
}

export function stopSpeaking(): void {
  window.speechSynthesis?.cancel();
}

export function isSpeechSupported(): boolean {
  return "speechSynthesis" in window;
}

export function isRecognitionSupported(): boolean {
  return "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
}

type RecognitionCallback = (text: string) => void;

export function createRecognition(
  onResult: RecognitionCallback,
  onEnd?: () => void,
) {
  const SR =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;
  if (!SR) return null;
  const recognition = new SR();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };
  recognition.onend = () => onEnd?.();
  return recognition;
}
