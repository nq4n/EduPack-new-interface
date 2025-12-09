import { safeParseProject } from "./ai-schema";
import { nanoid } from "./utils/nanoid";
import {
  type EditorBlock,
  type EditorPage,
  type EditorProject,
} from "@/lib/scorm/types";

type ParseMode = "full" | "partial";

const defaultTracking = {
  level: "standard" as const,
  pageViews: true,
  quizInteractions: true,
  media: true,
  hints: false,
  externalLinks: false,
  timePerPage: true,
  attempts: true,
};

const defaultXapi = {
  lrsEndpoint: "",
  authToken: "",
  activityIdFormat: "iri",
  statementExtensions: "{}",
};

function createProjectShell(seed?: EditorProject): EditorProject {
  return {
    id: seed?.id ?? `proj-${nanoid()}`,
    title: seed?.title ?? "Untitled Lesson",
    version: seed?.version ?? "1.2",
    theme: seed?.theme ?? { direction: "ltr", styles: {} },
    tracking: seed?.tracking ?? { ...defaultTracking },
    xapi: seed?.xapi ?? { ...defaultXapi },
    pages: [],
  };
}

function wrapText(content: string) {
  const trimmed = content.trim();
  if (!trimmed) return "";
  return `<p>${trimmed}</p>`;
}

function parseBlock(parts: string[]): EditorBlock | null {
  if (parts.length === 0) return null;

  const [rawType, ...rest] = parts;
  const type = rawType.trim().toLowerCase();
  const payload = rest.map((p) => p.trim()).filter(Boolean);

  let providedId = "";
  if (payload[0]?.startsWith("block-")) {
    providedId = payload.shift() ?? "";
  }

  if (type === "text") {
    const content = payload.join("|") || "";
    return {
      id: providedId || `block-${nanoid()}`,
      type: "text",
      html: wrapText(content),
    };
  }

  if (type === "image") {
    const description = payload[0] ?? "";
    const src = payload[1] ?? "";
    return {
      id: providedId || `block-${nanoid()}`,
      type: "image",
      alt: description,
      src,
    };
  }

  if (type === "video") {
    const src = payload[0] ?? "";
    return {
      id: providedId || `block-${nanoid()}`,
      type: "video",
      src,
    };
  }

  if (type === "quiz") {
    const question = payload.shift() ?? "Quiz question";
    const answer = payload.length > 0 ? payload[payload.length - 1] : "";
    const optionsSource = answer ? payload.slice(0, -1) : payload;

    const options = optionsSource.map((opt) => ({
      id: `opt-${nanoid()}`,
      label: opt,
      correct:
        !!answer && opt.localeCompare(answer, undefined, { sensitivity: "base" }) === 0,
    }));

    if (!options.length) {
      options.push({ id: `opt-${nanoid()}`, label: answer || "True", correct: true });
    }

    return {
      id: providedId || `block-${nanoid()}`,
      type: "quiz",
      question,
      options,
    };
  }

  return null;
}

function parseLines(
  raw: string,
  seed?: EditorProject,
  mode: ParseMode = "full",
): EditorProject {
  const project = createProjectShell(seed);
  const lines = raw.split(/\r?\n/).map((line) => line.trim());

  let currentPage: EditorPage | null = null;
  let title = "";
  const pages: EditorPage[] = [];

  const commitPage = () => {
    if (currentPage && currentPage.blocks.length > 0) {
      pages.push(currentPage);
    }
    currentPage = null;
  };

  lines.forEach((line) => {
    if (!line) return;

    if (line.toUpperCase().startsWith("TITLE:")) {
      title = line.slice(6).trim();
      return;
    }

    if (line.toUpperCase().startsWith("PAGE:")) {
      commitPage();
      const pageTitle = line.slice(5).trim() || "Untitled Page";
      currentPage = {
        id: `page-${nanoid()}`,
        title: pageTitle,
        blocks: [],
      };
      return;
    }

    if (line.toUpperCase().startsWith("BLOCK:")) {
      if (!currentPage) {
        currentPage = {
          id: `page-${nanoid()}`,
          title: "Untitled Page",
          blocks: [],
        };
      }

      const blockParts = line.slice(6).split("|").map((part) => part.trim());
      const block = parseBlock(blockParts);
      if (block) {
        currentPage.blocks.push(block);
      }
    }
  });

  commitPage();

  if (pages.length > 0) {
    project.pages = pages;
  }

  if (mode === "full" && project.pages.length === 0) {
    project.pages = [
      {
        id: `page-${nanoid()}`,
        title: title || "Lesson Overview",
        blocks: [
          {
            id: `block-${nanoid()}`,
            type: "text",
            html: wrapText("Starter content pending."),
          },
        ],
      },
    ];
  }

  project.title = title || project.title;

  if (mode === "partial") {
    project.title = title || seed?.title || project.title;
  }

  return safeParseProject(project);
}

export function parseFullLessonOutput(raw: string, seed?: EditorProject) {
  return parseLines(raw, seed, "full");
}

export function parsePartialLessonOutput(raw: string, seed?: EditorProject) {
  return parseLines(raw, seed, "partial");
}
