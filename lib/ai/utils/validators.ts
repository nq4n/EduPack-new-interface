// lib/ai/utils/validators.ts

export function ensureArray<T>(value: any): T[] {
  return Array.isArray(value) ? value : [];
}

export function isNonEmptyString(value: any): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateBlockType(type: any): "text" | "image" | "quiz" {
  const allowed = ["text", "image", "quiz"];
  return allowed.includes(type) ? type : "text";
}

export function safeString(value: any, fallback = ""): string {
  return isNonEmptyString(value) ? value : fallback;
}
