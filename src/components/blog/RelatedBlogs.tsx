import { useEffect, useState } from "react";
import { ArrowUpRight, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import BlogCard from "./BlogCard";
import { type BlogPost } from "./blogData";
import {
  fetchBlogsForPage,
  fetchCaseStudiesForPage,
  fetchSamplesForPage,
  type PreviewFile,
  type PublicBlog,
  type PublicCaseStudy,
} from "@/lib/publicApi";

interface RelatedBlogsProps {
  title?: string;
  subtitle?: string;
  /** Kept for source compatibility; exact admin page assignments now control matching. */
  keywords?: string[];
  limit?: number;
}

const assetUrl = (url = "") =>
  url && url.startsWith("/") ? `${import.meta.env.VITE_API_BASE_URL || ""}${url}` : url;

const mapApiBlog = (blog: PublicBlog, index: number): BlogPost => ({
  id: index + 1000,
  title: blog.title,
  slug: `/blog/${blog.slug}`,
  category: blog.tags?.includes("AI Data") ? "AI Data" : "Content Services",
  date: blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "",
  author: blog.author?.name || "eQOURSE",
  excerpt: blog.excerpt,
  thumbnailColor: blog.tags?.includes("AI Data") ? "navy" : "teal",
  keywords: blog.tags,
  coverImageUrl: assetUrl(blog.coverImageUrl) || undefined,
  coverImageAlt: blog.seo?.coverImageAlt || `${blog.title} — eQOURSE blog cover image`,
  coverImageTitle: blog.seo?.coverImageTitle || blog.title,
});

const RelatedBlogs = ({
  title = "Related Resources",
  subtitle = "Explore selected insights, samples and client outcomes for this service.",
  limit = 3,
}: RelatedBlogsProps) => {
  const { pathname } = useLocation();
  const [blogs, setBlogs] = useState<PublicBlog[]>([]);
  const [caseStudies, setCaseStudies] = useState<PublicCaseStudy[]>([]);
  const [samples, setSamples] = useState<PreviewFile[]>([]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const [nextBlogs, nextCaseStudies, nextSamples] = await Promise.all([
        fetchBlogsForPage(pathname),
        fetchCaseStudiesForPage(pathname),
        fetchSamplesForPage(pathname),
      ]);
      if (cancelled) return;
      setBlogs((nextBlogs || []).slice(0, limit));
      setCaseStudies((nextCaseStudies || []).slice(0, limit));
      setSamples((nextSamples || []).slice(0, limit));
    };
    load();
    return () => { cancelled = true; };
  }, [limit, pathname]);

  if (!blogs.length && !caseStudies.length && !samples.length) return null;

  return (
    <section className="bg-muted/30 py-16 md:py-20" aria-labelledby="related-resources-heading">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Selected for this service</span>
          <h2 id="related-resources-heading" className="mt-3 font-heading text-3xl font-bold md:text-4xl">{title}</h2>
          <p className="mt-3 leading-7 text-muted-foreground">{subtitle}</p>
        </div>

        {blogs.length > 0 && (
          <div className="mx-auto mb-12 max-w-6xl">
            <h3 className="mb-5 font-heading text-xl font-semibold">Insights</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog, index) => <BlogCard key={blog.id} blog={mapApiBlog(blog, index)} />)}
            </div>
          </div>
        )}

        {caseStudies.length > 0 && (
          <div className="mx-auto mb-12 max-w-6xl">
            <h3 className="mb-5 font-heading text-xl font-semibold">Case studies</h3>
            <div className="grid gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study) => (
                <Link key={study.id} to={`/casestudy/${study.slug}`} className="group bg-background p-5 transition-colors hover:bg-muted/50">
                  {study.heroImageUrl && <img src={assetUrl(study.heroImageUrl)} alt={study.seo?.heroImageAlt || study.title} title={study.seo?.heroImageTitle || study.title} loading="lazy" className="mb-4 aspect-[16/9] w-full rounded-lg object-cover" />}
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">{study.industry}</p>
                  <h4 className="mt-2 font-heading text-lg font-semibold leading-snug">{study.title}</h4>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{study.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read case study <ArrowUpRight className="h-4 w-4" /></span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {samples.length > 0 && (
          <div className="mx-auto max-w-6xl">
            <h3 className="mb-5 font-heading text-xl font-semibold">Samples</h3>
            <div className="divide-y rounded-xl border bg-background md:grid md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-3">
              {samples.map((sample, index) => (
                <a key={sample.id || `${sample.title}-${index}`} href={assetUrl(sample.fileUrl)} target={sample.isExternal ? "_blank" : undefined} rel={sample.isExternal ? "noopener noreferrer" : undefined} className="group flex min-h-40 flex-col p-5 transition-colors hover:bg-muted/50">
                  <FileText className="mb-4 h-7 w-7 text-primary" />
                  <h4 className="font-heading text-lg font-semibold">{sample.title}</h4>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{sample.description}</p>
                  <span className="mt-auto pt-4 text-sm font-semibold text-primary">View {sample.fileType || "sample"}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedBlogs;
