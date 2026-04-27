import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Mail,
  Rocket,
  FileText,
  BookOpen,
  FolderTree,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { adminApi } from "../lib/api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/contact-queries", label: "Contact Queries", icon: Mail },
  { to: "/admin/pilot-queries", label: "Free-Pilot Queries", icon: Rocket },
  { to: "/admin/blogs", label: "Blogs", icon: FileText },
  { to: "/admin/case-studies", label: "Case Studies", icon: BookOpen },
  { to: "/admin/sample-categories", label: "Samples", icon: FolderTree },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const user = adminApi.getCurrentUser();

  const handleLogout = async () => {
    await adminApi.logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col fixed inset-y-0 left-0 z-30">
        <div className="px-6 py-5 border-b border-border">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              eQ
            </div>
            <div>
              <div className="font-semibold text-sm leading-tight">eQourse</div>
              <div className="text-xs text-muted-foreground">Admin Panel</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                )
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-border space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground px-3 py-2"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View public site
          </a>
          <div className="px-3 py-2 rounded-md bg-muted">
            <div className="text-xs font-medium truncate">{user?.name ?? "Admin"}</div>
            <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
