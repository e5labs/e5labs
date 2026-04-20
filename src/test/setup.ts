import "@testing-library/jest-dom/vitest";

if (typeof globalThis.TextEncoder === "undefined") {
  const { TextEncoder } = require("util");
  globalThis.TextEncoder = TextEncoder;
}
if (typeof globalThis.TextDecoder === "undefined") {
  const { TextDecoder } = require("util");
  globalThis.TextDecoder = TextDecoder;
}