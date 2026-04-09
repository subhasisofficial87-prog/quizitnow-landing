import { useState, useMemo } from "react";
import { countryData, type CountryInfo } from "@/data/countryData";
import { X, GitCompareArrows } from "lucide-react";
import { getFlag } from "@/data/countryFlags";

interface CountryComparisonProps {
  onClose: () => void;
}

const allCountries = Object.entries(countryData).sort((a, b) =>
  a[1].name.localeCompare(b[1].name)
);

const parsePopNum = (p: string) => parseInt(p.replace(/,/g, ""), 10) || 0;

const StatRow = ({
  label,
  a,
  b,
  highlight,
}: {
  label: string;
  a: string;
  b: string;
  highlight?: "a" | "b" | null;
}) => (
  <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center text-sm py-1.5 border-b border-map-border/30 last:border-0">
    <span className={`text-right font-medium ${highlight === "a" ? "text-map-highlight" : "text-primary-foreground"}`}>
      {a}
    </span>
    <span className="text-muted-foreground text-xs text-center min-w-[80px]">{label}</span>
    <span className={`text-left font-medium ${highlight === "b" ? "text-map-highlight" : "text-primary-foreground"}`}>
      {b}
    </span>
  </div>
);

const CountryComparison = ({ onClose }: CountryComparisonProps) => {
  const [codeA, setCodeA] = useState("");
  const [codeB, setCodeB] = useState("");

  const infoA = codeA ? countryData[codeA] : null;
  const infoB = codeB ? countryData[codeB] : null;

  const rows = useMemo(() => {
    if (!infoA || !infoB) return null;
    const popA = parsePopNum(infoA.population);
    const popB = parsePopNum(infoB.population);
    return [
      { label: "Capital", a: infoA.capital, b: infoB.capital },
      { label: "Population", a: infoA.population, b: infoB.population, highlight: popA > popB ? "a" as const : popB > popA ? "b" as const : null },
      { label: "GDP/Capita", a: `$${infoA.gdpPerCapita.toLocaleString()}`, b: `$${infoB.gdpPerCapita.toLocaleString()}`, highlight: infoA.gdpPerCapita > infoB.gdpPerCapita ? "a" as const : infoB.gdpPerCapita > infoA.gdpPerCapita ? "b" as const : null },
      { label: "Currency", a: `${infoA.currencyCode}`, b: `${infoB.currencyCode}` },
      { label: "1 USD =", a: infoA.currencyCode === "USD" ? "—" : `${(1 / parseFloat(infoA.usdValue)).toFixed(2)} ${infoA.currencyCode}`, b: infoB.currencyCode === "USD" ? "—" : `${(1 / parseFloat(infoB.usdValue)).toFixed(2)} ${infoB.currencyCode}` },
    ];
  }, [infoA, infoB]);

  return (
    <div
      className="absolute top-14 left-1/2 -translate-x-1/2 z-30 w-[420px] max-w-[95vw] rounded-xl border border-map-tooltip-border bg-map-tooltip-bg/95 backdrop-blur-md shadow-2xl p-5 animate-in fade-in zoom-in-95 duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-muted-foreground hover:text-map-highlight transition-colors"
      >
        <X size={16} />
      </button>

      <h3 className="text-sm font-bold text-map-highlight mb-4 flex items-center gap-2">
        <GitCompareArrows className="w-4 h-4" /> Compare Countries
      </h3>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <select
          value={codeA}
          onChange={(e) => setCodeA(e.target.value)}
          className="h-9 rounded-lg bg-map-ocean border border-map-border text-map-highlight text-sm px-2 focus:outline-none focus:ring-1 focus:ring-map-highlight/50"
        >
          <option value="">Select country...</option>
          {allCountries.map(([code, info]) => (
            <option key={code} value={code}>{getFlag(code)} {info.name}</option>
          ))}
        </select>
        <select
          value={codeB}
          onChange={(e) => setCodeB(e.target.value)}
          className="h-9 rounded-lg bg-map-ocean border border-map-border text-map-highlight text-sm px-2 focus:outline-none focus:ring-1 focus:ring-map-highlight/50"
        >
          <option value="">Select country...</option>
          {allCountries.map(([code, info]) => (
            <option key={code} value={code}>{getFlag(code)} {info.name}</option>
          ))}
        </select>
      </div>

      {infoA && infoB && (
        <div>
          <div className="grid grid-cols-[1fr_auto_1fr] gap-2 mb-2">
            <p className="text-right text-sm font-bold text-map-highlight">{getFlag(codeA)} {infoA.name}</p>
            <span className="text-muted-foreground text-xs text-center min-w-[80px]">vs</span>
            <p className="text-left text-sm font-bold text-map-highlight">{getFlag(codeB)} {infoB.name}</p>
          </div>
          {rows?.map((r, i) => (
            <StatRow key={i} label={r.label} a={r.a} b={r.b} highlight={r.highlight} />
          ))}
        </div>
      )}

      {(!infoA || !infoB) && (
        <p className="text-xs text-muted-foreground text-center py-2">
          Select two countries to compare their statistics
        </p>
      )}
    </div>
  );
};

export default CountryComparison;
