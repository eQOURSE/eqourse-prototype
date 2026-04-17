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

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ai-data-services" element={<AIDataServicesOverview />} />
            <Route path="/ai-data-services/data-collection" element={<AIDataCollection />} />
            <Route path="/ai-data-services/annotation-labeling" element={<AIAnnotationLabeling />} />
            <Route path="/ai-data-services/cleaning-validation" element={<AICleaningValidation />} />
            <Route path="/ai-data-services/model-testing" element={<AIModelTesting />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
