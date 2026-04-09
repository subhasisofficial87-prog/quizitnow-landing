import { useState, useCallback, useRef, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { countryData, getCountryColor, getHeatmapColor, getGdpHeatmapColor } from "@/data/countryData";
import { countryCoordinates } from "@/data/countryCoordinates";
import { countryContinentMap, type Continent } from "@/data/continentData";
import CountryTooltip from "./CountryTooltip";
import CountrySearch from "./CountrySearch";
import MapLegend, { type MapMode } from "./MapLegend";
import ContinentFilter from "./ContinentFilter";
import CountryComparison from "./CountryComparison";
import TimelineLegend from "./TimelineLegend";
import GlobalStats from "./GlobalStats";
import { GitCompareArrows, Sun, Moon } from "lucide-react";
import type { CountryInfo } from "@/data/countryData";
import TimelineSlider from "./TimelineSlider";
import { getRulingEntity, getEmpireColor, TIMELINE_PERIODS } from "@/data/historicalData";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const numericToAlpha3: Record<string, string> = {
  "004":"AFG","008":"ALB","012":"DZA","024":"AGO","032":"ARG","036":"AUS","040":"AUT",
  "050":"BGD","056":"BEL","064":"BTN","068":"BOL","070":"BIH","072":"BWA","076":"BRA",
  "100":"BGR","104":"MMR","108":"BDI","112":"BLR","116":"KHM","120":"CMR","124":"CAN",
  "140":"CAF","144":"LKA","148":"TCD","152":"CHL","156":"CHN","170":"COL","178":"COG",
  "180":"COD","188":"CRI","191":"HRV","192":"CUB","196":"CYP","203":"CZE","208":"DNK",
  "214":"DOM","218":"ECU","818":"EGY","222":"SLV","226":"GNQ","232":"ERI","233":"EST",
  "231":"ETH","242":"FJI","246":"FIN","250":"FRA","260":"ATF","266":"GAB","270":"GMB",
  "268":"GEO","276":"DEU","288":"GHA","300":"GRC","304":"GRL","320":"GTM","324":"GIN",
  "328":"GUY","332":"HTI","340":"HND","348":"HUN","352":"ISL","356":"IND","360":"IDN",
  "364":"IRN","368":"IRQ","372":"IRL","376":"ISR","380":"ITA","388":"JAM","392":"JPN",
  "400":"JOR","398":"KAZ","404":"KEN","408":"PRK","410":"KOR","414":"KWT","417":"KGZ",
  "418":"LAO","422":"LBN","426":"LSO","430":"LBR","434":"LBY","440":"LTU","442":"LUX",
  "450":"MDG","454":"MWI","458":"MYS","466":"MLI","478":"MRT","484":"MEX","496":"MNG",
  "498":"MDA","499":"MNE","504":"MAR","508":"MOZ","516":"NAM","524":"NPL","528":"NLD",
  "540":"NCL","554":"NZL","558":"NIC","562":"NER","566":"NGA","578":"NOR","512":"OMN",
  "586":"PAK","591":"PAN","598":"PNG","600":"PRY","604":"PER","608":"PHL","616":"POL",
  "620":"PRT","630":"PRI","634":"QAT","642":"ROU","643":"RUS","646":"RWA","682":"SAU",
  "686":"SEN","688":"SRB","694":"SLE","702":"SGP","703":"SVK","705":"SVN","706":"SOM",
  "710":"ZAF","724":"ESP","729":"SDN","740":"SUR","748":"SWZ","752":"SWE",
  "756":"CHE","760":"SYR","762":"TJK","834":"TZA","764":"THA","768":"TGO","780":"TTO",
  "788":"TUN","792":"TUR","795":"TKM","800":"UGA","804":"UKR","784":"ARE","826":"GBR",
  "840":"USA","858":"URY","860":"UZB","862":"VEN","704":"VNM","887":"YEM","894":"ZMB",
  "716":"ZWE","275":"PSE","90":"SLB","262":"DJI","204":"BEN","854":"BFA","624":"GNB",
  "728":"SSD",
};

function getCountryFill(
  alpha3: string,
  index: number,
  mapMode: MapMode,
  continent: Continent,
  timelineActive?: boolean,
  timelineYear?: number,
  highlightedEmpire?: string | null
): string {
  const dimmed = "hsl(210, 15%, 22%)";
  const inContinent = continent === "All" || countryContinentMap[alpha3] === continent;

  if (!inContinent) return dimmed;

  if (timelineActive && timelineYear !== undefined) {
    const entity = getRulingEntity(alpha3, timelineYear);
    if (highlightedEmpire && entity !== highlightedEmpire) return dimmed;
    return getEmpireColor(entity);
  }

  if (mapMode === "heatmap") return getHeatmapColor(alpha3);
  if (mapMode === "gdp") return getGdpHeatmapColor(alpha3);
  return getCountryColor(index);
}

const WorldMap = () => {
  const [tooltipData, setTooltipData] = useState<{
    info: CountryInfo;
    code: string;
    x: number;
    y: number;
  } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 20]);
  const [mapMode, setMapMode] = useState<MapMode>("default");
  const [continent, setContinent] = useState<Continent>("All");
  const [showComparison, setShowComparison] = useState(false);
  const [timelineActive, setTimelineActive] = useState(false);
  const [timelinePeriod, setTimelinePeriod] = useState(TIMELINE_PERIODS.length - 1);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [highlightedEmpire, setHighlightedEmpire] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCountryClick = useCallback(
    (geo: any, event: React.MouseEvent) => {
      const id = geo.id || geo.properties?.["ISO_A3"];
      const alpha3 = numericToAlpha3[id] || id;
      const info = countryData[alpha3];
      if (info) {
        const rect = containerRef.current?.getBoundingClientRect();
        const x = event.clientX - (rect?.left || 0);
        const y = event.clientY - (rect?.top || 0);
        setTooltipData({ info, code: alpha3, x, y });
      }
    },
    []
  );

  const handleZoomIn = () => setZoom((z) => Math.min(z * 1.5, 8));
  const handleZoomOut = () => setZoom((z) => Math.max(z / 1.5, 1));
  const handleReset = () => {
    setZoom(1);
    setCenter([0, 20]);
  };

  const handleSearchSelect = useCallback((code: string) => {
    const coords = countryCoordinates[code];
    if (coords) {
      setCenter(coords);
      setZoom(4);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setTooltipData(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Clear highlighted empire when timeline is toggled off
  useEffect(() => {
    if (!timelineActive) setHighlightedEmpire(null);
  }, [timelineActive]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-map-bg overflow-hidden"
    >
      {/* Search */}
      <CountrySearch onSelectCountry={handleSearchSelect} />

      {/* Header */}
      <div className="absolute top-14 left-0 z-10 flex items-center gap-3 px-6 py-2">
        <h1 className="text-2xl font-bold tracking-tight text-map-highlight">
          World Explorer
        </h1>
        <button
          onClick={(e) => { e.stopPropagation(); setShowComparison((v) => !v); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            showComparison
              ? "bg-map-highlight text-map-ocean border-map-highlight"
              : "bg-map-ocean/90 text-map-highlight border-map-border hover:bg-map-border/50"
          }`}
        >
          <GitCompareArrows className="w-3.5 h-3.5" /> Compare
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setDarkMode((v) => !v); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors bg-map-ocean/90 text-map-highlight border-map-border hover:bg-map-border/50"
        >
          {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>

      {/* Continent Filter */}
      <ContinentFilter selected={continent} onSelect={setContinent} onZoom={(c, z) => { setCenter(c); setZoom(z); }} />

      {/* Global Stats */}
      <GlobalStats />

      {/* Country Comparison */}
      {showComparison && (
        <CountryComparison onClose={() => setShowComparison(false)} />
      )}

      {/* Zoom Controls */}
      <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 rounded-lg bg-map-ocean text-map-highlight border border-map-border flex items-center justify-center text-lg font-bold hover:bg-map-border transition-colors"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 rounded-lg bg-map-ocean text-map-highlight border border-map-border flex items-center justify-center text-lg font-bold hover:bg-map-border transition-colors"
        >
          −
        </button>
        <button
          onClick={handleReset}
          className="w-10 h-10 rounded-lg bg-map-ocean text-map-highlight border border-map-border flex items-center justify-center text-xs font-medium hover:bg-map-border transition-colors"
        >
          ⟲
        </button>
      </div>

      {/* Map */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 140, center: [0, 30] }}
        className="w-full h-full"
        style={{ background: "hsl(210, 40%, 18%)" }}
      >
        <ZoomableGroup
          zoom={zoom}
          center={center}
          onMoveEnd={({ coordinates, zoom: z }) => {
            setCenter(coordinates as [number, number]);
            setZoom(z);
          }}
          maxZoom={8}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo, i) => {
                const id = geo.id || geo.properties?.["ISO_A3"];
                const alpha3 = numericToAlpha3[id] || id;
                const fillColor = getCountryFill(alpha3, i, mapMode, continent, timelineActive, TIMELINE_PERIODS[timelinePeriod].year, highlightedEmpire);
                const isDimmed = continent !== "All" && countryContinentMap[alpha3] !== continent;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCountryClick(geo, e);
                    }}
                    onMouseEnter={() => setHoveredCountry(alpha3)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    style={{
                      default: {
                        fill: fillColor,
                        stroke: "hsl(210, 20%, 25%)",
                        strokeWidth: 0.5,
                        outline: "none",
                        opacity: isDimmed ? 0.4 : 1,
                        transition: "fill 0.6s ease, opacity 0.4s ease",
                      },
                      hover: {
                        fill: isDimmed ? fillColor : "hsl(45, 90%, 55%)",
                        stroke: isDimmed ? "hsl(210, 20%, 25%)" : "hsl(45, 90%, 70%)",
                        strokeWidth: isDimmed ? 0.5 : 1,
                        outline: "none",
                        cursor: isDimmed ? "default" : "pointer",
                        opacity: isDimmed ? 0.4 : 1,
                      },
                      pressed: {
                        fill: isDimmed ? fillColor : "hsl(45, 90%, 45%)",
                        outline: "none",
                        opacity: isDimmed ? 0.4 : 1,
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Bottom-left controls */}
      <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-2">
        <TimelineSlider
          active={timelineActive}
          onToggle={() => setTimelineActive((v) => !v)}
          periodIndex={timelinePeriod}
          onPeriodChange={setTimelinePeriod}
          hoveredCountry={hoveredCountry}
        />
        {!timelineActive && <MapLegend mode={mapMode} onToggle={(mode) => setMapMode(mode)} />}
      </div>

      {/* Timeline Legend */}
      {timelineActive && <TimelineLegend periodIndex={timelinePeriod} highlightedEmpire={highlightedEmpire} onHighlightEmpire={setHighlightedEmpire} />}

      {/* Tooltip */}
      {tooltipData && (
        <CountryTooltip
          info={tooltipData.info}
          countryCode={tooltipData.code}
          x={tooltipData.x}
          y={tooltipData.y}
          onClose={() => setTooltipData(null)}
          timelineActive={timelineActive}
          timelineYear={TIMELINE_PERIODS[timelinePeriod].year}
        />
      )}
    </div>
  );
};

export default WorldMap;
