import { useState } from "react";
import { usePageSEO } from "@/hooks/use-seo";
import { PageTransition } from "@/components/page-transition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { AdBanner } from "@/components/ad-banner";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  usePageSEO({
    title: "Contact Us – QuickPDF by Cyber Rudra",
    description: "Get in touch with QuickPDF. Contact Cyber Rudra for support, feedback or partnership inquiries. Email: mail.technologytoday@gmail.com | Phone: +91 96966 76902",
    canonical: "/contact",
    keywords: "contact QuickPDF, Cyber Rudra contact, PDF tool support",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({ title: "Required fields missing", description: "Please fill in name, email and message.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    const mailtoSubject = encodeURIComponent(subject || "QuickPDF Contact Form");
    window.location.href = `mailto:mail.technologytoday@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setName(""); setEmail(""); setSubject(""); setMessage("");
    }, 800);
  };

  return (
    <PageTransition className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-12 space-y-3">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
          <MessageSquare className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Contact Us</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Have a question, suggestion, or issue? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_380px] gap-10">

        {/* Contact Form */}
        <Card className="p-6 md:p-8 border border-border/60">
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full py-12 space-y-4 text-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-500" />
              <h2 className="text-2xl font-bold">Message Sent!</h2>
              <p className="text-muted-foreground max-w-xs">
                Your email client should have opened. We'll get back to you as soon as possible.
              </p>
              <Button variant="outline" onClick={() => setSent(false)}>Send Another</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-xl font-semibold mb-2">Send a Message</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Your Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="name"
                    placeholder="Rahul Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="e.g. Issue with Merge PDF"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
                <Textarea
                  id="message"
                  placeholder="Describe your question or issue in detail..."
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  "Opening email client..."
                ) : (
                  <><Send className="mr-2 w-4 h-4" /> Send Message</>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                This will open your email client with your message pre-filled.
              </p>
            </form>
          )}
        </Card>

        {/* Contact Info sidebar */}
        <div className="space-y-6">
          <Card className="p-6 border border-border/60 space-y-5">
            <h2 className="text-lg font-semibold">Get in Touch</h2>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <a
                  href="mailto:mail.technologytoday@gmail.com"
                  className="text-sm text-primary hover:underline break-all"
                >
                  mail.technologytoday@gmail.com
                </a>
                <p className="text-xs text-muted-foreground mt-1">We reply within 24–48 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Phone / WhatsApp</p>
                <a
                  href="tel:+919696676902"
                  className="text-sm text-primary hover:underline"
                >
                  +91 96966 76902
                </a>
                <p className="text-xs text-muted-foreground mt-1">Mon–Sat, 10 AM – 6 PM IST</p>
              </div>
            </div>

            <div className="pt-2 border-t border-border/40">
              <p className="text-xs font-semibold text-foreground/70 mb-1">Owner</p>
              <p className="text-sm font-bold">Cyber Rudra</p>
              <p className="text-xs text-muted-foreground">Creator & Developer of QuickPDF</p>
            </div>
          </Card>

          <Card className="p-6 border border-border/60 bg-primary/5 space-y-3">
            <h3 className="text-sm font-semibold">Common Questions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Is QuickPDF free to use?</li>
              <li>• How long are my files stored?</li>
              <li>• Can I use it on mobile?</li>
              <li>• How do I report a bug?</li>
            </ul>
            <p className="text-xs text-muted-foreground">
              Feel free to ask any of these via email — we're happy to help!
            </p>
          </Card>

          <AdBanner slot="4455667788" format="rectangle" />
        </div>
      </div>

      <div className="mt-10">
        <AdBanner slot="5566778899" format="horizontal" />
      </div>
    </PageTransition>
  );
}
