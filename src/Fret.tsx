import React from "react";

interface FretProps {
  width: number;
  children: React.ReactNode;
  inlayCount: number;
}

export default function Fret(props: FretProps) {
  const inlayRange = Array.from(Array(props.inlayCount));
  return (
    <div
      style={{
        width: props.width,
        position: "relative",
        backgroundColor: "#efefef",
        margin: 2
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "column",
          zIndex: 0
        }}
      >
        {inlayRange.map(() => (
          <svg viewBox="0 0 100 100" width="12" style={{ opacity: 0.5 }}>
            <circle fill="#fff" cx={50} cy={50} r={50}></circle>
          </svg>
        ))}
      </div>
      <div style={{ zIndex: 1 }}>{props.children}</div>
    </div>
  );
}
