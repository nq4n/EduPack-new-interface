(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "getAuthCallbackUrl",
    ()=>getAuthCallbackUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
const getAuthCallbackUrl = ()=>{
    let url = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
    // Make sure to include `https` in production
    url = url.includes('http') ? url : `https://${url}`;
    // Make sure to include a trailing `/`
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
    url = `${url}api/auth/callback`;
    return url;
};
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
            outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 rounded-md px-3',
            lg: 'h-11 rounded-md px-8',
            icon: 'h-10 w-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/button.tsx",
        lineNumber: 49,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = 'Button';
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
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
        "scorm.ai.exportSuccess": "Export completed",
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
        "scorm.ai.quickInsert": "Quick insert",
        "scorm.ai.addText": "Text block",
        "scorm.ai.addImage": "Image block",
        "scorm.ai.addVideo": "Video block",
        "scorm.ai.addQuiz": "Quiz block",
        "scorm.ai.addInteractive": "Interactive block",
        "scorm.ai.addPage": "New page",
        "scorm.ai.pendingChanges": "Pending approval",
        "scorm.ai.acceptChanges": "Apply changes",
        "scorm.ai.rejectChanges": "Discard",
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
        "shop.preview.placeholderTitle": "Preview package",
        "shop.preview.samplePage": "Preview",
        "shop.preview.sampleIntro": "This is a quick preview of your package. Add pages and blocks in the editor to see them here.",
        "shop.preview.breadcrumb": "Marketplace · Package preview",
        "shop.preview.meta": "{{pages}} pages · {{blocks}} blocks",
        "shop.preview.pageCount": "{{pages}} pages",
        "shop.preview.blockCount": "{{blocks}} blocks",
        "shop.preview.languageRtl": "Arabic · RTL",
        "shop.preview.languageLtr": "English · LTR",
        "shop.preview.back": "Back",
        "shop.preview.loading": "Loading package...",
        "shop.preview.error": "Unable to load package",
        "shop.preview.loadedDescription": "Imported from SCORM AI editor",
        "shop.preview.included": "Included",
        "shop.preview.sampleMeta": "Content preview coming soon",
        "shop.preview.untitledPage": "Page",
        "shop.preview.emptyPage": "No blocks on this page yet",
        "payment.back": "Back to packages",
        "payment.title": "Payment",
        "payment.subtitle": "Review your purchase details and finalize payment. This is a demo view; no charges will occur.",
        "payment.status.title": "Payment status",
        "payment.status.desc": "We're preparing a secure checkout experience. For now, everything here is static placeholder content.",
        "payment.progress": "Awaiting payment connection",
        "payment.progress.desc": "Real transactions will be enabled once the payment gateway is configured.",
        "payment.support.title": "Need help?",
        "payment.support.desc": "Contact our support team if you have questions about billing or receipts.",
        "payment.summary.title": "Order snapshot",
        "payment.summary.desc": "Example charges will appear here once payment processing is connected.",
        "payment.summary.item": "Course access",
        "payment.summary.price": "$12.99",
        "payment.summary.tax": "Tax",
        "payment.summary.taxValue": "$1.30",
        "payment.summary.total": "Total",
        "payment.summary.totalValue": "$14.29",
        "payment.cta": "Proceed to checkout",
        "scorm.panels.text.title": "Text Settings",
        "scorm.panels.text.content": "Content",
        "scorm.panels.text.typography": "Typography",
        "scorm.panels.text.alignment": "Alignment",
        "scorm.panels.text.direction": "Direction",
        "scorm.panels.text.textColor": "Text Color",
        "scorm.panels.text.background": "Background",
        "scorm.panels.text.spacing": "Spacing",
        "scorm.panels.text.padding": "Padding",
        "scorm.panels.text.radius": "Border Radius",
        "scorm.panels.text.lineHeight": "Line Height",
        "scorm.panels.media.title": "Image Settings",
        "scorm.panels.media.url": "Image URL",
        "scorm.panels.media.alt": "Alt Text",
        "scorm.panels.media.size": "Size",
        "scorm.panels.media.width": "Width (%)",
        "scorm.panels.media.maxWidth": "Max Width (px)",
        "scorm.panels.media.alignment": "Alignment",
        "scorm.panels.media.appearance": "Appearance",
        "scorm.panels.media.radius": "Border Radius (px)",
        "scorm.panels.media.padding": "Padding (px)",
        "scorm.panels.media.background": "Background Color",
        "scorm.panels.video.title": "Video Settings",
        "scorm.panels.video.url": "Video URL",
        "scorm.panels.video.player": "Playback",
        "scorm.panels.video.autoplay": "Autoplay",
        "scorm.panels.video.loop": "Loop video",
        "scorm.panels.video.controls": "Show controls",
        "scorm.panels.video.muted": "Muted",
        "scorm.panels.video.size": "Size",
        "scorm.panels.video.width": "Width (%)",
        "scorm.panels.video.maxWidth": "Max Width (px)",
        "scorm.panels.video.alignment": "Alignment",
        "scorm.panels.video.appearance": "Appearance",
        "scorm.panels.video.radius": "Border Radius (px)",
        "scorm.panels.video.padding": "Padding (px)",
        "scorm.panels.video.background": "Background Color",
        "scorm.panels.video.shadow": "Shadow",
        "scorm.panels.interactive.title": "Interactive element",
        "scorm.panels.interactive.type": "Type",
        "scorm.panels.interactive.button": "Button",
        "scorm.panels.interactive.callout": "Callout box",
        "scorm.panels.interactive.reveal": "Reveal box",
        "scorm.panels.interactive.custom": "Custom HTML",
        "scorm.panels.interactive.buttonText": "Button text",
        "scorm.panels.interactive.revealTitle": "Title (what learner clicks)",
        "scorm.panels.interactive.titleField": "Title",
        "scorm.panels.interactive.link": "Link (optional)",
        "scorm.panels.interactive.linkHelp": "If you leave this empty, the button will only look clickable and not open anything.",
        "scorm.panels.interactive.calloutContent": "Callout content",
        "scorm.panels.interactive.tone": "Tone",
        "scorm.panels.interactive.tones.info": "Info",
        "scorm.panels.interactive.tones.success": "Success",
        "scorm.panels.interactive.tones.warning": "Warning",
        "scorm.panels.interactive.tones.danger": "Danger",
        "scorm.panels.interactive.revealHidden": "Hidden content (shown after learner clicks)",
        "scorm.panels.interactive.open": "Open by default",
        "scorm.panels.interactive.customHtml": "Custom HTML",
        "scorm.panels.interactive.customHelp": "For advanced users. Avoid using <script> tags. You can embed iframes, H5P, simple widgets, etc.",
        "scorm.panels.interactive.appearance": "Appearance",
        "scorm.panels.interactive.padding": "Padding (px)",
        "scorm.panels.interactive.radius": "Border radius (px)",
        "scorm.panels.interactive.background": "Background color",
        "scorm.panels.interactive.shadow": "Shadow",
        "scorm.panels.quiz.title": "Quiz Settings",
        "scorm.panels.quiz.question": "Question text",
        "scorm.panels.quiz.questionHelp": "Format the question like normal text (bold, RTL, colors…)",
        "scorm.panels.quiz.options": "Options",
        "scorm.panels.quiz.addOption": "+ Add option",
        "scorm.panels.quiz.noOptions": "No options yet. Click “Add option” to create choices.",
        "scorm.panels.quiz.remove": "Remove",
        "scorm.panels.quiz.correctHelp": "You can mark one or more options as correct.",
        "scorm.panels.quiz.boxAppearance": "Question box appearance",
        "scorm.panels.quiz.padding": "Padding (px)",
        "scorm.panels.quiz.radius": "Border Radius (px)",
        "scorm.panels.quiz.background": "Background Color",
        "scorm.panels.quiz.shadow": "Shadow",
        "scorm.panels.quiz.optionStyle": "Options text style",
        "scorm.panels.quiz.align": "Alignment",
        "scorm.panels.quiz.color": "Text color",
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
        "scorm.ai.exportSuccess": "تم إكمال التصدير",
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
        "shop.preview.placeholderTitle": "معاينة الحزمة",
        "shop.preview.samplePage": "معاينة",
        "shop.preview.sampleIntro": "هذه معاينة سريعة لحزمتك. أضف صفحات وكتلًا في المحرر لتظهر هنا.",
        "shop.preview.breadcrumb": "السوق · معاينة الحزمة",
        "shop.preview.meta": "{{pages}} صفحات · {{blocks}} كتل",
        "shop.preview.pageCount": "{{pages}} صفحات",
        "shop.preview.blockCount": "{{blocks}} كتل",
        "shop.preview.languageRtl": "العربية · من اليمين لليسار",
        "shop.preview.languageLtr": "الإنجليزية · من اليسار لليمين",
        "shop.preview.back": "رجوع",
        "shop.preview.loading": "جاري تحميل الحزمة...",
        "shop.preview.error": "تعذر تحميل الحزمة",
        "shop.preview.loadedDescription": "مستوردة من محرر SCORM AI",
        "shop.preview.included": "مضمن",
        "shop.preview.sampleMeta": "معاينة المحتوى قريبًا",
        "shop.preview.untitledPage": "صفحة",
        "shop.preview.emptyPage": "لا توجد كتل في هذه الصفحة بعد",
        "payment.back": "العودة إلى الحزم",
        "payment.title": "الدفع",
        "payment.subtitle": "راجع تفاصيل مشترياتك وأكمل الدفع. هذه صفحة تجريبية ولن يتم إجراء أي رسوم.",
        "payment.status.title": "حالة الدفع",
        "payment.status.desc": "نجهز تجربة دفع آمنة. حالياً كل شيء هنا محتوى توضيحي ثابت.",
        "payment.progress": "في انتظار ربط بوابة الدفع",
        "payment.progress.desc": "سيتم تفعيل المعاملات الحقيقية بمجرد إعداد بوابة الدفع.",
        "payment.support.title": "تحتاج مساعدة؟",
        "payment.support.desc": "تواصل مع فريق الدعم إذا كان لديك أسئلة حول الفواتير أو الإيصالات.",
        "payment.summary.title": "ملخص الطلب",
        "payment.summary.desc": "ستظهر أمثلة الرسوم هنا عند تفعيل معالجة الدفع.",
        "payment.summary.item": "وصول إلى الدورة",
        "payment.summary.price": "$12.99",
        "payment.summary.tax": "الضريبة",
        "payment.summary.taxValue": "$1.30",
        "payment.summary.total": "الإجمالي",
        "payment.summary.totalValue": "$14.29",
        "payment.cta": "المتابعة إلى الدفع",
        "scorm.panels.text.title": "إعدادات النص",
        "scorm.panels.text.content": "المحتوى",
        "scorm.panels.text.typography": "الطباعة",
        "scorm.panels.text.alignment": "المحاذاة",
        "scorm.panels.text.direction": "الاتجاه",
        "scorm.panels.text.textColor": "لون النص",
        "scorm.panels.text.background": "الخلفية",
        "scorm.panels.text.spacing": "التباعد",
        "scorm.panels.text.padding": "الحشو",
        "scorm.panels.text.radius": "نصف القطر",
        "scorm.panels.text.lineHeight": "ارتفاع السطر",
        "scorm.panels.media.title": "إعدادات الصورة",
        "scorm.panels.media.url": "رابط الصورة",
        "scorm.panels.media.alt": "نص بديل",
        "scorm.panels.media.size": "الحجم",
        "scorm.panels.media.width": "العرض (%)",
        "scorm.panels.media.maxWidth": "أقصى عرض (px)",
        "scorm.panels.media.alignment": "المحاذاة",
        "scorm.panels.media.appearance": "المظهر",
        "scorm.panels.media.radius": "نصف القطر (px)",
        "scorm.panels.media.padding": "الحشو (px)",
        "scorm.panels.media.background": "لون الخلفية",
        "scorm.panels.video.title": "إعدادات الفيديو",
        "scorm.panels.video.url": "رابط الفيديو",
        "scorm.panels.video.player": "التشغيل",
        "scorm.panels.video.autoplay": "تشغيل تلقائي",
        "scorm.panels.video.loop": "تكرار الفيديو",
        "scorm.panels.video.controls": "إظهار عناصر التحكم",
        "scorm.panels.video.muted": "كتم الصوت",
        "scorm.panels.video.size": "الحجم",
        "scorm.panels.video.width": "العرض (%)",
        "scorm.panels.video.maxWidth": "أقصى عرض (px)",
        "scorm.panels.video.alignment": "المحاذاة",
        "scorm.panels.video.appearance": "المظهر",
        "scorm.panels.video.radius": "نصف القطر (px)",
        "scorm.panels.video.padding": "الحشو (px)",
        "scorm.panels.video.background": "لون الخلفية",
        "scorm.panels.video.shadow": "ظل",
        "scorm.panels.interactive.title": "عنصر تفاعلي",
        "scorm.panels.interactive.type": "النوع",
        "scorm.panels.interactive.button": "زر",
        "scorm.panels.interactive.callout": "صندوق تنبيه",
        "scorm.panels.interactive.reveal": "صندوق كشف",
        "scorm.panels.interactive.custom": "HTML مخصص",
        "scorm.panels.interactive.buttonText": "نص الزر",
        "scorm.panels.interactive.revealTitle": "العنوان (ما ينقره المتعلم)",
        "scorm.panels.interactive.titleField": "العنوان",
        "scorm.panels.interactive.link": "رابط (اختياري)",
        "scorm.panels.interactive.linkHelp": "إذا تركته فارغًا سيبدو الزر قابلاً للنقر فقط دون فتح أي شيء.",
        "scorm.panels.interactive.calloutContent": "محتوى التنبيه",
        "scorm.panels.interactive.tone": "النغمة",
        "scorm.panels.interactive.tones.info": "معلومة",
        "scorm.panels.interactive.tones.success": "نجاح",
        "scorm.panels.interactive.tones.warning": "تحذير",
        "scorm.panels.interactive.tones.danger": "خطر",
        "scorm.panels.interactive.revealHidden": "المحتوى المخفي (يظهر بعد النقر)",
        "scorm.panels.interactive.open": "مفتوح افتراضيًا",
        "scorm.panels.interactive.customHtml": "HTML مخصص",
        "scorm.panels.interactive.customHelp": "للمستخدمين المتقدمين. تجنب استخدام وسوم <script>. يمكنك تضمين iframes أو أدوات بسيطة.",
        "scorm.panels.interactive.appearance": "المظهر",
        "scorm.panels.interactive.padding": "الحشو (px)",
        "scorm.panels.interactive.radius": "نصف القطر (px)",
        "scorm.panels.interactive.background": "لون الخلفية",
        "scorm.panels.interactive.shadow": "ظل",
        "scorm.panels.quiz.title": "إعدادات الاختبار",
        "scorm.panels.quiz.question": "نص السؤال",
        "scorm.panels.quiz.questionHelp": "نسّق السؤال مثل النص العادي (عريض، اتجاه، ألوان...)",
        "scorm.panels.quiz.options": "الخيارات",
        "scorm.panels.quiz.addOption": "+ إضافة خيار",
        "scorm.panels.quiz.noOptions": "لا توجد خيارات بعد. اضغط \"إضافة خيار\" للبدء.",
        "scorm.panels.quiz.remove": "حذف",
        "scorm.panels.quiz.correctHelp": "يمكنك تحديد خيار واحد أو أكثر كإجابة صحيحة.",
        "scorm.panels.quiz.boxAppearance": "مظهر صندوق السؤال",
        "scorm.panels.quiz.padding": "الحشو (px)",
        "scorm.panels.quiz.radius": "نصف القطر (px)",
        "scorm.panels.quiz.background": "لون الخلفية",
        "scorm.panels.quiz.shadow": "ظل",
        "scorm.panels.quiz.optionStyle": "تنسيق نص الخيارات",
        "scorm.panels.quiz.align": "المحاذاة",
        "scorm.panels.quiz.color": "لون النص",
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
        "scorm.ai.quickInsert": "إدراج سريع",
        "scorm.ai.addText": "كتلة نصية",
        "scorm.ai.addImage": "كتلة صورة",
        "scorm.ai.addVideo": "كتلة فيديو",
        "scorm.ai.addQuiz": "كتلة اختبار",
        "scorm.ai.addInteractive": "كتلة تفاعلية",
        "scorm.ai.addPage": "صفحة جديدة",
        "scorm.ai.pendingChanges": "بانتظار الموافقة",
        "scorm.ai.acceptChanges": "تطبيق التغييرات",
        "scorm.ai.rejectChanges": "تجاهل",
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
;
const DropdownMenu = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const DropdownMenuTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"];
const DropdownMenuGroup = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"];
const DropdownMenuPortal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"];
const DropdownMenuSub = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sub"];
const DropdownMenuRadioGroup = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroup"];
const DropdownMenuSubTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, inset, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubTrigger"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent', inset && 'pl-8', className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                className: "ml-auto h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/components/ui/dropdown-menu.tsx",
                lineNumber: 37,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 27,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = DropdownMenuSubTrigger;
DropdownMenuSubTrigger.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubTrigger"].displayName;
const DropdownMenuSubContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubContent"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 47,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = DropdownMenuSubContent;
DropdownMenuSubContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubContent"].displayName;
const DropdownMenuContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, sideOffset = 4, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            ref: ref,
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', className),
            ...props
        }, void 0, false, {
            fileName: "[project]/components/ui/dropdown-menu.tsx",
            lineNumber: 64,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = DropdownMenuContent;
DropdownMenuContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
const DropdownMenuItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = ({ className, inset, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50', inset && 'pl-8', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 83,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c7 = DropdownMenuItem;
DropdownMenuItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"].displayName;
const DropdownMenuCheckboxItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = ({ className, children, checked, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckboxItem"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50', className),
        checked: checked,
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/dropdown-menu.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/ui/dropdown-menu.tsx",
                    lineNumber: 109,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/ui/dropdown-menu.tsx",
                lineNumber: 108,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 99,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c9 = DropdownMenuCheckboxItem;
DropdownMenuCheckboxItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckboxItem"].displayName;
const DropdownMenuRadioItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = ({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioItem"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50', className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                        className: "h-2 w-2 fill-current"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/dropdown-menu.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/ui/dropdown-menu.tsx",
                    lineNumber: 132,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/ui/dropdown-menu.tsx",
                lineNumber: 131,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 123,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c11 = DropdownMenuRadioItem;
DropdownMenuRadioItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioItem"].displayName;
const DropdownMenuLabel = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c12 = ({ className, inset, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 147,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c13 = DropdownMenuLabel;
DropdownMenuLabel.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"].displayName;
const DropdownMenuSeparator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c14 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('-mx-1 my-1 h-px bg-muted', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 163,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c15 = DropdownMenuSeparator;
DropdownMenuSeparator.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"].displayName;
const DropdownMenuShortcut = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('ml-auto text-xs tracking-widest opacity-60', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown-menu.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c16 = DropdownMenuShortcut;
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16;
__turbopack_context__.k.register(_c, "DropdownMenuSubTrigger$React.forwardRef");
__turbopack_context__.k.register(_c1, "DropdownMenuSubTrigger");
__turbopack_context__.k.register(_c2, "DropdownMenuSubContent$React.forwardRef");
__turbopack_context__.k.register(_c3, "DropdownMenuSubContent");
__turbopack_context__.k.register(_c4, "DropdownMenuContent$React.forwardRef");
__turbopack_context__.k.register(_c5, "DropdownMenuContent");
__turbopack_context__.k.register(_c6, "DropdownMenuItem$React.forwardRef");
__turbopack_context__.k.register(_c7, "DropdownMenuItem");
__turbopack_context__.k.register(_c8, "DropdownMenuCheckboxItem$React.forwardRef");
__turbopack_context__.k.register(_c9, "DropdownMenuCheckboxItem");
__turbopack_context__.k.register(_c10, "DropdownMenuRadioItem$React.forwardRef");
__turbopack_context__.k.register(_c11, "DropdownMenuRadioItem");
__turbopack_context__.k.register(_c12, "DropdownMenuLabel$React.forwardRef");
__turbopack_context__.k.register(_c13, "DropdownMenuLabel");
__turbopack_context__.k.register(_c14, "DropdownMenuSeparator$React.forwardRef");
__turbopack_context__.k.register(_c15, "DropdownMenuSeparator");
__turbopack_context__.k.register(_c16, "DropdownMenuShortcut");
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
'use client';
;
;
;
;
const Avatar = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className),
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
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('aspect-square h-full w-full', className),
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
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex h-full w-full items-center justify-center rounded-full bg-muted', className),
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
"[project]/lib/supabase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
let browserClient = null;
function createClient() {
    if (browserClient) return browserClient;
    const supabaseUrl = ("TURBOPACK compile-time value", "https://xnyniavtnqimkhskdpyq.supabase.co");
    const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueW5pYXZ0bnFpbWtoc2tkcHlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NDUzMzksImV4cCI6MjA4MDQyMTMzOX0.c8VnJsruL4LP6VWlhe4tGXZbtLDqmItlM9n2-Ra7Hx0");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    browserClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(supabaseUrl, supabaseAnonKey);
    return browserClient;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/auth-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthProvider,
    "useSupabase",
    ()=>useSupabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const Context = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const { data: { subscription } } = supabase.auth.onAuthStateChange({
                "AuthProvider.useEffect": async (_, session)=>{
                    setUser(session?.user ?? null);
                }
            }["AuthProvider.useEffect"]);
            supabase.auth.getSession().then({
                "AuthProvider.useEffect": ({ data: { session } })=>{
                    setUser(session?.user ?? null);
                }
            }["AuthProvider.useEffect"]);
            return ({
                "AuthProvider.useEffect": ()=>subscription.unsubscribe()
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Context.Provider, {
        value: {
            supabase,
            user
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/auth-provider.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "5s2qRsV95gTJBmaaTh11GoxYeGE=");
_c = AuthProvider;
function useSupabase() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(Context);
    if (!context) throw new Error("useSupabase must be used inside AuthProvider");
    return context;
}
_s1(useSupabase, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$locale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-locale.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/translations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$language$2d$switcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/language-switcher.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth-provider.tsx [app-client] (ecmascript)");
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
;
function Navbar() {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { locale } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$locale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { supabase, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSupabase"])();
    const navLinks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Navbar.useMemo[navLinks]": ()=>[
                {
                    href: "/",
                    label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.home")
                },
                {
                    href: "/scorm-ai",
                    label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.scorm-ai")
                },
                {
                    href: "/packages",
                    label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.shop")
                },
                {
                    href: "/pricing",
                    label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.pricing")
                },
                {
                    href: "/features",
                    label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.features")
                },
                {
                    href: "/resources",
                    label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.resources")
                }
            ]
    }["Navbar.useMemo[navLinks]"], [
        locale
    ]);
    const handleSignOut = async ()=>{
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/edupack-logo.svg",
                                    alt: "EduPack logo",
                                    width: 36,
                                    height: 36,
                                    priority: true
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/navbar.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xl font-bold text-primary",
                                    children: "EduPack"
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/navbar.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/navbar.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden md:flex items-center gap-8",
                            children: navLinks.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    className: "text-foreground hover:text-primary transition-colors",
                                    children: item.label
                                }, item.href, false, {
                                    fileName: "[project]/components/layout/navbar.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/layout/navbar.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden md:flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$language$2d$switcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LanguageSwitcher"], {}, void 0, false, {
                                    fileName: "[project]/components/layout/navbar.tsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, this),
                                user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
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
                                                            src: user.user_metadata?.avatar_url,
                                                            alt: user.email || "User avatar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/layout/navbar.tsx",
                                                            lineNumber: 89,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                            children: getInitials(user.email ?? "")
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/layout/navbar.tsx",
                                                            lineNumber: 90,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/layout/navbar.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/navbar.tsx",
                                                lineNumber: 87,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/navbar.tsx",
                                            lineNumber: 86,
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
                                                                lineNumber: 97,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs leading-none text-muted-foreground",
                                                                children: user.email
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/layout/navbar.tsx",
                                                                lineNumber: 98,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/layout/navbar.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/navbar.tsx",
                                                    lineNumber: 95,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                    fileName: "[project]/components/layout/navbar.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                    onClick: ()=>router.push('/profile'),
                                                    children: "Profile"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/navbar.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                    onClick: handleSignOut,
                                                    children: "Log out"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/navbar.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/layout/navbar.tsx",
                                            lineNumber: 94,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/layout/navbar.tsx",
                                    lineNumber: 85,
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
                                                lineNumber: 109,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/navbar.tsx",
                                            lineNumber: 108,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/register",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(locale, "nav.register")
                                            }, void 0, false, {
                                                fileName: "[project]/components/layout/navbar.tsx",
                                                lineNumber: 112,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/navbar.tsx",
                                            lineNumber: 111,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/navbar.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "md:hidden",
                            onClick: ()=>setIsOpen(!isOpen),
                            children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {}, void 0, false, {
                                fileName: "[project]/components/layout/navbar.tsx",
                                lineNumber: 120,
                                columnNumber: 23
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {}, void 0, false, {
                                fileName: "[project]/components/layout/navbar.tsx",
                                lineNumber: 120,
                                columnNumber: 31
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/layout/navbar.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/navbar.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/navbar.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden border-t border-border bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 py-4 space-y-3",
                    children: [
                        navLinks.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: "block text-foreground hover:text-primary",
                                children: item.label
                            }, item.href, false, {
                                fileName: "[project]/components/layout/navbar.tsx",
                                lineNumber: 130,
                                columnNumber: 15
                            }, this)),
                        !user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        lineNumber: 141,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/navbar.tsx",
                                    lineNumber: 140,
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
                                        lineNumber: 146,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/navbar.tsx",
                                    lineNumber: 145,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/navbar.tsx",
                            lineNumber: 139,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/navbar.tsx",
                    lineNumber: 128,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/navbar.tsx",
                lineNumber: 127,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/navbar.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(Navbar, "X6YLR8HS70WOwYSemfAGudzNzEU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$locale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSupabase"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/sonner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
"use client";
;
;
const Toaster = ({ ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: "light",
        className: "toaster group",
        toastOptions: {
            classNames: {
                toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                description: "group-[.toast]:text-muted-foreground",
                actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
            }
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/sonner.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Toaster;
;
var _c;
__turbopack_context__.k.register(_c, "Toaster");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_7783d21e._.js.map