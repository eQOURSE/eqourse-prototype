import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { type BlogPost } from "./blogData";
import { fetchBlogByFilterCategory, fetchPublishedBlogs, type PublicBlog } from "@/lib/publicApi";
import { useLocation } from "react-router-dom";

interface RelatedBlogsProps {
  title?: string;
  subtitle?: string;
  keywords?: string[];
  limit?: number;
}

const defaultKeywords = [
  "robotics",
  "computer vision",
  "AI Data",
  "data collection",
];

const mapApiBlog = (blog: PublicBlog, index: number): BlogPost => ({
  id: index + 1000,
  title: blog.title,
  slug: `/blog/${blog.slug}`,
  category: blog.tags?.includes("AI Data") ? "AI Data" : "Content Services",
  date: blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "2026",
  author: blog.author?.name || "eQOURSE",
  excerpt: blog.excerpt,
  thumbnailColor: blog.tags?.includes("AI Data") ? "navy" : "teal",
  keywords: blog.tags,
  coverImageUrl: blog.coverImageUrl
    ? blog.coverImageUrl.startsWith("/")
      ? `${import.meta.env.VITE_API_BASE_URL || ""}${blog.coverImageUrl}`
      : blog.coverImageUrl
    : undefined,
  coverImageAlt:
    blog.seo?.coverImageAlt || `${blog.title} — eQOURSE blog cover image`,
  coverImageTitle: blog.seo?.coverImageTitle || blog.title,
});

const RelatedBlogs = ({
  title = "Related Insights",
  subtitle = "Explore practical guidance on visual data collection, computer vision and building reliable AI datasets.",
  keywords = defaultKeywords,
  limit = 3,
}: RelatedBlogsProps) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    const matches = (tags: string[] = []) =>
      keywords.some((keyword) =>
        tags.join(" ").toLowerCase().includes(keyword.toLowerCase()),
      );

    const pathSegments = location.pathname.split("/");
    const category = pathSegments[1] ?? "";
    const subcategories = pathSegments[2] ?? "";
    const subSubcategories = pathSegments[3] ?? "";

    const loadRelated = async () => {
      // 1. Try fetching by exact category path
      let published = await fetchBlogByFilterCategory(category, subcategories, subSubcategories);
      
      // 2. Filter by keywords
      let filtered = (published || []).filter((blog) => matches(blog.tags));
      
      // 3. Fallback: If keywords filtered out everything, use the category matches
      if (!filtered.length && published?.length) {
        filtered = published;
      }
      
      // 4. Fallback: If category search found nothing (e.g. legacy blogs without categories), fetch all
      if (!filtered.length) {
        const allBlogs = await fetchPublishedBlogs();
        if (allBlogs?.length) {
          filtered = allBlogs.filter((blog) => matches(blog.tags));
          if (!filtered.length) {
            filtered = allBlogs; // Ultimate fallback: just show latest blogs
          }
        }
      }

      if (cancelled) return;
      
      if (filtered?.length) {
        setPosts(filtered.slice(0, limit).map(mapApiBlog));
      } else {
        setPosts([]);
      }
    };

    loadRelated();

    return () => {
      cancelled = true;
    };
  }, [keywords, limit, location.pathname]);

  if (!posts.length) return null;

  return (
    <section className="bg-muted/30 py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            From the eQOURSE journal
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">{subtitle}</p>
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} blog={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedBlogs;
