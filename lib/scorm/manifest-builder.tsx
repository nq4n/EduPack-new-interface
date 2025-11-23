// lib/scorm/manifest-builder.ts

import type { SCORMManifest } from "./types"

export function createManifestXml(manifest: SCORMManifest): string {
  const itemsXml = manifest.items
    .map(
      (item) => `
      <item identifier="${item.id}" identifierref="${item.id}_res" isvisible="true">
        <title>${escapeXml(item.title)}</title>
      </item>`,
    )
    .join("\n")

  const resourcesXml = manifest.resources
    .map(
      (res) => `
      <resource identifier="${res.id}_res" type="webcontent" href="${res.href}">
        ${res.files.map((f) => `<file href="${f}" />`).join("\n")}
      </resource>`,
    )
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${manifest.identifier}" version="1.0"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2
  imscp_rootv1p1p2.xsd
  http://www.adlnet.org/xsd/adlcp_rootv1p2
  adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="${manifest.organization}">
    <organization identifier="${manifest.organization}">
      <title>${escapeXml(manifest.title)}</title>
      ${itemsXml}
    </organization>
  </organizations>
  <resources>
    ${resourcesXml}
  </resources>
</manifest>
`
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}
