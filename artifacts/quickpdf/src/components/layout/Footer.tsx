import { useLocation } from "wouter";
import { AshokChakra } from "@/components/ashok-chakra";
import { Mail } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const LOGO_GROUPS: { letters: string[]; color: string }[] = [
  { letters: ["Q", "u", "i"], color: "#FF9933" },
  { letters: ["c", "k"],      color: "var(--logo-middle-color)" },
  { letters: ["P", "D", "F"], color: "#138808" },
];

const tools = [
  { labelKey: "mergeTitle" as const,   href: "/merge" },
  { labelKey: "splitTitle" as const,   href: "/split" },
  { labelKey: "editTitle" as const,    href: "/edit" },
  { labelKey: "signTitle" as const,    href: "/sign" },
  { labelKey: "protectTitle" as const, href: "/protect" },
  { labelKey: "unlockTitle" as const,  href: "/unlock" },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [, navigate] = useLocation();
  return (
    <a
      href={href}
      onClick={(e) => { e.preventDefault(); navigate(href); }}
      className="text-sm text-foreground/80 hover:text-primary transition-colors cursor-pointer"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  const quickLinks = [
    { label: t("getStarted"),       href: "/" },
    { label: t("createAccount"),    href: "/sign-up" },
    { label: t("dashboard"),        href: "/dashboard" },
    { label: t("contactUs"),        href: "/contact" },
    { label: t("footerPrivacy") ? "Privacy Policy" : "Privacy Policy", href: "/privacy-policy" }, // Let's keep Privacy Policy as is or localize if needed
  ];

  return (
    <footer className="w-full border-t bg-muted/30 mt-auto">
      <div className="w-full max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <FooterLink href="/">
              <div className="flex items-center gap-2">
                <AshokChakra size={24} />
                <span className="font-extrabold text-lg inline-flex">
                  {LOGO_GROUPS.map((group, gi) =>
                    group.letters.map((letter, li) => {
                      const globalIndex =
                        LOGO_GROUPS.slice(0, gi).reduce((s, g) => s + g.letters.length, 0) + li;
                      return (
                        <span
                          key={`${gi}-${li}`}
                          className="logo-wave-letter"
                          style={{ color: group.color, animationDelay: `${globalIndex * 0.1}s` }}
                        >
                          {letter}
                        </span>
                      );
                    })
                  )}
                </span>
              </div>
            </FooterLink>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t("footerDesc")}
            </p>

            <p className="text-xs text-muted-foreground">
              {t("footerPrivacy")}
            </p>

            {/* Author */}
            <div className="pt-1 space-y-1 border-t border-border/40 pt-3">
              <p className="text-xs font-semibold text-foreground/70">{t("createdBy")}</p>
              <a
                href="mailto:mail.technologytoday@gmail.com"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                <Mail className="w-3 h-3" />
                mail.technologytoday@gmail.com
              </a>
            </div>
          </div>

          {/* PDF Tools */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">{t("tools")}</h3>
            <ul className="space-y-2">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <FooterLink href={tool.href}>{t(tool.labelKey)}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">QuickPDF</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
            <div className="pt-2 space-y-1">
              <p className="text-xs text-muted-foreground">{t("maxSize")}</p>
              <p className="text-xs text-muted-foreground">{t("supportsAll")}</p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>&copy; {year} QuickPDF by <span className="font-semibold text-foreground/70">Cyber Rudra</span>. All rights reserved.</p>
          <p className="text-center">{t("footerText")}</p>
        </div>
      </div>
    </footer>
  );
}
