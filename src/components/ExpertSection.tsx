import { expertContent } from "@/config/content";

export const ExpertSection = () => {
  return (
    <section id="about" className="py-16 sm:py-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden border border-border/50 bg-muted">
              <img
                src={expertContent.image}
                alt={expertContent.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold">
              {expertContent.experience}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-primary uppercase tracking-widest mb-2">
                {expertContent.label}
              </p>
              <h2 className="text-3xl md:text-4xl font-light tracking-elegant">
                {expertContent.headline}
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {expertContent.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Credentials */}
            {expertContent.credentials && (
              <div className="grid grid-cols-2 gap-4 pt-4">
                {expertContent.credentials.map((credential, index) => (
                  <div key={index} className="bg-card border border-border/50 rounded-lg p-4">
                    <p className="text-2xl font-semibold text-primary">{credential.value}</p>
                    <p className="text-sm text-muted-foreground">{credential.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
