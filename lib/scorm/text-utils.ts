export function updateHtmlStyle(html: string, newStyles: Record<string, string | null>) {
    const match = html.match(/^<([a-zA-Z0-9]+)(.*?)>([\s\S]*)<\/\1>$/)
    if (!match) return html
  
    const tag = match[1]
    const attrs = match[2]
    const content = match[3]
  
    let existingStyle: Record<string, string> = {}
  
    const styleMatch = attrs.match(/style="([^"]*)"/)
    if (styleMatch) {
      styleMatch[1].split(";").forEach((rule) => {
        const [k, v] = rule.split(":").map((x) => x.trim())
        if (k && v) existingStyle[k] = v
      })
    }
  
    // Apply new incoming style rules
    Object.entries(newStyles).forEach(([key, value]) => {
      if (value === null) delete existingStyle[key]
      else existingStyle[key] = value
    })
  
    const newStyleString = Object.entries(existingStyle)
      .map(([k, v]) => `${k}:${v}`)
      .join("; ")
  
    const attrsWithoutStyle = attrs.replace(/style="[^"]*"/, "").trim()
    const styleAttr = newStyleString ? ` style="${newStyleString}"` : ""
  
    return `<${tag} ${attrsWithoutStyle}${styleAttr}>${content}</${tag}>`
  }
  