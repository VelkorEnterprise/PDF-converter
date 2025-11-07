import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument, rgb, StandardFonts, degrees, PDFDict, PDFName, PDFStream } from 'pdf-lib';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { Tool } from '../types';

interface ToolModalProps {
    tool: Tool | null;
    onClose: () => void;
}

const ToolModal: React.FC<ToolModalProps> = ({ tool, onClose }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [textContent, setTextContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<Record<string, any>>({});
    
    useEffect(() => {
        // Reset state when tool changes or modal is closed
        setFiles([]);
        setTextContent('');
        setError(null);
        setOptions({});
        setIsLoading(false);
    }, [tool]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setError(null);
        const pdfTools = ['merge-pdf', 'split-pdf', 'rotate-pdf', 'delete-pdf-pages', 'protect-pdf', 'add-page-numbers', 'extract-pdf-images', 'flatten-pdf', 'pdf-to-pdfa'];
        if (tool && pdfTools.includes(tool.id) && !acceptedFiles.every(f => f.type === 'application/pdf')) {
            setError('Please upload only PDF files for this tool.');
            return;
        }
        if (tool?.id === 'jpg-to-pdf' && !acceptedFiles.every(f => f.type.startsWith('image/'))) {
            setError('Please upload only image files for this tool.');
            return;
        }
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    }, [tool]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const removeFile = (fileToRemove: File) => {
        setFiles(files.filter(file => file !== fileToRemove));
    };
    
    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setOptions(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const downloadFile = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleProcess = async () => {
        if (!tool) return;
        if (tool.id !== 'text-to-pdf' && files.length === 0) return;
        if (tool.id === 'text-to-pdf' && textContent.trim() === '') return;

        setIsLoading(true);
        setError(null);
        try {
            let resultBlob: Blob | null = null;
            let filename = 'processed.pdf';

            const readFile = (file: File) => new Promise<ArrayBuffer>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as ArrayBuffer);
                reader.onerror = (error) => reject(error);
                reader.readAsArrayBuffer(file);
            });
            
            const readImage = (file: File) => new Promise<{ data: string, width: number, height: number }>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => resolve({ data: e.target?.result as string, width: img.width, height: img.height });
                    img.onerror = (error) => reject(error);
                    img.src = e.target?.result as string;
                };
                reader.readAsDataURL(file);
            });

            switch (tool.id) {
                case 'text-to-pdf': {
                    const doc = new jsPDF();
                    const margin = 15;
                    const pageWidth = doc.internal.pageSize.getWidth();
                    const textLines = doc.splitTextToSize(textContent, pageWidth - margin * 2);

                    doc.text(textLines, margin, 20);
                    resultBlob = doc.output('blob');
                    filename = 'text_converted.pdf';
                    break;
                }
                case 'jpg-to-pdf': {
                    const doc = new jsPDF();
                    for (let i = 0; i < files.length; i++) {
                        const { data, width, height } = await readImage(files[i]);
                        const pageWidth = doc.internal.pageSize.getWidth();
                        const pageHeight = doc.internal.pageSize.getHeight();
                        const ratio = Math.min(pageWidth / width, pageHeight / height);
                        if (i > 0) doc.addPage();
                        doc.addImage(data, 'JPEG', 0, 0, width * ratio, height * ratio);
                    }
                    resultBlob = doc.output('blob');
                    filename = 'converted.pdf';
                    break;
                }
                case 'merge-pdf': {
                    const mergedPdf = await PDFDocument.create();
                    for (const file of files) {
                        const pdfBytes = await readFile(file);
                        const pdf = await PDFDocument.load(pdfBytes);
                        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                        copiedPages.forEach(page => mergedPdf.addPage(page));
                    }
                    const pdfBytes = await mergedPdf.save();
                    resultBlob = new Blob([pdfBytes], { type: 'application/pdf' });
                    filename = 'merged.pdf';
                    break;
                }
                 case 'split-pdf':
                 case 'delete-pdf-pages': {
                    const pdfBytes = await readFile(files[0]);
                    const pdf = await PDFDocument.load(pdfBytes);
                    const newPdf = await PDFDocument.create();
                    const pageIndices = pdf.getPageIndices();
                    const pagesToKeep = new Set<number>();
                    
                    const ranges = options.pages.split(',').flatMap((range: string) => {
                        const parts = range.split('-').map(s => parseInt(s.trim(), 10) -1);
                        if(parts.length === 1) return [parts[0]];
                        return Array.from({length: parts[1] - parts[0] + 1}, (_, i) => parts[0] + i);
                    });

                    if(tool.id === 'delete-pdf-pages') {
                        const pagesToDelete = new Set(ranges);
                        pageIndices.forEach(i => !pagesToDelete.has(i) && pagesToKeep.add(i));
                    } else { // split
                        ranges.forEach((i: number) => pageIndices.includes(i) && pagesToKeep.add(i));
                    }
                    
                    const copiedPages = await newPdf.copyPages(pdf, Array.from(pagesToKeep));
                    copiedPages.forEach(page => newPdf.addPage(page));

                    const pdfBytesOut = await newPdf.save();
                    resultBlob = new Blob([pdfBytesOut], { type: 'application/pdf' });
                    filename = tool.id === 'split-pdf' ? 'split.pdf' : 'deleted.pdf';
                    break;
                }
                case 'protect-pdf': {
                     const pdfBytes = await readFile(files[0]);
                     const pdf = await PDFDocument.load(pdfBytes);
                     pdf.setProducer('PDFMaster');
                     pdf.setCreator('PDFMaster');
                     const pdfBytesOut = await pdf.save({ useObjectStreams: false }); 
                     resultBlob = new Blob([pdfBytesOut], { type: 'application/pdf' });
                     filename = 'protected.pdf';
                     alert("Note: True password protection requires a backend. This file is a placeholder.")
                     break;
                }
                case 'extract-pdf-images': {
                    const pdfBytes = await readFile(files[0]);
                    const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
                    const zip = new JSZip();
                    let imageCount = 0;
    
                    const indirectObjects = pdfDoc.context.enumerateIndirectObjects();
    
                    for (const [ref, obj] of indirectObjects) {
                        if (obj instanceof PDFStream) {
                            const dict = obj.dict;
                            if (dict.get(PDFName.of('Subtype')) === PDFName.of('Image')) {
                                const filter = dict.get(PDFName.of('Filter'));
                                // Only handle DCTDecode for now as it's JPEG and straightforward
                                if (filter === PDFName.of('DCTDecode')) {
                                    imageCount++;
                                    const imageBytes = obj.getContents();
                                    zip.file(`image_${imageCount}.jpg`, imageBytes);
                                }
                            }
                        }
                    }
                    
                    if (imageCount === 0) {
                        setError('No compatible (JPEG) images found to extract.');
                        setIsLoading(false);
                        return;
                    }
    
                    const zipBlob = await zip.generateAsync({ type: 'blob' });
                    resultBlob = zipBlob;
                    filename = 'extracted_images.zip';
                    break;
                }
                case 'pdf-to-pdfa': {
                    const pdfBytes = await readFile(files[0]);
                    const srcPdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
    
                    const pdfaDoc = await PDFDocument.create();
                    const copiedPages = await pdfaDoc.copyPages(srcPdf, srcPdf.getPageIndices());
                    copiedPages.forEach(page => pdfaDoc.addPage(page));
    
                    pdfaDoc.setProducer('PDF Converter / pdf-lib');
                    pdfaDoc.setCreator('PDF Converter');
                    pdfaDoc.setCreationDate(new Date());
                    pdfaDoc.setModificationDate(new Date());
    
                    const xmpMetadata = `
                        <?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
                        <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.2-c001 63.139439, 2010/09/27-13:37:26        ">
                           <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
                              <rdf:Description rdf:about=""
                                    xmlns:pdfaid="http://www.aiim.org/pdfa/ns/id/">
                                 <pdfaid:part>1</pdfaid:part>
                                 <pdfaid:conformance>B</pdfaid:conformance>
                              </rdf:Description>
                           </rdf:RDF>
                        </x:xmpmeta>
                        <?xpacket end="w"?>
                    `.trim();
                    pdfaDoc.attachXmpMetadata(xmpMetadata);
                    
                    const pdfBytesOut = await pdfaDoc.save();
                    resultBlob = new Blob([pdfBytesOut], { type: 'application/pdf' });
                    filename = 'converted_to_pdfa.pdf';
    
                    alert("Note: This is a best-effort PDF/A conversion. Full compliance, especially font embedding, cannot be guaranteed in a browser environment.");
                    break;
                }
                 // FIX: Added block scope to prevent redeclaration of 'pdfBytesOut'.
                 case 'rotate-pdf':
                 case 'flatten-pdf': {
                    const pdfBytes = await readFile(files[0]);
                    const pdf = await PDFDocument.load(pdfBytes);
                    if(tool.id === 'flatten-pdf') pdf.flattenPages();
                    if(tool.id === 'rotate-pdf') {
                        pdf.getPages().forEach(page => page.setRotation(degrees(parseInt(options.angle || '90', 10))));
                    }
                    const pdfBytesOut = await pdf.save();
                    resultBlob = new Blob([pdfBytesOut], { type: 'application/pdf' });
                    filename = `${tool.id}.pdf`;
                    break;
                }
                // FIX: Added block scope to prevent redeclaration of 'pdfBytesOut'.
                default: {
                    // For all other conversion tools, we'll just simulate a conversion
                    // In a real app, this would involve a backend or more complex libraries
                    console.log(`Simulating conversion for ${tool.name} with files:`, files);
                    await new Promise(res => setTimeout(res, 1500)); // Simulate processing time
                    // Create a dummy PDF blob as a result
                    const dummyPdf = await PDFDocument.create();
                    const page = dummyPdf.addPage();
                    page.drawText(`This is a simulated result for ${tool.name}.`, { x: 50, y: 750 });
                    const pdfBytesOut = await dummyPdf.save();
                    resultBlob = new Blob([pdfBytesOut], { type: 'application/pdf' });
                    filename = `${tool.id.replace(/-/g, '_')}.pdf`;
                }
            }
            if (resultBlob) {
                downloadFile(resultBlob, filename);
            }
        } catch (e: any) {
            console.error(e);
            setError(`An error occurred: ${e.message || 'Please check your file and try again.'}`);
        }
        setIsLoading(false);
        if(!error) onClose();
    };
    
    const renderOptions = () => {
        if (!tool) return null;
        const inputClass = "w-full p-2 mt-4 rounded-md bg-background border border-border-color text-text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition";
        switch (tool.id) {
            case 'split-pdf':
            case 'delete-pdf-pages':
                return <input type="text" name="pages" placeholder="e.g., 1-3, 5, 8" onChange={handleOptionChange} className={inputClass} />;
            case 'rotate-pdf':
                return <select name="angle" defaultValue="90" onChange={handleOptionChange} className={inputClass}>
                    <option value="90">90 degrees clockwise</option>
                    <option value="180">180 degrees</option>
                    <option value="270">270 degrees clockwise</option>
                </select>;
            case 'protect-pdf':
                 return <input type="password" name="password" placeholder="Enter password" onChange={handleOptionChange} className={inputClass} />;
            default:
                return null;
        }
    }

    if (!tool) return null;

    const isTextTool = tool.id === 'text-to-pdf';
    const isProcessButtonDisabled = isLoading || (isTextTool ? textContent.trim() === '' : files.length === 0);

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-surface rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-border-color flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-text-primary flex items-center gap-4">
                        <span className={`text-4xl w-14 h-14 ${tool.color} rounded-lg flex items-center justify-center`}>{tool.icon}</span> 
                        {tool.name}
                    </h2>
                    <button onClick={onClose} className="text-text-secondary hover:text-text-primary text-3xl font-light">&times;</button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {isTextTool ? (
                         <div>
                            <textarea
                                value={textContent}
                                onChange={(e) => setTextContent(e.target.value)}
                                placeholder="Type or paste your text here..."
                                className="w-full h-64 p-4 border-2 border-dashed rounded-lg text-text-secondary bg-background focus:border-primary focus:outline-none transition-colors"
                                aria-label="Text input for PDF conversion"
                            />
                        </div>
                    ) : (
                        <>
                            <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/10' : 'border-border-color hover:border-primary'}`}>
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <p className="text-primary font-semibold">Drop the files here ...</p>
                                ) : (
                                    <p className="text-text-secondary">Drag 'n' drop files here, or click to select</p>
                                )}
                            </div>
                            {files.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="font-semibold text-text-primary">Selected files:</h3>
                                    <ul className="mt-2 space-y-2 max-h-40 overflow-y-auto p-2 bg-background rounded-md border border-border-color">
                                        {files.map((file, index) => (
                                            <li key={index} className="flex justify-between items-center bg-surface p-2 rounded-md">
                                                <span className="text-sm text-text-secondary truncate pr-4">{file.name}</span>
                                                <button onClick={() => removeFile(file)} className="text-red-500 hover:text-red-700 ml-4 font-bold flex-shrink-0">&times;</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                     {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                    
                    {renderOptions()}
                </div>
                <div className="p-6 border-t border-border-color mt-auto bg-background/50 rounded-b-xl">
                    <div className="flex justify-end gap-4">
                        <button onClick={onClose} className="py-2 px-4 rounded-md bg-surface border border-border-color text-text-primary hover:bg-gray-100 transition-colors">Cancel</button>
                        <button 
                            onClick={handleProcess} 
                            disabled={isProcessButtonDisabled}
                            className="py-2 px-6 rounded-md bg-primary hover:bg-primary-dark text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-36">
                            {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div> : tool.name}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolModal;