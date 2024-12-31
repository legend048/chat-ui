import { Github, Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="container mx-auto px-6 py-4">
      <nav className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap className="w-6 h-6 text-blue-400" />
          <span className="text-xl font-bold">Name_not_decided</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-blue-400 transition-colors">Docs</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Examples</a>
          <a href="https://github.com" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
        </div>
      </nav>
    </header>
  );
}