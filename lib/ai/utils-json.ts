export function extractJSON(text: string) {
  if (!text) throw new Error("Empty AI response")

  // 1) Remove markdown fences like ```json ... ```
  const fenced = text.match(/```json([\s\S]*?)```/i)
    || text.match(/```([\s\S]*?)```/i)

  if (fenced) {
    const cleaned = fenced[1].trim()
    try {
      return JSON.parse(cleaned)
    } catch (err) {
      console.error("❌ JSON inside fenced block failed:", cleaned)
      throw new Error("AI returned invalid JSON (fenced).")
    }
  }

  // 2) Fallback: direct JSON extraction
  const bracketMatch = text.match(/\{[\s\S]*\}/)
  if (bracketMatch) {
    try {
      return JSON.parse(bracketMatch[0])
    } catch (err) {
      console.error("❌ JSON inside braces failed:", bracketMatch[0])
      throw new Error("AI returned invalid JSON (braces).")
    }
  }

  throw new Error("No JSON found in AI response.")
}