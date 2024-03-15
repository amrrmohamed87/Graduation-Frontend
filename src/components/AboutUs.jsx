import { useNavigate } from "react-router-dom";

import aboutImage from "../assets/images/about-bg.jpg";
import info from "../assets/images/info.png";

export default function AboutUs() {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/contact-us");
  }
  return (
    <section className="lg:h-screen  flex justify-between items-center max-lg:flex-col gap-10 w-full p-8  max-container">
      <div className="flex flex-1 justify-center items-center">
        <img
          src={aboutImage}
          alt="about-us"
          className="shadow-2xl rounded-lg"
        />
      </div>

      <div className="flex flex-1 flex-col items-end text-right ">
        <div className="flex items-center gap-1">
          <h2 className=" text-[45px] font-bold text-[#056558] lg:max-w-lg">
            معلومات عنا
          </h2>
          <img src={info} className="w-[30px]" />
        </div>
        <h3 className="text-[28px] text-black lg:max-w-lg mt-3">
          لم يفت الأوان بعد لبدء العيش بشكل جيد
        </h3>
        <div className="bg-white shadow-2xl p-4 rounded-lg">
          <p className="mt-4 lg:max-w-lg text-[18px] leading-[2rem] text-emerald-950 md:text-[25px]">
            يهدف مشروعنا إلى إحداث ثورة في نظام الرعاية الصحية في مصر من خلال
            تقديم نظام تأمين صحي شامل مصحوب بتطبيق ويب وتطبيق جوال. تفتقر مصر
            حاليًا إلى نظام مركزي يتيح للمرضى الوصول إلى خدمات الرعاية الصحية
            مما يسبب الإزعاج والضغط للأفراد الذين يبحثون عن العلاج الطبي
          </p>
        </div>
      </div>
    </section>
  );
}
