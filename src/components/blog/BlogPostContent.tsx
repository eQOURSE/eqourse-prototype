import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Share2, Linkedin, Twitter, Mail, CheckCircle2 } from "lucide-react";
import { BlogPost, blogsData } from "./blogData";
import BlogCard from "./BlogCard";

interface BlogPostContentProps {
  blog: BlogPost;
}

const BlogPostContent = ({ blog }: BlogPostContentProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [copied, setCopied] = useState(false);

  // Scroll Progress and Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      // Progress bar
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll) * 100);

      // Scroll Spy
      if (blog.sections) {
        const sections = blog.sections.map(s => document.getElementById(s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')));
        const scrollPosition = window.scrollY + 100;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(blog.sections[i].title);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blog]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isTeal = blog.thumbnailColor === 'teal';

  // Get 3 related posts
  const relatedPosts = blogsData
    .filter(b => b.category === blog.category && b.id !== blog.id)
    .slice(0, 3);

  return (
    <article className="min-h-screen bg-background relative pb-20">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-muted">
        <div 
          className={`h-full ${isTeal ? 'bg-primary' : 'bg-[#1B9AAA]'}`} 
          style={{ width: `${scrollProgress}%`, transition: 'width 0.1s' }} 
        />
      </div>

      {/* Blog Hero Header */}
      <header className={`relative pt-32 pb-20 overflow-hidden ${isTeal ? 'bg-gradient-to-br from-[#00B4A6]/20 to-background' : 'bg-gradient-to-bl from-[#0D1B2A]/20 to-background'}`}>
        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <span className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase shadow-sm ${isTeal ? 'bg-primary text-white' : 'bg-[#0D1B2A] text-[#1B9AAA] border border-[#1B9AAA]/30'}`}>
              {blog.category}
            </span>
          </div>
          
          <h1 className="font-heading text-3xl md:text-5xl font-extrabold leading-tight text-foreground mb-8">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground font-medium text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {blog.date}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              By {blog.author}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-border" />
              {Math.max(5, Math.ceil(blog.excerpt.length / 50))} min read
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          
          {/* Left Sidebar (Socials + TOC) */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-32 space-y-8">
              
              {/* Share */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Share Article</h4>
                <div className="flex gap-3">
                  <button onClick={handleShare} className="p-2.5 rounded-full bg-muted text-foreground hover:bg-primary hover:text-white transition-colors" title="Copy Link">
                    {copied ? <CheckCircle2 className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                  </button>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-muted text-foreground hover:bg-[#0077b5] hover:text-white transition-colors" title="Share on LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${window.location.href}`} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-muted text-foreground hover:bg-[#1DA1F2] hover:text-white transition-colors" title="Share on Twitter">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Table of Contents */}
              {blog.sections && blog.sections.length > 0 && (
                <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                  <h4 className="font-heading font-bold mb-4">Table of Contents</h4>
                  <ul className="space-y-3 text-sm">
                    {blog.sections.map((section, idx) => {
                      const id = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                      const isActive = activeSection === section.title;
                      return (
                        <li key={idx} className={section.level === 'h3' ? 'ml-4' : ''}>
                          <a 
                            href={`#${id}`}
                            className={`block transition-colors ${isActive ? (isTeal ? 'text-primary font-bold' : 'text-[#1B9AAA] font-bold') : 'text-muted-foreground hover:text-foreground'}`}
                          >
                            {section.title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content Body */}
          <div className="lg:w-3/4 max-w-3xl">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="lead text-xl text-muted-foreground font-medium mb-10 border-l-4 border-primary pl-6 py-2 bg-muted/30 rounded-r-lg">
                {blog.excerpt}
              </p>

              {/* Procedurally rendered body based on outline */}
              {blog.sections?.map((section, idx) => {
                const id = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const Heading = section.level as keyof JSX.IntrinsicElements;
                return (
                  <div key={idx} id={id} className="scroll-mt-32 mb-10">
                    <Heading className="font-heading font-bold text-2xl md:text-3xl mt-12 mb-6">
                      {section.title}
                    </Heading>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      This is a simulated paragraph for the section "{section.title}". In a real CMS integration, this would be populated with rich HTML content. The eQOURSE team covers comprehensive insights on this topic, exploring best practices, challenges, and scalable solutions for modern requirements.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Leveraging industry expertise, this section highlights the critical strategies necessary for success. Whether deploying advanced EdTech platforms or robust AI data pipelines, understanding these foundational elements ensures reliable and impactful outcomes.
                    </p>
                  </div>
                );
              })}

              {/* Internal Links Block */}
              {blog.internalLinks && blog.internalLinks.length > 0 && (
                <div className="my-12 p-6 bg-muted/50 rounded-2xl border border-border">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-primary" />
                    Related Services & Resources
                  </h4>
                  <ul className="space-y-2 m-0 list-none p-0">
                    {blog.internalLinks.map((link, idx) => (
                      <li key={idx} className="p-0">
                        <Link to={link} className="text-primary hover:underline font-medium inline-flex items-center gap-1.5">
                          Explore {link.split('/').pop()?.replace(/-/g, ' ')}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom CTA */}
            <div className={`mt-16 rounded-3xl overflow-hidden shadow-lg relative p-10 md:p-16 text-center ${isTeal ? 'bg-gradient-to-br from-[#00B4A6] to-[#004D47]' : 'bg-gradient-to-br from-[#0D1B2A] to-[#1B9AAA]'}`}>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
              <div className="relative z-10">
                <h3 className="font-heading text-2xl md:text-4xl font-bold text-white mb-4">Ready to get started?</h3>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                  Transform your operations with our premium {isTeal ? 'EdTech' : 'AI Data'} solutions. Partner with eQOURSE today.
                </p>
                <Link to="/free-pilot" className="inline-flex items-center gap-2 bg-white text-foreground px-8 py-3.5 rounded-full font-bold shadow-xl hover:scale-105 transition-transform duration-300">
                  Request a Free Pilot <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="container mx-auto px-4 mt-24">
          <div className="border-t border-border pt-16">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-heading text-2xl md:text-3xl font-bold">Related Articles</h2>
              <Link to="/blog" className="text-primary font-bold flex items-center gap-2 hover:underline">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <BlogCard key={related.id} blog={related} />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default BlogPostContent;
