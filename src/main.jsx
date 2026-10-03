import React, { useState, useEffect, useMemo, useRef } from "react";
import { createRoot } from "react-dom/client";
import QRCode from "qrcode";
import "./styles.css";

// --------------------------------------------------------------------------
// Icons (Minimal, crisp SVG developer-tool icons)
// --------------------------------------------------------------------------
function IconLink({ className = "" }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function IconText({ className = "" }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  );
}

function IconMail({ className = "" }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconPhone({ className = "" }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconWifi({ className = "" }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13a10 10 0 0 1 14 0" />
      <path d="M8.5 16.5a5 5 0 0 1 7 0" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  );
}

function IconVCard({ className = "" }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="M15 8h2" />
      <path d="M15 12h2" />
      <path d="M7 16h10" />
    </svg>
  );
}

function IconDownload({ className = "" }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function IconCopy({ className = "" }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconCheck({ className = "" }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconVector({ className = "" }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="19" cy="19" r="2" />
      <circle cx="5" cy="19" r="2" />
      <path d="M5 7v10M7 5h10M19 7v10M7 19h10" />
    </svg>
  );
}

function IconSun({ className = "" }) {
  return (
    <svg className={className} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function IconMoon({ className = "" }) {
  return (
    <svg className={className} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function IconTrash({ className = "" }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function IconShieldCheck({ className = "" }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function IconEye({ className = "" }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconEyeOff({ className = "" }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function IconSparkles({ className = "" }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    </svg>
  );
}

function IconUpload({ className = "" }) {
  return (
    <svg className={className} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function IconX({ className = "" }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// --------------------------------------------------------------------------
// Constants & Configuration
// --------------------------------------------------------------------------
const QR_TYPES = [
  {
    id: "url",
    name: "URL",
    description: "Create a QR code for any website",
    icon: IconLink,
    color: "#3b82f6",
    colorLight: "rgba(59, 130, 246, 0.12)",
    accentKey: "blue"
  },
  {
    id: "text",
    name: "Plain Text",
    description: "Share plain text instantly",
    icon: IconText,
    color: "#8b5cf6",
    colorLight: "rgba(139, 92, 246, 0.12)",
    accentKey: "purple"
  },
  {
    id: "email",
    name: "Email",
    description: "Create a pre-filled email QR",
    icon: IconMail,
    color: "#f97316",
    colorLight: "rgba(249, 115, 22, 0.12)",
    accentKey: "orange"
  },
  {
    id: "phone",
    name: "Phone",
    description: "Let people call you instantly",
    icon: IconPhone,
    color: "#10b981",
    colorLight: "rgba(16, 185, 129, 0.12)",
    accentKey: "green"
  },
  {
    id: "wifi",
    name: "Wi-Fi",
    description: "Share Wi-Fi credentials",
    icon: IconWifi,
    color: "#06b6d4",
    colorLight: "rgba(6, 182, 212, 0.12)",
    accentKey: "cyan"
  },
  {
    id: "vcard",
    name: "Contact",
    description: "Share contact information",
    icon: IconVCard,
    color: "#ec4899",
    colorLight: "rgba(236, 72, 153, 0.12)",
    accentKey: "pink"
  }
];

const COLOR_PRESETS = [
  { name: "Classic Slate", fg: "#0f172a", bg: "#ffffff" },
  { name: "Electric Indigo", fg: "#4f46e5", bg: "#f5f3ff" },
  { name: "Cyber Emerald", fg: "#059669", bg: "#ecfdf5" },
  { name: "Midnight Cyan", fg: "#0284c7", bg: "#f0f9ff" },
  { name: "Crimson Night", fg: "#e11d48", bg: "#fff1f2" },
  { name: "Obsidian Gold", fg: "#d97706", bg: "#18181b" },
  { name: "Monochrome", fg: "#18181b", bg: "#f4f4f5" },
  { name: "Dark Neon", fg: "#38bdf8", bg: "#090d16" }
];

const CENTER_ICONS = ["none", "⚡", "🔗", "🌐", "📱", "✉️", "📶", "💼", "🚀", "❤️", "⭐", "🏆"];

const DEFAULT_FORM = {
  url: "https://google.com",
  text: "Hello from QR Studio!",
  email: "",
  subject: "",
  message: "",
  phone: "",
  ssid: "",
  password: "",
  security: "WPA",
  vName: "",
  vPhone: "",
  vEmail: "",
  vOrg: ""
};

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------
function createQRData(type, form) {
  if (!type) return "";
  switch (type) {
    case "url":
      return form.url ? form.url.trim() : "";
    case "text":
      return form.text ? form.text.trim() : "";
    case "email":
      return form.email ? `mailto:${form.email.trim()}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.message)}` : "";
    case "phone":
      return form.phone ? `tel:${form.phone.trim()}` : "";
    case "wifi":
      return form.ssid ? `WIFI:T:${form.security};S:${escapeWifi(form.ssid)};P:${escapeWifi(form.password)};;` : "";
    case "vcard":
      return form.vName ? `BEGIN:VCARD\nVERSION:3.0\nN:${form.vName}\nTEL:${form.vPhone}\nEMAIL:${form.vEmail}\nORG:${form.vOrg}\nEND:VCARD` : "";
    default:
      return "";
  }
}

function escapeWifi(value) {
  return String(value || "").replace(/([\\;,:"])/g, "\\$1");
}

function getLuminance(hex) {
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c.split("").map((x) => x + x).join("");
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return 0.5;

  const r = (num >> 16) / 255;
  const g = ((num >> 8) & 0xff) / 255;
  const b = (num & 0xff) / 255;

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(fgHex, bgHex) {
  const l1 = getLuminance(fgHex);
  const l2 = getLuminance(bgHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function drawRoundedRectPath(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, width, height, radius);
  } else {
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
  }
  ctx.closePath();
}

function escapeXml(unsafe) {
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}

async function generateQRWithBadge({
  qrData,
  size,
  margin,
  errorCorrection,
  foreground,
  background,
  isTransparent,
  badgeMode,
  badgeGlyph,
  badgeImage,
  badgeShape,
  badgeBg,
  badgeColor
}) {
  const lightColor = isTransparent ? "#00000000" : background;

  // 1. Offscreen Canvas for pixel-perfect PNG
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  await QRCode.toCanvas(canvas, qrData, {
    width: size,
    margin: margin,
    errorCorrectionLevel: errorCorrection,
    color: {
      dark: foreground,
      light: lightColor
    }
  });

  const ctx = canvas.getContext("2d");

  const hasBadge =
    badgeMode !== "none" &&
    ((badgeMode === "image" && badgeImage) ||
      ((badgeMode === "glyph" || badgeMode === "presets") && badgeGlyph && badgeGlyph.trim().length > 0));

  if (hasBadge) {
    const centerX = size / 2;
    const centerY = size / 2;
    const badgeSize = Math.round(size * 0.22);
    const halfBadge = badgeSize / 2;
    const cornerRadius = Math.round(badgeSize * 0.22);
    const outerRingWidth = Math.max(3, Math.round(badgeSize * 0.06));

    // Outer buffer/ring matching QR background for separation
    ctx.save();
    if (badgeShape === "circle") {
      ctx.beginPath();
      ctx.arc(centerX, centerY, halfBadge + outerRingWidth, 0, Math.PI * 2);
      ctx.closePath();
    } else {
      drawRoundedRectPath(
        ctx,
        centerX - halfBadge - outerRingWidth,
        centerY - halfBadge - outerRingWidth,
        badgeSize + outerRingWidth * 2,
        badgeSize + outerRingWidth * 2,
        cornerRadius + outerRingWidth
      );
    }
    ctx.fillStyle = isTransparent ? "#ffffff" : background;
    ctx.fill();

    // Badge Background Fill
    if (badgeShape === "circle") {
      ctx.beginPath();
      ctx.arc(centerX, centerY, halfBadge, 0, Math.PI * 2);
      ctx.closePath();
    } else {
      drawRoundedRectPath(
        ctx,
        centerX - halfBadge,
        centerY - halfBadge,
        badgeSize,
        badgeSize,
        cornerRadius
      );
    }
    ctx.fillStyle = badgeBg || "#ffffff";
    ctx.fill();

    // Clip to badge bounds
    ctx.clip();

    if (badgeMode === "image" && badgeImage) {
      await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const padding = Math.round(badgeSize * 0.14);
          const drawW = badgeSize - padding * 2;
          const drawH = badgeSize - padding * 2;
          ctx.drawImage(img, centerX - drawW / 2, centerY - drawH / 2, drawW, drawH);
          resolve();
        };
        img.onerror = () => resolve();
        img.src = badgeImage;
      });
    } else {
      const text = String(badgeGlyph || "").trim();
      let fontSize;
      if (text.length === 1) {
        fontSize = Math.round(badgeSize * 0.54);
      } else if (text.length === 2) {
        fontSize = Math.round(badgeSize * 0.40);
      } else {
        fontSize = Math.round(badgeSize * 0.30);
      }
      ctx.font = `bold ${fontSize}px "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = badgeColor || "#0f172a";
      ctx.fillText(text, centerX, centerY);
    }

    ctx.restore();
  }

  const pngDataUrl = canvas.toDataURL("image/png");

  // 2. Scalable vector SVG output
  let svgString = await QRCode.toString(qrData, {
    type: "svg",
    width: size,
    margin: margin,
    errorCorrectionLevel: errorCorrection,
    color: {
      dark: foreground,
      light: lightColor
    }
  });

  if (hasBadge) {
    const centerX = size / 2;
    const centerY = size / 2;
    const badgeSize = Math.round(size * 0.22);
    const halfBadge = badgeSize / 2;
    const cornerRadius = Math.round(badgeSize * 0.22);
    const outerRingWidth = Math.max(3, Math.round(badgeSize * 0.06));
    const ringBg = isTransparent ? "#ffffff" : background;

    let shapeSvg = "";
    if (badgeShape === "circle") {
      shapeSvg = `
        <circle cx="${centerX}" cy="${centerY}" r="${halfBadge + outerRingWidth}" fill="${ringBg}" />
        <circle cx="${centerX}" cy="${centerY}" r="${halfBadge}" fill="${badgeBg || '#ffffff'}" />
      `;
    } else {
      shapeSvg = `
        <rect x="${centerX - halfBadge - outerRingWidth}" y="${centerY - halfBadge - outerRingWidth}" width="${badgeSize + outerRingWidth * 2}" height="${badgeSize + outerRingWidth * 2}" rx="${cornerRadius + outerRingWidth}" fill="${ringBg}" />
        <rect x="${centerX - halfBadge}" y="${centerY - halfBadge}" width="${badgeSize}" height="${badgeSize}" rx="${cornerRadius}" fill="${badgeBg || '#ffffff'}" />
      `;
    }

    let contentSvg = "";
    if (badgeMode === "image" && badgeImage) {
      const padding = Math.round(badgeSize * 0.14);
      const drawSize = badgeSize - padding * 2;
      contentSvg = `<image href="${badgeImage}" x="${centerX - drawSize / 2}" y="${centerY - drawSize / 2}" width="${drawSize}" height="${drawSize}" preserveAspectRatio="xMidYMid meet" />`;
    } else {
      const text = String(badgeGlyph || "").trim();
      let fontSize;
      if (text.length === 1) {
        fontSize = Math.round(badgeSize * 0.54);
      } else if (text.length === 2) {
        fontSize = Math.round(badgeSize * 0.40);
      } else {
        fontSize = Math.round(badgeSize * 0.30);
      }
      contentSvg = `<text x="${centerX}" y="${centerY}" font-size="${fontSize}" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" fill="${badgeColor || '#0f172a'}" text-anchor="middle" dominant-baseline="central">${escapeXml(text)}</text>`;
    }

    const badgeBlock = `<g id="center-glyph-badge">${shapeSvg}${contentSvg}</g>`;
    svgString = svgString.replace("</svg>", `${badgeBlock}</svg>`);
  }

  return { pngDataUrl, svgString };
}

// --------------------------------------------------------------------------
// Main Application Component
// --------------------------------------------------------------------------
function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("qr-studio-theme");
      if (saved === "light" || saved === "dark") return saved;
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("qr-studio-theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Initially NO card is selected when user opens the site
  const [type, setType] = useState(null);
  const [form, setForm] = useState(DEFAULT_FORM);

  // Customization State
  const [foreground, setForeground] = useState("#0f172a");
  const [background, setBackground] = useState("#ffffff");
  const [isTransparent, setIsTransparent] = useState(false);
  const [size, setSize] = useState(320);
  const [margin, setMargin] = useState(2);
  const [errorCorrection, setErrorCorrection] = useState("M");

  // Center Glyph Badge State
  const [badgeMode, setBadgeMode] = useState("none"); // "none" | "glyph" | "image" | "presets"
  const [badgeGlyph, setBadgeGlyph] = useState("⚡");
  const [badgeImage, setBadgeImage] = useState(null);
  const [badgeShape, setBadgeShape] = useState("circle"); // "circle" | "square"
  const [badgeBg, setBadgeBg] = useState("#ffffff");
  const [badgeColor, setBadgeColor] = useState("#0f172a");
  const [showPassword, setShowPassword] = useState(false);

  // Output & Feedback state
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [qrSvgString, setQrSvgString] = useState("");
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [downloadStatus, setDownloadStatus] = useState("idle");
  const [copyStatus, setCopyStatus] = useState("idle");
  const [isGenerating, setIsGenerating] = useState(false);

  // History state
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("qr-studio-history") || "[]");
    } catch {
      return [];
    }
  });

  const activeTypeObj = useMemo(() => {
    if (!type) return null;
    return QR_TYPES.find((t) => t.id === type) || null;
  }, [type]);

  const qrData = useMemo(() => createQRData(type, form), [type, form]);

  const toastTimerRef = useRef(null);
  const showToast = (msg) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(msg);
    toastTimerRef.current = setTimeout(() => setToastMessage(""), 3200);
  };

  const handleSelectBadgeMode = (mode) => {
    setBadgeMode(mode);
    if (mode !== "none" && (errorCorrection === "L" || errorCorrection === "M")) {
      setErrorCorrection("H");
      showToast("Applied Level H error recovery for center badge");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast("Image size must be under 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setBadgeImage(event.target.result);
      setBadgeMode("image");
      if (errorCorrection === "L" || errorCorrection === "M") {
        setErrorCorrection("H");
        showToast("Uploaded logo and enabled Level H recovery");
      } else {
        showToast("Logo badge uploaded successfully");
      }
    };
    reader.readAsDataURL(file);
  };

  const contrastRatio = useMemo(() => {
    if (isTransparent) return null;
    return getContrastRatio(foreground, background);
  }, [foreground, background, isTransparent]);

  const scannabilityInfo = useMemo(() => {
    if (!type || !qrData) {
      return {
        level: "info",
        badge: "Awaiting Format",
        title: "Ready to scan",
        desc: "Choose a format above and enter data to analyze contrast and scanning reliability."
      };
    }
    if (badgeMode !== "none" && errorCorrection !== "H" && errorCorrection !== "Q") {
      return {
        level: "warning",
        badge: "Center Badge Active",
        title: "Increase Fault Tolerance",
        desc: "A center badge covers part of the QR matrix. Level H (30% recovery) is recommended for reliable scanning."
      };
    }
    if (isTransparent) {
      return {
        level: "info",
        badge: "Transparent Canvas",
        title: "Contrast depends on surface",
        desc: "Ensure strong contrast against the background surface where this QR code is placed."
      };
    }
    if (contrastRatio >= 7.0) {
      return {
        level: "optimal",
        badge: `Optimal Contrast (${contrastRatio.toFixed(1)}:1)`,
        title: "Designed for reliable scanning",
        desc: "High contrast ensures fast optical capture on all smartphone cameras."
      };
    }
    if (contrastRatio >= 4.0) {
      return {
        level: "good",
        badge: `Good Contrast (${contrastRatio.toFixed(1)}:1)`,
        title: "Standard scanning reliability",
        desc: "Scans reliably under standard lighting conditions."
      };
    }
    return {
      level: "warning",
      badge: `Low Contrast (${contrastRatio.toFixed(1)}:1)`,
      title: "Check contrast ratio",
      desc: "Low contrast between QR code and background may cause scanner read errors."
    };
  }, [type, qrData, contrastRatio, isTransparent, badgeMode, errorCorrection]);

  useEffect(() => {
    let cancelled = false;

    async function generateQR() {
      if (!type) {
        setQrCodeDataUrl("");
        setQrSvgString("");
        setError("");
        setIsGenerating(false);
        return;
      }

      if (!qrData) {
        setQrCodeDataUrl("");
        setQrSvgString("");
        setError("Please enter the required information to generate your QR code.");
        setIsGenerating(false);
        return;
      }

      setIsGenerating(true);

      try {
        const { pngDataUrl, svgString } = await generateQRWithBadge({
          qrData,
          size,
          margin,
          errorCorrection,
          foreground,
          background,
          isTransparent,
          badgeMode,
          badgeGlyph,
          badgeImage,
          badgeShape,
          badgeBg,
          badgeColor
        });

        if (!cancelled) {
          setQrCodeDataUrl(pngDataUrl);
          setQrSvgString(svgString);
          setError("");
          setIsGenerating(false);
        }
      } catch (err) {
        if (!cancelled) {
          setQrCodeDataUrl("");
          setQrSvgString("");
          setError("Failed to generate QR code. Try shortening the input data.");
          setIsGenerating(false);
        }
      }
    }

    generateQR();

    return () => {
      cancelled = true;
    };
  }, [
    type,
    qrData,
    foreground,
    background,
    isTransparent,
    size,
    margin,
    errorCorrection,
    badgeMode,
    badgeGlyph,
    badgeImage,
    badgeShape,
    badgeBg,
    badgeColor
  ]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const applyPreset = (preset) => {
    setForeground(preset.fg);
    setBackground(preset.bg);
    setIsTransparent(false);
    showToast(`Applied preset: ${preset.name}`);
  };

  const saveToHistory = () => {
    if (!qrData || !qrCodeDataUrl) return;
    const newItem = {
      id: Date.now(),
      type: type || "url",
      image: qrCodeDataUrl,
      data: qrData,
      date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    const updated = [newItem, ...history.filter((h) => h.data !== qrData)].slice(0, 8);
    setHistory(updated);
    try {
      localStorage.setItem("qr-studio-history", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const downloadPNG = () => {
    if (!qrCodeDataUrl) return;
    const link = document.createElement("a");
    link.href = qrCodeDataUrl;
    link.download = `qr-studio-${type || "code"}-${Date.now()}.png`;
    link.click();
    saveToHistory();

    setDownloadStatus("downloaded");
    showToast("Downloaded high-resolution PNG");
    setTimeout(() => setDownloadStatus("idle"), 2200);
  };

  const downloadSVG = () => {
    if (!qrSvgString) return;
    const blob = new Blob([qrSvgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-studio-${type || "code"}-${Date.now()}.svg`;
    link.click();
    URL.revokeObjectURL(url);
    saveToHistory();
    showToast("Downloaded scalable vector SVG");
  };

  const copyToClipboard = async () => {
    if (!qrCodeDataUrl) return;
    try {
      const response = await fetch(qrCodeDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      setCopyStatus("copied");
      showToast("Copied QR Code image to clipboard");
      saveToHistory();
      setTimeout(() => setCopyStatus("idle"), 2200);
    } catch (e) {
      try {
        await navigator.clipboard.writeText(qrData);
        setCopyStatus("copied");
        showToast("Copied QR payload to clipboard");
        setTimeout(() => setCopyStatus("idle"), 2200);
      } catch (err) {
        showToast("Unable to copy to clipboard.");
      }
    }
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("qr-studio-history");
    } catch {
      // ignore
    }
    showToast("Recent history cleared");
  };

  const restoreFromHistory = (item) => {
    setType(item.type);
    setQrCodeDataUrl(item.image);
    showToast(`Loaded ${item.type.toUpperCase()} from history`);
  };

  return (
    <div className="app-layout">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast" role="status" aria-live="polite">
          <span className="toast-bullet" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sticky Header / Navbar */}
      <header className="navbar">
        <div className="navbar-inner">
          <div className="brand">
            <div className="brand-mark">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="7" y="7" width="0.1" height="0.1" />
                <rect x="18" y="7" width="0.1" height="0.1" />
                <rect x="7" y="18" width="0.1" height="0.1" />
              </svg>
            </div>
            <div className="brand-titles">
              <div className="brand-row">
                <span className="brand-name">QR Studio</span>
                <span className="version-pill">v1.2</span>
              </div>
              <span className="brand-sub">Professional Code Generator</span>
            </div>
          </div>

          <div className="nav-actions">
            <div className="privacy-pill" title="All QR codes are generated directly in your browser without sending data to any external server">
              <IconShieldCheck />
              <span>100% Client-Side</span>
            </div>

            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
              aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
            >
              {theme === "dark" ? <IconSun /> : <IconMoon />}
              <span className="theme-toggle-label">{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Cool Animated Headline & Description */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            <span>CREATE • CUSTOMIZE • SHARE</span>
          </div>
          <h1 className="hero-headline">
            Make a QR code <span className="hero-gradient-text">in seconds.</span>
          </h1>
          <p className="hero-description">
            High-precision QR generator for web addresses, plain text, email messages, phone numbers,
            Wi-Fi networks, and contact cards. Crisp vector output with instant scannability feedback.
          </p>
        </div>
      </section>

      {/* Main Continuous Application Workspace */}
      <main className="workspace-container" id="generator-workspace">
        {/* Section 1: Prominent QR Type Selection (3x2 Grid) */}
        <section className="qr-type-section" aria-label="QR Type Selector">
          <div className="section-header-block">
            <h2 className="section-title">What do you want to create?</h2>
            <p className="section-subtitle">Choose a format to configure your customized QR code</p>
          </div>

          <div className="qr-type-cards-grid" role="radiogroup" aria-label="QR Code Formats">
            {QR_TYPES.map((item) => {
              const IconComponent = item.icon;
              const isActive = type === item.id;
              return (
                <div
                  key={item.id}
                  role="radio"
                  aria-checked={isActive}
                  tabIndex={0}
                  className={`qr-format-card ${isActive ? "active" : ""}`}
                  style={{
                    "--card-accent": item.color,
                    "--card-accent-light": item.colorLight
                  }}
                  onClick={() => setType(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setType(item.id);
                    }
                  }}
                >
                  <div className="card-top-row">
                    <div className="card-icon-box">
                      <IconComponent />
                    </div>
                    <div className="card-check-marker" aria-hidden="true">
                      {isActive && <IconCheck />}
                    </div>
                  </div>

                  <div className="card-body">
                    <h3 className="card-format-name">{item.name}</h3>
                    <p className="card-format-desc">{item.description}</p>
                  </div>

                  <span className="card-active-glow-bar" />
                </div>
              );
            })}
          </div>
        </section>

        {/* Lower Workspace: Left Configuration + Right Live Preview */}
        <div className="workspace-main-split">
          {/* Left Column: Form & Customization */}
          <div className="workspace-config-column">
            {/* Form Section */}
            <div className="panel-card form-panel-card">
              <div className="panel-header">
                <div className="panel-heading">
                  <div className="panel-title-row">
                    <h2>Your information</h2>
                    {activeTypeObj && (
                      <span
                        className="active-type-pill"
                        style={{
                          borderColor: activeTypeObj.color,
                          color: activeTypeObj.color,
                          backgroundColor: activeTypeObj.colorLight
                        }}
                      >
                        {activeTypeObj.name}
                      </span>
                    )}
                  </div>
                  <p>{type ? "Real-time live synchronization as you type" : "Select a format above to enter information"}</p>
                </div>
              </div>

              {!type ? (
                <div className="select-prompt-placeholder">
                  <div className="select-prompt-icon">
                    <IconSparkles />
                  </div>
                  <div className="select-prompt-text">
                    <h3>Select a format above to begin</h3>
                    <p>Choose URL, Plain Text, Email, Phone, Wi-Fi, or Contact to enter your details and generate a QR code.</p>
                  </div>
                </div>
              ) : (
                <div className="form-fields-wrapper" key={type}>
                  {type === "url" && (
                    <Field label="Website URL" hint="Target address">
                      <div className="input-with-prefix">
                        <span className="input-prefix">https://</span>
                        <input
                          type="url"
                          value={form.url.replace(/^https?:\/\//, "")}
                          onChange={(e) => updateField("url", `https://${e.target.value}`)}
                          placeholder="example.com/dest"
                          autoFocus
                        />
                      </div>
                    </Field>
                  )}

                  {type === "text" && (
                    <Field label="Text Content" hint={`${form.text.length} characters`}>
                      <textarea
                        rows={4}
                        value={form.text}
                        onChange={(e) => updateField("text", e.target.value)}
                        placeholder="Enter raw text, serial codes, tokens, or instructions..."
                        autoFocus
                      />
                    </Field>
                  )}

                  {type === "email" && (
                    <div className="field-stack">
                      <Field label="Recipient Email Address">
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="contact@company.com"
                          autoFocus
                        />
                      </Field>
                      <div className="grid-2-col">
                        <Field label="Subject Line">
                          <input
                            type="text"
                            value={form.subject}
                            onChange={(e) => updateField("subject", e.target.value)}
                            placeholder="Inquiry / Feedback"
                          />
                        </Field>
                        <Field label="Pre-filled Message">
                          <input
                            type="text"
                            value={form.message}
                            onChange={(e) => updateField("message", e.target.value)}
                            placeholder="Hello, I would like to..."
                          />
                        </Field>
                      </div>
                    </div>
                  )}

                  {type === "phone" && (
                    <Field label="Phone Number" hint="Include country calling code">
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="+1 (555) 234-5678"
                        autoFocus
                      />
                    </Field>
                  )}

                  {type === "wifi" && (
                    <div className="field-stack">
                      <Field label="Network Name (SSID)">
                        <input
                          type="text"
                          value={form.ssid}
                          onChange={(e) => updateField("ssid", e.target.value)}
                          placeholder="Office_5GHz_Guest"
                          autoFocus
                        />
                      </Field>
                      <div className="grid-2-col">
                        <Field label="Security">
                          <select
                            value={form.security}
                            onChange={(e) => updateField("security", e.target.value)}
                          >
                            <option value="WPA">WPA / WPA2 / WPA3</option>
                            <option value="WEP">WEP (Legacy)</option>
                            <option value="nopass">None (Open Network)</option>
                          </select>
                        </Field>
                        {form.security !== "nopass" && (
                          <Field label="Password">
                            <div className="input-with-action">
                              <input
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={(e) => updateField("password", e.target.value)}
                                placeholder="Passphrase"
                              />
                              <button
                                type="button"
                                className="input-inline-btn"
                                onClick={() => setShowPassword(!showPassword)}
                                title={showPassword ? "Hide password" : "Show password"}
                              >
                                {showPassword ? <IconEyeOff /> : <IconEye />}
                              </button>
                            </div>
                          </Field>
                        )}
                      </div>
                    </div>
                  )}

                  {type === "vcard" && (
                    <div className="field-stack">
                      <div className="grid-2-col">
                        <Field label="Full Name">
                          <input
                            type="text"
                            value={form.vName}
                            onChange={(e) => updateField("vName", e.target.value)}
                            placeholder="Alex Morgan"
                            autoFocus
                          />
                        </Field>
                        <Field label="Organization / Title">
                          <input
                            type="text"
                            value={form.vOrg}
                            onChange={(e) => updateField("vOrg", e.target.value)}
                            placeholder="Acme Labs — Staff Engineer"
                          />
                        </Field>
                      </div>
                      <div className="grid-2-col">
                        <Field label="Direct Phone">
                          <input
                            type="tel"
                            value={form.vPhone}
                            onChange={(e) => updateField("vPhone", e.target.value)}
                            placeholder="+1 (555) 432-1098"
                          />
                        </Field>
                        <Field label="Work Email">
                          <input
                            type="email"
                            value={form.vEmail}
                            onChange={(e) => updateField("vEmail", e.target.value)}
                            placeholder="alex@acmelabs.io"
                          />
                        </Field>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Customization Panel */}
            <div className="panel-card custom-panel-card">
              <div className="panel-header">
                <div className="panel-heading">
                  <h2>Customize your QR</h2>
                  <p>Styling, resolution, margins, and error tolerance</p>
                </div>
              </div>

              {/* Presets */}
              <div className="custom-group">
                <div className="field-label-row">
                  <span className="field-label">Curated Presets</span>
                  <span className="field-hint">High-contrast tested</span>
                </div>
                <div className="presets-ribbon">
                  {COLOR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="preset-chip"
                      onClick={() => applyPreset(preset)}
                      title={`Apply ${preset.name}`}
                    >
                      <span
                        className="preset-swatch-split"
                        style={{
                          background: `linear-gradient(135deg, ${preset.fg} 50%, ${preset.bg} 50%)`
                        }}
                      />
                      <span className="preset-label">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="grid-2-col margin-top-md">
                <div className="color-field">
                  <span className="field-label">Foreground (QR)</span>
                  <div className="color-input-box">
                    <input
                      type="color"
                      id="fg-color"
                      value={foreground}
                      onChange={(e) => setForeground(e.target.value)}
                      title="Choose foreground color"
                    />
                  </div>
                </div>

                <div className="color-field">
                  <div className="field-label-row">
                    <span className="field-label">Background</span>
                    <label className="checkbox-compact">
                      <input
                        type="checkbox"
                        checked={isTransparent}
                        onChange={(e) => setIsTransparent(e.target.checked)}
                      />
                      <span>Transparent</span>
                    </label>
                  </div>
                  <div className={`color-input-box ${isTransparent ? "disabled" : ""}`}>
                    <input
                      type="color"
                      id="bg-color"
                      value={background}
                      disabled={isTransparent}
                      onChange={(e) => setBackground(e.target.value)}
                      title={isTransparent ? "Background is transparent" : "Choose background color"}
                    />
                  </div>
                </div>
              </div>

              {/* Sliders: Size & Margin */}
              <div className="grid-2-col margin-top-md">
                <div className="slider-field">
                  <div className="slider-header">
                    <span className="field-label">Resolution Size</span>
                    <span className="slider-value-pill">{size}px</span>
                  </div>
                  <input
                    type="range"
                    min="180"
                    max="480"
                    step="10"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                  />
                </div>

                <div className="slider-field">
                  <div className="slider-header">
                    <span className="field-label">Quiet Zone (Margin)</span>
                    <span className="slider-value-pill">{margin} units</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="6"
                    value={margin}
                    onChange={(e) => setMargin(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Fault Tolerance */}
              <div className="margin-top-md">
                <Field label="Fault Tolerance (Error Correction)" hint="Higher recovery resists damage and obstruction">
                  <select
                    value={errorCorrection}
                    onChange={(e) => setErrorCorrection(e.target.value)}
                  >
                    <option value="L">Level L — 7% Damage Recovery (Cleanest Matrix)</option>
                    <option value="M">Level M — 15% Damage Recovery (Standard Balanced)</option>
                    <option value="Q">Level Q — 25% Damage Recovery (High Resistance)</option>
                    <option value="H">Level H — 30% Damage Recovery (Recommended for Center Badges & Logos)</option>
                  </select>
                </Field>
              </div>

              {/* Center Glyph Badge Studio */}
              <div className="badge-studio-card margin-top-md">
                <div className="badge-studio-header">
                  <div className="badge-studio-title-group">
                    <span className="field-label">Center Glyph Badge</span>
                    <span className="badge-studio-subtitle">Personalize with a custom glyph, text, or company logo</span>
                  </div>
                  {badgeMode !== "none" && (
                    <span className="badge-status-pill">Active</span>
                  )}
                </div>

                {/* Mode Selector Tabs */}
                <div className="badge-mode-nav">
                  <button
                    type="button"
                    className={`badge-mode-btn ${badgeMode === "none" ? "active" : ""}`}
                    onClick={() => setBadgeMode("none")}
                  >
                    None
                  </button>
                  <button
                    type="button"
                    className={`badge-mode-btn ${badgeMode === "glyph" ? "active" : ""}`}
                    onClick={() => handleSelectBadgeMode("glyph")}
                  >
                    Custom Glyph
                  </button>
                  <button
                    type="button"
                    className={`badge-mode-btn ${badgeMode === "image" ? "active" : ""}`}
                    onClick={() => handleSelectBadgeMode("image")}
                  >
                    Upload Logo
                  </button>
                  <button
                    type="button"
                    className={`badge-mode-btn ${badgeMode === "presets" ? "active" : ""}`}
                    onClick={() => handleSelectBadgeMode("presets")}
                  >
                    Presets
                  </button>
                </div>

                {/* Mode Content */}
                {badgeMode === "glyph" && (
                  <div className="badge-mode-content">
                    <div className="badge-input-row">
                      <div className="badge-text-field">
                        <label className="field-hint">Glyph / Text / Emoji (1-4 characters)</label>
                        <div className="badge-text-input-wrap">
                          <input
                            type="text"
                            maxLength={4}
                            value={badgeGlyph}
                            onChange={(e) => setBadgeGlyph(e.target.value)}
                            placeholder="e.g. A, AI, ★, ⚡, 🔥"
                            className="badge-glyph-input"
                          />
                          <div className="badge-quick-glyphs">
                            {["★", "⚡", "🔥", "🚀", "AI", "QR", "❤️"].map((g) => (
                              <button
                                key={g}
                                type="button"
                                className="quick-glyph-btn"
                                onClick={() => setBadgeGlyph(g)}
                                title={`Set glyph to ${g}`}
                              >
                                {g}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="badge-controls-grid">
                      <div className="badge-control-item">
                        <span className="field-hint">Badge Shape</span>
                        <div className="shape-toggle-group">
                          <button
                            type="button"
                            className={`shape-toggle-btn ${badgeShape === "circle" ? "active" : ""}`}
                            onClick={() => setBadgeShape("circle")}
                          >
                            <span className="shape-icon circle-icon" />
                            <span>Circle</span>
                          </button>
                          <button
                            type="button"
                            className={`shape-toggle-btn ${badgeShape === "square" ? "active" : ""}`}
                            onClick={() => setBadgeShape("square")}
                          >
                            <span className="shape-icon square-icon" />
                            <span>Rounded</span>
                          </button>
                        </div>
                      </div>

                      <div className="badge-control-item">
                        <span className="field-hint">Glyph Color</span>
                        <div className="color-input-box badge-color-box">
                          <input
                            type="color"
                            value={badgeColor}
                            onChange={(e) => setBadgeColor(e.target.value)}
                            title="Choose glyph color"
                          />
                        </div>
                      </div>

                      <div className="badge-control-item">
                        <span className="field-hint">Container Fill</span>
                        <div className="color-input-box badge-color-box">
                          <input
                            type="color"
                            value={badgeBg}
                            onChange={(e) => setBadgeBg(e.target.value)}
                            title="Choose badge container background"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {badgeMode === "image" && (
                  <div className="badge-mode-content">
                    {badgeImage ? (
                      <div className="badge-image-preview-row">
                        <div className={`badge-preview-chip ${badgeShape}`} style={{ backgroundColor: badgeBg }}>
                          <img src={badgeImage} alt="Uploaded badge logo" />
                        </div>
                        <div className="badge-image-actions">
                          <label className="btn btn-secondary btn-sm upload-change-btn">
                            <IconUpload />
                            <span>Replace Logo</span>
                            <input
                              type="file"
                              accept="image/png,image/jpeg,image/svg+xml,image/webp"
                              style={{ display: "none" }}
                              onChange={handleImageUpload}
                            />
                          </label>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm btn-danger-subtle"
                            onClick={() => setBadgeImage(null)}
                          >
                            <IconX />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="badge-dropzone">
                        <IconUpload className="dropzone-icon" />
                        <span className="dropzone-title">Upload your logo or emblem</span>
                        <span className="dropzone-subtitle">Supports PNG, SVG, JPG, WebP (max 2MB)</span>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/svg+xml,image/webp"
                          style={{ display: "none" }}
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}

                    <div className="badge-controls-grid margin-top-sm">
                      <div className="badge-control-item">
                        <span className="field-hint">Badge Shape</span>
                        <div className="shape-toggle-group">
                          <button
                            type="button"
                            className={`shape-toggle-btn ${badgeShape === "circle" ? "active" : ""}`}
                            onClick={() => setBadgeShape("circle")}
                          >
                            <span className="shape-icon circle-icon" />
                            <span>Circle</span>
                          </button>
                          <button
                            type="button"
                            className={`shape-toggle-btn ${badgeShape === "square" ? "active" : ""}`}
                            onClick={() => setBadgeShape("square")}
                          >
                            <span className="shape-icon square-icon" />
                            <span>Rounded</span>
                          </button>
                        </div>
                      </div>

                      <div className="badge-control-item">
                        <span className="field-hint">Container Fill</span>
                        <div className="color-input-box badge-color-box">
                          <input
                            type="color"
                            value={badgeBg}
                            onChange={(e) => setBadgeBg(e.target.value)}
                            title="Choose badge container background"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {badgeMode === "presets" && (
                  <div className="badge-mode-content">
                    <div className="badge-presets-ribbon">
                      {["⚡", "🔗", "🌐", "📱", "✉️", "📶", "💼", "🚀", "❤️", "⭐", "🏆", "🔥", "☕", "💡", "🏷️", "✨"].map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          className={`badge-preset-btn ${badgeGlyph === icon ? "active" : ""}`}
                          onClick={() => setBadgeGlyph(icon)}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>

                    <div className="badge-controls-grid margin-top-sm">
                      <div className="badge-control-item">
                        <span className="field-hint">Badge Shape</span>
                        <div className="shape-toggle-group">
                          <button
                            type="button"
                            className={`shape-toggle-btn ${badgeShape === "circle" ? "active" : ""}`}
                            onClick={() => setBadgeShape("circle")}
                          >
                            <span className="shape-icon circle-icon" />
                            <span>Circle</span>
                          </button>
                          <button
                            type="button"
                            className={`shape-toggle-btn ${badgeShape === "square" ? "active" : ""}`}
                            onClick={() => setBadgeShape("square")}
                          >
                            <span className="shape-icon square-icon" />
                            <span>Rounded</span>
                          </button>
                        </div>
                      </div>

                      <div className="badge-control-item">
                        <span className="field-hint">Container Fill</span>
                        <div className="color-input-box badge-color-box">
                          <input
                            type="color"
                            value={badgeBg}
                            onChange={(e) => setBadgeBg(e.target.value)}
                            title="Choose badge container background"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {badgeMode !== "none" && errorCorrection !== "H" && errorCorrection !== "Q" && (
                  <div className="badge-tip-note">
                    <span className="badge-tip-bullet">💡</span>
                    <span>Level H recovery is strongly recommended when using a center badge to maintain high scannability.</span>
                    <button
                      type="button"
                      className="badge-tip-action"
                      onClick={() => setErrorCorrection("H")}
                    >
                      Enable Level H
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Live QR Preview & Output Result (Lower down in hierarchy) */}
          <div className="workspace-preview-column">
            <div className="preview-sticky-card">
              <div className="preview-header">
                <div className="preview-title-group">
                  <h3 className="preview-title">Live preview</h3>
                  <span
                    className="preview-badge-type"
                    style={{
                      color: activeTypeObj ? activeTypeObj.color : "var(--text-muted)",
                      borderColor: activeTypeObj ? activeTypeObj.color : "var(--border-subtle)",
                      backgroundColor: activeTypeObj ? activeTypeObj.colorLight : "transparent"
                    }}
                  >
                    {activeTypeObj ? activeTypeObj.name.toUpperCase() : "READY"}
                  </span>
                </div>
                <div className="live-status-pill">
                  <span className={`live-pulse-dot ${isGenerating ? "syncing" : ""}`} />
                  <span>{isGenerating ? "SYNCING" : "LIVE PREVIEW"}</span>
                </div>
              </div>

              {/* Generous whitespace above centered QR code */}
              <div className="qr-stage-wrapper">
                <div className="qr-stage-frame">
                  {qrCodeDataUrl ? (
                    <div
                      className="qr-render-box"
                      style={{
                        backgroundColor: isTransparent ? "transparent" : background
                      }}
                    >
                      <img
                        key={qrCodeDataUrl}
                        src={qrCodeDataUrl}
                        alt={`Generated QR Code for ${type || "code"}`}
                        className="qr-rendered-img"
                      />
                    </div>
                  ) : (
                    <div className="qr-empty-placeholder">
                      <div className="empty-icon-box">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="3" width="7" height="7" rx="1.5" />
                          <rect x="14" y="3" width="7" height="7" rx="1.5" />
                          <rect x="14" y="14" width="7" height="7" rx="1.5" />
                          <rect x="3" y="14" width="7" height="7" rx="1.5" />
                        </svg>
                      </div>
                      <p>{type ? "Enter data above to render your code" : "Choose a format above to generate your QR code"}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Error Message if any */}
              {error && (
                <div className="qr-error-alert" role="alert">
                  <span>{error}</span>
                </div>
              )}

              {/* Scannability & Contrast Status Indicator */}
              <div className={`scannability-card scannability-${scannabilityInfo.level}`}>
                <div className="scannability-header">
                  <div className="scannability-status-row">
                    <span className="scannability-indicator-pill">
                      {scannabilityInfo.level === "optimal" || scannabilityInfo.level === "good" ? "✓ " : "! "}
                      {scannabilityInfo.badge}
                    </span>
                    <span className="payload-metric">{qrData ? `${qrData.length} chars` : "0 chars"}</span>
                  </div>
                  <div className="scannability-title">{scannabilityInfo.title}</div>
                </div>
                <p className="scannability-desc">{scannabilityInfo.desc}</p>
              </div>

              {/* Primary & Secondary Actions */}
              <div className="actions-cluster">
                <button
                  type="button"
                  className={`btn btn-primary ${downloadStatus === "downloaded" ? "btn-success" : ""}`}
                  onClick={downloadPNG}
                  disabled={!qrCodeDataUrl}
                >
                  {downloadStatus === "downloaded" ? (
                    <>
                      <IconCheck />
                      <span>Downloaded PNG</span>
                    </>
                  ) : (
                    <>
                      <IconDownload />
                      <span>Download PNG</span>
                    </>
                  )}
                </button>

                <div className="actions-subgrid">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={downloadSVG}
                    disabled={!qrSvgString}
                    title="Download scalable vector SVG graphic"
                  >
                    <IconVector />
                    <span>Download SVG</span>
                  </button>

                  <button
                    type="button"
                    className={`btn btn-secondary ${copyStatus === "copied" ? "btn-success-subtle" : ""}`}
                    onClick={copyToClipboard}
                    disabled={!qrCodeDataUrl}
                    title="Copy QR image to clipboard"
                  >
                    {copyStatus === "copied" ? <IconCheck /> : <IconCopy />}
                    <span>{copyStatus === "copied" ? "Copied!" : "Copy Image"}</span>
                  </button>
                </div>
              </div>

              {/* Recent QR Codes / Local History */}
              <div className="history-drawer">
                <div className="history-header-row">
                  <div className="history-title-group">
                    <h4>Recent QR codes</h4>
                    <span className="history-count-pill">{history.length}</span>
                  </div>
                  {history.length > 0 && (
                    <button
                      type="button"
                      className="btn-history-clear"
                      onClick={clearHistory}
                      title="Clear history from local storage"
                    >
                      <IconTrash />
                      <span>Clear</span>
                    </button>
                  )}
                </div>

                {history.length === 0 ? (
                  <div className="history-empty-note">
                    <span>Downloaded QR codes will be saved here locally.</span>
                  </div>
                ) : (
                  <div className="history-strip">
                    {history.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="history-thumb-item"
                        onClick={() => restoreFromHistory(item)}
                        title={`Restore ${item.type.toUpperCase()}: ${item.data}`}
                      >
                        <div className="history-thumb-img-box">
                          <img src={item.image} alt={item.type} />
                        </div>
                        <div className="history-thumb-meta">
                          <span className="history-thumb-type">{item.type}</span>
                          <span className="history-thumb-time">{item.date}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-left">
            <span className="footer-brand">QR Studio</span>
            <span className="footer-dot">•</span>
            <span>Developer-grade QR code creation & styling</span>
          </div>
          <div className="footer-right">
            <span>Client-Side Generation</span>
            <span className="footer-dot">•</span>
            <span>Zero Tracking</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --------------------------------------------------------------------------
// Sub-components
// --------------------------------------------------------------------------
function Field({ label, hint, children }) {
  return (
    <div className="field-group">
      <div className="field-label-row">
        <label className="field-label">{label}</label>
        {hint && <span className="field-hint">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

// Mount React Root
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}