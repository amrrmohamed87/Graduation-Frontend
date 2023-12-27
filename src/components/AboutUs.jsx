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
      <div className="w-1/2 p-16 rounded-3xl flex flex-col items-end bg-[#0C484B]">
        <h2 className=" text-5xl font-bold mb-3">معلومات عنا</h2>
        <h3 className="text-3xl mb-2">لم يفت الأوان بعد لبدء العيش بشكل جيد</h3>
        <h3>
          يهدف مشروعنا إلى إحداث ثورة في نظام الرعاية الصحية في مصر من خلال
          تقديم نظام تأمين صحي شامل مصحوب بتطبيق ويب وتطبيق جوال. تفتقر مصر
          حاليًا إلى نظام مركزي يتيح للمرضى الوصول إلى خدمات الرعاية الصحية
          بكفاءة، مما يسبب الإزعاج والضغط للأفراد الذين يبحثون عن العلاج الطبي.
        </h3>
        <button className="mt-2 px-2 py-2 bg-[#E1A66F] rounded-full w-36 text-xl font-bold">
          اقرأ أكثر
        </button>
      </div>
    </section>
  );
}
