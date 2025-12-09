// lib/ai/builder.ts

const uuid = () => crypto.randomUUID();

export function buildSCORMProject(outline: string) {
  const lines = outline.split("\n").map(l => l.trim());

  let title = "Untitled Lesson";
  const pages: any[] = [];
  let currentPage: any = null;

  for (const line of lines) {
    if (line.startsWith("TITLE:")) {
      title = line.replace("TITLE:", "").trim();
      continue;
    }

    if (line.startsWith("PAGE")) {
      if (currentPage) pages.push(currentPage);

      const pageTitle = line.split(":")[1]?.trim() || "Page";
      currentPage = { id: uuid(), title: pageTitle, blocks: [] };
      continue;
    }

    if (line.startsWith("TEXT:")) {
      currentPage.blocks.push({
        id: uuid(),
        type: "text",
        html: line.replace("TEXT:", "").trim(),
      });
      continue;
    }

    if (line.startsWith("IMAGE:")) {
      currentPage.blocks.push({
        id: uuid(),
        type: "image",
        src: "",
      });
      continue;
    }

    if (line.startsWith("QUIZ:")) {
      const raw = line.replace("QUIZ:", "").trim();
      const parts = raw.split("|");

      currentPage.blocks.push({
        id: uuid(),
        type: "quiz",
        question: parts[0] || "",
        options: parts.slice(1, 5),
        answer: parts[5] || "",
      });
      continue;
    }
  }

  if (currentPage) pages.push(currentPage);

  return {
    id: `proj-${uuid()}`,
    title,
    version: "1.2",
    pages,
  };
}
