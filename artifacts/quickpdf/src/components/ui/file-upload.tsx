import { useState, useCallback } from "react";
import { UploadCloud, File, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  accept?: string;
  className?: string;
}

export function FileUpload({
  onFilesSelected,
  maxFiles = 1,
  maxSizeMB = 50,
  accept = "application/pdf",
  className
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    validateAndSelectFiles(droppedFiles);
  }, [maxFiles, maxSizeMB, accept, onFilesSelected]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      validateAndSelectFiles(selectedFiles);
    }
  }, [maxFiles, maxSizeMB, accept, onFilesSelected]);

  const validateAndSelectFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      // Basic validation
      if (accept === "application/pdf" && file.type !== "application/pdf") {
        return false;
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      onFilesSelected(validFiles.slice(0, maxFiles));
    }
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-full p-10 border-2 border-dashed rounded-xl cursor-pointer transition-colors bg-card",
        isDragging ? "border-primary bg-primary/5" : "border-border hover:bg-accent/50",
        className
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      data-testid="file-upload-zone"
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleChange}
        accept={accept}
        multiple={maxFiles > 1}
        title="Upload files"
        data-testid="file-upload-input"
      />
      <div className="flex flex-col items-center justify-center space-y-4 text-center pointer-events-none">
        <div className="p-4 rounded-full bg-primary/10 text-primary">
          <UploadCloud className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold">
            Choose a file or drag & drop it here
          </p>
          <p className="text-sm text-muted-foreground">
            PDF up to {maxSizeMB}MB {maxFiles > 1 ? `(Max ${maxFiles} files)` : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
