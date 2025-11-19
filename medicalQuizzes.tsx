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

  // MODULE 4: Advanced Prompt Engineering
  'med-4': {
    moduleTitle: 'Advanced Prompt Engineering',
    questions: [
      {
        id: 'med-4-q1',
        question: 'What is the most effective way to prompt AI for clinical documentation?',
        options: [
          'Use vague, general instructions',
          'Provide specific context, format, and constraints',
          'Copy-paste entire patient charts',
          'Use medical jargon without explanation'
        ],
        correctAnswer: 1,
        explanation: 'Effective clinical prompts include specific context (patient demographics, chief complaint), desired format (SOAP note, discharge summary), and constraints (length, focus areas). This helps AI generate relevant, structured output.',
        category: 'Prompt Engineering'
      },
      {
        id: 'med-4-q2',
        question: 'When using AI for differential diagnosis support, you should:',
        options: [
          'Accept the first diagnosis AI suggests',
          'Provide symptoms and ask AI to consider multiple possibilities',
          'Only use AI for common conditions',
          'Never use AI for diagnosis'
        ],
        correctAnswer: 1,
        explanation: 'AI works best for differential diagnosis when you provide comprehensive symptoms and explicitly ask it to consider multiple possibilities with reasoning. This helps you think through cases systematically while maintaining clinical judgment.',
        category: 'Clinical Applications'
      },
      {
        id: 'med-4-q3',
        question: 'What is "chain-of-thought" prompting in medical AI?',
        options: [
          'Asking AI to show its reasoning step-by-step',
          'Linking multiple AI systems together',
          'Using AI to track patient care chains',
          'Prompting AI multiple times in sequence'
        ],
        correctAnswer: 0,
        explanation: 'Chain-of-thought prompting asks AI to explain its reasoning process step-by-step, similar to clinical reasoning. This helps verify the logic, catch errors, and understand how AI reached its conclusion.',
        category: 'Advanced Techniques'
      },
      {
        id: 'med-4-q4',
        question: 'For patient education materials, the best prompt includes:',
        options: [
          'Just the medical condition name',
          'Reading level, language, cultural considerations, and key points',
          'Complex medical terminology to sound professional',
          'Generic information from textbooks'
        ],
        correctAnswer: 1,
        explanation: 'Effective patient education prompts specify reading level (e.g., 6th grade), language, cultural considerations, and key teaching points. This ensures materials are accessible and appropriate for your patient population.',
        category: 'Patient Communication'
      },
      {
        id: 'med-4-q5',
        question: 'When should you use "few-shot" prompting in clinical AI?',
        options: [
          'When you want quick, short answers',
          'When you provide examples of desired output format',
          'When using AI for the first time',
          'When you have limited time'
        ],
        correctAnswer: 1,
        explanation: 'Few-shot prompting provides 2-3 examples of the desired output format, helping AI understand exactly what you want. This is especially useful for specialized clinical documentation or unique formatting requirements.',
        category: 'Prompt Techniques'
      }
    ],
    scenarios: [
      {
        id: 'med-4-s1',
        scenario: `You need to create patient education materials about diabetes management for a diverse patient population in your clinic. Your patients range from highly educated professionals to those with limited health literacy.`,
        question: 'Which prompt would generate the most appropriate materials?',
        options: [
          '"Write about diabetes management"',
          '"Create diabetes education at 6th grade reading level, include diet, exercise, medication adherence, and blood sugar monitoring. Use simple language, avoid jargon, include practical examples."',
          '"Explain diabetes complications in medical terms"',
          '"Copy standard diabetes handout from medical textbook"'
        ],
        correctAnswer: 1,
        explanation: 'The detailed prompt specifies reading level, key topics, language simplicity, and practical focus - all essential for effective patient education. This ensures materials are accessible to your entire patient population.',
        clinicalPearl: 'Always specify reading level (typically 6th-8th grade for general population), key teaching points, and request practical examples. Consider creating versions in multiple languages for diverse populations.'
      }
    ]
  },

  // MODULE 5: AI Safety & Bias
  'med-5': {
    moduleTitle: 'AI Safety & Bias',
    questions: [
      {
        id: 'med-5-q1',
        question: 'What is algorithmic bias in medical AI?',
        options: [
          'When AI prefers certain medical specialties',
          'When AI performs differently across patient populations',
          'When AI is biased toward newer treatments',
          'When AI disagrees with physician decisions'
        ],
        correctAnswer: 1,
        explanation: 'Algorithmic bias occurs when AI performs differently (usually worse) for certain patient populations due to underrepresentation in training data, biased historical data, or inappropriate model design.',
        category: 'Bias & Fairness'
      },
      {
        id: 'med-5-q2',
        question: 'A pulse oximeter AI shows lower accuracy for patients with darker skin tones. This is an example of:',
        options: [
          'Acceptable variation in medical devices',
          'Health equity issue requiring correction',
          'User error in device application',
          'Normal device limitations'
        ],
        correctAnswer: 1,
        explanation: 'This is a documented health equity issue. Pulse oximeters and related AI can show reduced accuracy for darker skin tones, potentially leading to delayed treatment. This requires device improvement and clinical awareness.',
        category: 'Health Equity'
      },
      {
        id: 'med-5-q3',
        question: 'What should you do if you suspect an AI system is showing biased results?',
        options: [
          'Ignore it - all AI has some bias',
          'Stop using AI completely',
          'Document observations and report to appropriate channels',
          'Only use AI for certain patient populations'
        ],
        correctAnswer: 2,
        explanation: 'Document specific observations of bias (which populations, what outcomes), report to your institution\'s AI governance committee or vendor, and continue monitoring. This helps improve AI systems and protect patients.',
        category: 'Safety Monitoring'
      },
      {
        id: 'med-5-q4',
        question: 'What is "model drift" in medical AI?',
        options: [
          'When AI slowly moves across the screen',
          'When AI performance degrades over time',
          'When AI learns new medical knowledge',
          'When AI updates automatically'
        ],
        correctAnswer: 1,
        explanation: 'Model drift occurs when AI performance degrades over time as patient populations, clinical practices, or data patterns change. Regular monitoring and retraining are essential to maintain accuracy.',
        category: 'AI Maintenance'
      },
      {
        id: 'med-5-q5',
        question: 'An AI system recommends a treatment that contradicts current guidelines. You should:',
        options: [
          'Follow the AI recommendation - it knows best',
          'Apply clinical judgment and follow evidence-based guidelines',
          'Disable the AI system immediately',
          'Ask the patient to decide'
        ],
        correctAnswer: 1,
        explanation: 'Always apply clinical judgment and follow evidence-based guidelines. AI can make errors, use outdated information, or not account for individual patient factors. You are responsible for final clinical decisions.',
        category: 'Clinical Decision Making'
      }
    ],
    scenarios: []
  },

  // MODULE 6: Building Workflows
  'med-6': {
    moduleTitle: 'Building Workflows',
    questions: [
      {
        id: 'med-6-q1',
        question: 'When integrating AI into clinical workflows, the first step should be:',
        options: [
          'Buy the most expensive AI system',
          'Identify a specific problem AI can help solve',
          'Replace all existing systems with AI',
          'Train all staff on AI immediately'
        ],
        correctAnswer: 1,
        explanation: 'Start by identifying a specific, measurable problem (e.g., delayed sepsis recognition, documentation burden). This ensures AI implementation addresses real needs and allows you to measure success.',
        category: 'Implementation Strategy'
      },
      {
        id: 'med-6-q2',
        question: 'What is the most important factor for successful AI adoption?',
        options: [
          'Having the latest AI technology',
          'Physician and staff buy-in and training',
          'Spending the most money',
          'Implementing AI in all departments simultaneously'
        ],
        correctAnswer: 1,
        explanation: 'User buy-in and proper training are critical for success. Even the best AI fails if clinicians don\'t trust it, understand it, or know how to use it effectively. Start with champions and expand gradually.',
        category: 'Change Management'
      },
      {
        id: 'med-6-q3',
        question: 'How should AI alerts be integrated into EHR workflows?',
        options: [
          'Pop-up alerts for every AI recommendation',
          'Contextual, actionable alerts at point of decision',
          'Daily email summaries of all AI findings',
          'Separate AI dashboard requiring extra clicks'
        ],
        correctAnswer: 1,
        explanation: 'AI alerts should be contextual (right time, right place), actionable (clear next steps), and integrated into existing workflow. Too many alerts cause fatigue; too few reduce effectiveness.',
        category: 'Workflow Integration'
      },
      {
        id: 'med-6-q4',
        question: 'What metric is most important for measuring AI impact?',
        options: [
          'Number of AI recommendations generated',
          'Clinical outcomes and workflow efficiency',
          'Cost of the AI system',
          'Number of users trained'
        ],
        correctAnswer: 1,
        explanation: 'Focus on clinical outcomes (mortality, complications, time-to-treatment) and workflow efficiency (time saved, documentation quality). These demonstrate real value and justify continued investment.',
        category: 'Measuring Success'
      },
      {
        id: 'med-6-q5',
        question: 'When should you pilot an AI system before full deployment?',
        options: [
          'Never - deploy immediately to all users',
          'Always - start with one unit/department',
          'Only if the AI is experimental',
          'Only if required by administration'
        ],
        correctAnswer: 1,
        explanation: 'Always pilot AI systems with a small group first. This allows you to identify workflow issues, refine alert thresholds, train super-users, and demonstrate value before organization-wide rollout.',
        category: 'Implementation Best Practices'
      }
    ],
    scenarios: []
  },

  // MODULE 7: Capstone Project
  'med-7': {
    moduleTitle: 'Capstone Project',
    questions: [
      {
        id: 'med-7-q1',
        question: 'When identifying a clinical problem for AI solution, you should prioritize:',
        options: [
          'The most technologically advanced solution',
          'Problems with measurable impact and clear success metrics',
          'Whatever AI vendors are selling',
          'The most expensive solution'
        ],
        correctAnswer: 1,
        explanation: 'Choose problems where you can measure impact (e.g., reduce door-to-needle time by 15 minutes) and define clear success metrics. This ensures your project demonstrates value and justifies resources.',
        category: 'Project Planning'
      },
      {
        id: 'med-7-q2',
        question: 'A successful AI implementation plan should include:',
        options: [
          'Only technical specifications',
          'Stakeholder engagement, training, workflow integration, and evaluation metrics',
          'Just the budget and timeline',
          'Only physician input'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive plans include stakeholder engagement (physicians, nurses, IT, administration), training programs, workflow integration strategy, and clear evaluation metrics. Success requires buy-in from all affected parties.',
        category: 'Implementation Planning'
      },
      {
        id: 'med-7-q3',
        question: 'How should you evaluate an AI solution after implementation?',
        options: [
          'Ask if people like it',
          'Measure clinical outcomes, workflow efficiency, and user satisfaction',
          'Count how many times it was used',
          'Wait for complaints'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive evaluation includes clinical outcomes (patient safety, quality metrics), workflow efficiency (time saved, documentation quality), and user satisfaction. Use both quantitative data and qualitative feedback.',
        category: 'Evaluation Framework'
      },
      {
        id: 'med-7-q4',
        question: 'When presenting your AI project to stakeholders, emphasize:',
        options: [
          'Technical details and algorithms',
          'Clinical impact, workflow benefits, and ROI',
          'How much the AI cost',
          'Comparison to competitors'
        ],
        correctAnswer: 1,
        explanation: 'Stakeholders care about clinical impact (better outcomes), workflow benefits (time saved, reduced burden), and return on investment. Lead with results and value, not technical details.',
        category: 'Communication'
      },
      {
        id: 'med-7-q5',
        question: 'After successful AI implementation, the next step is:',
        options: [
          'Move on to the next project immediately',
          'Monitor performance, gather feedback, and iterate',
          'Stop all AI-related activities',
          'Implement AI everywhere without evaluation'
        ],
        correctAnswer: 1,
        explanation: 'Continuous monitoring, user feedback, and iterative improvement are essential. AI systems need ongoing refinement based on real-world performance and changing clinical needs.',
        category: 'Continuous Improvement'
      }
    ],
    scenarios: [
      {
        id: 'med-7-s1',
        scenario: `You've identified that your ED has a problem with delayed sepsis recognition, leading to increased mortality. You want to implement an AI-powered early warning system.

Current state:
- Average time to sepsis recognition: 4.2 hours
- Sepsis mortality rate: 18%
- 50 sepsis cases per month
- Limited nursing staff for continuous monitoring`,
        question: 'What should be your primary success metric?',
        options: [
          'Number of AI alerts generated',
          'Reduction in time-to-sepsis recognition and mortality rate',
          'Cost savings from AI system',
          'Staff satisfaction with AI'
        ],
        correctAnswer: 1,
        explanation: 'Focus on clinical outcomes: reduce time-to-recognition (target: <2 hours) and mortality rate (target: <15%). These demonstrate real patient benefit and justify the investment. Track secondary metrics like alert accuracy and staff satisfaction.',
        clinicalPearl: 'Always define success metrics before implementation. For sepsis AI: time-to-antibiotics, mortality rate, ICU length of stay, and cost per case. Aim for 30-50% improvement in primary metrics to demonstrate clear value.'
      }
    ]
  }
};
