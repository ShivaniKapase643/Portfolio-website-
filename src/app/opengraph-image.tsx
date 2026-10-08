import { ImageResponse } from "next/og";
import { profile } from "@/lib/data/profile";

export const alt = "Shivani Kapase — Final-Year Computer Engineering Student & Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const chips = ["Full-stack", "Data & analytics", "AI-integrated apps", "SGPA 9.6"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0b0c10",
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(242,166,90,0.28), transparent 45%), radial-gradient(circle at 0% 100%, rgba(139,152,255,0.18), transparent 45%)",
          color: "#eceef3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              border: "2px solid #3c404c",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            SK<span style={{ color: "#f2a65a" }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#a6acb9" }}>{profile.college}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ marginTop: 18, fontSize: 34, color: "#f2a65a" }}>{profile.title}</div>
          <div style={{ marginTop: 22, fontSize: 30, color: "#a6acb9", maxWidth: 940 }}>{profile.headline}</div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {chips.map((c) => (
            <div
              key={c}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(236,238,243,0.2)",
                fontSize: 22,
                color: "#eceef3",
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
