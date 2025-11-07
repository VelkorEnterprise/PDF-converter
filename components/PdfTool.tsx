import React from 'react';
import { tools } from '../data/tools';
import { Tool, ToolCategory } from '../types';

interface PdfToolProps {
    onToolSelect: (tool: Tool) => void;
}

const ToolCard: React.FC<{ tool: Tool; onClick: () => void }> = ({ tool, onClick }) => (
    <button
        onClick={onClick}
        className="w-full text-left p-4 rounded-lg bg-white hover:shadow-xl transition-shadow border border-slate-200 flex items-center h-full space-x-4"
        aria-label={`Select ${tool.name}`}
    >
        <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center text-2xl flex-shrink-0`}>
            {tool.icon}
        </div>
        <div>
            <h3 className="font-bold text-slate-800">{tool.name}</h3>
            <p className="text-sm text-slate-500 mt-1">{tool.description}</p>
        </div>
    </button>
);

const CubeShowcase: React.FC = () => {
    const showcaseTools = tools.filter(t => ['merge-pdf', 'jpg-to-pdf', 'word-to-pdf', 'protect-pdf', 'split-pdf', 'compress-pdf'].includes(t.id));
    const positions = ['front', 'back', 'right', 'left', 'top', 'bottom'];

    return (
        <div className="h-64 flex items-center justify-center">
            <div className="scene mx-auto">
                <div className="cube">
                    {showcaseTools.map((tool, index) => (
                        <div key={tool.id} className={`face ${positions[index]}`}>
                            <span className="text-4xl">{tool.icon}</span>
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
        <>
            <section id="showcase" className="py-20 bg-gradient-to-br from-white to-amber-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                     <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">Meet Our Family Production</h2>
                    <p className="text-lg text-text-secondary mt-4 max-w-3xl mx-auto">
                        A showcase of our most popular and powerful PDF tools, ready to handle any task.
                    </p>
                    <CubeShowcase />
                </div>
            </section>
        
            <section id="tools" className="py-20 bg-gradient-to-br from-white to-amber-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">All the PDF tools you need</h2>
                        <p className="text-lg text-text-secondary mt-4 max-w-3xl mx-auto">
                            Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
                        </p>
                    </div>

                    {categories.map(category => (
                        <div key={category.id} className="mb-16">
                            <h3 className="text-2xl font-bold text-text-primary mb-6">{category.title}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {toolsByCategory(category.id).map(tool => (
                                    <ToolCard 
                                        key={tool.id} 
                                        tool={tool} 
                                        onClick={() => onToolSelect(tool)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default PdfTool;