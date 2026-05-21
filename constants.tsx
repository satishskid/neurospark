import React from 'react';
import { Module } from './types';
import { 
  BrainIcon, CodeBracketIcon, CubeTransparentIcon, DocumentTextIcon, 
  QuestionMarkCircleIcon, ShareIcon, SparklesIcon, CodeBracketSquareIcon, 
  LightBulbIcon, BoltIcon, CpuChipIcon, GlobeAltIcon, UsersIcon, KeyIcon, 
  BuildingStorefrontIcon, PaintBrushIcon, ServerStackIcon, DevicePhoneMobileIcon, 
  WrenchScrewdriverIcon, PuzzlePieceIcon, WindowIcon, BookOpenIcon, 
  FolderOpenIcon, CommandLineIcon, CloudIcon, ComputerDesktopIcon, 
  DocumentDuplicateIcon, FaceSmileIcon, CircleStackIcon, AcademicCapIcon, 
  HomeModernIcon, ArrowDownTrayIcon, ShieldCheckIcon, GlobeAmericasIcon, 
  ServerIcon, GitBranchIcon 
} from './components/Icons';

const Callout = ({ icon, children }: { icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="my-6 p-4 bg-slate-800/50 rounded-lg flex items-start gap-4 border border-slate-700">
        <div className="text-cyan-400 mt-1 flex-shrink-0">{icon}</div>
        <div className="text-slate-300">{children}</div>
    </div>
);

export const CURRICULUM: Module[] = [
  {
    id: 'module-1',
    title: 'Module 1: Software as a Biological System',
    description: 'Deconstruct modern software architecture using clinical anatomy and patient charting.',
    lessons: [
      {
        id: '1-1',
        title: 'The Anatomy of a Medical Application',
        type: 'content',
        estimatedTimeMinutes: 4,
        content: (
          <div className="space-y-4">
            <p>Welcome, Doctor! Entering the world of tech can feel like learning a foreign language. Let&apos;s skip the jargon and translate software architecture into a language you already speak: <strong className="text-cyan-400">Human Biology</strong>.</p>
            <p>Every digital application—from a simple hospital calculator to a global electronic health record (EHR)—functions exactly like a living human body, with specialized systems cooperating to keep the organism running.</p>
            
            <Callout icon={<BrainIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">The Body-Software Mapping System:</p>
              <ul className="mt-2 space-y-3">
                <li>
                  <strong className="text-cyan-400">The Skin & Senses (Frontend):</strong> 
                  The visual storefront (HTML, CSS, React). Like skin, it forms the outer boundary, presenting the app to the world. Like sensory organs (eyes, ears), it detects user interactions—taps, clicks, typed words.
                </li>
                <li>
                  <strong className="text-yellow-400">The Nervous System (APIs):</strong> 
                  Rapid-signaling neural pathways. They carry sensory signals (user clicks) from the exterior skin (frontend) down into the internal visceral organs (backend), and carry metabolic responses back to the skin.
                </li>
                <li>
                  <strong className="text-green-400">The Visceral Organs (Backend):</strong> 
                  The heart, lungs, and liver (Servers, Cloud Functions). Operating silently behind the scenes, these heavy engines digest raw inputs, execute complex logical rules, calculate risks, and drive metabolism.
                </li>
                <li>
                  <strong className="text-purple-400">The Hippocampus (Database):</strong> 
                  Long-term memory storage (Firestore, SQL). Where all patient histories, medication lists, and user configurations are cataloged securely. Without it, the application suffers from global anterograde amnesia.
                </li>
              </ul>
            </Callout>

            <div className="p-5 bg-slate-800/30 border border-slate-700/50 rounded-xl">
              <h4 className="font-bold text-white mb-2 text-lg">🏥 Case Study: The Emergency Room Triage App</h4>
              <p className="text-sm text-slate-300">
                Let&apos;s trace this biological flow in action: A triage nurse uses a tablet app to check in a patient presenting with acute chest pain.
              </p>
              <ol className="mt-3 space-y-2 text-sm text-slate-300 list-decimal list-inside">
                <li>
                  <span className="text-cyan-400 font-semibold">Frontend Sensory Input:</span> The nurse types "chest pain, substernal, radiating to left arm" and enters a heart rate of 115 bpm on the tablet screen.
                </li>
                <li>
                  <span className="text-yellow-400 font-semibold">Nervous System (API) Signal:</span> The moment the nurse hits "Triage," a neural signaling packet (an API request) is fired off through the network.
                </li>
                <li>
                  <span className="text-green-400 font-semibold">Backend Organ Processing:</span> The signal reaches the server (the heart/liver). The backend engine runs a risk-stratification algorithm (e.g., HEART Score). It determines this is a high-risk cardiac alert.
                </li>
                <li>
                  <span className="text-purple-400 font-semibold">Hippocampus Memory Storage:</span> The backend commits the patient&apos;s symptoms and priority score to the database, ensuring it is permanently saved in the chart history.
                </li>
                <li>
                  <span className="text-cyan-400 font-semibold">Frontend Sensory Response:</span> The API fires back a message, and the tablet screen immediately flashes a red border, prompting: <em className="text-red-400 font-semibold">"ESCORT TO RESUSCITATION ROOM 1 IMMEDIATELY."</em>
                </li>
              </ol>
            </div>
            
            <p className="mt-4">By understanding this flow, you can now diagnose software bugs like clinical symptoms: a UI that won&apos;t load is a skin/sensory issue, a lagging response is a slow neural synapse (API latency), and a lost record is a hippocampal (database) failure.</p>
          </div>
        )
      },
      {
        id: '1-2',
        title: 'The Clinical Chart of Data (JSON)',
        type: 'exercise',
        estimatedTimeMinutes: 5,
        exercise: {
          prompt: (
            <div className="space-y-3">
              <p>In medicine, you write progress notes using a standard format (like SOAP notes) so that other doctors, nurses, and pharmacists can read your chart instantly. In software, apps do the exact same thing using <strong className="text-cyan-400">JSON (JavaScript Object Notation)</strong>.</p>
              <p>JSON is just a digital clinical chart. It uses <strong className="text-yellow-400">"keys"</strong> (symptom names or labels) mapped to <strong className="text-green-400">"values"</strong> (symptom descriptions or numbers). Every key is placed in double quotes, followed by a colon, and separated by commas.</p>
              
              <Callout icon={<CodeBracketSquareIcon className="w-8 h-8" />}>
                <p className="font-semibold text-white">How a SOAP Note translates to JSON:</p>
                <div className="mt-2 p-3 bg-slate-900 rounded-md font-mono text-xs text-slate-300">
                  {`{`}
                  <div className="pl-4"><span className="text-yellow-400">"patientName"</span>: <span className="text-green-400">"John Doe"</span>,</div>
                  <div className="pl-4"><span className="text-yellow-400">"chiefComplaint"</span>: <span className="text-green-400">"chest pain"</span>,</div>
                  <div className="pl-4"><span className="text-yellow-400">"heartRateBpm"</span>: <span className="text-green-400">108</span>,</div>
                  <div className="pl-4"><span className="text-yellow-400">"needsEcg"</span>: <span className="text-green-400">true</span></div>
                  {`}`}
                </div>
              </Callout>
              
              <p className="font-bold text-white">Your Turn:</p>
              <p>Let&apos;s practice writing a structured digital chart (JSON) for a new patient. Inside the curly braces, modify the JSON code to represent a patient presenting with an <code className="text-cyan-400">"appendicitis"</code> diagnosis, an age of <code className="text-cyan-400">24</code>, and set a key named <code className="text-cyan-400">"needsSurgery"</code> to <code className="text-cyan-400">true</code>.</p>
            </div>
          ),
          evaluationPrompt: `Evaluate the user's JSON. The JSON must be valid. It must contain the keys "diagnosis" (with value "appendicitis" or similar), "age" (with value 24 as a number), and "needsSurgery" (with value true as a boolean).`,
          initialCode: `{\n  "patientName": "Sarah Jenkins",\n  "diagnosis": "appendicitis",\n  "age": 24,\n  "needsSurgery": true\n}`
        }
      },
      {
        id: '1-3',
        title: 'Quiz: Software Biology',
        type: 'quiz',
        estimatedTimeMinutes: 3,
        quiz: {
          questions: [
            {
              question: 'If a clinician updates a patient\'s medication list on their screen, which "biological system" acts as the long-term memory to save that record?',
              options: ['The Frontend (Skin & Senses)', 'The API (Nervous System)', 'The Backend (Visceral Organs)', 'The Database (Hippocampus)'],
              correctAnswer: 'The Database (Hippocampus)'
            },
            {
              question: 'In a JSON dataset, what is the syntax structure used to pair clinical labels to their values?',
              options: ['Key-Value pairs separated by colons and wrapped in curly braces', 'Paragraphs of text separated by semicolons', 'Lists of numbers separated by dashes', 'Folders and subfolders inside a database drive'],
              correctAnswer: 'Key-Value pairs separated by colons and wrapped in curly braces'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Module 2: Anatomy & Physiology of the LLM Brain',
    description: 'Learn how large language models think, recall medical facts, and process clinical text.',
    lessons: [
      {
        id: '2-1',
        title: 'Neurons of Meaning: Tokens & Embeddings',
        type: 'content',
        estimatedTimeMinutes: 4,
        videoLinks: [
          { title: 'Large Language Models explained briefly', url: 'https://youtu.be/LPZh9BOjkQs?si=v4N29hhFN-My7SXR' },
          { title: 'How Large Language Models Work', url: 'https://youtu.be/5sLYAQS9sWQ?si=LHjdVtAC4JwIkutd' }
        ],
        content: (
          <div className="space-y-4">
            <p>How does an AI read a medical textbook? It doesn&apos;t see letters or words. It turns text into numbers. Let&apos;s break this down into two simple concepts: <strong className="text-cyan-400">Tokens</strong> and <strong className="text-cyan-400">Embeddings</strong>.</p>
            
            <Callout icon={<PuzzlePieceIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">1. Tokens (The Syllables)</p>
              <p className="mt-2 text-slate-300">An LLM chops words into tiny pieces called <strong>Tokens</strong>. A common word like "Heart" is 1 token. A complex word like "Levothyroxine" gets chopped into four pieces: "Levo", "thy", "rox", "ine".</p>
            </Callout>

            <Callout icon={<GlobeAmericasIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">2. Embeddings (The GPS Map)</p>
              <p className="mt-2 text-slate-300">Once words are chopped up, the AI gives them a mathematical GPS coordinate on a giant 3D map. This map is called an <strong>Embedding</strong>.</p>
              <ul className="list-disc list-inside mt-3 pl-2 space-y-2 text-sm text-slate-300">
                <li>Words with similar meanings (like <strong className="text-cyan-400">"chest pain"</strong> and <strong className="text-cyan-400">"angina"</strong>) are placed right next to each other on the map.</li>
                <li>Totally unrelated words (like <strong className="text-red-400">"cabbage"</strong>) are placed thousands of miles away.</li>
              </ul>
            </Callout>

            <div className="p-5 bg-slate-800/30 border border-slate-700/50 rounded-xl">
              <h4 className="font-bold text-white mb-2 text-lg">🔬 Why this matters clinically</h4>
              <p className="text-sm text-slate-300">
                Because "shortness of breath" and "winded" are located in the same neighborhood on the AI&apos;s map, the model actually understands the <em>concept</em> of the symptom, rather than just doing a rigid keyword search.
              </p>
            </div>
          </div>
        )
      },
      {
        id: '2-2',
        title: 'The AI Brain: Transformers & Next-Token Prediction',
        type: 'content',
        estimatedTimeMinutes: 5,
        videoLinks: [
          { title: 'But what is a neural network?', url: 'https://youtu.be/aircAruvnKk?si=Wg1RuoKtYVfMQj2Z' },
          { title: 'Transformers, the tech behind LLMs', url: 'https://youtu.be/wjZofJX0v4M?si=mG8HXUjg7P14cc7o' },
          { title: 'How LLMs Actually Generate Text', url: 'https://youtu.be/NKnZYvZA7w4?si=C9ptbpxfsIvoxiUb' }
        ],
        content: (
          <div className="space-y-4">
            <p>At its core, an LLM is doing one incredibly simple thing over and over again: <strong className="text-cyan-400">Predicting the next word</strong>. It is exactly like the autocomplete feature on your iPhone, but scaled up by a trillion times.</p>
            
            <Callout icon={<BrainIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Next-Token Prediction</p>
              <p className="mt-2 text-slate-300">If you type: <em>"The patient has a history of severe..."</em>, the AI looks at the map of words and calculates the probability of the next word. It might calculate: "allergies" (40%), "asthma" (30%), "pain" (20%), "cabbage" (0.0001%). It picks the highest probability word and writes it down. Then, it repeats the process.</p>
            </Callout>

            <Callout icon={<BoltIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">The "Transformer" (Attention Mechanism)</p>
              <p className="mt-2 text-slate-300">How does it know which word to predict so accurately? It uses a revolutionary architecture called the <strong>Transformer</strong>. The secret sauce of the Transformer is <em>Self-Attention</em>.</p>
              <p className="mt-2 text-slate-300 text-sm">Imagine a triage nurse reading a 50-page messy patient chart. The nurse pays intense <strong>attention</strong> to the phrase <em>"Allergy: Penicillin"</em> on page 1, and ignores the phrase <em>"Patient wore a blue shirt"</em> on page 2. Transformers do exactly this. They mathematically "pay attention" to the most clinically relevant words in your prompt, no matter how far apart they are.</p>
            </Callout>

            <div className="p-5 bg-slate-800/30 border border-slate-700/50 rounded-xl mt-4">
              <h4 className="font-bold text-white mb-2 text-lg">💾 Context Window</h4>
              <p className="text-sm text-slate-300">
                The <strong>Context Window</strong> is simply how much text the AI can "pay attention" to at one time. Older models were like a doctor who could only remember the last 2 pages of a chart. Modern models (like Gemini) have massive context windows—they can read a 500-page medical record and hold the entire thing in their working memory simultaneously.
              </p>
            </div>
          </div>
        )
      },
      {
        id: '2-3',
        title: 'Multimodality (The Senses of AI)',
        type: 'content',
        estimatedTimeMinutes: 5,
        content: (
          <div className="space-y-4">
            <p>Medicine isn&apos;t just text. It is visual, auditory, and kinetic. The most advanced AI models have evolved to become <strong className="text-cyan-400">Multimodal</strong>, meaning they can process images, audio, and text at the same time.</p>
            
            <Callout icon={<FaceSmileIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Giving the AI Eyes and Ears</p>
              <p className="text-slate-300 mt-2">
                Standard text LLMs are like diagnosing a patient over the phone. You only know what the patient explicitly tells you. <strong className="text-white">Multimodal models</strong> are like standing in the exam room.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300 list-disc list-inside">
                <li><strong className="text-cyan-400">Vision:</strong> They can look at a chest X-ray or a photograph of a rash.</li>
                <li><strong className="text-yellow-400">Audio:</strong> They can listen to a live patient interview and capture nuances like a cough.</li>
              </ul>
            </Callout>

            <div className="p-5 bg-slate-800/30 border border-slate-700/50 rounded-xl mt-4">
              <h4 className="font-bold text-white mb-2 text-lg">🧬 The Unified Map</h4>
              <p className="text-sm text-slate-300">
                How does this work? The AI takes the photograph of the rash and translates it into the <em>exact same GPS map</em> as the text words. So a picture of a bullseye rash and the text "Erythema migrans" live in the exact same mathematical spot in the AI&apos;s brain.
              </p>
            </div>
          </div>
        )
      },
      {
        id: '2-4',
        title: 'Quiz: LLM Physiology & Multimodality',
        type: 'quiz',
        estimatedTimeMinutes: 3,
        quiz: {
          questions: [
            {
              question: 'Which AI architecture allows the model to prioritize clinically relevant words (like "Penicillin Allergy") while ignoring irrelevant background text?',
              options: ['The Hippocampus Database', 'The Transformer (Attention Mechanism)', 'The Context Window', 'Next-Token Prediction'],
              correctAnswer: 'The Transformer (Attention Mechanism)'
            },
            {
              question: 'Fundamentally, what is a Large Language Model doing when it writes a paragraph of text?',
              options: ['Searching Google for the exact paragraph and pasting it.', 'Calculating the mathematical probability of the single next word, over and over again, like a supercharged autocomplete.', 'Writing HTML code directly to the backend.', 'Translating images into audio files.'],
              correctAnswer: 'Calculating the mathematical probability of the single next word, over and over again, like a supercharged autocomplete.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Module 3: Clinicians as "Vibe Coders"',
    description: 'Learn to build complete clinical applications and guide AI clinical reasoning using advanced prompting.',
    lessons: [
      {
        id: '3-1',
        title: 'Directing the Digital Resident (AI Coding)',
        type: 'content',
        estimatedTimeMinutes: 4,
        content: (
          <div className="space-y-4">
            <p>For decades, building a custom medical tool meant hiring programmers, waiting months, and spending tens of thousands of dollars. Today, you can build full-scale software yourself by becoming a <strong className="text-cyan-400">"Vibe Coder"</strong>.</p>
            <p>Vibe coding is the art of directing code generation engines using natural language. You don&apos;t write code; you direct it, exactly like supervising a brilliant but highly literal resident physician.</p>

            <Callout icon={<WrenchScrewdriverIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Guidelines for Supervising the Digital Resident:</p>
              <ul className="mt-2 space-y-3 text-sm text-slate-300">
                <li>
                  <strong className="text-cyan-400">1. Define the Clinical Persona:</strong> 
                  Begin your prompt by giving the AI a clear professional role. <em>"Act as a Senior Clinical Informatics Specialist with 20 years of experience building secure EHR workflows."</em>
                </li>
                <li>
                  <strong className="text-yellow-400">2. Give Explicit Clinical Guardrails:</strong> 
                  Tell the resident what to avoid. <em>"Ensure this pediatric dosage calculator automatically caps the dosage at the adult maximum weight."</em>
                </li>
              </ul>
            </Callout>

            <div className="p-5 bg-slate-800/30 border border-slate-700/50 rounded-xl">
              <h4 className="font-bold text-white mb-2 text-lg">🛠️ Vibe Coding Example: Pediatric Dosage Tool</h4>
              <p className="text-sm text-slate-300">
                Imagine you want to build a web-based dosage calculator for Amoxicillin based on a child&apos;s weight. You "vibe code" it by telling the AI:
              </p>
              <blockquote className="mt-2 pl-3 border-l-4 border-cyan-500 text-xs italic text-slate-400">
                "Build a clean single-page web app with a dark theme. It must have an input field for patient weight in kilograms... Implement strict guardrails: if the weight exceeds 40kg, display a warning."
              </blockquote>
            </div>
          </div>
        )
      },
      {
        id: '3-2',
        title: 'Advanced Clinical Reasoning: Chain-of-Thought',
        type: 'content',
        estimatedTimeMinutes: 5,
        content: (
          <div className="space-y-4">
            <p>Vibe coding is great for building apps, but what about using AI to assist in complex clinical diagnoses? A standard prompt can lead to <strong className="text-red-400">Premature Closure</strong>—the AI jumping to the most obvious conclusion without considering zebras.</p>
            
            <Callout icon={<SparklesIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Chain-of-Thought (CoT) Prompting</p>
              <p className="text-slate-300 mt-2">
                You can fundamentally improve the AI&apos;s accuracy by forcing it to "show its math" before it delivers a final answer. This mimics the cognitive forcing strategies taught in medical school.
              </p>
              <div className="mt-3 p-3 bg-slate-900 rounded border border-slate-700 font-mono text-xs text-slate-300">
                <span className="text-red-400 font-bold">Standard Prompt (Prone to Error):</span><br/>
                "Patient has right lower quadrant pain and fever. What is the diagnosis?"<br/><br/>
                <span className="text-green-400 font-bold">Chain-of-Thought Prompt (Highly Accurate):</span><br/>
                "A 24yo female presents with RLQ pain and fever. <strong>Before giving a final diagnosis, think step-by-step.</strong> 1. List the top 5 differential diagnoses across all organ systems. 2. State the key clinical findings that support or refute each. 3. Propose the next best imaging step. 4. Finally, state the most likely diagnosis."
              </div>
            </Callout>

            <p className="mt-4">By forcing the AI to generate intermediate reasoning steps, it activates different pathways in its neural network, significantly reducing hallucinations and improving diagnostic safety.</p>
          </div>
        )
      },
      {
        id: '3-3',
        title: 'Quiz: Prompting & Reasoning',
        type: 'quiz',
        estimatedTimeMinutes: 3,
        quiz: {
          questions: [
            {
              question: 'When "vibe coding" an application, why is it important to define a specific Persona and Clinical Guardrails?',
              options: ['Because AI requires payment based on the persona\'s salary.', 'Because AI models are literal and without boundaries, they might build generic or unsafe features unless explicitly constrained by clinical rules.', 'Because the database will reject code that doesn\'t have a persona attached.', 'Because Figma requires a persona to render CSS.'],
              correctAnswer: 'Because AI models are literal and without boundaries, they might build generic or unsafe features unless explicitly constrained by clinical rules.'
            },
            {
              question: 'How does Chain-of-Thought (CoT) prompting improve AI diagnostic safety?',
              options: ['It forces the AI to search Google before answering.', 'It prevents "premature closure" by forcing the model to generate intermediate reasoning steps (like a differential diagnosis) before jumping to a final conclusion.', 'It encrypts the patient\'s PHI automatically.', 'It reduces the context window size to save GPU power.'],
              correctAnswer: 'It prevents "premature closure" by forcing the model to generate intermediate reasoning steps (like a differential diagnosis) before jumping to a final conclusion.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-4',
    title: 'Module 4: The Hippocratic Oath for Clinical AI',
    description: 'Enforce patient privacy, diagnose AI hallucinations, and master Retrieval-Augmented Generation (RAG).',
    lessons: [
      {
        id: '4-1',
        title: 'Preserving Patient Privacy: HIPAA & PHI',
        type: 'content',
        estimatedTimeMinutes: 4,
        content: (
          <div className="space-y-4">
            <p>As physicians, our first duty is to do no harm. In the era of artificial intelligence, that duty translates directly to <strong className="text-cyan-400">protecting patient privacy and enforcing security standards</strong>.</p>
            
            <Callout icon={<ShieldCheckIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">The Golden Rule of Clinical AI:</p>
              <p className="text-red-400 font-bold">NEVER input raw patient identifiers into standard consumer AI models (like public ChatGPT, Claude, or Gemini search portals).</p>
            </Callout>

            <Callout icon={<KeyIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">How to Safely Use AI in Medicine:</p>
              <ul className="mt-2 space-y-3 text-sm text-slate-300">
                <li>
                  <strong className="text-cyan-400">1. Strict De-identification:</strong> Remove all 18 HIPAA identifiers.
                </li>
                <li>
                  <strong className="text-yellow-400">2. Business Associate Agreements (BAAs):</strong> 
                  Only input raw data into enterprise environments where the vendor legally guarantees <strong className="text-white">Zero-Data Retention</strong>, promising inputs are never used to train future models.
                </li>
              </ul>
            </Callout>
          </div>
        )
      },
      {
        id: '4-2',
        title: 'The Open-Book Exam: RAG',
        type: 'content',
        estimatedTimeMinutes: 5,
        content: (
          <div className="space-y-4">
            <p>If LLMs can hallucinate because they answer from memory, how do hospitals use AI safely? The answer is <strong className="text-cyan-400">Retrieval-Augmented Generation (RAG)</strong>.</p>
            
            <Callout icon={<BookOpenIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">RAG: The AI\'s Medical Library</p>
              <p className="text-slate-300 mt-2">
                Instead of asking the AI a question and letting it guess from its pre-trained synaptic weights, RAG forces the AI to take an "open-book exam".
              </p>
              <ol className="mt-3 space-y-2 text-sm text-slate-300 list-decimal list-inside">
                <li><strong className="text-cyan-400">Retrieve:</strong> When you ask a question (e.g., "What are our hospital\'s sepsis protocols?"), the system first searches a verified database (like your hospital\'s internal PDF guidelines).</li>
                <li><strong className="text-yellow-400">Augment:</strong> It pulls the exact paragraphs from that PDF and pastes them invisibly into the AI\'s Context Window.</li>
                <li><strong className="text-green-400">Generate:</strong> The AI is instructed: <em>"Answer the doctor's question using ONLY the provided text. Cite the page number."</em></li>
              </ol>
            </Callout>

            <div className="p-5 bg-slate-800/30 border border-slate-700/50 rounded-xl mt-4">
              <h4 className="font-bold text-white mb-2 text-lg">🏥 Why RAG is the Future of EHRs</h4>
              <p className="text-sm text-slate-300">
                By grounding the AI in verified reality, RAG nearly eliminates hallucinations. When an AI tool inside an EHR summarizes a patient chart, it is using RAG to fetch the exact lab results and consult notes from the database, rather than making them up.
              </p>
            </div>
          </div>
        )
      },
      {
        id: '4-3',
        title: 'Quiz: Privacy & RAG',
        type: 'quiz',
        estimatedTimeMinutes: 3,
        quiz: {
          questions: [
            {
              question: 'What is the primary benefit of Retrieval-Augmented Generation (RAG) in a clinical setting?',
              options: ['It makes the AI run faster on mobile devices.', 'It prevents hallucinations by forcing the AI to answer based strictly on verified, retrieved documents rather than relying on its internal memory.', 'It automatically bills insurance companies for the consultation.', 'It encrypts the patient\'s data.'],
              correctAnswer: 'It prevents hallucinations by forcing the AI to answer based strictly on verified, retrieved documents rather than relying on its internal memory.'
            },
            {
              question: 'You are using an enterprise AI with a signed BAA (Zero-Data Retention policy). Is it acceptable to input PHI?',
              options: ['Yes, because the vendor legally guarantees the data is securely processed, not stored, and not used for training.', 'No, PHI can never touch any AI system under any circumstance.', 'Yes, but only if the patient signs a specific waiver for that AI model.', 'No, BAAs only cover financial data.'],
              correctAnswer: 'Yes, because the vendor legally guarantees the data is securely processed, not stored, and not used for training.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-5',
    title: 'Module 5: Clinical Workflows in Action',
    description: 'Master high-yield workflows: automatic prior authorizations, Agentic AI, and custom SOAP notes.',
    lessons: [
      {
        id: '5-1',
        title: 'High-Yield Medical Workflows',
        type: 'content',
        estimatedTimeMinutes: 4,
        content: (
          <div className="space-y-4">
            <p>Let&apos;s unlock the ultimate superpower of clinical AI: <strong className="text-cyan-400">Workflow Automation</strong>.</p>
            <p>Every single day, clinicians lose up to 40% of their working hours to administrative burdens. AI can instantly automate these administrative taxations.</p>

            <Callout icon={<DocumentTextIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Three High-Yield Automations for Your Practice:</p>
              <ul className="mt-2 space-y-4 text-sm text-slate-300">
                <li>
                  <strong className="text-cyan-400">1. Prior Authorization & Appeal Letters:</strong> 
                  Feed insurance denial criteria and sanitized clinical facts to draft an evidence-based appeal letter citing objective findings.
                </li>
                <li>
                  <strong className="text-yellow-400">2. Medical Translation & Patient Handouts:</strong> 
                  Translate complex discharge summaries into 5th-grade reading level handouts highlighting medications and red-flag symptoms.
                </li>
                <li>
                  <strong className="text-green-400">3. Rapid Research Syntheses:</strong> 
                  Extract absolute numbers, hazard ratios, and adverse events from 30-page PDF clinical trials and format them into comparison tables.
                </li>
              </ul>
            </Callout>
          </div>
        )
      },
      {
        id: '5-2',
        title: 'Agentic AI & Tool Use (The Autonomous Resident)',
        type: 'content',
        estimatedTimeMinutes: 5,
        content: (
          <div className="space-y-4">
            <p>The next frontier is moving from passive chatbots to <strong className="text-cyan-400">Agentic AI</strong>. An agent doesn&apos;t just chat with you; it can take actions on your behalf using digital tools.</p>

            <Callout icon={<CpuChipIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Equipping the AI with Tools</p>
              <p className="text-slate-300 mt-2">
                Through APIs (the Nervous System), developers can give an AI model tools like calculators, web browsers, or database access.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300 list-disc list-inside">
                <li><strong className="text-cyan-400">The Calculator Tool:</strong> Instead of guessing a math equation (which LLMs are bad at), an agentic AI recognizes it needs to do math, writes a Python script, runs it in a calculator tool, and returns the exact verified number.</li>
                <li><strong className="text-yellow-400">The EHR Tool:</strong> An AI agent is told "Schedule a follow up for Mrs. Smith in 2 weeks." It uses a scheduling tool API to find an open slot and book it autonomously.</li>
              </ul>
            </Callout>
            
            <p className="mt-4">Agentic workflows are the equivalent of upgrading from a medical textbook (which just gives you information) to a resident physician (who can synthesize the information, page the consult, and place the lab order).</p>
          </div>
        )
      },
      {
        id: '5-3',
        title: 'Quiz: Workflows & Agents',
        type: 'quiz',
        estimatedTimeMinutes: 3,
        quiz: {
          questions: [
            {
              question: 'What is the defining characteristic of an "Agentic AI" compared to a standard chatbot?',
              options: ['It has a larger context window.', 'It can autonomously utilize external tools (like calculators or EHR APIs) to take actions and complete multi-step tasks.', 'It can run on mobile devices without an internet connection.', 'It never hallucinates.'],
              correctAnswer: 'It can autonomously utilize external tools (like calculators or EHR APIs) to take actions and complete multi-step tasks.'
            },
            {
              question: 'Which of the following clinical administration tasks is best suited for automation with an LLM under human supervision?',
              options: ['Directly prescribing controlled substances to a patient without scheduling an interview.', 'Automatically drafting insurance prior authorization appeal letters by cross-referencing patient records with clinical criteria.', 'Performing complex laparoscopic surgeries using local cache files.', 'Hosting the hospital\'s secure database directly on the browser\'s frontend.'],
              correctAnswer: 'Automatically drafting insurance prior authorization appeal letters by cross-referencing patient records with clinical criteria.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-6',
    title: 'Module 6: The Clinical AI Landscape',
    description: 'A clinician\'s guide to navigating the modern ecosystem of specialized AI models and tools.',
    lessons: [
      {
        id: '6-1',
        title: 'The Big Three: Gemini, ChatGPT & Claude',
        type: 'content',
        estimatedTimeMinutes: 5,
        content: (
          <div className="space-y-4">
            <p>The AI landscape moves at blistering speed. While all frontier models are incredibly capable, they each have distinct "personalities" and clinical strengths. Here is how to choose the right resident for the job.</p>

            <Callout icon={<BrainIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Google Gemini (The Multimodal Researcher)</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li><strong className="text-cyan-400">Strengths:</strong> Has an unmatched massive context window (up to 2 million tokens). It is the best tool for dropping in entire libraries of medical PDFs, analyzing long patient histories, and natively understanding medical imaging.</li>
                <li><strong className="text-white">Specialized Variant:</strong> <em className="text-cyan-200">Gemini for Science / Med-PaLM</em> is Google's medically fine-tuned version, specifically trained to answer USMLE questions and synthesize clinical literature with high accuracy.</li>
              </ul>
            </Callout>

            <Callout icon={<ChatBubbleLeftRightIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">ChatGPT / OpenAI (The Creative Workhorse)</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li><strong className="text-green-400">Strengths:</strong> Incredible at code generation, reasoning (especially the `o1` and `o3` models that use intense Chain-of-Thought), and generating patient-friendly biology/anatomy explanations.</li>
                <li><strong className="text-white">Best Use:</strong> "Vibe coding" clinical apps, drafting nuanced patient communication, and complex logical reasoning tasks.</li>
              </ul>
            </Callout>

            <Callout icon={<DocumentTextIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Claude by Anthropic (The Careful Scribe)</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li><strong className="text-yellow-400">Strengths:</strong> Built with "Constitutional AI," Claude is heavily focused on safety and nuance. It has beautiful, highly professional prose.</li>
                <li><strong className="text-white">Best Use:</strong> Writing pristine referral letters, drafting sensitive patient breaking-bad-news scripts, and deeply nuanced chart summaries. It rarely hallucinates without heavily qualifying its uncertainty.</li>
              </ul>
            </Callout>
          </div>
        )
      },
      {
        id: '6-2',
        title: 'Specialized Clinical AI: Perplexity & Beyond',
        type: 'content',
        estimatedTimeMinutes: 4,
        content: (
          <div className="space-y-4">
            <p>Beyond the "Big Three" generalists, there are tools built specifically for finding objective truth and streamlining daily workflows.</p>

            <Callout icon={<GlobeAltIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Perplexity (The AI Search Engine)</p>
              <p className="text-slate-300 mt-2 text-sm">
                Perplexity is a search engine built entirely on RAG (Retrieval-Augmented Generation). Instead of chatting with an LLM's memory, Perplexity searches the live internet (or PubMed), reads the top 20 links, and writes a synthesis <strong className="text-white">with inline footnote citations</strong>.
              </p>
              <p className="text-slate-300 mt-2 text-sm">
                <em className="text-cyan-400">Clinical use case:</em> "What are the latest 2025 guidelines for managing hypertensive crisis in pregnant patients?" Perplexity will give you the answer heavily cited with links to ACOG or current medical journals.
              </p>
            </Callout>

            <Callout icon={<ComputerDesktopIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">OpenRouter / Model Aggregators</p>
              <p className="text-slate-300 mt-2 text-sm">
                Platforms like OpenRouter allow you to access almost every AI model on earth (Claude, Gemini, Llama, ChatGPT) through a single dashboard. It's the ultimate playground for testing which "digital resident" is best at your specific clinical specialty.
              </p>
            </Callout>

            <div className="p-5 bg-slate-800/30 border border-slate-700/50 rounded-xl mt-4">
              <h4 className="font-bold text-white mb-2 text-lg">🚀 The Takeaway</h4>
              <p className="text-sm text-slate-300">
                No single AI model rules them all. The modern physician's superpower is knowing which tool to pull from the bag: Gemini for mass literature review, Claude for drafting sensitive clinical notes, ChatGPT for coding tools, and Perplexity for live-cited medical research.
              </p>
            </div>
          </div>
        )
      },
      {
        id: '6-3',
        title: 'Quiz: The AI Landscape',
        type: 'quiz',
        estimatedTimeMinutes: 2,
        quiz: {
          questions: [
            {
              question: 'Which tool is built specifically as a Retrieval-Augmented Generation (RAG) search engine that provides inline footnote citations to verified sources?',
              options: ['Perplexity', 'ChatGPT', 'Figma', 'Supabase'],
              correctAnswer: 'Perplexity'
            },
            {
              question: 'If you needed to feed an entire 100-page textbook of medical guidelines into an AI to extract a summary, which model\'s massive context window makes it the best choice?',
              options: ['Google Gemini', 'A basic SQL Database', 'A clinical calculator', 'HTML/CSS'],
              correctAnswer: 'Google Gemini'
            }
          ]
        }
      }
    ]
  }
];
