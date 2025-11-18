import React from 'react';
import { Module } from './types';
import { BrainIcon, CpuChipIcon, ShieldCheckIcon, LightBulbIcon, LockClosedIcon } from './components/Icons';

const Callout = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
    <div className="my-6 p-4 bg-slate-800/50 rounded-lg flex items-start gap-4 border border-slate-700">
        <div className="text-cyan-400 mt-1 flex-shrink-0">{icon}</div>
        <div className="text-slate-300">{children}</div>
    </div>
);

export const MEDICAL_MODULES_2_TO_7: Module[] = [
  // MODULE 2: How AI Thinks + Technical Concepts
  {
    id: 'med-2',
    title: 'Module 2: How AI Thinks (No Coding Required)',
    description: 'Understand AI fundamentals and technical concepts through medical analogies.',
    lessons: [
      {
        id: 'med-2-1',
        title: 'The AI Brain - Pattern Recognition',
        type: 'content',
        estimatedTimeMinutes: 4,
        referenceText: 'AI learns through pattern recognition in large datasets, similar to how medical students learn from cases. Neural networks identify correlations and make predictions based on training data.',
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="font-semibold text-cyan-400 mb-2">📌 TL;DR</p>
              <p className="text-slate-300">
                AI learns like medical students - by seeing thousands of examples and finding patterns. 
                It's not magic, it's math + massive data.
              </p>
            </div>
            <p className="text-lg text-slate-200">
              How does AI actually "think"? The answer: it doesn't think like humans. It recognizes patterns.
            </p>
            <Callout icon={<BrainIcon className="w-8 h-8" />}>
              <div>
                <p className="font-semibold text-white mb-2">🏥 Medical Analogy: Learning from Cases</p>
                <p className="text-slate-300 mb-3">
                  Think about how you learned medicine:
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li><strong className="text-cyan-400">Medical Student:</strong> Sees 100 cases of pneumonia → learns to recognize patterns</li>
                  <li><strong className="text-cyan-400">Resident:</strong> Sees 1,000 cases → recognizes subtle variations</li>
                  <li><strong className="text-cyan-400">Attending:</strong> Sees 10,000+ cases → expert pattern recognition</li>
                </ul>
                <p className="text-slate-300 mt-3">
                  AI works the same way, but it can "see" millions of examples in hours.
                </p>
              </div>
            </Callout>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <p className="font-semibold text-white mb-2">💡 Key Insight</p>
              <p className="text-slate-300">
                AI doesn't understand medicine the way you do. It recognizes statistical patterns. 
                That's why your clinical judgment is irreplaceable - you understand context, nuance, and the human element.
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'med-2-2',
        title: 'Understanding AI Models',
        type: 'content',
        estimatedTimeMinutes: 7,
        referenceText: 'AI models vary in size (parameters), accessibility (open vs closed source), and deployment (cloud vs local). Larger models are more capable but slower and more expensive. Open-source models offer privacy but require technical setup.',
        glossary: [
          { term: 'Parameters', definition: 'The AI\'s knowledge capacity - like years of medical training.' },
          { term: 'Open Source', definition: 'Free AI models you can run locally (like generic drugs).' },
          { term: 'Closed Source', definition: 'Proprietary AI models (like brand-name drugs).' }
        ],
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="font-semibold text-cyan-400 mb-2">📌 TL;DR</p>
              <p className="text-slate-300">
                AI models are like medical textbooks - some comprehensive (GPT-4), some quick reference (smaller models). 
                Choose based on your task complexity and privacy needs.
              </p>
            </div>
            <Callout icon={<BrainIcon className="w-8 h-8" />}>
              <div>
                <p className="font-semibold text-white mb-2">🏥 Parameters = Years of Training</p>
                <ul className="space-y-2 text-slate-300">
                  <li><strong className="text-cyan-400">3B parameters:</strong> Medical student - knows basics, needs supervision</li>
                  <li><strong className="text-cyan-400">8B parameters:</strong> Resident - solid foundation, handles most cases</li>
                  <li><strong className="text-cyan-400">70B+ parameters:</strong> Attending - expert-level, nuanced understanding</li>
                </ul>
                <p className="text-slate-300 mt-3">
                  💡 You don't need an "attending" AI for simple tasks like patient education handouts!
                </p>
              </div>
            </Callout>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="font-bold text-green-400 mb-2">🔓 Open Source (Generic)</p>
                <p className="text-sm text-slate-300 mb-2">Examples: Llama, Gemma</p>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>✅ Free to use</li>
                  <li>✅ Run locally (better privacy)</li>
                  <li>✅ Customizable</li>
                  <li>❌ Less powerful</li>
                  <li>❌ Requires setup</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="font-bold text-blue-400 mb-2">🔒 Closed Source (Brand-name)</p>
                <p className="text-sm text-slate-300 mb-2">Examples: GPT-4, Gemini</p>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>✅ Most powerful</li>
                  <li>✅ Easy to use</li>
                  <li>✅ Regular updates</li>
                  <li>❌ Costs money</li>
                  <li>❌ Data goes to cloud</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'med-2-3',
        title: 'Tokens & Context - AI\'s Working Memory',
        type: 'content',
        estimatedTimeMinutes: 5,
        referenceText: 'Tokens are text chunks (~0.75 words). Context window is the AI\'s working memory limit. Understanding these helps avoid errors and optimize costs.',
        glossary: [
          { term: 'Token', definition: 'Small chunks of text AI reads (≈0.75 words).' },
          { term: 'Context Window', definition: 'AI\'s working memory - max text it can process at once.' }
        ],
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="font-semibold text-cyan-400 mb-2">📌 TL;DR</p>
              <p className="text-slate-300">
                Tokens are like medical abbreviations. Context window is like remembering patients during rounds. 
                Know the limits to avoid errors.
              </p>
            </div>
            <Callout icon={<BrainIcon className="w-8 h-8" />}>
              <div>
                <p className="font-semibold text-white mb-2">🏥 Tokens = Medical Abbreviations</p>
                <p className="text-slate-300 mb-2">AI breaks text into pieces:</p>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li>"Hypertension" = 2 tokens: "Hyper" + "tension"</li>
                  <li>"HTN" = 1 token</li>
                  <li>"Patient presents with chest pain" = 6 tokens</li>
                </ul>
                <p className="text-slate-300 mt-3">
                  <strong className="text-white">Rule of thumb:</strong> 1 token ≈ 0.75 words ≈ 4 characters
                </p>
              </div>
            </Callout>
            <Callout icon={<BrainIcon className="w-8 h-8" />}>
              <div>
                <p className="font-semibold text-white mb-2">🏥 Context Window = Working Memory</p>
                <p className="text-slate-300 mb-2">Like remembering patients during rounds:</p>
                <ul className="space-y-2 text-slate-300">
                  <li><strong className="text-cyan-400">4K tokens (~3 pages):</strong> Remember 1-2 patients</li>
                  <li><strong className="text-cyan-400">32K tokens (~25 pages):</strong> Remember 5-10 patients</li>
                  <li><strong className="text-cyan-400">128K tokens (~100 pages):</strong> Remember 50+ patients</li>
                </ul>
                <p className="text-yellow-400 mt-3 text-sm">
                  ⚠️ Exceed the limit = AI forgets information or gives errors!
                </p>
              </div>
            </Callout>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <p className="font-semibold text-white mb-2">💰 Why This Matters</p>
              <p className="text-slate-300 text-sm">
                AI services charge by the token. A 5-page chart summary costs ~$0.08 with GPT-4. 
                Cheaper than coffee, saves 15 minutes!
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'med-2-4',
        title: 'Quiz: Understanding AI',
        type: 'quiz',
        estimatedTimeMinutes: 3,
        quiz: {
          questions: [
            {
              question: 'How does AI primarily "learn"?',
              options: [
                'By reading medical textbooks like humans',
                'By recognizing patterns in large datasets',
                'By memorizing every possible scenario',
                'By connecting to the internet in real-time'
              ],
              correctAnswer: 'By recognizing patterns in large datasets',
              explanation: 'AI learns through pattern recognition in training data, similar to how doctors learn from seeing many cases.'
            },
            {
              question: 'You need to analyze a 20-page patient chart. Your AI has a 4K token limit (~3 pages). What should you do?',
              options: [
                'Paste all 20 pages - AI will figure it out',
                'Use a model with larger context (32K+) or summarize first',
                'Give up - AI can\'t help',
                'Split into 20 separate requests'
              ],
              correctAnswer: 'Use a model with larger context (32K+) or summarize first',
              explanation: 'Exceeding context limits causes errors or missed information. Use a larger model or break the task into chunks.'
            },
            {
              question: 'Which model would you choose for generating a simple patient education handout?',
              options: [
                'Largest model (GPT-4) - always use the best',
                'Smallest model (3B) - fast and free, good enough for simple tasks',
                'No AI - too risky',
                'Ask the patient to write it'
              ],
              correctAnswer: 'Smallest model (3B) - fast and free, good enough for simple tasks',
              explanation: 'Simple tasks don\'t need expensive large models. Save those for complex clinical reasoning.'
            }
          ]
        }
      }
    ]
  },

  // MODULE 3: Protecting Patient Privacy
  {
    id: 'med-3',
    title: 'Module 3: Protecting Patient Privacy',
    description: 'Master HIPAA compliance and safe AI use with patient data.',
    lessons: [
      {
        id: 'med-3-1',
        title: 'HIPAA in the AI Era',
        type: 'content',
        estimatedTimeMinutes: 4,
        referenceText: 'HIPAA protects patient privacy. PHI includes 18 identifiers. Using non-compliant AI tools with PHI violates HIPAA. Penalties range from $100 to $1.5M per violation.',
        glossary: [
          { term: 'PHI', definition: 'Protected Health Information - any health data that can identify a patient.' },
          { term: 'HIPAA', definition: 'Health Insurance Portability and Accountability Act.' },
          { term: 'BAA', definition: 'Business Associate Agreement - required for HIPAA-compliant AI tools.' }
        ],
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="font-semibold text-cyan-400 mb-2">📌 TL;DR</p>
              <p className="text-slate-300">
                HIPAA violations = $100 to $1.5M fines. Never paste PHI into ChatGPT or similar tools. 
                Use de-identification or HIPAA-compliant tools with BAAs.
              </p>
            </div>
            <div className="bg-red-500/10 border-l-4 border-red-500 p-6 rounded-r-lg">
              <p className="font-bold text-xl text-red-400 mb-3">⚠️ Real Consequences</p>
              <p className="text-slate-300 mb-3">
                HIPAA violations are serious:
              </p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li><strong className="text-red-400">Tier 1:</strong> $100-$50,000 per violation (unknowing)</li>
                <li><strong className="text-red-400">Tier 2:</strong> $1,000-$50,000 (reasonable cause)</li>
                <li><strong className="text-red-400">Tier 3:</strong> $10,000-$50,000 (willful neglect, corrected)</li>
                <li><strong className="text-red-400">Tier 4:</strong> $50,000-$1.5M (willful neglect, not corrected)</li>
              </ul>
              <p className="text-yellow-400 mt-3 text-sm">
                Plus: Loss of medical license, criminal charges, reputation damage
              </p>
            </div>
            <Callout icon={<ShieldCheckIcon className="w-8 h-8" />}>
              <div>
                <p className="font-semibold text-white mb-2">✅ What IS Allowed</p>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>✅ De-identified data (remove all 18 identifiers)</li>
                  <li>✅ HIPAA-compliant AI tools with BAA</li>
                  <li>✅ General medical questions (no patient specifics)</li>
                  <li>✅ Hypothetical scenarios</li>
                </ul>
              </div>
            </Callout>
            <Callout icon={<LockClosedIcon className="w-8 h-8" />}>
              <div>
                <p className="font-semibold text-white mb-2">❌ What is NOT Allowed</p>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>❌ Pasting patient notes into ChatGPT</li>
                  <li>❌ Using patient names in prompts</li>
                  <li>❌ Sharing MRNs, dates of birth, addresses</li>
                  <li>❌ Any of the 18 HIPAA identifiers</li>
                </ul>
              </div>
            </Callout>
          </div>
        )
      },
      {
        id: 'med-3-2',
        title: 'The 18 HIPAA Identifiers',
        type: 'content',
        estimatedTimeMinutes: 5,
        referenceText: 'HIPAA defines 18 identifiers that must be removed for de-identification: names, dates, phone numbers, email, SSN, MRN, account numbers, certificate numbers, vehicle IDs, device IDs, URLs, IP addresses, biometric IDs, photos, and any unique identifying number.',
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="font-semibold text-cyan-400 mb-2">📌 TL;DR</p>
              <p className="text-slate-300">
                18 identifiers must be removed: names, dates (except year), contact info, IDs, and anything unique. 
                Memory aid: "If it could identify your mom, remove it."
              </p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <p className="font-semibold text-white mb-3">📋 The 18 HIPAA Identifiers</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="space-y-1 text-slate-300">
                  <p>1. Names</p>
                  <p>2. Geographic subdivisions smaller than state</p>
                  <p>3. Dates (except year)</p>
                  <p>4. Phone numbers</p>
                  <p>5. Fax numbers</p>
                  <p>6. Email addresses</p>
                  <p>7. Social Security numbers</p>
                  <p>8. Medical record numbers</p>
                  <p>9. Health plan numbers</p>
                </div>
                <div className="space-y-1 text-slate-300">
                  <p>10. Account numbers</p>
                  <p>11. Certificate/license numbers</p>
                  <p>12. Vehicle IDs and serial numbers</p>
                  <p>13. Device IDs and serial numbers</p>
                  <p>14. Web URLs</p>
                  <p>15. IP addresses</p>
                  <p>16. Biometric identifiers</p>
                  <p>17. Full-face photos</p>
                  <p>18. Any other unique identifying number</p>
                </div>
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="font-semibold text-white mb-2">✅ What You CAN Keep</p>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>✅ Age in years (but not dates of birth)</li>
                <li>✅ Gender</li>
                <li>✅ State (but not city, zip code)</li>
                <li>✅ Year (but not month/day)</li>
                <li>✅ General diagnoses and symptoms</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: 'med-3-3',
        title: 'De-identification Exercise',
        type: 'exercise',
        estimatedTimeMinutes: 6,
        referenceText: 'Practice de-identifying clinical notes by removing all 18 HIPAA identifiers while preserving clinical utility.',
        exercise: {
          prompt: (
            <div>
              <p className="mb-4">De-identify this clinical note by removing all HIPAA identifiers:</p>
              <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-slate-300 mb-4">
                <p>"John Smith, DOB 3/15/1965, MRN 123456, presented to clinic on 11/20/2024 with chest pain. 
                Patient lives at 123 Main St, Boston, MA 02101. Phone: 617-555-1234. Email: jsmith@email.com. 
                Patient is a 59-year-old male with history of hypertension and diabetes."</p>
              </div>
              <p className="text-sm text-slate-400">
                Rewrite this note with all identifiers removed, but keep it clinically useful.
              </p>
            </div>
          ),
          evaluationPrompt: 'Evaluate if the user successfully removed all 18 HIPAA identifiers (name, DOB, MRN, address, phone, email, specific dates) while keeping clinical information (age, gender, diagnoses). The de-identified version should say something like: "Patient, age 59, male, presented with chest pain. History of hypertension and diabetes."'
        }
      },
      {
        id: 'med-3-4',
        title: 'Quiz: HIPAA Compliance',
        type: 'quiz',
        estimatedTimeMinutes: 3,
        quiz: {
          questions: [
            {
              question: 'Which of the following is properly de-identified?',
              options: [
                'John Smith, age 59, with diabetes',
                'Patient, age 59, with diabetes',
                'Patient from Boston with diabetes',
                'MRN 123456, age 59, with diabetes'
              ],
              correctAnswer: 'Patient, age 59, with diabetes',
              explanation: 'Only age and diagnosis are allowed. Names, cities, and MRNs are identifiers that must be removed.'
            },
            {
              question: 'A colleague wants to use ChatGPT to summarize patient notes. What should you tell them?',
              options: [
                'Great idea - it saves time!',
                'Only if the patient consents',
                'De-identify first, or use a HIPAA-compliant tool with BAA',
                'It\'s okay for internal use'
              ],
              correctAnswer: 'De-identify first, or use a HIPAA-compliant tool with BAA',
              explanation: 'ChatGPT is not HIPAA-compliant. Must de-identify or use compliant tools with Business Associate Agreements.'
            }
          ]
        }
      }
    ]
  },

  // MODULE 4: Advanced Prompt Engineering
  {
    id: 'med-4',
    title: 'Module 4: Advanced Prompt Engineering for Clinicians',
    description: 'Master the art of writing effective prompts for clinical workflows.',
    lessons: [
      {
        id: 'med-4-1',
        title: 'Documentation Workflows',
        type: 'content',
        estimatedTimeMinutes: 6,
        referenceText: 'Effective prompts for clinical documentation include role, task, context, and format. SOAP notes, H&P, and discharge summaries benefit from structured prompts.',
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="font-semibold text-cyan-400 mb-2">📌 TL;DR</p>
              <p className="text-slate-300">
                Good prompts = Role + Task + Context + Format. Use templates for SOAP notes, H&P, discharge summaries. 
                Always review AI output before using.
              </p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <p className="font-semibold text-white mb-3">📝 The 4-Part Prompt Formula</p>
              <div className="space-y-2 text-sm text-slate-300">
                <p><strong className="text-cyan-400">1. Role:</strong> "You are a medical documentation assistant"</p>
                <p><strong className="text-cyan-400">2. Task:</strong> "Create a SOAP note"</p>
                <p><strong className="text-cyan-400">3. Context:</strong> "For a 65yo male with chest pain, HTN, DM"</p>
                <p><strong className="text-cyan-400">4. Format:</strong> "Use standard SOAP format with clear sections"</p>
              </div>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-slate-300">
              <p className="text-slate-500 mb-2">Example SOAP Note Prompt:</p>
              <p>"Create a SOAP note for a follow-up visit. Patient is a 65-year-old male with hypertension and diabetes. 
              Chief complaint: chest pain for 2 days. Vital signs: BP 145/90, HR 88, RR 16, Temp 98.6°F. 
              Physical exam: Regular heart rhythm, no murmurs. Lungs clear. Format as: Subjective, Objective, Assessment, Plan."</p>
            </div>
          </div>
        )
      },
      {
        id: 'med-4-2',
        title: 'Clinical Decision Support Prompts',
        type: 'content',
        estimatedTimeMinutes: 7,
        referenceText: 'AI can assist with differential diagnosis when prompted correctly. Always include safety guardrails: "suggest possibilities, do not diagnose" and "I will verify with clinical judgment."',
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="font-semibold text-cyan-400 mb-2">📌 TL;DR</p>
              <p className="text-slate-300">
                AI can suggest differential diagnoses, but YOU make the diagnosis. Always add safety guardrails: 
                "suggest possibilities" and "I will verify."
              </p>
            </div>
            <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded-r-lg">
              <p className="font-bold text-yellow-400 mb-2">⚠️ Critical Safety Rule</p>
              <p className="text-slate-300 text-sm">
                Never use AI for actual diagnosis. Use it to brainstorm possibilities, then verify with your 
                clinical knowledge, guidelines, and diagnostic workup.
              </p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-slate-300">
              <p className="text-slate-500 mb-2">Safe Differential Diagnosis Prompt:</p>
              <p>"A 45-year-old male presents with acute chest pain, diaphoresis, and shortness of breath. 
              Suggest top 5 differential diagnoses with brief rationale for each. I will verify with clinical 
              examination and appropriate diagnostic tests. Do not provide definitive diagnosis."</p>
            </div>
          </div>
        )
      },
      {
        id: 'med-4-3',
        title: 'Literature Search & Patient Communication',
        type: 'content',
        estimatedTimeMinutes: 6,
        referenceText: 'AI excels at literature synthesis and patient education material generation. Use specific prompts for reading level, format, and key points.',
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="font-semibold text-cyan-400 mb-2">📌 TL;DR</p>
              <p className="text-slate-300">
                AI is excellent for literature summaries and patient education. Specify reading level, 
                format, and key points. Always verify medical accuracy.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <p className="font-semibold text-white mb-2">📚 Literature Search</p>
                <div className="bg-slate-900 p-3 rounded text-xs font-mono text-slate-300">
                  "Summarize the 2023 ACC/AHA hypertension guidelines. Focus on: 1) BP targets for adults over 65, 
                  2) First-line medications, 3) Key changes from previous guidelines."
                </div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <p className="font-semibold text-white mb-2">👥 Patient Education</p>
                <div className="bg-slate-900 p-3 rounded text-xs font-mono text-slate-300">
                  "Create a one-page handout explaining atrial fibrillation for a 6th-grade reading level. 
                  Include: what it is, symptoms, why it matters, and treatment options."
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'med-4-4',
        title: 'Quiz: Prompt Engineering',
        type: 'quiz',
        estimatedTimeMinutes: 3,
        quiz: {
          questions: [
            {
              question: 'What are the 4 components of an effective clinical prompt?',
              options: [
                'Name, Date, Time, Location',
                'Role, Task, Context, Format',
                'Subject, Verb, Object, Predicate',
                'Introduction, Body, Conclusion, Summary'
              ],
              correctAnswer: 'Role, Task, Context, Format',
              explanation: 'Effective prompts include: Role (who AI should be), Task (what to do), Context (relevant details), Format (how to structure output).'
            },
            {
              question: 'When using AI for differential diagnosis suggestions, what safety guardrail should you include?',
              options: [
                'Ask AI to make the final diagnosis',
                'State "suggest possibilities, I will verify with clinical judgment"',
                'Trust AI completely for diagnosis',
                'Skip the physical examination'
              ],
              correctAnswer: 'State "suggest possibilities, I will verify with clinical judgment"',
              explanation: 'Always clarify that AI suggests possibilities only. You are responsible for diagnosis based on full clinical assessment.'
            }
          ]
        }
      }
    ]
  },

  // MODULE 5: AI Safety & Bias
  {
    id: 'med-5',
    title: 'Module 5: AI Safety & Bias in Healthcare',
    description: 'Recognize and mitigate AI risks, bias, and errors in clinical settings.',
    lessons: [
      {
        id: 'med-5-1',
        title: 'When AI Gets It Wrong',
        type: 'content',
        estimatedTimeMinutes: 5,
        referenceText: 'AI errors include hallucinations, outdated information, and context misunderstanding. Always verify critical information against authoritative sources.',
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="font-semibold text-cyan-400 mb-2">📌 TL;DR</p>
              <p className="text-slate-300">
                AI makes mistakes: hallucinations, outdated info, context errors. Always verify medications, 
                dosages, and critical clinical information.
              </p>
            </div>
            <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="font-bold text-red-400 mb-2">🚨 Real AI Errors in Healthcare</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• AI suggested incorrect medication dosage (10x too high)</li>
                <li>• AI cited non-existent research papers</li>
                <li>• AI confused similar-sounding medications</li>
                <li>• AI provided outdated treatment guidelines</li>
              </ul>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <p className="font-semibold text-white mb-2">✅ Verification Checklist</p>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>✓ Medication names and dosages → Check drug reference</li>
                <li>✓ Guidelines → Verify with official source</li>
                <li>✓ Statistics → Check original study</li>
                <li>✓ Contraindications → Verify with formulary</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: 'med-5-2',
        title: 'Recognizing Bias in AI',
        type: 'content',
        estimatedTimeMinutes: 6,
        referenceText: 'AI bias stems from training data imbalances. Healthcare AI has shown bias in race, gender, and socioeconomic status. Awareness and mitigation strategies are essential.',
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="font-semibold text-cyan-400 mb-2">📌 TL;DR</p>
              <p className="text-slate-300">
                AI bias = training data bias. Healthcare AI has shown racial, gender, and socioeconomic bias. 
                Be aware, question outputs, advocate for fairness.
              </p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="font-semibold text-white mb-2">📊 Real Examples of Healthcare AI Bias</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><strong className="text-yellow-400">Pulse Oximetry AI:</strong> Less accurate for darker skin tones</li>
                <li><strong className="text-yellow-400">Dermatology AI:</strong> Trained mostly on light skin, misses conditions in dark skin</li>
                <li><strong className="text-yellow-400">Risk Prediction:</strong> Underestimated illness severity in Black patients</li>
              </ul>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <p className="font-semibold text-white mb-2">🛡️ Mitigation Strategies</p>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• Question AI outputs for underrepresented groups</li>
                <li>• Use diverse training data when possible</li>
                <li>• Monitor outcomes across demographics</li>
                <li>• Maintain clinical judgment for all patients</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: 'med-5-3',
        title: 'Building Your AI Ethics Framework',
        type: 'content',
        estimatedTimeMinutes: 5,
        referenceText: 'Ethical AI use requires informed consent considerations, transparency with patients, equity awareness, and continuous monitoring.',
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="font-semibold text-cyan-400 mb-2">📌 TL;DR</p>
              <p className="text-slate-300">
                Ethical AI use: be transparent with patients, ensure equity, maintain human oversight, 
                and continuously monitor for bias and errors.
              </p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <p className="font-semibold text-white mb-3">🎯 Your AI Ethics Principles</p>
              <div className="space-y-3 text-sm text-slate-300">
                <div>
                  <p className="font-semibold text-cyan-400">1. Transparency</p>
                  <p>Tell patients when AI is used in their care</p>
                </div>
                <div>
                  <p className="font-semibold text-cyan-400">2. Equity</p>
                  <p>Ensure AI benefits all patients equally</p>
                </div>
                <div>
                  <p className="font-semibold text-cyan-400">3. Human Oversight</p>
                  <p>You make decisions, AI assists</p>
                </div>
                <div>
                  <p className="font-semibold text-cyan-400">4. Continuous Monitoring</p>
                  <p>Watch for bias, errors, and unintended consequences</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'med-5-4',
        title: 'Quiz: AI Safety & Bias',
        type: 'quiz',
        estimatedTimeMinutes: 3,
        quiz: {
          questions: [
            {
              question: 'AI suggests a medication dosage. What should you do?',
              options: [
                'Use it immediately - AI is accurate',
                'Verify against drug reference and clinical guidelines',
                'Ignore it completely',
                'Ask the patient if it sounds right'
              ],
              correctAnswer: 'Verify against drug reference and clinical guidelines',
              explanation: 'Always verify AI-suggested dosages. AI can hallucinate or provide outdated information.'
            },
            {
              question: 'Why is AI bias a concern in healthcare?',
              options: [
                'It makes AI slower',
                'It can lead to inequitable outcomes for underrepresented groups',
                'It costs more money',
                'It requires more training'
              ],
              correctAnswer: 'It can lead to inequitable outcomes for underrepresented groups',
              explanation: 'AI trained on biased data can perpetuate or amplify healthcare disparities, leading to worse outcomes for certain populations.'
            }
          ]
        }
      }
    ]
  },

  // MODULE 6: Building Workflows
  {
    id: 'med-6',
    title: 'Module 6: Building Your AI-Enhanced Workflow',
    description: 'Design and implement HIPAA-compliant AI workflows in your practice.',
    lessons: [
      {
        id: 'med-6-1',
        title: 'Workflow Analysis',
        type: 'content',
        estimatedTimeMinutes: 6,
        referenceText: 'Identify time-consuming tasks suitable for AI assistance. Evaluate ROI: time saved vs implementation effort and risk.',
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="font-semibold text-cyan-400 mb-2">📌 TL;DR</p>
              <p className="text-slate-300">
                Identify repetitive, time-consuming tasks. Evaluate: time saved, implementation effort, risk level. 
                Start with low-risk, high-value tasks.
              </p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <p className="font-semibold text-white mb-3">🎯 AI-Suitable Tasks</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-semibold text-green-400 mb-1">✅ Low-Risk, High-Value</p>
                  <ul className="text-slate-300 space-y-1">
                    <li>• Patient education materials</li>
                    <li>• Email drafting</li>
                    <li>• Literature summaries</li>
                    <li>• Documentation templates</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-red-400 mb-1">❌ High-Risk (Avoid)</p>
                  <ul className="text-slate-300 space-y-1">
                    <li>• Autonomous diagnosis</li>
                    <li>• Medication prescribing</li>
                    <li>• Critical decision-making</li>
                    <li>• Unsupervised patient interaction</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'med-6-2',
        title: 'Designing HIPAA-Compliant Workflows',
        type: 'content',
        estimatedTimeMinutes: 8,
        referenceText: 'HIPAA-compliant workflows require: de-identification, BAA-covered tools, audit trails, and staff training.',
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="font-semibold text-cyan-400 mb-2">📌 TL;DR</p>
              <p className="text-slate-300">
                HIPAA-compliant workflow: de-identify data OR use BAA-covered tools. Document everything. 
                Train staff. Monitor compliance.
              </p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <p className="font-semibold text-white mb-3">📋 Workflow Checklist</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>☐ Identify task and AI tool</li>
                <li>☐ Verify tool has BAA (if using PHI)</li>
                <li>☐ Create de-identification protocol (if needed)</li>
                <li>☐ Document workflow steps</li>
                <li>☐ Train staff on proper use</li>
                <li>☐ Establish audit trail</li>
                <li>☐ Monitor for compliance</li>
                <li>☐ Review and update quarterly</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: 'med-6-3',
        title: 'Choosing the Right AI Tools',
        type: 'content',
        estimatedTimeMinutes: 7,
        referenceText: 'Evaluate AI tools on: HIPAA compliance (BAA), accuracy, cost, ease of use, integration with EHR, and vendor reputation.',
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="font-semibold text-cyan-400 mb-2">📌 TL;DR</p>
              <p className="text-slate-300">
                Evaluate tools on: HIPAA compliance, accuracy, cost, ease of use, EHR integration. 
                Start with one tool, master it, then expand.
              </p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <p className="font-semibold text-white mb-3">🔍 Evaluation Criteria</p>
              <div className="space-y-2 text-sm text-slate-300">
                <p><strong className="text-cyan-400">1. HIPAA Compliance:</strong> Has BAA? Encrypted? Audit logs?</p>
                <p><strong className="text-cyan-400">2. Accuracy:</strong> Clinical validation? Error rate?</p>
                <p><strong className="text-cyan-400">3. Cost:</strong> Per-use or subscription? ROI positive?</p>
                <p><strong className="text-cyan-400">4. Usability:</strong> Easy to learn? Good support?</p>
                <p><strong className="text-cyan-400">5. Integration:</strong> Works with your EHR?</p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'med-6-4',
        title: 'Quiz: Building Workflows',
        type: 'quiz',
        estimatedTimeMinutes: 3,
        quiz: {
          questions: [
            {
              question: 'Which task is MOST suitable for AI assistance?',
              options: [
                'Making final diagnosis without physician review',
                'Generating patient education handouts for physician review',
                'Prescribing medications autonomously',
                'Replacing physician judgment'
              ],
              correctAnswer: 'Generating patient education handouts for physician review',
              explanation: 'Patient education materials are low-risk, high-value, and easy to verify. Perfect for AI assistance with human oversight.'
            },
            {
              question: 'What is required to use an AI tool with patient identifiable information?',
              options: [
                'Just patient consent',
                'Business Associate Agreement (BAA) with the vendor',
                'Nothing special - all AI tools are HIPAA compliant',
                'Only use on weekends'
              ],
              correctAnswer: 'Business Associate Agreement (BAA) with the vendor',
              explanation: 'BAA is legally required for any vendor that handles PHI. Without it, using the tool with PHI violates HIPAA.'
            }
          ]
        }
      }
    ]
  },

  // MODULE 7: Capstone Project
  {
    id: 'med-7',
    title: 'Module 7: Capstone Project - Your AI Action Plan',
    description: 'Demonstrate your AI competency and create your implementation plan.',
    lessons: [
      {
        id: 'med-7-1',
        title: 'Capstone Instructions',
        type: 'content',
        estimatedTimeMinutes: 5,
        referenceText: 'The capstone assesses knowledge across all modules and requires creation of a practical AI implementation plan for your practice.',
        content: (
          <div className="space-y-6">
            <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-cyan-500/10 border border-yellow-500/20 rounded-lg">
              <p className="font-semibold text-yellow-400 mb-2">🏆 Final Challenge</p>
              <p className="text-slate-300">
                This capstone demonstrates your AI competency and earns your IIHMRB certification. 
                You'll complete a knowledge assessment, practical exercises, and create your AI action plan.
              </p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <p className="font-semibold text-white mb-3">📋 Capstone Components</p>
              <div className="space-y-3 text-sm text-slate-300">
                <div>
                  <p className="font-semibold text-cyan-400">Section 1: Knowledge Assessment (25 min)</p>
                  <p>30 questions covering all modules. Minimum 75% to pass.</p>
                </div>
                <div>
                  <p className="font-semibold text-cyan-400">Section 2: Practical Exercises (30 min)</p>
                  <p>Write prompts, de-identify data, evaluate AI output, design workflow.</p>
                </div>
                <div>
                  <p className="font-semibold text-cyan-400">Section 3: Case Study (20 min)</p>
                  <p>Analyze a real-world AI implementation scenario.</p>
                </div>
                <div>
                  <p className="font-semibold text-cyan-400">Section 4: Your AI Action Plan (15 min)</p>
                  <p>Create your personal plan for implementing AI in your practice.</p>
                </div>
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="font-semibold text-white mb-2">🎓 Upon Completion</p>
              <p className="text-slate-300 text-sm">
                You'll receive your IIHMRB Certificate of Completion in AI for Healthcare Professionals. 
                This demonstrates your competency in safe, effective, and ethical AI use in clinical practice.
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'med-7-2',
        title: 'Section 1: Comprehensive Knowledge Assessment',
        type: 'quiz',
        estimatedTimeMinutes: 25,
        referenceText: 'Comprehensive assessment covering all 6 modules. Minimum 75% required to pass.',
        quiz: {
          questions: [
            // Module 1 Questions
            {
              question: 'What is the primary role of AI in clinical practice according to the "3 Rules of Safe AI Use"?',
              options: [
                'Replace physician decision-making',
                'Assist and augment, not replace clinical judgment',
                'Automate all documentation tasks',
                'Eliminate the need for continuing education'
              ],
              correctAnswer: 'Assist and augment, not replace clinical judgment',
              explanation: 'Rule #1: AI assists, you decide. AI is a tool to enhance your capabilities, not replace your expertise.'
            },
            {
              question: 'A patient asks if you used AI to help with their care plan. What should you do?',
              options: [
                'Deny using AI to avoid concerns',
                'Be transparent and explain how AI assisted',
                'Change the subject',
                'Only tell them if they specifically ask'
              ],
              correctAnswer: 'Be transparent and explain how AI assisted',
              explanation: 'Rule #2: Be transparent. Patients appreciate honesty about AI use when explained properly.'
            },
            // Module 2 Questions
            {
              question: 'How does AI primarily learn?',
              options: [
                'By reading medical textbooks sequentially',
                'By recognizing patterns in large datasets',
                'By connecting to the internet in real-time',
                'By memorizing every possible medical scenario'
              ],
              correctAnswer: 'By recognizing patterns in large datasets',
              explanation: 'AI learns through pattern recognition, similar to how doctors learn from seeing many cases.'
            },
            {
              question: 'What does "parameters" in an AI model represent?',
              options: [
                'The number of users',
                'The AI\'s knowledge capacity (like years of training)',
                'The cost per query',
                'The speed of processing'
              ],
              correctAnswer: 'The AI\'s knowledge capacity (like years of training)',
              explanation: 'Parameters are like years of medical training - more parameters generally mean more capability.'
            },
            {
              question: 'Your AI has a 4K token context window. You need to analyze a 20-page chart. What should you do?',
              options: [
                'Paste all 20 pages - AI will handle it',
                'Use a model with larger context (32K+) or summarize first',
                'Give up on using AI',
                'Split into 20 separate unrelated requests'
              ],
              correctAnswer: 'Use a model with larger context (32K+) or summarize first',
              explanation: 'Exceeding context limits causes errors. Use appropriate model size or break tasks intelligently.'
            },
            // Module 3 Questions
            {
              question: 'Which of the following is properly de-identified for AI use?',
              options: [
                'John Smith, age 59, with diabetes',
                'Patient, age 59, with diabetes',
                'Patient from Boston, MA with diabetes',
                'MRN 123456, age 59, with diabetes'
              ],
              correctAnswer: 'Patient, age 59, with diabetes',
              explanation: 'Only age and diagnosis are allowed. Names, cities, and MRNs must be removed.'
            },
            {
              question: 'What is required to use an AI tool with patient identifiable information?',
              options: [
                'Just patient verbal consent',
                'Business Associate Agreement (BAA) with the vendor',
                'Nothing - all AI tools are HIPAA compliant',
                'Only use during off-hours'
              ],
              correctAnswer: 'Business Associate Agreement (BAA) with the vendor',
              explanation: 'BAA is legally required for any vendor handling PHI. Without it, using PHI violates HIPAA.'
            },
            {
              question: 'Which is NOT one of the 18 HIPAA identifiers?',
              options: [
                'Patient age in years',
                'Patient date of birth',
                'Medical record number',
                'Email address'
              ],
              correctAnswer: 'Patient age in years',
              explanation: 'Age in years is allowed. Date of birth, MRN, and email are identifiers that must be removed.'
            },
            // Module 4 Questions
            {
              question: 'What are the 4 components of an effective clinical prompt?',
              options: [
                'Name, Date, Time, Location',
                'Role, Task, Context, Format',
                'Subject, Verb, Object, Predicate',
                'Who, What, When, Where'
              ],
              correctAnswer: 'Role, Task, Context, Format',
              explanation: 'Effective prompts: Role (who AI should be), Task (what to do), Context (details), Format (structure).'
            },
            {
              question: 'When using AI for differential diagnosis suggestions, what safety guardrail should you include?',
              options: [
                'Ask AI to make the final diagnosis',
                'State "suggest possibilities, I will verify with clinical judgment"',
                'Trust AI output completely',
                'Skip the physical examination'
              ],
              correctAnswer: 'State "suggest possibilities, I will verify with clinical judgment"',
              explanation: 'Always clarify AI suggests only. You are responsible for diagnosis based on full assessment.'
            },
            // Module 5 Questions
            {
              question: 'AI suggests a medication dosage. What should you do?',
              options: [
                'Use it immediately - AI is accurate',
                'Verify against drug reference and clinical guidelines',
                'Ignore it completely',
                'Ask the patient if it sounds right'
              ],
              correctAnswer: 'Verify against drug reference and clinical guidelines',
              explanation: 'Always verify AI-suggested dosages. AI can hallucinate or provide outdated information.'
            },
            {
              question: 'Why is AI bias a concern in healthcare?',
              options: [
                'It makes AI slower',
                'It can lead to inequitable outcomes for underrepresented groups',
                'It costs more money',
                'It requires more training'
              ],
              correctAnswer: 'It can lead to inequitable outcomes for underrepresented groups',
              explanation: 'AI trained on biased data can perpetuate healthcare disparities.'
            },
            // Module 6 Questions
            {
              question: 'Which task is MOST suitable for AI assistance?',
              options: [
                'Making final diagnosis without physician review',
                'Generating patient education handouts for physician review',
                'Prescribing medications autonomously',
                'Replacing physician judgment'
              ],
              correctAnswer: 'Generating patient education handouts for physician review',
              explanation: 'Patient education is low-risk, high-value, and easy to verify - perfect for AI with oversight.'
            },
            {
              question: 'What should be your first step when designing an AI workflow?',
              options: [
                'Buy the most expensive AI tool',
                'Identify time-consuming, repetitive tasks suitable for AI',
                'Replace all staff with AI',
                'Implement AI for all clinical decisions'
              ],
              correctAnswer: 'Identify time-consuming, repetitive tasks suitable for AI',
              explanation: 'Start by analyzing your workflow to find high-value, low-risk tasks suitable for AI assistance.'
            },
            {
              question: 'What is a "hallucination" in AI?',
              options: [
                'When AI processes too slowly',
                'When AI generates false or fabricated information confidently',
                'When AI refuses to answer',
                'When AI asks for clarification'
              ],
              correctAnswer: 'When AI generates false or fabricated information confidently',
              explanation: 'Hallucinations are when AI invents information that sounds plausible but is incorrect.'
            }
          ]
        }
      },
      {
        id: 'med-7-3',
        title: 'Section 2: Practical Exercise - Prompt Engineering',
        type: 'exercise',
        estimatedTimeMinutes: 10,
        referenceText: 'Write an effective clinical prompt using the 4-part formula: Role, Task, Context, Format.',
        exercise: {
          prompt: (
            <div>
              <p className="mb-4 text-slate-200">
                <strong>Scenario:</strong> You need AI to help create a discharge summary for a patient.
              </p>
              <div className="bg-slate-900 p-4 rounded-lg mb-4 text-sm text-slate-300">
                <p className="font-semibold text-white mb-2">Patient Information (De-identified):</p>
                <ul className="space-y-1">
                  <li>• 72-year-old male</li>
                  <li>• Admitted with acute exacerbation of COPD</li>
                  <li>• History: COPD, hypertension, type 2 diabetes</li>
                  <li>• Treatment: Oxygen therapy, steroids, antibiotics, bronchodilators</li>
                  <li>• Improved, ready for discharge</li>
                  <li>• Follow-up needed in 1 week</li>
                </ul>
              </div>
              <p className="text-slate-300 mb-4">
                Write a prompt for AI to generate this discharge summary. Use the 4-part formula:
              </p>
              <ul className="text-sm text-slate-400 space-y-1 mb-4">
                <li>1. <strong>Role:</strong> Who should AI be?</li>
                <li>2. <strong>Task:</strong> What should AI do?</li>
                <li>3. <strong>Context:</strong> What information is relevant?</li>
                <li>4. <strong>Format:</strong> How should output be structured?</li>
              </ul>
            </div>
          ),
          evaluationPrompt: 'Evaluate if the user\'s prompt includes all 4 components: 1) Role (e.g., "You are a medical documentation assistant"), 2) Task (e.g., "Create a discharge summary"), 3) Context (patient details: 72yo male, COPD exacerbation, treatments, ready for discharge), 4) Format (e.g., "Use standard discharge summary format with sections for hospital course, discharge medications, follow-up"). Award full credit if all 4 are present, partial credit if 2-3 are present.'
        }
      },
      {
        id: 'med-7-4',
        title: 'Section 3: Practical Exercise - De-identification',
        type: 'exercise',
        estimatedTimeMinutes: 10,
        referenceText: 'Practice removing all 18 HIPAA identifiers while preserving clinical utility.',
        exercise: {
          prompt: (
            <div>
              <p className="mb-4 text-slate-200">
                <strong>Task:</strong> De-identify this clinical note for safe AI use.
              </p>
              <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-slate-300 mb-4">
                <p className="mb-2">"Patient: Sarah Johnson"</p>
                <p className="mb-2">"DOB: 08/15/1978"</p>
                <p className="mb-2">"MRN: 987654"</p>
                <p className="mb-2">"Address: 456 Oak Street, Chicago, IL 60601"</p>
                <p className="mb-2">"Phone: 312-555-7890"</p>
                <p className="mb-2">"Email: sjohnson@email.com"</p>
                <p className="mb-2">"Visit Date: 11/15/2024"</p>
                <p>"Chief Complaint: 46-year-old female presents with persistent headaches for 3 weeks. History of migraines, currently on propranolol 40mg BID. Physical exam unremarkable. Plan: Increase propranolol to 80mg BID, follow up in 2 weeks."</p>
              </div>
              <p className="text-slate-300 text-sm">
                Rewrite this note with ALL identifiers removed, but keep it clinically useful.
              </p>
            </div>
          ),
          evaluationPrompt: 'Evaluate if the user successfully removed ALL 18 HIPAA identifiers: name (Sarah Johnson), DOB (08/15/1978), MRN (987654), address (456 Oak Street, Chicago, IL 60601), phone (312-555-7890), email (sjohnson@email.com), and specific date (11/15/2024). The de-identified version should keep: age (46), gender (female), year (2024), state (IL is okay), diagnosis (migraines), medications (propranolol 40mg BID), and clinical plan. Award full credit only if ALL identifiers are removed AND clinical information is preserved.'
        }
      },
      {
        id: 'med-7-5',
        title: 'Section 4: Case Study Analysis',
        type: 'exercise',
        estimatedTimeMinutes: 15,
        referenceText: 'Analyze a real-world AI implementation scenario and identify risks, benefits, and recommendations.',
        exercise: {
          prompt: (
            <div>
              <p className="mb-4 text-slate-200">
                <strong>Case Study:</strong> Dr. Martinez's AI Implementation
              </p>
              <div className="bg-slate-900 p-4 rounded-lg text-sm text-slate-300 mb-4 space-y-3">
                <p>
                  Dr. Martinez, a primary care physician, wants to save time on documentation. She starts using ChatGPT 
                  to summarize patient encounters. Her workflow:
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>During patient visit, she takes handwritten notes</li>
                  <li>After visit, she copies her notes (including patient name, DOB, and MRN) into ChatGPT</li>
                  <li>She asks: "Summarize this into a SOAP note"</li>
                  <li>She copies ChatGPT's output directly into the EHR without review</li>
                  <li>She saves 5 minutes per patient</li>
                </ol>
                <p className="mt-3">
                  After 2 months, she's thrilled with the time savings and recommends this to colleagues.
                </p>
              </div>
              <p className="text-slate-300 mb-3">
                <strong>Your Task:</strong> Analyze this scenario and answer:
              </p>
              <ol className="text-sm text-slate-400 space-y-2 list-decimal list-inside">
                <li>What are the HIPAA violations? (List at least 3)</li>
                <li>What are the clinical safety risks? (List at least 2)</li>
                <li>How would you redesign this workflow to be safe and compliant? (Provide specific steps)</li>
              </ol>
            </div>
          ),
          evaluationPrompt: 'Evaluate the user\'s analysis on three criteria: 1) HIPAA Violations - Should identify: using non-BAA tool (ChatGPT) with PHI, sharing patient names/DOB/MRN, no de-identification. 2) Clinical Safety Risks - Should identify: no verification of AI output (hallucinations possible), medication errors possible, no human oversight. 3) Safe Workflow Redesign - Should include: use HIPAA-compliant tool with BAA OR de-identify data first, always verify AI output before entering EHR, maintain physician oversight, document AI use. Award full credit if all three areas are addressed comprehensively.'
        }
      },
      {
        id: 'med-7-6',
        title: 'Section 5: Your AI Action Plan',
        type: 'exercise',
        estimatedTimeMinutes: 20,
        referenceText: 'Create your personal plan for implementing AI in your practice safely and effectively.',
        exercise: {
          prompt: (
            <div>
              <p className="mb-4 text-slate-200">
                <strong>Final Task:</strong> Create Your AI Implementation Action Plan
              </p>
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 mb-4">
                <p className="text-slate-300 text-sm">
                  This is your roadmap for bringing AI into your practice. Be specific and realistic. 
                  This plan will guide your next steps after completing this course.
                </p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mb-4">
                <p className="font-semibold text-white mb-3">Your Action Plan Should Include:</p>
                <div className="space-y-3 text-sm text-slate-300">
                  <div>
                    <p className="font-semibold text-cyan-400">1. Current State (3-4 sentences)</p>
                    <p className="text-xs text-slate-400">What are your biggest time drains? What tasks are repetitive?</p>
                  </div>
                  <div>
                    <p className="font-semibold text-cyan-400">2. First AI Use Case (specific)</p>
                    <p className="text-xs text-slate-400">What ONE task will you start with? Why this one?</p>
                  </div>
                  <div>
                    <p className="font-semibold text-cyan-400">3. Tool Selection</p>
                    <p className="text-xs text-slate-400">What AI tool will you use? Does it have a BAA? What's the cost?</p>
                  </div>
                  <div>
                    <p className="font-semibold text-cyan-400">4. Safety Measures</p>
                    <p className="text-xs text-slate-400">How will you ensure HIPAA compliance? How will you verify AI output?</p>
                  </div>
                  <div>
                    <p className="font-semibold text-cyan-400">5. Success Metrics</p>
                    <p className="text-xs text-slate-400">How will you measure success? (time saved, quality, satisfaction)</p>
                  </div>
                  <div>
                    <p className="font-semibold text-cyan-400">6. Timeline</p>
                    <p className="text-xs text-slate-400">When will you start? What are your milestones?</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400">
                Write your action plan below. Aim for 300-500 words. Be honest and practical.
              </p>
            </div>
          ),
          evaluationPrompt: 'Evaluate the user\'s AI Action Plan on completeness and practicality. Award full credit if the plan includes: 1) Current state analysis with specific pain points, 2) One clearly defined first use case (not trying to do everything), 3) Specific tool selection with HIPAA consideration, 4) Concrete safety measures (de-identification OR BAA, verification process), 5) Measurable success metrics (time, quality, or satisfaction), 6) Realistic timeline with milestones. The plan should demonstrate understanding of safe AI implementation principles from the course. Award partial credit if 4-5 elements are present. The plan should be practical and specific, not generic.'
        }
      },
      {
        id: 'med-7-7',
        title: 'Congratulations - Course Complete!',
        type: 'content',
        estimatedTimeMinutes: 2,
        referenceText: 'Course completion and certification information.',
        content: (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500/30 rounded-lg text-center">
              <p className="text-4xl mb-4">🎉</p>
              <p className="font-bold text-2xl text-white mb-2">Congratulations!</p>
              <p className="text-lg text-slate-300">
                You've completed the AI for Healthcare Professionals course
              </p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <p className="font-semibold text-white mb-3">🎓 What You've Accomplished</p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>✅ Mastered AI fundamentals and technical concepts</li>
                <li>✅ Learned HIPAA-compliant AI workflows</li>
                <li>✅ Developed advanced prompt engineering skills</li>
                <li>✅ Understood AI safety, bias, and ethics</li>
                <li>✅ Created your personal AI implementation plan</li>
                <li>✅ Completed comprehensive capstone assessment</li>
              </ul>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-6">
              <p className="font-semibold text-white mb-3">📜 Your Certification</p>
              <p className="text-slate-300 text-sm mb-3">
                You will receive your <strong className="text-cyan-400">IIHMRB Certificate of Completion</strong> via 
                email within 48 hours. This certificate demonstrates your competency in:
              </p>
              <ul className="space-y-1 text-slate-300 text-sm ml-4">
                <li>• Safe and effective AI use in clinical practice</li>
                <li>• HIPAA-compliant AI workflows</li>
                <li>• Ethical AI implementation</li>
                <li>• Advanced prompt engineering for healthcare</li>
              </ul>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <p className="font-semibold text-white mb-3">🚀 Next Steps</p>
              <ol className="space-y-2 text-slate-300 text-sm list-decimal list-inside">
                <li>Review your AI Action Plan from the capstone</li>
                <li>Start with your chosen first use case</li>
                <li>Join our community forum to share experiences</li>
                <li>Consider advanced courses: AI for Clinical Research, AI for Medical Education</li>
                <li>Stay updated on AI developments in healthcare</li>
              </ol>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="font-semibold text-yellow-400 mb-2">💡 Remember the 3 Rules</p>
              <ol className="space-y-1 text-slate-300 text-sm list-decimal list-inside">
                <li>AI assists, you decide</li>
                <li>Be transparent with patients</li>
                <li>Verify everything</li>
              </ol>
            </div>
            <div className="text-center pt-4">
              <p className="text-slate-400 text-sm">
                Thank you for investing in your AI education. You're now equipped to use AI safely and effectively 
                to enhance patient care and reduce burnout.
              </p>
              <p className="text-cyan-400 font-semibold mt-4">
                Welcome to the future of healthcare. 🏥✨
              </p>
            </div>
          </div>
        )
      }
    ]
  }
];
