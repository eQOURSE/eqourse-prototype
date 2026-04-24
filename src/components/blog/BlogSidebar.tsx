import { ArrowRight, Mail, Hash, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogPost } from "./blogData";

interface BlogSidebarProps {
  recentPosts: BlogPost[];
}

const BlogSidebar = ({ recentPosts }: BlogSidebarProps) => {
  return (
    <aside className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
      {/* Search / Newsletter */}
      <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
        <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          eQOURSE Connect
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Get the latest insights on EdTech and AI Data Services delivered weekly.
        </p>
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Your email address" 
            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            required
          />
          <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
            Subscribe <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Categories */}
      <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
        <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
          <Hash className="w-5 h-5 text-primary" />
          Categories
        </h3>
        <ul className="space-y-2">
          <li>
            <Link to="/blog?category=EdTech" className="flex items-center justify-between group p-2 hover:bg-muted rounded-lg transition-colors">
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity -ml-6 group-hover:ml-0" />
                EdTech Solutions
              </span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">17</span>
            </Link>
          </li>
          <li>
            <Link to="/blog?category=AI Data" className="flex items-center justify-between group p-2 hover:bg-muted rounded-lg transition-colors">
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#1B9AAA] opacity-0 group-hover:opacity-100 transition-opacity -ml-6 group-hover:ml-0" />
                AI Data Services
              </span>
              <span className="text-xs bg-[#0D1B2A]/10 text-[#0D1B2A] dark:text-[#1B9AAA] px-2 py-0.5 rounded-full font-bold">17</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
        <h3 className="font-heading font-bold text-lg mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link key={post.id} to={post.slug} className="group flex gap-3 items-start">
              <div className={`w-16 h-16 rounded-lg flex-shrink-0 bg-muted overflow-hidden relative ${post.thumbnailColor === 'teal' ? 'bg-primary/20' : 'bg-[#0D1B2A]/20'}`}>
                <div className="absolute inset-0 flex items-center justify-center font-bold opacity-30 text-2xl">
                  {post.id % 10}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-1">
                  {post.title}
                </h4>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Free Pilot CTA */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg group block cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B4A6] to-[#0D1B2A] z-0 transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay z-0" />
        <div className="relative z-10 p-8 text-center text-white flex flex-col items-center justify-center min-h-[250px]">
          <h3 className="font-heading font-bold text-2xl mb-3 drop-shadow-md">Ready to Scale?</h3>
          <p className="text-sm text-white/80 mb-6 font-medium">Try our premium EdTech & AI Data solutions today.</p>
          <Link to="/free-pilot" className="bg-white text-[#0D1B2A] px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2">
            Start Free Pilot <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
