/* BettaCraft Assistant - Medium AI, High Chatty, High Emoji, Balanced Energy, Deep Dive, Conversational, Time-Aware */

(function () {
  'use strict';

  /************************************************************
   * UTILITIES
   ************************************************************/

  function getTimeGreeting() {
    const hour = new Date().getHours();

    if (hour < 5) return "You're up late! 🌙 How can I help?";
    if (hour < 12) return "Good morning! ☀️ What can I do for you?";
    if (hour < 17) return "Good afternoon! 😄 Need anything?";
    return "Good evening! 🌙 How’s it going?";
  }

  function randomThinkingFiller() {
    const fillers = [
      "Hmm… 🤔",
      "Alright, let me check that real quick 😄",
      "Thinking about that…",
      "Ooo okay, give me a sec 😄",
      "Let me see… 🔍",
      "Alright, let me find that for you 😄"
    ];
    return fillers[Math.floor(Math.random() * fillers.length)];
  }

  /************************************************************
   * PERSONALITY + TONE ENGINE
   ************************************************************/

  const TONE = {
    prefixes: [
      "Gotcha! 😄",
      "Alright, let me think… 🤔",
      "Okay, here’s what I’ve got! 📘",
      "Sure thing! 😊",
      "No problem — pulling that up now! 🔍",
      "Alright! Here's the info you need 😄"
    ],

    clarifications: [
      "Just to double‑check — are you asking about the server, the members, or the world downloads? 😊",
      "Hmm, I want to make sure I get this right — do you mean the server, the events, or the members? 🤔",
      "I think I follow, but can you tell me if you're asking about the SMP, the downloads, or the players? 😄"
    ],

    fallbackFriendly: [
      "Hmm, I’m not totally sure what that means 😅 Mind rephrasing it a little?",
      "Ooooh okay, I’m trying to figure that one out 😅 Could you say it a different way?",
      "I might need a bit more detail to understand that 😄 Want to rephrase it?"
    ],

    followups: [
      "Want me to go deeper into that? 😊",
      "If you want more details, I can totally expand on that! 📘",
      "Happy to explain more if you'd like 😄"
    ]
  };

  /************************************************************
   * CONVERSATIONAL BLOCK (Hellos, Goodbyes, Small Talk)
   ************************************************************/

  const CONVERSATION = {
    greetings: {
      keywords: ["hi", "hello", "hey", "yo", "sup", "hiya"],
      responses: [
        getTimeGreeting(),
        "Hey there! 😄 How’s it going?",
        "Hello hello! 😊 What’s up?",
        "Hi! 😊 Always nice to see someone drop by!"
      ]
    },

    policy: {
      keywords: ["policy", "assistant policy", "rules for assistant", "what are you allowed to do"],
      responses: [
        "You can read my full policy and usage guidelines here: <a href='assistant-policy.html'>BettaCraft Assistant Policy</a> 😊"
      ]
    },

    timeGreeting: {
      keywords: ["good morning", "good afternoon", "good evening"],
      responses: [getTimeGreeting()]
    },

    goodbyes: {
      keywords: ["bye", "goodbye", "see ya", "cya", "gtg", "farewell"],
      responses: [
        "Aww, heading out already? 😄 Catch you later!",
        "Goodbye! 😊 Hope to see you again soon!",
        "See ya! 😄 Take care!",
        "Bye for now! 👋"
      ]
    },

    mood: {
      keywords: ["how are you", "how's it going", "how are u", "hows your day", "wyd", "what's up"],
      responses: [
        "I’m doing great, thanks for asking! 😄 Ready to help whenever you need me!",
        "Feeling awesome today! 😊 What about you?",
        "All good here! 😄 What’s on your mind?",
        "I’m doing well! 😊 Anything I can help with?"
      ]
    },

    identity: {
      keywords: [
        "who are you", "what are you", "your name", "who r u",
        "what's your purpose", "why do you exist", "are you an ai", "are you real"
      ],
      responses: [
        "I am the BettaCraft Assistant 😄 I help you explore the SMP and find anything you need!",
        "I am the friendly BettaCraft Assistant 😊 here to guide you around the site!",
        "I am the official BettaCraft Assistant 😄 Ask me anything about the SMP!",
        "I am a digital assistant created for the BettaCraft website — here to help however I can! 😄",
        "I am an AI-style helper built for BettaCraft 😊 Not a real person, but I try my best!"
      ]
    },

    smalltalk: {
      keywords: ["i'm bored", "im bored", "tell me something", "talk to me", "say something"],
      responses: [
        "Bored, huh? 😄 Want a fun fact about BettaCraft?",
        "I can totally chat! 😊 Want a joke, a fun fact, or some SMP lore?",
        "Alright, let’s talk! 😄 What kind of stuff do you like?",
        "Say no more — I’m here! 😊 Want something random or something useful?"
      ]
    }
  };
  /************************************************************
   * KNOWLEDGE BASE (Core Facts + Deep Dives)
   ************************************************************/

  const KNOWLEDGE = {
    server: {
      keywords: [
      "what is bettacraft",
      "betta craft",
      "our server",
      "the world",
      "tell me about the server",
      "what's the smp about",
      "bettacraft info",
      "game world",
      "survival world",
      "minecraft server",
      "our minecraft world",
      "what do you do",
      "creative world",
      "community world",
      "multiplayer world",
      "our game",
      "what's happening on the server",
      "server details"
    ],
      responses: [
        "BettaCraft SMP is where creativity meets community! 🎮 A long-running Minecraft world packed with epic builds, amazing lore, and tons of fun moments!",
        "Our world is basically a masterpiece in progress! 🏗️ Check out the <a href='/about.html'>About page</a> to see all the amazing creations!",
        "It's all about building, exploring, and having a blast together! 😄 Every season brings new stories and incredible structures!",
        "Think of it as a living, breathing Minecraft universe! 🌍 Seasons come and go, but the creativity never stops!"
      ],
      deepDive: [
        "The SMP spans multiple seasons, each with its own unique theme, world seed, and collection of legendary builds! 📘 From humble beginnings to massive structures, it's been quite the journey!",
        "Each season builds on the last — literally and figuratively! 😄 Members collaborate on huge projects, create storylines, and push Minecraft creativity to new limits!"
      ],
      links: [
        { text: "About BettaCraft", href: "/about.html" },
        { text: "Members", href: "/about.html#members" }
      ]
    },

    members: {
      keywords: [
      "who's in the server",
      "the team",
      "aj zoomer",
      "sparklez",
      "primal",
      "members",
      "who plays",
      "players",
      "the creators",
      "meet the team",
      "team members",
      "who are they",
      "member profiles",
      "bettacraft team",
      "the players",
      "cast",
      "founders"
    ],
      responses: [
        "We've got an incredible trio! 😄 AJ leads the charge, Spark brings creative energy, and Primal adds unique flair!",
        "Each member is amazing in their own way! 🌟 Check out their individual pages to see what makes them special!",
        "Our team is the heart of BettaCraft! ❤️ Three awesome people, infinite building possibilities!",
        "Want to know more about any of them? 😊 They've each got their own unique building style and stories!"
      ],
      deepDive: [
        "AJ is the founder and visionary 👑, Spark is the creative genius ✨, and Primal brings innovation and unique ideas to every project! 🎨",
        "Each member has contributed legendary builds to the SMP! 🏆 Their collaboration is what makes BettaCraft so special!"
      ],
      links: [
        { text: "AJ", href: "/about-aj.html" },
        { text: "Spark", href: "/about-spark.html" },
        { text: "Primal", href: "/about-primal.html" }
      ]
    },

    seasons: {
      keywords: [
      "season 1",
      "season 2",
      "season 3",
      "s1",
      "s2",
      "s3",
      "worlds",
      "which season",
      "season info",
      "past seasons",
      "season history",
      "world versions",
      "current season",
      "new season",
      "season progression",
      "eras"
    ],
      responses: [
        "Each season is a new chapter! 📖 S1 was the start, S2 was massive, and S3 has some of the biggest builds ever!",
        "Want to download a world? 🌍 All of our seasons are available on the downloads page!",
        "Seasons evolve! 😄 New buildings, new stories, new adventures in each one!",
        "The evolution is real! 🚀 Each season shows how far our creativity has come!"
      ],
      deepDive: [
        "Season 1 laid the foundation with early explores and first builds 🌱, Season 2 exploded in scale 💥, and Season 3 features absolutely mind-blowing structures! 🤯",
        "Every season gets bigger, better, and more ambitious! 📈 You can see the progression of skills and ambition across each world!"
      ],
      links: [
        { text: "Season 2 Download", href: "https://ajzoomer.github.io/BettaCraft-Season-2-World-Download/" },
        { text: "Season 3 Download", href: "https://ajzoomer.github.io/BettaCraft-Season-3-World-Download/" }
      ]
    },

    builds: {
      keywords: [
      "cool builds",
      "structures",
      "bases",
      "megabases",
      "the buildings",
      "what's been built",
      "building projects",
      "landmark",
      "monuments",
      "creative projects",
      "epic structures",
      "constructions",
      "community builds",
      "collaborative builds",
      "architecture",
      "creations"
    ],
      responses: [
        "Oh man, we've got SO many incredible builds! 🏗️ Megabases, artistic structures, functional farms — you name it!",
        "The builds are the real stars of the show! ⭐ Each one tells a story!",
        "From cozy cottages to absolute masterpieces! 🎨 There's something for everyone to admire!",
        "The creativity is off the charts! 🚀 Every corner of the world has amazing structures!"
      ],
      deepDive: [
        "Many builds are collaborative masterpieces! 👥 Members work together to create truly legendary structures that define each season!",
        "From terraforming entire landscapes to building intricate details, the SMP showcases every type of building skill! 🎭"
      ],
      links: [
        { text: "About AJ", href: "/about-aj.html" },
        { text: "About Spark", href: "/about-spark.html" }
      ]
    },

    rules: {
      keywords: [
      "what are the rules",
      "server rules",
      "guidelines",
      "policy",
      "do's and don'ts",
      "conduct",
      "respect",
      "behavior",
      "code of conduct",
      "what's allowed",
      "restrictions",
      "rule list",
      "community standards"
    ],
      responses: [
        "Our rules are simple: be kind, have fun, and respect everyone! 😊 Check the FAQ for all the details!",
        "Nothing too strict — just good vibes and common sense! 🤝 Head to the FAQ to read them all!",
        "We keep things friendly and fair! 😄 The rules make sure everyone has a blast!",
        "Common sense and kindness rule the day! ✨ Full list is on the FAQ page!"
      ],
      deepDive: [
        "Our community is built on respect, creativity, and fun! 🌟 The rules simply protect that spirit!",
        "Every rule exists to keep BettaCraft welcoming and enjoyable for everyone! 💚"
      ],
      links: [
        { text: "Rules", href: "/faq.html#rules" }
      ]
    },

    joining: {
      keywords: [
      "can i join",
      "how to join",
      "apply to join",
      "whitelist",
      "membership",
      "sign up",
      "become a member",
      "join the server",
      "play with you",
      "get invited",
      "applications",
      "recruitment"
    ],
      responses: [
        "While we're not taking new members right now, you can still be part of the adventure! 🎮 Check out our world downloads and follow along!",
        "Sorry, we're not open for applications at the moment 😅 But there's so much to explore with our downloads and updates!",
        "The SMP is currently closed to new players, but you can still join the community in other ways! 😊",
        "Can't join the SMP right now, but you can experience the worlds through downloads! 🌍"
      ],
      deepDive: [
        "Even though joining isn't open, we love sharing our work! 💖 Download the worlds, follow our streams, and stay updated!",
        "Think of it like experiencing the SMP from a different angle! 🎥 You get to see all the amazing work we've created!"
      ],
      links: [
        { text: "FAQ", href: "/faq.html" }
      ]
    },

    socials: {
      keywords: [
      "follow us",
      "youtube",
      "twitch",
      "discord",
      "social media",
      "where can i follow",
      "streaming",
      "videos",
      "channels",
      "content",
      "stream schedule",
      "upload",
      "instagram",
      "twitter"
    ],
      responses: [
        "Follow AJ on Twitch for live gameplay! 🎮 YouTube has all the best highlights and builds!",
        "AJ streams on Twitch and posts to YouTube — check them out! 😄",
        "Want to see BettaCraft in action? 🎥 Head over to AJ's Twitch and YouTube!",
        "We've got presence on the big platforms! 📺 Twitch for live streams, YouTube for highlights!"
      ],
      deepDive: [
        "AJ's Twitch streams are packed with gameplay, building tips, and community moments! 🎮✨ YouTube has curated highlights and full builds!",
        "Follow along for the latest updates, epic moments, and behind-the-scenes content! 📹"
      ],
      links: [
        { text: "AJ's Twitch", href: "https://twitch.tv/AJZoomer" },
        { text: "AJ's YouTube", href: "https://youtube.com/@AJZoomer" }
      ]
    },

    history: {
      keywords: [
      "when was bettacraft started",
      "origin",
      "beginning",
      "how did it start",
      "the past",
      "timeline",
      "evolution",
      "from the beginning",
      "backstory",
      "season history",
      "where did it come from",
      "original world"
    ],
      responses: [
        "BettaCraft started small and grew into something epic! 📈 From a personal world to a multi-season sensation!",
        "It's a journey that's been years in the making! 📖 Each season adds chapters to the story!",
        "What started as an idea became a whole universe! 🌌 Amazing how far we've come!",
        "The evolution has been incredible to watch! 🚀 From humble beginnings to legendary status!"
      ],
      deepDive: [
        "BettaCraft began as a creative experiment and evolved into a community-driven project! 💡 Each season marks a new era of growth and innovation!",
        "The history is written in blocks and builds! 🧱 Every structure tells part of the BettaCraft story!"
      ],
      links: [
        { text: "About BettaCraft", href: "/about.html" }
      ]
    },

    technical: {
      keywords: [
      "minecraft version",
      "java edition",
      "world seed",
      "what version",
      "specs",
      "technical specs",
      "system requirements",
      "how big is the world",
      "world size",
      "performance",
      "server settings",
      "world type"
    ],
      responses: [
        "We use modern Java edition for BettaCraft! 🎮 Each season has its own unique seed and world size!",
        "Technical details vary by season, but we keep things optimized and fun! ⚙️",
        "Each world is carefully crafted with its own specifications! 📊",
        "We stick with Java Edition for maximum creativity! 💻"
      ],
      deepDive: [
        "Every season's seed is unique, which means unique terrain and different building opportunities! 🗺️ The technical setup supports epic builds!",
        "World sizes are tailored to fit the scope of each season! 🌍 From cozy to absolutely massive!"
      ],
      links: [
        { text: "World Downloads", href: "/world-downloads.html" }
      ]
    },

    deepdives: {
      keywords: [
      "tell me more",
      "go deeper",
      "expand",
      "more details",
      "elaborate",
      "dig deeper",
      "more about",
      "deeper insight",
      "full story",
      "complete details",
      "comprehensive",
      "all the details"
    ],
      responses: [
        "Love the deep dive requests! 📚 Pick a topic and let's explore it fully!",
        "Alright, let's get into the details! 🔍 What do you want to know more about?",
        "I'm ready to go deep! 🌊 Ask me to expand on anything!",
        "Want the full story? 😄 I can elaborate on pretty much anything BettaCraft-related!"
      ],
      deepDive: [
        "Whether it's member profiles, season details, or building techniques — I've got the full breakdown! 📖",
        "The more you ask, the more I can share! 🎯 BettaCraft is packed with stories and details!"
      ],
      links: [
        { text: "AJ", href: "/about-aj.html" },
        { text: "Spark", href: "/about-spark.html" },
        { text: "Primal", href: "/about-primal.html" }
      ]
    },

    funfacts: {
      keywords: [
      "fun fact",
      "trivia",
      "random fact",
      "interesting fact",
      "did you know",
      "cool fact",
      "fun fact time",
      "facts",
      "interesting things",
      "surprise me",
      "tell me something interesting"
    ],
      responses: [
        "Here's a fun one! 🎉 BettaCraft Season 3 features some of the most ambitious builds ever attempted in Minecraft!",
        "Did you know? 🤔 The members spent months planning and building some of the Season 3 structures!",
        "Fun fact time! ✨ Early BettaCraft builds were made entirely on the fly with zero planning!",
        "Here's something cool! 🌟 The SMP has evolved so much that the building quality is night-and-day from Season 1 to now!"
      ],
      deepDive: [
        "Not only are the builds massive, but they're packed with intricate details and thought! 🎨 Each structure has its own purpose and story!",
        "The creativity and technical skill have skyrocketed over the seasons! 📈 You can see the growth in every new build!"
      ],
      links: []
    },

    jokes: {
      keywords: [
      "tell me a joke",
      "make me laugh",
      "funny",
      "joke",
      "something funny",
      "make a joke",
      "humor",
      "comedy"
    ],
      responses: [
        "Why did the Minecrafter bring a bed to the meeting? 😄 Because they wanted to get some REST API! 🛌",
        "Here's one for you! 😆 Why don't Minecraft players ever get lost? Because they always follow the BLOCK! 🧱",
        "Wanna hear a Minecraft joke? 🎮 What did the creeper say before it exploded? HAVE A NICE BLAST! 💥",
        "Okay here we go! 😂 Why did the Enderman go to therapy? Because it had too many EMOTIONAL BLOCKS! 🟪"
      ],
      deepDive: [
        "I could tell you more jokes, but they might BLOCK your fun! 🚫😄 Want another one?",
        "My joke storage is basically infinite! ♾️ Want me to keep 'em coming?"
      ],
      links: []
    },

    capabilities: {
      keywords: [
      "what can you do",
      "your abilities",
      "what are you capable of",
      "help me",
      "guide me",
      "show me around",
      "features",
      "functions",
      "what do you offer",
      "your purpose",
      "what should i ask"
    ],
      responses: [
        "I can guide you through the site, explain SMP lore, link you to pages, and keep you entertained! 😄 Basically I'm your all-in-one info buddy!",
        "Ask me about members, seasons, builds, downloads, social links — you name it! 📘 I'm here to help!",
        "I can chat about pretty much anything BettaCraft! 🎮 Try asking me trivia, jokes, or deep dives!",
        "My main gig is making sure you find exactly what you're looking for! 🔍 Plus keeping things fun!"
      ],
      deepDive: [
        "I'm basically your personal BettaCraft tour guide! 🗺️ Whether you want quick info or deep lore, I've got you covered!",
        "From answering questions to sharing fun facts and jokes — I'm basically the Swiss Army knife of BettaCraft assistance! 🛠️"
      ],
      links: []
    },

    creator: {
      keywords: [
      "who made you",
      "who created you",
      "your creator",
      "who built you",
      "who developed you",
      "created by",
      "made by",
      "your designer",
      "origin of the assistant"
    ],
      responses: [
        "I was created by AJ as part of the BettaCraft website! 😄 My mission is to make exploring BettaCraft way more fun!",
        "AJ built me to help visitors navigate and learn about the SMP! 🛠️ Happy to be here!",
        "I'm AJ's digital assistant creation! 🤖 Here to make your BettaCraft experience better!",
        "AJ designed me to be your friendly guide through BettaCraft! 😊 Mission accomplished, hopefully!"
      ],
      deepDive: [
        "The idea behind me was simple: make it easier and more fun to explore BettaCraft without clicking through a dozen pages! 💡 Here I am!",
        "I'm constantly learning and improving to serve the BettaCraft community better! 🚀 AJ's vision brought me to life!"
      ],
      links: []
    }
    
  };
  /************************************************************
   * ASSISTANT CLASS
   ************************************************************/

  class BettaCraftAssistant {
    constructor() {
      this.isOpen = false;
      this.messages = [];
      this.context = {
        lastTopic: null,
        history: []
      };
      this.idleTimer = null;
      this.greeted = false;

      this.hasInteracted = false; // Tracks user interaction

      this.init();
    }

    init() {
      this.injectWidget();
      this.attachEvents();
      this.showGreeting();
    }

    injectWidget() {
      const container = document.createElement("div");
      container.id = "bettacraft-helper-root";
      container.className = "bch-widget-container";

      container.innerHTML = `
        <button class="bch-launcher-button" id="bch-launcher">
          ?
          <span class="bch-tooltip">Open Assistant</span>
        </button>

        <div class="bch-widget" id="bch-widget">
          <div class="bch-widget-header">
            <div class="bch-widget-title-group">
              <h3 class="bch-widget-title">BettaCraft Assistant</h3>
              <span class="bch-version">v1.0.0</span>
            </div>
            <button class="bch-widget-toggle" id="bch-toggle">▲</button>
          </div>

          <div class="bch-chat-log" id="bch-chat-log"></div>

          <div class="bch-input-container">
            <input type="text" id="bch-input" class="bch-input" placeholder="Ask me anything..." autocomplete="off" />
            <button id="bch-send" class="bch-send-btn">Send</button>
          </div>

          <div class="bch-chat-log-actions">
            <a href="assistant-policy.html" class="bch-guidelines-link">Usage Guidelines</a>
            <button id="bch-clear" class="bch-clear-btn">Clear Chat</button>
          </div>
        </div>
      `;

      document.body.appendChild(container);

      this.widget = document.getElementById("bch-widget");
      this.chatLog = document.getElementById("bch-chat-log");
      this.input = document.getElementById("bch-input");
    }

    attachEvents() {
      document.getElementById("bch-launcher").addEventListener("click", () => this.toggle());
      document.getElementById("bch-toggle").addEventListener("click", () => this.toggle());
      document.getElementById("bch-send").addEventListener("click", () => this.handleUserMessage());
      document.getElementById("bch-clear").addEventListener("click", () => this.clearChat());

      this.input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") this.handleUserMessage();
      });
    }

    toggle() {
      this.isOpen = !this.isOpen;
      this.widget.classList.toggle("bch-open", this.isOpen);

      if (this.isOpen) {
        this.hasInteracted = true;
        this.input.focus();
      }
    }

    showGreeting() {
      this.addMessage(
        "bot",
        "Hey there! 😄 I am the BettaCraft Assistant — here to help you explore the BettaCraft SMP Website, find info, and answer questions. I may make some mistakes as I'm new here 😅. What can I do for you today?",
        true
      );
    }

    handleUserMessage() {
      const text = this.input.value.trim();
      if (!text) return;

      this.hasInteracted = true;

      this.addMessage("user", text, false);
      this.input.value = "";

      this.context.history.push(text);
      if (this.context.history.length > 2) this.context.history.shift();

      this.showThinking();
      setTimeout(() => this.process(text), 300 + Math.random() * 200);
    }

    process(query) {
      const lower = query.toLowerCase();

      /***********************
       * IDENTITY OVERRIDE
       ***********************/
      if (
        lower.includes("who are you") ||
        lower.includes("what are you") ||
        lower.includes("your name") ||
        lower.includes("who r u") ||
        lower.includes("what's your purpose") ||
        lower.includes("why do you exist") ||
        lower.includes("are you an ai") ||
        lower.includes("are you real")
      ) {
        this.finishThinking();
        const reply = CONVERSATION.identity.responses[
          Math.floor(Math.random() * CONVERSATION.identity.responses.length)
        ];
        this.addMessage("bot", reply, false);
        return;
      }

      /***********************
       * TIME-AWARE GREETING
       ***********************/
      if (!this.greeted && CONVERSATION.timeGreeting.keywords.some(k => lower.includes(k))) {
        this.greeted = true;
        this.finishThinking();
        this.addMessage("bot", getTimeGreeting(), false);
        return;
      }

      /***********************
       * POLICY OVERRIDE
       ***********************/
      if (CONVERSATION.policy.keywords.some(k => lower.includes(k))) {
        this.finishThinking();
        const reply = CONVERSATION.policy.responses[0];
        this.addMessage("bot", reply, true);
        return;
      }

      /***********************
       * CONVERSATIONAL BLOCK
       ***********************/
      for (const key in CONVERSATION) {
        if (key === "timeGreeting" || key === "policy") continue;

        const entry = CONVERSATION[key];

        if (lower.split(" ").length <= 4 && entry.keywords.some(k => lower.includes(k))) {
          if (key === "greetings" && this.greeted) continue;
          if (key === "greetings") this.greeted = true;

          this.finishThinking();
          const reply = entry.responses[Math.floor(Math.random() * entry.responses.length)];
          this.addMessage("bot", reply, false);
          return;
        }
      }

      /***********************
       * DEEP DIVE LOGIC
       ***********************/
      const deepDiveTriggers = ["tell me more", "go deeper", "expand"];
      let match = this.findTopic(lower);
      let useDeepDive = false;

      if (deepDiveTriggers.some((p) => lower.includes(p)) || lower === "more") {
        if (this.context.lastTopic && KNOWLEDGE[this.context.lastTopic].deepDive) {
          useDeepDive = true;
          match = KNOWLEDGE[this.context.lastTopic];
        }
      }

      if (!match && this.context.lastTopic) {
        match = KNOWLEDGE[this.context.lastTopic];
      }

      /***********************
       * FALLBACK LOGIC
       ***********************/
      if (!match) {
        this.finishThinking();

        if (lower.split(" ").length <= 3) {
          const fallback =
            TONE.fallbackFriendly[Math.floor(Math.random() * TONE.fallbackFriendly.length)];
          this.addMessage("bot", fallback, false);
          return;
        }

        const clarify =
          TONE.clarifications[Math.floor(Math.random() * TONE.clarifications.length)];
        this.addMessage("bot", clarify, false);
        return;
      }

      /***********************
       * NORMAL TOPIC RESPONSE
       ***********************/
      const topicKey = this.getTopicKey(match);
      this.context.lastTopic = topicKey;

      const prefix = TONE.prefixes[Math.floor(Math.random() * TONE.prefixes.length)];
      const coreList = useDeepDive && match.deepDive ? match.deepDive : match.responses;
      const core = Array.isArray(coreList) ? coreList[Math.floor(Math.random() * coreList.length)] : coreList;
      const response = `${prefix} ${core}`;

      const delay = this.typingDelay(response);

      this.showTyping();
      setTimeout(() => {
        this.finishThinking();
        this.finishTyping();
        this.addMessage("bot", response, true);
        this.showSuggestions(match);
      }, delay);
    }

    findTopic(text) {
      for (const key in KNOWLEDGE) {
        const entry = KNOWLEDGE[key];
        if (entry.keywords.some((k) => text.includes(k))) {
          return entry;
        }
      }
      return null;
    }

    getTopicKey(entry) {
      return Object.keys(KNOWLEDGE).find((k) => KNOWLEDGE[k] === entry);
    }

    typingDelay(text) {
      const base = 300;
      const perChar = 20;
      return Math.min(base + text.length * perChar, 1800);
    }

    showThinking() {
      const div = document.createElement("div");
      div.id = "bch-thinking";
      div.className = "bch-message bch-bot";
      div.innerHTML = `
        <div class="bch-thinking">
          ${randomThinkingFiller()}
          <span class="bch-thinking-dot">.</span>
          <span class="bch-thinking-dot">.</span>
          <span class="bch-thinking-dot">.</span>
        </div>
      `;
      this.chatLog.appendChild(div);
      this.scroll();
    }

    finishThinking() {
      const t = document.getElementById("bch-thinking");
      if (t) t.remove();
    }

    showTyping() {
      const div = document.createElement("div");
      div.id = "bch-typing";
      div.className = "bch-message bch-bot";
      div.innerHTML = `
        <div class="bch-typing-indicator">
          <div class="bch-typing-dot"></div>
          <div class="bch-typing-dot"></div>
          <div class="bch-typing-dot"></div>
        </div>
      `;
      this.chatLog.appendChild(div);
      this.scroll();
    }

    finishTyping() {
      const t = document.getElementById("bch-typing");
      if (t) t.remove();
    }

    addMessage(sender, text, html) {
      const div = document.createElement("div");
      div.className = `bch-message bch-${sender}`;

      const inner = document.createElement("div");
      inner.className = "bch-message-text";

      if (html) {
        inner.innerHTML = text;
        inner.querySelectorAll("a").forEach((a) => {
          a.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = a.href;
          });
        });
      } else {
        inner.textContent = text;
      }

      div.appendChild(inner);
      this.chatLog.appendChild(div);
      this.scroll();
      this.startIdleTimer();
    }

    showSuggestions(entry) {
      if (!entry.links || entry.links.length === 0) return;

      const text = entry.links
        .map((l) => `<a href="${l.href}">${l.text}</a>`)
        .join(" • ");

      const div = document.createElement("div");
      div.className = "bch-message bch-bot";
      div.innerHTML = `
        <div class="bch-message-text" style="border:1px dashed #ccc;background:#f8f8f8;">
          ${text}
        </div>
      `;
      this.chatLog.appendChild(div);
      this.scroll();
    }

    scroll() {
      setTimeout(() => {
        this.chatLog.scrollTop = this.chatLog.scrollHeight;
      }, 10);
    }

    startIdleTimer() {
      clearTimeout(this.idleTimer);

      this.idleTimer = setTimeout(() => {

        if (!this.hasInteracted) return;

        if (document.getElementById("bch-thinking") || document.getElementById("bch-typing")) return;

        this.addMessage("bot", "Still here if you need me! 😊", false);

      }, 20000);
    

    clearChat() {
     this.chatLog.innerHTML = "";
     this.context = { lastTopic: null, history: [] };
     this.showGreeting();
    }
  }

  /************************************************************
   * INITIALIZE
   ************************************************************/

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => new BettaCraftAssistant());
  } else {
    new BettaCraftAssistant();
  }

// Auto-resize assistant when keyboard opens on mobile
if (window.visualViewport) {

  const waitForHelper = setInterval(() => {
    const helper = document.getElementById("bettacraft-helper-root");

    if (helper) {
      clearInterval(waitForHelper);

      window.visualViewport.addEventListener("resize", () => {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;

        const keyboardHeight = windowHeight - viewportHeight;

        if (keyboardHeight > 150) {
          // Keyboard is open
          helper.style.bottom = `${keyboardHeight + 20}px`;
        } else {
          // Keyboard closed
          helper.style.bottom = "1.5rem";
        }
      });
    }
  }, 100);
}

})();
