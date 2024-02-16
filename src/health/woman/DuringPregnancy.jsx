import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function DuringPregnancy() {
  return (
    <main>
      <section className="m-4 mb-12 md:mb-8">
        <button>
          <Link
            to="/health-awareness"
            className="flex items-center gap-4 bg-white shadow-2xl rounded-[30px] px-6 py-2 md:gap-8"
          >
            <IoArrowBackCircleSharp size={40} className="text-emerald-700" />
            <p className="text-emerald-800 md:text-[25px]">الرجوع</p>
          </Link>
        </button>
      </section>
      <div className="flex flex-col justify-center items-center mb-8">
        <h1 className="text-emerald-800 text-[38px]">صحة المرأة خلال الحمل</h1>
        <hr className="border-t-2 border-emerald-800 w-80 mt-2" />
      </div>
      <section className="mb-8">
        <div className="text-right mr-6 md:mr-12">
          <h1 className="text-[28px] text-emerald-800 mb-2 md:text-[38px]">
            سكري الحمل
          </h1>
          <p className="text-right p-4 text-[22px] font-bold">
            هو أي تغير في نسبة السكر بالدم، وتم تشخيصه لأول مرة أثناء الحمل،
            سواء استمر إلى ما بعد الولادة أم لم يستمر. غالبًا يختفي سكر الحمل
            بعد الولادة مباشرة. يحدث عندما تقوم هرمونات المشيمة بمنع الجسم من
            استخدام الأنسولين بشكل فعَّال؛ مما ينتج عنه بقاء السكر بالدم بدلًا
            من امتصاصه بالخلايا. يتم تشخيص الحالة على أنها «سكري الحمل»، سواء
            احتاجت المرأة إلى أنسولين أو فقط تعديل في نظامها الغذائي
          </p>
        </div>
      </section>
      <section className="mb-8">
        <div className="text-right mr-6 md:mr-12">
          <h1 className="text-[28px] text-emerald-800 mb-2 md:text-[38px]">
            :عوامل الخطورة
          </h1>
          <p className="text-right p-4 text-[22px] font-bold">
            بالرغم من أنه قد يصيب جميع النساء الحوامل، إلا أن احتمالية حدوثه قد
            تزيد في الحالات التالية (التقدم بالعمر - التاريخ العائلي - زيادة
            الوزن - الولادة السابقة بطفل ذي وزن مرتفع)
          </p>
        </div>
      </section>
      <section className="mb-8">
        <div className="text-right mr-6 md:mr-12">
          <h1 className="text-[28px] text-emerald-800 mb-2 md:text-[38px]">
            :المضاعفات
          </h1>
          <p className="text-right p-4 text-[22px] font-bold">
            زيادة وزن المولود - انخفاض سكر المولود بعد الولادة مباشرة - تشوهات
            الجنين - زيادة احتمالية إصابة الأم بتسمم الحمل
          </p>
        </div>
      </section>
      <section className="mb-8">
        <div className="text-right mr-6 md:mr-12">
          <h1 className="text-[28px] text-emerald-800 mb-2 md:text-[38px]">
            :العلاج
          </h1>
          <p className="text-right p-4 text-[22px] font-bold">
            يختلف العلاج بحسب العمر والحالة الصحية وغيرهم، حيث يشمل (تعديل
            النظام الغذائي - ممارسة النشاط البدني - الأنسولين)
          </p>
        </div>
      </section>
      <section className="mb-8">
        <div className="text-right mr-6 md:mr-12">
          <h1 className="text-[28px] text-emerald-800 mb-2 md:text-[38px]">
            :إرشادات
          </h1>
          <p className="text-right p-4 text-[22px] font-bold">
            المحافظة على مستوى السكر بالدم، ومراقبته بالمنزل، وتسجيل النتائج.
            الحرص على مراجعة عيادات الحوامل وعيادة السكر بانتظام وفي أوقاتها
            المحددة. اتباع الحمية الغذائية بحسب تعليمات أخصائي التغذية. ممارسة
            النشاط البدني بحسب تعليمات الطبيب. فحص البول يوميًا للتأكد من عدم
            وجود الكيتونات. تجنب استخدام أدوية السكري وأي أدوية أخرى
          </p>
        </div>
      </section>
    </main>
  );
}

export default DuringPregnancy;
