"use client";

import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Loader2,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dialog } from "@/components/ui/dialog";
import { hackathons, highlightAchievements, leadership, participation } from "@/lib/data/achievements";
import { certificateAssets } from "@/lib/data/assets";
import { cn } from "@/lib/utils";
import { achievementItem, compact, type ViewerItem } from "@/lib/viewer";

type ViewerContext = { open: (item: ViewerItem, list?: ViewerItem[]) => void };

const Ctx = createContext<ViewerContext | null>(null);

export function useCertificateViewer() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCertificateViewer must be used inside CertificateViewerProvider");
  return ctx;
}

const ZOOM_STEPS = [1, 1.5, 2, 3];

export function CertificateViewerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  // Kept after closing so the exit animation still has content.
  const [view, setView] = useState<{ list: ViewerItem[]; index: number } | null>(null);

  const open = useCallback((item: ViewerItem, list?: ViewerItem[]) => {
    const items = list && list.some((i) => i.id === item.id) ? list : [item];
    setView({ list: items, index: items.findIndex((i) => i.id === item.id) });
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        labelledBy="certificate-viewer-title"
        className="items-stretch justify-center p-0 sm:p-4 lg:p-6"
      >
        {view && (
          <Lightbox
            key={view.list[view.index].id}
            item={view.list[view.index]}
            position={view.list.length > 1 ? { index: view.index, total: view.list.length } : undefined}
            onNavigate={(dir) =>
              setView((v) => (v ? { ...v, index: (v.index + dir + v.list.length) % v.list.length } : v))
            }
            onClose={() => setIsOpen(false)}
          />
        )}
      </Dialog>
    </Ctx.Provider>
  );
}

function Lightbox({
  item,
  position,
  onNavigate,
  onClose,
}: {
  item: ViewerItem;
  position?: { index: number; total: number };
  onNavigate: (dir: 1 | -1) => void;
  onClose: () => void;
}) {
  const asset = certificateAssets[item.asset];
  const extension = asset.file.split(".").pop();
  const [zoomIndex, setZoomIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const zoom = ZOOM_STEPS[zoomIndex];

  // Fit the page inside the stage, then scale for zoom levels.
  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pad = 32;
  const ratio = asset.width / asset.height;
  const fitW = Math.max(0, Math.min(box.w - pad, (box.h - pad) * ratio));
  const width = Math.round(fitW * zoom);
  const height = Math.round(width / ratio);

  const setZoom = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(ZOOM_STEPS.length - 1, next));
      if (clamped === zoomIndex) return;
      const el = stage.current;
      if (el) {
        // Keep the view centred on the same point while zooming.
        const factor = ZOOM_STEPS[clamped] / ZOOM_STEPS[zoomIndex];
        const cx = el.scrollLeft + el.clientWidth / 2;
        const cy = el.scrollTop + el.clientHeight / 2;
        requestAnimationFrame(() => {
          el.scrollLeft = cx * factor - el.clientWidth / 2;
          el.scrollTop = cy * factor - el.clientHeight / 2;
        });
      }
      setZoomIndex(clamped);
    },
    [zoomIndex]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLElement && e.target.closest("input, textarea")) return;
      if (e.key === "ArrowRight" && position) onNavigate(1);
      else if (e.key === "ArrowLeft" && position) onNavigate(-1);
      else if (e.key === "+" || e.key === "=") setZoom(zoomIndex + 1);
      else if (e.key === "-" || e.key === "_") setZoom(zoomIndex - 1);
      else if (e.key === "0") setZoom(0);
      else return;
      e.preventDefault();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNavigate, position, setZoom, zoomIndex]);

  const zoomed = zoomIndex > 0;

  return (
    <div className="pointer-events-auto flex h-full w-full max-w-6xl flex-col overflow-hidden border-line bg-paper-raised shadow-lift sm:rounded-3xl sm:border">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-line px-4 py-3 sm:px-5">
        <div className="min-w-0 flex-1">
          <h2 id="certificate-viewer-title" className="truncate font-display text-lg leading-tight sm:text-xl">
            {item.title}
          </h2>
          <p className="truncate text-xs text-ink-soft sm:text-sm">
            {item.subtitle}
            {item.date && <span className="text-ink-faint"> · {item.date}</span>}
            {position && (
              <span className="ml-2 font-mono text-[11px] text-ink-faint">
                {position.index + 1} / {position.total}
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center rounded-full border border-line">
            <ToolButton label="Zoom out" onClick={() => setZoom(zoomIndex - 1)} disabled={zoomIndex === 0}>
              <ZoomOut size={16} />
            </ToolButton>
            <span className="hidden w-12 text-center font-mono text-[11px] text-ink-soft sm:inline-block" aria-live="polite">
              {Math.round(zoom * 100)}%
            </span>
            <ToolButton label="Zoom in" onClick={() => setZoom(zoomIndex + 1)} disabled={zoomIndex === ZOOM_STEPS.length - 1}>
              <ZoomIn size={16} />
            </ToolButton>
            <span className="hidden sm:flex">
              <ToolButton label="Reset zoom" onClick={() => setZoom(0)} disabled={!zoomed}>
                <RotateCcw size={15} />
              </ToolButton>
            </span>
          </div>
          <a
            href={asset.file}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-[13px] font-semibold text-ink transition-colors hover:border-accent/60 hover:text-accent"
          >
            <ExternalLink size={14} />
            <span>Open</span>
            <span className="sr-only">certificate in a new tab</span>
          </a>
          <a
            href={asset.file}
            download={`Shivani-Kapase-${item.asset}.${extension}`}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-3 text-[13px] font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Download</span>
            <span className="sr-only sm:hidden">Download certificate</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            data-autofocus=""
            aria-label="Close certificate viewer"
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-accent/60 hover:text-accent"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* Stage */}
      <div className="relative min-h-0 flex-1">
        <div
          ref={stage}
          tabIndex={0}
          role="region"
          aria-label="Certificate preview — scroll or drag to pan when zoomed"
          className={cn(
            "dot-grid absolute inset-0 overflow-auto overscroll-contain focus-visible:outline-offset-[-4px]",
            zoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
          )}
          onDoubleClick={() => setZoom(zoomed ? 0 : 2)}
          onPointerDown={(e) => {
            if (!zoomed || e.pointerType !== "mouse") return;
            const el = e.currentTarget;
            drag.current = { x: e.clientX, y: e.clientY, left: el.scrollLeft, top: el.scrollTop };
            el.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d) return;
            e.currentTarget.scrollLeft = d.left - (e.clientX - d.x);
            e.currentTarget.scrollTop = d.top - (e.clientY - d.y);
          }}
          onPointerUp={() => (drag.current = null)}
          onPointerCancel={() => (drag.current = null)}
        >
          <div className="flex min-h-full min-w-full items-center justify-center p-4">
            {width > 0 && (
              <Image
                src={asset.preview}
                alt={`${item.title} — certificate issued by ${item.subtitle}`}
                width={asset.width}
                height={asset.height}
                unoptimized
                draggable={false}
                onLoad={() => setLoaded(true)}
                style={{ width, height, maxWidth: "none" }}
                className={cn(
                  "rounded-lg bg-white shadow-lift transition-opacity duration-300 select-none",
                  loaded ? "opacity-100" : "opacity-0"
                )}
              />
            )}
          </div>
        </div>
        {!loaded && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-ink-faint">
            <Loader2 className="animate-spin" size={22} />
            <span className="sr-only">Loading certificate preview</span>
          </div>
        )}

        {position && (
          <>
            <NavButton side="left" label="Previous certificate" onClick={() => onNavigate(-1)} />
            <NavButton side="right" label="Next certificate" onClick={() => onNavigate(1)} />
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-2.5 font-mono text-[11px] text-ink-faint sm:px-5">
        <span>
          {asset.pages > 1 ? `Preview of page 1 of ${asset.pages} — open the PDF for every page.` : "Preview of the original document."}
          {item.credentialId && <span className="ml-2 text-ink-soft">ID {item.credentialId}</span>}
        </span>
        <span className="hidden sm:inline">Double-click to zoom · drag to pan · ← → to browse</span>
      </div>
    </div>
  );
}

function ToolButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:text-accent disabled:opacity-35 disabled:hover:text-ink-soft"
    >
      {children}
    </button>
  );
}

function NavButton({ side, label, onClick }: { side: "left" | "right"; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "glass absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong text-ink shadow-soft transition-colors hover:border-accent hover:text-accent",
        side === "left" ? "left-3" : "right-3"
      )}
    >
      {side === "left" ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  );
}

// Browse lists built once on the client, so server components can pass a
// short group name instead of serialising the whole list into every button.
const groups = {
  achievements: compact(
    [...highlightAchievements, ...hackathons, ...leadership, ...participation].map(achievementItem)
  ),
};

// A trigger that opens the viewer, optionally inside a group for ← → browsing.
export function ViewCertificateButton({
  item,
  group,
  className,
  children,
}: {
  item: ViewerItem;
  group?: keyof typeof groups;
  className?: string;
  children: ReactNode;
}) {
  const { open } = useCertificateViewer();
  return (
    <button
      type="button"
      onClick={() => open(item, group ? groups[group] : undefined)}
      aria-haspopup="dialog"
      className={className}
    >
      {children}
    </button>
  );
}
