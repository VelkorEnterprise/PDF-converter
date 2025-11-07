import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import PdfTool from './components/PdfTool';
import SeoContent from './components/SeoContent';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import ToolModal from './components/ToolModal';
import { Tool } from './types';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isMenuOpen);
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);
  
  const handleToolSelect = (tool: Tool) => {
    setSelectedTool(tool);
  };
  
  const handleCloseModal = () => {
    setSelectedTool(null);
  };

  return (
    <div className="bg-background font-sans">
      <Header onMenuClick={() => setIsMenuOpen(true)} isMenuOpen={isMenuOpen} />
      <MobileNav 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onToolSelect={handleToolSelect} 
      />
      <main>
        <Hero onToolSelect={handleToolSelect} />
        <Features />
        <PdfTool onToolSelect={handleToolSelect} />
        <SeoContent />
      </main>
      <Footer />
      <ToolModal tool={selectedTool} onClose={handleCloseModal} />
    </div>
  );
}

export default App;