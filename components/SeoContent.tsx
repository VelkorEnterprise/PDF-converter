import React, { useState } from 'react';

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-2xl">
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
            <p className="text-text-secondary">{description}</p>
        </div>
    </div>
);

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-border-color">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-4 text-left font-semibold text-text-primary">
                <span>{question}</span>
                <svg className={`w-5 h-5 transition-transform text-text-secondary ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && <div className="pt-2 pb-4 text-text-secondary prose max-w-none" dangerouslySetInnerHTML={{ __html: answer }} />}
        </div>
    );
};


const SeoContent: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="prose max-w-none lg:prose-lg mx-auto text-text-secondary">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary text-center">Unlock Your Document Potential with the Ultimate Free PDF Converter</h2>
                    <p className="lead text-center">In today's fast-paced digital world, documents are the currency of communication and commerce. The Portable Document Format (PDF) stands as the universal standard for sharing and archiving files, ensuring that your documents look the same on any device. However, working with PDFs can be challenging without the right tools. That's why we created a comprehensive, powerful, and completely free online PDF converter designed to handle all your document management needs. Whether you need to convert a Word document into a PDF for a professional report, merge multiple receipts into a single file for an expense claim, or protect sensitive information with a password, our suite of tools provides a seamless, secure, and instant solution right from your web browser. Forget about downloading bulky software or paying for expensive licenses; the future of document conversion is here, and it's accessible to everyone.</p>

                    <h3 className="text-2xl font-bold text-text-primary mt-12">A Comprehensive Guide to Our Free PDF Tools</h3>
                    <p>Our platform is more than just a simple file converter; it's a full-featured PDF toolkit. We have meticulously developed a range of functions to address every common (and uncommon) PDF-related task. Each tool is designed with user-friendliness and security at its core, ensuring a smooth and safe experience. All processing for our core tools happens directly within your browser, meaning your sensitive files never leave your computer. This client-side approach guarantees maximum privacy and speed.</p>
                    
                    <h4 className="text-xl font-bold text-text-primary mt-8">Effortless Conversion to PDF</h4>
                    <p>Creating professional, universally compatible PDF files from your existing documents is a cornerstone of our service. Our "Convert to PDF" tools support a vast array of file formats, making it simple to standardize your documents for sharing, printing, or archiving. From business documents and academic papers to images and design files, our converter preserves your original formatting, fonts, and images with perfect fidelity.</p>
                    <ul>
                        <li><strong>Word, Excel, PowerPoint to PDF:</strong> Transform your Microsoft Office documents into secure, read-only PDFs in seconds. This is perfect for sharing reports, spreadsheets, and presentations without worrying about formatting changes.</li>
                        <li><strong>JPG to PDF:</strong> Convert your images, scans, and photos into a single, easy-to-share PDF document. You can even combine multiple images into one file, creating a professional portfolio or a simple photo album.</li>
                        <li><strong>And More:</strong> We also support specialized formats like AutoCAD, OpenOffice, eBooks (EPUB, MOBI), and iWork files, ensuring that no matter what software you use, you can create a high-quality PDF.</li>
                    </ul>

                    <h4 className="text-xl font-bold text-text-primary mt-8">Seamless Conversion from PDF</h4>
                    <p>Need to edit or repurpose the content locked inside a PDF? Our "Convert from PDF" tools are here to help. We can intelligently extract text, images, and data from your PDFs and convert them into editable formats, saving you hours of manual re-typing and re-formatting. Our advanced conversion engine strives to maintain the original layout as closely as possible.</p>
                    <ul>
                        <li><strong>PDF to Word, Excel, PowerPoint:</strong> Unlock your PDFs and convert them back into fully editable Microsoft Office documents. Extract data from tables into an Excel spreadsheet, or turn a PDF presentation back into a PowerPoint file for easy updates.</li>
                        <li><strong>PDF to JPG/PNG:</strong> Convert each page of your PDF into a high-quality image file. This is useful for sharing on social media, embedding in websites, or using in graphic design projects.</li>
                        <li><strong>Extract PDF Images:</strong> Quickly pull all the embedded images from a PDF file and download them as individual files, saving you the hassle of taking screenshots.</li>
                    </ul>

                    <h4 className="text-xl font-bold text-text-primary mt-8">Organize and Manage Your PDFs</h4>
                    <p>Managing large documents or multiple files can be cumbersome. Our organization tools simplify these tasks, allowing you to tailor your PDFs to your exact needs. Whether you're compiling a report from various sources or breaking down a large manual into smaller sections, these tools give you complete control.</p>
                    <ul>
                        <li><strong>Merge PDF:</strong> Combine multiple PDF files into one cohesive document. Arrange the files in any order you like before merging. It's the perfect tool for creating comprehensive reports, project submissions, or personal archives.</li>
                        <li><strong>Split PDF:</strong> Extract specific pages or page ranges from a large PDF file. You can create a new PDF with just the pages you need, or split every page into a separate file. This is ideal for sharing excerpts or reducing file size.</li>
                    </ul>

                    <h4 className="text-xl font-bold text-text-primary mt-8">Secure and Optimize Your Documents</h4>
                    <p>Security and efficiency are paramount. Our optimization and security tools help you protect your information and ensure your files are easy to handle and share. From reducing file size for email to adding a layer of encryption, we've got you covered.</p>
                    <ul>
                        <li><strong>Compress PDF:</strong> Drastically reduce the file size of your PDFs without a significant loss in quality. This makes your files easier to email, upload, and store.</li>
                        <li><strong>Protect PDF:</strong> Add password protection to your PDF to prevent unauthorized access. Encrypt your file to secure sensitive and confidential information.</li>
                        <li><strong>Rotate PDF:</strong> Quickly fix incorrectly scanned pages by rotating them to the correct orientation.</li>
                        <li><strong>Delete PDF Pages:</strong> Permanently remove unwanted pages from your document.</li>
                    </ul>
                </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mt-20">
                   <FeatureCard
                        icon="🏆"
                        title="The Best Free PDF Converter"
                        description="No matter what types of files you need to convert, our online file converter is more than just a PDF file converter. It’s the go-to solution for all of your file conversion needs."
                   />
                   <FeatureCard
                        icon="✨"
                        title="Start a free trial"
                        description="With a free trial of our online PDF converter, you can convert files to and from PDF for free, or sign up for one of our memberships for limitless access to our file converter’s full suite of tools."
                   />
                   <FeatureCard
                        icon="🔒"
                        title="Encrypted files"
                        description="We care about the privacy of your data. 256-bit SSL Encryption of all your files means that your files, documents, and data are secure. We also won’t give or share any of your data with other parties."
                   />
                    <FeatureCard
                        icon="🗑️"
                        title="Automatic deletion of your files"
                        description="After you convert a document to PDF, you'll be able to download and delete your files from our servers. If you happen to forget about deleting your files, they will be deleted from our server automatically after three hours to ensure your information is secure."
                   />
                   <FeatureCard
                        icon="🌍"
                        title="Universal conversion"
                        description="Our free file converter works on any OS, including Windows, Mac, and Linux. Because of this, you can convert files to PDF from any OS or device as long as you have an Internet connection."
                   />
                   <FeatureCard
                        icon="🛠️"
                        title="A suite of helpful file conversion tools"
                        description="Our PDF file converter does more than convert files to PDF. From compression and rotation to merging two different PDFs and splitting one PDF into two, you can easily edit your PDF files with our suite of tools in the blink of an eye."
                   />
                </div>

                <div id="faq" className="mt-24 max-w-4xl mx-auto">
                     <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary text-center mb-12">Frequently Asked Questions (FAQ)</h2>
                     <div className="space-y-4">
                        <FaqItem 
                            question="Is this PDF converter really free?"
                            answer="<p>Yes! All our client-side tools—Image to PDF, Merge, Split, Rotate, Delete Pages, and Protect PDF—are completely free to use. They run in your browser, so you can perform as many tasks as you need without any cost. Some advanced, server-side conversions that require significant processing power may require a premium plan in the future, but we are committed to ensuring our core tools will always have a robust and generous free offering for everyone.</p>"
                        />
                        <FaqItem 
                            question="Are my files safe and secure?"
                            answer="<p>Absolutely. Your privacy is our top priority. For all the tools that are currently active, the entire process happens on your computer, in your browser. Your files are never uploaded to our servers. This client-side processing model makes it the most secure way to handle your sensitive documents because they never leave your control. For any future tools that require server-side processing, we will use industry-standard 256-bit SSL encryption for all file transfers and implement a strict policy of automatically deleting all uploaded files from our servers after three hours.</p>"
                        />
                         <FaqItem 
                            question="Do I need to install any software?"
                            answer="<p>No software installation is required. Our platform is a fully web-based application that works directly in your favorite browser. As long as you have a modern web browser like Google Chrome, Mozilla Firefox, Apple Safari, or Microsoft Edge, and an active internet connection, you can access all of our tools from any device. This includes desktops (Windows, Mac, Linux), tablets (iPad, Android), and smartphones (iPhone, Android). The convenience of a web-based tool means you can work on your documents from anywhere, at any time.</p>"
                        />
                         <FaqItem 
                            question="What types of images can I convert to PDF?"
                            answer="<p>Our 'Image to PDF' tool is very versatile and designed to handle a wide variety of image formats. It supports all major formats, including JPG (or JPEG), PNG, BMP, and GIF. You can upload a single image to create a one-page PDF, or you can upload multiple images at once. When you upload multiple images, our tool will combine them into a single, organized PDF file, with each image on its own page. You can even reorder the images before converting to ensure they appear in the correct sequence.</p>"
                        />
                        <FaqItem 
                            question="How does merging PDF files work?"
                            answer="<p>Our Merge PDF tool allows you to combine multiple PDF documents into a single file in just a few clicks. First, you upload all the individual PDF files you want to merge. Once uploaded, you will see a preview of each file. You can then easily arrange them into the desired order by simply dragging and dropping the file thumbnails. After you have the correct order, you just click the 'Merge' button. The tool will process them in your browser and provide a single, unified PDF for you to download instantly.</p>"
                        />
                        <FaqItem 
                            question="What are the limits on file size or number of conversions?"
                            answer="<p>For our free, browser-based tools, there are generally no hard limits on the number of conversions or tasks you can perform. You can use them as many times as you need. However, because the processing happens locally on your device, the maximum file size you can work with may be limited by your computer's memory (RAM) and your browser's capabilities. For most standard documents and images, this is not an issue. We are exploring premium options for the future that will allow for server-side processing of extremely large files.</p>"
                        />
                        <FaqItem 
                            question="Will the formatting of my document change after conversion?"
                            answer="<p>We have engineered our conversion tools to maintain the original formatting of your document as accurately as possible. When converting files like Word, Excel, or PowerPoint to PDF, our engine works to preserve the layout, fonts, images, and tables exactly as they appear in the original file. Similarly, when converting from PDF to an editable format, we use advanced OCR (Optical Character Recognition) and layout detection technology to reconstruct the document, though complex layouts may sometimes have minor variations.</p>"
                        />
                        <FaqItem 
                            question="Can I use these tools on my mobile phone?"
                            answer="<p>Yes, absolutely! Our website is fully responsive and designed to work seamlessly on all modern mobile devices. You can use your iPhone, Android phone, or tablet to access all our PDF tools. You can upload files directly from your device's storage or cloud services, process them on the go, and download the results right back to your phone. It's a powerful PDF toolkit that fits in your pocket.</p>"
                        />
                     </div>
                </div>

            </div>
        </section>
    );
};

export default SeoContent;