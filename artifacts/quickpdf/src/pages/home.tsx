import { Link } from "wouter";
import { motion } from "framer-motion";
import { usePageSEO } from "@/hooks/use-seo";
import { PageTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Layers, Scissors, Edit3, PenTool, Shield, Unlock,
  ArrowRight, Zap, Lock, Smartphone, Users, FileText, Star
} from "lucide-react";
import { AdBanner } from "@/components/ad-banner";
import { useLanguage } from "@/hooks/use-language";

const tools = [
  {
    title: "Merge PDF",
    description: "Combine multiple PDFs into one polished document in seconds.",
    icon: Layers,
    href: "/merge",
    accent: "#3b82f6",
    lightBg: "from-blue-50/90 via-blue-50/50 to-blue-50/10 dark:from-blue-950/30 dark:via-blue-950/15 dark:to-blue-950/5",
    iconBg: "bg-blue-500/15 dark:bg-blue-500/20",
    iconColor: "text-blue-500",
    hoverBorder: "hover:border-blue-400/50",
    badge: "Most Popular",
  },
  {
    title: "Split PDF",
    description: "Extract specific pages or divide a PDF into multiple files.",
    icon: Scissors,
    href: "/split",
    accent: "#10b981",
    lightBg: "from-emerald-50/90 via-emerald-50/50 to-emerald-50/10 dark:from-emerald-950/30 dark:via-emerald-950/15 dark:to-emerald-950/5",
    iconBg: "bg-emerald-500/15 dark:bg-emerald-500/20",
    iconColor: "text-emerald-500",
    hoverBorder: "hover:border-emerald-400/50",
    badge: null,
  },
  {
    title: "Edit PDF",
    description: "Add text, shapes, highlights and annotations to any PDF.",
    icon: Edit3,
    href: "/edit",
    accent: "#f59e0b",
    lightBg: "from-amber-50/90 via-amber-50/50 to-amber-50/10 dark:from-amber-950/30 dark:via-amber-950/15 dark:to-amber-950/5",
    iconBg: "bg-amber-500/15 dark:bg-amber-500/20",
    iconColor: "text-amber-500",
    hoverBorder: "hover:border-amber-400/50",
    badge: null,
  },
  {
    title: "Sign PDF",
    description: "Sign documents digitally — draw, type, or upload your signature.",
    icon: PenTool,
    href: "/sign",
    accent: "#8b5cf6",
    lightBg: "from-purple-50/90 via-purple-50/50 to-purple-50/10 dark:from-purple-950/30 dark:via-purple-950/15 dark:to-purple-950/5",
    iconBg: "bg-purple-500/15 dark:bg-purple-500/20",
    iconColor: "text-purple-500",
    hoverBorder: "hover:border-purple-400/50",
    badge: null,
  },
  {
    title: "Protect PDF",
    description: "Encrypt with a password and control printing, copying & editing.",
    icon: Shield,
    href: "/protect",
    accent: "#f43f5e",
    lightBg: "from-rose-50/90 via-rose-50/50 to-rose-50/10 dark:from-rose-950/30 dark:via-rose-950/15 dark:to-rose-950/5",
    iconBg: "bg-rose-500/15 dark:bg-rose-500/20",
    iconColor: "text-rose-500",
    hoverBorder: "hover:border-rose-400/50",
    badge: null,
  },
  {
    title: "Unlock PDF",
    description: "Remove password restrictions from protected PDF files instantly.",
    icon: Unlock,
    href: "/unlock",
    accent: "#06b6d4",
    lightBg: "from-cyan-50/90 via-cyan-50/50 to-cyan-50/10 dark:from-cyan-950/30 dark:via-cyan-950/15 dark:to-cyan-950/5",
    iconBg: "bg-cyan-500/15 dark:bg-cyan-500/20",
    iconColor: "text-cyan-500",
    hoverBorder: "hover:border-cyan-400/50",
    badge: null,
  },
];

const stats = [
  { icon: FileText, value: "10M+", labelKey: "processedLabel" as const },
  { icon: Users,    value: "500K+", labelKey: "usersLabel" as const },
  { icon: Star,     value: "4.9 ★", labelKey: "ratingLabel" as const },
];

const features = [
  { icon: Zap,        titleKey: "speedTitle" as const,     descKey: "speedDesc" as const },
  { icon: Lock,       titleKey: "securityTitle" as const,  descKey: "securityDesc" as const },
  { icon: Smartphone, titleKey: "everywhereTitle" as const,  descKey: "everywhereDesc" as const },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } } };

export default function Home() {
  const { t, language } = useLanguage();

  usePageSEO({
    title: language === "hi" 
      ? "मुफ्त ऑनलाइन PDF टूल्स – मर्ज, स्प्लिट, एडिट, साइन और प्रोटेक्ट"
      : "Free Online PDF Tools – Merge, Split, Edit, Sign & Protect",
    description: language === "hi"
      ? "QuickPDF एक तेज और सुरक्षित ऑनलाइन PDF टूलकिट है। बिना किसी इंस्टॉलेशन या साइनअप के आसानी से PDF मर्ज, स्प्लिट, एडिट, साइन, प्रोटेक्ट करें।"
      : "QuickPDF is a free, fast & secure online PDF toolkit. Merge, split, edit, sign, protect and unlock PDFs instantly — no installation, no signup needed.",
    canonical: "/",
    keywords: "PDF tools online free, merge PDF, split PDF, edit PDF, sign PDF, protect PDF, unlock PDF, free PDF editor India",
  });

  const faqs = language === "hi" ? [
    {
      q: "क्या QuickPDF बिल्कुल मुफ्त है?",
      a: "हाँ! बिना account बनाए 2 free uses मिलती हैं। Free account बनाने पर unlimited processing मिलती है।",
    },
    {
      q: "क्या मेरे अपलोड किए गए दस्तावेज़ सुरक्षित और निजी हैं?",
      a: "बिल्कुल। सभी फाइलें हमारे सुरक्षित सर्वर पर प्रोसेस की जाती हैं और प्रोसेसिंग के तुरंत बाद अपने आप डिलीट हो जाती हैं। हम आपकी फाइल्स को कभी भी स्टोर या शेयर नहीं करते।",
    },
    {
      q: "अधिकतम फाइल साइज क्या है जो मैं अपलोड कर सकता हूँ?",
      a: "आप प्रति फाइल 50 MB तक की PDF फाइलें अपलोड कर सकते हैं। मर्ज करने के लिए आप एक बार में कई फाइलें अपलोड कर सकते हैं।",
    },
    {
      q: "क्या मुझे कोई सॉफ्टवेयर इंस्टॉल करने की आवश्यकता है?",
      a: "नहीं, किसी सॉफ्टवेयर की आवश्यकता नहीं है। QuickPDF 100% वेब-आधारित है और किसी भी डिवाइस — डेस्कटॉप, टैबलेट या मोबाइल पर काम करता है।",
    },
    {
      q: "क्या मैं अपने स्मार्टफोन पर QuickPDF का उपयोग कर सकता हूँ?",
      a: "हाँ, QuickPDF पूरी तरह से उत्तरदायी (responsive) है और सभी आधुनिक स्मार्टफोन और टैबलेट पर सुचारू रूप से काम करता है।",
    },
    {
      q: "मैं पासवर्ड से सुरक्षित PDF को कैसे अनलॉक करूँ?",
      a: "अनलॉक PDF टूल पर जाएं, अपनी फाइल अपलोड करें, सही पासवर्ड डालें और तुरंत अनलॉक की गई फाइल डाउनलोड करें।",
    },
    {
      q: "अगर मैं अपना PDF पासवर्ड भूल जाऊं तो क्या होगा?",
      a: "अनलॉक टूल के लिए सही पासवर्ड की आवश्यकता होती है। यदि आप पासवर्ड भूल गए हैं, तो हम एन्क्रिप्शन को बायपास नहीं कर सकते — यह आपकी सुरक्षा के लिए है।"
    }
  ] : [
    {
      q: "Is QuickPDF completely free to use?",
      a: "Yes! You get 2 free uses without signing up. Create a free account to unlock unlimited PDF processing with no hidden charges.",
    },
    {
      q: "Are my uploaded files safe and private?",
      a: "Absolutely. All files are processed on our secure servers and automatically deleted immediately after processing. We never store or share your documents.",
    },
    {
      q: "What is the maximum file size I can upload?",
      a: "You can upload PDF files up to 50 MB per file. For merge operations, you can upload multiple files at once.",
    },
    {
      q: "Do I need to install any software?",
      a: "No installation needed. QuickPDF is 100% browser-based and works on any device — desktop, tablet, or mobile.",
    },
    {
      q: "Can I use QuickPDF on my smartphone?",
      a: "Yes, QuickPDF is fully responsive and works smoothly on all modern smartphones and tablets.",
    },
    {
      q: "How do I unlock a password-protected PDF?",
      a: "Go to the 'Unlock PDF' tool, upload your file, enter the correct password, and download the unlocked version instantly.",
    },
    {
      q: "What happens if I forget my PDF password?",
      a: "Our Unlock tool requires the correct password to decrypt the file. If you've forgotten the password, we cannot bypass the encryption — this protects your security.",
    }
  ];

  return (
    <PageTransition>
      <div className="flex flex-col items-center">

        {/* ── Hero ── */}
        <section className="relative w-full py-20 md:py-32 px-4 text-center flex flex-col items-center overflow-hidden border-b">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute -top-16 -right-24 w-80 h-80 rounded-full bg-rose-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-gradient-to-t from-background to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative max-w-3xl space-y-6"
          >
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-2">
              <Zap className="w-3.5 h-3.5" />
              {t("freeFastSecure")}
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              {t("heroTitle")}{" "}
              <span className="bg-gradient-to-r from-primary via-rose-500 to-orange-400 bg-clip-text text-transparent">
                {t("heroTitleSpan")}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground md:px-10 leading-relaxed">
              {t("heroSubtitle")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button size="lg" asChild className="h-12 px-8 text-base font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
                <Link href="/merge">{t("getStartedFree")} <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-8 text-base font-medium rounded-full">
                <Link href="/contact">{t("contactUs")}</Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats row — always single line, 3 equal columns */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative mt-14 w-full max-w-lg mx-auto grid grid-cols-3 divide-x divide-border/50"
          >
            {stats.map((s) => (
              <div key={s.labelKey} className="flex flex-col items-center gap-1 px-2 py-1">
                <s.icon className="w-4 h-4 text-primary opacity-70 mb-0.5" />
                <span className="text-xl sm:text-2xl font-extrabold text-foreground leading-tight">{s.value}</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider text-center leading-tight">{t(s.labelKey)}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Ad slot 1 */}
        <div className="w-full max-w-4xl mx-auto px-4 pt-8">
          <AdBanner slot="1234567890" format="horizontal" />
        </div>

        {/* ── Tools Grid ── */}
        <section className="w-full max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{t("toolsTitle")}</h2>
            <p className="text-muted-foreground text-lg">{t("toolsSubtitle")}</p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {tools.map((tool, i) => {
              const toolTitleKey = (tool.title === "Merge PDF" ? "mergeTitle" : tool.title === "Split PDF" ? "splitTitle" : tool.title === "Edit PDF" ? "editTitle" : tool.title === "Sign PDF" ? "signTitle" : tool.title === "Protect PDF" ? "protectTitle" : "unlockTitle") as any;
              const toolDescKey = (tool.title === "Merge PDF" ? "mergeDesc" : tool.title === "Split PDF" ? "splitDesc" : tool.title === "Edit PDF" ? "editDesc" : tool.title === "Sign PDF" ? "signDesc" : tool.title === "Protect PDF" ? "protectDesc" : "unlockDesc") as any;

              return (
                <motion.div key={i} variants={item} className="h-full">
                  <Link href={tool.href} className="block group h-full">
                    <div className={`
                      relative h-full rounded-2xl border border-border/30 overflow-hidden
                      bg-gradient-to-br ${tool.lightBg} backdrop-blur-md
                      transition-all duration-300 ease-out
                      ${tool.hoverBorder}
                      hover:shadow-2xl hover:-translate-y-2
                      hover:shadow-[0_20px_50px_-10px_${tool.accent}4d]
                    `}>
                      {/* Colored top accent bar */}
                      <div
                        className="h-1 w-full rounded-t-2xl"
                        style={{ background: `linear-gradient(90deg, ${tool.accent}, ${tool.accent}88)` }}
                      />

                      {/* Badge */}
                      {tool.badge && (
                        <span
                          className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white"
                          style={{ background: tool.accent }}
                        >
                          {t("mostPopular")}
                        </span>
                      )}

                      <div className="p-6 flex flex-col gap-5">
                        {/* Icon */}
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${tool.iconBg} ${tool.iconColor} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-sm`}>
                          <tool.icon className="w-7 h-7" />
                        </div>

                        {/* Text */}
                        <div className="flex-1 space-y-2">
                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                            {t(toolTitleKey)}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {t(toolDescKey)}
                          </p>
                        </div>

                        {/* CTA row */}
                        <div className="flex items-center justify-between pt-3 border-t border-border/50">
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {t("useFree")}
                          </span>
                          <span
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white transition-all duration-200 group-hover:scale-110"
                            style={{ background: tool.accent }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Ad slot 2 */}
        <div className="w-full max-w-4xl mx-auto px-4 pb-8">
          <AdBanner slot="0987654321" format="horizontal" />
        </div>

        {/* ── Features Section ── */}
        <section className="w-full border-t py-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{t("whyChoose")}</h2>
              <p className="text-muted-foreground text-lg">{t("whySubtitle")}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative group rounded-2xl border border-border/30 bg-card/60 backdrop-blur-md p-8 hover:border-primary/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 ease-out text-center"
                >
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                    <f.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{t(f.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t(f.descKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="w-full border-t py-20">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{t("faqTitle")}</h2>
              <p className="text-muted-foreground text-lg">{t("faqSubtitle")}</p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Accordion type="single" collapsible className="w-full space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="border border-border/30 rounded-xl px-5 bg-card/60 backdrop-blur-md hover:border-primary/40 transition-all duration-300 data-[state=open]:border-primary/40 data-[state=open]:bg-primary/5"
                  >
                    <AccordionTrigger className="text-left font-semibold text-sm sm:text-base py-4 hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="w-full py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-rose-600 p-10 md:p-14 text-center text-white shadow-2xl"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
              </div>
              <div className="relative space-y-5">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{t("ready")}</h2>
                <p className="text-white/80 text-lg max-w-xl mx-auto">
                  {t("ctaDesc")}
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <Button size="lg" variant="secondary" asChild className="h-12 px-8 font-semibold rounded-full text-primary hover:-translate-y-0.5 transition-all shadow-lg">
                    <Link href="/sign-up">{t("createAccount")}</Link>
                  </Button>
                  <Button size="lg" asChild className="h-12 px-8 font-semibold rounded-full bg-white/15 hover:bg-white/25 text-white border-white/30 border hover:-translate-y-0.5 transition-all">
                    <Link href="/merge">{t("tryGuest")}</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Ad slot 3 */}
        <div className="w-full max-w-4xl mx-auto px-4 pb-10">
          <AdBanner slot="1122334455" format="horizontal" />
        </div>

      </div>
    </PageTransition>
  );
}
