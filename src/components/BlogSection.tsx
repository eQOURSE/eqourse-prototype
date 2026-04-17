import { ArrowRight, Calendar } from "lucide-react";

const blogs = [
  {
    title: "EmSAT Content Solutions: Scalable Test Prep for UAE EdTech",
    date: "2025",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop",
  },
  {
    title: "Innovative Education Tools for K12 & Higher Ed Success",
    date: "May 24, 2025",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=250&fit=crop",
  },
  {
    title: "6 Signs Your Learning Solutions Need a Gamified Upgrade",
    date: "May 24, 2025",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
  },
  {
    title: "eQOURSE Launches in Singapore | Scaling EdTech Across Asia",
    date: "2025",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
  },
];

const BlogSection = () => {
  return (
    <section id="blogs" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">Latest Insights</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Latest from <span className="text-gradient">Our Blog</span>
          </h2>
        </div>

        {/* Magazine Layout: 1 hero + 3 stacked */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Hero Post */}
          <a href="#" className="group relative rounded-3xl overflow-hidden min-h-[420px] flex items-end neon-card">
            <img src={blogs[0].image} alt={blogs[0].title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
            <div className="relative z-10 p-8 md:p-10">
              <div className="flex items-center gap-2 text-xs mb-3" style={{ color: 'hsl(242, 20%, 80%)' }}>
                <Calendar className="w-3.5 h-3.5" />
                {blogs[0].date}
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-bold leading-tight mb-4" style={{ color: 'hsl(0, 0%, 100%)' }}>
                {blogs[0].title}
              </h3>
              <span className="inline-flex items-center text-sm font-semibold text-primary gap-2 group-hover:gap-3 transition-all">
                Read Article <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </a>

          {/* Stacked Posts */}
          <div className="flex flex-col gap-4">
            {blogs.slice(1).map((blog, i) => (
              <a key={i} href="#" className="group flex gap-5 items-center rounded-2xl bg-card border border-border/50 p-4 hover:bg-card/80 neon-card overflow-hidden">
                <div className="w-28 h-28 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden">
                  <img src={blog.image} alt={blog.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
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
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
