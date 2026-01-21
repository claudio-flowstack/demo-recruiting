import { empathyOpening } from "@/config/content";

export const EmpathyOpening = () => {
  return (
    <section className="container py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        {/* Headline */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-elegant text-center mb-12">
          {empathyOpening.headline}
        </h2>

        {/* Opening Paragraphs */}
        <div className="space-y-6 mb-10">
          {empathyOpening.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-lg md:text-xl leading-relaxed ${
                index === 0 ? "text-primary font-medium" : "text-foreground/80"
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Pain Points Intro */}
        <p className="text-muted-foreground mb-6">Du kennst das:</p>

        {/* Pain Points List */}
        <ul className="space-y-4 mb-10">
          {empathyOpening.painPoints.map((point, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-foreground/80"
            >
              <span className="text-muted-foreground">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {/* Empathy Statement */}
        <div className="text-center py-8 border-y border-border/30">
          <p className="text-2xl md:text-3xl font-semibold text-primary">
            {empathyOpening.empathy}
          </p>
        </div>

        {/* Closing */}
        <div className="mt-10 text-center">
          {empathyOpening.closing.split("\n\n").map((paragraph, index) => (
            <p
              key={index}
              className={`text-lg md:text-xl leading-relaxed ${
                index === empathyOpening.closing.split("\n\n").length - 1
                  ? "text-primary font-medium mt-4"
                  : "text-foreground/80"
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmpathyOpening;
