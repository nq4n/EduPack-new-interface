"use client"

import React from "react"
import { EditorBlock, TextBlock, ImageBlock, VideoBlock, QuizBlock } from "@/lib/scorm/types"

interface RendererProps {
  block: EditorBlock
  onClick?: (b: EditorBlock) => void
}

export function BlockRenderer({ block, onClick }: RendererProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick?.(block)
  }

  switch (block.type) {
    // ------------------------ TEXT ------------------------
    case "text": {
      const tb = block as TextBlock
      const style = tb.style || {}

      const appliedStyle: React.CSSProperties = {
        fontWeight: style.bold ? "bold" : "normal",
        fontStyle: style.italic ? "italic" : "normal",
        textDecoration: style.underline ? "underline" : "none",
        textAlign: style.align || "left",
        direction: style.direction || "ltr",
        fontSize: style.size || "16px",
        color: style.color || "#000000",
        background: style.background || "transparent",
        lineHeight: style.lineHeight || "1.6",
        padding: style.padding || "8px",
        borderRadius: style.radius || "0px",
        whiteSpace: "pre-wrap",
      }

      return (
        <div
          onClick={handleClick}
          style={appliedStyle}
          dangerouslySetInnerHTML={{ __html: tb.html }}
        />
      )
    }

    // ------------------------ IMAGE ------------------------
    case "image": {
      const ib = block as ImageBlock
      const style = ib.style || {}

      const containerStyle: React.CSSProperties = {
        textAlign: style.align || "center",
        padding: style.padding || "0px",
        background: style.background || "transparent",
      }

      if (style.shadow) {
        containerStyle.boxShadow = "0 6px 20px rgba(15,23,42,0.18)"
      }

      const imgStyle: React.CSSProperties = {
        display: "inline-block",
        maxWidth: style.maxWidth || "800px",
        width: style.width || "100%",
        borderRadius: style.radius || "0px",
      }

      return (
        <div onClick={handleClick} style={containerStyle}>
          <img
            src={ib.src}
            alt={ib.alt || "Image"}
            style={imgStyle}
          />
        </div>
      )
    }
    //------------------------iteractive--------------------
    case "interactive": {
      const ib = block as any as import("@/lib/scorm/types").InteractiveBlock
      const style = ib.style || {}
    
      const baseStyle: React.CSSProperties = {
        padding: style.padding || "8px",
        borderRadius: style.radius || (ib.variant === "button" ? "999px" : "10px"),
        background:
          style.background ||
          (ib.variant === "button" ? "#0ea5e9" : "#eef2ff"),
        display: ib.variant === "button" ? "inline-block" : "block",
        cursor: ib.variant === "button" ? "pointer" : "default",
      }
    
      if (style.shadow) {
        baseStyle.boxShadow = "0 6px 20px rgba(15,23,42,0.18)"
      }
    
      // ... existing button / callout / reveal code ...
    
      if (ib.variant === "custom") {
        return (
          <div
            onClick={handleClick}
            style={{ ...baseStyle, cursor: "pointer" /* just so it feels clickable */ }}
            // ⚠️ You control the authoring tool, so this is for power users only
            dangerouslySetInnerHTML={{
              __html: ib.customHtml || "<em style='font-size:12px;color:#9ca3af;'>Empty custom HTML block</em>",
            }}
          />
        )
      }
    
      // Fallback
      return (
        <div onClick={handleClick} style={baseStyle}>
          {ib.label || "Interactive element"}
        </div>
      )
    }
    
    // ------------------------ VIDEO ------------------------
    case "video": {
      const vb = block as VideoBlock
      const style = vb.style || {}

      const containerStyle: React.CSSProperties = {
        padding: style.padding || "0px",
      }

      if (style.background) {
        containerStyle.background = style.background
      }
      if (style.shadow) {
        containerStyle.boxShadow = "0 6px 20px rgba(15,23,42,0.18)"
      }

      const videoStyle: React.CSSProperties = {
        width: style.width || "100%",
        maxWidth: style.maxWidth || "800px",
        borderRadius: style.radius || "0px",
      }

      return (
        <div onClick={handleClick} style={containerStyle}>
          <video
            src={vb.src}
            controls
            style={videoStyle}
          />
        </div>
      )
    }

    // ------------------------ QUIZ ------------------------
    case "quiz": {
      const qb = block as QuizBlock
      const style = qb.style || {}
      const optionStyle = qb.optionStyle || {}
    
      const containerStyle: React.CSSProperties = {
        padding: style.padding || "12px",
        borderRadius: style.radius || "8px",
        background: style.background || "#f9fafb",
      }
    
      if (style.shadow) {
        containerStyle.boxShadow = "0 6px 20px rgba(15,23,42,0.18)"
      }
    
      const questionHtml = qb.questionHtml || qb.question || ""
      const questionStyle = qb.questionStyle || {}
    
      const questionCss: React.CSSProperties = {
        fontWeight: questionStyle.bold ? "bold" : "normal",
        fontStyle: questionStyle.italic ? "italic" : "normal",
        textDecoration: questionStyle.underline ? "underline" : "none",
        textAlign: questionStyle.align || "left",
        direction: questionStyle.direction || "ltr",
        fontSize: questionStyle.size || "16px",
        color: questionStyle.color || "#111827",
        background: questionStyle.background || "transparent",
        lineHeight: questionStyle.lineHeight || "1.5",
        padding: questionStyle.padding || "0",
        borderRadius: questionStyle.radius || "0",
        marginBottom: "8px",
        whiteSpace: "pre-wrap",
      }
    
      // ✅ Shared option text style
      const optionCss: React.CSSProperties = {
        fontWeight: optionStyle.bold ? "bold" : "normal",
        fontStyle: optionStyle.italic ? "italic" : "normal",
        textDecoration: optionStyle.underline ? "underline" : "none",
        fontSize: optionStyle.size || "14px",
        color: optionStyle.color || "#111827",
        textAlign: optionStyle.align || "left",
      }
    
      return (
        <div onClick={handleClick} style={containerStyle}>
          {/* Rich text question */}
          <div
            style={questionCss}
            dangerouslySetInnerHTML={{ __html: questionHtml }}
          />
    
          {/* Options */}
          <div className="space-y-2">
            {(qb.options || []).map((opt) => (
              <label
                key={opt.id}
                className="flex items-center gap-2"
                style={{ alignItems: "flex-start" }}
              >
                <input type="radio" disabled />
                <span style={optionCss}>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      )
    }
    
    

    // ------------------------ DEFAULT ------------------------
    default:
      return (
        <div
          onClick={handleClick}
          className="p-3 text-xs text-slate-400 border rounded"
        >
          Unknown block type: {block.type}
        </div>
      )
  }
}
