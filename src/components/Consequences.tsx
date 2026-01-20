import { consequences } from "@/config/content";

export const Consequences = () => {
  return (
    <section className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-elegant mb-4">
            {consequences.headline}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {consequences.subheadline}
          </p>
        </div>

        {/* 3 KPI Boxes */}
        <div className="grid md:grid-cols-3 gap-6">
          {consequences.costPerDay.items.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-border/50 bg-card/30 text-center"
            >
              <p className="text-xl font-semibold text-primary mb-2">
                {item.metric}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
