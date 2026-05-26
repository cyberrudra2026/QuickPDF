import { useState } from "react";
import { usePageSEO } from "@/hooks/use-seo";
import { PageTransition } from "@/components/page-transition";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit3, FileText, Download, Loader2, X, MousePointer2, Type, Square } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/react";
import { Link } from "wouter";

// Note: Full canvas/fabric.js implementation is complex for a mock, 
// using a placeholder UI for the edit tools that would normally interact with PDF.js

export default function EditPdf() {
  usePageSEO({
    title: "Edit PDF Online Free – Add Text & Annotations to PDF",
    description: "Edit PDF files online for free with QuickPDF. Add text, shapes, highlights and annotations to any PDF document. No installation required.",
    canonical: "/edit",
    keywords: "edit PDF online free, add text to PDF, annotate PDF, PDF editor online, write on PDF",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { isSignedIn } = useUser();

  const handleFilesSelected = (newFiles: File[]) => {
    if (newFiles.length > 0) setFile(newFiles[0]);
  };

  const handleDownload = () => {
    setIsProcessing(true);
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      toast({ title: "Info", description: "This is a frontend mock. Actual client-side PDF editing requires pdf-lib and canvas integration." });
    }, 1500);
  };

  if (!file) {
    return (
      <PageTransition className="container mx-auto p-4 md:p-8 max-w-4xl space-y-8">
        <div className="text-center space-y-2 mb-8">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
            <Edit3 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Edit PDF</h1>
          <p className="text-muted-foreground text-lg">Add text, highlight, and draw shapes on your PDF.</p>
        </div>
        <FileUpload onFilesSelected={handleFilesSelected} maxFiles={1} />
      </PageTransition>
    );
  }

  return (
    <PageTransition className="h-[calc(100vh-4rem)] flex flex-col bg-muted/20">
      {/* Editor Toolbar */}
      <div className="h-16 border-b bg-background flex items-center justify-between px-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <Button variant="ghost" size="icon" onClick={() => setFile(null)} className="text-muted-foreground">
            <X className="w-5 h-5" />
          </Button>
          <span className="font-medium text-sm truncate max-w-[200px]">{file.name}</span>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <Button variant="outline" size="icon"><MousePointer2 className="w-4 h-4" /></Button>
          <Button variant="outline" size="icon"><Type className="w-4 h-4" /></Button>
          <Button variant="outline" size="icon"><Square className="w-4 h-4" /></Button>
          <div className="w-px h-6 bg-border mx-2"></div>
          {isSignedIn ? (
            <Button onClick={handleDownload} disabled={isProcessing}>
              {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
              Save & Download
            </Button>
          ) : (
            <Button asChild>
              <Link href="/sign-in">Sign In to Save</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Editor Canvas Area */}
      <div className="flex-1 overflow-auto p-8 flex justify-center items-start">
        <Card className="w-full max-w-3xl aspect-[1/1.4] bg-white shadow-xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          <div className="text-center space-y-4">
            <FileText className="w-20 h-20 text-amber-500/20 mx-auto" />
            <p className="text-muted-foreground font-medium">PDF Canvas Editor Area</p>
            <p className="text-xs text-muted-foreground/70 max-w-sm mx-auto">
              In a full implementation, PDF.js would render the pages here and a canvas overlay (like Fabric.js) would handle drawings.
            </p>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
