import { Link } from "wouter";
import { Show, useUser, useClerk } from "@clerk/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, User, Settings, LogOut, ChevronDown, Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { AshokChakra } from "@/components/ashok-chakra";
import { useLanguage } from "@/hooks/use-language";

const LOGO_GROUPS: { letters: string[]; color: string }[] = [
  { letters: ["Q", "u", "i"], color: "#FF9933" },
  { letters: ["c", "k"],      color: "var(--logo-middle-color)" },
  { letters: ["P", "D", "F"], color: "#138808" },
];

export function Navbar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { language, setLanguage, t } = useLanguage();
  const [isDark, setIsDark] = useState(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const newDark = !isDark;
    root.classList.toggle("dark", newDark);
    root.classList.toggle("light", !newDark);
    localStorage.setItem("vite-ui-theme", newDark ? "dark" : "light");
    setIsDark(newDark);
  };

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b header-gradient-animate backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* ── Left: logo + nav ── */}
        <div className="flex items-center gap-4 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-2 font-extrabold text-xl tracking-tight flex-shrink-0"
            aria-label="QuickPDF Home"
          >
            <AshokChakra size={28} />
            <span aria-label="QuickPDF" className="inline-flex">
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
          </Link>

          <nav className="hidden md:flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground outline-none transition-colors">
                {t("tools")} <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild><Link href="/merge" className="cursor-pointer w-full">{t("mergeTitle")}</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/split" className="cursor-pointer w-full">{t("splitTitle")}</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/edit" className="cursor-pointer w-full">{t("editTitle")}</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/sign" className="cursor-pointer w-full">{t("signTitle")}</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/protect" className="cursor-pointer w-full">{t("protectTitle")}</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/unlock" className="cursor-pointer w-full">{t("unlockTitle")}</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        {/* ── Right: theme toggle + language + auth ── */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            data-testid="btn-toggle-theme"
          >
            {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="flex items-center gap-1.5 font-semibold text-xs px-2.5 h-8 border border-border/40 hover:bg-accent rounded-md"
            aria-label="Toggle language"
            data-testid="btn-toggle-language"
          >
            <Languages className="w-4 h-4 text-muted-foreground" />
            <span>{language === "en" ? "हिन्दी" : "EN"}</span>
          </Button>

          <Show when="signed-out">
            <Button size="sm" asChild>
              <Link href="/sign-in" data-testid="link-sign-in">
                {t("signInSignUp")}
              </Link>
            </Button>
          </Show>

          <Show when="signed-in">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full border border-border overflow-hidden p-0"
                  data-testid="btn-user-menu"
                >
                  {user?.imageUrl ? (
                    <img src={user.imageUrl} alt={user.fullName || "User"} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  {user?.fullName && <p className="font-medium text-sm">{user.fullName}</p>}
                  {user?.primaryEmailAddress && (
                    <p className="w-[200px] truncate text-xs text-muted-foreground">
                      {user.primaryEmailAddress.emailAddress}
                    </p>
                  )}
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer w-full flex items-center" data-testid="link-dashboard">
                    <Settings className="mr-2 h-4 w-4" />
                    {t("dashboard")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:bg-destructive/10"
                  onClick={() => signOut()}
                  data-testid="btn-sign-out"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Show>
        </div>

      </div>
    </header>
  );
}
