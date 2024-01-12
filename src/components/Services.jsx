import { useNavigate } from "react-router-dom";

import serviceImage from "../assets/images/service-section.png";

export default function Services() {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/services");
  }
  return (
    <section className="lg:h-screen flex justify-between items-center max-lg:flex-col gap-10 w-full p-8  max-container">
      <div className="flex flex-1 flex-col items-end text-right">
        <h2 className=" text-5xl font-bold mb-3 text-emerald-950 lg:max-w-lg">
          الخدمات
        </h2>
        <h3 className="text-3xl text-slate-800 lg:max-w-lg">
          المعجزة ليست أننا نقوم بهذا العمل، ولكننا سعداء للقيام بذلك
        </h3>
        <p className="text-xl leading-7 mt-4 lg:max-w-lg">
          يقدم نظام التأمين الصحي المقترح خدمات رعاية صحية مريحة من خلال جدولة
          المواعيد مع الأطباء، ومعلومات الأدوية وتوافرها، والنصائح الصحية،
          والتصفية حسب أسماء الأطباء وتخصصاتهم
        </p>
        <p className="text-xl leading-7 mt-2 lg:max-w-lg">
          ويهدف البرنامج إلى تسهيل الوصول إلى الرعاية الصحية في مصر، وتعزيز
          التطبيب عن بعد، وتمكين الأفراد بالمعلومات، وتحسين صحة المجتمع بشكل عام
        </p>
        <div>
          <button
            onClick={navigateHandler}
            className="mt-3 px-2 py-2 bg-emerald-950 hover:bg-black text-white rounded-full w-36 text-xl font-bold"
          >
            الخدمات
          </button>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <img
          src={serviceImage}
          alt="service"
          className="object-contain rounded-3xl"
        />
      </div>
    </section>
  );
}
