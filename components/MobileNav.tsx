import React from 'react';
import { tools } from '../data/tools';
import { Tool, ToolCategory } from '../types';
import AccordionItem from './Accordion';

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
    onToolSelect: (tool: Tool) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, onToolSelect }) => {
    const categories: { id: ToolCategory; title: string }[] = [
        { id: 'convert-to-pdf', title: 'Convert To PDF' },
        { id: 'convert-from-pdf', title: 'Convert From PDF' },
        { id: 'merge-split', title: 'Merge And Split' },
        { id: 'security', title: 'PDF Security' },
        { id: 'tools', title: 'PDF Tools' },
    ];

    const handleToolClick = (tool: Tool) => {
        onToolSelect(tool);
        onClose();
    };

    const toolsByCategory = (category: ToolCategory) => {
        return tools.filter(tool => tool.category === category);
    };

    return (
        <>
            <div 
                className={`fixed inset-0 bg-slate-900/50 z-[60] transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>
            <div 
                id="mobile-menu"
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-surface shadow-lg z-[70] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-4 border-b border-border-color flex items-center justify-between">
                     <div className="flex items-center space-x-4">
                        <button className="font-semibold text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-md transition-colors">Sign Up</button>
                        <button className="font-semibold text-text-primary hover:text-primary transition-colors">Sign In</button>
                    </div>
                    <button onClick={onClose} className="text-text-secondary hover:text-text-primary text-3xl">&times;</button>
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
                    {categories.map(cat => (
                        <AccordionItem key={cat.id} title={cat.title}>
                            <ul className="pt-2 pb-2 space-y-1">
                                {toolsByCategory(cat.id).map(tool => (
                                     <li key={tool.id}>
                                        <button onClick={() => handleToolClick(tool)} className="w-full flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors text-left">
                                            <div className={`w-8 h-8 ${tool.color} rounded-md flex items-center justify-center text-lg flex-shrink-0 mr-3`}>
                                                {tool.icon}
                                            </div>
                                            <span className="font-medium text-text-primary">{tool.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </AccordionItem>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MobileNav;