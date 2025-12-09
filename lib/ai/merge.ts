import { type EditorBlock, type EditorPage, type EditorProject } from "@/lib/scorm/types";

function mergeBlocks(existing: EditorBlock[], updates: EditorBlock[]) {
  const merged = [...existing];

  updates.forEach((block) => {
    const idx = merged.findIndex((b) => b.id === block.id);

    if (idx >= 0) {
      merged[idx] = { ...merged[idx], ...block } as EditorBlock;
    } else {
      merged.push(block);
    }
  });

  return merged;
}

function mergePages(existing: EditorPage[], updates: EditorPage[]) {
  const merged = [...existing];

  updates.forEach((page) => {
    const idx = merged.findIndex(
      (p) =>
        p.id === page.id ||
        p.title.trim().toLowerCase() === page.title.trim().toLowerCase(),
    );

    if (idx >= 0) {
      merged[idx] = {
        ...merged[idx],
        title: page.title || merged[idx].title,
        blocks: mergeBlocks(merged[idx].blocks, page.blocks ?? []),
      };
    } else {
      merged.push(page);
    }
  });

  return merged;
}

export function mergeProject(oldProject: EditorProject, partial: EditorProject) {
  const mergedPages = mergePages(oldProject.pages ?? [], partial.pages ?? []);

  return {
    ...oldProject,
    title: partial.title || oldProject.title,
    pages: mergedPages,
  };
}
