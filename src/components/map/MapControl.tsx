import { Portal } from "@mui/material";
import { ReactNode, useRef, useState } from "react";
import { useControl } from "react-map-gl";

interface Props {
  children: ReactNode;
  position?: "top-left" | "top-right" | "bottom-right" | "bottom-left";
  className?: string;
}

export function MapControl(props: Props) {
  const { children, className, position = "top-right" } = props;
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useControl(
    () => ({
      onAdd: () => {
        if (!containerRef.current) {
          containerRef.current = document.createElement("div");
          containerRef.current.className = `maplibregl-ctrl ${className}`;

          // containerRef.current.classList.add(
          //   "maplibregl-ctrl",
          //   className || ""
          // );
        }
        setContainer(containerRef.current);
        return containerRef.current;
      },
      onRemove: () => {
        setContainer(null);
      },
    }),
    { position }
  );

  return (
    <>{container ? <Portal container={container}>{children}</Portal> : null}</>
  );
}
