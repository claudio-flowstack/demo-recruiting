import { problemMirror } from "@/config/content";
import * as Icons from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  UserX: Icons.UserX,
  TrendingDown: Icons.TrendingDown,
  AlertTriangle: Icons.AlertTriangle,
  Flame: Icons.Flame,
  Database: Icons.Database,
  RefreshCw: Icons.RefreshCw,
  Clock: Icons.Clock,
  Link: Icons.Link,
};

export const ProblemMirror = () => {
  return (
    <section className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light tracking-elegant mb-4">
          {problemMirror.headline}
        </h2>
        {problemMirror.subheadline && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {problemMirror.subheadline}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {problemMirror.problems.map((problem, index) => {
          const Icon = iconMap[problem.icon] || Icons.HelpCircle;
          return (
            <div
              key={index}
              className="p-6 rounded-lg border border-border/50 bg-card/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-md bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
