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
  ServerIcon, GitBranchIcon, ChatBubbleLeftRightIcon, TrophyIcon
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
    description: 'Deconstruct modern software architecture using clinical anatomy.',
    lessons: [
      {
        id: '1-1',
        title: 'The Anatomy of a Medical Application',
        type: 'content',
        estimatedTimeMinutes: 4,
        videoLinks: [
          { title: 'What is an API?', url: 'https://youtu.be/s7wmiS2mSXY' }
        ],
        content: (
          <div className="space-y-4">
            <p>Welcome, Doctor! Entering the world of tech can feel like learning a foreign language. Let&apos;s skip the jargon and translate software architecture into a language you already speak: <strong className="text-cyan-400">Human Biology</strong>.</p>
            
            <Callout icon={<BrainIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">The Body-Software Map</p>
              <ul className="mt-2 space-y-3">
                <li>
                  <strong className="text-cyan-400">The Skin & Senses (Frontend):</strong> 
                  The visual screen you tap on. Like skin, it is the outer boundary. Like eyes, it detects interactions (clicks and taps).
                </li>
                <li>
                  <strong className="text-yellow-400">The Nervous System (APIs):</strong> 
                  The rapid-signaling neural pathways. When you click a button, the API carries that sensory signal from the skin down to the internal organs.
                </li>
                <li>
                  <strong className="text-green-400">The Visceral Organs (Backend):</strong> 
                  The heavy engines (Servers). They sit silently in the dark, digesting inputs and executing complex clinical risk scores.
                </li>
                <li>
                  <strong className="text-purple-400">The Hippocampus (Database):</strong> 
                  Long-term memory storage. Where all patient histories are locked away safely.
                </li>
              </ul>
            </Callout>

            <div className="p-5 bg-slate-800/30 border border-slate-700/50 rounded-xl">
              <h4 className="font-bold text-white mb-2 text-lg">🏥 Triage App Example</h4>
              <p className="text-sm text-slate-300">
                You type "chest pain" on the iPad (<strong className="text-cyan-400">Frontend</strong>). The signal fires down the nerve (<strong className="text-yellow-400">API</strong>) to the heart/liver (<strong className="text-green-400">Backend</strong>). The engine calculates a high HEART score, saves it to long-term memory (<strong className="text-purple-400">Database</strong>), and fires a signal back to the iPad causing it to flash red.
              </p>
            </div>
          </div>
        )
      },
      {
        id: '1-2',
        title: 'The Clinical Chart of Data (JSON)',
        type: 'exercise',
        estimatedTimeMinutes: 5,
        videoLinks: [
          { title: 'JSON in 100 Seconds', url: 'https://youtu.be/iiADhChRriM' }
        ],
        exercise: {
          prompt: (
            <div className="space-y-3">
              <p>In medicine, you write progress notes using a standard format (SOAP) so everyone can read your chart. In software, apps do the exact same thing using a format called <strong className="text-cyan-400">JSON</strong>.</p>
              
              <Callout icon={<CodeBracketSquareIcon className="w-8 h-8" />}>
                <p className="font-semibold text-white">JSON: The Digital Chart</p>
                <p className="mt-2 text-sm text-slate-300">JSON simply maps <strong className="text-yellow-400">"labels"</strong> to <strong className="text-green-400">"values"</strong>.</p>
                <div className="mt-2 p-3 bg-slate-900 rounded-md font-mono text-xs text-slate-300">
                  {`{`}
                  <div className="pl-4"><span className="text-yellow-400">"patientName"</span>: <span className="text-green-400">"John Doe"</span>,</div>
                  <div className="pl-4"><span className="text-yellow-400">"chiefComplaint"</span>: <span className="text-green-400">"chest pain"</span>,</div>
                  <div className="pl-4"><span className="text-yellow-400">"heartRateBpm"</span>: <span className="text-green-400">108</span></div>
                  {`}`}
                </div>
              </Callout>
              
              <p className="font-bold text-white">Your Turn:</p>
              <p>Modify the JSON code below to represent a patient presenting with <code className="text-cyan-400">"appendicitis"</code>, an age of <code className="text-cyan-400">24</code>, and set <code className="text-cyan-400">"needsSurgery"</code> to <code className="text-cyan-400">true</code>.</p>
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
              question: 'Which "biological system" acts as the long-term memory to save patient records?',
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
          { title: 'Large Language Models explained briefly', url: 'https://youtu.be/LPZh9BOjkQs' },
          { title: 'How Large Language Models Work', url: 'https://youtu.be/5sLYAQS9sWQ' }
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
          { title: 'But what is a neural network?', url: 'https://youtu.be/aircAruvnKk' },
          { title: 'Transformers, the tech behind LLMs', url: 'https://youtu.be/wjZofJX0v4M' },
          { title: 'How LLMs Actually Generate Text', url: 'https://youtu.be/NKnZYvZA7w4' }
        ],
        content: (
          <div className="space-y-4">
            <p>At its core, an LLM is doing one incredibly simple thing over and over again: <strong className="text-cyan-400">Predicting the next word</strong>. It is exactly like the autocomplete feature on your iPhone, but scaled up by a trillion times.</p>
            
            <Callout icon={<BrainIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Next-Token Prediction</p>
              <p className="mt-2 text-slate-300">If you type: <em>"The patient has a history of severe..."</em>, the AI looks at the map of words and calculates the probability of the next word. It might calculate: "allergies" (40%), "asthma" (30%), "pain" (20%). It picks the highest probability word and writes it down. Then, it repeats the process.</p>
            </Callout>

            <Callout icon={<BoltIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">The "Transformer" (Attention Mechanism)</p>
              <p className="mt-2 text-slate-300 text-sm">Imagine a triage nurse reading a 50-page messy patient chart. The nurse pays intense <strong>attention</strong> to the phrase <em>"Allergy: Penicillin"</em> on page 1, and ignores the phrase <em>"Patient wore a blue shirt"</em> on page 2. Transformers do exactly this. They mathematically "pay attention" to the most clinically relevant words in your prompt, no matter how far apart they are.</p>
            </Callout>

            <div className="p-5 bg-slate-800/30 border border-slate-700/50 rounded-xl mt-4">
              <h4 className="font-bold text-white mb-2 text-lg">💾 Context Window</h4>
              <p className="text-sm text-slate-300">
                The <strong>Context Window</strong> is how much text the AI can "pay attention" to at one time. Modern models (like Gemini) have massive context windows—they can read a 500-page medical record and hold the entire thing in their working memory simultaneously.
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
                Standard text LLMs are like diagnosing a patient over the phone. <strong className="text-white">Multimodal models</strong> are like standing in the exam room.
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
    description: 'Learn to build complete clinical applications and guide AI clinical reasoning.',
    lessons: [
      {
        id: '3-1',
        title: 'Directing the Digital Resident (AI Coding)',
        type: 'content',
        estimatedTimeMinutes: 4,
        videoLinks: [
          { title: 'Prompt Engineering Tutorial', url: 'https://youtu.be/jC4v5AS4ART' }
        ],
        content: (
          <div className="space-y-4">
            <p>Today, you can build full-scale clinical software yourself by becoming a <strong className="text-cyan-400">"Vibe Coder"</strong>.</p>
            <p>Vibe coding is the art of directing AI using natural language. You don&apos;t write code; you direct it, exactly like supervising a brilliant but highly literal resident physician.</p>

            <Callout icon={<WrenchScrewdriverIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Prompting Guidelines</p>
              <ul className="mt-2 space-y-3 text-sm text-slate-300">
                <li>
                  <strong className="text-cyan-400">1. Define the Persona:</strong> 
                  Give the AI a role. <em>"Act as a Senior Clinical Informatics Specialist."</em>
                </li>
                <li>
                  <strong className="text-yellow-400">2. Set Clinical Guardrails:</strong> 
                  Tell the resident what to avoid. <em>"Ensure this pediatric dosage calculator caps at the adult maximum weight."</em>
                </li>
              </ul>
            </Callout>
          </div>
        )
      },
      {
        id: '3-2',
        title: 'Advanced Clinical Reasoning: Chain-of-Thought',
        type: 'content',
        estimatedTimeMinutes: 5,
        videoLinks: [
          { title: 'Chain of Thought Prompting Explained', url: 'https://youtu.be/LGLmxcBv0B8' }
        ],
        content: (
          <div className="space-y-4">
            <p>What about using AI to assist in complex clinical diagnoses? A standard prompt can lead to <strong className="text-red-400">Premature Closure</strong>—the AI jumping to an obvious conclusion without considering complex zebras.</p>
            
            <Callout icon={<SparklesIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Chain-of-Thought (CoT)</p>
              <p className="text-slate-300 mt-2 text-sm">
                You can fix this by forcing the AI to "show its math". This mirrors how medical schools teach the Differential Diagnosis process.
              </p>
              <div className="mt-3 p-3 bg-slate-900 rounded border border-slate-700 font-mono text-xs text-slate-300">
                <span className="text-red-400 font-bold">Standard Prompt (Bad):</span><br/>
                "Patient has right lower quadrant pain and fever. What is the diagnosis?"<br/><br/>
                <span className="text-green-400 font-bold">Chain-of-Thought Prompt (Good):</span><br/>
                "A 24yo female presents with RLQ pain and fever. <strong>Before giving a final diagnosis, think step-by-step.</strong> 1. List the top 5 differential diagnoses. 2. State clinical findings for each. 3. Propose imaging. 4. Finally, state the most likely diagnosis."
              </div>
            </Callout>
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
              question: 'Why must you define explicit Clinical Guardrails when "vibe coding"?',
              options: ['Because AI requires payment based on the persona\'s salary.', 'Because AI models are literal and without boundaries, they might build generic or unsafe features unless constrained by rules.', 'Because the database will reject code without a persona.', 'Because Figma requires a persona to render CSS.'],
              correctAnswer: 'Because AI models are literal and without boundaries, they might build generic or unsafe features unless constrained by rules.'
            },
            {
              question: 'How does Chain-of-Thought (CoT) prompting improve AI diagnostic safety?',
              options: ['It forces the AI to search Google before answering.', 'It prevents "premature closure" by forcing the model to generate intermediate reasoning steps before jumping to a final conclusion.', 'It encrypts the patient\'s PHI automatically.', 'It reduces the context window size to save GPU power.'],
              correctAnswer: 'It prevents "premature closure" by forcing the model to generate intermediate reasoning steps before jumping to a final conclusion.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-4',
    title: 'Module 4: The Hippocratic Oath for Clinical AI',
    description: 'Enforce patient privacy, diagnose AI hallucinations, and master RAG.',
    lessons: [
      {
        id: '4-1',
        title: 'Preserving Patient Privacy: HIPAA & PHI',
        type: 'content',
        estimatedTimeMinutes: 4,
        content: (
          <div className="space-y-4">
            <p>Our first duty is to do no harm. In the AI era, this means <strong className="text-cyan-400">protecting patient privacy</strong>.</p>
            
            <Callout icon={<ShieldCheckIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">The Golden Rule of Clinical AI:</p>
              <p className="text-red-400 font-bold">NEVER input raw patient identifiers into standard consumer AI models (like public ChatGPT or Gemini search portals).</p>
            </Callout>

            <Callout icon={<KeyIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">How to Safely Use AI:</p>
              <ul className="mt-2 space-y-3 text-sm text-slate-300">
                <li>
                  <strong className="text-cyan-400">1. De-identification:</strong> Remove all 18 HIPAA identifiers (names, dates, MRNs) before pasting any chart text.
                </li>
                <li>
                  <strong className="text-yellow-400">2. Business Associate Agreements (BAAs):</strong> 
                  Only input raw data into hospital-approved enterprise environments that legally guarantee <strong className="text-white">Zero-Data Retention</strong> (meaning your inputs are never stored or used for future model training).
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
        videoLinks: [
          { title: 'Why do LLMs Hallucinate?', url: 'https://youtu.be/8IhiLYieyQ0' },
          { title: 'What is Retrieval-Augmented Generation (RAG)?', url: 'https://youtu.be/T-D1OfcDW1M' }
        ],
        content: (
          <div className="space-y-4">
            <p>If LLMs calculate the next word using math, they can invent fake citations that "look" mathematically perfect. This is called a <strong className="text-red-400">Hallucination</strong>.</p>
            <p>How do hospitals use AI safely? The answer is <strong className="text-cyan-400">Retrieval-Augmented Generation (RAG)</strong>.</p>
            
            <Callout icon={<BookOpenIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">RAG: The Open-Book Exam</p>
              <p className="text-slate-300 mt-2 text-sm">
                Instead of asking the AI to guess an answer from memory, RAG forces the AI to take an "open-book exam".
              </p>
              <ol className="mt-3 space-y-2 text-sm text-slate-300 list-decimal list-inside">
                <li><strong className="text-cyan-400">Retrieve:</strong> You ask a question. The system searches a verified database (like your hospital\'s internal PDF guidelines).</li>
                <li><strong className="text-yellow-400">Augment:</strong> It pulls the exact paragraphs from the PDF and pastes them invisibly into the AI.</li>
                <li><strong className="text-green-400">Generate:</strong> The AI is instructed: <em>"Answer the doctor's question using ONLY the provided text."</em></li>
              </ol>
            </Callout>
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
              question: 'What is the primary benefit of Retrieval-Augmented Generation (RAG)?',
              options: ['It prevents hallucinations by forcing the AI to answer based strictly on retrieved documents rather than its internal memory.', 'It makes the AI run faster on mobile devices.', 'It automatically bills insurance.', 'It encrypts patient data.'],
              correctAnswer: 'It prevents hallucinations by forcing the AI to answer based strictly on retrieved documents rather than its internal memory.'
            },
            {
              question: 'Why do AI models "Hallucinate"?',
              options: ['Because they are mathematical autocomplete engines predicting the next word, rather than databases of hard facts.', 'Because the server is overheating.', 'Because RAG is turned on.', 'Because the user prompt was too short.'],
              correctAnswer: 'Because they are mathematical autocomplete engines predicting the next word, rather than databases of hard facts.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-5',
    title: 'Module 5: Clinical Workflows in Action',
    description: 'Master high-yield workflows and explore Agentic AI.',
    lessons: [
      {
        id: '5-1',
        title: 'High-Yield Medical Workflows',
        type: 'content',
        estimatedTimeMinutes: 4,
        content: (
          <div className="space-y-4">
            <p>Clinicians lose up to 40% of their working hours to administrative burdens. AI can instantly automate this.</p>

            <Callout icon={<DocumentTextIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">High-Yield Automations:</p>
              <ul className="mt-2 space-y-4 text-sm text-slate-300">
                <li>
                  <strong className="text-cyan-400">1. Prior Authorization Appeals:</strong> 
                  Feed insurance denial criteria and sanitized patient facts to automatically draft evidence-based appeal letters.
                </li>
                <li>
                  <strong className="text-yellow-400">2. Patient Handouts:</strong> 
                  Translate complex discharge summaries into 5th-grade reading level handouts highlighting red-flag symptoms.
                </li>
                <li>
                  <strong className="text-green-400">3. Research Synthesis:</strong> 
                  Extract absolute numbers and hazard ratios from a 30-page PDF clinical trial into a clean comparison table.
                </li>
              </ul>
            </Callout>
          </div>
        )
      },
      {
        id: '5-2',
        title: 'Agentic AI (The Autonomous Resident)',
        type: 'content',
        estimatedTimeMinutes: 5,
        videoLinks: [
          { title: 'AI Agents Explained by Andrew Ng', url: 'https://youtu.be/F8NKVhkZZWI' }
        ],
        content: (
          <div className="space-y-4">
            <p>The next frontier is moving from passive chatbots to <strong className="text-cyan-400">Agentic AI</strong>.</p>
            <p>A chatbot only <em>talks</em>. An Agent can <em>take action</em> using digital tools.</p>

            <Callout icon={<CpuChipIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Equipping the AI with Tools</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300 list-disc list-inside">
                <li><strong className="text-cyan-400">Calculators:</strong> An agentic AI writes a Python script, runs it in a calculator tool, and returns the exact verified medical score.</li>
                <li><strong className="text-yellow-400">The EHR Tool:</strong> An AI agent is told "Schedule a follow up for Mrs. Smith." It autonomously uses a scheduling API to find an open slot and book it.</li>
              </ul>
            </Callout>
            
            <p className="mt-4 text-sm text-slate-300">Agentic workflows upgrade the AI from a medical textbook (information) to a resident physician (synthesizing information, pacing the consult, and placing the lab order).</p>
          </div>
        )
      },
      {
        id: '5-3',
        title: 'Interactive Case Study: The SOAP Note',
        type: 'exercise',
        estimatedTimeMinutes: 5,
        exercise: {
          prompt: (
            <div className="space-y-3">
              <p>Let&apos;s apply everything in a final interactive encounter. You took a rapid history and recorded objective metrics in a messy text file.</p>
              <p>Your task is to structure this case into a clean JSON SOAP note. Modify the code to set <code className="text-cyan-400">"assessment"</code> to <code className="text-cyan-400">"Essential Hypertension"</code> and complete <code className="text-cyan-400">"bpReading"</code> to <code className="text-cyan-400">"148/92"</code>.</p>
            </div>
          ),
          evaluationPrompt: `Evaluate the user's SOAP JSON. The JSON must be valid. It must contain the keys "assessment" (with value "Essential Hypertension"), and "bpReading" (with value "148/92").`,
          initialCode: `{\n  "patientId": "PT-9983",\n  "subjective": "Occasional headaches.",\n  "bpReading": "148/92",\n  "assessment": "Essential Hypertension",\n  "plan": "Lisinopril 10mg."\n}`
        }
      }
    ]
  },
  {
    id: 'module-6',
    title: 'Module 6: The Clinical AI Landscape',
    description: 'Navigate the modern ecosystem of specialized AI models.',
    lessons: [
      {
        id: '6-1',
        title: 'The Big Three: Gemini, ChatGPT & Claude',
        type: 'content',
        estimatedTimeMinutes: 5,
        videoLinks: [
          { title: 'ChatGPT vs Claude vs Gemini', url: 'https://youtu.be/kC6yO9N_Bko' }
        ],
        content: (
          <div className="space-y-4">
            <p>Every AI model has a distinct "personality" and clinical strength. Here is how to choose the right resident.</p>

            <Callout icon={<BrainIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Google Gemini (The Multimodal Researcher)</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li><strong className="text-cyan-400">Strengths:</strong> Massive context window. It is the best tool for analyzing huge stacks of PDFs, patient histories, and natively understanding medical imaging.</li>
                <li><strong className="text-white">Specialized Variant:</strong> <em className="text-cyan-200">Gemini for Science / Med-PaLM</em> is highly tuned for biomedical literature and clinical reasoning.</li>
              </ul>
            </Callout>

            <Callout icon={<ChatBubbleLeftRightIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">ChatGPT (The Creative Workhorse)</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li><strong className="text-green-400">Strengths:</strong> Incredible at code generation and intense Chain-of-Thought reasoning (via 'o1' and 'o3' models). Perfect for building clinical apps.</li>
              </ul>
            </Callout>

            <Callout icon={<DocumentTextIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Claude by Anthropic (The Careful Scribe)</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li><strong className="text-yellow-400">Strengths:</strong> Built with strict "Constitutional AI." It has pristine, nuanced prose. Best for drafting sensitive patient referral letters and breaking-bad-news scripts.</li>
              </ul>
            </Callout>
          </div>
        )
      },
      {
        id: '6-2',
        title: 'Specialized Clinical AI: Perplexity',
        type: 'content',
        estimatedTimeMinutes: 4,
        videoLinks: [
          { title: 'Perplexity AI Tutorial', url: 'https://youtu.be/D5R4_J4vR0E' }
        ],
        content: (
          <div className="space-y-4">
            <p>Beyond the generalists, there are tools built specifically for finding objective truth.</p>

            <Callout icon={<GlobeAltIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Perplexity (The AI Search Engine)</p>
              <p className="text-slate-300 mt-2 text-sm">
                Perplexity is an engine built entirely on RAG. It searches the live internet (or PubMed), reads the top 20 links, and writes a synthesis <strong className="text-white">with inline footnote citations</strong>.
              </p>
              <p className="text-slate-300 mt-2 text-sm">
                <em className="text-cyan-400">Clinical use case:</em> "What are the latest 2025 guidelines for managing hypertensive crisis?" Perplexity gives you the answer cited with links to current medical journals.
              </p>
            </Callout>

            <div className="p-5 bg-slate-800/30 border border-slate-700/50 rounded-xl mt-4">
              <h4 className="font-bold text-white mb-2 text-lg">🚀 The Takeaway</h4>
              <p className="text-sm text-slate-300">
                No single AI model rules them all. The modern physician's superpower is knowing which tool to pull from the bag!
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
              question: 'If you needed to feed an entire 100-page textbook into an AI, which model\'s massive context window makes it the best choice?',
              options: ['Google Gemini', 'A basic SQL Database', 'A clinical calculator', 'HTML/CSS'],
              correctAnswer: 'Google Gemini'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-7',
    title: 'Module 7: The World of AI: Mapping the Frontier',
    description: 'Explore the global AI ecosystem, model architectures, and how to judge an AI.',
    lessons: [
      {
        id: '7-1',
        title: 'Where AI Lives: Open vs. Closed',
        type: 'content',
        estimatedTimeMinutes: 5,
        content: (
          <div className="space-y-4">
            <p>To use AI safely in a hospital, you need to know where it comes from and where it runs.</p>

            <Callout icon={<BuildingStorefrontIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Closed Source (Proprietary Models)</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li><strong className="text-cyan-400">Like a Proprietary Drug:</strong> Models like OpenAI&apos;s GPT-4 or Google&apos;s Gemini. You pay to use them, but the company keeps the exact "chemical recipe" (the code and training data) a strict secret.</li>
                <li><strong className="text-white">Cloud Hosted:</strong> They run on the company&apos;s massive servers. You send your data to them over the internet.</li>
              </ul>
            </Callout>

            <Callout icon={<FolderOpenIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Open Source & Hugging Face</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li><strong className="text-green-400">Like a Generic Drug:</strong> Models like Meta&apos;s Llama 3. The "recipe" is completely public.</li>
                <li><strong className="text-white">Hugging Face:</strong> This is a website known as the "GitHub of AI." It is a massive global library where researchers upload and share these open-source models for free (<a href="https://huggingface.co" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">huggingface.co</a>).</li>
                <li><strong className="text-yellow-400">Local Hosting (HIPAA Safe):</strong> Because the model is free, a hospital can download it from Hugging Face and run it <strong className="text-white">locally</strong> on their own internal servers. Patient data never leaves the hospital firewall!</li>
              </ul>
            </Callout>
          </div>
        )
      },
      {
        id: '7-2',
        title: 'Architecture: How the Brain is Built',
        type: 'content',
        estimatedTimeMinutes: 5,
        content: (
          <div className="space-y-4">
            <p>Not all AI brains are built the same. Here are the three major architectural choices developers make.</p>

            <Callout icon={<CircleStackIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">1. Small vs. Large Models</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li><strong className="text-cyan-400">Small Models (e.g., 7 Billion Parameters):</strong> Like a fast medical student. Great for simple tasks (summarizing a single note) and cheap to run on a laptop.</li>
                <li><strong className="text-purple-400">Large Models (e.g., 1 Trillion Parameters):</strong> Like the Chief of Staff. Massive, expensive, and capable of extremely complex reasoning across thousands of variables.</li>
              </ul>
            </Callout>

            <Callout icon={<GitBranchIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">2. Mixture of Experts (MoE)</p>
              <p className="text-slate-300 mt-2 text-sm">
                Instead of building one massive generalist brain, MoE models route your prompt to specialized sub-networks. If you ask a cardiology question, it sends it to the "Cardiology Expert" network. It is exactly like a hospital routing a patient to a specialist rather than making the General Practitioner do everything. This makes the model incredibly fast and efficient.
              </p>
            </Callout>

            <Callout icon={<BoltIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">3. "Thinking" vs. "Flash" Models</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li><strong className="text-yellow-400">Flash Models (System 1):</strong> Built for split-second reflexes (e.g., Gemini 1.5 Flash, GPT-4o-mini). They are incredibly fast and cheap, perfect for real-time chatbots.</li>
                <li><strong className="text-green-400">Thinking Models (System 2):</strong> Built for slow, deliberate reasoning (e.g., OpenAI o1). They take 10-30 seconds to answer because they generate a massive internal "Chain of Thought" before responding. Best for complex diagnostics.</li>
              </ul>
            </Callout>
          </div>
        )
      },
      {
        id: '7-3',
        title: 'How to Judge an AI (Benchmarks & LMarena)',
        type: 'content',
        estimatedTimeMinutes: 4,
        content: (
          <div className="space-y-4">
            <p>Every week, a new AI model claims to be the "smartest in the world." How do we objectively measure their intelligence?</p>

            <Callout icon={<AcademicCapIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Traditional Benchmarks</p>
              <p className="text-slate-300 mt-2 text-sm">
                Historically, researchers force the AI to take human tests (like the USMLE or the Bar Exam). While impressive, these tests are flawed because the AI might have accidentally "memorized" the test questions during its massive internet training phase.
              </p>
            </Callout>

            <div className="p-6 bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl shadow-lg">
              <h4 className="font-bold text-white mb-4 text-xl flex items-center gap-3">
                <TrophyIcon className="w-6 h-6 text-yellow-400" />
                The Gold Standard: LMSYS Chatbot Arena
              </h4>
              <p className="text-sm text-slate-300 mb-3">
                The most trusted global leaderboard is the <strong className="text-white">LMSYS Chatbot Arena</strong> (<a href="https://lmarena.ai" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">lmarena.ai</a>).
              </p>
              <p className="text-sm text-slate-300">
                It operates exactly like a blind, randomized controlled clinical trial. You type a prompt, and two anonymous AI models (Model A and Model B) generate an answer side-by-side. You (the human judge) vote on which answer is better. Once you vote, their true identities are revealed. This crowdsourced rating is currently the definitive ranking of global AI intelligence.
              </p>
            </div>
          </div>
        )
      },
      {
        id: '7-4',
        title: 'Quiz: The World of AI',
        type: 'quiz',
        estimatedTimeMinutes: 3,
        quiz: {
          questions: [
            {
              question: 'Why might a highly-secure hospital prefer to use an Open-Source AI model from Hugging Face instead of a Proprietary model from OpenAI?',
              options: ['Because open-source models can be downloaded and run strictly "locally" on the hospital\'s own internal servers, guaranteeing patient data never leaves the firewall.', 'Because open-source models are always much smarter than proprietary models.', 'Because Hugging Face requires a monthly subscription.', 'Because local models have infinite context windows.'],
              correctAnswer: 'Because open-source models can be downloaded and run strictly "locally" on the hospital\'s own internal servers, guaranteeing patient data never leaves the firewall.'
            },
            {
              question: 'How does the LMSYS Chatbot Arena (lmarena.ai) rank AI models?',
              options: ['By making them take the US Medical Licensing Exam (USMLE).', 'By counting how many parameters the model has.', 'Through crowdsourced blind A/B testing, where human judges vote on the best answer between two anonymous models.', 'By measuring the API latency speed.'],
              correctAnswer: 'Through crowdsourced blind A/B testing, where human judges vote on the best answer between two anonymous models.'
            }
          ]
        }
      }
    ]
  }
];
