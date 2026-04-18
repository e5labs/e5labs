import { ImageResponse } from "next/og";

export const alt = "E5Labs — Engineering That Changes the Outcome";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0f1a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, #0a0f1a 0%, #111827 40%, #1e293b 70%, #0a0f1a 100%)",
            width: "100%",
            height: "100%",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-150px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
            gap: "24px",
            padding: "80px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "36px",
                backgroundColor: "#f59e0b",
                borderRadius: "2px",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#f59e0b",
              }}
            >
              Engineering That Changes the Outcome
            </span>
          </div>

          <h1
            style={{
              fontSize: "80px",
              fontWeight: 700,
              color: "#f8fafc",
              lineHeight: 1.1,
              textAlign: "center",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            E5Labs
          </h1>

          <p
            style={{
              fontSize: "22px",
              color: "#94a3b8",
              lineHeight: 1.6,
              textAlign: "center",
              maxWidth: "680px",
              margin: 0,
            }}
          >
            Web applications, developer tools, and cloud infrastructure
            built by engineers who own the result.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            <div
              style={{
                padding: "10px 24px",
                borderRadius: "9999px",
                backgroundColor: "#f59e0b",
                color: "#0a0f1a",
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              e5labs.com
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            right: "80px",
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(245, 158, 11, 0.3), rgba(245, 158, 11, 0.1), transparent)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}