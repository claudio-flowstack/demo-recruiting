import { tools, trustMetrics } from "@/config/content";

export const Sponsors = () => {
  // Duplicate tools for seamless infinite scroll
  const allTools = [...tools, ...tools];

  return (
    <section id="sponsors" className="pt-4 pb-12 overflow-hidden">
      {/* Trust Metrics - Section 2 */}
      <div className="container mb-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-light tracking-elegant mb-2">
            {trustMetrics.headline}
          </h2>
          {trustMetrics.subheadline && (
            <p className="text-sm text-muted-foreground">
              {trustMetrics.subheadline}
            </p>
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          {trustMetrics.metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl md:text-3xl font-light text-primary mb-1">
                {metric.value}
              </p>
              <p className="text-sm text-muted-foreground">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tools strip */}
      <div className="container">
        <p className="text-center text-sm md:text-base uppercase tracking-widest text-muted-foreground mb-6">
          Tools, mit denen wir arbeiten
        </p>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling tools */}
        <div className="flex animate-marquee">
          {allTools.map((tool, index) => (
            <div
              key={`${tool.name}-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center gap-3"
            >
              <img
                src={tool.logo}
                alt={tool.name}
                className="h-10 w-10 md:h-14 md:w-14 object-contain opacity-60 hover:opacity-90 transition-opacity"
              />
              <span className="text-sm text-muted-foreground font-medium hidden md:inline">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
