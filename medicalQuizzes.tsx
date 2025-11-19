/**
 * Comprehensive Quizzes for Medical AI Curriculum
 * Interactive assessments for all 7 modules
 */

export const MEDICAL_QUIZZES = {
  // MODULE 1: AI in Your Practice Today
  'med-1': {
    moduleTitle: 'AI in Your Practice Today',
    questions: [
      {
        id: 'med-1-q1',
        question: 'Which of the following is NOT a current application of AI in healthcare?',
        options: [
          'EHR auto-complete and predictive text',
          'Radiology image analysis for abnormalities',
          'Complete autonomous diagnosis without physician oversight',
          'Predictive analytics for patient readmission risk'
        ],
        correctAnswer: 2,
        explanation: 'AI currently augments clinical decision-making but does not make autonomous diagnoses without physician oversight. All AI recommendations require human review and final clinical judgment.',
        category: 'Current Applications'
      },
      {
        id: 'med-1-q2',
        question: 'What is the primary role of AI in clinical practice?',
        options: [
          'To replace physicians and reduce healthcare costs',
          'To augment clinical judgment and improve efficiency',
          'To make all medical decisions automatically',
          'To eliminate the need for medical training'
        ],
        correctAnswer: 1,
        explanation: 'AI augments clinical capabilities by processing large amounts of data and identifying patterns, but it works alongside clinicians rather than replacing them. The human-AI partnership combines AI\'s computational power with human judgment, empathy, and contextual understanding.',
        category: 'AI Role'
      },
      {
        id: 'med-1-q3',
        question: 'Which statement about AI-powered clinical decision support systems (CDSS) is TRUE?',
        options: [
          'They have 100% accuracy and never make mistakes',
          'They can identify complex patterns but require validation',
          'They work equally well for all patient populations',
          'They don\'t need ongoing monitoring after deployment'
        ],
        correctAnswer: 1,
        explanation: 'AI-powered CDSS can identify complex, non-obvious patterns in clinical data, but they require validation in specific clinical contexts and ongoing monitoring. They may perform differently across patient populations and can make errors, which is why human oversight is essential.',
        category: 'CDSS Understanding'
      },
      {
        id: 'med-1-q4',
        question: 'What is "alert fatigue" in the context of AI clinical alerts?',
        options: [
          'When AI systems become tired and stop working',
          'When clinicians ignore alerts due to too many false positives',
          'When patients become anxious about AI recommendations',
          'When AI systems need to be rebooted frequently'
        ],
        correctAnswer: 1,
        explanation: 'Alert fatigue occurs when clinicians receive so many alerts (many of which may be false positives or low-priority) that they begin to ignore them, potentially missing critical warnings. This is why AI alert systems need careful tuning to balance sensitivity with specificity.',
        category: 'Clinical Implementation'
      },
      {
        id: 'med-1-q5',
        question: 'In the Mount Sinai case study, what was the primary benefit of implementing Aidoc\'s AI platform?',
        options: [
          'Eliminated the need for radiologists',
          'Reduced time-to-treatment for critical findings by 23%',
          'Increased hospital revenue by 50%',
          'Replaced all imaging equipment'
        ],
        correctAnswer: 1,
        explanation: 'The Mount Sinai implementation showed a 23% reduction in time-to-treatment for intracranial hemorrhage and 31% improvement in pulmonary embolism detection. The AI acted as a safety net and prioritization tool, not a replacement for radiologists.',
        category: 'Case Studies'
      }
    ],
    scenarios: [
      {
        id: 'med-1-s1',
        scenario: `You're an emergency physician working a busy overnight shift. The AI-powered sepsis prediction system alerts you that a 67-year-old patient in bed 12 has a sepsis risk score of 7 (threshold is 6). 

The patient was admitted 4 hours ago with pneumonia, currently has:
- Temp: 38.2°C
- HR: 95 bpm
- BP: 128/82
- RR: 18/min
- WBC: 12,000
- Lactate: 1.8 mmol/L

The patient appears comfortable, is conversing normally, and vital signs are stable.`,
        question: 'What is the MOST appropriate next step?',
        options: [
          'Ignore the alert - the patient looks fine and vitals are stable',
          'Immediately start broad-spectrum antibiotics and ICU transfer',
          'Assess the patient, review trends, and consider early intervention',
          'Disable the AI system because it\'s generating false alarms'
        ],
        correctAnswer: 2,
        explanation: 'The AI alert should prompt clinical assessment, not be ignored or blindly followed. The patient may be in early sepsis despite appearing stable. Review vital sign trends, repeat lactate, consider blood cultures, and implement early goal-directed therapy if indicated. The AI caught a subtle pattern that warrants investigation.',
        clinicalPearl: 'AI sepsis prediction models often detect early warning signs 6-12 hours before clinical manifestation. A score above threshold warrants assessment even if the patient appears stable, as early intervention significantly improves outcomes.'
      },
      {
        id: 'med-1-s2',
        scenario: `You're reviewing a chest X-ray for a 45-year-old with cough. The AI analysis flags a 4mm nodule in the right upper lobe that you initially missed. On closer inspection, you can see the nodule.

The patient has:
- 20 pack-year smoking history
- No prior imaging for comparison
- No respiratory symptoms besides recent cough
- Otherwise healthy`,
        question: 'How should you proceed?',
        options: [
          'Dismiss the finding - 4mm nodules are always benign',
          'Order immediate biopsy of the nodule',
          'Follow Fleischner Society guidelines for nodule management',
          'Tell the patient the AI made a mistake'
        ],
        correctAnswer: 2,
        explanation: 'The AI correctly identified a finding that requires follow-up. For a 4mm nodule in a patient with smoking history, Fleischner Society guidelines recommend follow-up CT in 12 months. The AI served its purpose as a "second set of eyes" to prevent a missed finding.',
        clinicalPearl: 'AI excels at detecting subtle findings that humans might miss, especially during high-volume reading sessions. Always verify AI findings yourself, but don\'t dismiss them without careful review. Studies show AI can reduce missed lung nodules by up to 30%.'
      }
    ]
  },

  // MODULE 2: How AI Thinks
  'med-2': {
    moduleTitle: 'How AI Thinks',
    questions: [
      {
        id: 'med-2-q1',
        question: 'How does AI "learn" medical knowledge?',
        options: [
          'Doctors manually program every medical fact',
          'It reads textbooks like medical students',
          'It identifies patterns in large datasets of medical information',
          'It inherently knows medicine without training'
        ],
        correctAnswer: 2,
        explanation: 'AI learns by analyzing patterns in vast amounts of training data, including medical literature, clinical notes, imaging studies, and outcomes. It identifies statistical relationships and patterns rather than "understanding" medicine the way humans do.',
        category: 'AI Learning'
      },
      {
        id: 'med-2-q2',
        question: 'What is "training data bias" in medical AI?',
        options: [
          'When AI prefers certain medical specialties',
          'When training data doesn\'t represent all patient populations',
          'When AI is trained too quickly',
          'When doctors disagree with AI recommendations'
        ],
        correctAnswer: 1,
        explanation: 'Training data bias occurs when the data used to train AI doesn\'t adequately represent all patient populations (e.g., underrepresentation of certain ethnicities, ages, or conditions). This can lead to AI performing poorly for underrepresented groups.',
        category: 'Bias & Fairness'
      },
      {
        id: 'med-2-q3',
        question: 'What does "confidence score" mean in AI predictions?',
        options: [
          'How confident the doctor should be in the diagnosis',
          'The AI\'s statistical certainty about its prediction',
          'The patient\'s confidence in the treatment',
          'The accuracy rate of the AI system'
        ],
        correctAnswer: 1,
        explanation: 'A confidence score represents the AI\'s statistical certainty about its prediction, typically expressed as a percentage. However, high confidence doesn\'t guarantee correctness - the AI can be confidently wrong if it encounters patterns outside its training data.',
        category: 'AI Outputs'
      },
      {
        id: 'med-2-q4',
        question: 'Why is "context" important for medical AI?',
        options: [
          'It helps AI understand patient history and clinical situation',
          'It makes AI run faster',
          'It reduces the cost of AI systems',
          'It\'s not important - AI works without context'
        ],
        correctAnswer: 0,
        explanation: 'Context (patient history, current medications, comorbidities, social factors) is crucial for AI to make appropriate recommendations. Without context, AI might suggest treatments that are contraindicated or miss important clinical nuances.',
        category: 'Clinical Context'
      },
      {
        id: 'med-2-q5',
        question: 'What is a "false positive" in medical AI?',
        options: [
          'When AI correctly identifies a disease',
          'When AI flags a condition that isn\'t actually present',
          'When AI misses a disease that is present',
          'When AI provides positive encouragement'
        ],
        correctAnswer: 1,
        explanation: 'A false positive occurs when AI incorrectly flags a condition as present when it\'s actually absent. This can lead to unnecessary testing, anxiety, and treatment. Balancing sensitivity (catching true cases) with specificity (avoiding false positives) is a key challenge in medical AI.',
        category: 'Diagnostic Accuracy'
      }
    ],
    scenarios: []
  },

  // MODULE 3: Protecting Patient Privacy
  'med-3': {
    moduleTitle: 'Protecting Patient Privacy',
    questions: [
      {
        id: 'med-3-q1',
        question: 'Which of the following is HIPAA-compliant when using AI?',
        options: [
          'Copying patient notes into ChatGPT for summarization',
          'Using a BAA-covered AI tool with de-identified data',
          'Sharing patient X-rays on social media for AI analysis',
          'Emailing patient data to an AI company for processing'
        ],
        correctAnswer: 1,
        explanation: 'Only AI tools with Business Associate Agreements (BAAs) and proper de-identification can be used compliantly. Never input PHI into consumer AI tools like ChatGPT, which don\'t have BAAs and may use your data for training.',
        category: 'HIPAA Compliance'
      },
      {
        id: 'med-3-q2',
        question: 'What is "de-identification" of patient data?',
        options: [
          'Deleting all patient records',
          'Removing 18 specific identifiers defined by HIPAA',
          'Changing patient names only',
          'Encrypting the entire medical record'
        ],
        correctAnswer: 1,
        explanation: 'De-identification involves removing 18 specific identifiers defined by HIPAA (names, dates, addresses, phone numbers, etc.) to protect patient privacy while allowing data use for research and AI training.',
        category: 'Data Privacy'
      },
      {
        id: 'med-3-q3',
        question: 'What is a Business Associate Agreement (BAA)?',
        options: [
          'A contract between two hospitals',
          'A legal agreement requiring HIPAA compliance from vendors',
          'An agreement between doctors in the same practice',
          'A patient consent form'
        ],
        correctAnswer: 1,
        explanation: 'A BAA is a legal contract required when a third-party vendor (like an AI company) will have access to PHI. It ensures the vendor complies with HIPAA and protects patient data appropriately.',
        category: 'Legal Requirements'
      },
      {
        id: 'med-3-q4',
        question: 'Can you use AI to generate patient education materials?',
        options: [
          'No, it\'s always a HIPAA violation',
          'Yes, if you don\'t include any patient-specific information',
          'Only with written patient consent',
          'Only if the AI is FDA-approved'
        ],
        correctAnswer: 1,
        explanation: 'You can use AI to generate general patient education materials as long as you don\'t include any patient-specific information. Creating generic educational content about conditions doesn\'t involve PHI.',
        category: 'Practical Applications'
      },
      {
        id: 'med-3-q5',
        question: 'What should you do if you accidentally input PHI into a non-HIPAA-compliant AI tool?',
        options: [
          'Nothing - it\'s too late to fix',
          'Report it as a potential breach and document the incident',
          'Delete your account and hope no one notices',
          'Only report it if the patient finds out'
        ],
        correctAnswer: 1,
        explanation: 'Accidental PHI disclosure must be reported as a potential breach. Document the incident, notify your compliance officer, and follow your organization\'s breach protocol. Prompt reporting allows for proper risk assessment and mitigation.',
        category: 'Breach Response'
      }
    ],
    scenarios: []
  },

  // Add more modules...
  // MODULE 4-7 quizzes would follow the same pattern
};

export default MEDICAL_QUIZZES;
