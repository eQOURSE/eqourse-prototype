import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import EdTechLayout from "@/components/edtech-solutions/shared/EdTechLayout";
import SEOHead from "@/components/ai-data-services/shared/SEOHead";

const EdTechStubPage = () => {
  const { pathname } = useLocation();
  const title = pathname.split("/").pop()?.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || "Page Not Found";

  return (
    <EdTechLayout breadcrumbs={[{ label: "EdTech Solutions", href: "/edtech-solutions" }, { label: title }]}>
      <SEOHead
        title={`${title} | eQOURSE`}
        description={`Learn more about our ${title} services.`}
        canonical={`https://eqourse.com${pathname}`}
      />
      <div className="min-h-[70vh] flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md w-full p-8 rounded-3xl neon-card border border-border/50 bg-card">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-3">Coming Soon</h1>
          <p className="text-muted-foreground mb-8">
            The <strong>{title}</strong> page is currently under development. Check back later for updates.
          </p>
          <Link
            to="/edtech-solutions"
            className="inline-flex items-center text-sm font-semibold text-primary hover:gap-3 gap-2 transition-all bg-primary/5 hover:bg-primary/10 px-6 py-3 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" /> Back to EdTech Solutions
          </Link>
        </div>
      </div>
    </EdTechLayout>
  );
};

export default EdTechStubPage;
