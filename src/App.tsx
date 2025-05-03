
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import InjuryPrediction from "./pages/InjuryPrediction";
import VideoAnalysis from "./pages/VideoAnalysis";
import VideoSummarization from "./pages/VideoSummarization";
import TeamStatistics from "./pages/TeamStatistics";
import { ThemeProvider } from "./components/ThemeProvider";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner theme="dark" />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/injury-prediction" element={<InjuryPrediction />} />
            <Route path="/video-analysis" element={<VideoAnalysis />} />
            <Route path="/video-summarization" element={<VideoSummarization />} />
            <Route path="/team-statistics" element={<TeamStatistics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
