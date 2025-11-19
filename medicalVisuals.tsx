/**
 * Visual Elements for Medical AI Curriculum
 * Flowcharts, tables, infographics specific to medical lessons
 */

import React from 'react';

export const MEDICAL_VISUALS = {
  // MODULE 1: AI in Your Practice Today
  'med-1-1': {
    flowchart: {
      title: 'AI Integration in Clinical Workflow',
      description: 'How AI fits into your daily practice',
      nodes: [
        { id: '1', label: 'Patient Encounter', type: 'start', connections: ['2'] },
        { id: '2', label: 'EHR Documentation', type: 'process', connections: ['3'] },
        { id: '3', label: 'AI Analysis', type: 'process', connections: ['4'] },
        { id: '4', label: 'AI Recommendation?', type: 'decision', connections: ['5', '6'] },
        { id: '5', label: 'Review & Validate', type: 'process', connections: ['7'] },
        { id: '6', label: 'Continue Standard Care', type: 'process', connections: ['7'] },
        { id: '7', label: 'Clinical Decision', type: 'end' }
      ]
    },
    comparisonTable: {
      title: 'AI vs Traditional Clinical Decision Support',
      headers: ['Traditional CDSS', 'AI-Powered CDSS'],
      rows: [
        { label: 'Logic', values: ['Rule-based (if-then)', 'Pattern recognition'] },
        { label: 'Adaptability', values: ['Fixed rules', 'Learns from data'] },
        { label: 'Complexity', values: ['Simple interactions', 'Complex patterns'] },
        { label: 'Updates', values: ['Manual programming', 'Continuous learning'] },
        { label: 'Alerts', values: ['High false positive rate', 'Contextual, refined'] },
        { label: 'Example', values: ['Drug interaction checker', 'Sepsis prediction model'] }
      ]
    },
    infographic: {
      title: 'AI in Healthcare: By the Numbers',
      description: 'Current state of AI adoption in clinical practice',
      stats: [
        { value: '87%', label: 'Providers use AI tools', icon: '👨‍⚕️' },
        { value: '34%', label: 'Can identify AI tools', icon: '🤔' },
        { value: '12 min', label: 'Time saved per patient', icon: '⏱️' },
        { value: '41%', label: 'Reduction in med errors', icon: '✅' }
      ]
    }
  },

  'med-1-2': {
    conceptMap: {
      title: 'Components of AI-Assisted Clinical Practice',
      centralConcept: 'AI-Assisted Care',
      branches: [
        {
          label: 'Data Sources',
          items: ['EHR data', 'Lab results', 'Imaging studies', 'Vital signs', 'Patient history']
        },
        {
          label: 'AI Processing',
          items: ['Pattern recognition', 'Risk stratification', 'Prediction models', 'Decision support']
        },
        {
          label: 'Clinical Actions',
          items: ['Review recommendations', 'Validate findings', 'Make decisions', 'Document rationale']
        }
      ]
    },
    timeline: {
      title: 'Evolution of Medical AI',
      events: [
        { year: '1970s', event: 'MYCIN Expert System', details: 'Rule-based system for antibiotic selection' },
        { year: '1990s', event: 'Clinical Decision Support', details: 'Basic alert systems in EHRs' },
        { year: '2012', event: 'Deep Learning Breakthrough', details: 'ImageNet competition shows AI potential' },
        { year: '2016', event: 'FDA Approves First AI', details: 'Arterys cardiac MRI analysis' },
        { year: '2020', event: 'COVID-19 Acceleration', details: 'Rapid AI deployment for pandemic response' },
        { year: '2023', event: 'Generative AI Era', details: 'GPT-4, Med-PaLM 2 for clinical applications' }
      ]
    }
  },

  // MODULE 2: How AI Thinks
  'med-2-1': {
    flowchart: {
      title: 'How AI Learns from Medical Data',
      description: 'The training process for medical AI models',
      nodes: [
        { id: '1', label: 'Collect Medical Data', type: 'start' },
        { id: '2', label: 'Label & Annotate', type: 'process' },
        { id: '3', label: 'Train AI Model', type: 'process' },
        { id: '4', label: 'Validate Performance', type: 'decision' },
        { id: '5', label: 'Deploy in Clinic', type: 'end' }
      ]
    },
    comparisonTable: {
      title: 'Human vs AI Clinical Reasoning',
      headers: ['Human Clinician', 'AI System'],
      rows: [
        { label: 'Learning Method', values: ['Education + Experience', 'Pattern recognition in data'] },
        { label: 'Speed', values: ['Deliberate, contextual', 'Instantaneous analysis'] },
        { label: 'Consistency', values: ['Variable (fatigue, bias)', 'Consistent (same input = same output)'] },
        { label: 'Rare Cases', values: ['Clinical judgment', 'May struggle without training data'] },
        { label: 'Empathy', values: ['Natural human connection', 'None'] },
        { label: 'Adaptability', values: ['High (novel situations)', 'Limited (trained scenarios)'] }
      ]
    }
  },

  // MODULE 3: Protecting Patient Privacy
  'med-3-1': {
    flowchart: {
      title: 'HIPAA-Compliant AI Usage Decision Tree',
      description: 'Determining if AI use is compliant',
      nodes: [
        { id: '1', label: 'Need to Use AI?', type: 'start' },
        { id: '2', label: 'Contains PHI?', type: 'decision' },
        { id: '3', label: 'Has BAA?', type: 'decision' },
        { id: '4', label: 'De-identify Data', type: 'process' },
        { id: '5', label: 'Safe to Use', type: 'end' },
        { id: '6', label: 'HIPAA Violation', type: 'end' }
      ]
    },
    comparisonTable: {
      title: 'HIPAA-Compliant vs Non-Compliant AI Tools',
      headers: ['Compliant Tools', 'Non-Compliant Tools'],
      rows: [
        { label: 'BAA Status', values: ['Has signed BAA', 'No BAA'] },
        { label: 'Data Usage', values: ['Not used for training', 'May train on your data'] },
        { label: 'Security', values: ['HIPAA-grade encryption', 'Standard encryption'] },
        { label: 'Audit Logs', values: ['Complete audit trail', 'Limited logging'] },
        { label: 'Examples', values: ['Nuance DAX, Epic AI', 'ChatGPT, Google Bard'] },
        { label: 'Use Case', values: ['Clinical documentation', 'General education only'] }
      ]
    },
    infographic: {
      title: 'The 18 HIPAA Identifiers to Remove',
      description: 'Protected Health Information that must be de-identified',
      stats: [
        { value: '1-5', label: 'Names, Addresses, Dates', icon: '📝' },
        { value: '6-10', label: 'Phone, Email, SSN, MRN', icon: '📞' },
        { value: '11-15', label: 'Account #, License #, Device ID', icon: '🔢' },
        { value: '16-18', label: 'URLs, IPs, Biometrics', icon: '🌐' }
      ]
    }
  }
};

export default MEDICAL_VISUALS;

  // MODULE 4: Advanced Prompt Engineering
  'med-4-1': {
    flowchart: {
      title: 'Effective Clinical Prompt Structure',
      description: 'Building prompts that generate useful clinical outputs',
      nodes: [
        { id: '1', label: 'Define Goal', type: 'start' },
        { id: '2', label: 'Add Context', type: 'process' },
        { id: '3', label: 'Specify Format', type: 'process' },
        { id: '4', label: 'Set Constraints', type: 'process' },
        { id: '5', label: 'Review Output', type: 'decision' },
        { id: '6', label: 'Refine Prompt', type: 'process' },
        { id: '7', label: 'Use Result', type: 'end' }
      ]
    },
    comparisonTable: {
      title: 'Weak vs Strong Clinical Prompts',
      headers: ['Weak Prompt', 'Strong Prompt'],
      rows: [
        { 
          label: 'Documentation', 
          values: [
            'Write a note',
            'Write SOAP note for 45yo F with chest pain, include PE findings, EKG results, troponin, differential diagnosis'
          ]
        },
        { 
          label: 'Patient Education', 
          values: [
            'Explain diabetes',
            'Create 6th grade reading level diabetes handout covering diet, exercise, medication, monitoring. Use simple language, practical examples'
          ]
        },
        { 
          label: 'Differential Diagnosis', 
          values: [
            'What could this be?',
            'Patient: 67M, sudden severe headache, photophobia, neck stiffness. Vitals stable. Consider differential diagnoses with likelihood and next steps'
          ]
        }
      ]
    },
    conceptMap: {
      title: 'Components of Effective Clinical Prompts',
      centralConcept: 'Clinical Prompt',
      branches: [
        {
          label: 'Context',
          items: ['Patient demographics', 'Chief complaint', 'Relevant history', 'Current findings', 'Clinical question']
        },
        {
          label: 'Format',
          items: ['SOAP note', 'Discharge summary', 'Patient handout', 'Differential list', 'Treatment plan']
        },
        {
          label: 'Constraints',
          items: ['Length limit', 'Reading level', 'Focus areas', 'Exclusions', 'Tone/style']
        }
      ]
    }
  },

  // MODULE 5: AI Safety & Bias
  'med-5-1': {
    flowchart: {
      title: 'AI Safety Monitoring Workflow',
      description: 'Continuous monitoring for AI safety and bias',
      nodes: [
        { id: '1', label: 'Deploy AI System', type: 'start' },
        { id: '2', label: 'Monitor Performance', type: 'process' },
        { id: '3', label: 'Detect Issues?', type: 'decision' },
        { id: '4', label: 'Investigate Root Cause', type: 'process' },
        { id: '5', label: 'Implement Fix', type: 'process' },
        { id: '6', label: 'Validate Improvement', type: 'process' },
        { id: '7', label: 'Continue Monitoring', type: 'end' }
      ]
    },
    comparisonTable: {
      title: 'Types of AI Bias in Healthcare',
      headers: ['Bias Type', 'Example', 'Impact', 'Mitigation'],
      rows: [
        { 
          label: 'Training Data Bias', 
          values: [
            'AI trained mostly on data from academic medical centers',
            'Poor performance in community hospitals',
            'Validate on diverse settings'
          ]
        },
        { 
          label: 'Demographic Bias', 
          values: [
            'Underrepresentation of certain ethnicities',
            'Reduced accuracy for minority populations',
            'Ensure diverse training data'
          ]
        },
        { 
          label: 'Historical Bias', 
          values: [
            'AI learns from biased historical decisions',
            'Perpetuates existing healthcare disparities',
            'Audit for fairness metrics'
          ]
        },
        { 
          label: 'Measurement Bias', 
          values: [
            'Pulse oximeter less accurate on darker skin',
            'Delayed recognition of hypoxemia',
            'Clinical awareness + device improvement'
          ]
        }
      ]
    },
    infographic: {
      title: 'AI Safety Metrics to Monitor',
      description: 'Key performance indicators for safe AI deployment',
      stats: [
        { value: '95%+', label: 'Sensitivity Target', icon: '🎯' },
        { value: '<5%', label: 'False Positive Rate', icon: '⚠️' },
        { value: 'Monthly', label: 'Performance Review', icon: '📊' },
        { value: '100%', label: 'Adverse Event Reporting', icon: '🚨' }
      ]
    }
  },

  // MODULE 6: Building Workflows
  'med-6-1': {
    flowchart: {
      title: 'AI Implementation Roadmap',
      description: 'Step-by-step guide to successful AI deployment',
      nodes: [
        { id: '1', label: 'Identify Problem', type: 'start' },
        { id: '2', label: 'Assess AI Solutions', type: 'process' },
        { id: '3', label: 'Pilot with Small Group', type: 'process' },
        { id: '4', label: 'Gather Feedback', type: 'process' },
        { id: '5', label: 'Refine & Optimize', type: 'process' },
        { id: '6', label: 'Scale to Organization', type: 'process' },
        { id: '7', label: 'Monitor & Iterate', type: 'end' }
      ]
    },
    comparisonTable: {
      title: 'Successful vs Failed AI Implementations',
      headers: ['Success Factors', 'Failure Factors'],
      rows: [
        { label: 'Planning', values: ['Clear problem definition', 'Vague goals'] },
        { label: 'Stakeholders', values: ['Early engagement of all users', 'Top-down mandate'] },
        { label: 'Training', values: ['Comprehensive, ongoing', 'One-time session'] },
        { label: 'Integration', values: ['Seamless workflow fit', 'Extra steps required'] },
        { label: 'Metrics', values: ['Defined success criteria', 'No measurement plan'] },
        { label: 'Iteration', values: ['Continuous improvement', 'Set and forget'] }
      ]
    },
    timeline: {
      title: 'Typical AI Implementation Timeline',
      events: [
        { year: 'Month 1-2', event: 'Planning & Assessment', details: 'Problem identification, solution evaluation, stakeholder engagement' },
        { year: 'Month 3-4', event: 'Pilot Phase', details: 'Deploy to one unit, gather feedback, refine workflows' },
        { year: 'Month 5-6', event: 'Optimization', details: 'Adjust alert thresholds, improve integration, expand training' },
        { year: 'Month 7-9', event: 'Scaled Deployment', details: 'Roll out to additional units, monitor performance' },
        { year: 'Month 10-12', event: 'Evaluation & Iteration', details: 'Measure outcomes, gather feedback, plan improvements' },
        { year: 'Ongoing', event: 'Continuous Monitoring', details: 'Performance tracking, user support, system updates' }
      ]
    }
  },

  // MODULE 7: Capstone Project
  'med-7-1': {
    flowchart: {
      title: 'Capstone Project Framework',
      description: 'From problem identification to implementation',
      nodes: [
        { id: '1', label: 'Identify Clinical Problem', type: 'start' },
        { id: '2', label: 'Research AI Solutions', type: 'process' },
        { id: '3', label: 'Design Implementation', type: 'process' },
        { id: '4', label: 'Create Evaluation Plan', type: 'process' },
        { id: '5', label: 'Present to Stakeholders', type: 'process' },
        { id: '6', label: 'Approved?', type: 'decision' },
        { id: '7', label: 'Implement & Monitor', type: 'end' }
      ]
    },
    comparisonTable: {
      title: 'Project Evaluation Metrics',
      headers: ['Metric Category', 'Examples', 'Target'],
      rows: [
        { 
          label: 'Clinical Outcomes', 
          values: [
            'Mortality rate, complication rate, time-to-treatment',
            '20-30% improvement'
          ]
        },
        { 
          label: 'Workflow Efficiency', 
          values: [
            'Documentation time, alert response time, throughput',
            '15-25% improvement'
          ]
        },
        { 
          label: 'User Satisfaction', 
          values: [
            'Ease of use, trust in AI, workflow integration',
            '>80% satisfaction'
          ]
        },
        { 
          label: 'Financial Impact', 
          values: [
            'Cost savings, revenue increase, ROI',
            'Positive ROI within 12-18 months'
          ]
        }
      ]
    },
    conceptMap: {
      title: 'Capstone Project Components',
      centralConcept: 'AI Implementation Project',
      branches: [
        {
          label: 'Problem Definition',
          items: ['Current state analysis', 'Impact quantification', 'Root cause identification', 'Success criteria']
        },
        {
          label: 'Solution Design',
          items: ['AI tool selection', 'Workflow integration', 'Training plan', 'Change management']
        },
        {
          label: 'Evaluation',
          items: ['Baseline metrics', 'Outcome measures', 'User feedback', 'Continuous monitoring']
        }
      ]
    }
  }
};
