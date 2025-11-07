import React, { useState, useEffect, useRef } from 'react';

const FooterLogo = () => (
     <div className="flex items-center justify-center space-x-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        </div>
        <span className="text-2xl font-bold text-text-primary">PDF Converter</span>
    </div>
);

const useAnimatedCounter = (end: number, duration: number = 2500) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const element = ref.current;
        let animationFrameId: number;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current && element) {
                    hasAnimated.current = true;
                    let startTimestamp: number | null = null;

                    const step = (timestamp: number) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = timestamp - startTimestamp;
                        const percentage = Math.min(progress / duration, 1);
                        const easedPercentage = 1 - Math.pow(1 - percentage, 3); // easeOutCubic
                        const currentCount = Math.floor(easedPercentage * end);
                        
                        setCount(currentCount);

                        if (progress < duration) {
                            animationFrameId = requestAnimationFrame(step);
                        } else {
                            setCount(end);
                        }
                    };
                    animationFrameId = requestAnimationFrame(step);
                    observer.unobserve(element);
                }
            },
            { threshold: 0.1 }
        );

        if (element) {
            observer.observe(element);
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [end, duration]);

    return { count, ref };
};


const Footer: React.FC = () => {
    const finalCount = 371572951;
    const { count, ref } = useAnimatedCounter(finalCount);
    
    const formatCount = (num: number) => {
        return num.toLocaleString('en-US');
    };

    const links = {
        'Member area': [
            { name: 'Sign In', href: '#' },
            { name: 'Sign Up', href: '#' },
        ],
        'PDF Converter': [
            { name: 'Blog', href: '#' },
            { name: 'Developers API', href: '#' },
        ],
        'Company': [
            { name: 'Terms and Privacy', href: '#' },
            { name: 'Privacy Policy', href: '#' },
        ],
        'Support': [
            { name: 'Help', href: '#' }
        ]
    };

    return (
        <footer className="bg-gradient-to-t from-amber-100 to-white border-t border-border-color pt-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {Object.entries(links).map(([title, linkItems]) => (
                        <div key={title}>
                            <h3 className="font-bold text-lg text-text-primary">{title}</h3>
                            <ul className="mt-4 space-y-3">
                                {linkItems.map(item => (
                                    <li key={item.name}>
                                        <a href={item.href} className="text-text-secondary hover:text-primary transition-colors">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="text-center py-16">
                    <FooterLogo />
                    <div ref={ref} className="my-6 text-4xl md:text-5xl font-bold text-primary tracking-wider font-mono">
                        {formatCount(count)}
                    </div>
                    <p className="text-text-secondary">files converted since 2005</p>
                </div>
            </div>

            <div className="border-t border-border-color py-6">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm">
                    <p className="text-text-secondary mb-4 sm:mb-0">&copy; 2025 PDF Converter</p>
                    <div className="flex items-center space-x-6">
                        <a href="https://www.convertapi.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary flex items-center hover:text-primary transition-colors">
                            Powered by 
                            <svg className="h-5 ml-2" viewBox="0 0 136 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.28 2.68H1.36v20.64h10.92v-3.72H5.14V15h6.12v-3.6H5.14V6.4h7.14V2.68zM28.32 19.56l-3.32-8.24h-3.68l-3.32 8.24h-4.24L20.64.92h5.16l6.88 18.64h-4.36zm-8.2-11.8l1.4 4.44h.08l1.4-4.44h-2.88zM31.28 19.56V.92h14.96v3.72h-10.8v3.48h9.72v3.6h-9.72v4.12h11.2v3.72H31.28zM57.64 19.56l-6.8-9.48v9.48h-3.96V.92h3.96l6.8 9.48V.92h3.96v18.64h-3.96zM69.09 2.68H63v20.64h10.92v-3.72h-6.84V2.68zM76.65 19.56V.92h4.16v18.64h-4.16zM96.09 19.56l-6.8-9.48v9.48h-3.96V.92h3.96l6.8 9.48V.92h3.96v18.64h-3.96zM113.89 19.56l-6.8-9.48v9.48h-3.96V.92h3.96l6.8 9.48V.92h3.96v18.64h-3.96zM128.53 19.56l-3.32-8.24h-3.68l-3.32 8.24h-4.24l6.88-18.64h5.16l6.88 18.64h-4.36zm-8.2-11.8l1.4 4.44h.08l1.4-4.44h-2.88z" fill="#F05302"/></svg>
                        </a>
                        <div className="relative">
                            <select className="appearance-none bg-transparent text-text-secondary pr-6 border-b border-text-secondary focus:outline-none">
                                <option>English</option>
                            </select>
                            <svg className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;