import React from 'react';
import { tools } from '../data/tools';
import { Tool } from '../types';

interface HeroProps {
    onToolSelect: (tool: Tool) => void;
}

const Hero: React.FC<HeroProps> = ({ onToolSelect }) => {
    const pdfConverterTool = tools.find(t => t.id === 'pdf-converter');

    const handleToolClick = () => {
        if (pdfConverterTool) {
            onToolSelect(pdfConverterTool);
        }
    };

    const IconWrapper: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => (
        <button onClick={onClick} className="w-12 h-12 bg-surface border border-border-color rounded-full flex items-center justify-center text-text-secondary hover:bg-gray-100 transition-colors">
            {children}
        </button>
    );

    return (
        <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-white to-amber-100 pt-16 pb-20">
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-amber-200 rounded-full opacity-30 blur-3xl" aria-hidden="true"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-80 h-80 bg-amber-200 rounded-full opacity-30 blur-3xl" aria-hidden="true"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl mx-auto bg-surface/80 backdrop-blur-sm p-8 sm:p-12 border-2 border-dashed border-primary/50 rounded-2xl text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary leading-tight mb-4">
                        Online PDF Converter
                    </h1>
                    <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8">
                        Easily convert to and from PDF in seconds.
                    </p>
                    <button 
                        onClick={handleToolClick}
                        className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                    >
                        Choose file
                    </button>
                    <div className="flex items-center justify-center space-x-4 mt-8">
                        <IconWrapper onClick={handleToolClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </IconWrapper>
                        <IconWrapper onClick={handleToolClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </IconWrapper>
                        <IconWrapper onClick={handleToolClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                        </IconWrapper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;