// lib/ai/utils/normalize.ts

/**
 * Normalizes the Architect / DeepResearch output into
 * a clean intermediate lesson structure.
 *
 * This is NOT yet the final SCORM EditorProject.
 */

export interface NormalizedBlock {
  type: "text" | "image" | "quiz";
  content?: string;
  src?: string;
  options?: string[];
  answer?: string;
}

export interface NormalizedPage {
  title: string;
  blocks: NormalizedBlock[];
}

export interface NormalizedLesson {
  title: string;
  pages: NormalizedPage[];
}

export function normalizeLesson(raw: string): NormalizedLesson {
  const lines = raw.split("\n").map(l => l.trim());
  let title = "Untitled Lesson";
  const pages: NormalizedPage[] = [];

  let currentPage: NormalizedPage | null = null;

  for (const line of lines) {
    // Capture lesson title
    if (line.startsWith("Lesson Title:")) {
      title = line.replace("Lesson Title:", "").trim();
      continue;
    }

    // Detect new page
    if (line.startsWith("- Page")) {
      if (currentPage) pages.push(currentPage);

      const pageTitle = line.replace(/- Page \d+:\s*/i, "").trim();
      currentPage = {
        title: pageTitle || "Untitled Page",
        blocks: []
      };
      continue;
    }

    // Detect text block
    if (line.startsWith("- Text:")) {
      const content = line.replace("- Text:", "").trim();
      currentPage?.blocks.push({
        type: "text",
        content: content || ""
      });
      continue;
    }

    // Detect image block
    if (line.startsWith("- Image:")) {
      const desc = line.replace("- Image:", "").trim();
      currentPage?.blocks.push({
        type: "image",
        src: "", // set in final stage
        content: desc
      });
      continue;
    }

    // Detect quiz block
    if (line.startsWith("- Quiz:")) {
      // placeholder quiz – refined later
      currentPage?.blocks.push({
        type: "quiz",
        content: "quiz-placeholder"
      });
      continue;
    }
  }

  // Push last page
  if (currentPage) pages.push(currentPage);

  return {
    title,
    pages
  };
}
