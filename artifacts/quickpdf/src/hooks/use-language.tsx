import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi";

export const translations = {
  en: {
    // Navbar
    tools: "Tools",
    signInSignUp: "Login",
    dashboard: "Dashboard",
    signOut: "Sign Out",
    // Hero
    heroTitle: "Every PDF tool you need,",
    heroTitleSpan: "in one place.",
    heroSubtitle: "Merge, split, edit, sign, protect and unlock PDFs — instantly, without installing anything.",
    getStartedFree: "Get Started Free",
    contactUs: "Contact Us",
    freeFastSecure: "Free · Fast · Secure",
    // Stats
    processedLabel: "PDFs Processed",
    usersLabel: "Happy Users",
    ratingLabel: "User Rating",
    // Tools Section
    toolsTitle: "Powerful PDF Tools",
    toolsSubtitle: "Pick a tool and start working — no sign-up required for 2 free uses.",
    mergeTitle: "Merge PDF",
    mergeDesc: "Combine multiple PDFs into one polished document in seconds.",
    splitTitle: "Split PDF",
    splitDesc: "Extract specific pages or divide a PDF into multiple files.",
    editTitle: "Edit PDF",
    editDesc: "Add text, shapes, highlights and annotations to any PDF.",
    signTitle: "Sign PDF",
    signDesc: "Sign documents digitally — draw, type, or upload your signature.",
    protectTitle: "Protect PDF",
    protectDesc: "Encrypt with a password and control printing, copying & editing.",
    unlockTitle: "Unlock PDF",
    unlockDesc: "Remove password restrictions from protected PDF files instantly.",
    useFree: "Use Free",
    mostPopular: "Most Popular",
    // Features Section
    whyChoose: "Why Choose QuickPDF?",
    whySubtitle: "Built for speed, privacy, and simplicity.",
    speedTitle: "Lightning Fast",
    speedDesc: "Files processed in seconds — no waiting, no software to install.",
    securityTitle: "Secure & Private",
    securityDesc: "Files are deleted immediately after processing. Your data stays yours.",
    everywhereTitle: "Works Everywhere",
    everywhereDesc: "Desktop, tablet, or mobile — QuickPDF works seamlessly on all devices.",
    // FAQ Section
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Everything you need to know.",
    // CTA Section
    ready: "Ready to get started?",
    ctaDesc: "Create a free account to unlock unlimited PDF processing and save your file history.",
    createAccount: "Create Free Account",
    tryGuest: "Try Without Signing Up",
    // Footer
    footerDesc: "Fast, free, and secure online PDF tools. No installation required. Process your documents in seconds.",
    footerPrivacy: "Files are automatically deleted after processing. Your privacy is protected.",
    createdBy: "Created by Cyber Rudra",
    footerText: "Made with care for everyone who works with PDFs daily.",
    maxSize: "Max file size: 50 MB per file",
    supportsAll: "Supports all standard PDF versions"
  },
  hi: {
    // Navbar
    tools: "टूल्स",
    signInSignUp: "लॉगिन",
    dashboard: "डैशबोर्ड",
    signOut: "साइन आउट",
    // Hero
    heroTitle: "हर PDF टूल जिसकी आपको जरूरत है,",
    heroTitleSpan: "एक ही जगह पर।",
    heroSubtitle: "PDF मर्ज, स्प्लिट, एडिट, साइन, प्रोटेक्ट और अनलॉक करें — तुरंत, बिना कुछ इंस्टॉल किए।",
    getStartedFree: "मुफ्त में शुरू करें",
    contactUs: "संपर्क करें",
    freeFastSecure: "फ्री · तेज · सुरक्षित",
    // Stats
    processedLabel: "PDFs प्रोसेस्ड",
    usersLabel: "खुश उपयोगकर्ता",
    ratingLabel: "यूजर रेटिंग",
    // Tools Section
    toolsTitle: "शक्तिशाली PDF टूल्स",
    toolsSubtitle: "एक टूल चुनें और काम शुरू करें — 2 बार मुफ्त उपयोग के लिए साइन-अप की आवश्यकता नहीं है।",
    mergeTitle: "मर्ज PDF",
    mergeDesc: "कुछ ही सेकंड में कई PDF फाइलों को एक साथ जोड़ें।",
    splitTitle: "स्प्लिट PDF",
    splitDesc: "विशिष्ट पृष्ठों को निकालें या PDF को कई फाइलों में विभाजित करें।",
    editTitle: "एडिट PDF",
    editDesc: "किसी भी PDF में टेक्स्ट, आकृतियाँ, हाइलाइट्स और एनोटेशन जोड़ें।",
    signTitle: "साइन PDF",
    signDesc: "दस्तावेजों पर डिजिटल हस्ताक्षर करें — ड्रा करें, टाइप करें या अपलोड करें।",
    protectTitle: "प्रोटेक्ट PDF",
    protectDesc: "पासवर्ड से एन्क्रिप्ट करें और प्रिंटिंग, कॉपी और एडिटिंग को नियंत्रित करें।",
    unlockTitle: "अनलॉक PDF",
    unlockDesc: "सुरक्षित PDF फाइलों से पासवर्ड प्रतिबंध तुरंत हटाएं।",
    useFree: "मुफ्त उपयोग करें",
    mostPopular: "सबसे लोकप्रिय",
    // Features Section
    whyChoose: "QuickPDF क्यों चुनें?",
    whySubtitle: "गति, गोपनीयता और सादगी के लिए बनाया गया है।",
    speedTitle: "बिजली जैसी तेज",
    speedDesc: "फाइलें सेकंडों में प्रोसेस होती हैं — कोई इंतजार नहीं, कोई सॉफ्टवेयर इंस्टॉल नहीं करना।",
    securityTitle: "सुरक्षित और निजी",
    securityDesc: "प्रोसेसिंग के तुरंत बाद फाइलें हटा दी जाती हैं। आपका डेटा आपका ही रहता है।",
    everywhereTitle: "हर जगह काम करता है",
    everywhereDesc: "डेस्कटॉप, टैबलेट या मोबाइल — QuickPDF सभी उपकरणों पर आसानी से काम करता है।",
    // FAQ Section
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    faqSubtitle: "सब कुछ जो आप जानना चाहते हैं।",
    // CTA Section
    ready: "शुरू करने के लिए तैयार हैं?",
    ctaDesc: "असीमित PDF प्रोसेसिंग अनलॉक करने और फ़ाइल इतिहास सहेजने के लिए एक निःशुल्क खाता बनाएं।",
    createAccount: "मुफ्त खाता बनाएं",
    tryGuest: "बिना साइन अप किए प्रयास करें",
    // Footer
    footerDesc: "तेज, मुफ्त और सुरक्षित ऑनलाइन PDF टूल। कोई इंस्टॉल करने की आवश्यकता नहीं है। सेकंड में फाइलें प्रोसेस करें।",
    footerPrivacy: "प्रोसेसिंग के बाद फाइलें अपने आप डिलीट हो जाती हैं। आपकी गोपनीयता सुरक्षित है।",
    createdBy: "Cyber Rudra द्वारा निर्मित",
    footerText: "PDF के साथ दैनिक काम करने वाले हर किसी के लिए प्यार से बनाया गया है।",
    maxSize: "अधिकतम फ़ाइल आकार: 50 MB प्रति फ़ाइल",
    supportsAll: "सभी मानक PDF संस्करणों का समर्थन करता है"
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("app-language");
      if (stored === "hi" || stored === "en") return stored;
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app-language", lang);
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations["en"][key] || "";
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
