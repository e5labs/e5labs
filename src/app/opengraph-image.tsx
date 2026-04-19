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
            gap: "20px",
            padding: "80px 80px",
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 512 512"
            style={{ marginBottom: "4px" }}
          >
            <rect width="512" height="512" fill="#0a0f1a" rx="96" />
            <polygon
              points="256,48 432,144 432,368 256,464 80,368 80,144"
              fill="#0d1424"
              stroke="#1e293b"
              strokeWidth="2.5"
            />
            <g fill="#f8fafc">
              <rect x="144" y="168" width="24" height="160" rx="3" />
              <rect x="144" y="168" width="88" height="24" rx="3" />
              <rect x="144" y="236" width="72" height="20" rx="3" />
              <rect x="144" y="304" width="88" height="24" rx="3" />
            </g>
            <rect x="232" y="168" width="90" height="24" rx="3" fill="#f59e0b" />
            <rect x="232" y="168" width="24" height="74" rx="3" fill="#f59e0b" />
            <rect x="232" y="242" width="56" height="20" rx="3" fill="#f59e0b" />
            <path
              d="M 288 262 C 318 262, 332 280, 332 306 C 332 340, 310 356, 278 356 L 240 356"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="338" cy="160" r="5" fill="#f59e0b" opacity="0.7" />
            <circle cx="168" cy="350" r="4" fill="#f59e0b" opacity="0.5" />
          </svg>

          <h1
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#f8fafc",
              lineHeight: 1.1,
              textAlign: "center",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            E<span style={{ color: "#f59e0b" }}>5</span>Labs
          </h1>

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

          <p
            style={{
              fontSize: "20px",
              color: "#94a3b8",
              lineHeight: 1.6,
              textAlign: "center",
              maxWidth: "680px",
              margin: 0,
              marginTop: "4px",
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
              marginTop: "8px",
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