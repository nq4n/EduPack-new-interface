export type ProfileLanguage = "en" | "ar"

export const normalizeLanguage = (language?: string): ProfileLanguage =>
  language?.toLowerCase().startsWith("ar") ? "ar" : "en"

const profileStrings: Record<ProfileLanguage, {
  nav: {
    account: string
    overview: string
    packages: string
    billing: string
    settings: string
  }
  overview: {
    title: string
    signInHeading: string
    signInMessage: string
    loadingHeading: string
    loadingMessage: string
    personalInfo: string
    profilePicture: string
    uploadPhoto: string
    fullName: string
    email: string
    preferredLanguage: string
    selectLanguage: string
    saveChanges: string
    saving: string
    errorLoading: string
    mustBeLoggedIn: string
    languageOptions: { label: string; value: ProfileLanguage }[]
    profileUpdated: string
  }
  packages: {
    heading: string
    createdAt: string
    download: string
    view: string
    noPackagesTitle: string
    noPackagesBody: string
    createPackage: string
    loading: string
    selectToPreview: string
    close: string
    openInEditor: string
    missingPath: string
    noPathError: string
    loadErrorFallback: string
  }
  billing: {
    heading: string
    planNameFallback: string
    planStatus: { active: string; free: string }
    creditsLabel: (credits: number) => string
    upgradePlan: string
    paymentMethod: string
    noPaymentMethod: string
    addPaymentMethod: string
    invoices: string
    loadingInvoices: string
    noInvoices: string
  }
  settings: {
    heading: string
    notifications: string
    emailNotifications: string
    emailNotificationsHint: string
    marketingEmails: string
    marketingEmailsHint: string
    dangerZone: string
    dangerZoneHint: string
    deleteAccount: string
  }
}> = {
  en: {
    nav: {
      account: "Account",
      overview: "Overview",
      packages: "My Packages",
      billing: "Billing",
      settings: "Settings",
    },
    overview: {
      title: "Profile",
      signInHeading: "Profile",
      signInMessage: "Please sign in to view your profile.",
      loadingHeading: "Profile",
      loadingMessage: "Syncing your profile with the database...",
      personalInfo: "Personal Information",
      profilePicture: "Profile Picture",
      uploadPhoto: "Upload Photo",
      fullName: "Full Name",
      email: "Email",
      preferredLanguage: "Preferred Language",
      selectLanguage: "Select a language",
      saveChanges: "Save Changes",
      saving: "Saving...",
      errorLoading: "Could not load your profile. Please try again.",
      mustBeLoggedIn: "You must be logged in to update your profile.",
      languageOptions: [
        { label: "English", value: "en" },
        { label: "Arabic", value: "ar" },
      ],
      profileUpdated: "Profile updated",
    },
    packages: {
      heading: "Owned Packages",
      createdAt: "Created:",
      download: "Download",
      view: "View",
      noPackagesTitle: "No packages yet",
      noPackagesBody:
        "You haven't created any packages yet. Start building your first SCORM package.",
      createPackage: "Create New Package",
      loading: "Loading package...",
      selectToPreview: "Select a package to preview.",
      close: "Close",
      openInEditor: "Open in editor",
      missingPath: "Package is missing a storage path",
      noPathError: "No storage path found for this package.",
      loadErrorFallback: "Failed to load package",
    },
    billing: {
      heading: "Subscription & Billing",
      planNameFallback: "Free Plan",
      planStatus: {
        active: "Active",
        free: "Free",
      },
      creditsLabel: (credits: number) => `${credits} credits available`,
      upgradePlan: "Upgrade Plan",
      paymentMethod: "Payment Method",
      noPaymentMethod: "No payment method on file",
      addPaymentMethod: "Add Payment Method",
      invoices: "Invoices",
      loadingInvoices: "Loading invoices...",
      noInvoices: "No invoices available",
    },
    settings: {
      heading: "Account Settings",
      notifications: "Notifications",
      emailNotifications: "Email notifications",
      emailNotificationsHint: "Receive updates about your account",
      marketingEmails: "Marketing emails",
      marketingEmailsHint: "Receive tips and promotional offers",
      dangerZone: "Danger Zone",
      dangerZoneHint:
        "Once you delete your account, there is no going back. Please be certain.",
      deleteAccount: "Delete Account",
    },
  },
  ar: {
    nav: {
      account: "الحساب",
      overview: "نظرة عامة",
      packages: "الحزم الخاصة بي",
      billing: "الفوترة",
      settings: "الإعدادات",
    },
    overview: {
      title: "الملف الشخصي",
      signInHeading: "الملف الشخصي",
      signInMessage: "يرجى تسجيل الدخول لعرض ملفك الشخصي.",
      loadingHeading: "الملف الشخصي",
      loadingMessage: "جاري مزامنة ملفك مع قاعدة البيانات...",
      personalInfo: "المعلومات الشخصية",
      profilePicture: "الصورة الشخصية",
      uploadPhoto: "رفع صورة",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      preferredLanguage: "اللغة المفضلة",
      selectLanguage: "اختر لغة",
      saveChanges: "حفظ التغييرات",
      saving: "جاري الحفظ...",
      errorLoading: "تعذر تحميل ملفك الشخصي. يرجى المحاولة مجددًا.",
      mustBeLoggedIn: "يجب تسجيل الدخول لتحديث ملفك الشخصي.",
      languageOptions: [
        { label: "الإنجليزية", value: "en" },
        { label: "العربية", value: "ar" },
      ],
      profileUpdated: "تم تحديث الملف الشخصي",
    },
    packages: {
      heading: "الحزم المملوكة",
      createdAt: "تاريخ الإنشاء:",
      download: "تنزيل",
      view: "عرض",
      noPackagesTitle: "لا توجد حزم بعد",
      noPackagesBody:
        "لم تقم بإنشاء أي حزم بعد. ابدأ بإنشاء أول حزمة SCORM الخاصة بك.",
      createPackage: "إنشاء حزمة جديدة",
      loading: "جاري تحميل الحزمة...",
      selectToPreview: "اختر حزمة لعرضها.",
      close: "إغلاق",
      openInEditor: "افتح في المحرر",
      missingPath: "الحزمة تفتقر إلى مسار تخزين",
      noPathError: "لا يوجد مسار تخزين لهذه الحزمة.",
      loadErrorFallback: "فشل في تحميل الحزمة",
    },
    billing: {
      heading: "الاشتراك والفوترة",
      planNameFallback: "الخطة المجانية",
      planStatus: {
        active: "نشط",
        free: "مجاني",
      },
      creditsLabel: (credits: number) => `${credits} رصيد متاح`,
      upgradePlan: "ترقية الخطة",
      paymentMethod: "طريقة الدفع",
      noPaymentMethod: "لا توجد طريقة دفع مسجلة",
      addPaymentMethod: "أضف طريقة دفع",
      invoices: "الفواتير",
      loadingInvoices: "جارٍ تحميل الفواتير...",
      noInvoices: "لا توجد فواتير متاحة",
    },
    settings: {
      heading: "إعدادات الحساب",
      notifications: "الإشعارات",
      emailNotifications: "إشعارات البريد الإلكتروني",
      emailNotificationsHint: "استقبال التحديثات حول حسابك",
      marketingEmails: "رسائل تسويقية",
      marketingEmailsHint: "استقبال النصائح والعروض الترويجية",
      dangerZone: "منطقة الخطر",
      dangerZoneHint: "بمجرد حذف الحساب لا يمكن التراجع. يرجى التأكد.",
      deleteAccount: "حذف الحساب",
    },
  },
}

export const getProfileStrings = (language?: string) =>
  profileStrings[normalizeLanguage(language)]
