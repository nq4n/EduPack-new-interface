
import { EditorProject } from "@/lib/scorm/types";

// Level 0: Rules-based checks for the EduPack AI engine.

/**
 * Validates a lesson project based on a set of predefined rules.
 * @param project The editor project to validate.
 * @returns An array of warning messages. An empty array means the project is valid.
 */
export function validateProject(project: EditorProject): string[] {
    const warnings: string[] = [];

    if (!project.title || project.title.trim().length < 3) {
        warnings.push("Project title is too short.");
    }

    if (project.pages.length === 0) {
        warnings.push("Project has no pages.");
    }

    project.pages.forEach(page => {
        if (!page.title || page.title.trim().length < 3) {
            warnings.push(`Page "${page.id}" has a title that is too short.`);
        }
        // Example rule: Check for a realistic number of blocks per page.
        if (page.blocks.length > 20) {
            warnings.push(`Page "${page.title}" may have too many content blocks (${page.blocks.length}).`);
        }
    });

    // Example rule: Check for project-level metadata if it were added to the type.
    // if (!project.metadata || !project.metadata.gradeLevel) {
    //     warnings.push("Project is missing a grade level.");
    // }

    return warnings;
}

/**
 * Classifies a student's score into a descriptive label.
 * @param score The student's score, typically from 0 to 100.
 * @returns A label: "weak", "average", "good", or "excellent".
 */
export function classifyScore(score: number): "weak" | "average" | "good" | "excellent" {
    if (score < 50) return "weak";
    if (score < 75) return "average";
    if (score < 90) return "good";
    return "excellent";
}
