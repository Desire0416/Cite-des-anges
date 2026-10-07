import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Groupe Scolaire La Cité des Anges — Maternelle et primaire à Angré";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = await readFile(join(process.cwd(), "public/brand/logo-og.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

function Star() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" style={{ margin: "0 18px" }}>
      <path fill="#f57c16" d="m12 2.6 2.83 6.1 6.67.75-4.96 4.52 1.36 6.58L12 17.2l-5.9 3.35 1.36-6.58L2.5 9.45l6.67-.75z" />
    </svg>
  );
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          background: "linear-gradient(135deg, #031630 0%, #082d55 55%, #0b4f7d 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#5cc9e5", fontWeight: 700 }}>
            GROUPE SCOLAIRE
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05, marginTop: 18 }}>
            La Cité des Anges
          </div>
          <div style={{ display: "flex", fontSize: 30, marginTop: 24, color: "rgba(255,255,255,0.82)" }}>
            Maternelle et primaire à Angré, Cité Gestoci
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 44, fontSize: 22, letterSpacing: 5, fontWeight: 700 }}>
            <span>DISCIPLINE</span>
            <Star />
            <span>RIGUEUR</span>
            <Star />
            <span>TRAVAIL</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 430,
            height: 430,
            borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
            border: "2px solid rgba(92,201,229,0.35)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={360} height={315} alt="" />
        </div>
      </div>
    ),
    size,
  );
}
