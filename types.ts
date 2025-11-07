// FIX: Import React to provide the React namespace.
import React from 'react';

export type ToolCategory = 
  | 'convert-to-pdf'
  | 'convert-from-pdf'
  | 'merge-split'
  | 'security'
  | 'tools'
  | 'main';

export type ToolId = 
  // Main
  | 'pdf-converter'
  // Convert to PDF
  | 'word-to-pdf' 
  | 'excel-to-pdf' 
  | 'powerpoint-to-pdf' 
  | 'jpg-to-pdf' 
  | 'text-to-pdf'
  | 'autocad-to-pdf' 
  | 'openoffice-to-pdf'
  | 'ebooks-to-pdf'
  | 'iwork-to-pdf'
  // Convert from PDF
  | 'pdf-to-word'
  | 'pdf-to-excel'
  | 'pdf-to-powerpoint'
  | 'pdf-to-jpg'
  | 'pdf-to-png'
  | 'extract-pdf-images'
  | 'pdf-to-pdfa'
  // Merge & Split
  | 'merge-pdf' 
  | 'split-pdf' 
  // Security
  | 'protect-pdf' 
  | 'unlock-pdf'
  | 'redact-pdf'
  // PDF Tools
  | 'compress-pdf'
  | 'delete-pdf-pages' 
  | 'rotate-pdf' 
  | 'flatten-pdf'
  | 'repair-pdf';


export interface Tool {
  id: ToolId;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: ToolCategory;
  color: string;
}
