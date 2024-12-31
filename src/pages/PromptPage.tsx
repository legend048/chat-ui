import { useState } from 'react';
import { ArrowLeft, Wand2 } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WorkspacePage } from './WorkspacePage';

interface PromptPageProps {
  framework: string;
  onBack: () => void;
}

export function PromptPage({ framework, onBack }: PromptPageProps) {
  const [prompt, setPrompt] = useState('');
  const [showWorkspace, setShowWorkspace] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowWorkspace(true);
  };

  if (showWorkspace) {
    return <WorkspacePage framework={framework} prompt={prompt} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Create a new {framework} project
          </h1>
          <p className="text-gray-400 mb-8">
            Describe your project, and we'll help you set it up with best practices and modern tooling.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
                Project Description
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., Create a blog with authentication, dark mode, and markdown support..."
                className="w-full h-32 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Wand2 className="w-5 h-5" />
              <span>Generate Project</span>
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}