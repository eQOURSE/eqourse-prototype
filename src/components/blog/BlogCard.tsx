import { Calendar, ArrowRight, User } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogPost } from "./blogData";

interface BlogCardProps {
  blog: BlogPost;
  featured?: boolean;
}

const generateAbstractPattern = (id: number, colorTheme: 'teal' | 'navy') => {
  const isTeal = colorTheme === 'teal';
  const baseHue = isTeal ? 170 : 242; // Primary or Navy
  
  // Use id to seed pseudo-randomness for distinct patterns
  const rotation = (id * 45) % 360;
  const scale = 1 + (id % 3) * 0.2;
  
  return (
    <svg className="absolute inset-0 w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={`hsl(${baseHue}, ${isTeal ? '82%' : '33%'}, ${isTeal ? '20%' : '15%'})`} />
          <stop offset="100%" stopColor={`hsl(${baseHue}, ${isTeal ? '75%' : '40%'}, ${isTeal ? '35%' : '25%'})`} />
        </linearGradient>
        <pattern id={`pat-${id}`} x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse" patternTransform={`rotate(${rotation}) scale(${scale})`}>
          {isTeal ? (
            <>
              <circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)" />
              <path d="M0,50 Q25,25 50,50 T100,50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
            </>
          ) : (
            <>
              <rect x="0" y="0" width="100" height="100" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <circle cx="0" cy="0" r="3" fill="rgba(255,255,255,0.1)" />
              <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            </>
          )}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grad-${id})`} />
      <rect width="100%" height="100%" fill={`url(#pat-${id})`} />
      
      {/* Decorative large shapes based on index */}
      {id % 3 === 0 && <circle cx="80%" cy="20%" r="150" fill="rgba(255,255,255,0.03)" />}
      {id % 3 === 1 && <rect x="-50" y="300" width="400" height="400" transform="rotate(45)" fill="rgba(255,255,255,0.02)" />}
      {id % 3 === 2 && <polygon points="0,500 800,200 800,500" fill="rgba(255,255,255,0.04)" />}
    </svg>
  );
};

const BlogCard = ({ blog, featured = false }: BlogCardProps) => {
  const isTeal = blog.thumbnailColor === 'teal';
  const badgeColor = isTeal 
    ? "bg-primary text-primary-foreground" 
    : "bg-[#0D1B2A] text-[#1B9AAA] border border-[#1B9AAA]/30";

  if (featured) {
    return (
      <Link to={blog.slug} className="group relative rounded-3xl overflow-hidden min-h-[420px] md:min-h-[500px] flex items-end neon-card block">
        <div className="absolute inset-0 z-0">
          {generateAbstractPattern(blog.id, blog.thumbnailColor)}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent z-10" />
        
        {/* Category Badge */}
        <div className={`absolute top-6 left-6 z-20 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-md ${badgeColor}`}>
          {blog.category}
        </div>

        <div className="relative z-20 p-8 md:p-10 w-full">
          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm mb-4 font-medium text-white/80">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {blog.date}
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              By {blog.author}
            </div>
          </div>
          
          <h3 className="font-heading text-2xl md:text-4xl font-bold leading-tight mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-300">
            {blog.title}
          </h3>
          
          <p className="text-white/80 mb-6 max-w-3xl line-clamp-2 md:line-clamp-3 text-sm md:text-base">
            {blog.excerpt}
          </p>
          
          <span className="inline-flex items-center text-sm md:text-base font-bold text-primary gap-2 group-hover:gap-3 transition-all bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-md hover:bg-white/20">
            Read Article <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={blog.slug} className="group flex flex-col h-full rounded-2xl bg-card border border-border/50 hover:bg-card/80 neon-card overflow-hidden block">
      {/* Thumbnail Container */}
      <div className="relative h-48 md:h-56 w-full overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 z-0 group-hover:scale-110 transition-transform duration-700">
          {generateAbstractPattern(blog.id, blog.thumbnailColor)}
        </div>
        
        {/* Category Badge */}
        <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-md ${badgeColor}`}>
          {blog.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 font-medium">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {blog.date}
          </div>
          <div className="w-1 h-1 rounded-full bg-border" />
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            {blog.author}
          </div>
        </div>

        <h3 className="font-heading font-bold text-foreground text-lg md:text-xl mb-3 group-hover:text-primary transition-colors leading-snug line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-grow">
          {blog.excerpt}
        </p>

        <div className="mt-auto pt-4 border-t border-border/50">
          <span className="inline-flex items-center text-sm font-bold text-primary gap-1 group-hover:gap-2 transition-all">
            READ MORE <ArrowRight className="w-4 h-4 ml-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
