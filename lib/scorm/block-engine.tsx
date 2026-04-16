"use client";

import React from "react";
import {
  EditorBlock,
  EditorProject,
  TextBlock,
  ImageBlock,
  VideoBlock,
  QuizBlock,
  InteractiveBlock,
  SvgBlock,
} from "@/lib/scorm/types"
import {
  extractSvgTextNodes,
  getSvgCaption,
  sanitizeSvgMarkup,
  updateSvgTextNode,
} from "@/lib/scorm/svg"

interface Props {
  block: EditorBlock
  onClick?: (b: EditorBlock) => void
  theme?: EditorProject["theme"]
  onNavigateToPage?: (pageId: string) => void
  onTextChange?: (blockId: string, html: string) => void
  onSvgChange?: (blockId: string, svg: string) => void
  isSelected?: boolean
}

function SvgRenderer({
  block,
  onSelect,
  onSvgChange,
  isSelected,
}: {
  block: SvgBlock
  onSelect: () => void
  onSvgChange?: (blockId: string, svg: string) => void
  isSelected?: boolean
}) {
  const rawStyle = block.style || {}
  const [activeTextId, setActiveTextId] = React.useState<string | null>(null)
  const [draftText, setDraftText] = React.useState("")
  const style = stripAnimationProps(rawStyle)
  const {
    width,
    maxWidth,
    align,
    padding,
    background,
    radius,
    shadow,
    ...restStyle
  } = style
  const animationStyles = buildAnimationStyle(rawStyle)
  const textNodes = React.useMemo(() => extractSvgTextNodes(block.svg), [block.svg])
  const containerStyle: React.CSSProperties = {
    textAlign:
      align === "center" ? "center" : align === "right" ? "right" : "left",
    padding,
    background,
    borderRadius: radius,
    boxShadow: shadow ? "0 12px 30px rgba(0,0,0,0.12)" : undefined,
    ...animationStyles,
    ...restStyle,
  }
  const canvasStyle: React.CSSProperties = {
    width: width || "100%",
    maxWidth,
    display: "inline-block",
    verticalAlign: "top",
  }
  const caption = getSvgCaption(block)
  const activeTextNode =
    textNodes.find((node) => node.id === activeTextId) ?? null

  React.useEffect(() => {
    if (!isSelected) {
      setActiveTextId(null)
      setDraftText("")
    }
  }, [isSelected])

  React.useEffect(() => {
    if (!activeTextNode) return
    setDraftText(activeTextNode.text)
  }, [activeTextNode?.id, activeTextNode?.text])

  const handleSvgClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    onSelect()

    if (!onSvgChange) return

    const target = event.target
    if (!(target instanceof Element)) return

    const textElement = target.closest("text")
    if (!(textElement instanceof Element)) return

    const svgRoot = textElement.ownerSVGElement
    if (!svgRoot) return

    const textElements = Array.from(svgRoot.querySelectorAll("text"))
    const index = textElements.indexOf(textElement)
    if (index < 0) return

    setActiveTextId(`text-${index}`)
    setDraftText(textElement.textContent ?? "")
  }

  const commitSvgText = (value: string) => {
    if (!activeTextId || !onSvgChange) return
    onSvgChange(block.id, updateSvgTextNode(block.svg, activeTextId, value))
  }

  return (
    <figure onClick={onSelect} style={containerStyle}>
      <div
        className="[&_svg]:block [&_svg]:h-auto [&_svg]:max-w-full [&_svg]:w-full [&_text]:cursor-text"
        style={canvasStyle}
        onClick={handleSvgClick}
        dangerouslySetInnerHTML={{ __html: sanitizeSvgMarkup(block.svg) }}
      />
      {isSelected && onSvgChange && textNodes.length > 0 ? (
        <div className="mt-3 rounded-2xl border border-sky-100 bg-sky-50/70 p-3">
          {activeTextNode ? (
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-700">
                Editing SVG label
              </p>
              <input
                type="text"
                className="w-full rounded-xl border border-sky-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none ring-0"
                value={draftText}
                onChange={(event) => {
                  const value = event.target.value
                  setDraftText(value)
                  commitSvgText(value)
                }}
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setActiveTextId(null)
                    setDraftText("")
                  }
                }}
                autoFocus
              />
            </div>
          ) : (
            <p className="text-[11px] text-sky-700">
              Click any label inside the SVG to edit it live.
            </p>
          )}
        </div>
      ) : null}
      {caption ? (
        <figcaption className="mt-2 text-[11px] text-slate-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

const buildAnimationStyle = (style?: any): React.CSSProperties => {
  if (!style || !style.animation || style.animation === "none") return {}

  const name = style.animation === "fade" ? "scormFadeIn" : style.animation
  return {
    animationName: name,
    animationDuration: style.animationDuration || "0.6s",
    animationDelay: style.animationDelay || "0s",
    animationFillMode: "both",
    animationTimingFunction: "ease",
  }
}

const stripAnimationProps = (style?: any) => {
  if (!style) return {}
  const { animation, animationDuration, animationDelay, ...rest } = style
  return rest
}

export function BlockRenderer({
  block,
  onClick,
  theme,
  onNavigateToPage,
  onTextChange,
  onSvgChange,
  isSelected,
}: Props) {
  const select = () => onClick?.(block)

  /* ========= TEXT ========= */
  if (block.type === "text") {
    const b = block as TextBlock
    const rawStyle = b.style || {}
    const style = stripAnimationProps(rawStyle)
    const animationStyles = buildAnimationStyle(rawStyle)
    const themeStyles = theme?.styles || {}

    const styleObj: React.CSSProperties = {
      ...themeStyles,
      fontWeight: style.bold ? "bold" : "normal",
      fontStyle: style.italic ? "italic" : "normal",
      textDecoration: style.underline ? "underline" : "none",
      fontSize: style.size || "inherit",
      textAlign: style.align as React.CSSProperties["textAlign"],
      direction: style.direction as React.CSSProperties["direction"],
      color: style.color,
      background: style.background,
      padding: style.padding,
      borderRadius: style.radius,
      lineHeight: style.lineHeight,
      ...animationStyles,
      ...style,
    }

    const handleTextInput = (
      event: React.FormEvent<HTMLDivElement>,
    ) => {
      if (!onTextChange) return
      const target = event.target as HTMLDivElement
      onTextChange(b.id, target.innerHTML)
    }

    return (
      <div
        onClick={select}
        contentEditable={Boolean(onTextChange)}
        suppressContentEditableWarning
        onInput={handleTextInput}
        onBlur={handleTextInput}
        role={onTextChange ? "textbox" : undefined}
        tabIndex={onTextChange ? 0 : undefined}
        className={`prose prose-sm max-w-none ${onTextChange ? "cursor-text" : ""}`}
        style={styleObj}
        dangerouslySetInnerHTML={{ __html: b.html || "" }}
      />
    )
  }

  /* ========= IMAGE ========= */
  if (block.type === "image") {
    const b = block as ImageBlock
    const rawStyle = b.style || {}
    const style = stripAnimationProps(rawStyle)
    const animationStyles = buildAnimationStyle(rawStyle)
    const containerStyle: React.CSSProperties = {
      textAlign:
        style.align === "center"
          ? "center"
          : style.align === "right"
            ? "right"
            : "left",
      padding: style.padding,
      background: style.background,
      borderRadius: style.radius,
      boxShadow: style.shadow ? "0 12px 30px rgba(0,0,0,0.12)" : undefined,
      width: style.width,
      maxWidth: style.maxWidth,
      ...animationStyles,
      ...style,
    }
    const mediaStyle: React.CSSProperties = {
      borderRadius: style.radius,
      width: "100%",
      maxWidth: style.maxWidth,
      display: "inline-block",
    }
    return (
      <figure onClick={select} className="flex flex-col items-center" style={containerStyle}>
        <img
          src={b.src}
          alt={b.alt || ""}
          className="rounded-xl border bg-slate-50"
          style={mediaStyle}
        />
        {b.alt && (
          <figcaption className="text-[11px] text-slate-500">
            {b.alt}
          </figcaption>
        )}
      </figure>
    )
  }

  /* ========= VIDEO ========= */
  if (block.type === "video") {
    const b = block as VideoBlock
    const rawStyle = b.style || {}
    const { autoplay, controls: showControls, loop, muted, ...style } =
      stripAnimationProps(rawStyle)
    const animationStyles = buildAnimationStyle(rawStyle)
    const containerStyle: React.CSSProperties = {
      textAlign:
        style.align === "center"
          ? "center"
          : style.align === "right"
            ? "right"
            : "left",
      padding: style.padding,
      background: style.background,
      borderRadius: style.radius,
      boxShadow: style.shadow ? "0 12px 30px rgba(0,0,0,0.12)" : undefined,
      width: style.width,
      maxWidth: style.maxWidth,
      color: style.color,
      ...animationStyles,
      ...style,
    }
    return (
      <div onClick={select} style={containerStyle}>
        <video
          src={b.src}
          controls={showControls !== false}
          autoPlay={autoplay === true}
          loop={loop === true}
          muted={muted === true}
          className="w-full rounded-xl border bg-black"
        />
      </div>
    )
  }

  /* ========= QUIZ ========= */
  if (block.type === "quiz") {
    const b = block as QuizBlock
    const rawStyle = b.style || {}
    const style = stripAnimationProps(rawStyle)
    const animationStyles = buildAnimationStyle(rawStyle)
    const optionStyle = b.optionStyle || {}
    const containerStyle: React.CSSProperties = {
      padding: style.padding || "12px",
      borderRadius: style.radius || "12px",
      background: style.background || "#f8fafc",
      boxShadow: style.shadow ? "0 12px 30px rgba(0,0,0,0.12)" : undefined,
      width: style.width,
      maxWidth: style.maxWidth,
      textAlign: style.align as React.CSSProperties["textAlign"],
      color: style.color,
      ...animationStyles,
      ...style,
    }
    const optionStyleObj: React.CSSProperties = {
      fontWeight: optionStyle.bold ? "bold" : undefined,
      fontStyle: optionStyle.italic ? "italic" : undefined,
      textDecoration: optionStyle.underline ? "underline" : undefined,
      fontSize: optionStyle.size,
      color: optionStyle.color,
      textAlign: optionStyle.align as React.CSSProperties["textAlign"],
    }
    return (
      <div
        onClick={select}
        className="rounded-xl border bg-slate-50 p-3 space-y-2"
        style={containerStyle}
      >
        <p className="text-sm font-semibold">{b.question}</p>

        {(b.options || []).map((o) => (
          <label
            key={o.id}
            className="flex items-center gap-2 text-xs text-slate-700"
            style={optionStyleObj}
          >
            <input
              type="radio"
              name={b.id}
              onClick={(e) => e.stopPropagation()}
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    )
  }

  /* ========= SVG ========= */
  if (block.type === "svg") {
    return (
      <SvgRenderer
        block={block as SvgBlock}
        onSelect={select}
        onSvgChange={onSvgChange}
        isSelected={isSelected}
      />
    )
  }

  /* ========= INTERACTIVE ========= */
  if (block.type === "interactive") {
    const b = block as InteractiveBlock
    const rawStyle = b.style || {}
    const style = stripAnimationProps(rawStyle)
    const animationStyles = buildAnimationStyle(rawStyle)

    /* General shape */
    const styleObj: React.CSSProperties = {
      padding: style.padding || "10px",
      borderRadius:
        style.radius ||
        (b.variant === "button" ? "999px" : "12px"),
      background:
        style.background ||
        (b.variant === "button"
          ? "#0ea5e9"
          : b.variant === "callout"
          ? "#eef2ff"
          : "#f1f5f9"),
      boxShadow: style.shadow ? "0 8px 20px rgba(0,0,0,0.15)" : "none",
      cursor: "pointer",
      width: style.width,
      maxWidth: style.maxWidth,
      textAlign: style.align as React.CSSProperties["textAlign"],
      color: style.color,
      ...animationStyles,
      ...style,
    };

    /* ---- BUTTON ---- */
    if (b.variant === "button") {
      const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        select()

        if (onNavigateToPage && b.action === "page" && b.targetPageId) {
          onNavigateToPage(b.targetPageId)
        }

        if (onNavigateToPage && b.action === "link" && b.url) {
          window.open(b.url, "_blank")
        }
      }

      return (
        <button
          onClick={handleClick}
          style={styleObj}
          className="text-xs text-white"
        >
          {b.label || "Interactive"}
        </button>
      );
    }

    /* ---- CALLOUT ---- */
    if (b.variant === "callout") {
      return (
        <div onClick={select} style={styleObj}>
          {b.label && <p className="font-semibold">{b.label}</p>}
          {b.bodyHtml ? (
            <div
              dangerouslySetInnerHTML={{ __html: b.bodyHtml }}
              className="prose prose-xs"
            />
          ) : (
            <p className="text-[11px] text-slate-500">Empty callout.</p>
          )}
        </div>
      );
    }

    /* ---- REVEAL ---- */
    if (b.variant === "reveal") {
      return (
        <details
          onClick={(e) => {
            e.stopPropagation();
            select();
          }}
          open={b.initiallyOpen}
          style={styleObj}
        >
          <summary>{b.label || "Show"}</summary>
          <div
            className="mt-2 prose prose-xs"
            dangerouslySetInnerHTML={{
              __html:
                b.bodyHtml || "<em style='color:#999'>Empty reveal</em>",
            }}
          />
        </details>
      );
    }

    /* ---- CUSTOM ---- */
    if (b.variant === "custom") {
      return (
        <div
          onClick={select}
          style={styleObj}
          dangerouslySetInnerHTML={{
            __html:
              b.customHtml ||
              "<em style='color:#999;font-size:12px'>Empty custom HTML</em>",
          }}
        />
      );
    }
  }

  /* ========= DEFAULT ========= */
  return (
    <div onClick={select} className="text-[11px] text-slate-400">
      Unknown block type.
    </div>
  );
}
