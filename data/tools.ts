import React from 'react';
import { Tool } from '../types';

export const tools: Tool[] = [
    // Main Tool for Hero
    {
        id: 'pdf-converter',
        name: 'PDF Converter',
        description: 'Convert files to and from PDF format.',
        icon: '🔄',
        category: 'main',
        color: 'bg-red-100 text-red-600',
    },
    // Convert To PDF
    {
        id: 'word-to-pdf',
        name: 'Word to PDF',
        description: 'Convert DOCX to PDF',
        icon: 'W',
        category: 'convert-to-pdf',
        color: 'bg-blue-100 text-blue-600',
    },
    {
        id: 'excel-to-pdf',
        name: 'Excel to PDF',
        description: 'Convert XLSX to PDF',
        icon: 'X',
        category: 'convert-to-pdf',
        color: 'bg-green-100 text-green-600',
    },
    {
        id: 'powerpoint-to-pdf',
        name: 'PowerPoint to PDF',
        description: 'Convert PPTX to PDF',
        icon: 'P',
        category: 'convert-to-pdf',
        color: 'bg-orange-100 text-orange-600',
    },
    {
        id: 'jpg-to-pdf',
        name: 'JPG to PDF',
        description: 'Convert JPG to PDF',
        icon: '🏞️',
        category: 'convert-to-pdf',
        color: 'bg-purple-100 text-purple-600',
    },
     {
        id: 'text-to-pdf',
        name: 'Text to PDF',
        description: 'Convert plain text to a PDF document.',
        icon: '✍️',
        category: 'convert-to-pdf',
        color: 'bg-indigo-100 text-indigo-600',
    },
     {
        id: 'autocad-to-pdf',
        name: 'AutoCAD to PDF',
        description: 'Convert DWG to PDF',
        icon: 'A',
        category: 'convert-to-pdf',
        color: 'bg-red-100 text-red-600',
    },
    {
        id: 'openoffice-to-pdf',
        name: 'OpenOffice to PDF',
        description: 'Convert ODT to PDF',
        icon: '📄',
        category: 'convert-to-pdf',
        color: 'bg-blue-100 text-blue-600',
    },
     {
        id: 'ebooks-to-pdf',
        name: 'eBooks to PDF',
        description: 'Convert EPUB, MOBI to PDF',
        icon: '📚',
        category: 'convert-to-pdf',
        color: 'bg-yellow-100 text-yellow-600',
    },
     {
        id: 'iwork-to-pdf',
        name: 'iWork to PDF',
        description: 'Convert Pages, Numbers, Keynote to PDF',
        icon: '',
        category: 'convert-to-pdf',
        color: 'bg-gray-100 text-gray-600',
    },
    // Convert from PDF
    {
        id: 'pdf-to-word',
        name: 'PDF to Word',
        description: 'Convert PDF to DOCX',
        icon: 'W',
        category: 'convert-from-pdf',
        color: 'bg-blue-100 text-blue-600',
    },
    {
        id: 'pdf-to-excel',
        name: 'PDF to Excel',
        description: 'Convert PDF to XLSX',
        icon: 'X',
        category: 'convert-from-pdf',
        color: 'bg-green-100 text-green-600',
    },
    {
        id: 'pdf-to-powerpoint',
        name: 'PDF to PowerPoint',
        description: 'Convert PDF to PPTX',
        icon: 'P',
        category: 'convert-from-pdf',
        color: 'bg-orange-100 text-orange-600',
    },
    {
        id: 'pdf-to-jpg',
        name: 'PDF to JPG',
        description: 'Convert PDF to JPG',
        icon: '🏞️',
        category: 'convert-from-pdf',
        color: 'bg-purple-100 text-purple-600',
    },
    {
        id: 'pdf-to-png',
        name: 'PDF to PNG',
        description: 'Convert PDF to PNG',
        icon: '🖼️',
        category: 'convert-from-pdf',
        color: 'bg-purple-100 text-purple-600',
    },
    {
        id: 'extract-pdf-images',
        name: 'Extract PDF Images',
        description: 'Extract images from a PDF',
        icon: '🌄',
        category: 'convert-from-pdf',
        color: 'bg-purple-100 text-purple-600',
    },
    {
        id: 'pdf-to-pdfa',
        name: 'PDF to PDF/A',
        description: 'Convert PDF to PDF/A',
        icon: '📄',
        category: 'convert-from-pdf',
        color: 'bg-blue-100 text-blue-600',
    },
    // Merge & Split
    {
        id: 'merge-pdf',
        name: 'Merge PDF',
        description: 'Combine multiple PDFs into one unified document.',
        icon: '➕',
        category: 'merge-split',
        color: 'bg-orange-100 text-orange-600'
    },
    {
        id: 'split-pdf',
        name: 'Split PDF',
        description: 'Extract a range of pages or split every page into a separate PDF.',
        icon: '✂️',
        category: 'merge-split',
        color: 'bg-orange-100 text-orange-600'
    },
    // Security
    {
        id: 'protect-pdf',
        name: 'Protect PDF',
        description: 'Add a password and encrypt your PDF file to secure it.',
        icon: '🔒',
        category: 'security',
        color: 'bg-green-100 text-green-600'
    },
     {
        id: 'unlock-pdf',
        name: 'Unlock PDF',
        description: 'Remove password from PDF.',
        icon: '🔓',
        category: 'security',
        color: 'bg-green-100 text-green-600'
    },
     {
        id: 'redact-pdf',
        name: 'Redact PDF',
        description: 'Permanently remove sensitive content.',
        icon: '✒️',
        category: 'security',
        color: 'bg-green-100 text-green-600'
    },
    // PDF Tools
    {
        id: 'compress-pdf',
        name: 'Compress PDF',
        description: 'Reduce the file size of your PDF.',
        icon: '↘️',
        category: 'tools',
        color: 'bg-red-100 text-red-600'
    },
    {
        id: 'delete-pdf-pages',
        name: 'Delete PDF Pages',
        description: 'Remove specific pages from your PDF file.',
        icon: '🗑️',
        category: 'tools',
        color: 'bg-red-100 text-red-600'
    },
    {
        id: 'rotate-pdf',
        name: 'Rotate PDF',
        description: 'Rotate all or specific pages in your PDF document.',
        icon: '🔄',
        category: 'tools',
        color: 'bg-red-100 text-red-600'
    },
    {
        id: 'flatten-pdf',
        name: 'Flatten PDF',
        description: 'Make annotations and form fields non-editable.',
        icon: '📉',
        category: 'tools',
        color: 'bg-red-100 text-red-600'
    },
    {
        id: 'repair-pdf',
        name: 'Repair PDF',
        description: 'Try to fix a corrupted PDF file.',
        icon: '🔧',
        category: 'tools',
        color: 'bg-red-100 text-red-600'
    },
];