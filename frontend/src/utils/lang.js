

export const translations = {
    arLang: "العربية",
    enLang: "English",
    en: {
        signinup: {
            signin: 'Sign In',
            signup: 'Sign Up',
            name: "Name",
            roleTitle: "Role",
            email: "Email",
            pass: "Password",
            continue_btn: "Continue",
            signupQuestion: "Already have an account?",
            signinQuestion: "Start your journey with us?",
            signuphere: "Register now",
            signinhere: "Sign In here",
            nameRequired: "Name is required.",
            emailRequired: "Valid email is required.",
            emailNotFound: "Email not found",
            emailExist: "Existing user found with the same email address",
            passwordRequired: "Password must be at least 6 characters.",
            passwordIncorrect: 'Incorrect password',
            role: ["Student", "Instructor"],
        },
        sidebar: {
            title: {
                student: "Student Panel",
                instructor: "Instructor Panel",
            },
            studentCourses: "My Courses",
            courses: 'Courses',
            instructorCourses: 'My Courses',
        },
        courses: {
            title: "All Courses",
            viewMore: "Details",
            instructor: "Instructor:"
        },
        courseDetails: {
            instructor: "Instructor:",
            notFound: "Course not found",
            back: "Back to Courses",
            category: "Category",
            level: "Level",
            lessons: "Lessons",
            alreadyEnrolled: "Enrolled",
            enrolling: 'Enrolling',
            enroll: "Enroll",
        },
        courseForm: {
            title: ["Create Course", "Edit Course"],
            inputs: ["Title", "Description", "Category", "Level"],
            select: {
                category: "Select a category",
                level: "Select a level",
            },
            levels: ["Beginner", "Intermediate", "Advanced"],
            submitbtn: ["Update Course", "Create Course"],
            errors: {
                title: "Title is required",
                description: "Description is required",
            }
        },
        instructorDashboard: {
            add: "Add New Course",
            edit: "Edit Course",
            manage: "Manage Lessons",
            noCourses: "No Courses",
            deleteConfirm: 'sure to Delete?'
        },
        lessons: {
            title: "Lessons",
            addBtn: "Add Lesson",
            noLessons: "No lessons available for this course.",
            courseNotFound: "Course not found.",
            minutes: "min",
            edit: "Edit",
            delete: "Delete",
            deleteConfirm: "Are you sure you want to delete",
            lessonTitle: "Lesson Title",
            actions: "Actions",
            markComplete: "Mark as Complete",
            uploadedFile: "Uploaded file",
            noContent: "No content available"
        },
        lessonForm: {
            title: ["Add Lesson", "Edit Lesson"],
            inputs: ["Lesson Title", "Content (text)", "Upload File/Video"],
            submitbtn: ["Update Lesson", "Create Lesson"],
            errors: {
                title: "Title is required",
                contentOrFile: "Please provide either text content or a file/video"
            }
        },
        student: {
            coursesTitle: "My Courses",
            noCourses: "You are not enrolled in any courses.",
            progress: "Progress",
            viewLessons: "View Lessons"
        },
        noData: "No Data Found",
        somthingWrong: "Somthing went wrong!",
        copyRight: ['All Rights Reserved ', ' 2025 - eduTrack. Designed & Developed By Afrah3b.'],
    },
    ar: {
        signinup: {
            signin: 'تسجيل الدخول',
            signup: 'تسجيل جديد',
            name: "الاسم",
            roleTitle: "الصفة",
            email: "البريد الالكتروني",
            pass: "كلمة السر",
            continue_btn: "متابعة",
            signupQuestion: "بالفعل لديك حساب؟",
            signinQuestion: "ابدا رحلتك معنا؟",
            signuphere: "سجل الان",
            signinhere: "تسجيل الدخول هنا",
            nameRequired: "الاسم مطلوب.",
            emailRequired: "الرجاء ادخال بريد الإلكتروني صالح.",
            emailNotFound: "البريد الالكتروني غير مسجل",
            emailExist: "البريد الالكتروني مسجل مسبقا",
            passwordRequired: "يجب أن تكون كلمة المرور 6 أحرف على الأقل.",
            passwordIncorrect: 'كلمة السر غير صحيحة',
            role: ["طالب/ة", "معلم/ة"],
        },
        sidebar: {
            title: {
                student: "الطالب/ة",
                instructor: "المعلم/ة",
            },
            studentCourses: 'دوراتي',
            courses: 'الدورات',
            instructorCourses: 'دوراتي',
        },
        courses: {
            title: "كل الدورات",
            viewMore: "التفاصيل",
            instructor: "المعلم:",
        },
        courseDetails: {
            instructor: "المعلم:",
            notFound: "لم يتم العثور على الدورة",
            back: "العودة الى الدورات",
            category: "الصنف",
            level: "المستوى",
            lessons: "الدروس",
            alreadyEnrolled: "تم التسجيل",
            enrolling: 'جاري التسجيل',
            enroll: "تسجيل",
        },
        courseForm: {
            title: ["إنشاء دورة", "تعديل دورة"],
            inputs: ["العنوان", "الوصف", "الفئة", "المستوى"],
            select: {
                category: "اختر الفئة",
                level: "اختر المستوى",
            },
            levels: ["مبتدئ", "متوسط", "متقدم"],
            submitbtn: ["تحديث الدورة", "إنشاء الدورة"],
            errors: {
                title: "العنوان مطلوب",
                description: "الوصف مطلوب",
            }
        },
        instructorDashboard: {
            add: "انشاء دورة",
            edit: "تعديل الدورة",
            manage: "إدارة الدروس",
            noCourses: "لا يوجد دورات",
            deleteConfirm: 'متأكد من الحذف؟'
        },
        lessons: {
            title: "الدروس",
            addBtn: "إضافة درس",
            noLessons: "لا توجد دروس متاحة لهذا الدورة.",
            courseNotFound: "الدورة غير موجودة.",
            minutes: "د",
            edit: "تعديل",
            delete: "حذف",
            deleteConfirm: "هل أنت متأكد أنك تريد حذف",
            lessonTitle: "عنوان الدرس",
            actions: "الإجراءات",
            markComplete: "وضع علامة كمكتمل",
            uploadedFile: "الملف المرفوع",
            noContent: "لا يوجد محتوى متاح"
        },
        lessonForm: {
            title: ["إنشاء درس", "تعديل الدرس"],
            inputs: [
                "العنوان",
                "المحتوى النصي",
                "رفع ملف (فيديو / PDF)",
            ],
            submitbtn: ["تحديث الدرس", "إنشاء الدرس"],
            errors: {
                title: "العنوان مطلوب",
                contentOrFile: "يرجى رفع ملف صالح او إضافة محتوى نصي",
            },
        },
        student: {
            coursesTitle: "دوراتي",
            noCourses: "أنت غير مسجل في أي دورة.",
            progress: "التقدم",
            viewLessons: "عرض الدروس"
        },
        noData: "لا يوجد بيانات",
        somthingWrong: "حدث شيء خطأ الرجاء المحاولة لاحقا!",
        copyRight: ['جميع الحقوق محفوظة ', ' 2025 - eduTrack. تصميم وتطوير Afrah3b.'],
    }
}