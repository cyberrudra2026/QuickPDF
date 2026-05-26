import { usePageSEO } from "@/hooks/use-seo";
import { PageTransition } from "@/components/page-transition";
import { AdBanner } from "@/components/ad-banner";

export default function PrivacyPolicy() {
  usePageSEO({
    title: "Privacy Policy – QuickPDF",
    description: "Read QuickPDF's privacy policy. Learn how we handle your data, files, and personal information. Your privacy is our priority.",
    canonical: "/privacy-policy",
  });
  return (
    <PageTransition className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="border-b pb-6">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm">
            Last updated: May 2026 &nbsp;|&nbsp; Effective date: May 2026
          </p>
        </div>

        <AdBanner slot="2233445566" format="horizontal" />

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-sm leading-relaxed text-foreground/90">

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">1. Introduction</h2>
            <p>
              Welcome to <strong>QuickPDF</strong> ("we", "us", or "our"). We are committed to
              protecting your personal information and your right to privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you visit
              our website and use our PDF tools.
            </p>
            <p>
              Please read this policy carefully. If you disagree with its terms, please discontinue
              use of our site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">2. Information We Collect</h2>
            <h3 className="text-base font-semibold">a) Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Account registration details (name, email address) when you sign up</li>
              <li>Files you upload for processing (PDF documents)</li>
              <li>Messages you send via the contact form</li>
            </ul>
            <h3 className="text-base font-semibold">b) Automatically Collected Information</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP address and browser type</li>
              <li>Pages visited, time spent, and referring URLs</li>
              <li>Device information (operating system, screen size)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide, operate, and improve our PDF tools and services</li>
              <li>To manage your account and send you service-related emails</li>
              <li>To respond to your inquiries and support requests</li>
              <li>To display relevant advertisements via Google AdSense</li>
              <li>To analyze usage patterns and improve user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">4. File Handling & Storage</h2>
            <p>
              Files you upload for processing are used <strong>solely</strong> to perform the
              requested operation (merge, split, edit, sign, protect, or unlock). We do
              <strong> not</strong> read, store, share, or sell the contents of your PDF files.
            </p>
            <p>
              Uploaded files are automatically deleted from our servers immediately after processing
              is complete. We retain a record of the file name and operation type in your account
              history for your reference, but not the file contents.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">5. Cookies & Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Keep you signed in to your account</li>
              <li>Remember your preferences (e.g., dark/light mode)</li>
              <li>Analyze site traffic via Google Analytics</li>
              <li>Serve personalised ads via <strong>Google AdSense</strong></li>
            </ul>
            <p>
              Google AdSense uses cookies to serve ads based on your prior visits to this and other
              websites. You may opt out of personalised advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:no-underline"
              >
                Google Ads Settings
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">6. Google AdSense & Third-Party Advertising</h2>
            <p>
              We use Google AdSense to display advertisements on our website. Google, as a third-party
              vendor, uses cookies to serve ads based on your visits to this site and other sites on
              the Internet.
            </p>
            <p>
              Third-party vendors, including Google, use cookies to serve ads based on a user's prior
              visits to our website or other websites. Users may opt out of personalised advertising
              by visiting{" "}
              <a
                href="https://optout.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:no-underline"
              >
                aboutads.info
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">7. Data Sharing & Disclosure</h2>
            <p>We do <strong>not</strong> sell your personal information. We may share data with:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Service providers</strong> — authentication (Clerk), hosting, and analytics</li>
              <li><strong>Legal authorities</strong> — when required by law or court order</li>
              <li><strong>Google</strong> — for AdSense advertising and analytics</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">8. Data Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal
              information against unauthorised access, alteration, disclosure, or destruction.
              However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">9. Children's Privacy</h2>
            <p>
              QuickPDF is not directed to children under the age of 13. We do not knowingly collect
              personal information from children. If we learn that a child under 13 has provided us
              with personal information, we will delete it promptly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">10. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p>
              To exercise these rights, contact us at{" "}
              <a href="mailto:mail.technologytoday@gmail.com" className="text-primary underline hover:no-underline">
                mail.technologytoday@gmail.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant
              changes by posting the new policy on this page with an updated date. Your continued use
              of QuickPDF after any changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">12. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact:</p>
            <div className="bg-muted/40 rounded-lg p-4 border border-border space-y-1 not-prose">
              <p className="font-semibold text-foreground">Cyber Rudra</p>
              <p className="text-muted-foreground text-sm">Owner, QuickPDF</p>
              <a href="mailto:mail.technologytoday@gmail.com" className="text-primary text-sm hover:underline block">
                mail.technologytoday@gmail.com
              </a>
              <a href="tel:+919696676902" className="text-primary text-sm hover:underline block">
                +91 96966 76902
              </a>
            </div>
          </section>

        </div>

        <AdBanner slot="3344556677" format="horizontal" className="mt-8" />
      </div>
    </PageTransition>
  );
}
