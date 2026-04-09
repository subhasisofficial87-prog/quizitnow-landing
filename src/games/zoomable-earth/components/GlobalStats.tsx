import { useMemo, useState } from "react";
import { countryData } from "@/data/countryData";
import { BarChart3, Users, DollarSign, Globe, ChevronDown, ChevronUp } from "lucide-react";

const parsePopNum = (p: string) => parseInt(p.replace(/,/g, ""), 10) || 0;

const formatLargeNumber = (n: number): string => {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  return n.toLocaleString();
};

const GlobalStats = () => {
  const [expanded, setExpanded] = useState(false);

  const stats = useMemo(() => {
    const entries = Object.values(countryData);
    const totalPop = entries.reduce((sum, c) => sum + parsePopNum(c.population), 0);
    const avgGdp = Math.round(entries.reduce((sum, c) => sum + c.gdpPerCapita, 0) / entries.length);
    const maxGdp = entries.reduce((best, c) => (c.gdpPerCapita > best.gdpPerCapita ? c : best));
    const minGdp = entries.reduce((best, c) => (c.gdpPerCapita < best.gdpPerCapita ? c : best));
    const mostPopulous = entries.reduce((best, c) => (parsePopNum(c.population) > parsePopNum(best.population) ? c : best));
    const currencies = new Set(entries.map((c) => c.currencyCode)).size;

    return { count: entries.length, totalPop, avgGdp, maxGdp, minGdp, mostPopulous, currencies };
  }, []);

  return (
    <div
      className="absolute top-28 left-6 z-10 w-52 rounded-xl border border-map-border bg-map-tooltip-bg/95 backdrop-blur-md shadow-lg animate-fade-in"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold text-map-highlight"
      >
        <span className="flex items-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5" /> Global Stats
        </span>
        {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-2.5 animate-fade-in">
          <StatItem
            icon={<Globe className="w-3.5 h-3.5 text-map-highlight" />}
            label="Countries"
            value={stats.count.toString()}
          />
          <StatItem
            icon={<Users className="w-3.5 h-3.5 text-map-highlight" />}
            label="World Population"
            value={formatLargeNumber(stats.totalPop)}
          />
          <StatItem
            icon={<DollarSign className="w-3.5 h-3.5 text-map-highlight" />}
            label="Avg GDP/Capita"
            value={`$${stats.avgGdp.toLocaleString()}`}
          />

          <div className="border-t border-map-border pt-2 space-y-1.5">
            <MiniRow label="Highest GDP" value={`${stats.maxGdp.name} ($${stats.maxGdp.gdpPerCapita.toLocaleString()})`} />
            <MiniRow label="Lowest GDP" value={`${stats.minGdp.name} ($${stats.minGdp.gdpPerCapita.toLocaleString()})`} />
            <MiniRow label="Most Populous" value={`${stats.mostPopulous.name} (${formatLargeNumber(parsePopNum(stats.mostPopulous.population))})`} />
            <MiniRow label="Currencies" value={stats.currencies.toString()} />
          </div>
        </div>
      )}
    </div>
  );
};

const StatItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-2">
    {icon}
    <div>
      <p className="text-[10px] text-muted-foreground leading-none">{label}</p>
      <p className="text-sm font-bold text-primary-foreground">{value}</p>
    </div>
  </div>
);

const MiniRow = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[10px] text-muted-foreground">{label}</p>
    <p className="text-[11px] font-medium text-primary-foreground">{value}</p>
  </div>
);

export default GlobalStats;
