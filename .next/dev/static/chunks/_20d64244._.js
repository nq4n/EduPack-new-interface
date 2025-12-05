(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
            'icon-sm': 'size-8',
            'icon-lg': 'size-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
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
"[project]/components/ui/dropdown-menu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DropdownMenu",
    ()=>DropdownMenu,
    "DropdownMenuCheckboxItem",
    ()=>DropdownMenuCheckboxItem,
    "DropdownMenuContent",
    ()=>DropdownMenuContent,
    "DropdownMenuGroup",
    ()=>DropdownMenuGroup,
    "DropdownMenuItem",
    ()=>DropdownMenuItem,
    "DropdownMenuLabel",
    ()=>DropdownMenuLabel,
    "DropdownMenuPortal",
    ()=>DropdownMenuPortal,
    "DropdownMenuRadioGroup",
    ()=>DropdownMenuRadioGroup,
    "DropdownMenuRadioItem",
    ()=>DropdownMenuRadioItem,
    "DropdownMenuSeparator",
    ()=>DropdownMenuSeparator,
    "DropdownMenuShortcut",
    ()=>DropdownMenuShortcut,
    "DropdownMenuSub",
    ()=>DropdownMenuSub,
    "DropdownMenuSubContent",
    ()=>DropdownMenuSubContent,
    "DropdownMenuSubTrigger",
    ()=>DropdownMenuSubTrigger,
    "DropdownMenuTrigger",
    ()=>DropdownMenuTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRightIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRightIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as CircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function DropdownMenu({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dropdown-menu",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = DropdownMenu;
function DropdownMenuPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dropdown-menu-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c1 = DropdownMenuPortal;
function DropdownMenuTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dropdown-menu-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c2 = DropdownMenuTrigger;
function DropdownMenuContent({ className, sideOffset = 4, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "dropdown-menu-content",
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md', className),
            ...props
        }, void 0, false, {
            fileName: "[project]/components/ui/dropdown-menu.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c3 = DropdownMenuContent;
function DropdownMenuGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "dropdown-menu-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c4 = DropdownMenuGroup;
function DropdownMenuItem({ className, inset, variant = 'default', ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "dropdown-menu-item",
        "data-inset": inset,
        "data-variant": variant,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_c5 = DropdownMenuItem;
function DropdownMenuCheckboxItem({ className, children, checked, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckboxItem"], {
        "data-slot": "dropdown-menu-checkbox-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        checked: checked,
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/dropdown-menu.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/dropdown-menu.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/dropdown-menu.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
_c6 = DropdownMenuCheckboxItem;
function DropdownMenuRadioGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroup"], {
        "data-slot": "dropdown-menu-radio-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
_c7 = DropdownMenuRadioGroup;
function DropdownMenuRadioItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioItem"], {
        "data-slot": "dropdown-menu-radio-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__["CircleIcon"], {
                        className: "size-2 fill-current"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/dropdown-menu.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/dropdown-menu.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/dropdown-menu.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
}
_c8 = DropdownMenuRadioItem;
function DropdownMenuLabel({ className, inset, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "dropdown-menu-label",
        "data-inset": inset,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-2 py-1.5 text-sm font-medium data-[inset]:pl-8', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 154,
        columnNumber: 5
    }, this);
}
_c9 = DropdownMenuLabel;
function DropdownMenuSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "dropdown-menu-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-border -mx-1 my-1 h-px', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
_c10 = DropdownMenuSeparator;
function DropdownMenuShortcut({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        "data-slot": "dropdown-menu-shortcut",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground ml-auto text-xs tracking-widest', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 184,
        columnNumber: 5
    }, this);
}
_c11 = DropdownMenuShortcut;
function DropdownMenuSub({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sub"], {
        "data-slot": "dropdown-menu-sub",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 198,
        columnNumber: 10
    }, this);
}
_c12 = DropdownMenuSub;
function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubTrigger"], {
        "data-slot": "dropdown-menu-sub-trigger",
        "data-inset": inset,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRightIcon$3e$__["ChevronRightIcon"], {
                className: "ml-auto size-4"
            }, void 0, false, {
                fileName: "[project]/components/ui/dropdown-menu.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 210,
        columnNumber: 5
    }, this);
}
_c13 = DropdownMenuSubTrigger;
function DropdownMenuSubContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubContent"], {
        "data-slot": "dropdown-menu-sub-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 230,
        columnNumber: 5
    }, this);
}
_c14 = DropdownMenuSubContent;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14;
__turbopack_context__.k.register(_c, "DropdownMenu");
__turbopack_context__.k.register(_c1, "DropdownMenuPortal");
__turbopack_context__.k.register(_c2, "DropdownMenuTrigger");
__turbopack_context__.k.register(_c3, "DropdownMenuContent");
__turbopack_context__.k.register(_c4, "DropdownMenuGroup");
__turbopack_context__.k.register(_c5, "DropdownMenuItem");
__turbopack_context__.k.register(_c6, "DropdownMenuCheckboxItem");
__turbopack_context__.k.register(_c7, "DropdownMenuRadioGroup");
__turbopack_context__.k.register(_c8, "DropdownMenuRadioItem");
__turbopack_context__.k.register(_c9, "DropdownMenuLabel");
__turbopack_context__.k.register(_c10, "DropdownMenuSeparator");
__turbopack_context__.k.register(_c11, "DropdownMenuShortcut");
__turbopack_context__.k.register(_c12, "DropdownMenuSub");
__turbopack_context__.k.register(_c13, "DropdownMenuSubTrigger");
__turbopack_context__.k.register(_c14, "DropdownMenuSubContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/i18n.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultLocale",
    ()=>defaultLocale,
    "getDirection",
    ()=>getDirection,
    "getLocaleLabel",
    ()=>getLocaleLabel,
    "locales",
    ()=>locales
]);
const locales = [
    "en",
    "ar"
];
const defaultLocale = "en";
function getDirection(locale) {
    return locale === "ar" ? "rtl" : "ltr";
}
function getLocaleLabel(locale) {
    return locale === "en" ? "English" : "العربية";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/layout/language-switcher.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageSwitcher",
    ()=>LanguageSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$locale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-locale.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function LanguageSwitcher() {
    _s();
    const { locale, setLocale, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$locale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "ghost",
                    size: "icon",
                    className: "h-9 w-9",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/components/layout/language-switcher.tsx",
                            lineNumber: 16,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "sr-only",
                            children: t("nav.switchLanguage")
                        }, void 0, false, {
                            fileName: "[project]/components/layout/language-switcher.tsx",
                            lineNumber: 17,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/language-switcher.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/language-switcher.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                align: "end",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["locales"].map((loc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                        onClick: ()=>setLocale(loc),
                        className: locale === loc ? "bg-accent" : "",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocaleLabel"])(loc)
                    }, loc, false, {
                        fileName: "[project]/components/layout/language-switcher.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/layout/language-switcher.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/language-switcher.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_s(LanguageSwitcher, "2rsPTuiNUmOzv71ev3zyLp3uIeQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$locale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"]
    ];
});
_c = LanguageSwitcher;
var _c;
__turbopack_context__.k.register(_c, "LanguageSwitcher");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/supabaseClient.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/supabaseClient.js
__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$esm$2f$wrapper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/esm/wrapper.mjs [app-client] (ecmascript)");
;
// For Next.js, environment variables exposed to the browser must be prefixed
// with NEXT_PUBLIC_.
// Make sure your .env.local file has:
// NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
// NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
const supabaseUrl = ("TURBOPACK compile-time value", "https://xnyniavtnqimkhskdpyq.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueW5pYXZ0bnFpbWtoc2tkcHlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NDUzMzksImV4cCI6MjA4MDQyMTMzOX0.c8VnJsruL4LP6VWlhe4tGXZbtLDqmItlM9n2-Ra7Hx0");
// Check if the environment variables are loaded
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$esm$2f$wrapper$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])(supabaseUrl, supabaseAnonKey);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/avatar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Avatar",
    ()=>Avatar,
    "AvatarFallback",
    ()=>AvatarFallback,
    "AvatarImage",
    ()=>AvatarImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-avatar/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const Avatar = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/avatar.tsx",
        lineNumber: 12,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Avatar;
Avatar.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
const AvatarImage = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("aspect-square h-full w-full", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/avatar.tsx",
        lineNumber: 27,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = AvatarImage;
AvatarImage.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"].displayName;
const AvatarFallback = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fallback"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/avatar.tsx",
        lineNumber: 39,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = AvatarFallback;
AvatarFallback.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fallback"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Avatar$React.forwardRef");
__turbopack_context__.k.register(_c1, "Avatar");
__turbopack_context__.k.register(_c2, "AvatarImage$React.forwardRef");
__turbopack_context__.k.register(_c3, "AvatarImage");
__turbopack_context__.k.register(_c4, "AvatarFallback$React.forwardRef");
__turbopack_context__.k.register(_c5, "AvatarFallback");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/layout/navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navbar",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$locale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-locale.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/translations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$language$2d$switcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/language-switcher.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/avatar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
function Navbar() {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { locale } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$locale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession().then({
                "Navbar.useEffect": ({ data: { session } })=>setSession(session)
            }["Navbar.useEffect"]);
            const { data: { subscription } } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange({
                "Navbar.useEffect": (_event, session)=>{
                    setSession(session);
                }
            }["Navbar.useEffect"]);
            return ({
                "Navbar.useEffect": ()=>subscription.unsubscribe()
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], []);
    const handleSignOut = async ()=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
        router.push("/");
    };
    const getInitials = (email = "")=>email.charAt(0).toUpperCase();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        id: "main-navbar",
        className: "bg-white border-b border-border sticky top-0 z-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center h-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 bg-primary rounded-lg flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white font-bold text-lg",
                                        children: "E"
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/navbar.tsx",
                                        lineNumber: 56,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/navbar.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xl font-bold text-primary",
                                    children: "EduPack"
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/navbar.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/navbar.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden md:flex items-center gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "text-foreground hover:text-primary transition-colors",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.home")
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/navbar.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/scorm-ai",
                                    className: "text-foreground hover:text-primary transition-colors",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.scorm-ai")
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/navbar.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/packages",
                                    className: "text-foreground hover:text-primary transition-colors",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.shop")
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/navbar.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/pricing",
                                    className: "text-foreground hover:text-primary transition-colors",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.pricing")
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/navbar.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/features",
                                    className: "text-foreground hover:text-primary transition-colors",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.features")
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/navbar.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/resources",
                                    className: "text-foreground hover:text-primary transition-colors",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.resources")
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/navbar.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/navbar.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden md:flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$language$2d$switcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LanguageSwitcher"], {}, void 0, false, {
                                    fileName: "[project]/components/layout/navbar.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                session ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                className: "relative h-8 w-8 rounded-full",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                                    className: "h-8 w-8",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                            src: session.user.user_metadata.avatar_url,
                                                            alt: session.user.email
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/layout/navbar.tsx",
                                                            lineNumber: 91,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                            children: getInitials(session.user.email)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/layout/navbar.tsx",
                                                            lineNumber: 92,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/layout/navbar.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/navbar.tsx",
                                                lineNumber: 89,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/navbar.tsx",
                                            lineNumber: 88,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                            className: "w-56",
                                            align: "end",
                                            forceMount: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                                                    className: "font-normal",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col space-y-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium leading-none",
                                                                children: "My Account"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/layout/navbar.tsx",
                                                                lineNumber: 99,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs leading-none text-muted-foreground",
                                                                children: session.user.email
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/layout/navbar.tsx",
                                                                lineNumber: 100,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/layout/navbar.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/navbar.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                    fileName: "[project]/components/layout/navbar.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                    onClick: ()=>router.push('/profile'),
                                                    children: "Profile"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/navbar.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                    onClick: handleSignOut,
                                                    children: "Log out"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/navbar.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/layout/navbar.tsx",
                                            lineNumber: 96,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/layout/navbar.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/login",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.login")
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/navbar.tsx",
                                                lineNumber: 111,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/navbar.tsx",
                                            lineNumber: 110,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/register",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.register")
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/navbar.tsx",
                                                lineNumber: 114,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/navbar.tsx",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/navbar.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "md:hidden",
                            onClick: ()=>setIsOpen(!isOpen),
                            children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {}, void 0, false, {
                                fileName: "[project]/components/layout/navbar.tsx",
                                lineNumber: 122,
                                columnNumber: 23
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {}, void 0, false, {
                                fileName: "[project]/components/layout/navbar.tsx",
                                lineNumber: 122,
                                columnNumber: 31
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/layout/navbar.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/navbar.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/navbar.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden border-t border-border bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 py-4 space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "block text-foreground hover:text-primary",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.home")
                        }, void 0, false, {
                            fileName: "[project]/components/layout/navbar.tsx",
                            lineNumber: 131,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/scorm-ai",
                            className: "block text-foreground hover:text-primary",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.scorm-ai")
                        }, void 0, false, {
                            fileName: "[project]/components/layout/navbar.tsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/packages",
                            className: "block text-foreground hover:text-primary",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.shop")
                        }, void 0, false, {
                            fileName: "[project]/components/layout/navbar.tsx",
                            lineNumber: 137,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/pricing",
                            className: "block text-foreground hover:text-primary",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.pricing")
                        }, void 0, false, {
                            fileName: "[project]/components/layout/navbar.tsx",
                            lineNumber: 140,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/features",
                            className: "block text-foreground hover:text-primary",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.features")
                        }, void 0, false, {
                            fileName: "[project]/components/layout/navbar.tsx",
                            lineNumber: 143,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/resources",
                            className: "block text-foreground hover:text-primary",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.resources")
                        }, void 0, false, {
                            fileName: "[project]/components/layout/navbar.tsx",
                            lineNumber: 146,
                            columnNumber: 13
                        }, this),
                        !session && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 pt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    className: "flex-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        className: "w-full",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.login")
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/navbar.tsx",
                                        lineNumber: 152,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/navbar.tsx",
                                    lineNumber: 151,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/register",
                                    className: "flex-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        className: "w-full",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.register")
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/navbar.tsx",
                                        lineNumber: 157,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/navbar.tsx",
                                    lineNumber: 156,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/navbar.tsx",
                            lineNumber: 150,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/navbar.tsx",
                    lineNumber: 130,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/navbar.tsx",
                lineNumber: 129,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/navbar.tsx",
        lineNumber: 47,
        columnNumber: 7
    }, this);
}
_s(Navbar, "/iWUeglezBZQE3MpJYWTcC+Cze8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$locale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/user-profile.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/user-profile.js
__turbopack_context__.s([
    "ensureUserProfile",
    ()=>ensureUserProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseClient.js [app-client] (ecmascript)");
;
async function ensureUserProfile(user) {
    if (!user) {
        return {
            profile: null,
            error: new Error('User object is required.')
        };
    }
    // 1. Check if a profile already exists
    const { data: existingProfile, error: selectError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').select('user_id').eq('user_id', user.id).single();
    if (selectError && selectError.code !== 'PGRST116') {
        console.error('Error checking for existing profile:', selectError.message);
        return {
            profile: null,
            error: selectError
        };
    }
    // 2. If profile exists, return it
    if (existingProfile) {
        return {
            profile: existingProfile,
            error: null
        };
    }
    // 3. If no profile exists, create one
    console.log('No profile found for user, creating one...');
    const { data: newProfile, error: insertError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').insert([
        {
            user_id: user.id,
            full_name: user.user_metadata.full_name,
            email: user.email,
            preferred_language: user.user_metadata.preferred_language || 'en',
            avatar_url: user.user_metadata.avatar_url
        }
    ]).select().single();
    if (insertError) {
        console.error('Error creating user profile:', insertError.message);
        return {
            profile: null,
            error: insertError
        };
    }
    console.log('User profile created successfully:', newProfile);
    return {
        profile: newProfile,
        error: null
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabaseClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$user$2d$profile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/user-profile.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function AuthProvider({ children }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const checkUser = {
                "AuthProvider.useEffect.checkUser": async ()=>{
                    const { data: { session } } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
                    if (session?.user) {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$user$2d$profile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensureUserProfile"])(session.user);
                    }
                }
            }["AuthProvider.useEffect.checkUser"];
            checkUser();
            const { data: authListener } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange({
                "AuthProvider.useEffect": async (event, session)=>{
                    if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user) {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$user$2d$profile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensureUserProfile"])(session.user);
                    }
                }
            }["AuthProvider.useEffect"]);
            return ({
                "AuthProvider.useEffect": ()=>{
                    authListener?.subscription.unsubscribe();
                }
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(AuthProvider, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = AuthProvider;
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_20d64244._.js.map