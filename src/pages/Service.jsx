import React from "react";
import "../css/Service.css";
import Footer from "../components/Footer";
import heroPhoto from "../assets/images/hero-background.jpg";
import FirstSectionPhoto from "../assets/images/appointment.jpg";
import SecoundPhoto from "../assets/images/medical-information.jpeg";
import SecoundSectionPhoto from "../assets/images/doctor-name.jpg";
import SecoundPhotoSecoundSection from "../assets/images/specialization.jpg";
import { NavLink } from "react-router-dom";
export function Service() {
  const cards = [
    {
      title: "حجز موعد",
      pragrapgh:
        "إن نظام التأمين الصحي الذي نقترحه سيمكن المستخدمين من جدولة المواعيد بسهولة في المستشفيات ومرافق الرعاية الصحية، وتبسيط العملية وتخفيف العبء على المرضى. ومن خلال بضع نقرات فقط على التطبيق أو موقع الويب، سيتمكن المستخدمون من تأمين المواعيد والحصول على خدمات الرعاية الصحية في الوقت المناسب",
      imgSrc: FirstSectionPhoto,
      buttonContent: "احجز الآن",
      alt: "first",
      to: "/book",
    },
    {
      title: "معلومات طبية",
      pragrapgh:
        "ستتاح للمستخدمين فرصة البحث عن الأدوية ومعرفة آثارها الجانبية وفائدة هذا الدواء",
      imgSrc: SecoundPhoto,
      buttonContent: "ابحث الآن",
      alt: "secound",
      to: "/searchmed",
    },
    {
      title: "اسم الطبيب",
      pragrapgh:
        "تبحث عن طبيب؟ يمكنك كتابة اسم الطبيب في شريط البحث وسنزودك بجميع الأطباء المتاحين بهذا الاسم.",
      imgSrc: SecoundSectionPhoto,
      buttonContent: "ابحث الآن",
      alt: "third",
      to: "/docsearch",
    },
    {
      title: "التخصصات",
      pragrapgh:
        "سواء كنت بحاجة إلى طبيب قلب، أو طبيب أطفال، أو جراح عظام، أو أي متخصص آخر، فلدينا ما تحتاجه. تتيح لك واجهتنا سهلة الاستخدام اختيار التخصص المفضل لديك",
      imgSrc: SecoundPhotoSecoundSection,
      buttonContent: "ابحث الآن",
      alt: "fourth",
      to: "/docsearch",
    },
  ];

  const token = localStorage.getItem("token");
  return (
    <>
      <header className="relative h-screen w-full">
        <div className=" w-full h-screen">
          <img
            src={heroPhoto}
            className="object-cover object-center h-screen w-full"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="absolute inset-2 left-4 md:inset-0 flex flex-1 flex-col justify-center text-right mr-2 md:mr-0 md:items-center">
          <h2 className="text-white text-[80px]"> الخدمات </h2>
          <p className="text-slate-300 text-[40px] mt-2 md:mt-0 opacity-50">
            {" "}
            خطوة بخطوة نصنع حياة أكثر صحة لك{" "}
          </p>
        </div>
      </header>
      <section className="bg-white py-6">
        <h1 className="text-center text-6xl">الخدمات الالكترونية</h1>
      </section>
      <section className="py-6 bg-white">
        <div className="container-xxl  mx-auto ">
          <div className="row p-3  ">
            {cards.map((element, i) => (
              <div
                key={i}
                className="col-md-6 mb-10 rounded-2xl relative overflow-hidden"
              >
                <img
                  src={element.imgSrc}
                  alt="first"
                  className="w-100 h-full rounded-2xl"
                />
                <div className="absolute styleCard rounded-2xl "></div>
                <div className="absolute w-full h-full top-0 rounded-2xl">
                  <h2 className="text-white text-right textForH2 pe-10 pb-10">
                    {element.title}
                  </h2>
                  <p className="text-white text-right textForP pe-5">
                    {element.pragrapgh}
                  </p>
                  <NavLink to={token ? element.to : "/login"}>
                    <button className="absolute start-0 bottom-8  bg-red-950 ms-12 mt-4 px-2 py-2  hover:bg-black text-white rounded-full w-38 text-xl font-bold buttonResponsive">
                      {" "}
                      {element.buttonContent}
                    </button>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
