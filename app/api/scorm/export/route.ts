import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';
import { EditorProject } from '@/lib/scorm/types';
import { promises as fs } from 'fs';
import path from 'path';

const THEME_CSS = `
:root {
  color-scheme: light;
  --bg: #fafafa;
  --card: #ffffff;
  --text: #111111;
  --muted: #4b5563;
  --stroke: #e5e7eb;
  --accent: #2563eb;
  --accent-soft: #e0e7ff;
  --success: #16a34a;
  --danger: #dc2626;
  --shadow: 0 10px 30px rgba(17, 24, 39, 0.08);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  letter-spacing: -0.01em;
}

a {
  color: inherit;
}

.progress-track {
  position: sticky;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  z-index: 10;
}

.progress-bar {
  height: 4px;
  width: 0;
  background: linear-gradient(90deg, #6366f1, #2563eb);
  transition: width 240ms ease;
}

.page-shell {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 18px 120px;
}

.page-header {
  padding: 18px 0 8px;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--muted);
  font-size: 12px;
  margin: 0 0 6px;
}

.title {
  margin: 0;
  font-weight: 800;
  font-size: clamp(26px, 4vw, 34px);
}

.content-area {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 40vh;
}

.page-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--muted);
  font-size: 14px;
}

.page-meta .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--muted);
}

.block-card {
  background: var(--card);
  border-radius: 18px;
  box-shadow: var(--shadow);
  padding: 20px;
  border: 1px solid rgba(229, 231, 235, 0.5);
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.block-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 38px rgba(17, 24, 39, 0.1);
}

.block-card h2,
.block-card h3,
.block-card h4 {
  margin-top: 0;
}

.block-text p {
  margin: 0.3em 0;
}

.block-image img,
.block-video video {
  width: 100%;
  border-radius: 14px;
  display: block;
}

.block-image figcaption {
  margin-top: 10px;
  color: var(--muted);
  font-size: 14px;
}

.block-quiz .quiz-question {
  font-weight: 700;
  margin: 0 0 14px;
  font-size: 18px;
}

.quiz-options {
  display: grid;
  gap: 10px;
}

.quiz-option {
  position: relative;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--stroke);
  cursor: pointer;
  background: #fff;
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
  display: flex;
  gap: 10px;
  align-items: center;
}

.quiz-option input {
  display: none;
}

.quiz-option .marker {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  border: 2px solid var(--muted);
  flex-shrink: 0;
  position: relative;
}

.quiz-option:hover {
  border-color: #cbd5e1;
  transform: translateY(-1px);
  box-shadow: 0 10px 26px rgba(17, 24, 39, 0.08);
}

.quiz-option.is-selected {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.quiz-option.is-selected .marker {
  border-color: var(--accent);
  box-shadow: inset 0 0 0 4px #2563eb;
}

.quiz-option.is-correct {
  border-color: var(--success);
  background: #ecfdf3;
}

.quiz-option.is-correct .marker {
  border-color: var(--success);
  box-shadow: inset 0 0 0 4px var(--success);
}

.quiz-option.is-incorrect {
  border-color: var(--danger);
  background: #fef2f2;
}

.quiz-option.is-incorrect .marker {
  border-color: var(--danger);
  box-shadow: inset 0 0 0 4px var(--danger);
}

.block-interactive,
.block-video,
.block-image,
.block-text {
  width: 100%;
}

.block-interactive iframe,
.block-interactive .responsive-iframe,
.block-text iframe {
  width: 100%;
  min-height: 260px;
  border: 1px solid var(--stroke);
  border-radius: 12px;
}

.floating-nav {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 12px;
  z-index: 20;
}

.nav-button {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.04);
  background: #fff;
  box-shadow: 0 12px 30px rgba(17, 24, 39, 0.14);
  color: var(--text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
}

.nav-button:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}

.nav-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 38px rgba(17, 24, 39, 0.16);
}

.nav-button.primary {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #fff;
}

.nav-button.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #eef2ff;
  color: #3730a3;
  font-weight: 600;
  font-size: 13px;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--muted);
  font-size: 14px;
}

.fade-in {
  animation: fadeIn 220ms ease;
}

@keyframes fadeIn {
  from { opacity: 0; translate: 0 4px; }
  to { opacity: 1; translate: 0 0; }
}

@media (max-width: 640px) {
  .page-shell { padding: 18px 14px 110px; }
  .floating-nav { right: 14px; bottom: 14px; }
  .nav-button { width: 50px; height: 50px; }
}
`;

const PLAYER_JS = `(() => {
  const state = { pages: [], currentIndex: 0 };
  // Lightweight SPA navigation (no reloads) with keyboard + floating buttons

  const contentEl = document.getElementById('content');
  const progressEl = document.getElementById('progress-bar');
  const pageTitleEl = document.getElementById('page-title');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  function updateProgress() {
    if (!state.pages.length || !progressEl) return;
    const percent = ((state.currentIndex + 1) / state.pages.length) * 100;
    progressEl.style.width = percent + '%';
  }

  function updateNavState() {
    if (!prevBtn || !nextBtn) return;
    prevBtn.classList.toggle('is-disabled', state.currentIndex === 0);
    nextBtn.classList.toggle('is-disabled', state.currentIndex >= state.pages.length - 1);
  }

  function renderBlock(block) {
    const wrapper = document.createElement(block.type === 'text' ? 'section' : 'article');
    wrapper.className = 'block-card block-' + block.type + ' fade-in';

    if (block.type === 'text') {
      wrapper.innerHTML = block.html || '';
      return wrapper;
    }

    if (block.type === 'image') {
      const fig = document.createElement('figure');
      const img = document.createElement('img');
      img.src = block.src;
      img.alt = block.alt || '';
      fig.appendChild(img);
      if (block.alt) {
        const caption = document.createElement('figcaption');
        caption.textContent = block.alt;
        fig.appendChild(caption);
      }
      wrapper.appendChild(fig);
      return wrapper;
    }

    if (block.type === 'video') {
      const video = document.createElement('video');
      video.controls = true;
      video.src = block.src;
      wrapper.appendChild(video);
      return wrapper;
    }

    if (block.type === 'quiz') {
      const question = document.createElement('p');
      question.className = 'quiz-question';
      question.innerHTML = block.questionHtml || block.question;

      const options = document.createElement('div');
      options.className = 'quiz-options';

      (block.options || []).forEach((option) => {
        const label = document.createElement('label');
        label.className = 'quiz-option';
        label.setAttribute('role', 'radio');
        label.setAttribute('tabindex', '0');
        label.dataset.optionId = option.id;
        if (option.correct) label.dataset.correct = 'true';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = block.id;
        input.value = option.id;

        const marker = document.createElement('span');
        marker.className = 'marker';

        const text = document.createElement('span');
        text.textContent = option.label;

        const selectOption = () => {
          options.querySelectorAll('.quiz-option').forEach((opt) => {
            opt.classList.remove('is-selected', 'is-correct', 'is-incorrect');
          });
          label.classList.add('is-selected');
          if (option.correct) {
            label.classList.add('is-correct');
          } else if (options.querySelector('[data-correct]')) {
            label.classList.add('is-incorrect');
          }
          input.checked = true;
        };

        label.addEventListener('click', selectOption);
        label.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            selectOption();
          }
        });

        label.append(input, marker, text);
        options.appendChild(label);
      });

      wrapper.classList.add('block-quiz');
      wrapper.append(question, options);
      return wrapper;
    }

    wrapper.innerHTML = block.bodyHtml || block.customHtml || '';
    return wrapper;
  }

  // Swap content without reloads and refresh progress UI
  function renderPage(index) {
    if (!state.pages.length || !contentEl) return;
    state.currentIndex = Math.max(0, Math.min(index, state.pages.length - 1));
    const page = state.pages[state.currentIndex];

    contentEl.innerHTML = '';

    if (pageTitleEl) {
      pageTitleEl.textContent = page.title;
    }

    const meta = document.createElement('div');
    meta.className = 'page-meta fade-in';
    meta.innerHTML = '<span class="pill">Lesson</span><span class="dot"></span><span class="status">Page ' + (state.currentIndex + 1) + ' of ' + state.pages.length + '</span>';
    contentEl.appendChild(meta);

    page.blocks.forEach((block) => {
      const card = renderBlock(block);
      contentEl.appendChild(card);
    });

    updateProgress();
    updateNavState();
  }

  function goNext() {
    if (state.currentIndex < state.pages.length - 1) {
      renderPage(state.currentIndex + 1);
    }
  }

  function goPrev() {
    if (state.currentIndex > 0) {
      renderPage(state.currentIndex - 1);
    }
  }

  // Floating buttons + arrow keys control page changes
  function wireNavigation() {
    if (nextBtn) nextBtn.addEventListener('click', goNext);
    if (prevBtn) prevBtn.addEventListener('click', goPrev);

    window.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') goNext();
      if (event.key === 'ArrowLeft') goPrev();
    });
  }

  // Initialize player after DOM is ready
  async function boot() {
    wireNavigation();

    try {
      const res = await fetch('./blocks/pages.json');
      state.pages = await res.json();
      renderPage(0);
    } catch (err) {
      if (contentEl) {
        contentEl.innerHTML = '<p class="block-card">Unable to load lesson content.</p>';
      }
      console.error('Failed to load SCORM blocks', err);
    }
  }

  document.addEventListener('DOMContentLoaded', boot);
})();`;

// Helper function to read template files
async function getTemplateFile(filePath: string): Promise<string> {
  const absolutePath = path.join(process.cwd(), 'lib/scorm/templates/scorm2004', filePath);
  return fs.readFile(absolutePath, 'utf-8');
}

export async function POST(req: NextRequest) {
  try {
    const project = await req.json() as EditorProject;

    const zip = new JSZip();

    // Add all XSD files to the zip
    const xsdFiles = ['imscp_v1p1.xsd', 'adlcp_v1p3.xsd', 'adlnav_v1p3.xsd', 'adlseq_v1p3.xsd', 'imsss_v1p0.xsd', 'xml.xsd'];
    for (const xsdFile of xsdFiles) {
        zip.file(xsdFile, await getTemplateFile(xsdFile));
    }

    // Create and configure imsmanifest.xml
    let manifest = await getTemplateFile('imsmanifest.xml');
    const manifestFiles = [
      '<file href="index.html" />',
      '<file href="styles/theme.css" />',
      '<file href="scripts/player.js" />',
      '<file href="blocks/pages.json" />',
    ];

    manifest = manifest.replace(/\\[\\[IDENTIFIER\\]\\]/g, project.id)
                       .replace(/\\[\\[TITLE\\]\\]/g, project.title)
                       .replace(/\\[\\[ORGANIZATION_ID\\]\\]/g, `${project.id}-org`)
                       .replace(/\\[\\[FILES\\]\\]/g, manifestFiles.join('\n        '));

    zip.file('imsmanifest.xml', manifest);

    const blocksFolder = zip.folder('blocks');
    const stylesFolder = zip.folder('styles');
    const scriptsFolder = zip.folder('scripts');

    if (!blocksFolder || !stylesFolder || !scriptsFolder) {
      throw new Error('Unable to create SCORM asset folders');
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="${project.language || 'en'}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${project.title}</title>
        <link rel="stylesheet" href="./styles/theme.css">
        <script>
          // Mock SCORM API for demonstration purposes
          var API = {
            LMSInitialize: function() { console.log('LMSInitialize'); return 'true'; },
            LMSFinish: function() { console.log('LMSFinish'); return 'true'; },
            LMSGetValue: function(name) { console.log('LMSGetValue', name); return ''; },
            LMSSetValue: function(name, value) { console.log('LMSSetValue', name, value); return 'true'; },
            LMSCommit: function() { console.log('LMSCommit'); return 'true'; },
            LMSGetLastError: function() { console.log('LMSGetLastError'); return '0'; },
            LMSGetErrorString: function(code) { console.log('LMSGetErrorString', code); return 'No error'; },
            LMSGetDiagnostic: function(code) { console.log('LMSGetDiagnostic', code); return 'No error'; },
          };
        </script>
      </head>
      <body>
        <div class="progress-track" aria-hidden="true">
          <div id="progress-bar" class="progress-bar"></div>
        </div>

        <div class="page-shell">
          <header class="page-header">
            <p class="eyebrow">SCORM lesson</p>
            <h1 class="title">${project.title}</h1>
            <p id="page-title" class="status" aria-live="polite">Loading...</p>
          </header>

          <main id="content" class="content-area" aria-live="polite" aria-atomic="true">
            <article class="block-card">Preparing your lesson...</article>
          </main>
        </div>

        <div class="floating-nav" aria-label="Page navigation">
          <button id="prevBtn" class="nav-button" type="button" aria-label="Previous page">←</button>
          <button id="nextBtn" class="nav-button primary" type="button" aria-label="Next page">→</button>
        </div>

        <script src="./scripts/player.js" defer></script>
      </body>
      </html>
    `;

    blocksFolder.file('pages.json', JSON.stringify(project.pages, null, 2));
    stylesFolder.file('theme.css', THEME_CSS);
    scriptsFolder.file('player.js', PLAYER_JS);
    zip.file('index.html', htmlContent);

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${project.title.replace(/ /g, '_')}.zip"`,
      },
    });

  } catch (error) {
    console.error('Error creating SCORM package:', error);
    return new NextResponse('Error creating SCORM package', { status: 500 });
  }
}
