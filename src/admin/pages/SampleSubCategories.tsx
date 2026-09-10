import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PageHeader from "../components/PageHeader";
import { getMainCategory } from "../lib/sampleHierarchy";
import NotFound from "@/pages/NotFound";

export default function SampleSubCategories() {
  const { mainCategoryId } = useParams();
  const navigate = useNavigate();
  const main = getMainCategory(mainCategoryId ?? "");

  if (!main) return <NotFound />;

  const MainIcon = main.icon;

  return (
    <div className="p-8">
      <Button variant="ghost" size="sm" onClick={() => navigate("/admin/sample-categories")} className="mb-3">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Samples
      </Button>

      <PageHeader
        title={main.label}
        description={`${main.subCategories.length} sub-categories · Select one to manage its sample files.`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
        {main.subCategories.map((sub) => {
          const SubIcon = sub.icon;
          return (
            <Card
              key={sub.slug}
              className="overflow-hidden cursor-pointer group hover:shadow-md hover:-translate-y-0.5 transition-all"
              onClick={() => {
                console.log(`/admin/samples/${main.id}/${sub.slug}`)
                navigate(`/admin/samples/${main.id}/${sub.slug}`)
            }}
            >
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${main.accentColor}15`, color: main.accentColor }}
                  >
                    <SubIcon className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors mt-1.5" />
                </div>

                <div>
                  <h3 className="font-semibold text-sm">{sub.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{sub.description}</p>
                </div>

                <div className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
                  <MainIcon className="w-3 h-3" />
                  <span>{sub.tabs.length} tabs</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
