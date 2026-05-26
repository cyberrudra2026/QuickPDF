import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string;
  schema?: object | object[];
}

const SITE_NAME = "QuickPDF";
const BASE_URL = "https://quickpdf.cyberrudra.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph.jpg`;
const SCHEMA_ID = "__page-schema__";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function usePageSEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  keywords,
  schema,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    setMeta("title", fullTitle);
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);

    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
    setLink("canonical", canonicalUrl);

    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("og:image", ogImage, "property");

    setMeta("twitter:title", fullTitle, "name");
    setMeta("twitter:description", description, "name");
    setMeta("twitter:image", ogImage, "name");
    setMeta("twitter:url", canonicalUrl, "name");

    if (schema) {
      let el = document.getElementById(SCHEMA_ID);
      if (!el) {
        el = document.createElement("script");
        el.id = SCHEMA_ID;
        el.setAttribute("type", "application/ld+json");
        document.head.appendChild(el);
      }
      const schemas = Array.isArray(schema) ? schema : [schema];
      el.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
    }

    return () => {
      const el = document.getElementById(SCHEMA_ID);
      if (el) el.remove();
    };
  }, [title, description, canonical, ogImage, keywords, schema]);
}
