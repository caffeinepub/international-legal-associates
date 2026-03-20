# Taru AI - Hindi Talking Assistant

## Current State
Existing Taru AI app with anime girl avatar, English voice, chat and call modes.

## Requested Changes (Diff)

### Add
- Hindi language speech synthesis (lang: hi-IN)
- Auto-play introductory Hindi dialogue on load: "Sir apko janna hai? mere jaise ai assistants? kaise bnate hai?"
- CSS lip-sync animation overlay synced to speech (mouth open/close rhythm)
- Soft blinking animation on avatar
- Subtle eyebrow raise animation during speech
- Hindi speech recognition input (lang: hi-IN)
- Taru responds in Hindi to user queries
- Warm, caring Hindi personality responses

### Modify
- Avatar display: use existing `/assets/uploads/images-5--1.jpeg` character, displayed prominently
- Voice settings: pitch 1.2, rate 0.85, lang hi-IN for sweet soft female voice
- UI to feel like a calm virtual assistant on a laptop screen
- All UI labels/prompts in Hindi

### Remove
- English-only responses
- Aggressive animations or exaggerated motion

## Implementation Plan
1. Build single-page React component with the anime girl avatar
2. CSS animations: blinking overlay, lip-sync pulse (gentle mouth open/close), subtle eyebrow movement
3. Web Speech API: speechSynthesis with hi-IN voice, SpeechRecognition with lang hi-IN
4. Auto-speak intro dialogue on page load
5. Mic button for user to speak in Hindi; Taru responds in Hindi
6. Hindi response brain with 30+ topics
7. Calm, warm UI -- dark background, soft pink/purple glow around avatar
