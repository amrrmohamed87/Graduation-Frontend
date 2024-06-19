import d1 from "../assets/images/d1.jpg";
import d2 from "../assets/images/d2.jpg";
import d3 from "../assets/images/d3.jpeg";

import h1 from "../assets/images/baby-health.jpg";
import h2 from "../assets/images/woman-health.jpg";
import h3 from "../assets/images/seniors-health.jpg";
import baby from "../assets/images/heart.png";
import women from "../assets/images/pediatrics.png";
import elderly from "../assets/images/nursing-home.png";
import checkMark from "../assets/images/correct.png";

import calendar from "../assets/images/calendar.png";
import doctors from "../assets/images/medical-team.png";
import medications from "../assets/images/syringe.png";

import health from "../assets/images/healthy.png";
import food from "../assets/images/healthy-food.png";
import awareness from "../assets/images/education.png";

import vegetables from "../assets/images/vegetables.png";
import fruits from "../assets/images/fruits.png";
import bread from "../assets/images/bread.png";
import protein from "../assets/images/proteins.png";
import nuts from "../assets/images/nuts.png";

// Navbar Links
export const navLinks = [
    { to: "/contact-us", label: "التواصل معنا" },
    { to: "/service", label: "الخدمات" },
    { to: "/", label:"الصفحة الرئيسية" },
];

//features
export const features = [
    {
        src: calendar,
        link: "/service",
        label: "حجز موعد",
        description: "يتضمن حجز الطبيب تحديد موعد مع أخصائي الرعاية الصحية للاستشارة الطبية أو العلاج"
    },
    {
        src: doctors,
        link: "/service",
        label: "ابحث عن طبيب",
        description: "يمكنك البحث بالاسم أو التخصص، مما يوصلك بمتخصصي الرعاية الصحية المناسبين في المستشفى الخاص بك"
    },
    {
        src: medications,
        link: "service",
        label: "ابحث عن دواء",
        description: "مما يسمح لك بالعثور على المعلومات والفوائد والآثار الجانبية للدواء"
    }
]

//healthawareness features

export const guide = [
    {
        src: food,
        label: "التغذية",
        description: "يوفر سهولة الوصول إلى المعلومات الغذائية، مما يساعدك على اتخاذ خيارات غذائية مستنيرة من أجل صحة أفضل",
    },
    {
        src: health,
        label: "نمط الحياة الصحية",
        description: "يساعدك على إنشاء وتتبع أنماط الحياة الصحية، مع التركيز على الأنظمة الغذائية المتوازنة، وممارسة التمارين الرياضية بانتظام، والصحة العقلية من أجل صحة مستدامة",
    },
    {
        src: awareness,
        label: "توعية صحية",
        description: "يوفر معلومات صحية أساسية مصممة خصيصًا للأطفال والنساء وكبار السن، ويقدم إرشادات حول الاحتياجات الصحية الفريدة لكل مرحلة من مراحل الحياة"
    }
]

// Top Doctors Data
export const topDoctors = [
    {
        image: d1,
        name: "د/أحمد محمد",
        specialization: "استشاري جراحة الأورام",
        href: "https://www.vezeeta.com/en/dr/doctor-ahmed-mohamed-farid-oncology-surgery",
    },
    {
        image: d2,
        name: "د/أحمد دويك",
        specialization: "استشاري الطب الباطني والسكري والغدد الصماء",
        href: "https://www.vezeeta.com/en/dr/doctor-ahmed-ebrahim-dewek-diabetes-and-endocrinology",
    },
    {
        image: d3,
        name: "د/مجدي يعقوب",
        specialization: "جراح وطبيب قلب عالمي",
        href: "https://simple.wikipedia.org/wiki/Magdi_Yacoub",
    }
];

// Footer Links
export const footerLinks = [
    {
        title: "Help",
        links: [
            { name: "About us", link: "#about-us"},
            { name: "FAQs", link: '/'},
            { name: "How it works", link: "/" },
            { name: "Privacy policy", link: "/" },
            { name: "Payment policy", link: "/" },
        ],
    },
    {
        title: "Follow Us",
        links: [
            {name: "Facebook", link: '/'},
            {name: "Twitter", link: '/'},
            {name: "Instagram", link: '/'},
        ]
    },
    {
        title: "Get in touch",
        links: [
            { name: "mhi-gov@gmail.com", link: "/" },
            { name: "+0223440399", link: "/" },
        ],
    },
];

// Contact Us
export const  frontendEngineers = [
    {
        name: "Amr Muhammad",
        specialization: "Frontend Software Engineer",
        email:"amrrmohamed87@gmail.com"
    },
    {
        name: "Ramez Hossam",
        specialization: "Frontend Web Developer",
        email: "ramezhossam92@gmail.com"
    },
    {
        name: "Mohamed Saber",
        specialization: "Frontend Mobile Developer",
        email: "elmohandesstamera@gamil.com"
    },
];

export const backendEngineers = [
    {
        name: "Abdelrahman Khaled",
        specialization: "Backend Engineer",
        email: "keshko123456@gmail.com"
    },
    {
        name: "Ibrahim Elfatarany",
        specialization: "Backend Engineer",
        email: "ibrahimelfatarny75@gmail.com"
    },
];

export const healthcare = [
    {
        src: h1,
        icon: baby,
        title: 'صحةالطفل',
        description: 'صحة الطفل هي  واجبة علي كل أب و أم و يجب اتبع الارشادات التالية للحفاظ علي صحة الطفل',
        list: [
            { item: 'سلامة الطفل', to: '/child-safety' , icon:checkMark },
            { item: 'التطعيمات', to: '/vaccinations' , icon:checkMark },
            { item: 'الصحة المدرسية', to: '/school-health' , icon:checkMark },
            { item: 'تغذية الطفل', to: '/baby-nutrition' , icon:checkMark },
        ]
    },
    {
        src: h2,
        icon: women,
        title: 'صحةالمرأة',
        description: 'صحة المرأة واجبه علي كل مرأة و يجب اتبع الارشادات التالية للحفاظ علي صحة المرأة',
        list: [
            { item: 'قبل الحمل', to: '/before-pregnancy', icon:checkMark },
            { item: 'خلال الحمل', to: '/during-pregnancy', icon:checkMark },
            { item: 'الولادة', to: '/birth', icon:checkMark },
            { item: 'بعد الولادة', to: '/after-pregnancy' , icon:checkMark},
        ]
    },
    {
        src: h3,
        icon: elderly,
        title: 'صحة المسنين',
        description: 'رعاية المسنين هي فرض علي الأبناء و يجب اتبع الارشادات التالية للحفاظ علي صحة المسنين',
        list: [
            { item: 'الزهايمر', to: '/alzheimers', icon:checkMark },
            { item: 'رعاية المسنين', to: '/care-of-the-elderly', icon:checkMark },
        ]
    }
];

//Healthy Food

export const healthyFood = [
    {
        src: vegetables ,
        label: "الخضروات",
        description: "الخضروات مثل السبانخ واللفت والسلق مليئة بالفيتامينات والمعادن والألياف ومضادات الأكسدة. فهي منخفضة السعرات الحرارية وتحتوي على نسبة عالية من العناصر الغذائية التي يمكن أن تفيد صحتك بعدة طرق",
    },
    {
        src: fruits ,
        label: "الفاكهة",
        description: "مجموعة متنوعة من الفواكه توفر الفيتامينات والمعادن المختلفة. التوت، على سبيل المثال، يحتوي على نسبة عالية من مضادات الأكسدة والألياف، في حين أن الحمضيات مليئة بفيتامين C وهو أمر مهم لوظيفة المناعة",
    },
    {
        src: bread ,
        label: "الحبوب الكاملة",
        description: "توفر الأطعمة مثل الكينوا والأرز البني والشوفان والقمح الكامل العناصر الغذائية الأساسية مثل الألياف والبروتين وفيتامينات ب. على عكس الحبوب المكررة، تحتوي الحبوب الكاملة على مؤشر نسبة السكر في الدم أقل وتوفر طاقة مستدامة",
    }
]

export const healthyFoodTwo = [
    {
        src: protein ,
        label: "البروتين الخالية من الدهون",
        description: "بما في ذلك اللحوم الخالية من الدهون مثل الدجاج والديك الرومي، والأسماك مثل السلمون والماكريل، والمصادر النباتية مثل العدس والحمص، تعتبر البروتينات الخالية من الدهون ضرورية لصيانة العضلات وإصلاحها. كما أنها تجعلك تشعر بالشبع لفترة أطول"
    },
    {
        src: nuts,
        label: "المكسرات والبذور",
        description: "يعد اللوز والجوز وبذور الكتان وبذور الشيا مصادر رائعة للدهون الصحية والبروتينات والألياف. أنها تحتوي على الأحماض الدهنية الأساسية ويمكن أن تساعد في إدارة الجوع، ودعم صحة القلب، وتحقيق الاستقرار في مستويات السكر في الدم"
    }
]

