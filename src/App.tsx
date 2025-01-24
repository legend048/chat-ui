import { useState } from 'react';
import { Terminal, Code2, Sparkles, ExternalLink } from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FeatureCard } from './components/FeatureCard';
import { PromptPage } from './pages/PromptPage';
import AddScriptToHead from './multilipi';

function App() {
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

  if (selectedFramework) {
    return (
      <PromptPage
        framework={selectedFramework}
        onBack={() => setSelectedFramework(null)}
      />
    );
  }

  return (
    <>
      <AddScriptToHead />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <Header />

        {/* Hero Section */}
        <main className="container mx-auto px-6 pt-20 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Start uw volgende project binnen enkele seconden
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Launch a new development environment instantly with your favorite framework.
              No setup required.
            </p>
            
            {/* Command Display */}
            <div className="bg-gray-800 rounded-lg p-4 mb-8 mx-auto max-w-2xl flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-blue-400" />
                <code className="text-gray-300">npx create-bolt-app my-project</code>
              </div>
              <button className="text-sm bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition-colors">
                Copy
              </button>
            </div>

            {/* Framework Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {['React', 'Next.js', 'Vue', 'Svelte'].map((framework) => (
                <button
                  key={framework}
                  onClick={() => setSelectedFramework(framework)}
                  className="flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-colors"
                >
                  <span>{framework}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section className="bg-gray-800/50 py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <FeatureCard
                icon={<Code2 className="w-8 h-8 text-blue-400" />}
                title="Instant Development"
                description="Start coding immediately with pre-configured development environments."
              />
              <FeatureCard
                icon={<Terminal className="w-8 h-8 text-purple-400" />}
                title="Zero Config"
                description="Everything you need is set up automatically. Just start coding."
              />
              <FeatureCard
                icon={<Sparkles className="w-8 h-8 text-green-400" />}
                title="Modern Stack"
                description="Access the latest frameworks and tools without installation hassles."
              />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default App;