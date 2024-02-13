import { useNavigate } from "react-router-dom";

import aboutImage from "../assets/images/about-bg.jpg";

export default function AboutUs() {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/contact-us");
  }
  return (
    <section className="lg:h-screen flex justify-between items-center max-lg:flex-col gap-10 w-full p-8  max-container">
      <div className="flex flex-1 justify-center items-center">
        <img
          src={aboutImage}
          alt="about-us"
          className="object-contain rounded-3xl"
        />
      </div>

      <div className="flex flex-1 flex-col items-end text-right ">
        <h2 className=" text-5xl font-bold mb-3 text-emerald-950 lg:max-w-lg">
          معلومات عنا
        </h2>
        <h3 className="text-4xl text-slate-800 lg:max-w-lg">
          لم يفت الأوان بعد لبدء العيش بشكل جيد
        </h3>
        <p className="mt-4 lg:max-w-lg text-xl leading-[2rem] text-emerald-950 md:text-[25px]">
          يهدف مشروعنا إلى إحداث ثورة في نظام الرعاية الصحية في مصر من خلال
          تقديم نظام تأمين صحي شامل مصحوب بتطبيق ويب وتطبيق جوال. تفتقر مصر
          حاليًا إلى نظام مركزي يتيح للمرضى الوصول إلى خدمات الرعاية الصحية مما
          يسبب الإزعاج والضغط للأفراد الذين يبحثون عن العلاج الطبي
        </p>
        <div>
          <button
            onClick={navigateHandler}
            className="mt-4 px-2 py-2 bg-emerald-950 hover:bg-black text-white rounded-full w-36 text-xl font-bold"
          >
            التواصل معنا
          </button>
        </div>
      </div>
    </section>
  );
}
