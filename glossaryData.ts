import { TechTerm } from './types';

export const TECH_GLOSSARY: TechTerm[] = [
  {
    term: "Token",
    definition: "Small chunks of text AI reads (approximately 0.75 words)",
    analogy: "Like medical abbreviations - 'HTN' vs 'Hypertension'. AI breaks text into pieces for processing.",
    whyItMatters: "AI services charge by token, not by word. Understanding tokens helps estimate costs and stay within context limits.",
    relatedTerms: ["Context Window", "Model"],
    usedInModules: ["med-2"]
  },
  {
    term: "Context Window",
    definition: "AI's 'working memory' - the maximum amount of text it can process at once",
    analogy: "Like remembering patients during rounds. Small context = 1-2 patients, Large context = 50+ patients.",
    whyItMatters: "Long documents may exceed the limit, causing errors or missed information.",
    relatedTerms: ["Token", "Parameters"],
    usedInModules: ["med-2"]
  },
  {
    term: "Parameters",
    definition: "AI's 'knowledge capacity' - the size and complexity of the model",
    analogy: "Like years of medical training: Medical Student (3B) → Resident (8B) → Attending (70B+).",
    whyItMatters: "More parameters = smarter but slower and more expensive. Match model size to task complexity.",
    relatedTerms: ["Model", "GPU"],
    usedInModules: ["med-2"]
  },
  {
    term: "GPU",
    definition: "Graphics Processing Unit - specialized chip for AI calculations",
    analogy: "Like a hospital's central lab equipment. Powerful, shared resource for complex analyses.",
    whyItMatters: "Large AI models require cloud GPUs, meaning your data travels to remote servers (privacy consideration).",
    relatedTerms: ["Parameters", "Model", "Cloud"],
    usedInModules: ["med-2"]
  },
  {
    term: "Open Source Model",
    definition: "Free AI model you can run locally (e.g., Llama, Gemma)",
    analogy: "Like generic drugs - accessible, transparent, customizable, but may be less powerful.",
    whyItMatters: "Better privacy (data stays local), but requires technical setup and may have lower performance.",
    relatedTerms: ["Closed Source Model", "Model"],
    usedInModules: ["med-2"]
  },
  {
    term: "Closed Source Model",
    definition: "Proprietary AI (e.g., GPT-4, Gemini, Claude)",
    analogy: "Like brand-name drugs - most powerful, professionally supported, but proprietary and costs money.",
    whyItMatters: "Most powerful models, but data goes to cloud servers. Requires careful HIPAA compliance.",
    relatedTerms: ["Open Source Model", "Model", "BAA"],
    usedInModules: ["med-2", "med-3"]
  },
  {
    term: "Prompt",
    definition: "Your instruction to AI - like an order to a consultant",
    analogy: "Like an H&P template. Clear structure (Role, Task, Context, Format) gets better results.",
    whyItMatters: "Better prompts = better results. Prompt engineering is a core skill for AI use.",
    relatedTerms: ["Model", "Token"],
    usedInModules: ["med-1", "med-4"]
  },
  {
    term: "Model",
    definition: "The trained AI system (like a medical textbook)",
    analogy: "Harrison's (comprehensive) vs Pocket Medicine (quick reference). Different models for different tasks.",
    whyItMatters: "Choosing the right model balances capability, speed, cost, and privacy.",
    relatedTerms: ["Parameters", "Open Source Model", "Closed Source Model"],
    usedInModules: ["med-1", "med-2"]
  },
  {
    term: "API",
    definition: "Application Programming Interface - messenger between your app and AI service",
    analogy: "Like a lab requisition system. You send an order, it processes, returns structured results.",
    whyItMatters: "APIs connect your tools to AI models. Understanding APIs helps troubleshoot issues.",
    relatedTerms: ["Model", "JSON"],
    usedInModules: ["med-1"]
  },
  {
    term: "Training Data",
    definition: "Text AI learned from (like medical school curriculum)",
    analogy: "What you learn in medical school shapes your knowledge. AI's training data shapes its capabilities and biases.",
    whyItMatters: "Bias in training data leads to bias in AI outputs. Always verify clinical information.",
    relatedTerms: ["Model", "Bias", "Hallucination"],
    usedInModules: ["med-5"]
  },
  {
    term: "Temperature",
    definition: "AI's 'creativity' setting (0 = factual, 1 = creative)",
    analogy: "Like choosing between evidence-based guidelines (low temp) vs brainstorming differential diagnoses (high temp).",
    whyItMatters: "Adjust temperature for task: Low for clinical documentation, higher for patient education creativity.",
    relatedTerms: ["Prompt", "Model"],
    usedInModules: ["med-4"]
  },
  {
    term: "Fine-tuning",
    definition: "Customizing AI for specific tasks (like fellowship training)",
    analogy: "General medical training → Cardiology fellowship. Specializing a model for specific medical tasks.",
    whyItMatters: "Fine-tuned models perform better on specialty-specific tasks but require expertise to create.",
    relatedTerms: ["Model", "Training Data"],
    usedInModules: ["med-6"]
  },
  {
    term: "Hallucination",
    definition: "When AI confidently makes up false information",
    analogy: "Like confabulation in neurology - confident but incorrect information presented as fact.",
    whyItMatters: "Always verify AI outputs, especially clinical information. Never trust AI blindly.",
    relatedTerms: ["Model", "Training Data"],
    usedInModules: ["med-2", "med-5"]
  },
  {
    term: "BAA",
    definition: "Business Associate Agreement - legal contract for HIPAA-compliant AI tools",
    analogy: "Like credentialing for hospital privileges. Required legal agreement to handle PHI.",
    whyItMatters: "Without a BAA, you cannot legally send PHI to an AI service. Always check before using tools.",
    relatedTerms: ["PHI", "HIPAA", "Closed Source Model"],
    usedInModules: ["med-3"]
  },
  {
    term: "PHI",
    definition: "Protected Health Information - any health data that can identify a patient",
    analogy: "The 18 HIPAA identifiers - names, dates, MRNs, etc. Must be protected or removed.",
    whyItMatters: "Sending PHI to non-compliant AI tools violates HIPAA. Always de-identify first.",
    relatedTerms: ["De-identification", "HIPAA", "BAA"],
    usedInModules: ["med-3"]
  },
  {
    term: "De-identification",
    definition: "Removing identifiers from patient data",
    analogy: "Like redacting a legal document. Remove the 18 HIPAA identifiers before sharing data.",
    whyItMatters: "Enables safe use of AI tools without HIPAA violations. Critical skill for healthcare AI use.",
    relatedTerms: ["PHI", "HIPAA"],
    usedInModules: ["med-3"]
  },
  {
    term: "HIPAA",
    definition: "Health Insurance Portability and Accountability Act - US healthcare privacy law",
    analogy: "The rules of the road for patient data. Protects patient privacy and sets penalties for violations.",
    whyItMatters: "Violating HIPAA can result in fines up to $1.5M per violation. Compliance is non-negotiable.",
    relatedTerms: ["PHI", "De-identification", "BAA"],
    usedInModules: ["med-3"]
  },
  {
    term: "Bias",
    definition: "Systematic errors in AI outputs due to training data imbalances",
    analogy: "Like selection bias in clinical trials. If training data lacks diversity, AI performs poorly on underrepresented groups.",
    whyItMatters: "AI bias can lead to inequitable healthcare outcomes. Always evaluate AI for fairness.",
    relatedTerms: ["Training Data", "Model"],
    usedInModules: ["med-5"]
  },
  {
    term: "JSON",
    definition: "JavaScript Object Notation - structured text format for data exchange",
    analogy: "Like a standardized lab report format. Organized, labeled data that computers can easily read.",
    whyItMatters: "APIs use JSON to send/receive data. Understanding JSON helps troubleshoot integration issues.",
    relatedTerms: ["API"],
    usedInModules: ["med-1"]
  },
  {
    term: "Cloud",
    definition: "Remote servers accessed over the internet",
    analogy: "Like a centralized hospital lab vs point-of-care testing. Powerful but data leaves your location.",
    whyItMatters: "Most powerful AI models run in the cloud. Understand privacy implications of cloud-based tools.",
    relatedTerms: ["GPU", "Model", "API"],
    usedInModules: ["med-2", "med-6"]
  }
];

// Helper function to get term by name
export function getTerm(termName: string): TechTerm | undefined {
  return TECH_GLOSSARY.find(t => t.term.toLowerCase() === termName.toLowerCase());
}

// Helper function to get terms used in a module
export function getTermsForModule(moduleId: string): TechTerm[] {
  return TECH_GLOSSARY.filter(t => t.usedInModules.includes(moduleId));
}

// Helper function to search glossary
export function searchGlossary(query: string): TechTerm[] {
  const lowerQuery = query.toLowerCase();
  return TECH_GLOSSARY.filter(t => 
    t.term.toLowerCase().includes(lowerQuery) ||
    t.definition.toLowerCase().includes(lowerQuery) ||
    t.analogy.toLowerCase().includes(lowerQuery)
  );
}
