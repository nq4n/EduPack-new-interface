// lib/ai/utils/sanitize.ts

export function sanitizeText(input: string): string {
  if (!input) return "";
  return input
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/[<>]/g, "") // remove HTML tags if AI adds them
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeBlockContent(content: any): any {
  if (typeof content === "string") return sanitizeText(content);
  return content;
}
