import { relief } from "@/config/content";
import { MinusCircle } from "lucide-react";

export const Relief = () => {
  return (
    <section className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-elegant">
            <span className="font-display italic text-primary">
              {relief.headline}
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {relief.items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg bg-card/30 border border-border/30"
            >
              <MinusCircle className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
