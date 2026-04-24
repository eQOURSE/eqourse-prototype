import PageLayout from "@/components/shared/PageLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";

const Blog = () => {
  return (
    <PageLayout breadcrumbs={[{ label: "Blog", href: "/blog" }]}>
      <Helmet>
        <title>Insights & Trends in EdTech and AI Data Services │ eQOURSE</title>
        <meta
          name="description"
          content="Expert articles, guides, and industry perspectives from the eQOURSE team. Covering K-12 education, curriculum design, exam preparation, AI training data, annotation best practices, and real-world model testing."
        />
        <meta
          name="keywords"
          content="EdTech blog, AI data services blog, e-learning insights, machine learning training data, annotation best practices, eQOURSE blog"
        />
        <meta property="og:title" content="Insights & Trends in EdTech and AI Data Services │ eQOURSE" />
        <meta property="og:description" content="Expert articles and industry perspectives covering EdTech solutions and AI Data Services." />
        <link rel="canonical" href="https://www.eqourse.com/blog" />
        
        {/* CollectionPage Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "eQOURSE Blog",
              "description": "Insights & Trends in EdTech and AI Data Services",
              "url": "https://www.eqourse.com/blog",
              "publisher": {
                "@type": "Organization",
                "name": "eQOURSE",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.eqourse.com/logo.png"
                }
              }
            }
          `}
        </script>
      </Helmet>

      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://www.eqourse.com" },
          { name: "Blog", item: "https://www.eqourse.com/blog" }
        ]}
      />

      <BlogHero />
      <BlogGrid />
      
    </PageLayout>
  );
};

export default Blog;
