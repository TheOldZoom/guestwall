"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

type Direction = "horizontal" | "vertical";

interface ResizablePanelProps extends HTMLAttributes<HTMLDivElement> {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  size?: number;
}

interface ResizableHandleProps extends HTMLAttributes<HTMLDivElement> {
  direction?: Direction;
  onResizeMove?: (deltaPx: number) => void;
  onResizeStep?: (deltaPct: number) => void;
}

function isElementOfType(child: ReactNode, type: unknown): child is ReactElement {
  return isValidElement(child) && child.type === type;
}

export function ResizablePanel({
  className = "",
  style,
  size,
  defaultSize: _defaultSize,
  minSize: _minSize,
  maxSize: _maxSize,
  ...props
}: ResizablePanelProps) {
  return (
    <div
      className={["min-h-0 min-w-0 overflow-auto", size == null && "flex-1", className]
        .filter(Boolean)
        .join(" ")}
      style={size != null ? { flexGrow: 0, flexShrink: 0, flexBasis: `${size}%`, ...style } : style}
      {...props}
    />
  );
}

export function ResizableHandle({
  className = "",
  direction = "horizontal",
  onResizeMove,
  onResizeStep,
  ...props
}: ResizableHandleProps) {
  const lastPos = useRef<number | null>(null);

  return (
    <div
      role="separator"
      aria-orientation={direction}
      tabIndex={0}
      className={[
        "group relative flex shrink-0 items-center justify-center touch-none select-none outline-none",
        direction === "horizontal"
          ? "-mx-1.5 w-4 cursor-col-resize"
          : "-my-1.5 h-4 w-full cursor-row-resize",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        lastPos.current = direction === "horizontal" ? e.clientX : e.clientY;
      }}
      onPointerMove={(e) => {
        if (lastPos.current == null) return;
        const pos = direction === "horizontal" ? e.clientX : e.clientY;
        onResizeMove?.(pos - lastPos.current);
        lastPos.current = pos;
      }}
      onPointerUp={(e) => {
        lastPos.current = null;
        e.currentTarget.releasePointerCapture(e.pointerId);
      }}
      onKeyDown={(e) => {
        const forward = direction === "horizontal" ? "ArrowRight" : "ArrowDown";
        const backward = direction === "horizontal" ? "ArrowLeft" : "ArrowUp";
        if (e.key === forward) onResizeStep?.(2);
        if (e.key === backward) onResizeStep?.(-2);
      }}
      {...props}
    >
      <span
        className={[
          "bg-border/40 transition-colors group-hover:bg-foreground group-focus-visible:bg-foreground",
          direction === "horizontal" ? "h-full w-px" : "h-px w-full",
        ].join(" ")}
      />
    </div>
  );
}

export function ResizablePanelGroup({
  direction = "horizontal",
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { direction?: Direction }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const childArray = Children.toArray(children);
  const panelIndices = childArray
    .map((child, i) => (isElementOfType(child, ResizablePanel) ? i : -1))
    .filter((i) => i !== -1);

  const [sizes, setSizes] = useState<number[]>(() =>
    panelIndices.map((i) => {
      const el = childArray[i] as ReactElement<ResizablePanelProps>;
      return el.props.defaultSize ?? 100 / panelIndices.length;
    }),
  );

  const resize = useCallback(
    (panelIndex: number, deltaPct: number) => {
      setSizes((prev) => {
        const prevEl = childArray[panelIndices[panelIndex]] as ReactElement<ResizablePanelProps>;
        const nextEl = childArray[
          panelIndices[panelIndex + 1]
        ] as ReactElement<ResizablePanelProps>;
        const prevMin = prevEl.props.minSize ?? 10;
        const prevMax = prevEl.props.maxSize ?? 90;
        const nextMin = nextEl.props.minSize ?? 10;
        const nextMax = nextEl.props.maxSize ?? 90;

        const sum = prev[panelIndex] + prev[panelIndex + 1];
        let newPrev = Math.max(prevMin, Math.min(prevMax, prev[panelIndex] + deltaPct));
        newPrev = Math.max(sum - nextMax, Math.min(sum - nextMin, newPrev));

        const next = [...prev];
        next[panelIndex] = newPrev;
        next[panelIndex + 1] = sum - newPrev;
        return next;
      });
    },
    [childArray, panelIndices],
  );

  let panelCounter = -1;
  const rendered = childArray.map((child, i) => {
    if (isElementOfType(child, ResizablePanel)) {
      panelCounter += 1;
      return cloneElement(child as ReactElement<ResizablePanelProps>, {
        key: child.key ?? i,
        size: sizes[panelCounter],
      });
    }
    if (isElementOfType(child, ResizableHandle)) {
      const handleIndex = panelCounter;
      return cloneElement(child as ReactElement<ResizableHandleProps>, {
        key: child.key ?? i,
        direction,
        onResizeMove: (deltaPx: number) => {
          const size =
            direction === "horizontal"
              ? containerRef.current?.clientWidth
              : containerRef.current?.clientHeight;
          if (!size) return;
          resize(handleIndex, (deltaPx / size) * 100);
        },
        onResizeStep: (deltaPct: number) => resize(handleIndex, deltaPct),
      });
    }
    return child;
  });

  return (
    <div
      ref={containerRef}
      className={["flex overflow-hidden", direction === "vertical" && "flex-col", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {rendered}
    </div>
  );
}
