import React from 'react';

const Logo = () => (
    <a href="/" className="flex items-center space-x-2 text-xl font-bold text-text-primary">
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        </div>
        <span>PDF Converter</span>
    </a>
);

const Header: React.FC<{ onMenuClick: () => void; isMenuOpen: boolean; }> = ({ onMenuClick, isMenuOpen }) => {
    return (
        <header className="sticky top-0 bg-surface/80 backdrop-blur-sm z-50 border-b border-border-color">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Logo />
                    <nav className="hidden md:flex items-center space-x-8 text-text-primary font-semibold">
                        <a href="#tools" className="hover:text-primary transition-colors">Tools</a>
                        <a href="#how-to" className="hover:text-primary transition-colors">How It Works</a>
                        <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
                    </nav>
                     <div className="hidden md:flex items-center space-x-4">
                        <button className="font-semibold text-text-primary hover:text-primary transition-colors">Sign In</button>
                        <button className="font-semibold text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-md transition-colors">Sign Up</button>
                    </div>
                    <button 
                        onClick={onMenuClick} 
                        className="md:hidden text-text-primary"
                        aria-label="Open menu"
                        aria-controls="mobile-menu"
                        aria-expanded={isMenuOpen}
                    >
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;