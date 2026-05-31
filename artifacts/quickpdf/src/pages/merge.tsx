import { useState } from "react";
import { usePageSEO } from "@/hooks/use-seo";
import { PageTransition } from "@/components/page-transition";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Layers, X, GripVertical, FileText, Download, Loader2, LogIn } from "lucide-react";
import { useMergePdf } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/react";
import { useGuestUsage } from "@/lib/useGuestUsage";
import { Link } from "wouter";

export default function MergePdf() {
  usePageSEO({
    title: "Merge PDF Files Online Free – Combine PDFs in Seconds",
    description: "Combine multiple PDF files into one with QuickPDF's free online PDF merger. Drag, reorder, and merge PDFs instantly. No signup required.",
    canonical: "/merge",
    keywords: "merge PDF online free, combine PDF files, PDF merger, join PDF, merge multiple PDFs",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const mergeMutation = useMergePdf();
  const { toast } = useToast();
  const { isSignedIn } = useUser();
  const { hasGuestUsesLeft, remainingUses, consumeGuestUse, maxUses } = useGuestUsage();

  const canProcess = isSignedIn || hasGuestUsesLeft;

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles].slice(0, 20));
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const newFiles = [...files];
    const draggedItem = newFiles[draggedIndex];
    newFiles.splice(draggedIndex, 1);
    newFiles.splice(index, 0, draggedItem);
    setDraggedIndex(index);
    setFiles(newFiles);
  };

  const handleDragEnd = () => setDraggedIndex(null);

  const handleMerge = () => {
    if (files.length < 2) {
      toast({ title: "Need more files", description: "Please add at least 2 files to merge.", variant: "destructive" });
      return;
    }

    if (!isSignedIn) {
      const allowed = consumeGuestUse();
      if (!allowed) {
        toast({
          title: "Free limit reached",
          description: "You've used your 2 free tries. Sign in for unlimited access.",
          variant: "destructive",
        });
        return;
      }
    }

    mergeMutation.mutate({ data: { files, outputName: 'merged_document.pdf' } }, {
      onSuccess: (blob) => {
        const url = URL.createObjectURL(blob as unknown as Blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'merged_document.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast({ title: "Merged successfully!", description: "Your merged PDF has been downloaded." });
      },
      onError: (err) => {
        toast({ title: "Merge failed", description: err.message, variant: "destructive" });
      }
    });
  };

  return (
    <PageTransition className="container mx-auto p-4 md:p-8 max-w-4xl space-y-8">
      <div className="text-center space-y-2 mb-8">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
          <Layers className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Merge PDF</h1>
        <p className="text-muted-foreground text-lg">Combine multiple PDFs into a single document in the order you want.</p>
      </div>

      {!isSignedIn && (
        <Card className={`p-4 text-center border ${hasGuestUsesLeft ? 'bg-amber-500/5 border-amber-500/20' : 'bg-destructive/5 border-destructive/20'}`}>
          {hasGuestUsesLeft ? (
            <>
              <p className="text-sm font-medium">
                You have <strong>{remainingUses}</strong> of {maxUses} free uses remaining.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <Link href="/sign-up" className="text-primary hover:underline font-medium">Create a free account</Link> for unlimited access and file history.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-destructive">You've used all {maxUses} free tries.</p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <Button asChild size="sm">
                  <Link href="/sign-up" data-testid="btn-signup-limit-merge"><LogIn className="mr-1.5 w-3.5 h-3.5" />Sign Up Free</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              </div>
            </>
          )}
        </Card>
      )}

      <div className="grid gap-8">
        <FileUpload
          onFilesSelected={handleFilesSelected}
          maxFiles={20}
          className="min-h-[200px]"
        />

        {files.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              Selected Files ({files.length})
              <span className="text-xs font-normal text-muted-foreground">Drag to reorder</span>
            </h3>
            <div className="grid gap-2">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`flex items-center gap-3 p-3 rounded-lg border bg-card cursor-move transition-colors ${draggedIndex === index ? 'opacity-50 border-primary' : 'hover:border-primary/50'}`}
                >
                  <GripVertical className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <FileText className="w-8 h-8 text-blue-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive flex-shrink-0"
                    onClick={() => removeFile(index)}
                    data-testid={`btn-remove-file-${index}`}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <Button
                size="lg"
                onClick={handleMerge}
                disabled={files.length < 2 || mergeMutation.isPending || !canProcess}
                className="w-full sm:w-auto"
                data-testid="btn-merge"
              >
                {mergeMutation.isPending ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Merging...</>
                ) : (
                  <><Download className="mr-2 h-4 w-4" /> Merge PDF</>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
