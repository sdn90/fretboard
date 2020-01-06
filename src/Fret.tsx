import React from "react";
import "./Fret.css";

interface FretProps {
  width: number;
  children: React.ReactNode;
  inlayCount: number;
}

export default function Fret(props: FretProps) {
  const inlayRange = Array.from(Array(props.inlayCount));
  return (
    <div className="fret-container" style={{ width: props.width }}>
      <div className="fret-inlay-container">
        {inlayRange.map(() => (
          <svg viewBox="0 0 100 100" width="20" style={{ opacity: 1 }}>
            <circle
              fill="#fff"
              cx={50}
              cy={50}
              r={45}
              stroke="#aaa"
              strokeOpacity={0.2}
              strokeWidth={8}
            ></circle>
          </svg>
        ))}
      </div>
      <div style={{ zIndex: 1 }}>{props.children}</div>
    </div>
  );
}
