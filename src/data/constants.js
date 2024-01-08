import d1 from "../assets/images/d1.jpg";
import d2 from "../assets/images/d2.jpg";
import d3 from "../assets/images/d3.jpeg";


export const navLinks = [
    {to: "/contact-us", label: "التواصل معنا" },
    {to: "/service", label: "الخدمات"},
    {to: "/about-us", label: "معلومات عنا"},
    {to: "/", label:"الصفحة الرئيسية"},
];

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

export const contactUs = [
    {  
        name: 'Amr Muhammad',
        specialization: 'Frontend - Software Engineer',
    },
    {  
        name: 'Ramez Hossam',
        specialization: 'Frontend - Web Developer',
    },
    {  
        name: 'Mohamed Saber',
        specialization: 'Frontend - Mobile Developer',
    },
    {  
        name: 'Abdelrahman Khaled',
        specialization: 'Backend',
    },
    {  
        name: 'Ibrahim Elfatarany',
        specialization: 'Backend',
    },
];