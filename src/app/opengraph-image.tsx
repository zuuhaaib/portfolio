import { ImageResponse } from "next/og";

export const alt = "Zuhaib Khan, CS student and full stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#131b33",
          color: "white",
        }}
      >
        <div style={{ fontSize: 40, color: "#9CA3AF" }}>hi, i am</div>
        <div style={{ fontSize: 112, fontWeight: 700, marginTop: 8 }}>
          Zuhaib Khan
        </div>
        <div style={{ fontSize: 44, color: "#FACC15", marginTop: 24 }}>
          CS student · full stack developer
        </div>
      </div>
    ),
    size
  );
}
