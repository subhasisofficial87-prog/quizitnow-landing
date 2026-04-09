import { useState, useMemo } from "react";
import { Clock, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { TIMELINE_PERIODS, getRulingEntity, getEmpireColor } from "@/data/historicalData";
import { useEffect, useRef } from "react";

interface TimelineSliderProps {
  active: boolean;
  onToggle: () => void;
  periodIndex: number;
  onPeriodChange: (index: number) => void;
  hoveredCountry?: string | null;
}

const TimelineSlider = ({
  active,
  onToggle,
  periodIndex,
  onPeriodChange,
  hoveredCountry,
}: TimelineSliderProps) => {
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const period = TIMELINE_PERIODS[periodIndex];

  // Auto-play through periods
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        onPeriodChange(
          periodIndex < TIMELINE_PERIODS.length - 1 ? periodIndex + 1 : 0
        );
      }, 1500);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, periodIndex, onPeriodChange]);

  // Stop playing when deactivated
  useEffect(() => {
    if (!active) setPlaying(false);
  }, [active]);

  const rulerInfo = useMemo(() => {
    if (!hoveredCountry || !active) return null;
    const entity = getRulingEntity(hoveredCountry, period.year);
    return { entity, color: getEmpireColor(entity) };
  }, [hoveredCountry, active, period]);

  const formatYear = (year: number) => {
    if (year < 0) return `${Math.abs(year)} BC`;
    return `${year} AD`;
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors mb-2 ${
          active
            ? "bg-map-highlight text-map-ocean border-map-highlight"
            : "bg-map-ocean/90 text-map-highlight border-map-border hover:bg-map-border/50"
        }`}
      >
        <Clock className="w-3.5 h-3.5" /> Timeline
      </button>

      {/* Slider Panel */}
      {active && (
        <div className="w-[420px] rounded-xl border border-map-border bg-map-tooltip-bg/95 backdrop-blur-md shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Period Label */}
          <div className="text-center mb-3">
            <span className="text-map-highlight font-bold text-sm">
              {period.label}
            </span>
          </div>

          {/* Slider */}
          <div className="px-1 mb-3">
            <input
              type="range"
              min={0}
              max={TIMELINE_PERIODS.length - 1}
              value={periodIndex}
              onChange={(e) => onPeriodChange(Number(e.target.value))}
              className="w-full h-1.5 bg-map-border rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-map-highlight [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:shadow-md"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>{formatYear(TIMELINE_PERIODS[0].year)}</span>
              <span>{formatYear(TIMELINE_PERIODS[TIMELINE_PERIODS.length - 1].year)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <button
              onClick={() => onPeriodChange(Math.max(0, periodIndex - 1))}
              className="p-1.5 rounded-md bg-map-ocean text-map-highlight border border-map-border hover:bg-map-border/50 transition-colors"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setPlaying(!playing)}
              className="p-1.5 rounded-md bg-map-highlight text-map-ocean hover:opacity-90 transition-colors"
            >
              {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() =>
                onPeriodChange(Math.min(TIMELINE_PERIODS.length - 1, periodIndex + 1))
              }
              className="p-1.5 rounded-md bg-map-ocean text-map-highlight border border-map-border hover:bg-map-border/50 transition-colors"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Hovered country ruler info */}
          {rulerInfo && (
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-map-border">
              <div
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: rulerInfo.color }}
              />
              <span className="text-xs text-primary-foreground truncate">
                {rulerInfo.entity}
              </span>
            </div>
          )}

          {/* Period dots */}
          <div className="flex justify-between mt-3 px-0.5">
            {TIMELINE_PERIODS.map((p, i) => (
              <button
                key={p.year}
                onClick={() => onPeriodChange(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === periodIndex
                    ? "bg-map-highlight scale-125"
                    : "bg-map-border hover:bg-muted-foreground"
                }`}
                title={p.label}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineSlider;
