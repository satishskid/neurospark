import React from 'react';
import { Module } from './types';
import { BrainIcon, CodeBracketIcon, CubeTransparentIcon, DocumentTextIcon, QuestionMarkCircleIcon, ShareIcon, SparklesIcon, CodeBracketSquareIcon, LightBulbIcon, BoltIcon, CpuChipIcon, GlobeAltIcon, UsersIcon, KeyIcon, BuildingStorefrontIcon, PaintBrushIcon, ServerStackIcon, DevicePhoneMobileIcon, WrenchScrewdriverIcon, PuzzlePieceIcon, WindowIcon, BookOpenIcon, FolderOpenIcon, CommandLineIcon, CloudIcon, ComputerDesktopIcon, DocumentDuplicateIcon, FaceSmileIcon, CircleStackIcon, AcademicCapIcon, HomeModernIcon, ArrowDownTrayIcon } from './components/Icons';
import { ShieldCheckIcon, GlobeAmericasIcon, ServerIcon, GitBranchIcon } from './components/Icons';

const Callout = ({ icon, children }: { icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="my-6 p-4 bg-slate-800/50 rounded-lg flex items-start gap-4 border border-slate-700">
        <div className="text-cyan-400 mt-1 flex-shrink-0">{icon}</div>
        <div className="text-slate-300">{children}</div>
    </div>
);

export const CURRICULUM_ENHANCED: Module[] = [
  {
    id: 'module-1-enhanced',
    title: 'Module 1: The MasterChef Kitchen 2024',
    description: 'Get the big picture of how AI works with the latest 2024 advances in generative AI.',
    lessons: [
      {
        id: '1-1-enhanced',
        title: 'What is AI in 2024?',
        type: 'content',
        estimatedTimeMinutes: 3,
        content: (
          <div className="space-y-4">
            <p>Welcome to 2024! AI has evolved dramatically. Imagine having a MasterChef who not only cooks but can create entirely new recipes, understand dietary restrictions, and even predict food trends. That's today's AI landscape.</p>
            <p>From GPT-4's multimodal capabilities to Google's Gemini, from DALL-E 3's artistic mastery to Claude's analytical prowess - we're living in an AI revolution.</p>
            <Callout icon={<BrainIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">The Core Idea: AI as a MasterChef Kitchen</p>
              <p>Think of modern AI as a world-class kitchen with specialized MasterChefs. Each chef has been trained on millions of recipes (data) and can create anything from molecular gastronomy (complex code) to comfort food (simple text generation).</p>
            </Callout>
            <Callout icon={<SparklesIcon className="w-8 h-8" />}>
              <p className="font-semibold text-white">2024 AI Breakthroughs</p>
              <ul className="mt-2 space-y-2 text-sm">
                <li><strong className="text-cyan-400">Multimodal AI:</strong> Models that see, hear, and understand images, text, and audio simultaneously</li>
                <li><strong className="text-yellow-400">Reasoning Models:</strong> AI that can think step-by-step like human experts</li>
                <li><strong className="text-green-400">Agent AI:</strong> Autonomous AI that can use tools and browse the web</li>
                <li><strong className="text-purple-400">Personalized AI:</strong> Models fine-tuned for specific industries and use cases</li>
              </ul>
            </Callout>
            <p>In this enhanced module, we'll explore how these 2024 AI advances work behind the scenes, from your prompt to the final output.</p>
          </div>
        )
      },
      {
        id: '1-2-enhanced',
        title: 'The Journey of a Prompt in 2024',
        type: 'content',
        estimatedTimeMinutes: 4,
        content: (
            <div className="space-y-4">
                <p>So, what happens when you type "Create a marketing campaign for a sustainable fashion brand targeting Gen Z" into GPT-4 or Claude? Your request embarks on a sophisticated journey through 2024's AI architecture.</p>
                <p>Let's follow our MasterChef analogy through the latest AI pipeline:</p>
                <Callout icon={<SparklesIcon className="w-8 h-8" />}>
                    <p className="font-semibold text-white">From Your Idea to a Result (2024 Edition):</p>
                    <ul className="mt-2 space-y-3 list-decimal list-inside">
                        <li><strong className="text-cyan-400">The Recipe Request (Enhanced Prompt):</strong> Your detailed instruction goes through advanced tokenization, understanding context, intent, and even emotional tone.</li>
                        <li><strong className="text-yellow-400">The Smart Kitchen Network (Modern API):</strong> Your request travels through optimized cloud infrastructure with edge computing, reducing latency to milliseconds.</li>
                        <li><strong className="text-green-400">The MasterChef Team (Advanced AI Models):</strong> Specialized models work together - GPT-4 for reasoning, DALL-E for images, Code Interpreter for data analysis.</li>
                        <li><strong className="text-purple-400">Quality Control (AI Safety & Alignment):</strong> Advanced filtering ensures outputs are helpful, harmless, and honest through constitutional AI techniques.</li>
                        <li><strong className="text-blue-400">The Perfect Presentation (Multimodal Output):</strong> Results return as text, images, code, or even interactive elements, beautifully formatted for your needs.</li>
                    </ul>
                </Callout>
                <Callout icon={<BoltIcon className="w-8 h-8" />}>
                    <p className="font-semibold text-white">2024's Mind-Bending Capabilities</p>
                    <p>Today's AI journey is more sophisticated than ever:</p>
                    <ul className="mt-2 space-y-2 text-sm">
                        <li><strong className="text-yellow-400">Trillions of Parameters:</strong> Modern models like GPT-4 have over 1.7 trillion parameters, making them incredibly sophisticated.</li>
                        <li><strong className="text-cyan-400">Context Windows:</strong> Can process up to 128,000 tokens (about 300 pages of text) in a single conversation.</li>
                        <li><strong className="text-green-400">Tool Usage:</strong> AI can now browse the web, run code, analyze data, and use external tools autonomously.</li>
                        <li><strong className="text-purple-400">Real-time Processing:</strong> Responses often include live data, current events, and real-time information.</li>
                    </ul>
                    <p className="mt-2">Every prompt you send activates a global network of supercomputers running the most sophisticated algorithms ever created!</p>
                </Callout>
                <p>Modern AI is like having access to the world's most advanced test kitchen, where MasterChefs can create anything you can imagine - and many things you haven't thought of yet.</p>
            </div>
        )
      },
      {
        id: '1-3-enhanced',
        title: 'Quiz: The 2024 AI Kitchen',
        type: 'quiz',
        estimatedTimeMinutes: 4,
        quiz: {
          questions: [
            {
              question: 'In our 2024 enhanced analogy, what represents the "MasterChef Team" of specialized AI models?',
              options: ['Single large language model', 'Multiple specialized models working together', 'Traditional software programs', 'Human operators'],
              correctAnswer: 'Multiple specialized models working together',
              explanation: 'Modern AI systems like GPT-4, DALL-E, and Code Interpreter work together like a team of specialized MasterChefs, each handling different aspects of complex tasks.'
            },
            {
              question: 'What is the maximum context window size for cutting-edge 2024 AI models?',
              options: ['1,000 tokens', '32,000 tokens', '128,000 tokens', 'Unlimited tokens'],
              correctAnswer: '128,000 tokens',
              explanation: '2024 models like GPT-4 Turbo can process up to 128,000 tokens, equivalent to about 300 pages of text, allowing for much deeper understanding and continuity.'
            },
            {
              question: 'Which 2024 AI advancement allows models to use external tools and browse the web?',
              options: ['Multimodal processing', 'Constitutional AI', 'Agent capabilities', 'Edge computing'],
              correctAnswer: 'Agent capabilities',
              explanation: 'Agent AI capabilities enable models to autonomously use tools, browse the internet, run code, and interact with external systems - a major 2024 breakthrough.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-2-enhanced',
    title: 'Module 2: Advanced Prompt Engineering 2024',
    description: 'Master the art of prompt engineering with latest techniques and best practices.',
    lessons: [
       {
        id: '2-1-enhanced',
        title: '2024 Prompt Engineering Techniques',
        type: 'content',
        estimatedTimeMinutes: 4,
        content: (
             <div className="space-y-4">
                <p>Welcome to the cutting-edge of prompt engineering! In 2024, we've discovered powerful new techniques that make AI responses more accurate, creative, and reliable.</p>
                <p>Think of prompting as writing recipes for MasterChefs who have access to every ingredient and cooking technique ever invented.</p>
                <Callout icon={<LightBulbIcon className="w-8 h-8" />}>
                     <p className="font-semibold text-white">2024 Advanced Prompt Techniques:</p>
                     <ul className="mt-2 space-y-3">
                        <li><strong className="text-yellow-400">Chain-of-Thought (CoT):</strong> "Let's think step by step..." - Gets AI to show its reasoning process</li>
                        <li><strong className="text-cyan-400">Few-Shot Learning:</strong> Provide 2-3 examples before asking for new output</li>
                        <li><strong className="text-green-400">Role-Based Prompting:</strong> "You are a world-class data scientist..." - Sets expert context</li>
                        <li><strong className="text-purple-400">Constitutional AI:</strong> Include ethical guidelines and constraints in your prompt</li>
                        <li><strong className="text-blue-400">Iterative Refinement:</strong> Start broad, then refine with follow-up prompts</li>
                     </ul>
                </Callout>
                <Callout icon={<BrainIcon className="w-8 h-8" />}>
                     <p className="font-semibold text-white">The R.I.C.H. Framework (2024)</p>
                     <p>A new framework for crafting perfect prompts:</p>
                     <ul className="mt-2 space-y-2 text-sm">
                        <li><strong className="text-cyan-400">R</strong>ole: Define who the AI should be</li>
                        <li><strong className="text-yellow-400">I</strong>nstructions: Be specific about what you want</li>
                        <li><strong className="text-green-400">C</strong>ontext: Provide background information</li>
                        <li><strong className="text-purple-400">H</strong>elpfulness: Specify output format and constraints</li>
                     </ul>
                </Callout>
                <p>Master these 2024 techniques and you'll unlock AI capabilities that were impossible just a year ago!</p>
          </div>
        )
      },
       {
        id: '2-2-enhanced',
        title: 'Quiz: Advanced Prompting',
        type: 'quiz',
        estimatedTimeMinutes: 5,
        quiz: {
          questions: [
            {
              question: 'Which 2024 prompt technique involves asking the AI to show its step-by-step reasoning?',
              options: ['Few-shot learning', 'Chain-of-Thought', 'Role-based prompting', 'Constitutional AI'],
              correctAnswer: 'Chain-of-Thought',
              explanation: 'Chain-of-Thought (CoT) prompting, popularized by "Let\'s think step by step," gets AI models to show their reasoning process, leading to more accurate and trustworthy outputs.'
            },
            {
              question: 'In the R.I.C.H. framework, what does the "C" stand for?',
              options: ['Creativity', 'Context', 'Constraints', 'Clarity'],
              correctAnswer: 'Context',
              explanation: 'Context provides the background information that helps the AI understand the situation and generate more relevant responses.'
            },
            {
              question: 'What type of prompting involves providing ethical guidelines in your prompt?',
              options: ['Chain-of-Thought', 'Few-shot learning', 'Constitutional AI', 'Role-based'],
              correctAnswer: 'Constitutional AI',
              explanation: 'Constitutional AI involves including ethical principles and constraints in prompts to ensure outputs align with desired values and behaviors.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-3-enhanced',
    title: 'Module 3: The AI Specialist Team 2024',
    description: 'Meet the latest AI models and their specialized capabilities.',
    lessons: [
      {
        id: '3-1-enhanced',
        title: '2024 AI Model Landscape',
        type: 'content',
        estimatedTimeMinutes: 5,
        content: (
          <div className="space-y-4">
            <p>2024 has brought us an incredible array of AI specialists! Our MasterChef kitchen now has world-renowned chefs for every conceivable task.</p>
            <p>From OpenAI's GPT-4 Turbo to Google's Gemini Ultra, from Anthropic's Claude 3 to Meta's Llama 3 - each model brings unique strengths to the table.</p>
            <Callout icon={<BrainIcon className="w-8 h-8" />}>
                 <p className="font-semibold text-white">The 2024 MasterChef Lineup:</p>
                 <ul className="mt-2 space-y-3 text-sm">
                    <li><strong className="text-cyan-400">GPT-4 Turbo (OpenAI):</strong> The versatile head chef - excellent at reasoning, coding, creative writing, and complex problem-solving</li>
                    <li><strong className="text-yellow-400">Gemini Ultra (Google):</strong> The multimodal expert - seamlessly handles text, images, video, and audio</li>
                    <li><strong className="text-green-400">Claude 3 (Anthropic):</strong> The analytical specialist - exceptional at document analysis, research, and ethical reasoning</li>
                    <li><strong className="text-purple-400">Llama 3 (Meta):</strong> The open-source champion - customizable for specific industries and use cases</li>
                    <li><strong className="text-blue-400">DALL-E 3 & Midjourney V6:</strong> The artistic visionaries - create stunning visual content from text descriptions</li>
                 </ul>
            </Callout>
            <Callout icon={<CpuChipIcon className="w-8 h-8" />}>
                 <p className="font-semibold text-white">Specialized vs. General-Purpose Models</p>
                 <p>2024's landscape includes both:</p>
                 <ul className="mt-2 space-y-2 text-sm">
                    <li><strong className="text-yellow-400">Generalists:</strong> GPT-4, Gemini, Claude - handle diverse tasks</li>
                    <li><strong className="text-cyan-400">Specialists:</strong> CodeT5 (coding), BioBERT (medical), Legal-BERT (legal documents)</li>
                    <li><strong className="text-green-400">Industry-Specific:</strong> Models fine-tuned for healthcare, finance, education, etc.</li>
                 </ul>
            </Callout>
            <p>Understanding which "chef" to call upon is crucial for getting the best results in 2024!</p>
          </div>
        )
      },
      {
        id: '3-2-enhanced',
        title: 'Quiz: 2024 AI Specialists',
        type: 'quiz',
        estimatedTimeMinutes: 4,
        quiz: {
          questions: [
            {
              question: 'Which 2024 model is best known for multimodal capabilities (text, image, video, audio)?',
              options: ['GPT-4 Turbo', 'Gemini Ultra', 'Claude 3', 'Llama 3'],
              correctAnswer: 'Gemini Ultra',
              explanation: 'Gemini Ultra excels at processing and generating multiple types of media - text, images, video, and audio - making it the multimodal specialist of 2024.'
            },
            {
              question: 'Which model family is known for being open-source and highly customizable?',
              options: ['GPT series', 'Gemini series', 'Claude series', 'Llama series'],
              correctAnswer: 'Llama series',
              explanation: 'Meta\'s Llama models are open-source, allowing organizations to fine-tune them for specific use cases and deploy them privately.'
            },
            {
              question: 'What makes Claude 3 particularly strong for enterprise use?',
              options: ['Fastest response time', 'Best image generation', 'Strong ethical reasoning and document analysis', 'Cheapest pricing'],
              correctAnswer: 'Strong ethical reasoning and document analysis',
              explanation: 'Claude 3 excels at ethical reasoning, detailed document analysis, and providing well-reasoned, safe responses for enterprise applications.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'module-4-enhanced',
    title: 'Module 4: Advanced API Integration 2024',
    description: 'Deep dive into modern API architectures and integration patterns.',
    lessons: [
      {
        id: '4-1-enhanced',
        title: '2024 API Architecture Evolution',
        type: 'content',
        estimatedTimeMinutes: 5,
        content: (
          <div className="space-y-4">
            <p>2024's API landscape has evolved dramatically! Our MasterChef kitchen now has hyper-efficient delivery systems, real-time streaming, and intelligent routing.</p>
            <p>From REST to GraphQL, from WebSockets to Server-Sent Events, from gRPC to the latest streaming protocols - APIs have become incredibly sophisticated.</p>
        <Callout icon={<ServerStackIcon className="w-8 h-8" />}>
            <p className="font-semibold text-white">2024 API Innovations:</p>
            <ul className="mt-2 space-y-3 text-sm">
              <li><strong className="text-cyan-400">Streaming APIs:</strong> Real-time responses as they're generated, not waiting for completion</li>
              <li><strong className="text-yellow-400">Function Calling:</strong> APIs that can execute specific functions and return structured data</li>
              <li><strong className="text-green-400">Multimodal APIs:</strong> Single endpoints handling text, images, audio, and video</li>
              <li><strong className="text-purple-400">Edge Computing:</strong> APIs distributed globally for millisecond response times</li>
              <li><strong className="text-blue-400">Rate Limiting 2.0:</strong> Intelligent throttling based on user behavior and system load</li>
            </ul>
            </Callout>
        <Callout icon={<GlobeAltIcon className="w-8 h-8" />}>
            <p className="font-semibold text-white">The Modern Delivery Network</p>
            <p>Today's API infrastructure includes:</p>
            <ul className="mt-2 space-y-2 text-sm">
              <li><strong className="text-yellow-400">CDN Integration:</strong> Content delivery networks for global reach</li>
              <li><strong className="text-cyan-400">Load Balancing:</strong> Distributing requests across multiple servers</li>
              <li><strong className="text-green-400">Caching Layers:</strong> Redis and similar for lightning-fast responses</li>
              <li><strong className="text-purple-400">API Gateways:</strong> Centralized management, authentication, and monitoring</li>
            </ul>
            </Callout>
            <p>Understanding modern API architecture is crucial for building responsive, scalable AI applications in 2024!</p>
          </div>
        )
      },
      {
        id: '4-2-enhanced',
        title: 'Quiz: 2024 API Architecture',
        type: 'quiz',
        estimatedTimeMinutes: 4,
        quiz: {
          questions: [
            {
              question: 'What 2024 API feature allows real-time responses as they\'re generated?',
              options: ['Traditional REST', 'Streaming APIs', 'GraphQL', 'gRPC'],
              correctAnswer: 'Streaming APIs',
              explanation: 'Streaming APIs deliver responses token-by-token as they\'re generated, providing real-time feedback instead of waiting for complete responses.'
            },
            {
              question: 'Which API capability allows AI models to execute specific functions?',
              options: ['Basic authentication', 'Function calling', 'Rate limiting', 'Caching'],
              correctAnswer: 'Function calling',
              explanation: 'Function calling APIs enable AI models to execute specific functions and return structured data, making integrations more powerful and reliable.'
            },
            {
              question: 'What technology helps achieve millisecond response times globally?',
              options: ['Single server deployment', 'Edge computing', 'Local databases', 'Manual optimization'],
              correctAnswer: 'Edge computing',
              explanation: 'Edge computing distributes API endpoints globally, placing them closer to users for millisecond response times regardless of location.'
            }
          ]
        }
      }
    ]
  }
];
// This is a test comment to see if writing to the file unblocks it.
