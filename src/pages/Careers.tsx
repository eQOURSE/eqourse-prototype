import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageLayout from "@/components/shared/PageLayout";
import { BreadcrumbSchema } from "@/components/shared/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";
import ServiceHero from "@/components/ai-data-services/shared/ServiceHero";
import CareersWhyWork from "@/components/careers/CareersWhyWork";
import { Laptop, GraduationCap, TrendingUp } from "lucide-react";

import JobListings from "@/components/careers/JobListings";
import JobDetailModal from "@/components/careers/JobDetailModal";
import JobApplicationForm from "@/components/careers/JobApplicationForm";
import type { JobOpening } from "@/admin/lib/types";
import { pageSeo } from "@/seo/pageSeo";
import CareerPathways from "@/components/careers/CareerPathways";

/* Approved title + meta description for this route (see src/seo/pageSeo.ts). */
const PAGE_SEO = pageSeo["/career"];

const Careers = () => {
  // Two-step flow: first view JD details, then apply
  const [detailJob, setDetailJob] = useState<JobOpening | null>(null);
  const [applyJob, setApplyJob] = useState<JobOpening | null>(null);
  const [searchParams] = useSearchParams();

  const handleViewDetails = (job: JobOpening) => {
    setDetailJob(job);
  };

  const handleApplyFromDetail = () => {
    // Move from detail view to application form
    setApplyJob(detailJob);
    setDetailJob(null);
  };

  const handleCloseDetail = () => {
    setDetailJob(null);
  };

  const handleCloseApply = () => {
    setApplyJob(null);
  };

  return (
    <PageLayout breadcrumbs={[{ label: "About Us", href: "/aboutus" }, { label: "Careers" }]}>
      <Helmet>
        <title>{PAGE_SEO.title}</title>
        <meta name="description" content={PAGE_SEO.description} />
        <meta
          name="keywords"
          content="eQOURSE careers, Content Services jobs, AI data annotation jobs, content development careers, instructional design jobs, data labeling jobs India, NLP annotator jobs, education technology careers"
        />
        <link rel="canonical" href="https://www.eqourse.com/career" />
        <meta property="og:title" content="Careers at eQOURSE │ Content Services & AI Data Services Jobs" />
        <meta property="og:description" content="Join eQOURSE - careers in Content Services, instructional design, AI data annotation, NLP and more with an India-led team serving global clients." />
        <meta property="og:url" content="https://www.eqourse.com/career" />
      </Helmet>
      
      <BreadcrumbSchema 
        items={[
          { name: "Home", item: "https://www.eqourse.com" },
          { name: "About Us", item: "https://www.eqourse.com/aboutus" },
          { name: "Careers", item: "https://www.eqourse.com/career" }
        ]}
      />

      <ServiceHero
        preHeadline="Join Our Team"
        headline="Build the Future of"
        headlineAccent="Education & AI"
        subtext="Shape the future of education and AI with eQOURSE. Be part of a dynamic team of 500+ specialists dedicated to innovative Content Services and production-grade AI data services. We're always looking for talented content creators, instructional designers, data annotators, NLP specialists, project managers, and operations professionals. Grow your career with our India-led delivery organisation serving clients worldwide."
        ctaText="View Openings"
        ctaLink="#open-positions"
        imageSrc="/assets/about/Carrer.webp"
        imageAlt="Careers at eQOURSE - Professionals collaborating on education and AI solutions"
        rotatingBadges={[
          { icon: Laptop, title: "Remote Options", subtitle: "Flexible working", color: "hsl(190 85% 68%)" },
          { icon: GraduationCap, title: "Learning", subtitle: "Continuous growth", color: "hsl(165 75% 71%)" },
          { icon: TrendingUp, title: "Growth", subtitle: "Career progression", color: "hsl(170 82% 55%)" }
        ]}
        bottomBadge={{ iconText: "HR", title: "Join Us", subtitle: "Global team, local impact" }}
      />
      
      {/* Job Board Section */}
      <section className="border-t border-slate-200 bg-slate-50">
        <JobListings initialJobSlug={searchParams.get("job") || undefined} onApplyClick={handleViewDetails} />
      </section>

      <CareerPathways />
      <CareersWhyWork />

      {/* Job Detail Modal — shows full JD before applying */}
      {detailJob && (
        <JobDetailModal
          job={detailJob}
          onClose={handleCloseDetail}
          onApply={handleApplyFromDetail}
        />
      )}

      {/* Application Form Modal */}
      {applyJob && (
        <JobApplicationForm 
          job={applyJob} 
          onClose={handleCloseApply} 
        />
      )}
    </PageLayout>
  );
};

export default Careers;
