import { useParams, Navigate } from "react-router-dom";
import PageLayout from "@/components/shared/PageLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";
import { blogsData } from "@/components/blog/blogData";
import BlogPostContent from "@/components/blog/BlogPostContent";

const BlogPost = () => {
  const { slug } = useParams();
  
  // Reconstruct slug
  const fullSlug = `/blog/${slug}`;
  const blog = blogsData.find(b => b.slug === fullSlug);

  if (!blog) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <PageLayout breadcrumbs={[
      { label: "Blog", href: "/blog" },
      { label: blog.title }
    ]}>
      <Helmet>
        <title>{blog.title} │ eQOURSE Blog</title>
        <meta name="description" content={blog.excerpt} />
        {blog.keywords && (
          <meta name="keywords" content={blog.keywords.join(", ")} />
        )}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={blog.date} />
        <meta property="article:author" content={blog.author} />
        <link rel="canonical" href={`https://www.eqourse.com${blog.slug}`} />

        {/* BlogPosting Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://www.eqourse.com${blog.slug}"
              },
              "headline": "${blog.title}",
              "description": "${blog.excerpt.replace(/"/g, '\\"')}",
              "author": {
                "@type": "Organization",
                "name": "${blog.author}"
              },
              "publisher": {
                "@type": "Organization",
                "name": "eQOURSE",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.eqourse.com/logo.png"
                }
              },
              "datePublished": "2026-04-01"
            }
          `}
        </script>
      </Helmet>

      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://www.eqourse.com" },
          { name: "Blog", item: "https://www.eqourse.com/blog" },
          { name: blog.title, item: `https://www.eqourse.com${blog.slug}` }
        ]}
      />

      <BlogPostContent blog={blog} />
    </PageLayout>
  );
};

export default BlogPost;
