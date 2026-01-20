import { caseStudies, caseStudiesSection } from "@/config/content";
import { Play, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const Testimonials = () => {
  return (
    <section id="testimonials" className="container py-16 sm:py-20">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-elegant mb-4">
          {caseStudiesSection.headline}{" "}
          <span className="font-display italic text-primary">
            {caseStudiesSection.headlineAccent}
          </span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {caseStudiesSection.subheadline}
        </p>
      </div>

      {/* Case Studies */}
      <div className="max-w-5xl mx-auto space-y-12">
        {caseStudies.map((study, index) => {
          // Middle box (index 1) is mirrored
          const isMirrored = index === 1;

          return (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border/50 p-8 md:p-12 shadow-sm"
            >
              {/* Upper Section: 2 Columns */}
              <div
                className={`grid md:grid-cols-2 gap-8 md:gap-12 ${
                  isMirrored ? "md:direction-rtl" : ""
                }`}
              >
                {/* Content Column */}
                <div className={`space-y-6 ${isMirrored ? "md:order-2" : "md:order-1"}`}>
                  {/* Category */}
                  <p className="text-sm text-primary font-medium uppercase tracking-widest">
                    {study.category}
                  </p>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-light text-foreground leading-tight">
                    {study.title}
                  </h3>

                  {/* Challenge */}
                  <div>
                    <p className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                      Herausforderung
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <p className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                      Lösung
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {study.solution}
                    </p>
                  </div>
                </div>

                {/* Video/Image Column */}
                <div className={`relative pb-8 ${isMirrored ? "md:order-1" : "md:order-2"}`}>
                  <div className="aspect-video rounded-xl overflow-hidden bg-muted border border-border/50">
                    <img
                      src={study.videoThumbnail}
                      alt={`${study.author.company} Case Study`}
                      className="w-full h-full object-cover"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-colors shadow-lg">
                        <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="white" />
                      </button>
                    </div>
                  </div>

                  {/* Author Badge */}
                  <div className="absolute -bottom-4 left-4 right-4 md:left-6 md:right-6">
                    <div className="bg-background rounded-lg border border-border p-3 shadow-md flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-border">
                        <AvatarImage
                          alt={study.author.name}
                          src={study.author.image}
                        />
                        <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                          {study.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">
                          {study.author.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {study.author.title}, {study.author.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border/50 my-8 md:my-10 mt-12 md:mt-14" />

              {/* Lower Section: 3 Columns */}
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {/* Column 1: Results List */}
                <div>
                  <p className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                    Ergebnis
                  </p>
                  <ul className="space-y-3">
                    {study.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2 & 3: Big Metrics */}
                {study.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="text-center md:text-left p-6 rounded-xl bg-primary/5 border border-primary/20"
                  >
                    <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
                      {metric.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
