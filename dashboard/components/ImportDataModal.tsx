import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface ImportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImportDataModal: React.FC<ImportDataModalProps> = ({ isOpen, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Placeholder for drop handling
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-200 mx-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-1">
          <h2 className="text-lg font-semibold text-textMain">Import Data</h2>
          <button onClick={onClose} className="text-textMuted hover:text-textMain transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-textMuted text-sm mb-6">Upload files to add them to your supermemory</p>

        {/* Dropzone */}
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center text-center transition-colors cursor-pointer
            ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-textMuted hover:bg-surfaceHighlight/30'}
          `}
        >
          <div className="mb-4 text-textMuted">
             <Upload className="w-8 h-8 opacity-50" />
          </div>
          
          <h3 className="text-sm font-medium text-textMain mb-1">Drag and drop files here</h3>
          <p className="text-xs text-textMuted mb-2">
            or <span className="underline hover:text-textMain decoration-1 underline-offset-2">browse files</span>
          </p>
          <p className="text-[10px] text-textMuted mt-1">
            Supports PDF, TXT, MD, DOCX, DOC, RTF, CSV, JSON files
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-textMain hover:bg-surfaceHighlight rounded-md transition-colors border border-border bg-transparent"
          >
            Cancel
          </button>
          <button 
            className="px-6 py-2 text-sm font-medium bg-zinc-500 text-white rounded-md hover:bg-zinc-600 transition-colors shadow-sm"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportDataModal;