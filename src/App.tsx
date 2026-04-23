import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AIDataServicesOverview from "./pages/AIDataServicesOverview.tsx";
import AIDataCollection from "./pages/AIDataCollection.tsx";
import AIAnnotationLabeling from "./pages/AIAnnotationLabeling.tsx";
import AICleaningValidation from "./pages/AICleaningValidation.tsx";
import AIModelTesting from "./pages/AIModelTesting.tsx";
import EdTechOverview from "./pages/EdTechOverview.tsx";
import CustomElearningContent from "./pages/CustomElearningContent.tsx";
import ExamPreparationContent from "./pages/ExamPreparationContent.tsx";
import LearningSolutions from "./pages/LearningSolutions.tsx";
import ElearningVideoSolutions from "./pages/ElearningVideoSolutions.tsx";
import LocalizationServices from "./pages/LocalizationServices.tsx";
import TechnologySolutions from "./pages/TechnologySolutions.tsx";
import SubjectMatterExperts from "./pages/SubjectMatterExperts.tsx";
import EdTechStubPage from "./pages/EdTechStubPage.tsx";
import CaseStudy from "./pages/CaseStudy.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import ClientTestimonials from "./pages/ClientTestimonials.tsx";
import Careers from "./pages/Careers.tsx";
import FAQs from "./pages/FAQs.tsx";
import Samples from "./pages/Samples.tsx";
import AIDataSample from "./pages/AIDataSample.tsx";
import EdtechSample from "./pages/EdtechSample.tsx";
import { edtechSamples } from "./components/samples/edtech/edtechSamplesData";
import { edtechSubServiceRoutes } from "./components/edtech-solutions/edtechSubServiceRoutes";

const queryClient = new QueryClient();

/* Minimal loading spinner for lazy-loaded routes */
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/clients-testimonials" element={<ClientTestimonials />} />
              <Route path="/career" element={<Careers />} />
              <Route path="/faq" element={<FAQs />} />
              <Route path="/casestudy" element={<CaseStudy />} />
              <Route path="/samples" element={<Samples />} />
              <Route path="/ai-data-samples" element={<Samples />} />
              <Route path="/ai-data-samples/:slug" element={<AIDataSample />} />

              {/* EdTech Sample Pages (17 routes — dynamic template by pathname) */}
              {edtechSamples.map((s) => (
                <Route key={s.path} path={s.path} element={<EdtechSample />} />
              ))}
              <Route path="/ai-data-services" element={<AIDataServicesOverview />} />
              <Route path="/ai-data-services/data-collection" element={<AIDataCollection />} />
              <Route path="/ai-data-services/annotation-labeling" element={<AIAnnotationLabeling />} />
              <Route path="/ai-data-services/cleaning-validation" element={<AICleaningValidation />} />
              <Route path="/ai-data-services/model-testing" element={<AIModelTesting />} />

              {/* EdTech Solutions — Category Pages */}
              <Route path="/edtech-solutions" element={<EdTechOverview />} />
              <Route path="/edtech-solutions/custom-e-learning-content" element={<CustomElearningContent />} />
              <Route path="/edtech-solutions/exam-preparation-content" element={<ExamPreparationContent />} />
              <Route path="/edtech-solutions/learning-solutions" element={<LearningSolutions />} />
              <Route path="/edtech-solutions/elearning-video-solutions" element={<ElearningVideoSolutions />} />
              <Route path="/edtech-solutions/localization-services" element={<LocalizationServices />} />
              <Route path="/edtech-solutions/technology-solutions" element={<TechnologySolutions />} />
              <Route path="/edtech-solutions/subject-matter-experts" element={<SubjectMatterExperts />} />

              {/* EdTech Solutions — 39 Sub-Service Detail Pages (lazy-loaded) */}
              {edtechSubServiceRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}

              {/* Catch-all for any remaining EdTech stub pages */}
              <Route path="/edtech-solutions/*" element={<EdTechStubPage />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
