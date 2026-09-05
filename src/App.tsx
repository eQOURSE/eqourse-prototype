import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import { contentServicesSamples } from "./components/samples/content-services/contentServicesSamplesData";
import { contentServicesSubServiceRoutes } from "./components/content-services/contentServicesSubServiceRoutes";
import { legacyRedirects } from "./routes/legacyRedirects";
import ImageSeoTitles from "./components/seo/ImageSeoTitles";

// Keep the homepage's first render small. Every secondary route, admin screen,
// and the chatbot is fetched only when it is actually needed.
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const AIDataServicesOverview = lazy(() => import("./pages/AIDataServicesOverview.tsx"));
const AIDataCollection = lazy(() => import("./pages/AIDataCollection.tsx"));
const AIImageDataCollection = lazy(() => import("./pages/AIImageDataCollection.tsx"));
const AIAudioSpeechDataCollection = lazy(() => import("./pages/AIAudioSpeechDataCollection.tsx"));
const AITextDataCollection = lazy(() => import("./pages/AITextDataCollection.tsx"));
const AIVideoDataCollection = lazy(() => import("./pages/AIVideoDataCollection.tsx"));
const AIAnnotationLabeling = lazy(() => import("./pages/AIAnnotationLabeling.tsx"));
const AILLMRLHFAnnotation = lazy(() => import("./pages/AILLMRLHFAnnotation.tsx"));
const AIImageAnnotation = lazy(() => import("./pages/AIImageAnnotation.tsx"));
const AIVideoAnnotation = lazy(() => import("./pages/AIVideoAnnotation.tsx"));
const AIDocumentOCRAnnotation = lazy(() => import("./pages/AIDocumentOCRAnnotation.tsx"));
const AITextNLPAnnotation = lazy(() => import("./pages/AITextNLPAnnotation.tsx"));
const AIAudioSpeechAnnotation = lazy(() => import("./pages/AIAudioSpeechAnnotation.tsx"));
const AI3DPointCloudLidarAnnotation = lazy(() => import("./pages/AI3DPointCloudLidarAnnotation.tsx"));
const AIContentModeration = lazy(() => import("./pages/AIContentModeration.tsx"));
const AICleaningValidation = lazy(() => import("./pages/AICleaningValidation.tsx"));
const AIDatasetQALabelAudit = lazy(() => import("./pages/AIDatasetQALabelAudit.tsx"));
const AILlmDataCuration = lazy(() => import("./pages/AILlmDataCuration.tsx"));
const AIDataCleaningPreparation = lazy(() => import("./pages/AIDataCleaningPreparation.tsx"));
const AIPiiDetectionRedaction = lazy(() => import("./pages/AIPiiDetectionRedaction.tsx"));
const AIMetadataEnrichment = lazy(() => import("./pages/AIMetadataEnrichment.tsx"));
const AIDataValidationVerification = lazy(() => import("./pages/AIDataValidationVerification.tsx"));
const AIModelTesting = lazy(() => import("./pages/AIModelTesting.tsx"));
const AIBiasFairnessAudit = lazy(() => import("./pages/AIBiasFairnessAudit.tsx"));
const AIRedTeaming = lazy(() => import("./pages/AIRedTeaming.tsx"));
const AILLMEvaluation = lazy(() => import("./pages/AILLMEvaluation.tsx"));
const AIASRSpeechModelTesting = lazy(() => import("./pages/AIASRSpeechModelTesting.tsx"));
const AIComputerVisionModelTesting = lazy(() => import("./pages/AIComputerVisionModelTesting.tsx"));
const AIHumanEvaluationABTesting = lazy(() => import("./pages/AIHumanEvaluationABTesting.tsx"));
const RoboticsTrainingData = lazy(() => import("./pages/RoboticsTrainingData.tsx"));
const RoboticsHumanDemonstrations = lazy(() => import("./pages/RoboticsHumanDemonstrations.tsx"));
const RoboticsMultimodalSensorData = lazy(() => import("./pages/RoboticsMultimodalSensorData.tsx"));
const RoboticsThreeDSpatialAnnotation = lazy(() => import("./pages/RoboticsThreeDSpatialAnnotation.tsx"));
const RoboticsVlaEvaluation = lazy(() => import("./pages/RoboticsVlaEvaluation.tsx"));
const RoboticsDeploymentValidation = lazy(() => import("./pages/RoboticsDeploymentValidation.tsx"));
const ContentServicesOverview = lazy(() => import("./pages/ContentServicesOverview.tsx"));
const CustomElearningContent = lazy(() => import("./pages/CustomElearningContent.tsx"));
const ExamPreparationContent = lazy(() => import("./pages/ExamPreparationContent.tsx"));
const LearningSolutions = lazy(() => import("./pages/LearningSolutions.tsx"));
const ElearningVideoSolutions = lazy(() => import("./pages/ElearningVideoSolutions.tsx"));
const LocalizationServices = lazy(() => import("./pages/LocalizationServices.tsx"));
const TechnologySolutions = lazy(() => import("./pages/TechnologySolutions.tsx"));
const SubjectMatterExperts = lazy(() => import("./pages/SubjectMatterExperts.tsx"));
const AccessibilityServices = lazy(() => import("./pages/AccessibilityServices.tsx"));
const TalentAssessmentWorkforceEvaluation = lazy(() => import("./pages/TalentAssessmentWorkforceEvaluation.tsx"));
const EditorialPublishingDesigningServices = lazy(() => import("./pages/EditorialPublishingDesigningServices.tsx"));
const CaseStudy = lazy(() => import("./pages/CaseStudy.tsx"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail.tsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.tsx"));
const AboutUs = lazy(() => import("./pages/AboutUs.tsx"));
const ClientTestimonials = lazy(() => import("./pages/ClientTestimonials.tsx"));
const Careers = lazy(() => import("./pages/Careers.tsx"));
const FAQs = lazy(() => import("./pages/FAQs.tsx"));
const FreePilot = lazy(() => import("./pages/FreePilot.tsx"));
const Samples = lazy(() => import("./pages/Samples.tsx"));
const AIDataSample = lazy(() => import("./pages/AIDataSample.tsx"));
const ContentServicesSample = lazy(() => import("./pages/ContentServicesSample.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const TuTrain = lazy(() => import("./pages/TuTrain.tsx"));
const Sitemap = lazy(() => import("./pages/Sitemap.tsx"));
const Gallery = lazy(() => import("./pages/Gallery.tsx"));
const ChatWidget = lazy(() => import("./components/chatbot/ChatWidget"));

const AdminLayout = lazy(() => import("./admin/components/AdminLayout"));
const ProtectedRoute = lazy(() => import("./admin/components/ProtectedRoute"));
const AdminLogin = lazy(() => import("./admin/pages/Login"));
const AdminDashboard = lazy(() => import("./admin/pages/Dashboard"));
const AdminContactQueries = lazy(() => import("./admin/pages/ContactQueries"));
const AdminPilotQueries = lazy(() => import("./admin/pages/PilotQueries"));
const AdminBlogs = lazy(() => import("./admin/pages/Blogs"));
const AdminBlogEditor = lazy(() => import("./admin/pages/BlogEditor"));
const AdminCaseStudies = lazy(() => import("./admin/pages/CaseStudies"));
const AdminCaseStudyEditor = lazy(() => import("./admin/pages/CaseStudyEditor"));
const AdminSampleCategories = lazy(() => import("./admin/pages/SampleCategories"));
const AdminSampleSubCategories = lazy(() => import("./admin/pages/SampleSubCategories"));
const AdminSampleTabFiles = lazy(() => import("./admin/pages/SampleTabFiles"));
const AdminSampleEditor = lazy(() => import("./admin/pages/SampleEditor"));
const AdminCareers = lazy(() => import("./admin/pages/Careers"));
const AdminCareerEditor = lazy(() => import("./admin/pages/CareerEditor"));
const AdminCareerApplicants = lazy(() => import("./admin/pages/CareerApplicants"));
const AdminTalentPool = lazy(() => import("./admin/pages/TalentPool"));
const AdminVendors = lazy(() => import("./admin/pages/Vendors"));

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
        <ImageSeoTitles />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/clients-testimonials" element={<ClientTestimonials />} />
              <Route path="/career" element={<Careers />} />
              <Route path="/faq" element={<FAQs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/free-pilot" element={<FreePilot />} />
              <Route path="/casestudy" element={<CaseStudy />} />
              <Route path="/casestudy/:slug" element={<CaseStudyDetail />} />
              <Route path="/privacy_policy" element={<PrivacyPolicy />} />
              <Route path="/tutrain" element={<TuTrain />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/samples" element={<Samples />} />
              <Route path="/ai-data-samples" element={<Samples />} />
              <Route path="/ai-data-samples/:slug" element={<AIDataSample />} />

              {/* Content Services Sample Pages (17 routes - dynamic template by pathname) */}
              {contentServicesSamples.map((s) => (
                <Route key={s.path} path={s.path} element={<ContentServicesSample />} />
              ))}
              <Route path="/ai-data-services" element={<AIDataServicesOverview />} />
              <Route path="/ai-data-services/data-collection" element={<AIDataCollection />} />
              <Route path="/ai-data-services/data-collection/image-data-collection" element={<AIImageDataCollection />} />
              <Route path="/ai-data-services/data-collection/audio-data-collection" element={<AIAudioSpeechDataCollection />} />
              <Route path="/ai-data-services/data-collection/text-data-collection" element={<AITextDataCollection />} />
              <Route path="/ai-data-services/data-collection/video-data-collection" element={<AIVideoDataCollection />} />
              <Route path="/ai-data-services/annotation-labeling" element={<AIAnnotationLabeling />} />
              <Route path="/ai-data-services/annotation-labeling/llm-rlhf-annotation" element={<AILLMRLHFAnnotation />} />
              <Route path="/ai-data-services/annotation-labeling/image-annotation" element={<AIImageAnnotation />} />
              <Route path="/ai-data-services/annotation-labeling/video-annotation" element={<AIVideoAnnotation />} />
              <Route path="/ai-data-services/annotation-labeling/document-ocr-annotation" element={<AIDocumentOCRAnnotation />} />
              <Route path="/ai-data-services/annotation-labeling/text-nlp-annotation" element={<AITextNLPAnnotation />} />
              <Route path="/ai-data-services/annotation-labeling/audio-speech-annotation" element={<AIAudioSpeechAnnotation />} />
              <Route path="/ai-data-services/annotation-labeling/3d-point-cloud-lidar-annotation" element={<AI3DPointCloudLidarAnnotation />} />
              <Route path="/ai-data-services/annotation-labeling/content-moderation" element={<AIContentModeration />} />
              <Route path="/ai-data-services/cleaning-validation" element={<AICleaningValidation />} />
              <Route path="/ai-data-services/cleaning-validation/dataset-qa-label-audit" element={<AIDatasetQALabelAudit />} />
              <Route path="/ai-data-services/cleaning-validation/llm-data-curation" element={<AILlmDataCuration />} />
              <Route path="/ai-data-services/cleaning-validation/data-cleaning-preparation" element={<AIDataCleaningPreparation />} />
              <Route path="/ai-data-services/cleaning-validation/pii-detection-redaction" element={<AIPiiDetectionRedaction />} />
              <Route path="/ai-data-services/cleaning-validation/metadata-enrichment" element={<AIMetadataEnrichment />} />
              <Route path="/ai-data-services/cleaning-validation/data-validation-verification" element={<AIDataValidationVerification />} />
              <Route path="/ai-data-services/model-testing" element={<AIModelTesting />} />
              <Route path="/ai-data-services/model-testing/bias-fairness-audit" element={<AIBiasFairnessAudit />} />
              <Route path="/ai-data-services/model-testing/ai-red-teaming" element={<AIRedTeaming />} />
              <Route path="/ai-data-services/model-testing/llm-evaluation" element={<AILLMEvaluation />} />
              <Route path="/ai-data-services/model-testing/asr-speech-model-testing" element={<AIASRSpeechModelTesting />} />
              <Route path="/ai-data-services/model-testing/computer-vision-model-testing" element={<AIComputerVisionModelTesting />} />
              <Route path="/ai-data-services/model-testing/human-evaluation-ab-testing" element={<AIHumanEvaluationABTesting />} />
              <Route path="/robotics-training-data-services" element={<RoboticsTrainingData />} />
              <Route path="/robotics-training-data-services/human-demonstrations" element={<RoboticsHumanDemonstrations />} />
              <Route path="/robotics-training-data-services/multimodal-sensor-data" element={<RoboticsMultimodalSensorData />} />
              <Route path="/robotics-training-data-services/3d-spatial-annotation" element={<RoboticsThreeDSpatialAnnotation />} />
              <Route path="/robotics-training-data-services/vla-evaluation" element={<RoboticsVlaEvaluation />} />
              <Route path="/robotics-training-data-services/deployment-validation" element={<RoboticsDeploymentValidation />} />

              {/* Content Service - Category Pages */}
              <Route path="/content-services" element={<ContentServicesOverview />} />
              <Route path="/custom-e-learning-content" element={<CustomElearningContent />} />
              <Route path="/test-prep-content" element={<ExamPreparationContent />} />
              <Route path="/learning-solutions" element={<LearningSolutions />} />
              <Route path="/elearning-video-solutions" element={<ElearningVideoSolutions />} />
              <Route path="/localization-services" element={<LocalizationServices />} />
              <Route path="/technology-solutions" element={<TechnologySolutions />} />
              <Route path="/smes" element={<SubjectMatterExperts />} />
              <Route path="/accessibility" element={<AccessibilityServices />} />
              <Route path="/talent-assessment-workforce-evaluation" element={<TalentAssessmentWorkforceEvaluation />} />
              <Route path="/editorial-publishing-designing-services" element={<EditorialPublishingDesigningServices />} />

              {/* Content Service - 39 Sub-Service Detail Pages (lazy-loaded) */}
              {contentServicesSubServiceRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}

              {/*
                Legacy long-tail URLs -> canonical routes.
                Keeps already-indexed URLs and external backlinks alive instead of
                dumping them on a "Coming Soon" stub. Must be declared after the
                real routes above so it never shadows them.
              */}
              {Object.entries(legacyRedirects).map(([from, to]) => (
                <Route key={from} path={from} element={<Navigate to={to} replace />} />
              ))}

              {/* Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="contact-queries" element={<AdminContactQueries />} />
                <Route path="pilot-queries" element={<AdminPilotQueries />} />
                <Route path="blogs" element={<AdminBlogs />} />
                <Route path="blogs/new" element={<AdminBlogEditor />} />
                <Route path="blogs/:id" element={<AdminBlogEditor />} />
                <Route path="case-studies" element={<AdminCaseStudies />} />
                <Route path="case-studies/new" element={<AdminCaseStudyEditor />} />
                <Route path="case-studies/:id" element={<AdminCaseStudyEditor />} />
                <Route path="sample-categories" element={<AdminSampleCategories />} />
                <Route path="samples/:mainCategoryId" element={<AdminSampleSubCategories />} />
                <Route path="samples/:mainCategoryId/:pageSlug" element={<AdminSampleTabFiles />} />
                <Route path="samples/:categorySlug/:pageSlug/:tabName/new" element={<AdminSampleEditor />} />
                <Route path="samples/:categorySlug/:pageSlug/:tabName/:sampleId" element={<AdminSampleEditor />} />
                <Route path="careers" element={<AdminCareers />} />
                <Route path="careers/new" element={<AdminCareerEditor />} />
                <Route path="careers/:id" element={<AdminCareerEditor />} />
                <Route path="careers/:id/applicants" element={<AdminCareerApplicants />} />
                <Route path="talent-pool" element={<AdminTalentPool />} />
                <Route path="vendors" element={<AdminVendors />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Suspense fallback={null}>
            <ChatWidget />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
