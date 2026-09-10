import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Building2, UserRoundSearch } from "lucide-react";
import CareerApplicationForm from "./CareerApplicationForm";
import VendorRegistrationForm from "./VendorRegistrationForm";

export default function CareerPathways() {
  const [searchParams] = useSearchParams();
  const requestedPathway = searchParams.get("pathway") === "vendor" ? "vendor" : "talent";
  const [active, setActive] = useState<"talent" | "vendor">(requestedPathway);

  useEffect(() => {
    setActive(requestedPathway);

    if (requestedPathway === "vendor" && window.location.hash === "#future-opportunities") {
      window.requestAnimationFrame(() => {
        document.getElementById("future-opportunities")?.scrollIntoView({ block: "start" });
      });
    }
  }, [requestedPathway]);

  return (
    <section id="future-opportunities" className="scroll-mt-28 bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">Future opportunities</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">Two ways to build with eQOURSE</h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">Share an individual profile for future roles, or register a company for verified delivery partnerships.</p>
            <div className="mt-9 space-y-2" role="tablist" aria-label="Application type">
              <button role="tab" aria-selected={active === "talent"} aria-controls="career-pathway-panel" onClick={() => setActive("talent")} className={`flex w-full items-start gap-4 border-l-2 px-5 py-5 text-left transition ${active === "talent" ? "border-teal-600 bg-teal-50 text-slate-950" : "border-slate-200 text-slate-500 hover:border-slate-400"}`}>
                <UserRoundSearch className="mt-0.5 h-5 w-5 shrink-0" /><span><strong className="block text-base">Join our talent pool</strong><span className="mt-1 block text-sm">For professionals interested in roles that are not currently open.</span></span>
              </button>
              <button role="tab" aria-selected={active === "vendor"} aria-controls="career-pathway-panel" onClick={() => setActive("vendor")} className={`flex w-full items-start gap-4 border-l-2 px-5 py-5 text-left transition ${active === "vendor" ? "border-teal-600 bg-teal-50 text-slate-950" : "border-slate-200 text-slate-500 hover:border-slate-400"}`}>
                <Building2 className="mt-0.5 h-5 w-5 shrink-0" /><span><strong className="block text-base">Register as a vendor</strong><span className="mt-1 block text-sm">For companies seeking future project and delivery partnerships.</span></span>
              </button>
            </div>
          </div>
          <div id="career-pathway-panel" role="tabpanel" className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-8 lg:p-10">
            <div className="mb-7">
              <h3 className="text-2xl font-bold text-slate-950">{active === "talent" ? "Create your talent profile" : "Company registration and verification"}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{active === "talent" ? "Your resume stays connected to your searchable profile in our hiring workspace." : "Provide legal registration and recent tax evidence so our team can complete due diligence."}</p>
            </div>
            {active === "talent" ? <CareerApplicationForm /> : <VendorRegistrationForm />}
          </div>
        </div>
      </div>
    </section>
  );
}
