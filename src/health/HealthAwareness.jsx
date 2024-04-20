import { NavLink, useNavigate } from "react-router-dom";

import Footer from "../components/Footer.jsx";
import { guide, healthcare } from "../data/constants.js";

import heroImage from "../assets/images/health-awareness.jpg";
import patternImage from "../assets/images/pattern-of-healthy-life3.jpg";
import nutritionImage from "../assets/images/pattern-of-healthy-life.jpg";
import healthawareness from "../assets/images/people.png";
import diet from "../assets/images/diet.png";
import workout from "../assets/images/person.png";

function HealthAwareness() {
  const navigate = useNavigate();
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

      <section className="mb-6 md:mb-36">
        <h1 className="text-center text-[#056558] mt-12 text-[22px] md:text-[30px]">
          وفرنالك
        </h1>
        <p className="text-center text-gray-800 text-[25px] md:text-[40px]">
          حياة صحية لحياة أفضل
        </p>
        <div className="flex flex-col justify-center items-center gap-8 sm:flex sm:flex-row sm:justify-center sm:gap-16 sm:p-4 sm:mt-4">
          {guide.map((feature) => (
            <div
              key={feature.src}
              className="p-4 w-[300px] h-[300px] bg-white shadow-md border rounded-lg md:p-12 flex flex-col justify-center items-end text-right"
            >
              <img src={feature.src} className="w-[70px] mt-8 mb-3" />
              <h2 className="text-black md:text-[25px] mb-2">
                {feature.label}
              </h2>
              <p className="text-gray-800 md:text-[18px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8 md:mb-40 ">
        <div className="md:flex md:items-center md:gap-8 md:mx-8">
          <img
            src={patternImage}
            className="p-4 rounded-lg  shadow-sm md:w-[770px] md:h-[400px]"
          />
          <div className="flex flex-col">
            <div className="flex justify-end items-center mx-8">
              <h1 className="text-right text-[30px] text-emerald-700  mb-3  md:text-[40px] md:mb-16">
                نمط الحياة الصحية
              </h1>
              <img src={healthawareness} className="w-[60px] mb-3" />
            </div>
            <p className="bg-white border rounded-[5px] shadow-md p-4 text-right text-emerald-950 text-[19px] md:text-[21px]">
              إن تبني نمط حياة صحي هو رحلة شخصية، وقد تختلف التوصيات المحددة لكل
              فرد. وهو ينطوي على إجراء تغييرات تدريجية ومستدامة على العادات
              والسلوكيات اليومية لتعزيز الصحة والرفاهية على المدى الطويل
            </p>
          </div>
        </div>
      </section>
      <section className="mt-4 md:h-screen">
        <div className="p-4 md:flex md:justify-center md:items-start md:gap-6 md:m-16">
          {healthcare.map((health) => (
            <div
              key={health.src}
              className="bg-white border shadow-md rounded-bl-2xl rounded-br-2xl hover:-translate-y-6 hover:transition-all duration-500  mb-6"
            >
              <img src={health.src} className="shadow-sm" />
              <div className="p-4">
                <div className="flex justify-end items-center gap-1 mb-2">
                  <img src={health.icon} className="w-[28px] mb-2" />
                  <h2 className="text-[24px] text-right text-[#056558]">
                    {health.title}
                  </h2>
                </div>
                <p className="text-[19px] text-right mb-4 text-gray-800">
                  {health.description}
                </p>
                <ul className="grid grid-flow-row grid-cols-2 gap-6 text-center place-items-center">
                  {health.list.map((item) => (
                    <div
                      key={item.item}
                      className="flex items-center py-1 px-3 text-[#056558] rounded-[30px] hover:bg-emerald-900 hover:text-white transition-all duration-300"
                    >
                      <button className="w-[100px] text-[18px]">
                        {item.item}
                      </button>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <div className="md:mx-24 bg-white border shadow-md rounded-[15px] pt-4">
          {/* <div className="flex flex-col items-end mr-4 p-4">
            <h1 className="text-[30px] text-emerald-700 md:text-[45px]">
              من اهم عناصر تطوير الصحة
            </h1>
            <hr className="border-t-2 border-emerald-900 w-72 mt-2" />
          </div> */}
          <h1 className="text-[30px] text-center mt-4 text-emerald-700 md:text-[40px]">
            من اهم عناصر تطوير الصحة
          </h1>
          <div className="text-right p-4 md:flex md:items-center md:gap-8">
            <img
              src={nutritionImage}
              className="rounded-[15px] shadow-md md:w-[550px]"
            />
            <div>
              <div className="bg-white border rounded-[5px] shadow-md p-4 mb-4">
                <div className="flex items-center justify-end gap-2">
                  <img src={workout} className="w-[31px]" />
                  <h1 className="mt-1 text-[26px] text-emerald-950 md:text-[32px]">
                    الرياضة
                  </h1>
                </div>

                <p className="text-[17px] text-emerald-950 mb-2 md:text-[19px] mt-2">
                  يعد النشاط البدني أمرًا بالغ الأهمية للحفاظ على وزن صحي،
                  وتقوية نظام القلب والأوعية الدموية، وتعزيز اللياقة البدنية
                  بشكل عام
                </p>
              </div>
              <div className="bg-white border rounded-[5px] shadow-md p-4 mb-4">
                <div className="flex items-center justify-end gap-2">
                  <img src={diet} className="w-[31px]" />
                  <h1 className="mt-1 text-[26px] text-emerald-950 md:text-[32px]">
                    التغذية
                  </h1>
                </div>
                <p className="text-[17px] text-emerald-950 mb-2 md:text-[19px]">
                  و يساعد تناول مجموعة متنوعة من الأطعمة الغنية بالمغذيات، بما
                  في ذلك الفواكه والخضروات والحبوب الكاملة والبروتينات الخالية
                  من الدهون والدهون الصحية، على تزويد الجسم بالفيتامينات
                  والمعادن الأساسية
                </p>
                <button className="bg-[#056558] flex px-6 py-[2px] mt-2 rounded-lg text-slate-100 md:text-[21px] md:px-6 hover:bg-emerald-950 transition-all duration-300">
                  <NavLink to="/ca">التغذية الصحية</NavLink>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default HealthAwareness;
