# Greywaken Clinical AI Workbook: Mapping the Frontier
**A Reference Guide for Medical Professionals**

---

## Module 1: Software as a Biological System
*Deconstruct modern software architecture using clinical anatomy.*

Welcome, Doctor! Entering the world of tech can feel like learning a foreign language. Let's skip the jargon and translate software architecture into a language you already speak: **Human Biology**.

### The Body-Software Map
- **The Skin & Senses (Frontend):** The visual screen you tap on. Like skin, it is the outer boundary. Like eyes, it detects interactions (clicks and taps).
- **The Nervous System (APIs):** The rapid-signaling neural pathways. When you click a button, the API carries that sensory signal from the skin down to the internal organs.
- **The Visceral Organs (Backend):** The heavy engines (Servers). They sit silently in the dark, digesting inputs and executing complex clinical risk scores.
- **The Hippocampus (Database):** Long-term memory storage. Where all patient histories are locked away safely.

### The Clinical Chart of Data (JSON)
In medicine, you write progress notes using a standard format (SOAP) so everyone can read your chart. In software, apps do the exact same thing using a format called **JSON**. JSON simply maps "labels" to "values".
```json
{
  "patientName": "John Doe",
  "chiefComplaint": "chest pain",
  "heartRateBpm": 108
}
```

---

## Module 2: Anatomy & Physiology of the LLM Brain
*Learn how large language models think, recall medical facts, and process clinical text.*

How does an AI read a medical textbook? It doesn't see letters or words. It turns text into numbers. Let's break this down into two simple concepts: **Tokens** and **Embeddings**.

### Neurons of Meaning
1. **Tokens (The Syllables):** An LLM chops words into tiny pieces called Tokens. A common word like "Heart" is 1 token. A complex word like "Levothyroxine" gets chopped into four pieces.
2. **Embeddings (The GPS Map):** Once words are chopped up, the AI gives them a mathematical GPS coordinate on a giant 3D map. Words with similar meanings (like "chest pain" and "angina") are placed right next to each other on the map. Totally unrelated words (like "cabbage") are placed thousands of miles away.

### The AI Brain: Transformers & Next-Token Prediction
At its core, an LLM is doing one incredibly simple thing over and over again: **Predicting the next word**. It is exactly like the autocomplete feature on your iPhone, but scaled up by a trillion times.

**The Transformer (Attention Mechanism)**
How does it know which word to predict so accurately? It uses the Transformer architecture. Imagine a triage nurse reading a 50-page messy patient chart. The nurse pays intense **attention** to the phrase *"Allergy: Penicillin"* and ignores *"Patient wore a blue shirt"*. Transformers mathematically "pay attention" to the most clinically relevant words in your prompt.

### Multimodality (The Senses of AI)
Standard text LLMs are like diagnosing a patient over the phone. **Multimodal models** (like Gemini 1.5 Pro) are like standing in the exam room. They can look at a chest X-ray or listen to a live patient interview because they translate images and audio into the *exact same GPS map* as text!

---

## Module 3: Clinicians as "Vibe Coders"
*Learn to direct AI clinical reasoning.*

Today, you can build full-scale clinical software yourself by becoming a **"Vibe Coder"**. You don't write code; you direct it, exactly like supervising a brilliant but highly literal resident physician.

### Prompting Guidelines
1. **Define the Persona:** Give the AI a role. *"Act as a Senior Clinical Informatics Specialist."*
2. **Set Clinical Guardrails:** Tell the resident what to avoid. *"Ensure this pediatric dosage calculator caps at the adult maximum weight."*

### Advanced Clinical Reasoning: Chain-of-Thought (CoT)
A standard prompt can lead to **Premature Closure**—the AI jumping to an obvious conclusion without considering complex zebras.
You can fix this by forcing the AI to "show its math" using Chain-of-Thought prompting, which mirrors how medical schools teach the Differential Diagnosis process.
**Example:** *"A 24yo female presents with RLQ pain and fever. Before giving a final diagnosis, think step-by-step. 1. List top 5 differentials. 2. State clinical findings for each. 3. Propose imaging. 4. Finally, state the most likely diagnosis."*

---

## Module 4: The Hippocratic Oath for Clinical AI
*Enforce patient privacy and diagnose AI hallucinations.*

### Preserving Patient Privacy: HIPAA & PHI
The Golden Rule of Clinical AI: **NEVER input raw patient identifiers into standard consumer AI models.**
To use AI safely:
1. **De-identification:** Remove all 18 HIPAA identifiers before pasting any chart text.
2. **Business Associate Agreements (BAAs):** Only input raw data into hospital-approved enterprise environments that legally guarantee **Zero-Data Retention**.

### The Open-Book Exam: RAG
If LLMs calculate the next word using math, they can invent fake citations that "look" mathematically perfect. This is called a **Hallucination**.
How do hospitals use AI safely? **Retrieval-Augmented Generation (RAG)**.
Instead of asking the AI to guess an answer from memory, RAG forces the AI to take an "open-book exam".
1. **Retrieve:** The system searches a verified internal hospital database.
2. **Augment:** It pulls the exact paragraphs from the verified PDF.
3. **Generate:** The AI answers the question using ONLY the provided text.

---

## Module 5: Clinical Workflows in Action
*Master high-yield workflows and explore Agentic AI.*

### Agentic AI (The Autonomous Resident)
The next frontier is moving from passive chatbots to **Agentic AI**. A chatbot only *talks*. An Agent can *take action* using digital tools.
- **Calculators:** An agent writes a script, runs it in a calculator tool, and returns the verified medical score.
- **The EHR Tool:** An agent autonomously uses a scheduling API to find an open slot and book a patient appointment.
Agentic workflows upgrade the AI from a medical textbook to a resident physician synthesizing information and placing orders.

---

## Module 6: The Clinical AI Landscape
*Navigate the modern ecosystem of specialized AI models.*

### The Big Three
- **Google Gemini (The Multimodal Researcher):** Massive context window. Best tool for analyzing huge stacks of PDFs, patient histories, and natively understanding medical imaging.
- **ChatGPT (The Creative Workhorse):** Incredible at code generation and intense Chain-of-Thought reasoning (o1/o3 models). Perfect for building clinical apps.
- **Claude by Anthropic (The Careful Scribe):** Built with "Constitutional AI." Pristine, nuanced prose. Best for drafting sensitive patient referral letters.

### Specialized AI: Perplexity
Perplexity is an engine built entirely on RAG. It searches the live internet (or PubMed), reads the top 20 links, and writes a synthesis **with inline footnote citations**.

---

## Module 7: The World of AI: Mapping the Frontier
*Explore the global AI ecosystem and model architectures.*

### Where AI Lives: Open vs. Closed
- **Closed Source (Proprietary):** Like a proprietary drug (e.g., GPT-4). You pay to use it, but the company keeps the recipe a secret. Cloud-hosted.
- **Open Source & Hugging Face:** Like a generic drug (e.g., Llama 3). The recipe is public. **Hugging Face** is the global library where developers share these models for free. Hospitals can download them and run them **locally** on their own servers for 100% HIPAA compliance.

### Architecture: How the Brain is Built
- **Small vs. Large Models:** A 7-Billion Parameter model (fast medical student) vs a 1-Trillion Parameter model (the Chief of Staff).
- **Mixture of Experts (MoE):** MoE routes your prompt to specialized sub-networks (like a hospital routing a patient to a Cardiologist instead of a General Practitioner).
- **Thinking vs. Flash Models:**
  - *Flash Models (System 1):* Split-second reflexes (Gemini 1.5 Flash). Cheap, perfect for real-time chatbots.
  - *Thinking Models (System 2):* Slow, deliberate reasoning (OpenAI o1). Takes 10-30 seconds to answer via Chain of Thought. Best for complex diagnostics.

### How to Judge an AI
The gold standard is the **LMSYS Chatbot Arena**. It operates exactly like a blind, randomized controlled clinical trial. Humans vote on which answer is better between two anonymous models.

---

## Appendix: Visual Learning References
Below is the curated list of recommended YouTube explainer videos corresponding to the curriculum:

**Module 1: Software Biology & JSON**
- *What is an API? (Codecademy)* - https://youtu.be/s7wmiS2mSXY
- *JSON in 100 Seconds (Fireship)* - https://youtu.be/iiADhChRriM

**Module 2: The LLM Brain**
- *Large Language Models explained briefly* - https://youtu.be/LPZh9BOjkQs
- *How Large Language Models Work* - https://youtu.be/5sLYAQS9sWQ
- *But what is a neural network?* - https://youtu.be/aircAruvnKk
- *Transformers, the tech behind LLMs* - https://youtu.be/wjZofJX0v4M
- *How LLMs Actually Generate Text* - https://youtu.be/NKnZYvZA7w4

**Module 3: Prompt Engineering**
- *Prompt Engineering Tutorial* - https://youtu.be/jC4v5AS4ART
- *Chain of Thought Prompting Explained* - https://youtu.be/LGLmxcBv0B8

**Module 4: RAG & Hallucinations**
- *Why do LLMs Hallucinate?* - https://youtu.be/8IhiLYieyQ0
- *What is Retrieval-Augmented Generation (RAG)?* - https://youtu.be/T-D1OfcDW1M

**Module 5: Agentic AI**
- *AI Agents Explained by Dr. Andrew Ng* - https://youtu.be/F8NKVhkZZWI

**Module 6: Frontier Models**
- *ChatGPT vs Claude vs Gemini* - https://youtu.be/kC6yO9N_Bko
- *Perplexity AI Tutorial* - https://youtu.be/D5R4_J4vR0E

**Module 7: The AI World**
- *Hugging Face* - https://huggingface.co
- *LMSYS Chatbot Arena* - https://lmarena.ai
