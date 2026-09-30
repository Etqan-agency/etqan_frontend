import { ImageResponse } from "next/og";

export const alt = "ETQAN — Software Development & Digital Marketing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: 80, background: "linear-gradient(135deg, #151934 0%, #034c88 70%, #4dc1e3 100%)", color: "white",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: 8 }}>ETQAN</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.05 }}>Software development</div>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.05, color: "#4dc1e3" }}>& digital marketing.</div>
        </div>
        <div style={{ fontSize: 28, opacity: 0.75 }}>Web · Mobile · Custom software · Branding · Growth — Egypt & the Gulf</div>
      </div>
    ),
    size,
  );
}
