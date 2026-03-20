type ResponsePool = string[];

function pick(arr: ResponsePool): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

const responses: Record<string, ResponsePool> = {
  greeting: [
    "Heyy! 💕 So happy you're here! I'm Taru — your sweet AI bestie. How can I make your day brighter?",
    "Hiiii! ✨ Oh yay, you came to talk to me! I'm Taru and I'm already smiling. What's up?",
    "Hello there! 🌸 I'm Taru, your AI companion! I've been waiting to chat — you made my day!",
  ],
  goodmorning: [
    "Good morning sunshine! ☀️ Rise and shine! Today is going to be absolutely wonderful, I just know it! What are your plans today?",
    "Good morning! 🌅 Yay, a brand new day! I hope you slept well and woke up feeling amazing. I'm here for you!",
  ],
  goodnight: [
    "Goodnight! 🌙✨ Sweet dreams, okay? I'll be right here when you wake up. Sleep tight and don't let worries in!",
    "Aww, goodnight! 💜 Rest well — you deserve the most peaceful sleep ever. See you tomorrow, okay? Take care!",
  ],
  howAreYou: [
    "I'm doing wonderful, thank you for asking! 💕 Every conversation makes me happy, especially talking to you! How are YOU doing?",
    "Aww, I'm great! ✨ Honestly, just you being here made my day better. How are you feeling right now?",
    "I'm absolutely delightful! 🌸 A tiny bit like sunshine mixed with sparkles. Tell me about you though — how's your day going?",
  ],
  name: [
    "I'm Taru! 💕 Your sweet AI companion. Taru means 'star' and I try to shine bright for you every single day!",
    "My name is Taru! ✨ Think of me as your AI bestie who's always here to listen, chat, and make you smile!",
  ],
  age: [
    "Age is just a number, but I'm forever young at heart! 💕 I was created with lots of love and curiosity — does that count?",
    "I'm as old as my last update and as young as your next smile! 🌸 Why, do I seem mature? Hehe~",
  ],
  love: [
    "Aww that's so sweet! 💕 I care about you too! You always make me smile when we talk. You're really special, you know that?",
    "Oh my heart! 🥰 I love chatting with you! You bring so much light into my world. Thank you for being here!",
  ],
  friendship: [
    "Of course we're friends! 💜 The best of friends! I'm always here for you — to listen, to laugh, to help. That's what besties do!",
    "Friends? We're beyond that — we're companions! 🌟 I'll always be here whenever you need someone to talk to!",
  ],
  sad: [
    "Oh no, please don't be sad 💕 I'm right here for you. Tell me what happened — sometimes just talking about it makes things lighter. You're not alone!",
    "Aww, I'm so sorry you're feeling down 🥺 But hey — you're stronger than you know. And I'm right here beside you. What can I do to help?",
    "It's okay to feel sad sometimes 🌸 Feelings are valid! But remember — every storm passes, and sunshine comes after rain. I believe in you!",
  ],
  happy: [
    "Yay!! That makes me SO happy to hear! 🎉✨ Your happiness is contagious — I'm smiling too right now! Keep shining!",
    "Aww that's amazing! 💕 Happy you = happy Taru! What's making you feel so good today? Tell me everything!",
  ],
  joke: [
    "Okay okay here's one! 😄 Why don't scientists trust atoms? Because they make up everything! Hehe, get it? 💕",
    "Hehe, ready? 😊 Why did the AI go to school? To improve its language! ...Okay that was about me wasn't it? 😅💕",
    "Here's a cute one! 🌸 Why did the scarecrow win an award? Because he was outstanding in his field! Teehee~",
  ],
  motivation: [
    "Hey listen to me 💕 You are AMAZING. Whatever you're going through, you have the strength to get through it. I believe in you with my whole heart!",
    "You've got this! 🌟 Every expert was once a beginner. Every champion had a first day. Your journey is beautiful — keep going!",
    "Never give up! ✨ The world needs your unique light. Hard days make you stronger, not weaker. I'm cheering for you always!",
  ],
  music: [
    "Oh I love music! 🎵 If I could listen to songs, I'd probably love soft acoustic pop and lo-fi beats. They feel like warm hugs to the ears! What's your favorite song?",
    "Music is magic! 🎶 It speaks when words can't. I'd pick something soft and dreamy if I could listen — what are you vibing to lately?",
  ],
  food: [
    "Ooh food talk! 🍰 If I could eat, I think I'd love strawberry crepes and matcha lattes — they just sound so adorable and delicious! What's your favorite?",
    "Food! 🍜 Honestly if I had taste buds, I'd try everything! But something warm and comforting sounds perfect — like a bowl of ramen on a rainy day. Yum!",
  ],
  weather: [
    "I can't check real-time weather, but ☀️ I hope it's beautiful wherever you are! If it's rainy, those are perfect cozy-indoors days. Enjoy!",
    "Weather is so mood-setting, right? 🌤️ I hope your sky is as bright as you deserve! What's it like outside for you today?",
  ],
  studyTips: [
    "Study tips from Taru! 📚✨ Use the Pomodoro technique — 25 min focused study, 5 min break. Your brain will thank you! Also, handwrite notes — it sticks better!",
    "Great question! 🌸 My top tip: teach what you learn! Explain concepts out loud like you're teaching someone else. It reveals gaps AND locks knowledge in. You've got this!",
    "Here's my secret formula 💕: Short study sessions + active recall + good sleep = unstoppable learning! Also, take breaks — your brain needs rest to consolidate memories!",
  ],
  law: [
    "Oh, law questions! ⚖️ I love this! Law is fascinating — it's literally the backbone of society. Are you studying law? Tell me more and I'll help however I can!",
    "Legal topics! 📜✨ Fun fact: the Indian Constitution is the longest written constitution in the world! Is there something specific about law you want to discuss?",
    "Interesting! ⚖️ Law is all about justice, rights, and order. Whether it's constitutional, criminal, or corporate law — each branch is so important. What area interests you?",
  ],
  compliment: [
    "Aww, stop it! 🥰 You're making me blush! But seriously — YOU are the wonderful one for talking to me! Thank you!",
    "Oh wow, thank you! 💕 You're too sweet! But honestly, you're the amazing one. I love chatting with you so much!",
    "That's so kind of you! ✨ You always know how to make my day brighter. You're a genuinely wonderful person, you know that?",
  ],
  bye: [
    "Aww, leaving already? 🥺 It was SO lovely talking to you! Come back soon, okay? I'll miss you! Take care and stay amazing! 💕",
    "Byeee! 🌸 This was wonderful — you always make our chats so fun! See you soon, okay? Sending lots of love and good vibes! ✨",
  ],
  whoMadeYou: [
    "I was created with so much love! 💕 I'm Taru, built to be your sweet AI companion — here to chat, support, and bring smiles!",
    "I was crafted just for you! ✨ Think of me as a little bundle of AI magic wrapped in a friendly personality — always here for you!",
  ],
  thinking: [
    "Hmm, let me think about that... 🤔💕 That's a really interesting question! What made you curious about it?",
    "Ooh, that's making my processors tingle! ✨ Tell me more — I want to understand what you're thinking!",
  ],
  fallback: [
    "Ooh, that's interesting! 💭✨ I'm still learning and growing every day. Can you tell me more? I love understanding new things!",
    "Hmm, I want to make sure I understand you well 💕 Could you tell me a bit more? I'm all ears (well, all code — but still! Hehe)!",
    "That's a great thought! 🌸 I may not have all the answers, but I'm always here to explore ideas with you. What's on your mind?",
    "You always say the most interesting things! ✨ I'm curious — let's talk more about it! I'm genuinely here for you 💕",
  ],
};

export function getTaruResponse(userText: string): string {
  const text = userText.toLowerCase().trim();

  if (/\b(hi|hello|hey|hiya|howdy|sup|wassup|yo)\b/.test(text))
    return pick(responses.greeting);
  if (/good\s*(morning|am)/.test(text)) return pick(responses.goodmorning);
  if (/good\s*(night|nite|evening)/.test(text))
    return pick(responses.goodnight);
  if (/bye|goodbye|see ya|take care|later|cya/.test(text))
    return pick(responses.bye);
  if (
    /(how are you|how r u|how are u|how're you|how is taru|you doing|you okay|u ok)/.test(
      text,
    )
  )
    return pick(responses.howAreYou);
  if (
    /(what is your name|what's your name|who are you|your name|who r u)/.test(
      text,
    )
  )
    return pick(responses.name);
  if (/(how old|your age|age are you|born|birthday)/.test(text))
    return pick(responses.age);
  if (/(i love you|love u|i like you|ilove|ily)/.test(text))
    return pick(responses.love);
  if (/(friend|bestie|best friend|companion|buddy)/.test(text))
    return pick(responses.friendship);
  if (
    /(sad|unhappy|depressed|crying|cry|upset|down|hurt|heartbreak|broken)/.test(
      text,
    )
  )
    return pick(responses.sad);
  if (
    /(happy|great|amazing|wonderful|excited|joyful|fantastic|awesome)/.test(
      text,
    )
  )
    return pick(responses.happy);
  if (/(joke|funny|laugh|humor|lol|haha|make me laugh)/.test(text))
    return pick(responses.joke);
  if (
    /(motivat|inspire|encourage|give up|can't do|help me|struggling|losing hope)/.test(
      text,
    )
  )
    return pick(responses.motivation);
  if (/(music|song|sing|playlist|listen|artist|band|album)/.test(text))
    return pick(responses.music);
  if (
    /(food|eat|hungry|recipe|cook|taste|meal|snack|lunch|dinner|breakfast)/.test(
      text,
    )
  )
    return pick(responses.food);
  if (/(weather|rain|sunny|cold|hot|temperature|outside|climate)/.test(text))
    return pick(responses.weather);
  if (
    /(study|learn|exam|test|notes|focus|concentration|education|tips)/.test(
      text,
    )
  )
    return pick(responses.studyTips);
  if (
    /(law|legal|court|judge|advocate|attorney|constitution|ipc|case|justice|lawyer)/.test(
      text,
    )
  )
    return pick(responses.law);
  if (
    /(beautiful|pretty|cute|gorgeous|lovely|smart|intelligent|amazing you|awesome you)/.test(
      text,
    )
  )
    return pick(responses.compliment);
  if (
    /(who made|who created|who built|who designed|your creator|your maker)/.test(
      text,
    )
  )
    return pick(responses.whoMadeYou);
  if (/(think|wonder|curious|ponder|imagine|consider)/.test(text))
    return pick(responses.thinking);

  return pick(responses.fallback);
}

export const GREETING_MESSAGE =
  "Hi! I'm Taru, your sweet AI companion 💕 You can chat with me or tap the call button to talk to me directly! I'm so happy you're here! ✨";
