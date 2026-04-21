import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, PanelLeftClose, PanelLeft } from "lucide-react";
import { edtechCategories, type EdTechCategory } from "./edtechNavData";

/* ─── Sidebar ─── */
const EdTechSidebar = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Auto-expand the category that owns the current page
  const findActiveCategoryIndex = () => {
    return edtechCategories.findIndex(
      (cat) => pathname === cat.href || pathname.startsWith(cat.href + "/")
    );
  };
  const [expandedIdx, setExpandedIdx] = useState<number | null>(findActiveCategoryIndex);

  useEffect(() => {
    const idx = findActiveCategoryIndex();
    if (idx >= 0) setExpandedIdx(idx);
  }, [pathname]);

  const toggleCategory = (i: number) => {
    setExpandedIdx(expandedIdx === i ? null : i);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col shrink-0 sticky top-[65px] self-start transition-all duration-300 h-[calc(100vh-65px)] border-r border-border/40 bg-card/50
          ${collapsed ? "w-[56px]" : "w-[280px]"}`}
      >
        {/* Collapse toggle */}
        <div className="flex items-center justify-between px-3 py-3 border-b border-border/30">
          {!collapsed && (
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 truncate">
              EdTech Solutions
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        {/* Scrollable nav */}
        <nav className="flex-1 overflow-y-auto py-2 sidebar-scroll">
          {edtechCategories.map((cat, i) => (
            <CategoryItem
              key={cat.label}
              cat={cat}
              index={i}
              isExpanded={expandedIdx === i}
              collapsed={collapsed}
              pathname={pathname}
              onToggle={toggleCategory}
            />
          ))}
        </nav>
      </aside>

      {/* Mobile bottom bar / floating nav */}
      <MobileSidebarSheet pathname={pathname} />
    </>
  );
};

/* ─── Individual Category ─── */
const CategoryItem = ({
  cat,
  index,
  isExpanded,
  collapsed,
  pathname,
  onToggle,
}: {
  cat: EdTechCategory;
  index: number;
  isExpanded: boolean;
  collapsed: boolean;
  pathname: string;
  onToggle: (i: number) => void;
}) => {
  const Icon = cat.icon;
  const isCatActive = pathname === cat.href || pathname.startsWith(cat.href + "/");

  if (collapsed) {
    return (
      <Link
        to={cat.href}
        className={`flex items-center justify-center py-3 mx-2 my-0.5 rounded-lg transition-colors group relative
          ${isCatActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
        title={cat.label}
      >
        <Icon className="w-4.5 h-4.5" />
        {/* Tooltip */}
        <span className="absolute left-full ml-3 px-3 py-1.5 text-xs font-medium bg-card border border-border/50 rounded-lg shadow-elevated whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
          {cat.label}
        </span>
      </Link>
    );
  }

  return (
    <div className="mx-2 my-0.5">
      <button
        onClick={() => onToggle(index)}
        className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm transition-all group
          ${isCatActive ? "bg-primary/10 text-primary font-semibold" : "text-foreground/80 hover:bg-primary/5 hover:text-primary"}`}
      >
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span className="flex-1 text-left truncate">{cat.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 text-muted-foreground
            ${isExpanded ? "rotate-180 text-primary" : ""}`}
        />
      </button>

      {/* Sub-services list */}
      <div
        className={`overflow-hidden transition-all duration-200 ease-out
          ${isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="pl-4 pr-1 py-1 space-y-0.5">
          {/* "Overview" link */}
          <Link
            to={cat.href}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors
              ${pathname === cat.href ? "text-primary bg-primary/5" : "text-primary/70 hover:text-primary hover:bg-primary/5"}`}
          >
            Overview
            <ChevronRight className="w-3 h-3" />
          </Link>

          {cat.subServices.map((sub) => {
            const SubIcon = sub.icon;
            const isActive = pathname === sub.href;
            return (
              <Link
                key={sub.href}
                to={sub.href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] transition-all
                  ${isActive
                    ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
              >
                {SubIcon && <SubIcon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-primary" : ""}`} />}
                <span className="truncate">{sub.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ─── Mobile: floating sheet trigger ─── */
const MobileSidebarSheet = ({ pathname }: { pathname: string }) => {
  const [open, setOpen] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(() =>
    edtechCategories.findIndex((cat) => pathname === cat.href || pathname.startsWith(cat.href + "/"))
  );

  useEffect(() => {
    const idx = edtechCategories.findIndex(
      (cat) => pathname === cat.href || pathname.startsWith(cat.href + "/")
    );
    if (idx >= 0) setExpandedIdx(idx);
  }, [pathname]);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-6 left-4 z-40 flex items-center gap-2 bg-gradient-primary text-primary-foreground px-4 py-3 rounded-full shadow-elevated text-sm font-semibold hover:opacity-90 transition-opacity"
        aria-label="Open service navigation"
      >
        <PanelLeft className="w-4 h-4" />
        Services
      </button>

      {/* Overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />

          {/* Sheet */}
          <div className="relative w-[300px] max-w-[80vw] bg-card border-r border-border/50 shadow-elevated h-full flex flex-col animate-slide-up">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
              <span className="text-sm font-bold text-foreground">EdTech Solutions</span>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-2">
              {edtechCategories.map((cat, i) => {
                const Icon = cat.icon;
                const isCatActive = pathname === cat.href || pathname.startsWith(cat.href + "/");
                const isExpanded = expandedIdx === i;

                return (
                  <div key={cat.label} className="mx-2 my-0.5">
                    <button
                      onClick={() => setExpandedIdx(isExpanded ? null : i)}
                      className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm transition-all
                        ${isCatActive ? "bg-primary/10 text-primary font-semibold" : "text-foreground/80 hover:bg-primary/5"}`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1 text-left truncate">{cat.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>

                    {isExpanded && (
                      <div className="pl-4 pr-1 py-1 space-y-0.5">
                        <Link
                          to={cat.href}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold ${pathname === cat.href ? "text-primary" : "text-primary/70 hover:text-primary"}`}
                          onClick={() => setOpen(false)}
                        >
                          Overview <ChevronRight className="w-3 h-3" />
                        </Link>
                        {cat.subServices.map((sub) => {
                          const SubIcon = sub.icon;
                          const isActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.href}
                              to={sub.href}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] transition-colors
                                ${isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
                              onClick={() => setOpen(false)}
                            >
                              {SubIcon && <SubIcon className="w-3.5 h-3.5 flex-shrink-0" />}
                              <span className="truncate">{sub.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default EdTechSidebar;
