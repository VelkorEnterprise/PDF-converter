import React from 'react';
import { tools } from '../data/tools';
import { Tool, ToolCategory } from '../types';

interface PdfToolProps {
    onToolSelect: (tool: Tool) => void;
}

const ToolCard: React.FC<{ tool: Tool; onClick: () => void }> = ({ tool, onClick }) => (
    <button
        onClick={onClick}
        className="w-full h-full text-left p-4 bg-surface rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center space-x-4"
    >
        <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center text-2xl flex-shrink-0`}>
            {tool.icon}
        </div>
        <div>
            <h3 className="font-bold text-md text-text-primary">{tool.name}</h3>
            <p className="text-text-secondary text-sm">{tool.description}</p>
        </div>
    </button>
);

const CubeShowcase: React.FC = () => {
    const cubeTools = [
        tools.find(t => t.id === 'merge-pdf'),
        tools.find(t => t.id === 'jpg-to-pdf'),
        tools.find(t => t.id === 'word-to-pdf'),
        tools.find(t => t.id === 'compress-pdf'),
        tools.find(t => t.id === 'protect-pdf'),
        tools.find(t => t.id === 'split-pdf'),
    ].filter(Boolean) as Tool[];

    const faceClasses = ['front', 'right', 'back', 'left', 'top', 'bottom'];

    return (
         <div className="flex justify-center items-center py-12">
            <div className="scene">
                <div className="cube">
                    {cubeTools.map((tool, index) => (
                        <div key={tool.id} className={`face ${faceClasses[index]}`}>
                            <div className={`${tool.color} w-16 h-16 rounded-lg flex items-center justify-center text-3xl`}>
                                {tool.icon}
                            </div>
                            <span>{tool.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const PdfTool: React.FC<PdfToolProps> = ({ onToolSelect }) => {
    const categories: { id: ToolCategory; title: string }[] = [
        { id: 'convert-to-pdf', title: 'Convert To PDF' },
        { id: 'convert-from-pdf', title: 'Convert From PDF' },
        { id: 'merge-split', title: 'Merge And Split' },
        { id: 'security', title: 'PDF Security' },
        { id: 'tools', title: 'PDF Tools' },
    ];

    const toolsByCategory = (category: ToolCategory) => {
        return tools.filter(tool => tool.category === category);
    };

    return (
        <section id="tools" className="bg-background">
             {/* Showcase Section */}
            <div className="py-20 bg-slate-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                     <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">Meet Our Family Production</h2>
                     <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
                        A showcase of our most popular and powerful PDF tools, ready to handle any task.
                    </p>
                    <CubeShowcase />
                </div>
            </div>

            {/* Main Tool Grid Section */}
            <div className="py-20 bg-slate-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white">All the PDF tools you need</h2>
                        <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                            Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
                        </p>
                    </div>

                    {categories.map(category => {
                        const categoryTools = toolsByCategory(category.id);
                        if (categoryTools.length === 0) return null;
                        
                        return (
                            <div key={category.id} className="mb-16">
                                <h3 className="text-2xl font-bold text-white mb-8">{category.title}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {categoryTools.map(tool => (
                                        <ToolCard key={tool.id} tool={tool} onClick={() => onToolSelect(tool)} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PdfTool;
