import { useState, useRef, useEffect, useMemo } from "react";
import { Search, X } from "lucide-react";
import { countryData } from "@/data/countryData";
import { getFlag } from "@/data/countryFlags";

interface CountrySearchProps {
  onSelectCountry: (code: string) => void;
}

const CountrySearch = ({ onSelectCountry }: CountrySearchProps) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return Object.entries(countryData)
      .filter(([, info]) => info.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-72" onClick={(e) => e.stopPropagation()}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search country..."
          className="w-full h-9 pl-9 pr-8 rounded-lg bg-map-ocean/90 backdrop-blur-sm text-map-highlight text-sm border border-map-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-map-highlight/50"
        />
        {query && (
          <button onClick={() => { setQuery(""); setOpen(false); }} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-map-highlight">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {open && results.length > 0 && (
        <div className="mt-1 rounded-lg bg-map-ocean/95 backdrop-blur-sm border border-map-border overflow-hidden shadow-lg">
          {results.map(([code, info]) => (
            <button
              key={code}
              className="w-full text-left px-3 py-2 text-sm text-map-highlight hover:bg-map-border/50 transition-colors"
              onClick={() => {
                onSelectCountry(code);
                setQuery("");
                setOpen(false);
              }}
            >
              <span className="mr-1.5">{getFlag(code)}</span>
              {info.name}
              <span className="ml-2 text-xs text-muted-foreground">{info.capital}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountrySearch;
