import React from 'react';
import { Module } from './types';
import { BrainIcon, ShieldCheckIcon, LightBulbIcon } from './components/Icons';

const Callout = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
    <div className="my-6 p-4 bg-slate-800/50 rounded-lg flex items-start gap-4 border border-slate-700">
        <div className="text-cyan-400 mt-1 flex-shrink-0">{icon}</div>
        <div className="text-slate-300">{children}</div>
    </div>
);

export const MEDICAL_CURRICULUM_ENHANCED: Module[] = [
  {
    id: 'med-1',
    title: 'Module 1: AI in Your Practice Today',
    description: 'Discover how AI is already transforming healthcare and get hands-on experience.',
    lessons: [
      {
        id: 'med-1-1',
        title: 'What AI Already Does for You',
        type: 'content',
        estimatedTimeMinutes: 3,
        referenceText: 'AI is already integrated into modern healthcare: EHR auto-complete, clinical decision support systems, radiology image analysis, and predictive analytics. These tools use machine learning to recognize patterns in medical data and provide recommendations. Understanding current AI applications helps clinicians leverage these tools effectively and identify opportunities for improvement.',
        learningObjectives: [
          'Identify 5 ways AI is currently used in healthcare',
          'Recognize AI tools you may already be using',
          'Understand the difference between AI assistance and AI decision-making'
        ],
        glossary: [
          { term: 'Clinical Decision Support', definition: 'AI systems that provide evidence-based recommendations to clinicians.' },
          { term: 'Machine Learning', definition: 'AI technique where systems learn from data without explicit programming.' }
        ],
        content: (
          <div className="space-y-6">
            {/* TL;DR */}
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="font-semibold text-cyan-400 mb-2">📌 TL;DR</p>
              <p className="text-slate-300">
                AI is already in your daily practice - from EHR auto-complete to radiology analysis. 
                You're not learning something new; you're learning to use what's already there more effectively.
              </p>
            </div>

            <p className="text-lg text-slate-200">
              Welcome to AI for Healthcare Professionals! Here's a surprising fact: <strong className="text-white">you're probably already using AI in your practice</strong>.
            </p>

            <Callout icon={<BrainIcon className="w-8 h-8" />}>
              <>
                <p className="font-semibold text-white mb-2">🏥 AI You're Already Using</p>
                <ul className="space-y-2">
                  <li><strong className="text-cyan-400">EHR Auto-Complete:</strong> Predicts your next word based on millions of clinical notes</li>
                  <li><strong className="text-cyan-400">Clinical Decision Support:</strong> Alerts for drug interactions, contraindications</li>
                  <li><strong className="text-cyan-400">Radiology AI:</strong> Highlights potential abnormalities in imaging</li>
                  <li><strong className="text-cyan-400">Predictive Analytics:</strong> Identifies patients at risk for readmission</li>
                  <li><strong className="text-cyan-400">Voice Transcription:</strong> Converts your dictation to text</li>
                </ul>
              </>
            </Callout>

            <p className="text-slate-200">
              The goal of this course isn't to teach you something completely foreign. It's to help you understand 
              the tools you're already using, use them more effectively, and identify new opportunities to improve 
              your practice.
            </p>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <p className="font-semibold text-white mb-2">💡 Key Insight</p>
              <p className="text-slate-300">
                AI doesn't replace clinical judgment - it augments it. Think of AI as a highly trained resident 
                who's read every medical paper ever published, but still needs your expertise to make the final call.
              </p>
            </div>

            <Callout icon={<ShieldCheckIcon className="w-8 h-8" />}>
              <>
                <p className="font-semibold text-white mb-2">⚠️ What AI Is NOT</p>
                <ul className="space-y-2 text-slate-300">
                  <li>❌ A replacement for your clinical judgment</li>
                  <li>❌ Always right (it makes mistakes, just like humans)</li>
                  <li>❌ A magic solution to all healthcare problems</li>
                  <li>❌ Something that requires coding skills to use</li>
                </ul>
              </>
            </Callout>

            <p className="text-slate-200">
              In the next lesson, you'll get hands-on experience with AI - no coding required!
            </p>
          </div>
        )
      },
      {
        id: 'med-1-2',
        title: 'Your First AI Conversation',
        type: 'content',
        estimatedTimeMinutes: 5,
        referenceText: 'Interacting with AI through natural language is the primary interface for healthcare applications. Effective prompts are clear, specific, and provide context. Practice with non-PHI examples builds confidence before clinical use.',
        learningObjectives: [
          'Successfully interact with an AI system',
          'Write a clear, effective prompt',
          'Understand the importance of prompt quality'
        ],
        content: (
          <div className="space-y-6">
            {/* TL;DR */}
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="font-semibold text-cyan-400 mb-2">📌 TL;DR</p>
              <p className="text-slate-300">
                Using AI is as simple as having a conversation. You ask a question, AI responds. 
                The better your question, the better the answer. Let's try it!
              </p>
            </div>

            <p className="text-lg text-slate-200">
              Let's get hands-on. You're going to have your first conversation with AI right now.
            </p>

            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
              <p className="font-semibold text-white mb-3">🎯 Your First Task</p>
              <p className="text-slate-300 mb-4">
                Click the <strong className="text-cyan-400">AI Tutor</strong> button (in the sidebar or header) 
                and ask it this question:
              </p>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 font-mono text-sm text-cyan-400">
                "Explain atrial fibrillation to a 10-year-old"
              </div>
              <p className="text-slate-400 text-sm mt-3">
                💡 Notice how the AI adapts complex medical concepts to simple language. This is one of its most 
                powerful applications in patient education.
              </p>
            </div>

            <Callout icon={<LightBulbIcon className="w-8 h-8" />}>
              <>
                <p className="font-semibold text-white mb-2">🏥 Clinical Use Cases</p>
                <p className="text-slate-300 mb-3">Here are real ways doctors use AI conversations:</p>
                <ul className="space-y-2 text-slate-300">
                  <li><strong className="text-cyan-400">Patient Education:</strong> "Explain diabetes management in simple terms"</li>
                  <li><strong className="text-cyan-400">Differential Diagnosis:</strong> "What are possible causes of chest pain in a 45yo male?"</li>
                  <li><strong className="text-cyan-400">Literature Search:</strong> "Summarize recent guidelines on hypertension management"</li>
                  <li><strong className="text-cyan-400">Documentation:</strong> "Help me structure a discharge summary"</li>
                </ul>
              </>
            </Callout>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="font-semibold text-yellow-400 mb-2">⚠️ Important Safety Note</p>
              <p className="text-slate-300">
                For this exercise, we're using general medical knowledge. <strong className="text-white">Never paste 
                actual patient information</strong> (names, dates, MRNs) into AI tools unless they're HIPAA-compliant. 
                We'll cover this in detail in Module 3.
              </p>
            </div>

            <p className="text-slate-200">
              Congratulations! You just used AI. It's that simple. In the next lesson, we'll learn the 3 rules 
              that keep AI use safe and effective.
            </p>
          </div>
        )
      },
      {
        id: 'med-1-3',
        title: 'The 3 Rules of Safe AI Use',
        type: 'content',
        estimatedTimeMinutes: 4,
        referenceText: 'Safe AI use in healthcare requires three fundamental principles: never share PHI with non-compliant tools, always verify AI outputs against clinical knowledge, and maintain human decision-making authority. These rules prevent HIPAA violations, medical errors, and over-reliance on AI.',
        learningObjectives: [
          'State the 3 rules of safe AI use',
          'Explain why each rule is critical',
          'Apply these rules to clinical scenarios'
        ],
        glossary: [
          { term: 'PHI', definition: 'Protected Health Information - any health data that can identify a patient.' },
          { term: 'HIPAA', definition: 'Health Insurance Portability and Accountability Act - US healthcare privacy law.' }
        ],
        content: (
          <div className="space-y-6">
            {/* TL;DR */}
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="font-semibold text-cyan-400 mb-2">📌 TL;DR</p>
              <p className="text-slate-300">
                Three simple rules keep AI use safe: (1) Never share patient identifiers, (2) Always verify AI output, 
                (3) You decide, AI assists. Memorize these - they're non-negotiable.
              </p>
            </div>

            <p className="text-lg text-slate-200">
              Before we go further, let's establish the ground rules. These three principles are non-negotiable 
              for safe AI use in healthcare.
            </p>

            <div className="space-y-4">
              {/* Rule 1 */}
              <div className="bg-red-500/10 border-l-4 border-red-500 p-6 rounded-r-lg">
                <p className="font-bold text-xl text-red-400 mb-3">🚫 Rule 1: Never Share Patient Identifiers</p>
                <p className="text-slate-300 mb-3">
                  Do not paste patient names, dates of birth, medical record numbers, or any of the 18 HIPAA 
                  identifiers into AI tools unless they are HIPAA-compliant with a Business Associate Agreement (BAA).
                </p>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-sm text-slate-400 mb-2">❌ WRONG:</p>
                  <p className="font-mono text-sm text-red-400 mb-3">
                    "Summarize this note: John Smith, DOB 3/15/1965, MRN 123456..."
                  </p>
                  <p className="text-sm text-slate-400 mb-2">✅ RIGHT:</p>
                  <p className="font-mono text-sm text-green-400">
                    "Help me structure a progress note for a 59yo male with chest pain..."
                  </p>
                </div>
                <p className="text-slate-400 text-sm mt-3">
                  💡 We'll cover de-identification techniques in Module 3.
                </p>
              </div>

              {/* Rule 2 */}
              <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                <p className="font-bold text-xl text-yellow-400 mb-3">✓ Rule 2: Always Verify AI Output</p>
                <p className="text-slate-300 mb-3">
                  AI can "hallucinate" - confidently state false information. Never trust AI output without 
                  verification against your clinical knowledge, guidelines, or literature.
                </p>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <p className="font-semibold text-white mb-2">Real Example of AI Hallucination</p>
                  <p className="text-slate-300 text-sm">
                    An AI once confidently stated that "Metformin is contraindicated in patients with Type 1 diabetes" 
                    (it's not contraindicated, just not first-line). Always double-check medication recommendations, 
                    dosages, and contraindications.
                  </p>
                </div>
              </div>

              {/* Rule 3 */}
              <div className="bg-green-500/10 border-l-4 border-green-500 p-6 rounded-r-lg">
                <p className="font-bold text-xl text-green-400 mb-3">👨‍⚕️ Rule 3: AI Assists, You Decide</p>
                <p className="text-slate-300 mb-3">
                  AI provides suggestions, not decisions. You are the clinician. Your judgment, training, and 
                  relationship with the patient are irreplaceable.
                </p>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-slate-300 text-sm">
                    <strong className="text-white">Think of AI like a lab test:</strong> A lab result informs your 
                    decision, but you don't blindly follow it. You integrate it with history, physical exam, and 
                    clinical context. AI is the same - it's one data point, not the final answer.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-6 mt-6">
              <p className="font-semibold text-white mb-3">📝 Quick Self-Check</p>
              <p className="text-slate-300 mb-3">Which of these is safe AI use?</p>
              <ul className="space-y-2 text-sm">
                <li className="text-red-400">❌ Pasting a patient's full chart into ChatGPT</li>
                <li className="text-red-400">❌ Using AI-suggested medication dosages without verification</li>
                <li className="text-green-400">✅ Asking AI to explain a medical concept in simple terms</li>
                <li className="text-green-400">✅ Using AI to draft a patient education handout (then reviewing it)</li>
              </ul>
            </div>

            <p className="text-slate-200 mt-6">
              These three rules will keep you safe throughout this course and in your practice. Next, let's explore 
              5 specific ways you can use AI starting tomorrow.
            </p>
          </div>
        )
      },
      {
        id: 'med-1-4',
        title: 'Quick Wins - 5 Ways to Use AI Tomorrow',
        type: 'content',
        estimatedTimeMinutes: 3,
        referenceText: 'Immediate AI applications for clinicians include patient education material generation, medical concept simplification, professional communication drafting, literature search assistance, and continuing education summaries. These low-risk, high-value tasks build confidence and demonstrate practical utility.',
        learningObjectives: [
          'Identify 5 immediate AI applications',
          'Choose one to implement in practice',
          'Understand which tasks are low-risk for AI use'
        ],
        content: (
          <div className="space-y-6">
            {/* TL;DR */}
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="font-semibold text-cyan-400 mb-2">📌 TL;DR</p>
              <p className="text-slate-300">
                Five things you can do with AI tomorrow: patient education, simplify concepts, draft emails, 
                search literature, summarize CME. All are safe, practical, and save time.
              </p>
            </div>

            <p className="text-lg text-slate-200">
              You've learned the basics and the safety rules. Now let's get practical. Here are 5 ways you can 
              use AI in your practice starting tomorrow - all safe, all valuable.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {/* Quick Win 1 */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
                <p className="font-bold text-lg text-cyan-400 mb-2">1️⃣ Patient Education Handouts</p>
                <p className="text-slate-300 mb-3">
                  Generate easy-to-understand explanations of diagnoses, procedures, or medications.
                </p>
                <div className="bg-slate-900 p-3 rounded font-mono text-sm text-slate-300">
                  <p className="text-slate-500 mb-1">Example prompt:</p>
                  "Create a one-page patient handout explaining Type 2 diabetes management for a 6th-grade reading level. 
                  Include diet, exercise, and medication adherence."
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  ⏱️ Time saved: 10-15 minutes per handout
                </p>
              </div>

              {/* Quick Win 2 */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
                <p className="font-bold text-lg text-cyan-400 mb-2">2️⃣ Simplify Complex Concepts</p>
                <p className="text-slate-300 mb-3">
                  Explain medical jargon in terms patients can understand.
                </p>
                <div className="bg-slate-900 p-3 rounded font-mono text-sm text-slate-300">
                  <p className="text-slate-500 mb-1">Example prompt:</p>
                  "Explain what an echocardiogram is and why it's needed, using simple language a non-medical person 
                  would understand."
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  💡 Use case: During patient encounters when you need to explain procedures
                </p>
              </div>

              {/* Quick Win 3 */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
                <p className="font-bold text-lg text-cyan-400 mb-2">3️⃣ Draft Professional Emails</p>
                <p className="text-slate-300 mb-3">
                  Save time on routine correspondence to colleagues, insurance companies, or patients.
                </p>
                <div className="bg-slate-900 p-3 rounded font-mono text-sm text-slate-300">
                  <p className="text-slate-500 mb-1">Example prompt:</p>
                  "Draft a professional email to a specialist requesting a cardiology consultation for a patient with 
                  new-onset atrial fibrillation. Include relevant clinical details without PHI."
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  ⏱️ Time saved: 5-10 minutes per email
                </p>
              </div>

              {/* Quick Win 4 */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
                <p className="font-bold text-lg text-cyan-400 mb-2">4️⃣ Literature Search Queries</p>
                <p className="text-slate-300 mb-3">
                  Get help formulating effective PubMed searches or summarizing recent guidelines.
                </p>
                <div className="bg-slate-900 p-3 rounded font-mono text-sm text-slate-300">
                  <p className="text-slate-500 mb-1">Example prompt:</p>
                  "What are the current ACC/AHA guidelines for managing hypertension in patients with chronic kidney disease? 
                  Summarize the key recommendations."
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  💡 Always verify with the actual guideline document
                </p>
              </div>

              {/* Quick Win 5 */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
                <p className="font-bold text-lg text-cyan-400 mb-2">5️⃣ CME Summaries</p>
                <p className="text-slate-300 mb-3">
                  Quickly review key points from medical articles or CME materials.
                </p>
                <div className="bg-slate-900 p-3 rounded font-mono text-sm text-slate-300">
                  <p className="text-slate-500 mb-1">Example prompt:</p>
                  "Summarize the key clinical takeaways from this abstract: [paste abstract]. Focus on practice-changing 
                  information."
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  ⏱️ Time saved: 15-20 minutes per article
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/20 rounded-xl p-6 mt-6">
              <p className="font-semibold text-white mb-3">🎯 Your Action Item</p>
              <p className="text-slate-300 mb-3">
                Choose ONE of these five quick wins to try in your practice this week. Start small, build confidence, 
                and expand from there.
              </p>
              <p className="text-slate-400 text-sm">
                💡 Pro tip: Start with patient education handouts - they're low-risk, high-value, and easy to verify.
              </p>
            </div>

            <p className="text-slate-200 mt-6">
              Congratulations! You've completed Module 1. You now understand what AI is, how to use it safely, and 
              have 5 practical applications to try. In Module 2, we'll dive deeper into how AI actually works - 
              no coding required!
            </p>
          </div>
        )
      },
      {
        id: 'med-1-5',
        title: 'Quiz: AI in Your Practice',
        type: 'quiz',
        estimatedTimeMinutes: 3,
        referenceText: 'Assessment covers identification of current AI applications, safety rules, and practical use cases.',
        quiz: {
          questions: [
            {
              question: 'Which of the following is an example of AI you might already be using in your practice?',
              options: [
                'EHR auto-complete that predicts your next word',
                'A digital thermometer',
                'Email on your phone',
                'Electronic prescribing'
              ],
              correctAnswer: 'EHR auto-complete that predicts your next word',
              explanation: 'EHR auto-complete uses machine learning trained on millions of clinical notes to predict text. The other options are digital tools but not AI.'
            },
            {
              question: 'What is the FIRST rule of safe AI use in healthcare?',
              options: [
                'Always use the most expensive AI tool',
                'Never share patient identifiers with non-HIPAA-compliant AI tools',
                'Only use AI for diagnosis',
                'Get patient consent before using any AI'
              ],
              correctAnswer: 'Never share patient identifiers with non-HIPAA-compliant AI tools',
              explanation: 'Protecting patient privacy is the foundational rule. Never paste PHI into tools like ChatGPT unless they have a BAA.'
            },
            {
              question: 'A colleague pastes a patient\'s full chart into ChatGPT to get a summary. What should you tell them?',
              options: [
                'That\'s a great time-saver!',
                'That violates HIPAA - never paste PHI into non-compliant tools',
                'It\'s okay as long as the patient consented',
                'It\'s fine for internal use only'
              ],
              correctAnswer: 'That violates HIPAA - never paste PHI into non-compliant tools',
              explanation: 'ChatGPT is not HIPAA-compliant. Pasting identifiable patient information violates HIPAA regardless of consent or intended use.'
            },
            {
              question: 'AI suggests a medication dosage. What should you do?',
              options: [
                'Use it immediately - AI is always accurate',
                'Verify it against your clinical knowledge and drug references',
                'Ignore it completely - never trust AI',
                'Ask the patient if they agree'
              ],
              correctAnswer: 'Verify it against your clinical knowledge and drug references',
              explanation: 'Always verify AI output. AI can hallucinate or provide outdated information. You are responsible for clinical decisions.'
            },
            {
              question: 'Which of these is the SAFEST first use of AI in your practice?',
              options: [
                'Diagnosing patients based on AI recommendations',
                'Generating patient education handouts (then reviewing them)',
                'Prescribing medications suggested by AI',
                'Replacing your clinical judgment with AI'
              ],
              correctAnswer: 'Generating patient education handouts (then reviewing them)',
              explanation: 'Patient education materials are low-risk, easy to verify, and don\'t involve direct clinical decisions. Perfect for building AI confidence.'
            }
          ]
        }
      }
    ]
  }
];
