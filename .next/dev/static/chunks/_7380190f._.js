(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ui/tabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>Tabs,
    "TabsContent",
    ()=>TabsContent,
    "TabsList",
    ()=>TabsList,
    "TabsTrigger",
    ()=>TabsTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-tabs/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
function Tabs({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "tabs",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col gap-2', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/tabs.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Tabs;
function TabsList({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["List"], {
        "data-slot": "tabs-list",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/tabs.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c1 = TabsList;
function TabsTrigger({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "tabs-trigger",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/tabs.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c2 = TabsTrigger;
function TabsContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
        "data-slot": "tabs-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex-1 outline-none', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/tabs.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c3 = TabsContent;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Tabs");
__turbopack_context__.k.register(_c1, "TabsList");
__turbopack_context__.k.register(_c2, "TabsTrigger");
__turbopack_context__.k.register(_c3, "TabsContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/translations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "t",
    ()=>t,
    "translations",
    ()=>translations
]);
const translations = {
    en: {
        "nav.home": "Home",
        "nav.scorm-ai": "SCORM AI",
        "nav.features": "Features",
        "nav.pricing": "Pricing",
        "nav.upload": "Upload",
        "nav.login": "Login",
        "nav.register": "Register",
        "nav.account": "Account",
        "nav.about": "About",
        "nav.resources": "Resources",
        "nav.privacy": "Privacy",
        "nav.terms": "Terms",
        "nav.shop": "Packages",
        "nav.switchLanguage": "Switch Language",
        "hero.title": "Create SCORM packages with AI",
        "hero.description": "The easiest way to build modern, interactive, and beautiful SCORM packages for your LMS. Leverage AI to generate content, quizzes, and more.",
        "hero.cta.start": "Start Creating for Free",
        "hero.cta.browse": "Browse Packages",
        "hero.no-card": "No credit card required",
        "hero.free-trial": "14-day free trial",
        "preview.name": "Name",
        "preview.title.name": "Name your course",
        "preview.grade": "Grade",
        "preview.title.grade": "Assign a grade level",
        "preview.subject": "Subject",
        "preview.title.subject": "Choose a subject",
        "preview.measure": "Measure",
        "preview.title.measure": "Define success metrics",
        "preview.language": "Language",
        "preview.title.language": "Select the language",
        "preview.area": "This is a preview of the content you can generate.",
        "preview.play": "Play",
        "preview.view": "View Content",
        "featured-packages.title": "Featured Packages",
        "feature.scorm.title": "SCORM 1.2 & 2004",
        "feature.scorm.desc": "Export your courses to the most popular SCORM standards.",
        "feature.ai.title": "AI-Powered Content",
        "feature.ai.desc": "Generate engaging and interactive content with the help of AI.",
        "feature.marketplace.title": "Marketplace",
        "feature.marketplace.desc": "Buy and sell pre-built SCORM packages from other creators.",
        "feature.lms.title": "LMS Agnostic",
        "feature.lms.desc": "Our packages work with any SCORM-compliant Learning Management System.",
        "audience.title": "Who is it for?",
        "audience.teachers.title": "Teachers & Educators",
        "audience.teachers.point1": "Create engaging lessons and quizzes.",
        "audience.teachers.point2": "Save time on content creation.",
        "audience.teachers.point3": "Easily share with your students.",
        "audience.teachers.point4": "Track student progress and performance.",
        "audience.institutions.title": "Institutions & Companies",
        "audience.institutions.point1": "Standardize your training materials.",
        "audience.institutions.point2": "Deploy content across your organization.",
        "audience.institutions.point3": "Ensure compliance and consistency.",
        "audience.institutions.point4": "Integrate with your existing LMS.",
        "cta.title": "Ready to get started?",
        "cta.description": "Create your first SCORM package today and see how easy it can be.",
        "cta.button": "Sign Up for Free",
        "footer.proudly": "Proudly made in 🇵🇸",
        "footer.product": "Product",
        "footer.support": "Support",
        "footer.company": "Company",
        "footer.about": "About",
        "footer.privacy": "Privacy",
        "footer.terms": "Terms",
        "footer.rights": "All rights reserved.",
        "footer.help": "Help Center",
        "footer.contact": "Contact",
        "scorm.props.title": "Properties",
        "scorm.props.desc": "Edit the properties of the selected block.",
        "scorm.props.block.text.html": "HTML Content",
        "scorm.props.block.image.src": "Image Source URL",
        "scorm.props.block.image.alt": "Alt Text",
        "scorm.props.block.video.src": "Video Source URL",
        "scorm.props.block.quiz.question": "Question",
        "scorm.ai.untitledProject": "Untitled Project",
        "scorm.ai.introduction": "Introduction",
        "scorm.ai.notConfigured": "AI connection is not configured yet. This is just a UI placeholder.",
        "scorm.ai.projectSaved": "Project saved to local storage!",
        "scorm.ai.exportFailed": "Export failed",
        "scorm.ai.exportError": "Error exporting project. See console for details.",
        "scorm.ai.newTextBlock": "<p>New text block. Edit me!</p>",
        "scorm.ai.placeholderImage": "Placeholder image",
        "scorm.ai.newQuestion": "New Question",
        "scorm.ai.option1": "Option 1",
        "scorm.ai.option2": "Option 2",
        "scorm.ai.projectLoaded": "Project loaded from file.",
        "scorm.ai.invalidProjectFile": "Invalid project file.",
        "scorm.ai.media": "Media",
        "scorm.choice.title": "Create a New SCORM Package",
        "scorm.choice.description": "Choose how you want to start building your learning package.",
        "scorm.choice.aiAssistant": "Build with AI Assistant",
        "scorm.choice.aiAssistantDesc": "Let AI help create your course content.",
        "scorm.choice.blankPage": "Start from a Blank Page",
        "scorm.choice.blankPageDesc": "Build everything manually from scratch.",
        "scorm.nav.hide": "Hide navigation bar",
        "scorm.nav.show": "Show navigation bar",
        "scorm.ai.close": "✕",
        "scorm.tools.ai": "AI",
        "scorm.alerts.interactiveSoon": "Interactive elements will be available soon.",
        "scorm.alerts.settingsLater": "Package settings will be designed later.",
        "shop.title": "SCORM Packages Marketplace",
        "shop.desc": "Browse and purchase high-quality SCORM packages created by our community.",
        "shop.search": "Search for packages...",
        "shop.filter.grades": "All Grades",
        "shop.filter.subjects": "All Subjects",
        "shop.filter.sort": "Sort by",
        "shop.filter.free": "Free",
        "shop.filter.paid": "Paid",
        "shop.filter.more": "More Filters",
        "shop.view": "View",
        "shop.packages.1.title": "Introduction to Fractions",
        "shop.packages.1.grade": "Grade 5",
        "shop.packages.1.subject": "Mathematics",
        "shop.packages.1.language": "English",
        "shop.packages.1.description": "Interactive lesson covering fraction basics with visual aids and practice quizzes",
        "shop.packages.1.price": "Free",
        "shop.packages.2.title": "Solar System Explorer",
        "shop.packages.2.grade": "Grade 7",
        "shop.packages.2.subject": "Science",
        "shop.packages.2.language": "English",
        "shop.packages.2.description": "Journey through our solar system with interactive 3D models and activities",
        "shop.packages.3.title": "Shakespeare: Romeo & Juliet",
        "shop.packages.3.grade": "High School",
        "shop.packages.3.subject": "Literature",
        "shop.packages.3.language": "English",
        "shop.packages.3.description": "Comprehensive study guide with character analysis and interactive scenes",
        "shop.packages.4.title": "Basic Chemistry Reactions",
        "shop.packages.4.grade": "Grade 9",
        "shop.packages.4.subject": "Chemistry",
        "shop.packages.4.language": "English",
        "shop.packages.4.description": "Virtual lab experiments demonstrating fundamental chemical reactions safely",
        "shop.packages.5.title": "World Geography Quiz",
        "shop.packages.5.grade": "Grade 6",
        "shop.packages.5.subject": "Geography",
        "shop.packages.5.language": "English",
        "shop.packages.5.description": "Interactive maps and quizzes covering continents, countries, and capitals",
        "shop.packages.5.price": "Free",
        "shop.packages.6.title": "Python Programming Basics",
        "shop.packages.6.grade": "High School",
        "shop.packages.6.subject": "Computer Science",
        "shop.packages.6.language": "English",
        "shop.packages.6.description": "Learn Python fundamentals with interactive coding exercises and projects",
        "shop.filter.elementary": "Elementary",
        "shop.filter.middleSchool": "Middle School",
        "shop.filter.highSchool": "High School",
        "shop.filter.mathematics": "Mathematics",
        "shop.filter.science": "Science",
        "shop.filter.literature": "Literature",
        "shop.filter.newest": "Newest",
        "shop.filter.priceLowHigh": "Price: Low to High",
        "shop.filter.priceHighLow": "Price: High to Low",
        "scorm.ai.previewTitle": "Preview: {{title}}",
        "scorm.topbar.preview": "Preview",
        "scorm.topbar.export": "Export",
        "scorm.topbar.status.draft": "Draft",
        "scorm.topbar.status.published": "Published",
        "scorm.ai.title": "AI Assistant",
        "scorm.ai.placeholder": "Ask AI to generate content...",
        "scorm.ai.send": "Send",
        "scorm.canvas.title": "Canvas",
        "scorm.canvas.desc": "Start building your course by adding blocks.",
        "scorm.canvas.start": "Start Building",
        "scorm.tools.upload": "Upload",
        "scorm.tools.interactive": "Interactive",
        "scorm.tools.quiz": "Quiz",
        "scorm.tools.pageEditor": "Page Editor",
        "scorm.tools.media": "Media",
        "scorm.tools.text": "Text",
        "scorm.tools.settings": "Settings",
        "scorm.tools.mediaPrompt": "Paste an image URL to insert as media:",
        "scorm.tools.newPage": "Page {{number}}",
        "scorm.tools.history": "Edit history (coming soon)",
        "scorm.ai.welcome": "Welcome to the AI assistant! How can I help you build your course?",
        "scorm.props.project.styles.title": "Default Styles",
        "scorm.props.project.styles.desc": "Set default text styles for the entire project.",
        "scorm.props.project.direction.title": "Text Direction",
        "scorm.props.project.direction.desc": "Set the text direction for the whole page.",
        "scorm.props.project.direction.ltr": "Left-to-Right",
        "scorm.props.project.direction.rtl": "Right-to-Left",
        "scorm.projectPanel.title": "Project Settings",
        "scorm.projectPanel.subtitle": "Manage overall course settings.",
        "scorm.projectPanel.generalSettings": "General",
        "scorm.projectPanel.projectTitle": "Project Title",
        "scorm.projectPanel.language": "Language",
        "scorm.projectPanel.pageOrganization": "Page Organization",
        "scorm.projectPanel.addPage": "Add Page",
        "scorm.projectPanel.deleteLastPageError": "You cannot delete the last page.",
        "scorm.projectPanel.deleteConfirm": "Are you sure you want to delete this page?",
        "resources.title": "How to Use EduPack",
        "resources.description": "Step-by-step guides, video tutorials, and resources to help you get the most out of EduPack",
        "resources.guide1.title": "Create your first package with SCORM AI",
        "resources.guide1.description": "Learn how to use our AI-powered authoring tool to build interactive SCORM packages from scratch",
        "resources.guide1.duration": "10 min read",
        "resources.guide1.level": "Beginner",
        "resources.guide2.title": "Upload and publish a package",
        "resources.guide2.description": "Step-by-step guide to uploading your existing SCORM content and making it available in the marketplace",
        "resources.guide2.duration": "5 min read",
        "resources.guide2.level": "Beginner",
        "resources.guide3.title": "Buy and download packages from the shop",
        "resources.guide3.description": "Discover how to find, preview, and purchase ready-made educational packages for your LMS",
        "resources.guide3.duration": "7 min read",
        "resources.guide3.level": "Beginner",
        "resources.guide4.title": "Connect EduPack packages to your LMS",
        "resources.guide4.description": "Integration guides for Moodle, Canvas, Blackboard, and other popular learning management systems",
        "resources.guide4.duration": "15 min read",
        "resources.guide4.level": "Intermediate",
        "resources.videos.title": "Video Tutorials",
        "resources.video1.title": "Getting Started with EduPack",
        "resources.video1.duration": "8:34",
        "resources.video2.title": "AI Content Generation Tips",
        "resources.video2.duration": "12:15",
        "resources.video3.title": "Advanced Authoring Techniques",
        "resources.video3.duration": "18:47",
        "resources.docs.title": "Documentation",
        "resources.doc1.title": "API Documentation",
        "resources.doc1.description": "For developers integrating EduPack",
        "resources.doc2.title": "Best Practices Guide",
        "resources.doc2.description": "Tips for creating effective content",
        "resources.doc3.title": "SCORM Standards Reference",
        "resources.doc3.description": "Understanding SCORM specifications",
        "resources.help.title": "Need Help? Contact Our Team",
        "resources.help.description": "Our support team is here to help you succeed. Reach out anytime with questions or feedback.",
        "resources.contact1.name": "Muiayad Al HAsani",
        "resources.contact1.role": "page devloper",
        "resources.contact2.name": "Ali Al Badri",
        "resources.contact2.role": "page desginer",
        "resources.help.chat": "Live Chat Support",
        "resources.form.title": "Send us a message",
        "resources.form.name": "Your Name",
        "resources.form.name.placeholder": "John Doe",
        "resources.form.email": "Email",
        "resources.form.email.placeholder": "you@example.com",
        "resources.form.message": "Message",
        "resources.form.message.placeholder": "How can we help you?",
        "resources.form.send": "Send Message",
        "resources.guide.open": "Open Guide",
        "features.hero.title": "Why Choose EduPack?",
        "features.hero.description": "The most powerful and user-friendly SCORM authoring platform for educators and institutions. Create professional e-learning content without the complexity.",
        "features.comparison.title": "EduPack vs Traditional Tools",
        "features.comparison.feature": "Feature",
        "features.comparison.traditional": "Traditional Tools",
        "features.comparison.edupack": "EduPack",
        "features.comparison.price.feature": "Starting Price",
        "features.comparison.price.traditional": "$500-2000/year",
        "features.comparison.price.edupack": "$9 (pay as you go)",
        "features.comparison.curve.feature": "Learning Curve",
        "features.comparison.curve.traditional": "Weeks to months",
        "features.comparison.curve.edupack": "Minutes to hours",
        "features.comparison.ai.feature": "AI Assistance",
        "features.comparison.ai.traditional": "None",
        "features.comparison.ai.edupack": "Built-in AI content generation",
        "features.comparison.marketplace.feature": "Marketplace",
        "features.comparison.marketplace.traditional": "Separate platforms",
        "features.comparison.marketplace.edupack": "Integrated buy & sell",
        "features.comparison.support.feature": "Technical Support",
        "features.comparison.support.traditional": "Business hours only",
        "features.comparison.support.edupack": "24/7 community + priority support",
        "features.grid.title": "Everything You Need to Create Amazing Content",
        "features.grid.description": "Powerful features designed to make SCORM authoring accessible to everyone",
        "features.grid.card1.title": "AI-Assisted Content",
        "features.grid.card1.description": "Generate engaging educational content, quizzes, and activities with AI-powered suggestions tailored to your subject.",
        "features.grid.card2.title": "Ready-Made Templates",
        "features.grid.card2.description": "Start with professionally designed templates for lessons, courses, and assessments. Customize to match your brand.",
        "features.grid.card3.title": "Universal Export",
        "features.grid.card3.description": "Export to SCORM 1.2, SCORM 2004, or xAPI with one click. Compatible with all major LMS platforms.",
        "features.grid.card4.title": "Team Collaboration",
        "features.grid.card4.description": "Work together with colleagues in real-time. Share resources, review content, and maintain consistency.",
        "features.grid.card5.title": "Built-in Analytics",
        "features.grid.card5.description": "Track learner engagement and performance with comprehensive analytics and reporting tools.",
        "features.grid.card6.title": "Multi-Language Support",
        "features.grid.card6.description": "Create content in English, Arabic, Spanish, French, and more. RTL support included.",
        "features.grid.card7.title": "Lightning Fast",
        "features.grid.card7.description": "Build and export packages in minutes, not days. Our optimized workflow keeps you productive.",
        "features.grid.card8.title": "Sell Your Content",
        "features.grid.card8.description": "Monetize your expertise by selling packages on our marketplace. Set your own prices and earn revenue.",
        "features.grid.card9.title": "Smart Suggestions",
        "features.grid.card9.description": "Get contextual recommendations for images, activities, and assessments as you build.",
        "features.cta.title": "Ready to Experience the Difference?",
        "features.cta.description": "Join thousands of educators who have simplified their e-learning content creation",
        "features.cta.start": "Get Started Free",
        "features.cta.pricing": "View Pricing",
        "scorm.projectPanel.generalTracking": "General Tracking",
        "scorm.projectPanel.tracking.minimal": "Minimal",
        "scorm.projectPanel.tracking.standard": "Standard",
        "scorm.projectPanel.tracking.advanced": "Advanced",
        "scorm.projectPanel.advancedOptions": "Advanced Options",
        "scorm.projectPanel.tracking.pageViews": "Track page views",
        "scorm.projectPanel.tracking.quizInteractions": "Track quiz interactions",
        "scorm.projectPanel.tracking.media": "Track media (play/pause/seek)",
        "scorm.projectPanel.tracking.hints": "Track hints/help usage",
        "scorm.projectPanel.tracking.externalLinks": "Track external links",
        "scorm.projectPanel.tracking.timePerPage": "Track time per page",
        "scorm.projectPanel.tracking.attempts": "Track attempts",
        "scorm.projectPanel.xapiOptions": "xAPI Only Options",
        "scorm.projectPanel.xapi.lrsEndpoint": "LRS Endpoint",
        "scorm.projectPanel.xapi.authToken": "Auth token",
        "scorm.projectPanel.xapi.activityIdFormat": "Activity ID format",
        "scorm.projectPanel.xapi.statementExtensions": "Statement extensions",
        "scorm.projectPanel.exportPanel": "Export Options",
        "scorm.projectPanel.export.scorm12": "SCORM 1.2",
        "scorm.projectPanel.export.scorm2004": "SCORM 2004",
        "scorm.projectPanel.export.xapi": "xAPI/cmi5",
        "scorm.projectPanel.export.html5": "HTML5 Package",
        "scorm.projectPanel.export.publicLink": "Public Link",
        "scorm.projectPanel.export.embedCode": "Embed Code",
        "scorm.projectPanel.export.teacherPdf": "Teacher PDF",
        "scorm.projectPanel.export.studentPdf": "Student PDF",
        "scorm.projectPanel.export.json": "JSON source",
        "scorm.projectPanel.export.qti": "QTI/Moodle Question Bank",
        "scorm.props.project.styles.textColor": "Text Color",
        "pricing.title": "Flexible Pricing for Every Creator",
        "pricing.description": "Choose the plan that's right for you. Get started with credits or subscribe for unlimited access.",
        "pricing.tabs.credits": "Pay-as-you-go Credits",
        "pricing.tabs.subscribe": "Subscription Plans",
        "pricing.credits.starter.title": "Starter Pack",
        "pricing.credits.starter.credits": "100 Credits",
        "pricing.credits.starter.price": "$9",
        "pricing.credits.starter.description": "Perfect for trying out the platform.",
        "pricing.credits.starter.feature1": "100 AI content generations",
        "pricing.credits.starter.feature2": "Export up to 5 packages",
        "pricing.credits.starter.feature3": "Basic support",
        "pricing.credits.starter.feature4": "Access to marketplace",
        "pricing.credits.starter.cta": "Get Started",
        "pricing.credits.teacher.title": "Teacher Pack",
        "pricing.credits.teacher.credits": "500 Credits",
        "pricing.credits.teacher.price": "$39",
        "pricing.credits.teacher.description": "Ideal for individual educators.",
        "pricing.credits.teacher.feature1": "500 AI content generations",
        "pricing.credits.teacher.feature2": "Export up to 25 packages",
        "pricing.credits.teacher.feature3": "Priority support",
        "pricing.credits.teacher.feature4": "Access to marketplace",
        "pricing.credits.teacher.feature5": "Publish to marketplace",
        "pricing.credits.teacher.cta": "Choose Teacher Pack",
        "pricing.credits.team.title": "Team Pack",
        "pricing.credits.team.credits": "2000 Credits",
        "pricing.credits.team.price": "$129",
        "pricing.credits.team.description": "Best for schools and institutions.",
        "pricing.credits.team.feature1": "2000 AI content generations",
        "pricing.credits.team.feature2": "Unlimited package exports",
        "pricing.credits.team.feature3": "Dedicated support",
        "pricing.credits.team.feature4": "Team collaboration features",
        "pricing.credits.team.feature5": "Publish to marketplace",
        "pricing.credits.team.feature6": "Custom branding",
        "pricing.credits.team.cta": "Contact Sales",
        "pricing.subscribe.monthly.title": "Monthly",
        "pricing.subscribe.monthly.subtitle": "All features, unlimited usage.",
        "pricing.subscribe.monthly.price": "$49",
        "pricing.subscribe.monthly.period": "/ month",
        "pricing.subscribe.monthly.description": "Cancel anytime.",
        "pricing.subscribe.monthly.feature1": "Unlimited AI generations",
        "pricing.subscribe.monthly.feature2": "Unlimited package exports",
        "pricing.subscribe.monthly.feature3": "Priority support",
        "pricing.subscribe.monthly.feature4": "Team collaboration",
        "pricing.subscribe.monthly.feature5": "Publish to marketplace",
        "pricing.subscribe.monthly.cta": "Subscribe Now",
        "pricing.subscribe.semester.title": "Semester",
        "pricing.subscribe.semester.subtitle": "Save 20% with semester billing.",
        "pricing.subscribe.semester.price": "$199",
        "pricing.subscribe.semester.period": "/ 6 months",
        "pricing.subscribe.semester.description": "Pay once for the whole semester.",
        "pricing.subscribe.semester.feature1": "Unlimited AI generations",
        "pricing.subscribe.semester.feature2": "Unlimited package exports",
        "pricing.subscribe.semester.feature3": "Priority support",
        "pricing.subscribe.semester.feature4": "Team collaboration",
        "pricing.subscribe.semester.cta": "Choose Semester",
        "pricing.subscribe.yearly.title": "Yearly",
        "pricing.subscribe.yearly.subtitle": "Best value! Two months free.",
        "pricing.subscribe.yearly.price": "$499",
        "pricing.subscribe.yearly.period": "/ year",
        "pricing.subscribe.yearly.description": "Set it and forget it for a year.",
        "pricing.subscribe.yearly.feature1": "Unlimited AI generations",
        "pricing.subscribe.yearly.feature2": "Unlimited package exports",
        "pricing.subscribe.yearly.feature3": "Dedicated support",
        "pricing.subscribe.yearly.feature4": "Team collaboration",
        "pricing.subscribe.yearly.feature5": "Custom branding",
        "pricing.subscribe.yearly.cta": "Choose Yearly",
        "pricing.faq.title": "Frequently Asked Questions",
        "pricing.faq.q1": "What are credits?",
        "pricing.faq.a1": "Credits are used for AI content generation. One credit equals one generation (e.g., a paragraph of text, a quiz question).",
        "pricing.faq.q2": "Do credits expire?",
        "pricing.faq.a2": "No, credits never expire. You can use them whenever you want.",
        "pricing.faq.q3": "Can I upgrade or downgrade my subscription?",
        "pricing.faq.a3": "Yes, you can change your subscription plan at any time. The changes will be reflected in the next billing cycle.",
        "pricing.faq.q4": "What is your refund policy?",
        "pricing.faq.a4": "We offer a 14-day money-back guarantee on all subscription plans. If you are not satisfied, contact us for a full refund.",
        "about.title": "About EduPack",
        "about.mission.title": "Our Mission",
        "about.mission.p1": "EduPack was created to democratize e-learning content creation. We believe that every educator, regardless of technical expertise, should have access to powerful tools for creating engaging, interactive learning experiences.",
        "about.mission.p2": "By combining AI-powered content generation with an intuitive authoring interface and a collaborative marketplace, we're making it easier than ever to create, share, and monetize educational content.",
        "about.who.title": "Who We Serve",
        "about.who.teachers.title": "Teachers & Instructors",
        "about.who.teachers.p": "Individual educators looking to create professional e-learning content without spending countless hours on technical setup.",
        "about.who.edtech.title": "EdTech Teams & Institutions",
        "about.who.edtech.p": "Schools, universities, and corporate training departments seeking to standardize and scale their e-learning content production.",
        "about.purpose.title": "Our Purpose",
        "about.purpose.p": "We're building more than just software—we're creating an ecosystem where educators can focus on what they do best: teaching. By handling the technical complexity and providing tools that enhance creativity, we're empowering the next generation of e-learning content creators."
    },
    ar: {
        "nav.home": "الرئيسية",
        "nav.scorm-ai": "SCORM AI",
        "nav.features": "الميزات",
        "nav.pricing": "الأسعار",
        "nav.upload": "رفع",
        "nav.login": "تسجيل الدخول",
        "nav.register": "تسجيل",
        "nav.account": "الحساب",
        "nav.about": "حول",
        "nav.resources": "المصادر",
        "nav.privacy": "الخصوصية",
        "nav.terms": "الشروط",
        "nav.shop": "الباقات",
        "hero.title": "أنشئ حزم SCORM بالذكاء الاصطناعي",
        "hero.description": "أسهل طريقة لإنشاء حزم SCORM حديثة وتفاعلية وجميلة لنظام إدارة التعلم الخاص بك. استفد من الذكاء الاصطناعي لإنشاء المحتوى والاختبارات والمزيد.",
        "hero.cta.start": "ابدأ في الإنشاء مجانًا",
        "hero.cta.browse": "تصفح الباقات",
        "hero.no-card": "لا يلزم وجود بطاقة ائتمان",
        "hero.free-trial": "تجربة مجانية لمدة 14 يومًا",
        "preview.name": "الاسم",
        "preview.title.name": "قم بتسمية دورتك",
        "preview.grade": "الصف",
        "preview.title.grade": "حدد مستوى الصف",
        "preview.subject": "الموضوع",
        "preview.title.subject": "اختر موضوعًا",
        "preview.measure": "القياس",
        "preview.title.measure": "حدد مقاييس النجاح",
        "preview.language": "اللغة",
        "preview.title.language": "اختر اللغة",
        "preview.area": "هذه معاينة للمحتوى الذي يمكنك إنشاؤه.",
        "preview.play": "تشغيل",
        "preview.view": "عرض المحتوى",
        "featured-packages.title": "الباقات المميزة",
        "feature.scorm.title": "SCORM 1.2 & 2004",
        "feature.scorm.desc": "صدّر دوراتك إلى أشهر معايير SCORM.",
        "feature.ai.title": "محتوى مدعوم بالذكاء الاصطناعي",
        "feature.ai.desc": "أنشئ محتوى جذابًا وتفاعليًا بمساعدة الذكاء الاصطناعي.",
        "feature.marketplace.title": "السوق",
        "feature.marketplace.desc": "شراء وبيع حزم SCORM المعدة مسبقًا من منشئين آخرين.",
        "feature.lms.title": "متوافق مع أي نظام إدارة تعلم",
        "feature.lms.desc": "تعمل حزمنا مع أي نظام إدارة تعلم متوافق مع SCORM.",
        "audience.title": "لمن هذا؟",
        "audience.teachers.title": "المعلمين والمربين",
        "audience.teachers.point1": "أنشئ دروسًا واختبارات جذابة.",
        "audience.teachers.point2": "وفر الوقت في إنشاء المحتوى.",
        "audience.teachers.point3": "شارك بسهولة مع طلابك.",
        "audience.teachers.point4": "تتبع تقدم الطلاب وأدائهم.",
        "audience.institutions.title": "المؤسسات والشركات",
        "audience.institutions.point1": "توحيد المواد التدريبية الخاصة بك.",
        "audience.institutions.point2": "نشر المحتوى عبر مؤسستك.",
        "audience.institutions.point3": "ضمان الامتثال والاتساق.",
        "audience.institutions.point4": "التكامل مع نظام إدارة التعلم الحالي الخاص بك.",
        "cta.title": "هل أنت مستعد للبدء؟",
        "cta.description": "أنشئ أول حزمة SCORM لك اليوم وشاهد مدى سهولة الأمر.",
        "cta.button": "اشترك مجانا",
        "footer.proudly": "صنع بفخر في 🇵🇸",
        "footer.product": "المنتج",
        "footer.support": "الدعم",
        "footer.company": "الشركة",
        "footer.about": "حول",
        "footer.privacy": "الخصوصية",
        "footer.terms": "الشروط",
        "footer.rights": "جميع الحقوق محفوظة.",
        "footer.help": "مركز المساعدة",
        "footer.contact": "اتصل بنا",
        "scorm.props.title": "الخصائص",
        "scorm.props.desc": "تعديل خصائص الكتلة المحددة.",
        "scorm.props.block.text.html": "محتوى HTML",
        "scorm.props.block.image.src": "رابط مصدر الصورة",
        "scorm.props.block.image.alt": "النص البديل",
        "scorm.props.block.video.src": "رابط مصدر الفيديو",
        "scorm.props.block.quiz.question": "السؤال",
        "scorm.ai.untitledProject": "مشروع بدون عنوان",
        "scorm.ai.introduction": "مقدمة",
        "scorm.ai.notConfigured": "اتصال الذكاء الاصطناعي غير مهيأ بعد. هذا مجرد عنصر نائب لواجهة المستخدم.",
        "scorm.ai.projectSaved": "تم حفظ المشروع في التخزين المحلي!",
        "scorm.ai.exportFailed": "فشل التصدير",
        "scorm.ai.exportError": "خطأ في تصدير المشروع. انظر وحدة التحكم للحصول على التفاصيل.",
        "scorm.ai.newTextBlock": "<p>كتلة نصية جديدة. قم بتحريري!</p>",
        "scorm.ai.placeholderImage": "صورة نائبة",
        "scorm.ai.newQuestion": "سؤال جديد",
        "scorm.ai.option1": "الخيار 1",
        "scorm.ai.option2": "الخيار 2",
        "scorm.ai.projectLoaded": "تم تحميل المشروع من الملف.",
        "scorm.ai.invalidProjectFile": "ملف مشروع غير صالح.",
        "scorm.ai.media": "وسائط",
        "scorm.choice.title": "إنشاء حزمة SCORM جديدة",
        "scorm.choice.description": "اختر كيف تريد البدء في بناء حزمة التعلم الخاصة بك.",
        "scorm.choice.aiAssistant": "البناء بمساعدة الذكاء الاصطناعي",
        "scorm.choice.aiAssistantDesc": "دع الذكاء الاصطناعي يساعد في إنشاء محتوى الدورة التدريبية الخاصة بك.",
        "scorm.choice.blankPage": "البدء من صفحة فارغة",
        "scorm.choice.blankPageDesc": "بناء كل شيء يدويًا من البداية.",
        "scorm.nav.hide": "إخفاء شريط التنقل",
        "scorm.nav.show": "إظهار شريط التنقل",
        "scorm.ai.close": "✕",
        "scorm.tools.ai": "الذكاء الاصطناعي",
        "scorm.alerts.interactiveSoon": "العناصر التفاعلية ستكون متاحة قريبًا.",
        "scorm.alerts.settingsLater": "سيتم تصميم إعدادات الحزمة لاحقًا.",
        "shop.title": "سوق حزم SCORM",
        "shop.desc": "تصفح وشراء حزم SCORM عالية الجودة التي أنشأها مجتمعنا.",
        "shop.search": "البحث عن حزم...",
        "shop.filter.grades": "كل المستويات",
        "shop.filter.subjects": "كل المواضيع",
        "shop.filter.sort": "ترتيب حسب",
        "shop.filter.free": "مجاني",
        "shop.filter.paid": "مدفوع",
        "shop.filter.more": " المزيد من المرشحات",
        "shop.view": "عرض",
        "shop.packages.1.title": "مقدمة في الكسور",
        "shop.packages.1.grade": "الصف الخامس",
        "shop.packages.1.subject": "الرياضيات",
        "shop.packages.1.language": "الإنجليزية",
        "shop.packages.1.description": "درس تفاعلي يغطي أساسيات الكسور مع مساعدات بصرية ومسابقات تدريبية",
        "shop.packages.1.price": "مجاني",
        "shop.packages.2.title": "مستكشف النظام الشمسي",
        "shop.packages.2.grade": "الصف السابع",
        "shop.packages.2.subject": "العلوم",
        "shop.packages.2.language": "الإنجليزية",
        "shop.packages.2.description": "رحلة عبر نظامنا الشمسي بنماذج وأنشطة تفاعلية ثلاثية الأبعاد",
        "shop.packages.3.title": "شكسبير: روميو وجولييت",
        "shop.packages.3.grade": "المرحلة الثانوية",
        "shop.packages.3.subject": "الأدب",
        "shop.packages.3.language": "الإنجليزية",
        "shop.packages.3.description": "دليل دراسة شامل مع تحليل الشخصيات ومشاهد تفاعلية",
        "shop.packages.4.title": "تفاعلات الكيمياء الأساسية",
        "shop.packages.4.grade": "الصف التاسع",
        "shop.packages.4.subject": "الكيمياء",
        "shop.packages.4.language": "الإنجليزية",
        "shop.packages.4.description": "تجارب معملية افتراضية توضح التفاعلات الكيميائية الأساسية بأمان",
        "shop.packages.5.title": "اختبار الجغرافيا العالمي",
        "shop.packages.5.grade": "الصف السادس",
        "shop.packages.5.subject": "الجغرافيا",
        "shop.packages.5.language": "الإنجليزية",
        "shop.packages.5.description": "خرائط تفاعلية ومسابقات تغطي القارات والدول والعواصم",
        "shop.packages.5.price": "مجاني",
        "shop.packages.6.title": "أساسيات برمجة بايثون",
        "shop.packages.6.grade": "المرحلة الثانوية",
        "shop.packages.6.subject": "علوم الحاسوب",
        "shop.packages.6.language": "الإنجليزية",
        "shop.packages.6.description": "تعلم أساسيات بايثون مع تمارين ومشاريع برمجية تفاعلية",
        "shop.filter.elementary": "ابتدائي",
        "shop.filter.middleSchool": "إعدادي",
        "shop.filter.highSchool": "ثانوي",
        "shop.filter.mathematics": "الرياضيات",
        "shop.filter.science": "العلوم",
        "shop.filter.literature": "الأدب",
        "shop.filter.newest": "الأحدث",
        "shop.filter.priceLowHigh": "السعر: من الأقل إلى الأعلى",
        "shop.filter.priceHighLow": "السعر: من الأعلى إلى الأقل",
        "scorm.ai.previewTitle": "معاينة: {{title}}",
        "scorm.topbar.preview": "معاينة",
        "scorm.topbar.export": "تصدير",
        "scorm.topbar.status.draft": "مسودة",
        "scorm.topbar.status.published": "منشور",
        "scorm.ai.title": "مساعد الذكاء الاصطناعي",
        "scorm.ai.placeholder": "اطلب من الذكاء الاصطناعي إنشاء محتوى...",
        "scorm.ai.send": "إرسال",
        "scorm.canvas.title": "لوحة الرسم",
        "scorm.canvas.desc": "ابدأ في بناء دورتك بإضافة كتل.",
        "scorm.canvas.start": "ابدأ البناء",
        "scorm.tools.upload": "رفع",
        "scorm.tools.interactive": "تفاعلي",
        "scorm.tools.quiz": "اختبار",
        "scorm.tools.pageEditor": "محرر الصفحات",
        "scorm.tools.media": "وسائط",
        "scorm.tools.text": "نص",
        "scorm.tools.settings": "إعدادات",
        "scorm.tools.mediaPrompt": "الصق رابط صورة لإدراجها كوسائط:",
        "scorm.tools.newPage": "صفحة {{number}}",
        "scorm.tools.history": "سجل التعديلات (قريباً)",
        "scorm.ai.welcome": "أهلاً بك في مساعد الذكاء الاصطناعي! كيف يمكنني مساعدتك في بناء دورتك؟",
        "scorm.props.project.styles.title": "الأنماط الافتراضية",
        "scorm.props.project.styles.desc": "تعيين أنماط النص الافتراضية للمشروع بأكمله.",
        "scorm.props.project.direction.title": "اتجاه النص",
        "scorm.props.project.direction.desc": "قم بتعيين اتجاه النص للصفحة بأكملها.",
        "scorm.props.project.direction.ltr": "من اليسار إلى اليمين",
        "scorm.props.project.direction.rtl": "من اليمين إلى اليسار",
        "scorm.projectPanel.title": "إعدادات المشروع",
        "scorm.projectPanel.subtitle": "إدارة إعدادات الدورة التدريبية الشاملة.",
        "scorm.projectPanel.generalSettings": "عام",
        "scorm.projectPanel.projectTitle": "عنوان المشروع",
        "scorm.projectPanel.language": "اللغة",
        "scorm.projectPanel.pageOrganization": "تنظيم الصفحات",
        "scorm.projectPanel.addPage": "إضافة صفحة",
        "scorm.projectPanel.deleteLastPageError": "لا يمكنك حذف الصفحة الأخيرة.",
        "scorm.projectPanel.deleteConfirm": "هل أنت متأكد أنك تريد حذف هذه الصفحة؟",
        "resources.title": "How to Use EduPack",
        "resources.description": "Step-by-step guides, video tutorials, and resources to help you get the most out of EduPack",
        "resources.guide1.title": "Create your first package with SCORM AI",
        "resources.guide1.description": "Learn how to use our AI-powered authoring tool to build interactive SCORM packages from scratch",
        "resources.guide1.duration": "10 min read",
        "resources.guide1.level": "Beginner",
        "resources.guide2.title": "Upload and publish a package",
        "resources.guide2.description": "Step-by-step guide to uploading your existing SCORM content and making it available in the marketplace",
        "resources.guide2.duration": "5 min read",
        "resources.guide2.level": "Beginner",
        "resources.guide3.title": "Buy and download packages from the shop",
        "resources.guide3.description": "Discover how to find, preview, and purchase ready-made educational packages for your LMS",
        "resources.guide3.duration": "7 min read",
        "resources.guide3.level": "Beginner",
        "resources.guide4.title": "Connect EduPack packages to your LMS",
        "resources.guide4.description": "Integration guides for Moodle, Canvas, Blackboard, and other popular learning management systems",
        "resources.guide4.duration": "15 min read",
        "resources.guide4.level": "Intermediate",
        "resources.videos.title": "Video Tutorials",
        "resources.video1.title": "Getting Started with EduPack",
        "resources.video1.duration": "8:34",
        "resources.video2.title": "AI Content Generation Tips",
        "resources.video2.duration": "12:15",
        "resources.video3.title": "Advanced Authoring Techniques",
        "resources.video3.duration": "18:47",
        "resources.docs.title": "Documentation",
        "resources.doc1.title": "API Documentation",
        "resources.doc1.description": "For developers integrating EduPack",
        "resources.doc2.title": "Best Practices Guide",
        "resources.doc2.description": "Tips for creating effective content",
        "resources.doc3.title": "SCORM Standards Reference",
        "resources.doc3.description": "Understanding SCORM specifications",
        "resources.help.title": "Need Help? Contact Our Team",
        "resources.help.description": "Our support team is here to help you succeed. Reach out anytime with questions or feedback.",
        "resources.contact1.name": "Muiayad Al HAsani",
        "resources.contact1.role": "page devloper",
        "resources.contact2.name": "Ali Al Badri",
        "resources.contact2.role": "page desginer",
        "resources.help.chat": "Live Chat Support",
        "resources.form.title": "Send us a message",
        "resources.form.name": "Your Name",
        "resources.form.name.placeholder": "John Doe",
        "resources.form.email": "Email",
        "resources.form.email.placeholder": "you@example.com",
        "resources.form.message": "Message",
        "resources.form.message.placeholder": "How can we help you?",
        "resources.form.send": "Send Message",
        "resources.guide.open": "Open Guide",
        "features.hero.title": "Why Choose EduPack?",
        "features.hero.description": "The most powerful and user-friendly SCORM authoring platform for educators and institutions. Create professional e-learning content without the complexity.",
        "features.comparison.title": "EduPack vs Traditional Tools",
        "features.comparison.feature": "Feature",
        "features.comparison.traditional": "Traditional Tools",
        "features.comparison.edupack": "EduPack",
        "features.comparison.price.feature": "Starting Price",
        "features.comparison.price.traditional": "$500-2000/year",
        "features.comparison.price.edupack": "$9 (pay as you go)",
        "features.comparison.curve.feature": "Learning Curve",
        "features.comparison.curve.traditional": "Weeks to months",
        "features.comparison.curve.edupack": "Minutes to hours",
        "features.comparison.ai.feature": "AI Assistance",
        "features.comparison.ai.traditional": "None",
        "features.comparison.ai.edupack": "Built-in AI content generation",
        "features.comparison.marketplace.feature": "Marketplace",
        "features.comparison.marketplace.traditional": "Separate platforms",
        "features.comparison.marketplace.edupack": "Integrated buy & sell",
        "features.comparison.support.feature": "Technical Support",
        "features.comparison.support.traditional": "Business hours only",
        "features.comparison.support.edupack": "24/7 community + priority support",
        "features.grid.title": "Everything You Need to Create Amazing Content",
        "features.grid.description": "Powerful features designed to make SCORM authoring accessible to everyone",
        "features.grid.card1.title": "AI-Assisted Content",
        "features.grid.card1.description": "Generate engaging educational content, quizzes, and activities with AI-powered suggestions tailored to your subject.",
        "features.grid.card2.title": "Ready-Made Templates",
        "features.grid.card2.description": "Start with professionally designed templates for lessons, courses, and assessments. Customize to match your brand.",
        "features.grid.card3.title": "Universal Export",
        "features.grid.card3.description": "Export to SCORM 1.2, SCORM 2004, or xAPI with one click. Compatible with all major LMS platforms.",
        "features.grid.card4.title": "Team Collaboration",
        "features.grid.card4.description": "Work together with colleagues in real-time. Share resources, review content, and maintain consistency.",
        "features.grid.card5.title": "Built-in Analytics",
        "features.grid.card5.description": "Track learner engagement and performance with comprehensive analytics and reporting tools.",
        "features.grid.card6.title": "Multi-Language Support",
        "features.grid.card6.description": "Create content in English, Arabic, Spanish, French, and more. RTL support included.",
        "features.grid.card7.title": "Lightning Fast",
        "features.grid.card7.description": "Build and export packages in minutes, not days. Our optimized workflow keeps you productive.",
        "features.grid.card8.title": "Sell Your Content",
        "features.grid.card8.description": "Monetize your expertise by selling packages on our marketplace. Set your own prices and earn revenue.",
        "features.grid.card9.title": "Smart Suggestions",
        "features.grid.card9.description": "Get contextual recommendations for images, activities, and assessments as you build.",
        "features.cta.title": "Ready to Experience the Difference?",
        "features.cta.description": "Join thousands of educators who have simplified their e-learning content creation",
        "features.cta.start": "Get Started Free",
        "features.cta.pricing": "View Pricing",
        "scorm.projectPanel.generalTracking": "General Tracking",
        "scorm.projectPanel.tracking.minimal": "Minimal",
        "scorm.projectPanel.tracking.standard": "Standard",
        "scorm.projectPanel.tracking.advanced": "Advanced",
        "scorm.projectPanel.advancedOptions": "Advanced Options",
        "scorm.projectPanel.tracking.pageViews": "Track page views",
        "scorm.projectPanel.tracking.quizInteractions": "Track quiz interactions",
        "scorm.projectPanel.tracking.media": "Track media (play/pause/seek)",
        "scorm.projectPanel.tracking.hints": "Track hints/help usage",
        "scorm.projectPanel.tracking.externalLinks": "Track external links",
        "scorm.projectPanel.tracking.timePerPage": "Track time per page",
        "scorm.projectPanel.tracking.attempts": "Track attempts",
        "scorm.projectPanel.xapiOptions": "xAPI Only Options",
        "scorm.projectPanel.xapi.lrsEndpoint": "LRS Endpoint",
        "scorm.projectPanel.xapi.authToken": "Auth token",
        "scorm.projectPanel.xapi.activityIdFormat": "Activity ID format",
        "scorm.projectPanel.xapi.statementExtensions": "Statement extensions",
        "scorm.projectPanel.exportPanel": "Export Options",
        "scorm.projectPanel.export.scorm12": "SCORM 1.2",
        "scorm.projectPanel.export.scorm2004": "SCORM 2004",
        "scorm.projectPanel.export.xapi": "xAPI/cmi5",
        "scorm.projectPanel.export.html5": "HTML5 Package",
        "scorm.projectPanel.export.publicLink": "Public Link",
        "scorm.projectPanel.export.embedCode": "Embed Code",
        "scorm.projectPanel.export.teacherPdf": "Teacher PDF",
        "scorm.projectPanel.export.studentPdf": "Student PDF",
        "scorm.projectPanel.export.json": "JSON source",
        "scorm.projectPanel.export.qti": "QTI/Moodle Question Bank",
        "scorm.props.project.styles.textColor": "Text Color",
        "pricing.title": "Flexible Pricing for Every Creator",
        "pricing.description": "Choose the plan that's right for you. Get started with credits or subscribe for unlimited access.",
        "pricing.tabs.credits": "Pay-as-you-go Credits",
        "pricing.tabs.subscribe": "Subscription Plans",
        "pricing.credits.starter.title": "Starter Pack",
        "pricing.credits.starter.credits": "100 Credits",
        "pricing.credits.starter.price": "$9",
        "pricing.credits.starter.description": "Perfect for trying out the platform.",
        "pricing.credits.starter.feature1": "100 AI content generations",
        "pricing.credits.starter.feature2": "Export up to 5 packages",
        "pricing.credits.starter.feature3": "Basic support",
        "pricing.credits.starter.feature4": "Access to marketplace",
        "pricing.credits.starter.cta": "Get Started",
        "pricing.credits.teacher.title": "Teacher Pack",
        "pricing.credits.teacher.credits": "500 Credits",
        "pricing.credits.teacher.price": "$39",
        "pricing.credits.teacher.description": "Ideal for individual educators.",
        "pricing.credits.teacher.feature1": "500 AI content generations",
        "pricing.credits.teacher.feature2": "Export up to 25 packages",
        "pricing.credits.teacher.feature3": "Priority support",
        "pricing.credits.teacher.feature4": "Access to marketplace",
        "pricing.credits.teacher.feature5": "Publish to marketplace",
        "pricing.credits.teacher.cta": "Choose Teacher Pack",
        "pricing.credits.team.title": "Team Pack",
        "pricing.credits.team.credits": "2000 Credits",
        "pricing.credits.team.price": "$129",
        "pricing.credits.team.description": "Best for schools and institutions.",
        "pricing.credits.team.feature1": "2000 AI content generations",
        "pricing.credits.team.feature2": "Unlimited package exports",
        "pricing.credits.team.feature3": "Dedicated support",
        "pricing.credits.team.feature4": "Team collaboration features",
        "pricing.credits.team.feature5": "Publish to marketplace",
        "pricing.credits.team.feature6": "Custom branding",
        "pricing.credits.team.cta": "Contact Sales",
        "pricing.subscribe.monthly.title": "Monthly",
        "pricing.subscribe.monthly.subtitle": "All features, unlimited usage.",
        "pricing.subscribe.monthly.price": "$49",
        "pricing.subscribe.monthly.period": "/ month",
        "pricing.subscribe.monthly.description": "Cancel anytime.",
        "pricing.subscribe.monthly.feature1": "Unlimited AI generations",
        "pricing.subscribe.monthly.feature2": "Unlimited package exports",
        "pricing.subscribe.monthly.feature3": "Priority support",
        "pricing.subscribe.monthly.feature4": "Team collaboration",
        "pricing.subscribe.monthly.feature5": "Publish to marketplace",
        "pricing.subscribe.monthly.cta": "Subscribe Now",
        "pricing.subscribe.semester.title": "Semester",
        "pricing.subscribe.semester.subtitle": "Save 20% with semester billing.",
        "pricing.subscribe.semester.price": "$199",
        "pricing.subscribe.semester.period": "/ 6 months",
        "pricing.subscribe.semester.description": "Pay once for the whole semester.",
        "pricing.subscribe.semester.feature1": "Unlimited AI generations",
        "pricing.subscribe.semester.feature2": "Unlimited package exports",
        "pricing.subscribe.semester.feature3": "Priority support",
        "pricing.subscribe.semester.feature4": "Team collaboration",
        "pricing.subscribe.semester.cta": "Choose Semester",
        "pricing.subscribe.yearly.title": "Yearly",
        "pricing.subscribe.yearly.subtitle": "Best value! Two months free.",
        "pricing.subscribe.yearly.price": "$499",
        "pricing.subscribe.yearly.period": "/ year",
        "pricing.subscribe.yearly.description": "Set it and forget it for a year.",
        "pricing.subscribe.yearly.feature1": "Unlimited AI generations",
        "pricing.subscribe.yearly.feature2": "Unlimited package exports",
        "pricing.subscribe.yearly.feature3": "Dedicated support",
        "pricing.subscribe.yearly.feature4": "Team collaboration",
        "pricing.subscribe.yearly.feature5": "Custom branding",
        "pricing.subscribe.yearly.cta": "Choose Yearly",
        "pricing.faq.title": "Frequently Asked Questions",
        "pricing.faq.q1": "What are credits?",
        "pricing.faq.a1": "Credits are used for AI content generation. One credit equals one generation (e.g., a paragraph of text, a quiz question).",
        "pricing.faq.q2": "Do credits expire?",
        "pricing.faq.a2": "No, credits never expire. You can use them whenever you want.",
        "pricing.faq.q3": "Can I upgrade or downgrade my subscription?",
        "pricing.faq.a3": "Yes, you can change your subscription plan at any time. The changes will be reflected in the next billing cycle.",
        "pricing.faq.q4": "What is your refund policy?",
        "pricing.faq.a4": "نحن نقدم ضمان استرداد الأموال لمدة 14 يومًا على جميع خطط الاشتراك. إذا لم تكن راضيًا ، فاتصل بنا لاسترداد المبلغ بالكامل."
    }
};
function t(locale, key, values) {
    let translation = translations[locale][key] || key;
    if (values) {
        Object.entries(values).forEach(([key, value])=>{
            translation = translation.replace(`{{${key}}}`, String(value));
        });
    }
    return translation;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/use-locale.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLocale",
    ()=>useLocale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/translations.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
// 2. Create the Zustand store for locale persistence
const useLocaleStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        locale: 'en',
        setLocale: (locale)=>set({
                locale
            })
    }), {
    name: 'edupack-locale'
}));
function useLocale() {
    _s();
    // Get the current locale and the setter from the store
    const { locale, setLocale } = useLocaleStore();
    // Create a translation function that's pre-bound to the current locale
    const t = (key, values)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, key, values);
    // Return the locale, setter, and the bound translation function
    return {
        locale,
        setLocale,
        t
    };
}
_s(useLocale, "u6eZQXy6uGCz05kgYSxRA6ODjso=", false, function() {
    return [
        useLocaleStore
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-client] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$boxes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Boxes$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/boxes.js [app-client] (ecmascript) <export default as Boxes>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cloud.js [app-client] (ecmascript) <export default as Cloud>");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$locale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-locale.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/translations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function HomePage() {
    _s();
    const { locale } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$locale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const previewTabs = [
        {
            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'preview.name'),
            value: 'name',
            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewContent, {
                title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'preview.title.name'),
                locale: locale
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 18,
                columnNumber: 16
            }, this)
        },
        {
            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'preview.grade'),
            value: 'grade',
            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewContent, {
                title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'preview.title.grade'),
                locale: locale
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 23,
                columnNumber: 16
            }, this)
        },
        {
            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'preview.subject'),
            value: 'subject',
            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewContent, {
                title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'preview.title.subject'),
                locale: locale
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 28,
                columnNumber: 16
            }, this)
        },
        {
            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'preview.measure'),
            value: 'measure',
            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewContent, {
                title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'preview.title.measure'),
                locale: locale
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 33,
                columnNumber: 16
            }, this)
        },
        {
            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'preview.language'),
            value: 'language',
            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewContent, {
                title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'preview.title.language'),
                locale: locale
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 38,
                columnNumber: 16
            }, this)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-20 px-4 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid lg:grid-cols-2 gap-12 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-4xl lg:text-5xl font-extrabold text-foreground mb-6 leading-tight text-balance",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'hero.title')
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 49,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg text-muted-foreground mb-8 leading-relaxed",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'hero.description')
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col sm:flex-row gap-4 mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/scorm-ai",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "lg",
                                                    className: "w-full sm:w-auto",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                            className: "mr-2 h-5 w-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 56,
                                                            columnNumber: 21
                                                        }, this),
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'hero.cta.start')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 55,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 54,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/packages",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "lg",
                                                    variant: "outline",
                                                    className: "w-full sm:w-auto bg-transparent",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                            className: "mr-2 h-5 w-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 62,
                                                            columnNumber: 21
                                                        }, this),
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'hero.cta.browse')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 61,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 60,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-muted-foreground",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'hero.no-card'),
                                            " • ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'hero.free-trial')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 67,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-card rounded-2xl shadow-xl p-6 border border-border",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
                                    defaultValue: "name",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsList"], {
                                            children: previewTabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                                    value: tab.value,
                                                    children: tab.label
                                                }, tab.value, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 43
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 75,
                                            columnNumber: 17
                                        }, this),
                                        previewTabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                                value: tab.value,
                                                children: tab.content
                                            }, tab.value, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 78,
                                                columnNumber: 41
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 74,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-20 px-4 sm:px-6 lg:px-8 bg-muted/30",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-bold text-center text-foreground mb-12",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'featured-packages.title')
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 px-4 sm:px-6 lg:px-8 bg-background",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureCard, {
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$boxes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Boxes$3e$__["Boxes"], {
                                    className: "h-8 w-8 text-primary"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 98,
                                    columnNumber: 21
                                }, void 0),
                                title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'feature.scorm.title'),
                                description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'feature.scorm.desc')
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureCard, {
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    className: "h-8 w-8 text-primary"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 103,
                                    columnNumber: 21
                                }, void 0),
                                title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'feature.ai.title'),
                                description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'feature.ai.desc')
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureCard, {
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                    className: "h-8 w-8 text-primary"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 108,
                                    columnNumber: 21
                                }, void 0),
                                title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'feature.marketplace.title'),
                                description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'feature.marketplace.desc')
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 107,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureCard, {
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__["Cloud"], {
                                    className: "h-8 w-8 text-primary"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 113,
                                    columnNumber: 21
                                }, void 0),
                                title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'feature.lms.title'),
                                description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'feature.lms.desc')
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-20 px-4 sm:px-6 lg:px-8 bg-muted/30",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl font-bold text-center text-foreground mb-12",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'audience.title')
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-2 gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AudienceCard, {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
                                        className: "h-12 w-12 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 127,
                                        columnNumber: 21
                                    }, void 0),
                                    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'audience.teachers.title'),
                                    points: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'audience.teachers.point1'),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'audience.teachers.point2'),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'audience.teachers.point3'),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'audience.teachers.point4')
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 126,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AudienceCard, {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                        className: "h-12 w-12 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 137,
                                        columnNumber: 21
                                    }, void 0),
                                    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'audience.institutions.title'),
                                    points: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'audience.institutions.point1'),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'audience.institutions.point2'),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'audience.institutions.point3'),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'audience.institutions.point4')
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 136,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl lg:text-4xl font-bold mb-6",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'cta.title')
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg mb-8 opacity-90",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'cta.description')
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 154,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/register",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "lg",
                                variant: "secondary",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'cta.button')
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 156,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 152,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_s(HomePage, "aQZd10leNxbqQbwDEUSVdOnDXm0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$locale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"]
    ];
});
_c = HomePage;
function PreviewContent({ title, locale }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-accent/20 rounded-xl p-8 min-h-[300px] flex flex-col items-center justify-center border-2 border-accent/50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-accent/30 rounded-full p-4 inline-flex",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                        className: "h-8 w-8 text-foreground"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 171,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 170,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xl font-semibold text-foreground",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 173,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-muted-foreground",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'preview.area')
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 174,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 flex gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                    className: "mr-2 h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 177,
                                    columnNumber: 13
                                }, this),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'preview.play')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 176,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                    className: "mr-2 h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, 'preview.view')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 180,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 175,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 169,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 168,
        columnNumber: 5
    }, this);
}
_c1 = PreviewContent;
function FeatureCard({ icon, title, description }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "inline-flex items-center justify-center mb-4",
                children: icon
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold text-foreground mb-2",
                children: title
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-muted-foreground leading-relaxed",
                children: description
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 192,
        columnNumber: 5
    }, this);
}
_c2 = FeatureCard;
function AudienceCard({ icon, title, points }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-card rounded-2xl p-8 border border-border shadow-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 mb-6",
                children: [
                    icon,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold text-foreground",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 203,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-3",
                children: points.map((point, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "flex items-start gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 210,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: point
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 211,
                                columnNumber: 13
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 202,
        columnNumber: 5
    }, this);
}
_c3 = AudienceCard;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "HomePage");
__turbopack_context__.k.register(_c1, "PreviewContent");
__turbopack_context__.k.register(_c2, "FeatureCard");
__turbopack_context__.k.register(_c3, "AudienceCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_7380190f._.js.map