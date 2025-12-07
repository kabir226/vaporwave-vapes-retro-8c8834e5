import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "product";
  structuredData?: object;
  keywords?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = "https://storage.googleapis.com/gpt-engineer-file-uploads/zG19D7YpwvOt7oYotsDvSBnnmPI3/social-images/social-1764502523718-i4c60mxg.png",
  url,
  type = "website",
  structuredData,
  keywords,
  breadcrumbs,
}) => {
  const siteName = "Snuspedia";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const currentUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  // Schema BreadcrumbList pour la navigation
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  } : null;

  return (
    <Helmet>
      {/* Balises de base */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Meta Keywords pour SEO local */}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* hreflang pour cibler le Burkina Faso */}
      <link rel="alternate" hrefLang="fr-BF" href={currentUrl || "https://snuspedia-bf.com"} />
      <link rel="alternate" hrefLang="fr" href={currentUrl || "https://snuspedia-bf.com"} />
      <link rel="alternate" hrefLang="x-default" href={currentUrl || "https://snuspedia-bf.com"} />

      {/* Canonical URL - Crucial pour éviter le contenu dupliqué */}
      {currentUrl && <link rel="canonical" href={currentUrl} />}

      {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {currentUrl && <meta property="og:url" content={currentUrl} />}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="fr_BF" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Geo Tags pour SEO local */}
      <meta name="geo.region" content="BF" />
      <meta name="geo.placename" content="Ouagadougou" />
      <meta name="geo.position" content="12.3714;-1.5197" />
      <meta name="ICBM" content="12.3714, -1.5197" />

      {/* Données structurées JSON-LD (Schema.org) pour GEO */}
      {structuredData && <script type="application/ld+json">{JSON.stringify(structuredData)}</script>}
      
      {/* BreadcrumbList Schema */}
      {breadcrumbSchema && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>}
    </Helmet>
  );
};

export default SEO;
