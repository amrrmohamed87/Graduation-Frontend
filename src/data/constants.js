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
        label: "حجز موعد",
        description: "يتضمن حجز الطبيب تحديد موعد مع أخصائي الرعاية الصحية للاستشارة الطبية أو العلاج"
    },
    {
        src: doctors,
        label: "ابحث عن طبيب",
        description: "يمكنك البحث بالاسم أو التخصص، مما يوصلك بمتخصصي الرعاية الصحية المناسبين في المستشفى الخاص بك"
    },
    {
        src: medications,
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
            { item: 'صحة المرأة قبل الحمل', to: '/before-pregnancy', icon:checkMark },
            { item: 'صحة المرأة خلال الحمل', to: '/during-pregnancy', icon:checkMark },
            { item: 'الولادة', to: '/birth', icon:checkMark },
            { item: 'صحة المرأة بعد الولادة', to: '/after-pregnancy' , icon:checkMark},
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

