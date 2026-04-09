import { useMemo } from "react";
import { TIMELINE_PERIODS, rulingEntities, getEmpireColor } from "@/data/historicalData";

interface TimelineLegendProps {
  periodIndex: number;
  highlightedEmpire: string | null;
  onHighlightEmpire: (empire: string | null) => void;
}

const TimelineLegend = ({ periodIndex, highlightedEmpire, onHighlightEmpire }: TimelineLegendProps) => {
  const year = TIMELINE_PERIODS[periodIndex].year;

  const empires = useMemo(() => {
    const set = new Set<string>();
    for (const countryEntities of Object.values(rulingEntities)) {
      const entity = countryEntities[year];
      if (entity) set.add(entity);
    }
    // Sort, but put "Indigenous" and "Various Tribes" last
    const sorted = [...set].sort((a, b) => {
      const minor = ["Indigenous", "Various Tribes", "Uninhabited", "Independent", "Self-governing"];
      const aMinor = minor.includes(a) ? 1 : 0;
      const bMinor = minor.includes(b) ? 1 : 0;
      if (aMinor !== bMinor) return aMinor - bMinor;
      return a.localeCompare(b);
    });
    return sorted;
  }, [year]);

  return (
    <div className="absolute top-28 right-4 z-10 max-h-[50vh] w-48 overflow-y-auto rounded-xl border border-map-border bg-map-tooltip-bg/95 backdrop-blur-md shadow-lg p-3 animate-in fade-in slide-in-from-right-2 duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      <h4 className="text-xs font-bold text-map-highlight mb-2">Empires & Powers</h4>
      <div className="space-y-1">
        {empires.map((name) => (
          <button
            key={name}
            onClick={() => onHighlightEmpire(highlightedEmpire === name ? null : name)}
            className={`flex items-center gap-2 w-full text-left rounded px-1 py-0.5 transition-colors ${
              highlightedEmpire === name ? "bg-map-border/50 ring-1 ring-map-highlight/50" : "hover:bg-map-border/30"
            }`}
          >
            <div
              className="w-3 h-3 rounded-sm shrink-0"
              style={{ backgroundColor: getEmpireColor(name) }}
            />
            <span className={`text-[11px] truncate ${highlightedEmpire === name ? "text-map-highlight font-medium" : "text-primary-foreground"}`}>{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimelineLegend;
