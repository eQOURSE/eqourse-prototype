import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { blogsData } from "./blog/blogData";

const generateAbstractPattern = (id: number, colorTheme: 'teal' | 'navy') => {
  const isTeal = colorTheme === 'teal';
  const baseHue = isTeal ? 170 : 242;
  const rotation = (id * 45) % 360;
  const scale = 1 + (id % 3) * 0.2;
  
  return (
    <svg className="absolute inset-0 w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`bg-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={`hsl(${baseHue}, ${isTeal ? '82%' : '33%'}, ${isTeal ? '20%' : '15%'})`} />
          <stop offset="100%" stopColor={`hsl(${baseHue}, ${isTeal ? '75%' : '40%'}, ${isTeal ? '35%' : '25%'})`} />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#bg-grad-${id})`} />
      {/* Abstract geometric shapes */}
      <circle cx="80%" cy="20%" r="150" fill="rgba(255,255,255,0.03)" />
      <polygon points="0,500 800,200 800,500" fill="rgba(255,255,255,0.04)" />
    </svg>
  );
};

const recentBlogs = blogsData.slice(0, 4);

const BlogSection = () => {
  return (
    <section id="blogs" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">Latest Insights</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Latest from <span className="text-gradient">Our Blog</span>
          </h2>
          <Link to="/blog" className="inline-flex items-center text-sm font-semibold text-primary gap-2 hover:underline">
            View All Posts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Magazine Layout: 1 hero + 3 stacked */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Hero Post */}
          {recentBlogs.length > 0 && (
            <Link to={recentBlogs[0].slug} className="group relative rounded-3xl overflow-hidden min-h-[420px] flex items-end neon-card">
              <div className="absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-700">
                {generateAbstractPattern(recentBlogs[0].id, recentBlogs[0].thumbnailColor)}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent z-10" />
              <div className="relative z-20 p-8 md:p-10 w-full">
                <div className="flex items-center gap-2 text-xs mb-3 font-medium text-white/80">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase mr-2 ${recentBlogs[0].thumbnailColor === 'teal' ? 'bg-primary text-white' : 'bg-[#0D1B2A] text-[#1B9AAA] border border-[#1B9AAA]/30'}`}>
                    {recentBlogs[0].category}
                  </span>
                  <Calendar className="w-3.5 h-3.5" />
                  {recentBlogs[0].date}
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold leading-tight mb-4 text-white group-hover:text-primary transition-colors duration-300">
                  {recentBlogs[0].title}
                </h3>
                <span className="inline-flex items-center text-sm font-semibold text-primary gap-2 group-hover:gap-3 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          )}

          {/* Stacked Posts */}
          <div className="flex flex-col gap-4">
            {recentBlogs.slice(1).map((blog) => (
              <Link key={blog.id} to={blog.slug} className="group flex gap-5 items-center rounded-2xl bg-card border border-border/50 p-4 hover:bg-card/80 neon-card overflow-hidden">
                <div className="w-28 h-28 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 z-0 group-hover:scale-110 transition-transform duration-500">
                    {generateAbstractPattern(blog.id, blog.thumbnailColor)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 font-medium">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase mr-1 ${blog.thumbnailColor === 'teal' ? 'bg-primary/10 text-primary' : 'bg-[#0D1B2A]/10 text-[#1B9AAA]'}`}>
                      {blog.category}
                    </span>
                    <Calendar className="w-3 h-3" />
                    {blog.date}
                  </div>
                  <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors text-sm md:text-base leading-snug line-clamp-2">
                    {blog.title}
                  </h3>
                  <span className="inline-flex items-center text-xs font-semibold text-primary mt-2 gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
