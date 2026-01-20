import { targetAudience } from "@/config/content";
import { Check, X } from "lucide-react";

export const TargetAudience = () => {
  return (
    <section className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-elegant">
            {targetAudience.headline}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* For Whom */}
          <div className="p-8 rounded-xl border border-primary/30 bg-primary/5">
            <h3 className="text-xl font-medium text-primary mb-6">
              {targetAudience.forWhom.title}
            </h3>
            <ul className="space-y-4">
              {targetAudience.forWhom.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not For Whom */}
          <div className="p-8 rounded-xl border border-red-400/20 bg-red-500/5">
            <h3 className="text-xl font-medium text-muted-foreground mb-6">
              {targetAudience.notForWhom.title}
            </h3>
            <ul className="space-y-4">
              {targetAudience.notForWhom.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400/70 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
