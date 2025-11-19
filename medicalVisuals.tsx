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
