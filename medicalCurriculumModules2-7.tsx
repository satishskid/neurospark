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
              <>
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
              </>
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
              <>
                <p className="font-semibold text-white mb-2">🏥 Parameters = Years of Training</p>
                <ul className="space-y-2 text-slate-300">
                  <li><strong className="text-cyan-400">3B parameters:</strong> Medical student - knows basics, needs supervision</li>
                  <li><strong className="text-cyan-400">8B parameters:</strong> Resident - solid foundation, handles most cases</li>
                  <li><strong className="text-cyan-400">70B+ parameters:</strong> Attending - expert-level, nuanced understanding</li>
                </ul>
                <p className="text-slate-300 mt-3">
                  💡 You don't need an "attending" AI for simple tasks like patient education handouts!
                </p>
              </>
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
              <>
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
              </>
            </Callout>
            <Callout icon={<BrainIcon className="w-8 h-8" />}>
              <>
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
              </>
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
              <>
                <p className="font-semibold text-white mb-2">✅ What IS Allowed</p>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>✅ De-identified data (remove all 18 identifiers)</li>
                  <li>✅ HIPAA-compliant AI tools with BAA</li>
                  <li>✅ General medical questions (no patient specifics)</li>
                  <li>✅ Hypothetical scenarios</li>
                </ul>
              </>
            </Callout>
            <Callout icon={<LockClosedIcon className="w-8 h-8" />}>
              <>
                <p className="font-semibold text-white mb-2">❌ What is NOT Allowed</p>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>❌ Pasting patient notes into ChatGPT</li>
                  <li>❌ Using patient names in prompts</li>
                  <li>❌ Sharing MRNs, dates of birth, addresses</li>
                  <li>❌ Any of the 18 HIPAA identifiers</li>
                </ul>
              </>
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
  }
];
