import { HEATMAP_LEGEND, GDP_HEATMAP_LEGEND } from "@/data/countryData";
import { Flame, Palette, DollarSign } from "lucide-react";

export type MapMode = "default" | "heatmap" | "gdp";

interface MapLegendProps {
  mode: MapMode;
  onToggle: (mode: MapMode) => void;
}

const DEFAULT_LEGEND = [
  { color: "hsl(170, 50%, 45%)", label: "Region A" },
  { color: "hsl(200, 55%, 50%)", label: "Region B" },
  { color: "hsl(30, 60%, 55%)", label: "Region C" },
  { color: "hsl(340, 45%, 55%)", label: "Region D" },
  { color: "hsl(260, 40%, 55%)", label: "Region E" },
  { color: "hsl(90, 40%, 45%)", label: "Region F" },
];

const MODES: { key: MapMode; label: string; icon: typeof Flame }[] = [
  { key: "default", label: "Default Colors", icon: Palette },
  { key: "heatmap", label: "Population", icon: Flame },
  { key: "gdp", label: "GDP per Capita", icon: DollarSign },
];

const MapLegend = ({ mode, onToggle }: MapLegendProps) => {
  const items = mode === "heatmap" ? HEATMAP_LEGEND : mode === "gdp" ? GDP_HEATMAP_LEGEND : DEFAULT_LEGEND;
  const title = mode === "heatmap" ? "Population" : mode === "gdp" ? "GDP / Capita" : "Legend";

  return (
    <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
      {/* Mode buttons */}
      <div className="flex flex-col gap-1">
        {MODES.filter((m) => m.key !== mode).map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.key}
              onClick={() => onToggle(m.key)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-map-ocean/90 backdrop-blur-sm text-map-highlight text-xs font-medium border border-map-border hover:bg-map-border/50 transition-colors"
            >
              <Icon className="w-3.5 h-3.5" /> {m.label}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="rounded-lg bg-map-ocean/90 backdrop-blur-sm border border-map-border p-3 min-w-[140px]">
        <p className="text-[10px] font-semibold text-map-highlight mb-2 uppercase tracking-wider">
          {title}
        </p>
        <div className="flex flex-col gap-1.5">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[11px] text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
