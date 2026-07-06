import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/contexts/theme-context";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getvisaservices.in"),
  title: {
    default: "GVS – Get Visa Services | Tourist Visa Experts for Indian Travellers",
    template: "%s | GVS – Get Visa Services",
  },
  description:
    "Fast, transparent visa assistance for Indian travellers and corporates — e-Visas, embassy visas, and end-to-end document support for 40+ destinations.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "GVS – Get Visa Services",
    locale: "en_IN",
    url: "/",
    title: "GVS – Get Visa Services | Tourist Visa Experts for Indian Travellers",
    description:
      "Fast, transparent visa assistance for Indian travellers and corporates — e-Visas, embassy visas, and end-to-end document support for 40+ destinations.",
    images: [{ url: "/gvs-visas-on-time-banner.png", width: 1088, height: 371, alt: "GVS – Visas On Time, Guaranteed" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GVS – Get Visa Services",
    description: "Fast, transparent visa assistance for Indian travellers and corporates.",
    images: ["/gvs-visas-on-time-banner.png"],
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "GVS – Get Visa Services",
  url: "https://getvisaservices.in",
  logo: "https://getvisaservices.in/gvs-icon.png",
  parentOrganization: { "@type": "Organization", name: "Vagabond Holidays" },
  telephone: "+91-98105-45760",
  email: "ggn@getvisaservices.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Wework, Blue 1 Square, Udyog Vihar Phase 4 Rd, Phase IV, Sector 18",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    postalCode: "122015",
    addressCountry: "IN",
  },
};

const noFlashThemeScript = `(function(){try{var t=localStorage.getItem('gvs-theme')||'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-body">
        <ThemeProvider>
          <Nav />
          <main className="pt-[68px]">{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
