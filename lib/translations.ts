export const translations = {
  en: {
    // ... (existing translations) ...
    "scorm.props.title": "Properties",
    "scorm.props.desc": "Edit the properties of the selected block.",
    "scorm.props.block.text.html": "HTML Content",
    "scorm.props.block.image.src": "Image Source URL",
    "scorm.props.block.image.alt": "Alt Text",
    "scorm.props.block.video.src": "Video Source URL",
    "scorm.props.block.quiz.question": "Question",
  },
  ar: {
    // ... (existing translations) ...
    "scorm.props.title": "الخصائص",
    "scorm.props.desc": "تعديل خصائص الكتلة المحددة.",
    "scorm.props.block.text.html": "محتوى HTML",
    "scorm.props.block.image.src": "رابط مصدر الصورة",
    "scorm.props.block.image.alt": "النص البديل",
    "scorm.props.block.video.src": "رابط مصدر الفيديو",
    "scorm.props.block.quiz.question": "السؤال",
  },
} as const

export type TranslationKey = keyof typeof translations.en

export function t(locale: "en" | "ar", key: TranslationKey): string {
  return translations[locale][key] || key
}
