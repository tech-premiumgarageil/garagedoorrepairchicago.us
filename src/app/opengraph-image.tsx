import { ImageResponse } from "next/og";
import { business } from "@/config/business";

export const alt = `${business.name} — 24/6 Same-Day Service`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0D0E10",
          padding: 72,
          backgroundImage:
            "linear-gradient(rgba(42,45,49,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(42,45,49,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#FF5A1F",
            fontSize: 32,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          <div style={{ width: 48, height: 4, background: "#FF5A1F" }} />
          Open 24 Hours · Mon–Sat
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#EDE8DF",
            fontSize: 110,
            fontWeight: 800,
            textTransform: "uppercase",
            lineHeight: 1.0,
          }}
        >
          <span>Garage Door</span>
          <span>
            Repair <span style={{ color: "#FF5A1F", marginLeft: 24 }}>Chicago</span>
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#B8B2A6",
            fontSize: 30,
          }}
        >
          <span>Springs · Cables · Openers · Installation</span>
          <span style={{ color: "#EDE8DF", fontWeight: 700 }}>{business.phone}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
