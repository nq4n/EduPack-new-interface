module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/app/api/scorm/export/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jszip$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jszip/lib/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
;
;
// Helper function to read template files
async function getTemplateFile(filePath) {
    const absolutePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'lib/scorm/templates/scorm2004', filePath);
    return __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readFile(absolutePath, 'utf-8');
}
async function POST(req) {
    try {
        const project = await req.json();
        const zip = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jszip$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]();
        // Add all XSD files to the zip
        const xsdFiles = [
            'imscp_v1p1.xsd',
            'adlcp_v1p3.xsd',
            'adlnav_v1p3.xsd',
            'adlseq_v1p3.xsd',
            'imsss_v1p0.xsd',
            'xml.xsd'
        ];
        for (const xsdFile of xsdFiles){
            zip.file(xsdFile, await getTemplateFile(xsdFile));
        }
        // Create and configure imsmanifest.xml
        let manifest = await getTemplateFile('imsmanifest.xml');
        manifest = manifest.replace(/\\[\\[IDENTIFIER\\]\\]/g, project.id).replace(/\\[\\[TITLE\\]\\]/g, project.title).replace(/\\[\\[ORGANIZATION_ID\\]\\]/g, `${project.id}-org`).replace(/\\[\\[FILES\\]\\]/g, '<file href="index.html" />');
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
        ${project.pages.map((page)=>`
          <article>
            <h2>${page.title}</h2>
            ${page.blocks.map((block)=>{
                switch(block.type){
                    case 'text':
                        return block.html;
                    case 'image':
                        return `<figure><img src="${block.src}" alt="${block.alt || ''}"><figcaption>${block.alt || ''}</figcaption></figure>`;
                    case 'video':
                        return `<video src="${block.src}" controls></video>`;
                    case 'quiz':
                        return `
                  <form>
                    <fieldset>
                      <legend>${block.question}</legend>
                      ${block.options.map((o)=>`
                        <div>
                          <input type="radio" id="${o.id}" name="${block.id}" value="${o.id}">
                          <label for="${o.id}">${o.label}</label>
                        </div>
                      `).join('')}
                    </fieldset>
                  </form>
                `;
                    default:
                        return '';
                }
            }).join('')}
          </article>
        `).join('')}
      </body>
      </html>
    `;
        zip.file('index.html', htmlContent);
        const zipBuffer = await zip.generateAsync({
            type: 'nodebuffer'
        });
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](zipBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': `attachment; filename="${project.title.replace(/ /g, '_')}.zip"`
            }
        });
    } catch (error) {
        console.error('Error creating SCORM package:', error);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]('Error creating SCORM package', {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a091146f._.js.map