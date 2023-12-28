import aboutImage from "../assets/images/about-bg.jpg";
export default function AboutUs() {
  return (
    <section
      id="about-us"
      className="h-screen flex justify-center items-center gap-8 px-7"
    >
      <div className="w-1/2">
        <img src={aboutImage} alt="about" className="w-full rounded-3xl" />
      </div>
      <div className="w-1/2 p-8 rounded-3xl flex flex-col items-end text-right bg-[3c6e71]">
        <h2 className=" text-5xl font-bold mb-3 text-emerald-950">
          معلومات عنا
        </h2>
        <h3 className="text-4xl mb-2 text-slate-800">
          لم يفت الأوان بعد لبدء العيش بشكل جيد
        </h3>
        <p className="text-2xl my-2 leading-10">
          يهدف مشروعنا إلى إحداث ثورة في نظام الرعاية الصحية في مصر من خلال
          تقديم نظام تأمين صحي شامل مصحوب بتطبيق ويب وتطبيق جوال. تفتقر مصر
          حاليًا إلى نظام مركزي يتيح للمرضى الوصول إلى خدمات الرعاية الصحية مما
          يسبب الإزعاج والضغط للأفراد الذين يبحثون عن العلاج الطبي
        </p>
        <button className="mt-3 px-2 py-2 bg-emerald-950 hover:bg-black text-white rounded-full w-36 text-xl font-bold">
          التواصل معنا
        </button>
      </div>
    </section>
  );
}
