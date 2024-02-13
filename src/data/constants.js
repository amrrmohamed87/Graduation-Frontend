import d1 from "../assets/images/d1.jpg";
import d2 from "../assets/images/d2.jpg";
import d3 from "../assets/images/d3.jpeg";

// Navbar Links
export const navLinks = [
    {to: "/contact-us", label: "التواصل معنا" },
    {to: "/service", label: "الخدمات"},
    {to: "/", label:"الصفحة الرئيسية"},
];

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
    {name: "Amr Muhammad", specialization: "Frontend Software Engineer", email:"amrrmohamed87@gmail.com"},
    {name: "Ramez Hossam", specialization: "Frontend Web Developer", email: "ramezhossam92@gmail.com"},
    {name: "Mohamed Saber" , specialization: "Frontend Mobile Developer", email: "elmohandesstamera@gamil.com"},
];

export const backendEngineers = [
    {name: "Abdelrahman Khaled", specialization: "Backend Engineer", email: "keshko123456@gmail.com"},
    {name: "Ibrahim Elfatarany", specialization: "Backend Engineer", email: "ibrahimelfatarny75@gmail.com"},
];