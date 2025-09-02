import React, { useState } from "react";
import { Slide } from "./types";

export default function SlideRenderer({ slide }: { slide: Slide }) {
  const { width, height, background } = slide;

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        overflow: "hidden",
        borderRadius: 12,
        boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
        background: background?.image
          ? `url(${background.image}) center/cover no-repeat`
          : background?.color || "#fff"
      }}
    >
      {slide.elements.map((el, i) => {
        const baseStyle: React.CSSProperties = {
          position: "absolute",
          left: el.x,
          top: el.y,
          width: el.width || "auto",
          height: el.height || "auto",
          transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined,
          transformOrigin: "top left"
        };

        if (el.type === "text") {
          return (
            <div
              key={i}
              style={{
                ...baseStyle,
                fontSize: el.fontSize ?? 18,
                fontWeight: el.bold ? 700 : 400,
                color: el.color ?? "#111",
                whiteSpace: "pre-wrap",
                lineHeight: 1.2
              }}
            >
              {el.text}
            </div>
          );
        }

        if (el.type === "image") {
          return (
            <ImageWithLoader
              key={i}
              src={el.src}
              width={el.width}
              height={el.height}
              baseStyle={baseStyle}
            />
          );
        }

        if (el.type === "shape") {
          return (
            <div
              key={i}
              style={{
                ...baseStyle,
                background: el.fill || "transparent",
                border: el.stroke
                  ? `${el.strokeWidth || 2}px solid ${el.stroke}`
                  : undefined,
                borderRadius:
                  el.shape === "circle" || el.shape === "ellipse"
                    ? "50%"
                    : 0
              }}
            />
          );
        }

        if (el.type === "line") {
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: el.x,
                top: el.y,
                width: el.width,
                height: el.strokeWidth || 2,
                background: el.stroke || "#000",
                transform: el.rotation
                  ? `rotate(${el.rotation}deg)`
                  : undefined,
                transformOrigin: "left center"
              }}
            />
          );
        }

        return null;
      })}
    </div>
  );
}

function ImageWithLoader({
  src,
  width,
  height,
  baseStyle
}: {
  src: string;
  width?: number;
  height?: number;
  baseStyle: React.CSSProperties;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      style={{
        ...baseStyle,
        width: width || 200,
        height: height || 150,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fafafa",
        border: "1px solid #ddd"
      }}
    >
      {!loaded && !error && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.6)"
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              border: "3px solid #ccc",
              borderTop: "3px solid #333",
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }}
          />
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}

      {!error ? (
        <img
          src={src}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: loaded ? "block" : "none"
          }}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#fdd",
            color: "#900",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14
          }}
        >
          Failed to load
        </div>
      )}
    </div>
  );
}
