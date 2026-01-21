import { Link } from "react-router-dom";
import { targetAudience } from "@/config/content";
import { Check, X } from "lucide-react";
import { Button } from "./ui/button";

export const TargetAudience = () => {
  return (
    <section className="container py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-elegant mb-4">
            {targetAudience.headline}
          </h2>
          <p className="text-lg text-muted-foreground">
            {targetAudience.subheadline}
          </p>
        </div>

        {/* Requirements (Checkboxen) */}
        <div className="p-8 rounded-xl border border-primary/30 bg-primary/5 mb-8">
          <ul className="space-y-4">
            {targetAudience.requirements.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not For */}
        <div className="p-8 rounded-xl border border-red-400/20 bg-red-500/5 mb-10">
          <h3 className="text-lg font-semibold text-red-400 mb-6">
            {targetAudience.notFor.headline}
          </h3>
          <ul className="space-y-4">
            {targetAudience.notFor.items.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-400/70 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-lg text-foreground/80 mb-6">
            {targetAudience.cta.text}
          </p>
          <Button asChild size="lg" className="px-8 py-6 text-base font-semibold">
            <Link to="/kostenlose-beratung">{targetAudience.cta.button}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
