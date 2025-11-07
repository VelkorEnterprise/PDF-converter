import React from 'react';

const Step: React.FC<{ number: number; title: string; description: string; }> = ({ number, title, description }) => (
    <div className="text-center">
        <div className="mb-4 flex items-center justify-center">
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                {number}
            </div>
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary">{description}</p>
    </div>
);

const Features: React.FC = () => {
    return (
        <section id="how-to" className="py-20 bg-surface">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">How to Convert Files to and from PDF Free</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   <Step 
                        number={1} 
                        title="Upload" 
                        description="Select the Word, Excel, PowerPoint, PDF or other file you wish to convert."
                   />
                   <Step 
                        number={2} 
                        title="Start processing" 
                        description="Our free PDF creator will convert your document to PDF or from PDF in seconds."
                   />
                   <Step 
                        number={3} 
                        title="Download" 
                        description="Your new document will be ready to download immediately. After the document is complete, any remaining files uploaded will be purged from our server."
                   />
                </div>
            </div>
        </section>
    );
};

export default Features;