import { servicesImages } from "../data/constants";

export default function Services() {
  return (
    <section id="about-us" className="h-screen flex  gap-24">
      <div className="w-1/2 p-8 rounded-3xl flex flex-col items-end text-right bg-[3c6e71]">
        <h2 className=" text-5xl font-bold mb-3 text-emerald-950">الخدمات</h2>
        <h3 className="text-3xl mb-2 text-slate-800">
          المعجزة ليست أننا نقوم بهذا العمل، ولكننا سعداء للقيام بذلك{" "}
        </h3>
        <p className="text-2xl my-2 leading-10">
          يقدم نظام التأمين الصحي المقترح خدمات رعاية صحية مريحة من خلال جدولة
          المواعيد مع الأطباء، ومعلومات الأدوية وتوافرها، والنصائح الصحية،
          والتصفية حسب أسماء الأطباء وتخصصاتهم
        </p>
        <p className="text-2xl my-2 leading-10">
          ويهدف البرنامج إلى تسهيل الوصول إلى الرعاية الصحية في مصر، وتعزيز
          التطبيب عن بعد، وتمكين الأفراد بالمعلومات، وتحسين صحة المجتمع بشكل عام
        </p>
        <button className="mt-3 px-2 py-2 bg-emerald-950 hover:bg-black text-white rounded-full w-36 text-xl font-bold">
          الخدمات
        </button>
      </div>
      <div className="w-1/2">
        <div className="flex flex-wrap">
          {servicesImages.map((image) => (
            <div key={image.image} className="p-2 ">
              <img src={image.image} className="rounded-3xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
