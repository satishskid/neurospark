/**
 * Visual Elements for Enriched Content
 * Reusable components for flowcharts, diagrams, tables, and infographics
 */

import React from 'react';

// Flowchart Component
export const Flowchart = ({ title, nodes, description }: {
  title: string;
  nodes: Array<{ id: string; label: string; type: 'start' | 'process' | 'decision' | 'end'; connections?: string[] }>;
  description?: string;
}) => (
  <div className="my-8 p-6 bg-slate-50 border-2 border-slate-300 rounded-xl">
    <h4 className="text-xl font-semibold text-gray-900 mb-2">{title}</h4>
    {description && <p className="text-gray-600 text-sm mb-4 italic">{description}</p>}
    <div className="space-y-4">
      {nodes.map((node, idx) => (
        <div key={node.id} className="flex items-center gap-4">
          <div className={`px-6 py-3 rounded-lg font-medium text-center min-w-[200px] ${
            node.type === 'start' ? 'bg-green-100 border-2 border-green-600 text-green-900 rounded-full' :
            node.type === 'end' ? 'bg-red-100 border-2 border-red-600 text-red-900 rounded-full' :
            node.type === 'decision' ? 'bg-yellow-100 border-2 border-yellow-600 text-yellow-900 transform rotate-45' :
            'bg-blue-100 border-2 border-blue-600 text-blue-900'
          }`}>
            <span className={node.type === 'decision' ? 'block transform -rotate-45' : ''}>
              {node.label}
            </span>
          </div>
          {idx < nodes.length - 1 && (
            <div className="text-gray-400 text-2xl">→</div>
          )}
        </div>
      ))}
    </div>
  </div>
);

// Comparison Table Component
export const ComparisonTable = ({ title, headers, rows, description }: {
  title: string;
  headers: string[];
  rows: Array<{ label: string; values: string[] }>;
  description?: string;
}) => (
  <div className="my-8 overflow-x-auto">
    <h4 className="text-xl font-semibold text-gray-900 mb-2">{title}</h4>
    {description && <p className="text-gray-600 text-sm mb-4 italic">{description}</p>}
    <table className="w-full border-collapse border-2 border-gray-300">
      <thead>
        <tr className="bg-cyan-600 text-white">
          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Feature</th>
          {headers.map((header, idx) => (
            <th key={idx} className="border border-gray-300 px-4 py-3 text-left font-semibold">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">{row.label}</td>
            {row.values.map((value, vIdx) => (
              <td key={vIdx} className="border border-gray-300 px-4 py-3 text-gray-700">{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Infographic Stats Component
export const InfographicStats = ({ title, stats, description }: {
  title: string;
  stats: Array<{ value: string; label: string; icon?: string }>;
  description?: string;
}) => (
  <div className="my-8 p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-300 rounded-xl">
    <h4 className="text-xl font-semibold text-gray-900 mb-2">{title}</h4>
    {description && <p className="text-gray-600 text-sm mb-6 italic">{description}</p>}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="text-center">
          {stat.icon && <div className="text-4xl mb-2">{stat.icon}</div>}
          <div className="text-3xl font-bold text-cyan-700">{stat.value}</div>
          <div className="text-sm text-gray-700 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
);

// Code Block Component
export const CodeBlock = ({ title, code, language = 'text', description }: {
  title: string;
  code: string;
  language?: string;
  description?: string;
}) => (
  <div className="my-8">
    <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
    {description && <p className="text-gray-600 text-sm mb-3 italic">{description}</p>}
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  </div>
);

// Concept Map Component
export const ConceptMap = ({ title, centralConcept, branches, description }: {
  title: string;
  centralConcept: string;
  branches: Array<{ label: string; items: string[] }>;
  description?: string;
}) => (
  <div className="my-8 p-6 bg-purple-50 border-2 border-purple-300 rounded-xl">
    <h4 className="text-xl font-semibold text-gray-900 mb-2">{title}</h4>
    {description && <p className="text-gray-600 text-sm mb-6 italic">{description}</p>}
    <div className="flex flex-col items-center">
      <div className="px-8 py-4 bg-purple-600 text-white rounded-full font-bold text-lg mb-8">
        {centralConcept}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {branches.map((branch, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg border-2 border-purple-300">
            <h5 className="font-semibold text-purple-900 mb-3">{branch.label}</h5>
            <ul className="space-y-2">
              {branch.items.map((item, iIdx) => (
                <li key={iIdx} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Timeline Component
export const Timeline = ({ title, events, description }: {
  title: string;
  events: Array<{ year: string; event: string; details?: string }>;
  description?: string;
}) => (
  <div className="my-8 p-6 bg-amber-50 border-2 border-amber-300 rounded-xl">
    <h4 className="text-xl font-semibold text-gray-900 mb-2">{title}</h4>
    {description && <p className="text-gray-600 text-sm mb-6 italic">{description}</p>}
    <div className="space-y-6">
      {events.map((event, idx) => (
        <div key={idx} className="flex gap-4">
          <div className="flex-shrink-0 w-20 text-right">
            <span className="inline-block px-3 py-1 bg-amber-600 text-white rounded-full font-bold text-sm">
              {event.year}
            </span>
          </div>
          <div className="flex-1 border-l-4 border-amber-600 pl-4 pb-4">
            <h5 className="font-semibold text-gray-900 mb-1">{event.event}</h5>
            {event.details && <p className="text-sm text-gray-700">{event.details}</p>}
          </div>
        </div>
      ))}
    </div>
  </div>
);
