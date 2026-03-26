import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SuccessStories from "./pages/SuccessStories";
import WhyPartner from "./pages/WhyPartner";
import Earnings from "./pages/Earnings";
import ProfitMargin from "./pages/ProfitMargin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename="/uber-eats-merchant-page">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/why-partner" element={<WhyPartner />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/profit-margin" element={<ProfitMargin />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
