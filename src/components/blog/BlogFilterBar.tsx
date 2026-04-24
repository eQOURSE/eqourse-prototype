interface BlogFilterBarProps {
  categories: { id: string; label: string; count: number }[];
  activeCategory: string;
  onSelect: (id: string) => void;
}

const BlogFilterBar = ({ categories, activeCategory, onSelect }: BlogFilterBarProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        
        let activeClasses = "bg-foreground text-background"; // Default active
        if (isActive) {
          if (cat.id === "EdTech") activeClasses = "bg-primary text-primary-foreground shadow-lg shadow-primary/25 border-primary";
          else if (cat.id === "AI Data") activeClasses = "bg-[#0D1B2A] text-white shadow-lg shadow-[#0D1B2A]/25 border-[#0D1B2A]";
        }

        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`
              relative px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2 border
              ${isActive 
                ? activeClasses 
                : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-muted"
              }
            `}
          >
            {cat.label}
            <span className={`
              inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold
              ${isActive 
                ? "bg-white/20 text-white" 
                : "bg-muted-foreground/10 text-muted-foreground"
              }
            `}>
              {cat.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BlogFilterBar;
