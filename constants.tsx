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
        content: (
          <div className="space-y-4">
            <p>How does a machine read a medical textbook? It doesn&apos;t see words the way you do. It translates text into two crucial units: <strong className="text-cyan-400">Tokens</strong> and <strong className="text-cyan-400">Embeddings</strong>.</p>
            
            <Callout icon={<PuzzlePieceIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">1. Tokens: The Semantic Syllables</p>
              <p>Tokens are the basic semantic syllables of language. An LLM reads by breaking down words into chunks. A good clinical rule of thumb: <strong className="text-white">100 tokens is roughly 75 words</strong>. High-frequency terms (like "heart") are usually 1 token, while rare pharmaceutical names (like "Levothyroxine") might be split into multiple tokens ("Levo", "thy", "rox", "ine").</p>
            </Callout>

            <Callout icon={<GlobeAmericasIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">2. Embeddings: The Conceptual GPS</p>
              <p>Embeddings are the maps of the AI brain. Imagine a giant, 3D library where every medical concept has an exact longitude and latitude (a mathematical coordinate called a vector).</p>
              <p className="mt-2 text-slate-300">
                In this multi-dimensional space, the AI groups concepts by <strong className="text-white">semantic relationship</strong>:
              </p>
              <ul className="list-disc list-inside mt-2 pl-4 space-y-1 text-sm text-slate-300">
                <li><strong className="text-cyan-400">Substernal chest pain</strong>, <strong className="text-cyan-400">angina</strong>, and <strong className="text-cyan-400">myocardial infarction</strong> are stored in the exact same medical bookcase.</li>
                <li><strong className="text-yellow-400">Cough</strong> and <strong className="text-yellow-400">pneumonia</strong> are stored in a neighboring respiratory bookcase.</li>
                <li><strong className="text-red-400">Cabbage</strong> is placed on a completely different floor of the library, thousands of yards away.</li>
              </ul>
            </Callout>

            <div className="p-5 bg-slate-800/30 border border-slate-700/50 rounded-xl">
              <h4 className="font-bold text-white mb-2 text-lg">🔬 Clinical Anatomy: Mapping Symptoms</h4>
              <p className="text-sm text-slate-300 font-semibold mb-1">How AI understands synonymy:</p>
              <p className="text-sm text-slate-300">
                When a doctor types "shortness of breath" and a patient writes "winded," an LLM understands they are talking about the exact same underlying pathology because their vector embeddings sit side-by-side in conceptual space. This is how LLMs break free from rigid keyword matches and read charts with genuine clinical context.
              </p>
            </div>
          </div>
        )
      },
      {
        id: '2-2',
        title: 'The Working Memory & Processor: Context Windows & GPUs',
        type: 'content',
        estimatedTimeMinutes: 4,
        content: (
          <div className="space-y-4">
            <p>Now that we know how words are mapped, let&apos;s examine the physiological limits of the AI brain: <strong className="text-cyan-400">Context Windows</strong> and the difference between <strong className="text-cyan-400">Training</strong> and <strong className="text-cyan-400">Inference</strong>.</p>

            <Callout icon={<WindowIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Context Window: The Doctor\'s Working Memory</p>
              <p>The context window is the short-term working memory of the AI during a single consultation. It dictates how many tokens the model can "hold in its head" at one moment.</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li><strong className="text-cyan-400">Small Context Window (Older models):</strong> Like a doctor who can only remember the last 2 pages of a patient&apos;s chart. By the time they read page 3, they forget the patient&apos;s chief complaint on page 1.</li>
                <li><strong className="text-green-400">Large Context Window (Modern Gemini):</strong> A massive desk. It can hold a 500-page medical record, including every lab result, consult note, and imaging report, digesting the whole system in a single thought.</li>
              </ul>
            </Callout>

            <Callout icon={<CpuChipIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Training vs. Inference: Medical School vs. The Bedside Reflex</p>
              <p>How does the AI acquire its coordinates, and how does it answer your question? This requires massive compute engines called GPUs.</p>
              <ul className="mt-2 space-y-3 text-sm text-slate-300">
                <li>
                  <strong className="text-cyan-400">Training (Medical School):</strong> 
                  An incredibly slow, expensive process. The AI consumes millions of textbooks, research journals, and EHR data points. It takes months and millions of dollars on thousands of GPUs, creating the "synaptic weights" (the fixed brain).
                </li>
                <li>
                  <strong className="text-yellow-400">Inference (The Bedside Reflex):</strong> 
                  Using the pre-trained brain. When you ask Gemini a question, it runs your prompt through its existing synaptic pathways in milliseconds. This is cheap, fast, and represents a split-second diagnostic reflex.
                </li>
                <li>
                  <strong className="text-green-400">Transformers & Selective Attention:</strong> 
                  The cognitive pathway that allows the model to listen to critical red flags (e.g. "sudden onset, crushing pain") while tuning out background noise in a long-winded patient description.
                </li>
              </ul>
            </Callout>
          </div>
        )
      },
      {
        id: '2-3',
        title: 'Quiz: LLM Physiology',
        type: 'quiz',
        estimatedTimeMinutes: 3,
        quiz: {
          questions: [
            {
              question: 'If you want to feed a patient\'s entire 300-page clinical history into an LLM to find a rare drug interaction, which specification of the model determines if it can hold that much text at once?',
              options: ['The GPU Inference Speed', 'The size of the Context Window', 'The Training dataset cost', 'The non-relational database query speed'],
              correctAnswer: 'The size of the Context Window'
            },
            {
              question: 'What is the crucial difference between LLM "Training" and "Inference"?',
              options: ['Training is the expensive phase of building the model\'s brain (Medical School); Inference is utilizing the pre-built brain to answer questions (Bedside diagnosis).', 'Training is done by the user in their web browser; Inference is done on the server using SQL.', 'Training is only for image models; Inference is only for language models.', 'Training represents long-term hippocampal memory; Inference represents the nervous system\'s HTML code.'],
              correctAnswer: 'Training is the expensive phase of building the model\'s brain (Medical School); Inference is utilizing the pre-built brain to answer questions (Bedside diagnosis).'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Module 3: Clinicians as "Vibe Coders"',
    description: 'Learn to build complete clinical applications, intake forms, and calculators using natural language.',
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
                  Tell the resident what to avoid. <em>"Ensure this pediatric dosage calculator automatically caps the dosage at the adult maximum weight, even if the weight input is entered incorrectly."</em>
                </li>
                <li>
                  <strong className="text-green-400">3. Request Modular Testing:</strong> 
                  Don&apos;t ask for the entire application at once. Ask the AI to build the layout first, then add the calculation formulas, and finally build the data export.
                </li>
              </ul>
            </Callout>

            <div className="p-5 bg-slate-800/30 border border-slate-700/50 rounded-xl">
              <h4 className="font-bold text-white mb-2 text-lg">🛠️ Vibe Coding Example: Pediatric Dosage Tool</h4>
              <p className="text-sm text-slate-300">
                Imagine you want to build a web-based dosage calculator for Amoxicillin based on a child&apos;s weight. Instead of writing JavaScript, you "vibe code" it by telling the AI:
              </p>
              <blockquote className="mt-2 pl-3 border-l-4 border-cyan-500 text-xs italic text-slate-400">
                "Build a clean single-page web app with a dark theme. It must have an input field for patient weight in kilograms, select fields for target dose (45mg/kg/day or 90mg/kg/day), and automatically calculate and display the total daily volume in mL, divided into twice-daily doses. Implement strict guardrails: if the weight exceeds 40kg, display a warning stating 'Weight exceeds pediatric baseline; shifting to standard adult dosage guidelines.'"
              </blockquote>
              <p className="mt-3 text-sm text-slate-300">
                The AI writes the entire HTML, CSS, and calculation logic. Within 15 seconds, you have a functional clinical utility that you can open in your browser or run on your phone.
              </p>
            </div>
          </div>
        )
      },
      {
        id: '3-2',
        title: 'The Doctor-Developer Toolkit: Full-Stack UI & DB',
        type: 'content',
        estimatedTimeMinutes: 4,
        content: (
          <div className="space-y-4">
            <p>Now that you know how to instruct the AI, let&apos;s map the actual technical building blocks you can orchestrate without code to construct fully secure clinical systems.</p>

            <Callout icon={<ServerStackIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Your Digital Building Blocks:</p>
              <ul className="mt-2 space-y-3 text-sm text-slate-300">
                <li>
                  <strong className="text-cyan-400">The Visual Blueprint (Figma):</strong> 
                  A free tool where you can draw what your app looks like before writing code. Think of it like sketching the layout of your new private practice clinic.
                </li>
                <li>
                  <strong className="text-yellow-400">The Database (Firestore/Supabase):</strong> 
                  A secure, cloud-based long-term memory. It allows you to create collections (like an Excel sheet) to store patient check-ins, satisfaction surveys, or clinical logs.
                </li>
                <li>
                  <strong className="text-green-400">No-Code App Builders (Cursor / v0.dev):</strong> 
                  AI services that turn your text commands directly into functional visual code, writing React and CSS for you while you sit back and inspect the results.
                </li>
              </ul>
            </Callout>

            <div className="p-5 bg-slate-800/30 border border-slate-700/50 rounded-xl">
              <h4 className="font-bold text-white mb-2 text-lg">🏥 Prototype: Patient SOAP Note Generator</h4>
              <p className="text-sm text-slate-300">
                By combining these building blocks, a clinician can easily build an automated patient-encounter app: A patient fills out a secure history intake form on an iPad in the waiting room (Frontend). The data is sent via API to Gemini, which structures the raw symptoms into a professional, pre-written SOAP note format (Visceral Organs). The SOAP note is then instantly loaded into the provider&apos;s EHR browser view, and saved securely into the clinic&apos;s database (Hippocampus).
              </p>
            </div>
          </div>
        )
      },
      {
        id: '3-3',
        title: 'Quiz: Vibe Coding',
        type: 'quiz',
        estimatedTimeMinutes: 3,
        quiz: {
          questions: [
            {
              question: 'Why is directing an AI coding assistant compared to supervising a resident physician?',
              options: ['Because the AI holds an MD degree and understands medical billing automatically.', 'Because the AI is brilliant but highly literal, requiring explicit instructions, clinical parameters, and systematic oversight.', 'Because the AI can legally sign off on prescriptions without a licensed doctor\'s review.', 'Because the AI only works during typical hospital shift hours.'],
              correctAnswer: 'Because the AI is brilliant but highly literal, requiring explicit instructions, clinical parameters, and systematic oversight.'
            },
            {
              question: 'Which of the following describes the correct flow of data in a patient check-in app created via vibe coding?',
              options: ['Patient types details (Frontend) -> Sent via secure neural signaling (API) -> Server structures it (Backend) -> Permanently stored in secure memory (Database).', 'Database is viewed by the user -> Database directly updates the domain -> Hosting generates a new .env file.', 'Figma blue-prints are stored on the GPU -> Training takes place inside the local cache -> Inference outputs a SOAP note.', 'HTML and CSS are compiled directly inside the patient\'s hippocampus.'],
              correctAnswer: 'Patient types details (Frontend) -> Sent via secure neural signaling (API) -> Server structures it (Backend) -> Permanently stored in secure memory (Database).'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-4',
    title: 'Module 4: The Hippocratic Oath for Clinical AI',
    description: 'Enforce patient privacy (HIPAA/PHI) and diagnose AI hallucinations before they impact patient care.',
    lessons: [
      {
        id: '4-1',
        title: 'Preserving Patient Privacy: HIPAA & PHI',
        type: 'content',
        estimatedTimeMinutes: 4,
        content: (
          <div className="space-y-4">
            <p>As physicians, our first duty is to do no harm. In the era of artificial intelligence, that duty translates directly to <strong className="text-cyan-400">protecting patient privacy and enforcing security standards</strong>.</p>
            <p>Whenever you utilize artificial intelligence in a clinical setting, you must operate with absolute awareness of HIPAA (Health Insurance Portability and Accountability Act) and the protection of PHI (Protected Health Information).</p>
            
            <Callout icon={<ShieldCheckIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">The Golden Rule of Clinical AI:</p>
              <p className="text-red-400 font-bold">NEVER input raw patient identifiers into standard consumer AI models (like public ChatGPT, Claude, or Gemini search portals).</p>
              <p className="mt-2 text-sm text-slate-300">
                Consumer chatbots utilize your inputs to train future models. This means if you paste a patient&apos;s name, date of birth, and unique medical record number (MRN), that private data could potentially be memorized and leaked to another user in a different city.
              </p>
            </Callout>

            <Callout icon={<KeyIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">How to Safely Use AI in Medicine:</p>
              <ul className="mt-2 space-y-3 text-sm text-slate-300">
                <li>
                  <strong className="text-cyan-400">1. Strict De-identification:</strong> 
                  Before pasting a patient record, sanitize it completely. Remove all 18 HIPAA identifiers: names, exact dates (except year), phone numbers, MRNs, emails, and address locations.
                  <div className="p-3 bg-slate-900 rounded border border-slate-700 mt-2 font-mono text-xs">
                    <span className="text-red-400 font-bold">Raw PHI:</span> "Jane Miller, born 05/14/1982, MRN 482918, presents with acute dyspnea..."<br/>
                    <span className="text-green-400 font-bold">Sanitized:</span> "A 44-year-old female presents with acute dyspnea..."
                  </div>
                </li>
                <li>
                  <strong className="text-yellow-400">2. Business Associate Agreements (BAAs):</strong> 
                  Only input raw patient data into enterprise-tier AI environments where the vendor has signed a formal BAA. Under a BAA, the vendor guarantees strict <strong className="text-white">Zero-Data Retention</strong>, legally promising that your inputs are processed in a secure container, never stored, and never used to train future models.
                </li>
              </ul>
            </Callout>
          </div>
        )
      },
      {
        id: '4-2',
        title: 'Diagnosing Hallucinations & Biases',
        type: 'content',
        estimatedTimeMinutes: 4,
        content: (
          <div className="space-y-4">
            <p>Why do highly sophisticated AI models occasionally output absolute nonsense—even inventing fake medical journal articles with realistic-looking authors and PMIDs? This pathology is known as <strong className="text-cyan-400">Hallucination</strong>.</p>
            
            <Callout icon={<BrainIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">The Etiology of a Hallucination:</p>
              <p className="text-slate-300">
                Remember that an LLM does not actually "know" medical science; it is a highly advanced probabilistic autocomplete system. It predicts the next most likely token (syllable) based on mathematical probability. If the model is asked about a highly obscure medical topic, it might lack dense data points in that section of its vector space. In response, it will generate text that "looks" mathematically perfect—including fake citations—because that is what is mathematically expected in a medical document.
              </p>
            </Callout>

            <div className="p-5 bg-slate-800/30 border border-slate-700/50 rounded-xl">
              <h4 className="font-bold text-white mb-2 text-lg">🚨 Clinical Case Study: The Incorrect Drug Interaction</h4>
              <p className="text-sm text-slate-300">
                A clinician asks a basic consumer LLM: <em>"Are there any contraindications between medication X and medication Y?"</em> The model confidently replies: <em>"No, clinical trials have proven their safety."</em> However, medication X is a novel drug and Y is an obscure enzyme inhibitor—their dangerous interaction has only been documented in a single recent letter to the editor. The LLM hallucinated safety because it default-matched the generic phrasing of safe drug pairs.
              </p>
              <p className="mt-3 font-semibold text-white text-sm">🛡️ The Intervention: "Trust but Verify"</p>
              <p className="text-sm text-slate-300 mt-1">
                Never utilize AI outputs as a primary diagnostic or therapeutic source. Always treat the AI as a clinical assistant: let it draft the initial chart summaries, letters, or translations, but subject every sentence to a rigorous, human-in-the-loop review before signing off.
              </p>
            </div>
          </div>
        )
      },
      {
        id: '4-3',
        title: 'Quiz: Guardrails & Ethics',
        type: 'quiz',
        estimatedTimeMinutes: 3,
        quiz: {
          questions: [
            {
              question: 'You want to draft a complex referral letter for a patient using Gemini. What is the safest, HIPAA-compliant approach?',
              options: ['Paste the patient\'s full chart, including their name and MRN, to make sure the letter is highly accurate.', 'Completely strip out the patient\'s name, exact dates, MRN, and contact info, leaving only clinical facts, before pasting it into a standard consumer model.', 'Use the public chatbot and write "Confidential: Do not share" at the top of the prompt.', 'Ask the patient to sign a waiver allowing you to post their medical record on public AI forums.'],
              correctAnswer: 'Completely strip out the patient\'s name, exact dates, MRN, and contact info, leaving only clinical facts, before pasting it into a standard consumer model.'
            },
            {
              question: 'Why do LLMs generate "hallucinations" (inventing fake citations or clinical claims)?',
              options: ['Because the database has suffered from anterograde amnesia.', 'Because they are probabilistic next-token prediction systems rather than live medical knowledge bases; they output what mathematically "looks" correct based on patterns.', 'Because the GPU is overheating in the data center.', 'Because the frontend CSS layout has a bug.'],
              correctAnswer: 'Because they are probabilistic next-token prediction systems rather than live medical knowledge bases; they output what mathematically "looks" correct based on patterns.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-5',
    title: 'Module 5: Clinical Workflows in Action',
    description: 'Master high-yield workflows: automatic prior authorizations, chart summaries, patient translation, and custom SOAP notes.',
    lessons: [
      {
        id: '5-1',
        title: 'High-Yield Medical Workflows',
        type: 'content',
        estimatedTimeMinutes: 4,
        content: (
          <div className="space-y-4">
            <p>Now that you have the conceptual map, the technical building blocks, and the privacy guardrails, let&apos;s unlock the ultimate superpower of clinical AI: <strong className="text-cyan-400">Workflow Automation</strong>.</p>
            <p>Every single day, clinicians lose up to 40% of their working hours to administrative burdens. AI can instantly automate these administrative taxations.</p>

            <Callout icon={<DocumentTextIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">Three High-Yield Automations for Your Practice:</p>
              <ul className="mt-2 space-y-4 text-sm text-slate-300">
                <li>
                  <strong className="text-cyan-400">1. Prior Authorization & Appeal Letters:</strong> 
                  Insurance denials are a massive bottleneck. You can feed the insurance denial criteria, alongside the patient&apos;s sanitized clinical facts (e.g. conservative therapy history, MRI findings) into the AI, and instruct: <em>"Draft an evidence-based appeal letter citing the patient\'s objective failure of physical therapy and specific disk herniation findings at L4-L5."</em>
                </li>
                <li>
                  <strong className="text-yellow-400">2. Medical Translation & Patient Handouts:</strong> 
                  Pasting a complex, jargon-heavy discharge summary and instructing: <em>"Translate this document into patient-friendly Spanish at a 5th-grade reading level. Structure it in clear bullet points focusing on: 1. Medications you must take, 2. Symptoms that mean you must return to the ER, and 3. How to care for your wound."</em>
                </li>
                <li>
                  <strong className="text-green-400">3. Rapid Research Syntheses:</strong> 
                  Tossing a 30-page PDF clinical trial report into a large-context model and asking: <em>"Extract the absolute numbers for primary outcomes, hazard ratios, and rate of adverse events for the treatment group vs control group. Format as a clean comparison table."</em>
                </li>
              </ul>
            </Callout>
          </div>
        )
      },
      {
        id: '5-2',
        title: 'Interactive Case Study: The SOAP Note Assistant',
        type: 'exercise',
        estimatedTimeMinutes: 5,
        exercise: {
          prompt: (
            <div className="space-y-3">
              <p>Let&apos;s apply everything you&apos;ve learned in a final, practical interactive encounter. A SOAP note (Subjective, Objective, Assessment, Plan) is the core currency of clinical documentation.</p>
              <p>Imagine you have just seen a patient presenting with high blood pressure. You took a rapid history and recorded some objective metrics in a messy, unstructured text file.</p>
              <p>Your task is to structure this case into a clean, digital JSON SOAP note. Inside the curly braces, modify the JSON code to set the <code className="text-cyan-400">"assessment"</code> key to <code className="text-cyan-400">"Essential Hypertension"</code> and complete the <code className="text-cyan-400">"bpReading"</code> value to be exactly <code className="text-cyan-400">"148/92"</code>.</p>
            </div>
          ),
          evaluationPrompt: `Evaluate the user's SOAP JSON. The JSON must be valid. It must contain the keys "assessment" (with value "Essential Hypertension"), and "bpReading" (with value "148/92").`,
          initialCode: `{\n  "patientId": "PT-9983",\n  "subjective": "Patient reports occasional headaches and mild chest tightness.",\n  "bpReading": "148/92",\n  "assessment": "Essential Hypertension",\n  "plan": "Initiate Lisinopril 10mg daily. Return in 2 weeks for blood pressure recheck."\n}`
        }
      },
      {
        id: '5-3',
        title: 'Quiz: Medical Workflows',
        type: 'quiz',
        estimatedTimeMinutes: 3,
        quiz: {
          questions: [
            {
              question: 'Which of the following clinical administration tasks is best suited for automation with an LLM under human supervision?',
              options: ['Directly prescribing controlled substances to a patient without scheduling an interview.', 'Automatically drafting insurance prior authorization appeal letters by cross-referencing patient records with clinical criteria.', 'Performing complex laparoscopic surgeries using local cache files.', 'Hosting the hospital\'s secure database directly on the browser\'s frontend.'],
              correctAnswer: 'Automatically drafting insurance prior authorization appeal letters by cross-referencing patient records with clinical criteria.'
            },
            {
              question: 'When translating clinical instructions for patients, what is the best practice for utilizing an LLM?',
              options: ['Pasting the patient\'s raw EHR profile and printing the first translation generated.', 'Instructing the LLM to write in highly academic, complex medical jargon to maintain legal precision.', 'Instructing the LLM to translate to the patient\'s preferred language at an accessible reading level (e.g. 5th-grade), followed by rigorous clinical review of the medication instructions.', 'Letting the AI automatically email the patient directly from its local context window.'],
              correctAnswer: 'Instructing the LLM to translate to the patient\'s preferred language at an accessible reading level (e.g. 5th-grade), followed by rigorous clinical review of the medication instructions.'
            }
          ]
        }
      }
    ]
  }
];
