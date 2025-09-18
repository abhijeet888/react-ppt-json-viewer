import React, { useEffect, useState } from "react";
import SlideRenderer from "./SlideRenderer";
import { Deck } from "./types";

export type ReactPPTProps = {
  file: Deck | string;   // accept already-parsed Deck JSON or URL to JSON
  fitToWidth?: number | string;
  className?: string;
  controls?: boolean;
};

export default function ReactPPT({
  file,
  fitToWidth = "100%",
  className,
  controls = true
}: ReactPPTProps) {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // Case 1: already a Deck object
      if (typeof file === "object" && "slides" in file) {
        setDeck(file as Deck);
        setIndex(0);
        return;
      }

      // Case 2: URL to JSON
      if (typeof file === "string") {
        try {
          const res = await fetch(file);
          const json: Deck = await res.json();
          if (!cancelled) {
            setDeck(json);
            setIndex(0);
          }
        } catch (err) {
          console.error("Failed to load JSON deck from URL:", err);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [file]);

  if (!deck) {
    return <div className={className}>Loading presentation…</div>;
  }

  const slide = deck.slides[index];
  const containerStyle: React.CSSProperties = {
    width: fitToWidth,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12
  };

  return (
    <div className={className} style={containerStyle}>
      <SlideRenderer slide={slide} />
      {controls && (
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
          >
            Prev
          </button>
          <span>
            {index + 1} / {deck.slides.length}
          </span>
          <button
            onClick={() => setIndex((i) => Math.min(deck.slides.length - 1, i + 1))}
            disabled={index === deck.slides.length - 1}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
