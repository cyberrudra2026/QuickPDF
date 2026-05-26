import { useState } from "react";
import { usePageSEO } from "@/hooks/use-seo";
import { PageTransition } from "@/components/page-transition";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Unlock, FileText, Download, Loader2, X, Eye, EyeOff, LogIn } from "lucide-react";
import { useUnlockPdf } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/react";
import { useGuestUsage } from "@/lib/useGuestUsage";
import { Link } from "wouter";

export default function UnlockPdf() {
  usePageSEO({
    title: "Unlock PDF Online Free – Remove Password from PDF",
    description: "Remove password protection from PDF files instantly with QuickPDF. Free online PDF unlock tool. Enter the password and download the unlocked file.",
    canonical: "/unlock",
    keywords: "unlock PDF online free, remove password from PDF, decrypt PDF, PDF password remover, unprotect PDF",
  });
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const unlockMutation = useUnlockPdf();
  const { toast } = useToast();
  const { isSignedIn } = useUser();
  const { hasGuestUsesLeft, remainingUses, consumeGuestUse, maxUses } = useGuestUsage();

  const canProcess = isSignedIn || hasGuestUsesLeft;

  const handleFilesSelected = (newFiles: File[]) => {
    if (newFiles.length > 0) setFile(newFiles[0]);
  };

  const handleUnlock = () => {
    if (!file) return;
    if (!password) {
      toast({ title: "Password required", description: "Please enter the password to unlock the PDF.", variant: "destructive" });
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
    formData.append('password', password);

    unlockMutation.mutate({ data: formData as any }, {
      onSuccess: (blob) => {
        const url = URL.createObjectURL(blob as unknown as Blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `unlocked_${file.name}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast({ title: "Unlocked successfully!", description: "Your unlocked PDF has been downloaded." });
      },
      onError: () => {
        toast({ title: "Unlock failed", description: "Incorrect password or unsupported file format.", variant: "destructive" });
      }
    });
  };

  return (
    <PageTransition className="container mx-auto p-4 md:p-8 max-w-4xl space-y-8">
      <div className="text-center space-y-2 mb-8">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-4">
          <Unlock className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Unlock PDF</h1>
        <p className="text-muted-foreground text-lg">Remove password security from your PDF file.</p>
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
                  <Link href="/sign-up" data-testid="btn-signup-limit-unlock"><LogIn className="mr-1.5 w-3.5 h-3.5" />Sign Up Free</Link>
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
              <FileText className="w-16 h-16 text-cyan-500 mb-4" />
              <p className="text-lg font-medium truncate max-w-xs">{file.name}</p>
              <p className="text-sm text-muted-foreground mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </Card>
          )}
        </div>

        <div>
          <Card className="p-6 sticky top-24 space-y-6">
            <div className="space-y-3">
              <Label htmlFor="unlock-password">Document Password</Label>
              <div className="relative">
                <Input
                  id="unlock-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full w-10 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">You must know the password to remove it.</p>
            </div>

            <div className="pt-4 border-t">
              <Button
                size="lg"
                className="w-full"
                onClick={handleUnlock}
                disabled={!file || !password || unlockMutation.isPending || !canProcess}
                data-testid="btn-unlock"
              >
                {unlockMutation.isPending ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Unlocking...</>
                ) : (
                  <><Download className="mr-2 h-4 w-4" /> Unlock PDF</>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
