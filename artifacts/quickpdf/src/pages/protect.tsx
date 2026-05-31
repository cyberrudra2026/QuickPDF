import { useState } from "react";
import { usePageSEO } from "@/hooks/use-seo";
import { PageTransition } from "@/components/page-transition";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, FileText, Download, Loader2, X, Eye, EyeOff, LogIn } from "lucide-react";
import { useProtectPdf } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/react";
import { useGuestUsage } from "@/lib/useGuestUsage";
import { Link } from "wouter";

export default function ProtectPdf() {
  usePageSEO({
    title: "Password Protect PDF Online Free – Encrypt PDF Files",
    description: "Add a password to your PDF and restrict printing, copying and editing. Free online PDF protection tool by QuickPDF. No installation needed.",
    canonical: "/protect",
    keywords: "protect PDF with password, encrypt PDF online, password protect PDF free, secure PDF, lock PDF",
  });
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [permissions, setPermissions] = useState({ printing: true, copying: true, editing: true });

  const protectMutation = useProtectPdf();
  const { toast } = useToast();
  const { isSignedIn } = useUser();
  const { hasGuestUsesLeft, remainingUses, consumeGuestUse, maxUses } = useGuestUsage();

  const canProcess = isSignedIn || hasGuestUsesLeft;

  const handleFilesSelected = (newFiles: File[]) => {
    if (newFiles.length > 0) setFile(newFiles[0]);
  };

  const handleProtect = () => {
    if (!file) return;
    if (!password) {
      toast({ title: "Password required", description: "Please enter a password to protect the PDF.", variant: "destructive" });
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

    const data = {
      file,
      password,
      allowPrinting: permissions.printing,
      allowCopying: permissions.copying,
      allowEditing: permissions.editing,
    };

    protectMutation.mutate({ data }, {
      onSuccess: (blob) => {
        const url = URL.createObjectURL(blob as unknown as Blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `protected_${file.name}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast({ title: "Protected successfully!", description: "Your protected PDF has been downloaded." });
      },
      onError: (err) => {
        toast({ title: "Protection failed", description: err.message, variant: "destructive" });
      }
    });
  };

  return (
    <PageTransition className="container mx-auto p-4 md:p-8 max-w-4xl space-y-8">
      <div className="text-center space-y-2 mb-8">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Protect PDF</h1>
        <p className="text-muted-foreground text-lg">Encrypt your PDF with a password to prevent unauthorized access.</p>
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
                  <Link href="/sign-up" data-testid="btn-signup-limit-protect"><LogIn className="mr-1.5 w-3.5 h-3.5" />Sign Up Free</Link>
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
              <FileText className="w-16 h-16 text-rose-500 mb-4" />
              <p className="text-lg font-medium truncate max-w-xs">{file.name}</p>
              <p className="text-sm text-muted-foreground mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </Card>
          )}
        </div>

        <div>
          <Card className="p-6 sticky top-24 space-y-6">
            <div className="space-y-3">
              <Label htmlFor="password">Set Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full w-10 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <Label>Permissions (optional)</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="printing" checked={permissions.printing} onCheckedChange={(c) => setPermissions({...permissions, printing: !!c})} />
                <Label htmlFor="printing" className="font-normal cursor-pointer">Allow Printing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="copying" checked={permissions.copying} onCheckedChange={(c) => setPermissions({...permissions, copying: !!c})} />
                <Label htmlFor="copying" className="font-normal cursor-pointer">Allow Copying text</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="editing" checked={permissions.editing} onCheckedChange={(c) => setPermissions({...permissions, editing: !!c})} />
                <Label htmlFor="editing" className="font-normal cursor-pointer">Allow Editing</Label>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button
                size="lg"
                className="w-full"
                onClick={handleProtect}
                disabled={!file || !password || protectMutation.isPending || !canProcess}
                data-testid="btn-protect"
              >
                {protectMutation.isPending ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Protecting...</>
                ) : (
                  <><Download className="mr-2 h-4 w-4" /> Protect PDF</>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
