import { NavLink } from "react-router-dom";

import Footer from "../components/Footer.jsx";
import { healthcare } from "../data/constants.js";

import heroImage from "../assets/images/health-awareness.jpg";
import patternImage from "../assets/images/pattern-of-healthy-life3.jpg";
import nutritionImage from "../assets/images/pattern-of-healthy-life.jpg";

function HealthAwareness() {
  return (
    <main>
      <section className="relative">
        <img
          src={heroImage}
          className="object-cover object-center h-[932px] w-full md:h-[680px]"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-[65px] md:text-[80px] text-slate-100">
            التوعية الصحية
          </h1>
          <p className="text-[45px] text-slate-300">لحياة افضل</p>
        </div>
      </section>
      <section className="mb-8 md:mb-0 md:h-screen">
        <h1 className="text-center text-[30px] text-emerald-700 mt-6 mb-3 md:mt-28 md:text-[60px] md:mb-16">
          نمط الحياة الصحية
        </h1>
        <div className="md:flex md:items-center md:gap-8 md:mx-8 md:mt-24">
          <p className="text-right text-emerald-950 text-[22px] mx-4 md:text-[30px]">
            إن تبني نمط حياة صحي هو رحلة شخصية، وقد تختلف التوصيات المحددة لكل
            فرد. وهو ينطوي على إجراء تغييرات تدريجية ومستدامة على العادات
            والسلوكيات اليومية لتعزيز الصحة والرفاهية على المدى الطويل
          </p>
          <img
            src={patternImage}
            className="p-4 rounded-[30px] shadow-2xl md:w-[750px]"
          />
        </div>
      </section>
      <section className="mt-4 md:h-screen">
        <div className="p-4 md:flex md:justify-center md:items-start md:gap-6 md:m-16">
          {healthcare.map((health) => (
            <div
              key={health.src}
              className="bg-white shadow-2xl p-4 rounded-[30px]  mb-6"
            >
              <img src={health.src} className="rounded-[30px] shadow-2xl" />
              <h2 className="text-[25px] text-center mt-4 mb-2 text-[#A55858]">
                {health.title}
              </h2>
              <p className="text-[22px] text-center mb-4 text-[#A55858]">
                {health.description}
              </p>
              <ul className="grid grid-flow-row grid-cols-2 gap-6 text-center place-items-center">
                {health.list.map((item) => (
                  <li
                    key={item.item}
                    className="bg-emerald-900 rounded-[30px] text-slate-100 w-[170px]  py-1  text-[18px] mb-2 "
                  >
                    <NavLink to={item.to}>{item.item}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="md:h-screen">
        <div className="md:mx-8">
          <div className="flex flex-col items-end mr-4">
            <h1 className="text-[30px] text-emerald-700 md:text-[45px]">
              من اهم عناصر تطوير الصحة
            </h1>
            <hr className="border-t-2 border-emerald-900 w-72 mt-2" />
          </div>
          <div className="text-right p-4 md:flex md:items-start md:gap-8">
            <img
              src={nutritionImage}
              className="rounded-[30px] shadow-2xl md:w-[650px]"
            />
            <div>
              <h1 className="mt-4 mb-2 text-[26px] text-emerald-950 md:text-[35px]">
                الرياضة - التغذية
              </h1>
              <p className="text-[22px] text-emerald-950 mb-2 md:text-[30px] md:mb-6">
                يعد النشاط البدني أمرًا بالغ الأهمية للحفاظ على وزن صحي، وتقوية
                نظام القلب والأوعية الدموية، وتعزيز اللياقة البدنية بشكل عام، و
                يساعد تناول مجموعة متنوعة من الأطعمة الغنية بالمغذيات، بما في
                ذلك الفواكه والخضروات والحبوب الكاملة والبروتينات الخالية من
                الدهون والدهون الصحية، على تزويد الجسم بالفيتامينات والمعادن
                الأساسية
              </p>
              <button className="bg-emerald-500 px-4 py-2 rounded-[30px] text-slate-100 md:text-[28px] md:px-6 hover:bg-emerald-950">
                <NavLink to="/ca">التغذية الصحية</NavLink>
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default HealthAwareness;
