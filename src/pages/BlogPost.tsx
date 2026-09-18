import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PageLayout from "@/components/shared/PageLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import ArticleSEOHead from "@/components/shared/ArticleSEOHead";
import { blogsData, BlogPost as BlogPostType } from "@/components/blog/blogData";
import BlogPostContent from "@/components/blog/BlogPostContent";
import { fetchBlogBySlug } from "@/lib/publicApi";
import { Loader2 } from "lucide-react";
import NotFound from "@/pages/NotFound";

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<BlogPostType | null | undefined>(undefined); // undefined = loading

  useEffect(() => {
    if (!slug) return;

    // First, try static data for instant render
    const fullSlug = `/blog/${slug}`;
    const staticBlog = blogsData.find(b => b.slug === fullSlug);
    
    if (staticBlog) {
      setBlog(staticBlog);
    }

    // Then try API (will override static if successful)
    fetchBlogBySlug(slug).then((apiBlog) => {
      if (!apiBlog) {
        // API unavailable - keep static result (or null if not found statically)
        if (!staticBlog) setBlog(null);
        return;
      }
      // Map API blog to static BlogPost shape
      setBlog({
        id: 1,
        title: apiBlog.title,
        slug: `/blog/${apiBlog.slug}`,
        category: (apiBlog.tags?.includes("AI Data") ? "AI Data" : "Content Services") as BlogPostType["category"],
        date: apiBlog.publishedAt ? new Date(apiBlog.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "2026",
        author: apiBlog.author?.name || "eQOURSE",
        excerpt: apiBlog.excerpt,
        thumbnailColor: (apiBlog.tags?.includes("AI Data") ? "navy" : "teal") as BlogPostType["thumbnailColor"],
        keywords: apiBlog.tags,
        coverImageUrl: apiBlog.coverImageUrl ? (apiBlog.coverImageUrl.startsWith("/") ? `${import.meta.env.VITE_API_BASE_URL || ""}${apiBlog.coverImageUrl}` : apiBlog.coverImageUrl) : undefined,
        coverImageAlt: apiBlog.seo?.coverImageAlt || `${apiBlog.title} — eQOURSE blog cover image`,
        coverImageTitle: apiBlog.seo?.coverImageTitle || apiBlog.title,
        seoTitle: apiBlog.seo?.title?.trim() || apiBlog.title,
        seoDescription: apiBlog.seo?.description?.trim() || apiBlog.excerpt,
        publishedAt: apiBlog.publishedAt,
        updatedAt: apiBlog.updatedAt,
        body: apiBlog.body,
        bodyFormat: apiBlog.bodyFormat,
      });
    });
  }, [slug]);

  // Loading state
  if (blog === undefined) {
    return (
      <PageLayout breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: "Loading..." }]}>
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </PageLayout>
    );
  }

  if (!blog) {
    return <NotFound />;
  }

  const seoTitle = blog.seoTitle?.trim() || blog.title;
  const seoDescription = blog.seoDescription?.trim() || blog.excerpt;
  const canonicalUrl = `https://www.eqourse.com${blog.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    headline: seoTitle,
    description: seoDescription,
    image: blog.coverImageUrl || undefined,
    author: { "@type": "Organization", name: blog.author },
    publisher: {
      "@type": "Organization",
      name: "eQOURSE",
      logo: { "@type": "ImageObject", url: "https://www.eqourse.com/logo.png" },
    },
    datePublished: blog.publishedAt || undefined,
    dateModified: blog.updatedAt || blog.publishedAt || undefined,
    url: canonicalUrl,
    inLanguage: "en",
  };

  return (
    <PageLayout breadcrumbs={[
      { label: "Blog", href: "/blog" },
      { label: blog.title }
    ]}>
      <ArticleSEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        keywords={blog.keywords}
        image={blog.coverImageUrl}
        imageAlt={blog.coverImageAlt || blog.title}
        author={blog.author}
        publishedAt={blog.publishedAt}
        modifiedAt={blog.updatedAt || blog.publishedAt}
        schema={articleSchema}
      />

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
