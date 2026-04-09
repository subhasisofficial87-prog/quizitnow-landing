import { CONTINENTS, type Continent } from "@/data/continentData";
import { Globe } from "lucide-react";

interface ContinentFilterProps {
  selected: Continent;
  onSelect: (continent: Continent) => void;
  onZoom: (center: [number, number], zoom: number) => void;
}

const CONTINENT_VIEWS: Record<Continent, { center: [number, number]; zoom: number }> = {
  All: { center: [0, 20], zoom: 1 },
  Africa: { center: [20, 5], zoom: 2.2 },
  Asia: { center: [85, 30], zoom: 2 },
  Europe: { center: [15, 52], zoom: 3 },
  "North America": { center: [-100, 45], zoom: 2 },
  "South America": { center: [-60, -15], zoom: 2 },
  Oceania: { center: [140, -25], zoom: 2.5 },
};

const ContinentFilter = ({ selected, onSelect, onZoom }: ContinentFilterProps) => {
  return (
    <div
      className="absolute top-14 right-6 z-10 flex flex-wrap gap-1 max-w-xs justify-end"
      onClick={(e) => e.stopPropagation()}
    >
      {CONTINENTS.map((c) => (
        <button
          key={c}
          onClick={() => { onSelect(c); const v = CONTINENT_VIEWS[c]; onZoom(v.center, v.zoom); }}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors ${
            selected === c
              ? "bg-map-highlight text-map-ocean border-map-highlight"
              : "bg-map-ocean/90 text-map-highlight border-map-border hover:bg-map-border/50"
          }`}
        >
          {c === "All" && <Globe className="w-3 h-3 inline mr-1" />}
          {c}
        </button>
      ))}
    </div>
  );
};

export default ContinentFilter;
