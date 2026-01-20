import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { finalCta, roiSection } from "@/config/content";
import { ArrowRight, CheckCircle } from "lucide-react";

export const Cta = () => {
  return (
    <section id="cta" className="py-16 sm:py-20">
      <div className="container">
        {/* ROI Urgency - Section 12 */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h3 className="text-xl md:text-2xl font-light tracking-elegant text-muted-foreground mb-8">
            {roiSection.headline}
          </h3>
          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12">
            {roiSection.items.map((item, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl font-semibold text-primary">{item.metric}</p>
                <p className="text-sm text-muted-foreground">{item.cost}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Card - Section 14 */}
        <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 p-12 md:p-16 lg:p-20 text-center">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-elegant mb-4">
              {finalCta.headline.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="font-display italic text-primary">
                {finalCta.headline.split(" ").slice(-1)}
              </span>
            </h2>

            <p className="text-lg text-primary font-medium mb-4">
              {finalCta.subheadline}
            </p>

            <p className="text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed">
              {finalCta.description}
            </p>

            {/* Risk Reversals */}
            {finalCta.riskReversals && (
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {finalCta.riskReversals.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            <Button
              asChild
              size="lg"
              className="group px-8 py-6 text-base font-medium tracking-wide"
            >
              <Link to={finalCta.cta.href}>
                {finalCta.cta.text}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <p className="text-sm text-muted-foreground mt-6">
              {finalCta.trust}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
