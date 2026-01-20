import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Sponsors } from "@/components/Sponsors";
import { EmotionalReframe } from "@/components/EmotionalReframe";
import { ProblemMirror } from "@/components/ProblemMirror";
import { TargetAudience } from "@/components/TargetAudience";
import { Differentiator } from "@/components/Differentiator";
import { Services } from "@/components/Services";
import { Outcomes } from "@/components/Outcomes";
import { Relief } from "@/components/Relief";
import { Testimonials } from "@/components/Testimonials";
import { Timeline } from "@/components/Timeline";
import { TeamSection } from "@/components/TeamSection";
import { Cta } from "@/components/Cta";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AvailableIndicator } from "@/components/AvailableIndicator";

export const HomePage = () => {
  return (
    <>
      <Navbar />

      {/* 1. HERO (Above the Fold) */}
      <Hero />

      {/* Trust Metrics Strip */}
      <Sponsors />

      {/* 2. PROBLEME DER ZIELGRUPPE */}
      <EmotionalReframe />
      <ProblemMirror />

      {/* 3. FÜR WEN IST DAS? (Zielgruppe) */}
      <TargetAudience />

      {/* 4. DIE FLOWSTACK-METHODE */}
      <Differentiator />

      {/* 5. LEISTUNGSBAUSTEINE */}
      <Services />

      {/* 6. VORTEILE / OUTCOMES */}
      <Outcomes />
      <Relief />

      {/* 7. FALLSTUDIEN (Testimonials) */}
      <Testimonials />

      {/* 8. ABLAUF DER ZUSAMMENARBEIT */}
      <Timeline />

      {/* 9. TEAM-SEKTION */}
      <TeamSection />

      {/* 10. CTA-SECTION */}
      <Cta />

      {/* 11. FAQ */}
      <FAQ />

      {/* 12. FOOTER */}
      <Footer />

      <ScrollToTop />
      <AvailableIndicator />
    </>
  );
};

export default HomePage;
