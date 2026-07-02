'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import {
  HelpCircle,
  Users,
  Target,
  Search,
  Lightbulb,
  Presentation,
  Settings,
  Headphones,
  ClipboardCheck,
  MessageSquareMore,
  Handshake,
  RotateCcw,
  CheckCircle,
  XCircle,
  FileText,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import {
  METHODOLOGY_STEPS,
  DECISION_POINT,
  REVISE_STEP,
  KEY_BENEFITS,
  type MethodologyStep,
  type ReviseStep,
} from '@/lib/consulting-methodology';

const ICON_MAP: Record<string, LucideIcon> = {
  HelpCircle,
  Users,
  Target,
  Search,
  Lightbulb,
  Presentation,
  Settings,
  Headphones,
  ClipboardCheck,
  MessageSquareMore,
  Handshake,
  RotateCcw,
};

const WHEEL_ITEMS = [...METHODOLOGY_STEPS, REVISE_STEP];
const TOTAL_NODES = WHEEL_ITEMS.length;
const DEG_PER_NODE = 360 / TOTAL_NODES;

const ConsultingMethodology = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [wheelReady, setWheelReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setWheelReady(true), 100);
        }
      },
      { threshold: 0.15 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleEnter = useCallback((idx: number) => setActiveIndex(idx), []);
  const handleLeave = useCallback(() => setActiveIndex(null), []);

  const activeItem = activeIndex !== null ? WHEEL_ITEMS[activeIndex] : null;
  const isStep = (item: MethodologyStep | ReviseStep): item is MethodologyStep =>
    'stepNumber' in item && item.stepNumber >= 1 && item.stepNumber <= 11;

  return (
    <section
      ref={sectionRef}
      id="consulting-methodology"
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Layout: Wheel + Detail Panel */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          {/* ── Process Wheel ── */}
          <div
            className={`relative flex-shrink-0 ${isVisible ? 'wheel-rotate-in' : 'opacity-0'}`}
            style={{ width: 'min(100%, 520px)', aspectRatio: '1 / 1' }}
          >
            {/* Orbital ring guide */}
            <div className="absolute inset-[10%] rounded-full orbital-ring" />

            {/* Central Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28%] h-[28%] rounded-full bg-gradient-to-br from-hrc-blue to-hrc-red flex items-center justify-center shadow-2xl z-10 methodology-center-text">
              <div className="text-center text-white px-2">
                <div className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider leading-tight">
                  Consulting<br />Methodology
                </div>
              </div>
            </div>

            {/* Orbital Nodes */}
            {WHEEL_ITEMS.map((item, idx) => {
              const angle = idx * DEG_PER_NODE - 90;
              const rad = (angle * Math.PI) / 180;
              const radius = 38;
              const cx = 50 + radius * Math.cos(rad);
              const cy = 50 + radius * Math.sin(rad);
              const isActive = activeIndex === idx;
              const IconComp = ICON_MAP[item.icon] || HelpCircle;

              return (
                <div
                  key={item.id}
                  className={`absolute group cursor-pointer transition-all duration-300 ease-out ${
                    wheelReady ? 'wheel-segment-pulse' : 'opacity-0'
                  } ${isActive ? 'wheel-segment-active' : ''}`}
                  style={{
                    left: `${cx}%`,
                    top: `${cy}%`,
                    transform: 'translate(-50%, -50%)',
                    animationDelay: `${idx * 200}ms`,
                    zIndex: isActive ? 20 : 1,
                  }}
                  onMouseEnter={() => handleEnter(idx)}
                  onMouseLeave={handleLeave}
                  onFocus={() => handleEnter(idx)}
                  onBlur={handleLeave}
                  tabIndex={0}
                  role="button"
                  aria-label={`Step ${item.stepNumber}: ${item.title}`}
                >
                  {/* Node circle */}
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center shadow-lg border-3 border-white transition-all duration-300"
                    style={{
                      backgroundColor: item.color,
                      borderWidth: '3px',
                      borderColor: isActive ? '#fff' : 'rgba(255,255,255,0.8)',
                    }}
                  >
                    <IconComp
                      size={18}
                      className="text-white sm:hidden"
                      strokeWidth={2.2}
                    />
                    <IconComp
                      size={22}
                      className="text-white hidden sm:block md:hidden"
                      strokeWidth={2.2}
                    />
                    <IconComp
                      size={26}
                      className="text-white hidden md:block"
                      strokeWidth={2}
                    />
                  </div>

                  {/* Label */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center transition-all duration-300 ${
                      isActive
                        ? 'opacity-100 scale-105'
                        : 'opacity-70 group-hover:opacity-100'
                    }`}
                    style={{
                      top: cy > 50 ? '-28px' : 'calc(100% + 4px)',
                    }}
                  >
                    <span
                      className={`font-bold leading-tight block ${
                        isActive
                          ? 'text-[9px] sm:text-[10px] md:text-xs'
                          : 'text-[8px] sm:text-[9px] md:text-[10px]'
                      }`}
                      style={{ color: item.color }}
                    >
                      {item.shortLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Detail Panel ── */}
          <div className="flex-1 min-w-0 w-full lg:w-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 min-h-[340px] sm:min-h-[400px] flex flex-col detail-content-transition">
              {activeItem ? (
                <DetailContent
                  key={activeItem.id}
                  item={activeItem}
                  isStep={isStep(activeItem)}
                />
              ) : (
                <WelcomeContent />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Welcome State ── */
function WelcomeContent() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center detail-panel-enter">
      <div className="w-16 h-16 rounded-full bg-hrc-blue/10 flex items-center justify-center mb-5">
        <HelpCircle size={32} className="text-hrc-blue" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-hrc-blue mb-3">
        Explore Our Consulting Approach
      </h3>
      <p className="text-gray-500 text-sm sm:text-base max-w-md leading-relaxed">
        Hover over any step in the process wheel to learn more about our proven 11-step consulting methodology.
      </p>
      <div className="mt-6 flex items-center gap-2 text-hrc-red text-xs font-semibold uppercase tracking-wider">
        <span>Start from Step 1</span>
        <ChevronRight size={14} />
      </div>
    </div>
  );
}

/* ── Step Detail Content ── */
function DetailContent({
  item,
  isStep,
}: {
  item: MethodologyStep | ReviseStep;
  isStep: boolean;
}) {
  const step = item as MethodologyStep;

  return (
    <div className="flex-1 detail-panel-enter">
      {/* Step Badge */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
          style={{ backgroundColor: item.color }}
        >
          {isStep ? step.stepNumber : (
            <RotateCcw size={18} />
          )}
        </div>
        <div>
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: item.color }}
          >
            {isStep ? `Step ${step.stepNumber}` : 'Loop Back'}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-hrc-blue mb-3 leading-tight">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
        {step.description}
      </p>

      {/* Sub-points (Step 2) */}
      {step.subPoints && step.subPoints.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
            Key Activities
          </h4>
          <ul className="space-y-2">
            {step.subPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle
                  size={16}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: step.color }}
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dossier Callout (Step 2) */}
      {step.dossier && (
        <div
          className="rounded-xl p-4 mt-3 border-l-4"
          style={{
            backgroundColor: step.colorLight,
            borderColor: step.color,
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <FileText size={16} style={{ color: step.color }} />
            <span className="font-bold text-sm" style={{ color: step.color }}>
              {step.dossier.title}
            </span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {step.dossier.description}
          </p>
        </div>
      )}

      {/* Decision Point (Step 6) */}
      {isStep && step.stepNumber === 6 && (
        <div className="mt-5">
          <DecisionDiamond />
        </div>
      )}

      {/* Revise Step Callout */}
      {!isStep && (
        <div className="mt-4 rounded-xl p-4 bg-orange-50 border border-orange-200">
          <div className="flex items-center gap-2 mb-1">
            <RotateCcw size={16} className="text-orange-500" />
            <span className="font-bold text-sm text-orange-700">Loop Back</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            If approval is denied, the proposal is revised and resubmitted. This ensures the final plan fully aligns with client expectations.
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Decision Diamond (shown after Step 6) ── */
function DecisionDiamond() {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
        {DECISION_POINT.title}
      </h4>
      <div className="flex flex-col items-center gap-3">
        {/* Diamond */}
        <div className="decision-diamond w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-sm text-center leading-tight -rotate-0">
            {DECISION_POINT.question}
          </span>
        </div>
        {/* YES / NO paths */}
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1 bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <CheckCircle size={14} className="text-green-600" />
              <span className="text-green-700 font-bold text-xs">YES</span>
            </div>
            <p className="text-[10px] text-gray-600 leading-snug">
              {DECISION_POINT.yesLabel}
            </p>
          </div>
          <div className="flex-1 bg-red-50 border border-red-200 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <XCircle size={14} className="text-red-500" />
              <span className="text-red-600 font-bold text-xs">NO</span>
            </div>
            <p className="text-[10px] text-gray-600 leading-snug">
              {DECISION_POINT.noLabel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultingMethodology;
