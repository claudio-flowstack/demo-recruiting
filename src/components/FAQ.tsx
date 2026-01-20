import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems, siteConfig } from "@/config/content";

export const FAQ = () => {
  return (
    <section id="faq" className="container py-16 sm:py-20">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-elegant mb-4">
          Häufige{" "}
          <span className="font-display italic text-primary">Fragen</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Was du wissen solltest, bevor wir sprechen.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border/50 rounded-lg px-6 data-[state=open]:bg-card/50"
            >
              <AccordionTrigger className="text-left font-light tracking-wide hover:text-primary hover:no-underline py-6">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Noch Fragen?{" "}
            <a
              href={siteConfig.cta.href}
              className="text-primary hover:underline underline-offset-4 transition-all"
            >
              Lass uns sprechen
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
