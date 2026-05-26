import { useState } from "react";
import { usePageSEO } from "@/hooks/use-seo";
import { PageTransition } from "@/components/page-transition";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Scissors, FileText, Download, Loader2, X, LogIn } from "lucide-react";
import { useSplitPdf } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/react";
import { useGuestUsage } from "@/lib/useGuestUsage";
import { Link } from "wouter";

export default function SplitPdf() {
  usePageSEO({
    title: "Split PDF Files Online Free – Extract Pages from PDF",
    description: "Split a PDF into multiple files or extract specific pages with QuickPDF. Fast, free, and secure. No software installation needed.",
    canonical: "/split",
    keywords: "split PDF online free, extract pages from PDF, divide PDF, PDF splitter, remove pages from PDF",
  });
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<"range" | "pages">("range");
  const [rangeInput, setRangeInput] = useState("");
  const [pagesInput, setPagesInput] = useState("");
  const splitMutation = useSplitPdf();
  const { toast } = useToast();
  const { isSignedIn } = useUser();
  const { hasGuestUsesLeft, remainingUses, consumeGuestUse, maxUses } = useGuestUsage();

  const canProcess = isSignedIn || hasGuestUsesLeft;

  const handleFilesSelected = (newFiles: File[]) => {
    if (newFiles.length > 0) setFile(newFiles[0]);
  };

  const handleSplit = () => {
    if (!file) return;

    if (mode === "range" && !rangeInput) {
      toast({ title: "Input required", description: "Please enter page ranges.", variant: "destructive" });
      return;
    }
    if (mode === "pages" && !pagesInput) {
      toast({ title: "Input required", description: "Please enter page numbers.", variant: "destructive" });
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

    const formData = new FormData();
    formData.append('file', file);
    formData.append('mode', mode);
    if (mode === "range") formData.append('pageRanges', rangeInput);
    if (mode === "pages") formData.append('pages', pagesInput);

    splitMutation.mutate({ data: formData as any }, {
      onSuccess: (blob) => {
        const url = URL.createObjectURL(blob as unknown as Blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'split_documents.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast({ title: "Split successfully!", description: "Your split PDFs have been downloaded." });
      },
      onError: (err) => {
        toast({ title: "Split failed", description: err.message, variant: "destructive" });
      }
    });
  };

  return (
    <PageTransition className="container mx-auto p-4 md:p-8 max-w-4xl space-y-8">
      <div className="text-center space-y-2 mb-8">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
          <Scissors className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Split PDF</h1>
        <p className="text-muted-foreground text-lg">Extract pages or split a PDF into multiple files.</p>
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
                  <Link href="/sign-up" data-testid="btn-signup-limit-split"><LogIn className="mr-1.5 w-3.5 h-3.5" />Sign Up Free</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              </div>
            </>
          )}
        </Card>
      )}

      <div className="grid md:grid-cols-[1fr_350px] gap-8">
        <div className="space-y-4">
          {!file ? (
            <FileUpload onFilesSelected={handleFilesSelected} maxFiles={1} className="min-h-[300px]" />
          ) : (
            <Card className="p-6 flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed bg-card/50 relative">
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-destructive" onClick={() => setFile(null)}>
                <X className="w-5 h-5" />
              </Button>
              <FileText className="w-16 h-16 text-emerald-500 mb-4" />
              <p className="text-lg font-medium truncate max-w-xs">{file.name}</p>
              <p className="text-sm text-muted-foreground mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </Card>
          )}
        </div>

        <div>
          <Card className="p-6 sticky top-24">
            <h3 className="text-lg font-semibold mb-4">Split Options</h3>
            <RadioGroup value={mode} onValueChange={(v) => setMode(v as any)} className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="range" id="range" />
                  <Label htmlFor="range" className="font-medium">Split by Range</Label>
                </div>
                {mode === "range" && (
                  <div className="pl-6 space-y-2">
                    <p className="text-xs text-muted-foreground">Split the PDF into multiple files based on page ranges.</p>
                    <Input placeholder="e.g. 1-3, 5, 7-9" value={rangeInput} onChange={(e) => setRangeInput(e.target.value)} />
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pages" id="pages" />
                  <Label htmlFor="pages" className="font-medium">Extract Pages</Label>
                </div>
                {mode === "pages" && (
                  <div className="pl-6 space-y-2">
                    <p className="text-xs text-muted-foreground">Extract specific pages into a single new PDF.</p>
                    <Input placeholder="e.g. 1, 3, 5" value={pagesInput} onChange={(e) => setPagesInput(e.target.value)} />
                  </div>
                )}
              </div>
            </RadioGroup>

            <div className="mt-8">
              <Button
                size="lg"
                className="w-full"
                onClick={handleSplit}
                disabled={!file || splitMutation.isPending || !canProcess}
                data-testid="btn-split"
              >
                {splitMutation.isPending ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Splitting...</>
                ) : (
                  <><Download className="mr-2 h-4 w-4" /> Split PDF</>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
