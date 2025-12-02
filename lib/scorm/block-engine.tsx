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
} from "@/lib/scorm/types"

interface Props {
  block: EditorBlock
  onClick?: (b: EditorBlock) => void
  theme?: EditorProject["theme"]
}

export function BlockRenderer({ block, onClick, theme }: Props) {
  const select = () => onClick?.(block)

  /* ========= TEXT ========= */
  if (block.type === "text") {
    const b = block as TextBlock
    const style = b.style || {}
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
      ...style,
    }

    return (
      <div
        onClick={select}
        className="prose prose-sm max-w-none"
        style={styleObj}
        dangerouslySetInnerHTML={{ __html: b.html || "" }}
      />
    )
  }

  /* ========= IMAGE ========= */
  if (block.type === "image") {
    const b = block as ImageBlock;
    return (
      <figure onClick={select} className="flex flex-col items-center">
        <img
          src={b.src}
          alt={b.alt || ""}
          className="rounded-xl border bg-slate-50"
        />
        {b.alt && (
          <figcaption className="text-[11px] text-slate-500">
            {b.alt}
          </figcaption>
        )}
      </figure>
    );
  }

  /* ========= VIDEO ========= */
  if (block.type === "video") {
    const b = block as VideoBlock;
    return (
      <div onClick={select}>
        <video
          src={b.src}
          controls
          className="w-full rounded-xl border bg-black"
        />
      </div>
    );
  }

  /* ========= QUIZ ========= */
  if (block.type === "quiz") {
    const b = block as QuizBlock;
    return (
      <div
        onClick={select}
        className="rounded-xl border bg-slate-50 p-3 space-y-2"
      >
        <p className="text-sm font-semibold">{b.question}</p>

        {(b.options || []).map((o) => (
          <label
            key={o.id}
            className="flex items-center gap-2 text-xs text-slate-700"
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
    );
  }

  /* ========= INTERACTIVE ========= */
  if (block.type === "interactive") {
    const b = block as InteractiveBlock;
    const style = b.style || {};

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
    };

    /* ---- BUTTON ---- */
    if (b.variant === "button") {
      return (
        <button
          onClick={select}
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
