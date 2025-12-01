"use client"

import React from "react"
import {
  EditorBlock,
  TextBlock,
  ImageBlock,
  VideoBlock,
  QuizBlock,
  InteractiveBlock
} from "@/lib/scorm/types"
import TextPanel from "@/components/scorm/panels/text-panel"
import MediaPanel from "@/components/scorm/panels/media-panel"
import VideoPanel from "@/components/scorm/panels/video-panel"
import QuizPanel from "@/components/scorm/panels/quiz-panel"
import InteractivePanel from "@/components/scorm/panels/interactive-panel"

interface PropertiesPanelProps {
  selectedBlock: EditorBlock | null
  onBlockChange: (block: EditorBlock) => void
}

export function PropertiesPanel({ selectedBlock, onBlockChange }: PropertiesPanelProps) {
  if (!selectedBlock) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-4 py-6 text-center text-xs">
        <p className="text-sm font-semibold text-slate-800 mb-1">
          No block selected
        </p>
        <p className="text-slate-500 max-w-xs">
          Click any block in the canvas to edit its settings here.
        </p>
      </div>
    )
  }

  switch (selectedBlock.type) {
    case "text":
      return (
        <TextPanel
          block={selectedBlock as TextBlock}
          onChange={(updated) => onBlockChange(updated as EditorBlock)}
        />
      )

    case "image":
      return (
        <MediaPanel
          block={selectedBlock as ImageBlock}
          onChange={(updated) => onBlockChange(updated as EditorBlock)}
        />
      )

    case "video":
      return (
        <VideoPanel
          block={selectedBlock as VideoBlock}
          onChange={(updated) => onBlockChange(updated as EditorBlock)}
        />
      )

    case "quiz":
      return (
        <QuizPanel
          block={selectedBlock as QuizBlock}
          onChange={(updated) => onBlockChange(updated as EditorBlock)}
        />
      )
      
      case "interactive":
        return (
          <InteractivePanel
            block={selectedBlock as InteractiveBlock}
            onChange={(updated) => onBlockChange(updated)}
          />
        )

    default:
      return (
        <div className="h-full flex items-center justify-center px-4 py-6 text-center text-xs text-slate-500">
          No editor available for this block type: {selectedBlock.type}
        </div>
      )
      //-----iteractytve
    
    }
}
