import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';
import { EditorProject } from '@/lib/scorm/types';
import { promises as fs } from 'fs';
import path from 'path';

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
    manifest = manifest.replace(/\\[\\[IDENTIFIER\\]\\]/g, project.id)
                       .replace(/\\[\\[TITLE\\]\\]/g, project.title)
                       .replace(/\\[\\[ORGANIZATION_ID\\]\\]/g, `${project.id}-org`)
                       .replace(/\\[\\[FILES\\]\\]/g, '<file href="index.html" />');

    zip.file('imsmanifest.xml', manifest);

    // Generate and add index.html
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="${project.language || 'en'}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${project.title}</title>
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
        <h1>${project.title}</h1>
        ${project.pages.map(page => `
          <article>
            <h2>${page.title}</h2>
            ${page.blocks.map(block => {
              switch (block.type) {
                case 'text': return block.html;
                case 'image': return `<figure><img src="${block.src}" alt="${block.alt || ''}"><figcaption>${block.alt || ''}</figcaption></figure>`;
                case 'video': return `<video src="${block.src}" controls></video>`;
                case 'quiz': return `
                  <form>
                    <fieldset>
                      <legend>${block.question}</legend>
                      ${block.options.map(o => `
                        <div>
                          <input type="radio" id="${o.id}" name="${block.id}" value="${o.id}">
                          <label for="${o.id}">${o.label}</label>
                        </div>
                      `).join('')}
                    </fieldset>
                  </form>
                `;
                default: return '';
              }
            }).join('')}
          </article>
        `).join('')}
      </body>
      </html>
    `;

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
