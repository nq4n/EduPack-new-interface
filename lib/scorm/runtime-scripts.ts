// lib/scorm/runtime-scripts.ts

export const SCORM12_RUNTIME = `
// Minimal SCORM 1.2 API stub
window.API = {
  LMSInitialize: function() { return "true"; },
  LMSFinish: function() { return "true"; },
  LMSGetValue: function() { return ""; },
  LMSSetValue: function() { return "true"; },
  LMSCommit: function() { return "true"; },
  LMSGetLastError: function() { return "0"; },
  LMSGetErrorString: function() { return ""; },
  LMSGetDiagnostic: function() { return ""; }
};
`

export const SCORM2004_RUNTIME = `
// Minimal SCORM 2004 API stub
window.API_1484_11 = {
  Initialize: function() { return "true"; },
  Terminate: function() { return "true"; },
  GetValue: function() { return ""; },
  SetValue: function() { return "true"; },
  Commit: function() { return "true"; },
  GetLastError: function() { return "0"; },
  GetErrorString: function() { return ""; },
  GetDiagnostic: function() { return ""; }
};
`
