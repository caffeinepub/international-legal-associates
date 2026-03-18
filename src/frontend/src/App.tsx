import About from "@/components/About";
import Admin from "@/components/Admin";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Team from "@/components/Team";
import { Toaster } from "@/components/ui/sonner";
import { InternetIdentityProvider } from "@/hooks/useInternetIdentity";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider>
        <div className="min-h-screen font-montserrat">
          <Header />
          <main>
            <Hero />
            <Services />
            <About />
            <Team />
            <Contact />
            <Admin />
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" richColors />
      </InternetIdentityProvider>
    </QueryClientProvider>
  );
}
