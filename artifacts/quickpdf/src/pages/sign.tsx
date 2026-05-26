import { useState } from "react";
import { usePageSEO } from "@/hooks/use-seo";
import { PageTransition } from "@/components/page-transition";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PenTool, FileText, Download, Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/react";
import { Link } from "wouter";

export default function SignPdf() {
  usePageSEO({
    title: "Sign PDF Online Free – Digital Signature for PDF Documents",
    description: "Sign PDF documents online for free. Draw, type or upload your signature and place it anywhere on the PDF. Fast, secure, and legally valid.",
    canonical: "/sign",
    keywords: "sign PDF online free, digital signature PDF, e-sign PDF, electronic signature, PDF signature tool",
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
      toast({ title: "Info", description: "This is a frontend mock. Actual client-side PDF signing requires pdf-lib." });
    }, 1500);
  };

  if (!file) {
    return (
      <PageTransition className="container mx-auto p-4 md:p-8 max-w-4xl space-y-8">
        <div className="text-center space-y-2 mb-8">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
            <PenTool className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Sign PDF</h1>
          <p className="text-muted-foreground text-lg">Add your signature to a PDF document easily.</p>
        </div>
        <FileUpload onFilesSelected={handleFilesSelected} maxFiles={1} />
      </PageTransition>
    );
  }

  return (
    <PageTransition className="h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-muted/20">
      {/* Sidebar for Signature tools */}
      <div className="w-full md:w-80 border-r bg-background flex flex-col z-10 shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold">Sign Document</h2>
          <Button variant="ghost" size="icon" onClick={() => setFile(null)} className="h-8 w-8 text-muted-foreground">
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="p-4 flex-1 space-y-6 overflow-y-auto">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Create Signature</h3>
            <Card className="p-4 border-dashed border-2 cursor-pointer hover:bg-accent/50 transition-colors flex items-center justify-center h-32">
              <span className="text-sm font-medium text-primary">Click to draw signature</span>
            </Card>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Or Type</h3>
            <Card className="p-4 cursor-pointer hover:bg-accent/50 transition-colors flex items-center justify-center h-16">
              <span className="font-serif italic text-lg">John Doe</span>
            </Card>
          </div>
        </div>
        
        <div className="p-4 border-t bg-background">
          {isSignedIn ? (
            <Button size="lg" className="w-full" onClick={handleDownload} disabled={isProcessing}>
              {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
              Complete & Download
            </Button>
          ) : (
            <Button asChild size="lg" className="w-full">
              <Link href="/sign-in">Sign In to Save</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Document Preview */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center items-start bg-muted/30">
        <Card className="w-full max-w-3xl aspect-[1/1.4] bg-white shadow-lg flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <FileText className="w-16 h-16 text-purple-500/20 mx-auto" />
            <p className="text-muted-foreground font-medium">Document Preview</p>
            <p className="text-sm font-mono truncate max-w-[200px] mx-auto text-muted-foreground">{file.name}</p>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
